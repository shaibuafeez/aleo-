'use client';

/**
 * Leo compiler using @provablehq/wasm for browser-based compilation
 * This runs entirely in the browser using WebAssembly - no server required!
 */

/**
 * Compile Leo source code in the browser using WebAssembly
 * Uses lazy-loading to prevent build timeouts
 */
export async function compileLeoCode(sourceCode: string, programName: string = 'main'): Promise<{
  success: boolean;
  output?: string;
  errors?: string;
  program?: string;
  bytecode?: string;
}> {
  // Only run in browser
  if (typeof window === 'undefined') {
    return {
      success: false,
      errors: 'Compilation only available in browser',
    };
  }

  try {
    console.log('🦁 Loading Leo WASM compiler...');

    // Dynamically import @provablehq/wasm to prevent SSR issues
    const { Program } = await import('@provablehq/wasm');

    console.log('✅ Leo WASM compiler loaded');
    console.log('⚙️ Compiling Leo program...');

    // Parse and compile the program using WASM
    const compiledProgram = Program.fromString(sourceCode);

    console.log('✅ Compilation successful!');

    // Convert to string to get the compiled output
    const programString = compiledProgram.toString();

    return {
      success: true,
      output: 'Compilation successful! Program compiled in browser using WebAssembly.',
      program: programString,
    };
  } catch (error: any) {
    console.error('❌ Compilation error:', error);

    // Provide helpful error messages
    let errorMessage = error.message || 'Unknown compilation error';

    // Clean up common error messages
    if (errorMessage.includes('unreachable')) {
      errorMessage = 'WASM module failed to load. Your browser may not support WebAssembly.';
    } else if (errorMessage.includes('import')) {
      errorMessage = 'Failed to load Leo compiler module.';
    }

    return {
      success: false,
      errors: errorMessage,
      output: error.stack || '',
    };
  }
}

/*
 * FUTURE: Browser-based WASM compilation (currently disabled due to build issues)
 *
 * The code below implements client-side Leo compilation using WebAssembly.
 * It's commented out because @aleohq/sdk causes Next.js 16 Turbopack build timeouts.
 *
 * To re-enable:
 * 1. Solve the build timeout issue (possibly by using a lighter WASM package)
 * 2. Uncomment the code below
 * 3. Replace the server-side API call above with the WASM implementation
 *
 * let sdkModule: any = null;
 * let isLoading = false;
 *
 * async function loadSDK() {
 *   if (sdkModule) return sdkModule;
 *   if (isLoading) {
 *     while (isLoading) {
 *       await new Promise(resolve => setTimeout(resolve, 100));
 *     }
 *     return sdkModule;
 *   }
 *   isLoading = true;
 *   try {
 *     console.log('🦁 Loading Leo WASM compiler...');
 *     sdkModule = await import('@aleohq/sdk');
 *     console.log('✅ Leo WASM compiler loaded');
 *     return sdkModule;
 *   } catch (error) {
 *     console.error('❌ Failed to load Leo SDK:', error);
 *     throw new Error('Failed to load Leo compiler. Please try again.');
 *   } finally {
 *     isLoading = false;
 *   }
 * }
 *
 * export async function compileLeoCode(sourceCode: string, programName: string = 'main') {
 *   if (typeof window === 'undefined') {
 *     return {
 *       success: false,
 *       errors: 'Compilation only available in browser',
 *     };
 *   }
 *   try {
 *     const sdk = await loadSDK();
 *     console.log('🔧 Initializing program manager...');
 *     const account = new sdk.Account();
 *     const keyProvider = new sdk.AleoKeyProvider();
 *     const programManager = new sdk.ProgramManager(
 *       'https://api.explorer.aleo.org/v1',
 *       keyProvider,
 *       undefined
 *     );
 *     console.log('⚙️ Compiling Leo program...');
 *     const compiledProgram = await programManager.buildProgramFromSource(sourceCode);
 *     return {
 *       success: true,
 *       output: 'Compilation successful! Program compiled in browser using WebAssembly.',
 *       program: compiledProgram,
 *     };
 *   } catch (error: any) {
 *     console.error('Compilation error:', error);
 *     let errorMessage = error.message || 'Unknown compilation error';
 *     if (errorMessage.includes('import')) {
 *       errorMessage = 'Failed to load Leo compiler. Your browser may not support WebAssembly.';
 *     }
 *     return {
 *       success: false,
 *       errors: errorMessage,
 *       output: error.stack || '',
 *     };
 *   }
 * }
 */

/**
 * Verify Leo syntax without full compilation (lighter check)
 */
export function verifyLeoSyntax(sourceCode: string): {
  valid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  // Basic syntax checks
  if (!sourceCode.includes('program') || !sourceCode.includes('.aleo')) {
    errors.push('Program must contain a program declaration (e.g., program hello.aleo)');
  }

  if (!sourceCode.includes('transition') && !sourceCode.includes('function')) {
    errors.push('Program must contain at least one transition or function');
  }

  // Check for common syntax errors
  const braceCount = (sourceCode.match(/{/g) || []).length - (sourceCode.match(/}/g) || []).length;
  if (braceCount !== 0) {
    errors.push('Mismatched braces: ' + (braceCount > 0 ? 'missing closing brace' : 'extra closing brace'));
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
