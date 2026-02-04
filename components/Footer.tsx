import React from 'react';
import { Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-retro-black bg-retro-black text-retro-cream">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-retro-cream/20">
          <h3 className="font-display font-bold text-3xl md:text-4xl mb-6">BANDAH ALI©</h3>
          <p className="font-mono text-xs leading-relaxed opacity-60">
            CONTEMPORARY<br/>
            ART STUDIO<br/>
            PAKISTAN
          </p>
        </div>

        {/* Links */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-retro-cream/20 flex flex-col justify-between">
          <h4 className="font-mono text-xs uppercase mb-8 text-retro-accent">Navigation</h4>
          <ul className="space-y-4 font-display font-bold text-xl">
             <li><a href="#" className="hover:text-retro-accent transition-colors">Portfolio</a></li>
             <li><a href="#" className="hover:text-retro-accent transition-colors">Exhibitions</a></li>
             <li><a href="#" className="hover:text-retro-accent transition-colors">Journal</a></li>
             <li><a href="#" className="hover:text-retro-accent transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-retro-cream/20 flex flex-col justify-between">
          <h4 className="font-mono text-xs uppercase mb-8 text-retro-accent">Connect</h4>
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-4 hover:text-retro-accent transition-colors group">
              <Instagram size={20} /> <span className="font-mono text-sm border-b border-transparent group-hover:border-retro-accent">Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-4 hover:text-retro-accent transition-colors group">
              <Twitter size={20} /> <span className="font-mono text-sm border-b border-transparent group-hover:border-retro-accent">Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-4 hover:text-retro-accent transition-colors group">
              <Mail size={20} /> <span className="font-mono text-sm border-b border-transparent group-hover:border-retro-accent">Email</span>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="p-8 md:p-12 bg-retro-accent text-retro-black">
          <h4 className="font-mono text-xs uppercase mb-4 font-bold">Updates</h4>
          <p className="font-mono text-xs mb-6">Join the mailing list for exhibition invites.</p>
          <div className="flex border-b border-retro-black pb-2">
            <input 
              type="email" 
              placeholder="EMAIL ADDR" 
              className="bg-transparent w-full focus:outline-none text-sm font-mono placeholder-retro-black/50"
            />
            <button className="hover:translate-x-1 transition-transform"><ArrowRight size={16} /></button>
          </div>
        </div>

      </div>
      
      <div className="border-t border-retro-cream/20 p-4 flex justify-between items-center font-mono text-[10px] uppercase">
        <span>© 2024 Bandah Ali Studio</span>
        <span>Karachi, PK</span>
      </div>
    </footer>
  );
};

export default Footer;