"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-surface border-b border-brand-muted/20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-brand-text font-bold text-lg tracking-tight hover:text-brand-secondary transition-colors"
        >
          🔥 BBQ Calculator
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/gear"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            Gear
          </Link>
          <Link
            href="/guides"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/wood-chart"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            Wood Chart
          </Link>
          <Link
            href="/saves"
            className="text-brand-muted hover:text-brand-text transition-colors"
          >
            My Saves
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-muted hover:text-brand-text transition-colors p-1"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-brand-surface border-t border-brand-muted/20 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <Link
            href="/"
            className="text-brand-muted hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="text-brand-muted hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="/gear"
            className="text-brand-muted hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Gear
          </Link>
          <Link
            href="/guides"
            className="text-brand-muted hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Guides
          </Link>
          <Link
            href="/wood-chart"
            className="text-brand-muted hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Wood Chart
          </Link>
          <Link
            href="/saves"
            className="text-brand-muted hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            My Saves
          </Link>
        </nav>
      )}
    </header>
  );
}
