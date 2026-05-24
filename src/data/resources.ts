import type { Resource } from "@/types";

export const hotlineResources: Resource[] = [
  {
    id: "hotline-1",
    title: "National Mental Health Hotline",
    description:
      "24/7 confidential support for anyone experiencing mental health challenges.",
    phone: "1-866-903-3787",
    category: "hotline",
    icon: "📞",
    textColor: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    id: "hotline-2",
    title: "Crisis Text Line",
    description:
      "Text with a trained crisis counselor. Free, 24/7, confidential.",
    phone: "Text HOME to 741741",
    category: "hotline",
    icon: "💬",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "hotline-3",
    title: "Youth Mental Health Line",
    description:
      "Free and confidential support for young people aged 12-25.",
    phone: "1-800-668-6868",
    category: "hotline",
    icon: "🧑‍🤝‍🧑",
    textColor: "text-sky-600",
    bgColor: "bg-sky-100",
  },
  {
    id: "hotline-4",
    title: "Substance Abuse Helpline",
    description:
      "Free, confidential, 24/7 support for substance use and mental health concerns.",
    phone: "1-800-662-4357",
    category: "hotline",
    icon: "🤝",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
];

export const selfCareResources: Resource[] = [
  {
    id: "selfcare-1",
    title: "5-Minute Grounding Exercise",
    description:
      "A quick technique to bring yourself back to the present moment when feeling overwhelmed.",
    category: "self-care",
    icon: "🌱",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    id: "selfcare-2",
    title: "Progressive Muscle Relaxation",
    description:
      "Release tension by systematically relaxing each muscle group in your body.",
    category: "self-care",
    icon: "🔄",
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    id: "selfcare-3",
    title: "Digital Sunset Routine",
    description:
      "Create a calming evening routine that doesn't involve screens.",
    category: "self-care",
    icon: "🌙",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export const meditationResources: Resource[] = [
  {
    id: "med-1",
    title: "Beginner's Breath Meditation",
    description:
      "A gentle 5-minute guided meditation focused on your breath. Perfect for beginners.",
    category: "meditation",
    icon: "🧘",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "med-2",
    title: "Body Scan Meditation",
    description:
      "Lie down and scan through your body, releasing tension and finding calm.",
    category: "meditation",
    icon: "🛌",
    textColor: "text-sky-600",
    bgColor: "bg-sky-100",
  },
  {
    id: "med-3",
    title: "Loving-Kindness Meditation",
    description:
      "Cultivate feelings of compassion and kindness toward yourself and others.",
    category: "meditation",
    icon: "💕",
    textColor: "text-rose-600",
    bgColor: "bg-rose-100",
  },
];

export const allResources = [
  ...hotlineResources,
  ...selfCareResources,
  ...meditationResources,
];
