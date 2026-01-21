"use client";

import { motion } from "framer-motion";
import { LessonContent, TeachingSection } from "@/app/types/lesson";

interface LessonSidebarProps {
    lesson: LessonContent;
    currentSectionIndex: number;
    completedSections: number[]; // Array of completed section indices
    phase: 'intro' | 'teaching' | 'exercise' | 'quiz' | 'practice';
}

export default function LessonSidebar({
    lesson,
    currentSectionIndex,
    completedSections,
    phase
}: LessonSidebarProps) {
    const sections = lesson.teachingSections || [];

    return (
        <div className="w-64 h-full bg-white border-r-2 border-gray-100 flex flex-col font-mono text-sm relative z-20">
            {/* Header / XP */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Mission Protocol</span>
                    <div className="flex items-center gap-1.5 text-aleo-green-dark font-bold">
                        <span className="w-2 h-2 bg-aleo-green rounded-full animate-pulse" />
                        <span>ONLINE</span>
                    </div>
                </div>
                <h1 className="font-bold text-black leading-tight mb-2">{lesson.title}</h1>
                <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-bold">{lesson.difficulty}</span>
                    <span className="px-2 py-0.5 bg-aleo-green/20 text-aleo-green-dark rounded font-bold">+{lesson.xpReward} XP</span>
                </div>
            </div>

            {/* Timeline / Progress */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="space-y-6">
                    {/* Phase: Briefing */}
                    <div className={`relative pl-4 border-l-2 transition-colors duration-300 ${phase === 'intro' ? 'border-aleo-green' : 'border-gray-100'
                        }`}>
                        <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'intro' ? 'bg-aleo-green' : 'bg-gray-200'
                            }`} />
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${phase === 'intro' ? 'text-aleo-green-dark' : 'text-gray-400'
                            }`}>Phase 01</span>
                        <span className={`font-bold ${phase === 'intro' ? 'text-black' : 'text-gray-500'
                            }`}>Briefing</span>
                    </div>

                    {/* Phase: Learning Modules */}
                    <div className="relative pl-4 border-l-2 border-gray-100 pb-2">
                        <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'teaching' || phase === 'exercise' ? 'bg-aleo-green' : (
                            phase === 'intro' ? 'bg-gray-200' : 'bg-aleo-green' // Completed if past intro
                        )
                            }`} />
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-3 ${phase === 'teaching' || phase === 'exercise' ? 'text-aleo-green-dark' : 'text-gray-400'
                            }`}>Phase 02 · Modules</span>

                        <div className="space-y-3">
                            {sections.map((section, idx) => {
                                const isActive = idx === currentSectionIndex && (phase === 'teaching' || phase === 'exercise');
                                const isCompleted = completedSections.includes(idx) || (idx < currentSectionIndex);

                                return (
                                    <div key={idx} className="flex items-start gap-3 group">
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ring-2 ring-offset-2 transition-all ${isActive ? 'bg-aleo-green ring-aleo-green/20' :
                                            isCompleted ? 'bg-gray-300 ring-transparent' : 'bg-gray-100 ring-transparent'
                                            }`} />
                                        <div className="flex-1">
                                            <p className={`text-xs font-medium leading-tight transition-colors ${isActive ? 'text-black' :
                                                isCompleted ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-400'
                                                }`}>
                                                {section.sectionTitle}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Phase: Final Exam */}
                    <div className={`relative pl-4 border-l-2 transition-colors duration-300 ${phase === 'quiz' ? 'border-aleo-green' : 'border-gray-100'
                        }`}>
                        <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'quiz' ? 'bg-aleo-green' : (
                            phase === 'practice' ? 'bg-aleo-green' : 'bg-gray-200'
                        )
                            }`} />
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${phase === 'quiz' ? 'text-aleo-green-dark' : 'text-gray-400'
                            }`}>Phase 03</span>
                        <span className={`font-bold ${phase === 'quiz' ? 'text-black' : 'text-gray-500'
                            }`}>Certification Quiz</span>
                    </div>

                    {/* Phase: Free Flight */}
                    <div className={`relative pl-4 border-l-2 transition-colors duration-300 ${phase === 'practice' ? 'border-aleo-green' : 'border-gray-100'
                        }`}>
                        <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full transition-colors duration-300 ${phase === 'practice' ? 'bg-aleo-green' : 'bg-gray-200'
                            }`} />
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${phase === 'practice' ? 'text-aleo-green-dark' : 'text-gray-400'
                            }`}>Phase 04</span>
                        <span className={`font-bold ${phase === 'practice' ? 'text-black' : 'text-gray-500'
                            }`}>Free Flight</span>
                    </div>

                </div>
            </div>

            {/* Footer / User Status */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-400 text-xs">
                        ME
                    </div>
                    <div>
                        <div className="text-xs font-bold text-black">Cadet</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Level 1</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
