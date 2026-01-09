'use client';

import { motion } from 'framer-motion';
import { LessonContent } from '@/app/types/lesson';

interface LessonTimelineProps {
    sections: NonNullable<LessonContent['teachingSections']>;
}

export default function LessonTimeline({ sections }: LessonTimelineProps) {
    // Flatten slides from all sections creates a linear journey
    const allModules = sections.flatMap((section, sIdx) =>
        section.slides.map((slide, slideIdx) => ({
            ...slide,
            sectionTitle: slideIdx === 0 ? section.sectionTitle : null,
            globalIndex: sIdx * 10 + slideIdx // crude unique key gen
        }))
    );

    return (
        <div className="relative py-12 max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-200" />

            <div className="space-y-12">
                {allModules.map((module, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-24 pr-6"
                    >
                        {/* Node on the line */}
                        <div className={`absolute left-[26px] top-6 w-3 h-3 rounded-full border-2 bg-white z-10 transition-colors duration-500
                ${i === 0 ? 'border-blue-600 scale-125' : 'border-zinc-300 group-hover:border-blue-400'}
            `} />

                        {/* Section Header (if start of new section) */}
                        {module.sectionTitle && (
                            <div className="absolute -left-4 -top-10 flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-[#FAFAFA] py-1 pr-2">
                                    {module.sectionTitle}
                                </span>
                            </div>
                        )}

                        {/* Content Card */}
                        <div className="group p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl pt-1 bg-zinc-50 w-12 h-12 flex items-center justify-center rounded-xl">{module.emoji || '⚡️'}</span>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {module.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {module.content.substring(0, 120)}...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* End Node */}
            <div className="absolute left-[23px] bottom-0 w-4 h-4 rounded-full bg-zinc-200" />
        </div>
    );
}
