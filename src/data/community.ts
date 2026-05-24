import type { CommunityPost } from "@/types";

export const defaultCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    content:
      "Just finished my first 24-hour social media detox! It was tough at first, but I felt so much more present. Highly recommend trying it 🧘",
    author: "MindfulExplorer",
    timestamp: Date.now() - 3600000 * 2,
    likes: 24,
    tags: ["detox", "mindfulness"],
    replies: [
      {
        id: "reply-1",
        content:
          "That's amazing! I'm on hour 10 of my first attempt. This gives me motivation! 🌟",
        author: "DigitalNomad",
        timestamp: Date.now() - 3600000,
      },
      {
        id: "reply-2",
        content:
          "Welcome to the club! It gets easier after the first few times 💪",
        author: "ZenMaster",
        timestamp: Date.now() - 1800000,
      },
    ],
  },
  {
    id: "post-2",
    content:
      "Anyone else struggle with checking their phone first thing in the morning? Looking for tips to break this habit 🙏",
    author: "EarlyBird",
    timestamp: Date.now() - 3600000 * 5,
    likes: 18,
    tags: ["habits", "morning-routine"],
    replies: [
      {
        id: "reply-3",
        content:
          "I keep my phone in another room at night! Use a regular alarm clock instead. Game changer! ⏰",
        author: "TechFree",
        timestamp: Date.now() - 3600000 * 4,
      },
    ],
  },
  {
    id: "post-3",
    content:
      "Day 5 of my gratitude journal challenge. I've noticed I'm appreciating the small things so much more. Try it! 📝✨",
    author: "GratefulHeart",
    timestamp: Date.now() - 3600000 * 8,
    likes: 31,
    tags: ["gratitude", "journaling"],
    replies: [
      {
        id: "reply-4",
        content:
          "I started this last week! It really shifts your perspective. So glad it's helping you too 💕",
        author: "SunshineSeeker",
        timestamp: Date.now() - 3600000 * 6,
      },
      {
        id: "reply-5",
        content: "What are you grateful for today? 😊",
        author: "CuriousMind",
        timestamp: Date.now() - 3600000 * 3,
      },
    ],
  },
  {
    id: "post-4",
    content:
      "Just discovered this app and I'm so excited to start my digital wellness journey! Any tips for beginners? 🌱",
    author: "NewBeginnings",
    timestamp: Date.now() - 3600000 * 12,
    likes: 15,
    tags: ["newbie", "welcome"],
    replies: [
      {
        id: "reply-6",
        content:
          "Welcome! Start small — maybe just the Phone-Free Morning challenge. You've got this! 🎉",
        author: "MindfulExplorer",
        timestamp: Date.now() - 3600000 * 10,
      },
    ],
  },
  {
    id: "post-5",
    content:
      "Had a tough day today. Instead of doom-scrolling, I took a walk in the park. Feeling much better now 🌳💚",
    author: "NatureLover",
    timestamp: Date.now() - 3600000 * 14,
    likes: 42,
    tags: ["self-care", "nature"],
    replies: [
      {
        id: "reply-7",
        content:
          "Nature really is the best medicine. Proud of you for choosing that! 🌿",
        author: "GreenThumb",
        timestamp: Date.now() - 3600000 * 12,
      },
      {
        id: "reply-8",
        content:
          "This is such a great reminder. Going for a walk right now! 🚶‍♀️",
        author: "WalkingEnthusiast",
        timestamp: Date.now() - 3600000 * 11,
      },
    ],
  },
];
