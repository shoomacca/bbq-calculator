"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[calc(100%-32px)] md:w-fit"
    >
      <div 
        className="flex items-center justify-between md:justify-center px-4 md:px-6 h-14 md:h-16 rounded-full gap-4 md:gap-8"
        style={{
          background: 'rgba(10, 21, 13, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="text-[20px] transition-transform group-hover:scale-110 duration-300">🔥</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/10 ${pathname === '/' ? 'text-[#FAF6E9] bg-white/5' : 'text-white/70 hover:text-[#FAF6E9]'}`}
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/10 ${pathname === '/recipes' ? 'text-[#FAF6E9] bg-white/5' : 'text-white/70 hover:text-[#FAF6E9]'}`}
          >
            Recipes
          </Link>
          <Link
            href="/techniques"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/10 ${pathname === '/techniques' ? 'text-[#FAF6E9] bg-white/5' : 'text-white/70 hover:text-[#FAF6E9]'}`}
          >
            Techniques
          </Link>
          <Link
            href="/wood-chart"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/10 ${pathname === '/wood-chart' ? 'text-[#FAF6E9] bg-white/5' : 'text-white/70 hover:text-[#FAF6E9]'}`}
          >
            Wood Chart
          </Link>
          
          <div className="w-[1px] h-4 bg-white/10 mx-3" />
          
          <Link
            href="/saves"
            className="px-4 py-2 rounded-full text-[#5A9B6A] text-sm font-semibold hover:text-[#6BC17C] hover:bg-white/10 transition-all duration-300 flex items-center gap-1.5"
          >
            🔖 My Saves
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
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
            strokeWidth="2.5"
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

      {/* Mobile menu drop down below pill */}
      {menuOpen && (
        <nav 
          className="md:hidden flex flex-col px-4 py-3 gap-1 absolute top-[calc(100%+8px)] w-full rounded-2xl"
          style={{
            background: 'rgba(10, 21, 13, 0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          }}
        >
          <Link
            href="/"
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${pathname === '/' ? 'text-[#FAF6E9] bg-white/10' : 'text-white/80 hover:text-[#FAF6E9] hover:bg-white/5'}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${pathname === '/recipes' ? 'text-[#FAF6E9] bg-white/10' : 'text-white/80 hover:text-[#FAF6E9] hover:bg-white/5'}`}
            onClick={() => setMenuOpen(false)}
          >
            Recipes
          </Link>
          <Link
            href="/techniques"
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${pathname === '/techniques' ? 'text-[#FAF6E9] bg-white/10' : 'text-white/80 hover:text-[#FAF6E9] hover:bg-white/5'}`}
            onClick={() => setMenuOpen(false)}
          >
            Techniques
          </Link>
          <Link
            href="/wood-chart"
            className={`px-4 py-3 rounded-xl font-semibold transition-all ${pathname === '/wood-chart' ? 'text-[#FAF6E9] bg-white/10' : 'text-white/80 hover:text-[#FAF6E9] hover:bg-white/5'}`}
            onClick={() => setMenuOpen(false)}
          >
            Wood Chart
          </Link>
          
          <div className="h-[1px] w-full bg-white/10 my-1" />
          <Link
            href="/saves"
            className="px-4 py-3 rounded-xl text-[#5A9B6A] font-semibold hover:text-[#6BC17C] hover:bg-white/10 transition-all flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            🔖 My Saves
          </Link>
        </nav>
      )}
    </header>
  );
}
