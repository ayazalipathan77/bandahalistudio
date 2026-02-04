import React, { useState, useRef } from 'react';
import { ARTWORKS as INITIAL_ARTWORKS, COLLECTIONS as INITIAL_COLLECTIONS, EXHIBITIONS as INITIAL_EXHIBITIONS, CLIENT_DIARIES as INITIAL_DIARIES, INSTAGRAM_POSTS } from './data';
import { Artwork, Collection, Exhibition, ClientDiaryEntry } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import InquiryModal from './components/InquiryModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { ChevronRight, ArrowRight, X, ChevronLeft, ArrowUpRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null);

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Data State (Lifted from constants to state for Admin updates)
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(INITIAL_EXHIBITIONS);
  const [diaries, setDiaries] = useState<ClientDiaryEntry[]>(INITIAL_DIARIES);

  // Pagination States
  const [portfolioPage, setPortfolioPage] = useState(1);
  const [collectionPage, setCollectionPage] = useState(1);
  const [diaryPage, setDiaryPage] = useState(1);

  const ITEMS_PER_PAGE_PORTFOLIO = 6;
  const ITEMS_PER_PAGE_COLLECTIONS = 4;
  const ITEMS_PER_PAGE_DIARY = 4;

  // Admin Handlers
  const handleAddArtwork = (item: Artwork) => setArtworks([item, ...artworks]);
  const handleAddCollection = (item: Collection) => setCollections([item, ...collections]);
  const handleAddExhibition = (item: Exhibition) => setExhibitions([item, ...exhibitions]);
  const handleAddDiary = (item: ClientDiaryEntry) => setDiaries([item, ...diaries]);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPortfolioPage(1);
    setCollectionPage(1);
    setDiaryPage(1);
  };

  const handleArtworkClick = (artwork: Artwork) => {
    setLightboxArtwork(artwork);
  };

  const openInquiry = (artwork: Artwork | null) => {
    setLightboxArtwork(null); 
    setSelectedArtwork(artwork);
    setIsInquiryOpen(true);
  };

  const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    label = "Page"
  }: { 
    currentPage: number, 
    totalPages: number, 
    onPageChange: (p: number) => void,
    label?: string 
  }) => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-between items-center border-t border-retro-black p-6 md:p-8 bg-white">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 font-mono text-xs uppercase disabled:opacity-30 hover:text-retro-accent transition-colors"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="font-mono text-xs font-bold">
           {label} {currentPage} / {totalPages}
        </span>
        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 font-mono text-xs uppercase disabled:opacity-30 hover:text-retro-accent transition-colors"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  const latestWorksRef = useRef<HTMLDivElement>(null);
  const scrollLatestWorks = (direction: 'left' | 'right') => {
    if (latestWorksRef.current) {
      const scrollAmount = 320;
      latestWorksRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'admin':
        if (!isAdminAuthenticated) {
          return <AdminLogin onLogin={handleAdminLogin} />;
        }
        return (
          <AdminDashboard 
            collections={collections}
            onAddArtwork={handleAddArtwork}
            onAddCollection={handleAddCollection}
            onAddExhibition={handleAddExhibition}
            onAddDiary={handleAddDiary}
            onLogout={handleAdminLogout}
          />
        );

      case 'portfolio':
        const totalPortfolioPages = Math.ceil(artworks.length / ITEMS_PER_PAGE_PORTFOLIO);
        const currentArtworks = artworks.slice(
          (portfolioPage - 1) * ITEMS_PER_PAGE_PORTFOLIO, 
          portfolioPage * ITEMS_PER_PAGE_PORTFOLIO
        );

        return (
          <div className="pt-20 min-h-screen">
            <div className="border-b border-retro-black p-6 md:p-12 bg-retro-cream">
              <h2 className="font-display font-extrabold text-4xl md:text-7xl uppercase tracking-tighter mb-4">Selected Works</h2>
              <div className="font-mono text-sm max-w-xl border-l-2 border-retro-black pl-4">
                ARCHIVE: 2018-2024<br/>
                MEDIUM: RELIEF / OIL / MIXED
              </div>
            </div>
            <PortfolioGrid artworks={currentArtworks} onArtworkSelect={handleArtworkClick} />
            <PaginationControls 
              currentPage={portfolioPage} 
              totalPages={totalPortfolioPages} 
              onPageChange={setPortfolioPage} 
              label="Archive Page"
            />
          </div>
        );
      
      case 'collections':
        const totalCollectionPages = Math.ceil(collections.length / ITEMS_PER_PAGE_COLLECTIONS);
        const currentCollections = collections.slice(
          (collectionPage - 1) * ITEMS_PER_PAGE_COLLECTIONS,
          collectionPage * ITEMS_PER_PAGE_COLLECTIONS
        );

        return (
          <div className="pt-20 min-h-screen">
            <div className="border-b border-retro-black p-6 md:p-12">
               <h2 className="font-display font-extrabold text-3xl md:text-7xl uppercase tracking-tighter break-words">Collections</h2>
            </div>
            {currentCollections.map((collection, idx) => (
              <div key={collection.id} className="border-b border-retro-black flex flex-col md:flex-row">
                <div className={`md:w-1/2 border-b md:border-b-0 md:border-r border-retro-black ${idx % 2 === 1 ? 'md:order-2 md:border-l md:border-r-0' : ''}`}>
                   <img 
                     src={collection.coverImage} 
                     alt={collection.title} 
                     className="w-full h-[300px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-300"
                   />
                </div>
                <div className={`md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-retro-cream ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="font-mono text-xs uppercase border border-retro-black px-2 py-1 self-start mb-4 rounded-full bg-white">{collection.yearRange}</span>
                  <h3 className="font-display font-bold text-3xl md:text-6xl mb-6 uppercase leading-none break-words">{collection.title}</h3>
                  <p className="font-mono text-sm text-retro-black/80 mb-8 border-l-2 border-retro-black pl-4">{collection.description}</p>
                  <button onClick={() => handleNavigate('portfolio')} className="self-start px-6 py-3 bg-retro-black text-retro-cream font-mono text-xs uppercase hover:bg-retro-accent hover:text-black transition-colors">
                    View Collection
                  </button>
                </div>
              </div>
            ))}
            <PaginationControls 
              currentPage={collectionPage} 
              totalPages={totalCollectionPages} 
              onPageChange={setCollectionPage} 
              label="Series Page"
            />
          </div>
        );

      case 'exhibitions':
        return (
          <div className="pt-20 min-h-screen">
             <div className="border-b border-retro-black p-6 md:p-12">
               <h2 className="font-display font-extrabold text-4xl md:text-7xl uppercase tracking-tighter">Exhibitions</h2>
            </div>
            
            <div className="bg-white">
              {exhibitions.map((exhibition) => (
                <div key={exhibition.id} className="group border-b border-retro-black flex flex-col md:flex-row hover:bg-retro-accent transition-colors duration-0">
                  <div className="p-6 md:p-8 md:w-1/4 border-b md:border-b-0 md:border-r border-retro-black/20 group-hover:border-retro-black">
                    <span className={`font-mono text-xs uppercase font-bold border-2 border-retro-black px-2 py-1 bg-white inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      {exhibition.status}
                    </span>
                    <p className="mt-4 font-mono text-xs">{exhibition.startDate} — {exhibition.endDate}</p>
                  </div>
                  <div className="p-6 md:p-8 md:w-2/4 flex items-center">
                    <div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-1">{exhibition.title}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest">{exhibition.gallery} // {exhibition.location}</p>
                    </div>
                  </div>
                  <div className="md:w-1/4 relative overflow-hidden hidden md:block border-l border-retro-black/20 group-hover:border-retro-black">
                     <img 
                      src={exhibition.imageUrl} 
                      alt={exhibition.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-0 grayscale"
                     />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ArrowUpRight className="text-white w-12 h-12 opacity-0 group-hover:opacity-100" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'client-diaries':
        const totalDiaryPages = Math.ceil(diaries.length / ITEMS_PER_PAGE_DIARY);
        const currentDiaries = diaries.slice(
          (diaryPage - 1) * ITEMS_PER_PAGE_DIARY,
          diaryPage * ITEMS_PER_PAGE_DIARY
        );

        return (
          <div className="pt-20 min-h-screen">
             <div className="border-b border-retro-black p-6 md:p-12 text-center bg-retro-cream">
               <h2 className="font-display font-extrabold text-4xl md:text-7xl uppercase tracking-tighter mb-4">Client Diaries</h2>
               <p className="font-mono text-xs uppercase tracking-widest">Art in Context / Interior Showcases</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
                {currentDiaries.map((entry, idx) => (
                  <article key={entry.id} className={`border-b border-retro-black p-6 md:p-12 flex flex-col gap-6 hover:bg-white transition-colors ${idx % 2 === 0 ? 'md:border-r' : ''}`}>
                    <div className="aspect-[4/3] border-2 border-retro-black p-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                       <img src={entry.imageUrl} alt={entry.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-retro-black pb-1">
                        <span className="font-mono text-xs font-bold">{entry.location}</span>
                        <span className="font-mono text-xs">{entry.date}</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl uppercase leading-tight">{entry.title}</h3>
                      <p className="font-mono text-sm leading-relaxed">{entry.description}</p>
                    </div>
                  </article>
                ))}
            </div>
            <PaginationControls 
              currentPage={diaryPage} 
              totalPages={totalDiaryPages} 
              onPageChange={setDiaryPage} 
              label="Diaries"
            />
          </div>
        );

      case 'contact':
        return (
           <div className="pt-20 min-h-screen flex flex-col">
            <div className="border-b border-retro-black flex-1 flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 md:p-16 bg-retro-cream border-b md:border-b-0 md:border-r border-retro-black">
                <h2 className="font-display font-extrabold text-4xl md:text-6xl uppercase leading-none mb-12 break-words">Contact<br/>The<br/>Studio</h2>
                <div className="space-y-12 font-mono">
                  <div>
                    <h4 className="text-xs uppercase font-bold mb-2 border-b border-retro-black inline-block">Location</h4>
                    <p className="text-lg">Karachi, Pakistan</p>
                  </div>
                   <div>
                    <h4 className="text-xs uppercase font-bold mb-2 border-b border-retro-black inline-block">Digital</h4>
                    <p className="text-lg text-sm md:text-lg break-all">studio@bandahali.art</p>
                  </div>
                   <div>
                    <h4 className="text-xs uppercase font-bold mb-2 border-b border-retro-black inline-block">Representation</h4>
                    <p className="text-lg">VM Art Gallery</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-16 bg-white">
                 <form className="space-y-6">
                    <div>
                      <label className="block font-mono text-xs uppercase font-bold mb-2">Name</label>
                      <input type="text" className="w-full border-2 border-retro-black p-4 font-mono focus:outline-none focus:bg-green-50 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="YOUR NAME" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase font-bold mb-2">Email</label>
                      <input type="email" className="w-full border-2 border-retro-black p-4 font-mono focus:outline-none focus:bg-green-50 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="YOUR EMAIL" />
                    </div>
                     <div>
                      <label className="block font-mono text-xs uppercase font-bold mb-2">Message</label>
                      <textarea rows={4} className="w-full border-2 border-retro-black p-4 font-mono focus:outline-none focus:bg-green-50 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="YOUR MESSAGE"></textarea>
                    </div>
                    <button type="button" onClick={() => setIsInquiryOpen(true)} className="w-full bg-retro-black text-white py-4 font-mono text-sm uppercase font-bold hover:bg-retro-accent hover:text-black transition-colors border-2 border-transparent hover:border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                      Send Message
                    </button>
                 </form>
              </div>
            </div>
           </div>
        );

      default: // Home
        return (
          <>
            <Hero featuredArt={artworks[0]} onNavigate={handleNavigate} />
            
            {/* Intro Section - Brutalist */}
            <section className="border-b border-retro-black">
              <div className="grid grid-cols-1 md:grid-cols-2">
                 <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-retro-black flex items-center justify-center bg-retro-accent">
                    <div className="w-48 h-48 rounded-full border-2 border-retro-black flex items-center justify-center bg-white animate-spin-slow">
                       <span className="font-display font-bold text-xl uppercase text-center">Relief<br/>& Clay</span>
                    </div>
                 </div>
                 <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
                    <p className="font-mono text-sm uppercase mb-6 tracking-widest text-retro-gray">/// ARTIST STATEMENT</p>
                    <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight mb-8 uppercase">
                      "I belong to the <span className="text-retro-accent bg-retro-black px-2">soil</span>. I attempt to capture the fading textures of our rural heritage—the mud walls of Tharparkar, and the silence of the village."
                    </h2>
                    <button 
                      onClick={() => handleNavigate('portfolio')}
                      className="self-start font-mono text-xs font-bold uppercase border-b-2 border-retro-black hover:bg-retro-black hover:text-white transition-colors pt-1 pb-1"
                    >
                      Enter Gallery ->
                    </button>
                 </div>
              </div>
            </section>

            {/* Featured Works - Scrolling Cards Slider with Controls */}
            <section className="border-b border-retro-black bg-retro-cream py-12">
               <div className="container mx-auto px-6 mb-8 flex justify-between items-center">
                 <h3 className="font-display font-bold text-2xl md:text-3xl uppercase">Latest_Works</h3>
                 <div className="flex gap-4">
                    <button 
                        onClick={() => scrollLatestWorks('left')}
                        className="p-2 border border-retro-black bg-white hover:bg-retro-black hover:text-white transition-colors"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={() => scrollLatestWorks('right')}
                        className="p-2 border border-retro-black bg-white hover:bg-retro-black hover:text-white transition-colors"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={20} />
                    </button>
                 </div>
               </div>
               
               {/* Horizontal Slider with Buttons */}
               <div 
                 ref={latestWorksRef}
                 className="flex gap-6 px-6 overflow-x-auto pb-8 no-scrollbar snap-x scroll-smooth"
                 style={{ scrollSnapType: 'x mandatory' }}
               >
                 {artworks.slice(0, 8).map(art => (
                   <div key={art.id} className="min-w-[85vw] md:min-w-[400px] snap-center cursor-pointer group border-2 border-retro-black bg-white p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" onClick={() => handleArtworkClick(art)}>
                     <div className="overflow-hidden mb-4 border border-retro-black h-[350px] md:h-[400px]">
                       <img src={art.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" alt={art.title} />
                     </div>
                     <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-display font-bold text-lg md:text-xl uppercase truncate max-w-[200px] md:max-w-none">{art.title}</h4>
                          <p className="font-mono text-xs mt-1">{art.medium}</p>
                        </div>
                        <span className="font-mono text-xs border border-retro-black px-2 rounded-full">{art.year}</span>
                     </div>
                   </div>
                 ))}
                 
                 {/* View All Card at end of slider */}
                 <div 
                   onClick={() => handleNavigate('portfolio')}
                   className="min-w-[200px] snap-center flex flex-col items-center justify-center border-2 border-dashed border-retro-black bg-transparent hover:bg-white cursor-pointer transition-colors p-8"
                 >
                    <span className="font-display font-bold text-xl uppercase mb-2">View All</span>
                    <ArrowRight size={24} />
                 </div>
               </div>
            </section>

            {/* Instagram Feed - Grid */}
            <section className="bg-white">
              <div className="border-b border-retro-black p-4 text-center">
                 <span className="font-mono text-xs uppercase tracking-widest bg-retro-black text-white px-4 py-1">@bandahali.art</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                {INSTAGRAM_POSTS.map(post => (
                  <a href={post.permalink} key={post.id} className="group relative aspect-square overflow-hidden border-r border-b border-retro-black last:border-r-0">
                    <img src={post.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" alt="Instagram post" />
                    <div className="absolute inset-0 bg-retro-accent mix-blend-multiply opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center p-4">
                      <p className="text-white font-mono text-xs text-center font-bold line-clamp-3">{post.caption}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-retro-accent selection:text-white flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <InquiryModal 
        artwork={selectedArtwork} 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
      />

      {/* Lightbox / Artwork Detail Overlay */}
      {lightboxArtwork && (
        <div className="fixed inset-0 z-[60] bg-retro-cream flex flex-col md:flex-row animate-fade-in overflow-y-auto md:overflow-hidden">
           <button 
             onClick={() => setLightboxArtwork(null)}
             className="fixed md:absolute top-6 right-6 z-[70] p-2 bg-retro-black text-white hover:bg-retro-accent transition-colors border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
           >
             <X size={24} />
           </button>

           <div className="w-full md:w-2/3 h-[50vh] md:h-full bg-retro-black/5 flex items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-retro-black relative">
             <img 
               src={lightboxArtwork.imageUrl} 
               alt={lightboxArtwork.title} 
               className="max-w-full max-h-full object-contain border-4 border-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
             />
           </div>

           <div className="w-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center bg-retro-cream">
             <div className="space-y-6">
                <div className="flex justify-between items-center border-b-2 border-retro-black pb-4">
                    <span className={`font-mono text-xs uppercase font-bold px-3 py-1 border-2 border-retro-black ${
                    lightboxArtwork.status === 'Available' ? 'bg-retro-accent text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                    {lightboxArtwork.status}
                    </span>
                    <span className="font-mono text-xs">REF: {lightboxArtwork.id}</span>
                </div>
                
                <h2 className="font-display font-extrabold text-3xl md:text-6xl uppercase leading-none">{lightboxArtwork.title}</h2>
                
                <div className="space-y-2 font-mono text-sm border-l-4 border-retro-black pl-4 py-2 bg-white">
                  <p><span className="font-bold">YEAR:</span> {lightboxArtwork.year}</p>
                  <p><span className="font-bold">MAT:</span> {lightboxArtwork.medium}</p>
                  <p><span className="font-bold">DIM:</span> {lightboxArtwork.dimensions}</p>
                </div>

                <p className="font-mono text-sm leading-relaxed pt-4">
                  {lightboxArtwork.description}
                </p>

                <div className="pt-8 pb-12 md:pb-0">
                  {lightboxArtwork.status === 'Available' ? (
                     <button 
                       onClick={() => openInquiry(lightboxArtwork)}
                       className="w-full py-4 bg-retro-black text-white font-mono text-xs uppercase font-bold hover:bg-retro-accent hover:text-black transition-colors border-2 border-transparent hover:border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                     >
                       > Initialize Inquiry
                     </button>
                  ) : (
                    <button disabled className="w-full py-4 bg-gray-200 text-gray-400 font-mono text-xs uppercase font-bold cursor-not-allowed border-2 border-gray-300">
                      [ {lightboxArtwork.status} ]
                    </button>
                  )}
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default App;