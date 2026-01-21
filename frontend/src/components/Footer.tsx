"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckSquare, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#" },
    { label: "Security", href: "#security" },
    { label: "Roadmap", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "API", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://x.com/SahirAhmed980", label: "Twitter" },
  { icon: Github, href: "https://github.com/SahirAhmedSheikh814", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sahirahmedsheikh/", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

// Fixed footer particles to avoid hydration mismatch
const footerParticles = [
  { x: 0, delay: 0, duration: 6 },
  { x: 10, delay: 0.5, duration: 8 },
  { x: -5, delay: 1, duration: 7 },
  { x: 15, delay: 1.5, duration: 9 },
  { x: -10, delay: 2, duration: 5 },
];

export function Footer() {
  return (
    <footer className="bg-background/50 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {footerParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            animate={{
              y: [0, -100],
              x: [particle.x, particle.x + 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: "100%",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TaskFlow
                </span>
                <span className="text-xs text-muted-foreground tracking-wider">
                  ORGANIZE • ACHIEVE • GROW
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The modern way to organize your tasks, boost productivity, and
              achieve your goals. Built for teams that care about efficiency.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={social.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-white/5 hover:text-blue-400 transition-colors"
                    >
                      <social.icon className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-red-500"
            >
              ♥
            </motion.span>
            <span>for productive teams</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
