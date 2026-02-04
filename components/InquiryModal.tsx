import React, { useState } from 'react';
import { X, Send, CheckCircle, MessageCircle, Minus, Square } from 'lucide-react';
import { Artwork } from '../types';

interface InquiryModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ artwork, isOpen, onClose }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  React.useEffect(() => {
    if (artwork) {
      setFormData(prev => ({
        ...prev,
        message: `RE: ${artwork.title} (${artwork.year}) - Inquiry`
      }));
    } else {
        setFormData(prev => ({
            ...prev,
            message: "General Inquiry"
        }));
    }
  }, [artwork]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with dither pattern */}
      <div 
        className="absolute inset-0 bg-retro-black/80 backdrop-blur-sm" 
        style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '10px 10px'}}
        onClick={onClose}
      />

      {/* Retro Window */}
      <div className="relative w-full md:w-[600px] bg-retro-cream border-2 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
        
        {/* Title Bar */}
        <div className="bg-retro-black text-white px-4 py-2 flex justify-between items-center border-b-2 border-retro-black cursor-move">
           <span className="font-mono text-xs uppercase font-bold tracking-wider">Inquiry_Form.exe</span>
           <div className="flex gap-2">
             <button className="hover:bg-retro-accent p-0.5"><Minus size={14} /></button>
             <button className="hover:bg-retro-accent p-0.5"><Square size={12} /></button>
             <button onClick={onClose} className="hover:bg-retro-accent p-0.5"><X size={14} /></button>
           </div>
        </div>

        <div className="p-8">
          {artwork && (
            <div className="mb-8 p-4 border border-retro-black bg-white flex gap-4 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="w-20 h-20 object-cover border border-retro-black grayscale"
              />
              <div>
                <h4 className="font-display font-bold text-lg">{artwork.title}</h4>
                <p className="text-xs font-mono mt-1">ID: {artwork.id}</p>
                <p className="text-xs font-mono">{artwork.medium}</p>
              </div>
            </div>
          )}

          {formState === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-retro-accent rounded-full flex items-center justify-center border-2 border-retro-black">
                 <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase">Transmission Sent</h3>
              <p className="font-mono text-sm text-retro-black/70">We will respond to your frequency shortly.</p>
              <button 
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-retro-black text-white font-mono text-xs uppercase border-2 border-transparent hover:bg-retro-accent hover:border-retro-black hover:text-black transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-xs uppercase font-bold mb-2">Identify Yourself</label>
                <input 
                  type="text" 
                  required
                  placeholder="NAME"
                  className="w-full bg-white border-2 border-retro-black py-3 px-4 focus:outline-none focus:bg-green-50 font-mono text-sm rounded-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs uppercase font-bold mb-2">Comms Channel</label>
                <input 
                  type="email" 
                  required
                  placeholder="EMAIL"
                  className="w-full bg-white border-2 border-retro-black py-3 px-4 focus:outline-none focus:bg-green-50 font-mono text-sm rounded-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold mb-2">Data Packet</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-white border-2 border-retro-black py-3 px-4 focus:outline-none focus:bg-green-50 font-mono text-sm resize-none rounded-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="flex-1 py-4 bg-retro-black text-white font-mono text-xs uppercase font-bold hover:bg-retro-accent hover:text-black transition-colors border-2 border-transparent hover:border-retro-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  {formState === 'submitting' ? 'Transmitting...' : 'Send'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;