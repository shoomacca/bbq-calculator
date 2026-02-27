"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Home page is full-viewport — no footer
  if (pathname === "/") return null;

  const year = new Date().getFullYear();

  return (
    <footer 
      className="py-10"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center text-xs font-medium text-white/40 tracking-wide">
        <p>© {year} Smokemaster BBQ — Know Exactly When Your BBQ Is Done</p>
      </div>
    </footer>
  );
}
