"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckSquare,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Star,
  Sparkles,
  Layers,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Experience zero latency with our optimized real-time sync technology. Your tasks update instantly across all devices.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption protects your data. Two-factor authentication and SSO integration keep your workspace secure.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with shared workspaces, real-time editing, and smart notifications for your team.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Full-featured mobile app with offline support. Stay productive whether you're online or offline.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Layers,
    title: "Smart Organization",
    description:
      "AI-powered categorization and smart filters help you find what you need instantly.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Sparkles,
    title: "Beautiful Design",
    description:
      "A stunning interface that's a joy to use. Dark mode, custom themes, and accessibility baked in.",
    gradient: "from-pink-400 to-rose-500",
  },
];

const stats = [
  { value: "10M+", label: "Tasks Completed" },
  { value: "500K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

const testimonials = [
  {
    content:
      "TaskFlow transformed how our team manages projects. The real-time collaboration is a game-changer.",
    author: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatar: "SC",
  },
  {
    content:
      "The most intuitive task management tool I've ever used. Beautiful design meets powerful features.",
    author: "Marcus Johnson",
    role: "Freelance Designer",
    avatar: "MJ",
  },
  {
    content:
      "Finally, a tool that understands how modern teams work. TaskFlow is now essential to our daily workflow.",
    author: "Emily Rodriguez",
    role: "Engineering Lead at StartupX",
    avatar: "ER",
  },
];

// Fixed particle positions to avoid hydration mismatch
const particles = [
  { left: 5, delay: 0, duration: 15 },
  { left: 15, delay: 2, duration: 12 },
  { left: 25, delay: 4, duration: 18 },
  { left: 35, delay: 1, duration: 14 },
  { left: 45, delay: 5, duration: 16 },
  { left: 55, delay: 3, duration: 13 },
  { left: 65, delay: 7, duration: 17 },
  { left: 75, delay: 6, duration: 11 },
  { left: 85, delay: 8, duration: 19 },
  { left: 95, delay: 2.5, duration: 15 },
  { left: 10, delay: 1.5, duration: 12 },
  { left: 20, delay: 3.5, duration: 14 },
  { left: 30, delay: 5.5, duration: 16 },
  { left: 40, delay: 7.5, duration: 18 },
  { left: 50, delay: 9, duration: 13 },
  { left: 60, delay: 4.5, duration: 15 },
  { left: 70, delay: 6.5, duration: 17 },
  { left: 80, delay: 8.5, duration: 11 },
  { left: 90, delay: 10, duration: 14 },
  { left: 100, delay: 1, duration: 16 },
];

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 particle-bg">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
            <span className="text-sm text-muted-foreground">
              Now with AI-Powered Features
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Organize Your Life
            </span>
            <br />
            <span className="text-foreground">Achieve Your Goals</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The modern task management platform designed for productive teams.
            Beautiful, intuitive, and powerful.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 w-full sm:w-auto group"
              >
                Start Free Trial
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 hover:bg-white/5"
              >
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you stay organized, focused, and
            productive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full bg-card/50 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Thousands of
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Productive Teams
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 p-12 md:p-20 text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ready to Boost Your
              <br />
              Productivity?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of teams who trust TaskFlow to stay organized and
              achieve their goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-white/90 w-full md:w-auto"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
