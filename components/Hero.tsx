import React from 'react';
import { Artwork } from '../types';
import { Star } from 'lucide-react';

interface HeroProps {
  featuredArt: Artwork;
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ featuredArt, onNavigate }) => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col border-b border-retro-black">
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left: Typography */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-retro-black bg-retro-cream">
          <div>
            <div className="inline-flex items-center gap-2 border border-retro-black rounded-full px-4 py-1 mb-8 bg-white">
              <span className="w-2 h-2 bg-retro-accent rounded-full animate-pulse"></span>
              <span className="font-mono text-xs uppercase">Studio Open</span>
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-6 break-words">
              EARTH<br/>
              <span className="text-retro-accent italic">FORM</span> &<br/>
              SILENCE
            </h1>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="font-mono text-sm max-w-md border-l-2 border-retro-black pl-4 mb-8">
              The digital archive of Bandah Ali. Sculpting the heritage of the Indus Valley through relief, texture, and silence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('portfolio')}
                className="bg-retro-black text-retro-cream px-8 py-4 font-mono text-xs uppercase border border-retro-black hover:bg-retro-accent hover:border-retro-accent transition-colors"
              >
                View Portfolio
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 font-mono text-xs uppercase border border-retro-black hover:bg-white transition-colors"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>

        {/* Right: Featured Image */}
        <div className="md:w-1/2 relative overflow-hidden group border-b md:border-b-0 border-retro-black min-h-[40vh] md:min-h-auto">
          <div className="absolute top-4 right-4 z-10">
            <Star className="text-white w-12 h-12 animate-spin-slow" fill="white" />
          </div>
          <img 
            src={featuredArt.imageUrl} 
            alt="Featured Art" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute bottom-0 left-0 bg-white border-t border-r border-retro-black px-4 py-2 z-20">
            <span className="font-mono text-xs uppercase">Fig 01. {featuredArt.title}</span>
          </div>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="h-12 border-t border-retro-black bg-retro-accent overflow-hidden flex items-center">
        <div className="whitespace-nowrap animate-marquee flex items-center">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-mono font-bold text-white uppercase text-lg mx-8 flex items-center gap-4">
              New Series: Indus Relief <Star size={12} fill="currentColor" /> VM Art Gallery Exhibition <Star size={12} fill="currentColor" /> Heritage
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;