'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');

    // Simulate newsletter signup (replace with actual API call)
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1000);
  };

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/sui',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/sui',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/MystenLabs/sui',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: 'https://t.me/sui_network',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ];

  const footerLinks = {
    product: [
      { label: 'All Lessons', href: '/lessons' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Features', href: '/#features' },
    ],
    resources: [
      { label: 'Sui Documentation', href: 'https://docs.sui.io', external: true },
      { label: 'Move Language', href: 'https://move-language.github.io/move/', external: true },
      { label: 'Sui Network', href: 'https://sui.io', external: true },
    ],
    community: [
      { label: 'Twitter', href: 'https://twitter.com/sui', external: true },
      { label: 'Discord', href: 'https://discord.gg/sui', external: true },
      { label: 'GitHub', href: 'https://github.com/MystenLabs/sui', external: true },
    ],
  };

  return (
    <footer className="bg-sui-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-sui-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Stay Updated</h3>
              <p className="text-sui-gray-400">
                Get the latest lessons, tips, and Sui blockchain updates delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-sm sm:text-base text-white placeholder-sui-gray-400 focus:outline-none focus:border-sui-ocean focus:ring-2 focus:ring-sui-ocean/50 transition-all disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                  whileHover={{ scale: subscribeStatus === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: subscribeStatus === 'idle' ? 0.98 : 1 }}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-sui-ocean hover:bg-sui-ocean-dark disabled:bg-sui-gray-600 text-white rounded-xl font-semibold text-sm sm:text-base transition-all disabled:cursor-not-allowed"
                >
                  {subscribeStatus === 'loading' && 'Subscribing...'}
                  {subscribeStatus === 'success' && 'Subscribed!'}
                  {subscribeStatus === 'idle' && 'Subscribe'}
                  {subscribeStatus === 'error' && 'Try Again'}
                </motion.button>
              </form>
              {subscribeStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-sui-ocean"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 group">
              <Image
                src="/sui-symbol.svg"
                alt="Sui"
                width={28}
                height={28}
                className="brightness-0 invert group-hover:scale-110 transition-transform sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl font-bold group-hover:text-sui-ocean transition-colors">
                Move By Practice
              </span>
            </Link>
            <p className="text-sui-gray-400 text-sm mb-4 sm:mb-6">
              Learn Sui Move through interactive, gamified lessons. Build real projects and deploy to the blockchain.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-sui-ocean rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sui-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sui-gray-400 hover:text-white transition-colors text-xs sm:text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">Community</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sui-gray-400 hover:text-white transition-colors text-xs sm:text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-sui-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-sui-gray-400">
              © 2025 Move By Practice. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="/privacy" className="text-sui-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sui-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
