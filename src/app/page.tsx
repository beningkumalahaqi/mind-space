"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Brain, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const features = [
  {
    icon: Heart,
    title: "Mood Check-ins",
    description: "Track your emotional well-being with simple daily check-ins",
    color: "text-rose-500 bg-rose-100",
  },
  {
    icon: Smartphone,
    title: "Screen Time Reflection",
    description: "Understand your digital habits and find healthier balance",
    color: "text-sky-500 bg-sky-100",
  },
  {
    icon: Brain,
    title: "Digital Detox Challenges",
    description: "Build better tech habits with guided challenges",
    color: "text-purple-500 bg-purple-100",
  },
  {
    icon: Sparkles,
    title: "Safe Community",
    description: "Connect with others on their digital wellness journey",
    color: "text-emerald-500 bg-emerald-100",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mindspace-lavender-light via-background to-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
        <span className="text-xl font-bold bg-gradient-to-r from-mindspace-primary to-mindspace-secondary bg-clip-text text-transparent">
          MindSpace
        </span>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-mindspace-primary hover:text-mindspace-primary/80 transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={stagger}
        className="px-4 pt-12 pb-16 max-w-lg mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-mindspace-lavender-light text-mindspace-primary">
            <Sparkles size={14} />
            Your Digital Wellness Companion
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          Find Your{" "}
          <span className="bg-gradient-to-r from-mindspace-primary to-mindspace-secondary bg-clip-text text-transparent">
            Digital Balance
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base text-gray-600 leading-relaxed mb-8 max-w-sm mx-auto"
        >
          A calming space designed for Gen Z to practice digital well-being,
          track mood, reflect on screen time, and build healthier tech habits.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-mindspace-primary/25">
              Start Your Journey
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/help">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Emergency Help
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="px-4 py-12 max-w-lg mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-bold text-gray-800 text-center mb-8"
        >
          Everything you need to{" "}
          <span className="text-mindspace-primary">thrive</span>
        </motion.h2>

        <div className="grid gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100/60 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.color}`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="px-4 py-16 max-w-lg mx-auto text-center"
      >
        <motion.div
          variants={fadeUp}
          className="p-8 rounded-3xl bg-gradient-to-br from-mindspace-lavender-light via-white to-mindspace-mint-light border border-gray-100/60"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Ready to find your balance?
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-xs mx-auto">
            Join MindSpace and take the first step toward a healthier
            relationship with technology.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="primary" className="shadow-lg shadow-mindspace-primary/25">
              Get Started Free
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-xs text-gray-400 max-w-lg mx-auto pb-24">
        <p>MindSpace — Academic UX/UI Prototype</p>
        <p className="mt-1">Supporting SDG 3: Good Health and Well-being</p>
      </footer>
    </div>
  );
}
