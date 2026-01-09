"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "All Lessons", href: "/lessons" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
    ],
    resources: [
      { label: "Sui Documentation", href: "https://docs.sui.io", external: true },
      { label: "Move Language", href: "https://move-language.github.io/move/", external: true },
      { label: "Sui Network", href: "https://sui.io", external: true },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ]
  };

  return (
    <footer className="bg-white text-black pt-10 md:pt-20 pb-0 border-t border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-32">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <Link href="/" className="text-xl font-bold tracking-tighter-swiss mb-4 md:mb-6 block">
                Move By Practice.
              </Link>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Master the Sui blockchain through building real-world applications.
              </p>
            </div>
            <div className="mt-8 md:mt-0 hidden md:block">
              <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                © 2025 Move By Practice
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-mono font-medium text-gray-400 uppercase tracking-widest mb-4 md:mb-6">Product</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium hover:text-blue-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-mono font-medium text-gray-400 uppercase tracking-widest mb-4 md:mb-6">Resources</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-mono font-medium text-gray-400 uppercase tracking-widest mb-4 md:mb-6">Legal</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium hover:text-blue-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Copyright */}
          <div className="col-span-2 md:hidden mt-4">
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
              © 2025 Move By Practice
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
