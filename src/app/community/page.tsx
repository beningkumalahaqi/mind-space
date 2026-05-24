"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Send,
  Users,
  Shield,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultCommunityPosts } from "@/data/community";
import type { CommunityPost } from "@/types";
import { cn } from "@/lib/utils";

const anonymousNames = [
  "MindfulExplorer",
  "DigitalNomad",
  "ZenMaster",
  "GratefulHeart",
  "SunshineSeeker",
  "NatureLover",
  "PeacefulSoul",
  "CalmWave",
  "QuietStrength",
  "GentleSpirit",
];

function getRandomName(): string {
  return anonymousNames[Math.floor(Math.random() * anonymousNames.length)];
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommunityPage() {
  const [posts, setPosts] = useLocalStorage<CommunityPost[]>(
    "community_posts",
    defaultCommunityPosts
  );
  const [newPost, setNewPost] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const { showToast } = useToast();

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      content: newPost.trim(),
      author: getRandomName(),
      timestamp: Date.now(),
      likes: 0,
      tags: [],
      replies: [],
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    setShowNewPost(false);
    showToast("Your anonymous post has been shared! 💜", "success");
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleReply = (postId: string) => {
    if (!replyText.trim()) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: [
                ...p.replies,
                {
                  id: `reply-${Date.now()}`,
                  content: replyText.trim(),
                  author: getRandomName(),
                  timestamp: Date.now(),
                },
              ],
            }
          : p
      )
    );

    setReplyText("");
    showToast("Supportive reply sent! 💕", "success");
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} className="text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600">
            Anonymous & Supportive
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Safe Community</h1>
        <p className="text-sm text-gray-500 mt-1">
          Share your journey and support others — all anonymously.
        </p>
      </div>

      {/* Create Post */}
      <Card className="mb-6">
        {showNewPost ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts, struggles, or wins..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
              >
                <Send size={16} className="mr-1" />
                Post Anonymously
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowNewPost(false);
                  setNewPost("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewPost(true)}
            className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-mindspace-primary/50 hover:text-mindspace-primary transition-all"
          >
            <Users size={20} />
            <span className="text-sm font-medium">
              Share something with the community...
            </span>
          </button>
        )}
      </Card>

      {/* Community Feed */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mindspace-primary to-mindspace-secondary flex items-center justify-center text-white text-xs font-bold">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-400">
                      {timeAgo(post.timestamp)}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  Anonymous
                </span>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-mindspace-lavender-light text-mindspace-primary text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <Heart
                    size={16}
                    className={cn(
                      "transition-colors",
                      post.likes > 0 && "fill-rose-400 text-rose-400"
                    )}
                  />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() =>
                    setExpandedPost(
                      expandedPost === post.id ? null : post.id
                    )
                  }
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-mindspace-primary transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>{post.replies.length}</span>
                </button>
              </div>

              {/* Replies */}
              <AnimatePresence>
                {expandedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-100 space-y-3"
                  >
                    {post.replies.length > 0 && (
                      <div className="space-y-2">
                        {post.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-2 p-2 rounded-lg bg-gray-50"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-mindspace-secondary to-mindspace-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                              {reply.author[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-700">
                                  {reply.author}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {timeAgo(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Write a supportive reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={1}
                        className="!py-2 text-sm"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        className="self-end"
                        onClick={() => handleReply(post.id)}
                        disabled={!replyText.trim()}
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="h-8" />
    </PageContainer>
  );
}
