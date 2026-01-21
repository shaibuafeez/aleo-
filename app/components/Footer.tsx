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
      { label: "Aleo Documentation", href: "https://developer.aleo.org", external: true },
      { label: "Leo Language", href: "https://developer.aleo.org/leo", external: true },
      { label: "Aleo Network", href: "https://aleo.org", external: true },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ]
  };

  return (
    <footer className="bg-aleo-black text-white pt-10 md:pt-20 pb-0 border-t border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-32">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <Link href="/" className="text-xl font-bold tracking-tighter mb-4 md:mb-6 block bg-gradient-to-r from-aleo-green to-aleo-green-light bg-clip-text text-transparent">
                Leo by Practice.
              </Link>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Master zero-knowledge programming on Aleo through building private applications.
              </p>
            </div>
            <div className="mt-8 md:mt-0 hidden md:block space-y-4">
              <a
                href="https://aleo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-40"
              >
                <img
                  src="/aleo/built-with-aleo-badge-light.svg"
                  alt="Built with Aleo"
                  className="w-full opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                © 2025 Leo by Practice
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-mono font-medium text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Product</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-aleo-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-mono font-medium text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Resources</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-400 hover:text-aleo-green transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-mono font-medium text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Legal</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-aleo-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Copyright */}
          <div className="col-span-2 md:hidden mt-4">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
              © 2025 Leo by Practice
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
