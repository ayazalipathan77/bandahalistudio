import React from 'react';
import { Artwork } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioGridProps {
  artworks: Artwork[];
  onArtworkSelect: (artwork: Artwork) => void;
}

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => (
  <div 
    className="group relative border-b border-retro-black last:border-b-0 cursor-pointer bg-retro-cream hover:bg-white transition-colors"
    onClick={() => onClick(artwork)}
  >
    <div className="flex flex-col md:flex-row h-full">
      {/* Image Container */}
      <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-retro-black relative overflow-hidden aspect-square md:aspect-auto">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-retro-accent mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-0"></div>
      </div>
      
      {/* Info Container */}
      <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
        <div>
           <div className="flex justify-between items-start mb-4">
             <span className="font-mono text-xs text-retro-gray border border-retro-gray rounded-full px-2 py-0.5">{artwork.year}</span>
             <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
           <h3 className="font-display font-bold text-3xl md:text-5xl uppercase leading-none mb-2 group-hover:text-retro-accent transition-colors break-words">{artwork.title}</h3>
           <p className="font-mono text-sm uppercase text-retro-black">{artwork.medium}</p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-retro-black/20">
           <p className="font-mono text-xs text-retro-black leading-relaxed line-clamp-3">
             {artwork.description}
           </p>
           <div className="mt-4 inline-block border-b border-retro-black pb-0.5 text-xs font-bold uppercase">
             View Details
           </div>
        </div>
      </div>
    </div>
  </div>
);

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ artworks, onArtworkSelect }) => {
  return (
    <div className="border-t border-retro-black">
      <div className="grid grid-cols-1">
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} onClick={onArtworkSelect} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;