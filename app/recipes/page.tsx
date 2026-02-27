
import Footer from "@/components/Footer";
import Image from "next/image";

export default function RecipesPage() {
  const RECIPES = [
    { id: 'brisket', title: 'Texas Style Brisket', time: '12-16 hrs', temp: '250°F', src: '/images/brisket.jpg', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2' },
    { id: 'ribs', title: 'Competition Ribs', time: '6 hrs', temp: '225°F', bgCol: 0, bgRow: 0, colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { id: 'pulled-pork', title: 'Carolina Pulled Pork', time: '10-12 hrs', temp: '250°F', bgCol: 1, bgRow: 0, colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { id: 'chicken', title: 'Hot & Fast Chicken', time: '1.5 hrs', temp: '325°F', bgCol: 3, bgRow: 0, colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
    { id: 'fish', title: 'Smoked Salmon', time: '2 hrs', temp: '200°F', src: '/images/fish.jpg', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#0A150D' }}>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 relative">
        
        {/* Cinematic Smoke Overlay */}
        <div
          className="absolute inset-0 z-0 smoke-wisp pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(90,155,106,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FAF6E9] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-display, Georgia, serif)', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            Recipes Hub
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Curated guides to mastering smoke. Deep rich flavors. Perfect bark. Select a recipe to begin the culinary journey.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6">
          {RECIPES.map((recipe) => (
            <div 
              key={recipe.id} 
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] ${recipe.colSpan} ${recipe.rowSpan}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
              }}
            >
              {recipe.src ? (
                <Image 
                  src={recipe.src} 
                  alt={recipe.title} 
                  fill 
                  className="object-cover object-center opacity-70 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal" 
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                  style={{
                    backgroundImage: "url('/images/grid.jpg')",
                    backgroundSize: '400% 200%',
                    backgroundPosition: `${recipe.bgCol === 0 ? '0%' : recipe.bgCol === 3 ? '100%' : `${(recipe.bgCol! / 3) * 100}%`} ${recipe.bgRow === 0 ? '0%' : '100%'}`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A150D] via-[#0A150D]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-bold text-[#FAF6E9] mb-2 tracking-tight" style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}>
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-bold uppercase tracking-widest border border-white/10">
                    ⏱️ {recipe.time}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#5A9B6A] text-xs font-bold uppercase tracking-widest border border-white/10">
                    🔥 {recipe.temp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}
