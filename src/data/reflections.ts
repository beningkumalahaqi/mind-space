export const reflectionQuestions = [
  "How did you feel after using social media today?",
  "What could you have done with the time you spent on your phone?",
  "Did you notice any moments when you picked up your phone without thinking?",
  "How many times did you check your phone within the first hour of waking up?",
  "What activity made you feel most present today?",
  "Did you use your phone while eating meals today?",
  "What would you like to change about your digital habits?",
  "How did notifications affect your focus today?",
  "Did you reach for your phone during any uncomfortable emotions?",
  "What real-world connection did you make today instead of a digital one?",
];

export const topPlatforms = [
  { value: "instagram", label: "Instagram", emoji: "📸" },
  { value: "tiktok", label: "TikTok", emoji: "🎵" },
  { value: "youtube", label: "YouTube", emoji: "▶️" },
  { value: "twitter", label: "X / Twitter", emoji: "🐦" },
  { value: "snapchat", label: "Snapchat", emoji: "👻" },
  { value: "whatsapp", label: "WhatsApp", emoji: "💬" },
  { value: "discord", label: "Discord", emoji: "🎮" },
  { value: "reddit", label: "Reddit", emoji: "🤖" },
  { value: "other", label: "Other", emoji: "📱" },
];

export const wellnessInsights: Record<string, string[]> = {
  low: [
    "Great job keeping screen time minimal! Your mind thanks you. 🌟",
    "You're doing amazing at maintaining a healthy digital balance!",
    "Your screen habits show strong self-awareness. Keep it up! ✨",
  ],
  medium: [
    "Consider taking short breaks between screen sessions. Your eyes will thank you! 👀",
    "Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    "You're in a good range! A few mindful moments could make your screen time even healthier.",
  ],
  high: [
    "Your screen time is a bit high today. Try a digital detox challenge! 🌿",
    "Consider setting app timers to help manage your usage. Small steps make a big difference!",
    "Your brain needs rest too! Try a 5-minute break away from all screens.",
    "It happens to the best of us. Tomorrow's a new chance to find better balance! 💪",
  ],
};

export function generateWellnessInsight(hours: number): string {
  const category = hours <= 2 ? "low" : hours <= 5 ? "medium" : "high";
  const insights = wellnessInsights[category];
  return insights[Math.floor(Math.random() * insights.length)];
}
