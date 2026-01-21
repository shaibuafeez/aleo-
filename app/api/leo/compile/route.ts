import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

const execAsync = promisify(exec);

interface CompileRequest {
  code: string;
  programName?: string;
}

interface CompileResponse {
  success: boolean;
  output?: string;
  errors?: string;
  bytecode?: string;
}

/**
 * POST /api/leo/compile
 * Compiles Leo code using the Leo CLI
 */
export async function POST(req: NextRequest) {
  try {
    const body: CompileRequest = await req.json();
    const { code, programName = 'program' } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, errors: 'Invalid code provided' },
        { status: 400 }
      );
    }

    // Create a temporary directory for compilation
    const tempId = randomUUID();
    const tempDir = join(tmpdir(), `leo-compile-${tempId}`);

    try {
      // Create temp directory structure
      await mkdir(join(tempDir, 'src'), { recursive: true });
      await mkdir(join(tempDir, 'inputs'), { recursive: true });

      // Write program.json (project configuration)
      const programJson = {
        program: `${programName}.aleo`,
        version: "0.0.0",
        description: "Temporary Leo program for compilation",
        license: "MIT"
      };
      await writeFile(
        join(tempDir, 'program.json'),
        JSON.stringify(programJson, null, 2)
      );

      // Write the Leo code to main.leo
      await writeFile(join(tempDir, 'src', 'main.leo'), code);

      // Create an empty .env file (Leo requires it)
      await writeFile(join(tempDir, '.env'), '');

      // Run Leo build command
      const { stdout, stderr } = await execAsync('leo build', {
        cwd: tempDir,
        timeout: 30000, // 30 second timeout
        env: { ...process.env, PATH: process.env.PATH }
      });

      // Check if compilation was successful
      const success = !stderr.toLowerCase().includes('error') &&
                     !stdout.toLowerCase().includes('error:');

      const response: CompileResponse = {
        success,
        output: stdout,
        errors: stderr || undefined
      };

      // Try to read the compiled bytecode if successful
      if (success) {
        try {
          // Leo output is typically in build/main.aleo
          const { stdout: buildOutput } = await execAsync(
            `cat build/main.aleo`,
            { cwd: tempDir }
          );
          response.bytecode = buildOutput;
        } catch (e) {
          // Bytecode reading failed, but compilation may have succeeded
          console.warn('Could not read bytecode:', e);
        }
      }

      return NextResponse.json(response);

    } finally {
      // Clean up temporary files
      try {
        await execAsync(`rm -rf ${tempDir}`);
      } catch (e) {
        console.error('Failed to clean up temp directory:', e);
      }
    }

  } catch (error: any) {
    console.error('Leo compilation error:', error);

    // Handle specific error types
    if (error.message?.includes('ENOENT')) {
      return NextResponse.json(
        {
          success: false,
          errors: 'Leo compiler not found. Please ensure Leo CLI is installed and in PATH.'
        },
        { status: 500 }
      );
    }

    if (error.message?.includes('timeout')) {
      return NextResponse.json(
        {
          success: false,
          errors: 'Compilation timed out. The code may be too complex or contain infinite loops.'
        },
        { status: 408 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        errors: error.message || 'An unexpected error occurred during compilation'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leo/compile
 * Returns information about the Leo compiler
 */
export async function GET() {
  try {
    const { stdout } = await execAsync('leo --version');
    return NextResponse.json({
      available: true,
      version: stdout.trim(),
      message: 'Leo compiler is available'
    });
  } catch (error) {
    return NextResponse.json({
      available: false,
      message: 'Leo compiler not found. Please install Leo CLI.'
    }, { status: 503 });
  }
}
