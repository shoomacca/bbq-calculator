'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GearRecommendation from '@/components/GearRecommendation';

interface GalleryPost {
  id: string;
  before_url: string;
  after_url: string;
  name: string | null;
  cut: string;
  method: string;
  gear_used: string | null;
  report_count: number;
  created_at: string;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-brand-surface animate-pulse">
      <div className="flex">
        <div className="flex-1 aspect-square bg-white/5" />
        <div className="flex-1 aspect-square bg-white/10" />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-white/10 rounded w-2/3" />
        <div className="h-3 bg-white/5 rounded w-1/3" />
      </div>
    </div>
  );
}

function PostCard({ post, onReport }: { post: GalleryPost; onReport: (id: string) => void }) {
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    if (reported) return;
    fetch('/api/gallery/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post.id }),
    }).catch(() => {});
    // Track in sessionStorage to prevent repeat reports
    const key = `bbq_reported_${post.id}`;
    sessionStorage.setItem(key, '1');
    setReported(true);
    onReport(post.id);
  };

  useEffect(() => {
    if (sessionStorage.getItem(`bbq_reported_${post.id}`)) setReported(true);
  }, [post.id]);

  return (
    <div className="rounded-xl overflow-hidden bg-brand-surface border border-white/8 flex flex-col">
      {/* Before / After thumbnails */}
      <div className="flex">
        <div className="relative flex-1 aspect-square">
          <Image
            src={post.before_url}
            alt={`Before — ${post.cut}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 200px"
          />
          <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            BEFORE
          </span>
        </div>
        <div className="relative flex-1 aspect-square border-l border-black/20">
          <Image
            src={post.after_url}
            alt={`After — ${post.cut}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 200px"
          />
          <span className="absolute top-1.5 left-1.5 bg-orange-500/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            AFTER
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-3 py-2.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-brand-text text-xs font-semibold truncate">{post.cut}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] bg-orange-500/20 text-orange-400 font-medium px-1.5 py-0.5 rounded">
              {post.method}
            </span>
            {post.name && (
              <span className="text-brand-muted text-[10px] truncate">{post.name}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleReport}
          disabled={reported}
          title={reported ? 'Reported' : 'Report this post'}
          className="flex-none text-[10px] text-brand-muted/40 hover:text-brand-muted disabled:opacity-30 transition-colors mt-0.5"
        >
          {reported ? '✓' : '⚑'}
        </button>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [methodFilter, setMethodFilter] = useState('');
  const [cutFilter, setCutFilter] = useState('');

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then(({ posts }) => { setPosts(posts ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Build unique filter options from loaded posts
  const methods = useMemo(
    () => Array.from(new Set(posts.map((p) => p.method))).sort(),
    [posts]
  );
  const cuts = useMemo(
    () => Array.from(new Set(posts.map((p) => p.cut))).sort(),
    [posts]
  );

  // Client-side filter
  const filtered = useMemo(
    () => posts.filter((p) => {
      if (methodFilter && p.method !== methodFilter) return false;
      if (cutFilter && p.cut !== cutFilter) return false;
      return true;
    }),
    [posts, methodFilter, cutFilter]
  );

  const handleReport = (id: string) => {
    // Remove post from view after a short delay (optional UX polish)
    setTimeout(() => setPosts((prev) => prev.filter((p) => p.id !== id)), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-brand-text text-2xl font-bold">Cook Gallery</h1>
        <p className="text-brand-muted text-sm mt-1">
          Before &amp; after cooks from the BBQ Pro community
        </p>
      </div>

      {/* Filter bar */}
      {!loading && posts.length > 0 && (
        <div className="flex gap-3 mb-6 flex-wrap">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-brand-surface border border-white/15 text-brand-text text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500/50"
          >
            <option value="">All Methods</option>
            {methods.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={cutFilter}
            onChange={(e) => setCutFilter(e.target.value)}
            className="bg-brand-surface border border-white/15 text-brand-text text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500/50"
          >
            <option value="">All Cuts</option>
            {cuts.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {(methodFilter || cutFilter) && (
            <button
              onClick={() => { setMethodFilter(''); setCutFilter(''); }}
              className="text-brand-muted text-sm hover:text-brand-text transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Two-column layout: posts grid + gear sidebar */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Posts column */}
        <div className="flex-1 min-w-0">

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <span className="text-6xl">🍖</span>
              <p className="text-brand-text font-semibold text-lg">
                {posts.length === 0
                  ? 'No cooks shared yet — be the first!'
                  : 'No cooks match those filters'}
              </p>
              {posts.length === 0 && (
                <p className="text-brand-muted text-sm max-w-xs">
                  Calculate a cook and use the &ldquo;📸 Share your cook&rdquo; button to post your before &amp; after photos.
                </p>
              )}
              <Link
                href="/calculator"
                className="mt-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: '#f97316' }}
              >
                Calculate a Cook →
              </Link>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} onReport={handleReport} />
              ))}
            </div>
          )}

        </div>

        {/* Gear sidebar */}
        <div className="md:w-56 flex-none">
          <GearRecommendation limit={3} title="Shop the Gear" />
        </div>

      </div>

    </div>
  );
}
