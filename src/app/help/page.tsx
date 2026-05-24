"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Heart,
  Sparkles,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreathingExercise } from "@/components/shared/BreathingExercise";
import {
  hotlineResources,
  selfCareResources,
  meditationResources,
} from "@/data/resources";
import { cn } from "@/lib/utils";

type Tab = "hotlines" | "self-care" | "meditation" | "breathing";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "hotlines", label: "Helplines", icon: "📞" },
  { id: "self-care", label: "Self-Care", icon: "🌱" },
  { id: "meditation", label: "Meditation", icon: "🧘" },
  { id: "breathing", label: "Breathe", icon: "🫁" },
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<Tab>("hotlines");

  return (
    <PageContainer>
      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart size={18} className="text-rose-500" />
          <span className="text-sm font-semibold text-rose-700">
            You are not alone
          </span>
        </div>
        <p className="text-sm text-rose-600 leading-relaxed">
          If you&apos;re in crisis or need someone to talk to, help is
          available 24/7. These resources are free and confidential.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 mb-6 p-1 rounded-2xl bg-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "hotlines" && <HotlinesSection />}
          {activeTab === "self-care" && <SelfCareSection />}
          {activeTab === "meditation" && <MeditationSection />}
          {activeTab === "breathing" && <BreathingSection />}
        </motion.div>
      </AnimatePresence>

      <div className="h-8" />
    </PageContainer>
  );
}

function HotlinesSection() {
  return (
    <div className="space-y-3">
      <SectionHeader
        title="Crisis Hotlines"
        subtitle="Free, confidential, 24/7 support"
      />
      {hotlineResources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
                  resource.bgColor
                )}
              >
                {resource.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5 mb-2">
                  {resource.description}
                </p>
                    {resource.phone && (
                  <a
                    href={`tel:${resource.phone.replace(/[^0-9]/g, "")}`}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      resource.textColor,
                      resource.bgColor
                    )}
                  >
                    <Phone size={14} />
                    {resource.phone}
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function SelfCareSection() {
  return (
    <div className="space-y-3">
      <SectionHeader
        title="Self-Care Resources"
        subtitle="Simple practices for when you need them"
      />
      {selfCareResources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
                  resource.bgColor
                )}
              >
                {resource.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {resource.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Grounding Exercise */}
      <Card>
        <SectionHeader
          title="5-4-3-2-1 Grounding Technique"
          subtitle="Use this when feeling overwhelmed"
        />
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong className="text-rose-500">5</strong> things you can see
          </p>
          <p>
            <strong className="text-amber-500">4</strong> things you can touch
          </p>
          <p>
            <strong className="text-emerald-500">3</strong> things you can hear
          </p>
          <p>
            <strong className="text-sky-500">2</strong> things you can smell
          </p>
          <p>
            <strong className="text-purple-500">1</strong> thing you can taste
          </p>
        </div>
      </Card>
    </div>
  );
}

function MeditationSection() {
  return (
    <div className="space-y-3">
      <SectionHeader
        title="Meditation Recommendations"
        subtitle="Guided practices for calm and clarity"
      />
      {meditationResources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
                  resource.bgColor
                )}
              >
                {resource.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {resource.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      <Card className="bg-gradient-to-br from-mindspace-lavender-light to-white">
        <div className="text-center">
          <Sparkles size={24} className="mx-auto text-mindspace-primary mb-2" />
          <p className="text-sm text-gray-700 font-medium">
            &ldquo;The mind is everything. What you think you become.&rdquo;
          </p>
          <p className="text-xs text-gray-400 mt-1">— Buddha</p>
        </div>
      </Card>
    </div>
  );
}

function BreathingSection() {
  return (
    <div>
      <SectionHeader
        title="Guided Breathing Exercise"
        subtitle="Follow the circle — 4 seconds in, 4 hold, 4 out, 2 rest"
      />
      <Card>
        <BreathingExercise />
      </Card>

      <Card className="mt-4">
        <SectionHeader
          title="Box Breathing"
          subtitle="A simple technique used by Navy SEALs"
        />
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-sky-100 text-sky-700 text-center">
            <p className="font-bold">4s</p>
            <p className="text-xs">Inhale</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 text-center">
            <p className="font-bold">4s</p>
            <p className="text-xs">Hold</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-100 text-rose-700 text-center">
            <p className="font-bold">4s</p>
            <p className="text-xs">Exhale</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-100 text-amber-700 text-center">
            <p className="font-bold">4s</p>
            <p className="text-xs">Hold</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
