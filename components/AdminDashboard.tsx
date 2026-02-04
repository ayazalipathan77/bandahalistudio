import React, { useState } from 'react';
import { Artwork, Collection, Exhibition, ClientDiaryEntry } from '../types';
import { LogOut } from 'lucide-react';

// Generic Input Components
const Input = ({ label, ...props }: any) => (
  <div className="mb-4">
    <label className="block font-mono text-xs uppercase font-bold mb-2">{label}</label>
    <input 
      className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      {...props}
    />
  </div>
);

const TextArea = ({ label, ...props }: any) => (
  <div className="mb-4">
    <label className="block font-mono text-xs uppercase font-bold mb-2">{label}</label>
    <textarea 
      className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      rows={4}
      {...props}
    />
  </div>
);

const SubmitButton = ({ children }: { children?: React.ReactNode }) => (
  <button 
    type="submit"
    className="w-full bg-retro-black text-white px-6 py-4 font-mono text-xs uppercase font-bold hover:bg-retro-accent transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
  >
    {children}
  </button>
);

interface AdminDashboardProps {
  collections: Collection[];
  onAddArtwork: (artwork: Artwork) => void;
  onAddCollection: (collection: Collection) => void;
  onAddExhibition: (exhibition: Exhibition) => void;
  onAddDiary: (diary: ClientDiaryEntry) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  collections, 
  onAddArtwork, 
  onAddCollection, 
  onAddExhibition, 
  onAddDiary,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'artworks' | 'collections' | 'exhibitions' | 'diaries'>('artworks');

  // Form States
  const [artworkForm, setArtworkForm] = useState<Partial<Artwork>>({ status: 'Available' });
  const [collectionForm, setCollectionForm] = useState<Partial<Collection>>({});
  const [exhibitionForm, setExhibitionForm] = useState<Partial<Exhibition>>({ status: 'Upcoming' });
  const [diaryForm, setDiaryForm] = useState<Partial<ClientDiaryEntry>>({});

  // Handlers
  const handleArtworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artworkForm.title || !artworkForm.imageUrl) return;
    onAddArtwork({
      ...artworkForm,
      id: `art-${Date.now()}`,
      year: artworkForm.year || new Date().getFullYear().toString(),
    } as Artwork);
    setArtworkForm({ status: 'Available', title: '', medium: '', dimensions: '', imageUrl: '', description: '', collectionId: '' });
    alert('Artwork added successfully');
  };

  const handleCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionForm.title || !collectionForm.coverImage) return;
    onAddCollection({
      ...collectionForm,
      id: `col-${Date.now()}`,
    } as Collection);
    setCollectionForm({ title: '', description: '', yearRange: '', coverImage: '' });
    alert('Collection added successfully');
  };

  const handleExhibitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exhibitionForm.title) return;
    onAddExhibition({
      ...exhibitionForm,
      id: `exh-${Date.now()}`,
    } as Exhibition);
    setExhibitionForm({ title: '', gallery: '', location: '', startDate: '', endDate: '', imageUrl: '', status: 'Upcoming' });
    alert('Exhibition added successfully');
  };

  const handleDiarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaryForm.title) return;
    onAddDiary({
      ...diaryForm,
      id: `dia-${Date.now()}`,
    } as ClientDiaryEntry);
    setDiaryForm({ title: '', location: '', date: '', description: '', imageUrl: '' });
    alert('Diary entry added successfully');
  };

  return (
    <div className="min-h-screen pt-20 bg-retro-cream">
       <div className="border-b border-retro-black p-6 md:p-12 bg-white sticky top-16 md:top-20 z-30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl uppercase tracking-tighter mb-4">Studio Admin</h2>
            <div className="flex flex-wrap gap-2 md:gap-4 font-mono text-xs uppercase">
              {['artworks', 'collections', 'exhibitions', 'diaries'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 border-2 border-retro-black transition-all ${
                    activeTab === tab 
                      ? 'bg-retro-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-600 hover:bg-red-50 font-mono text-xs uppercase font-bold transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
       </div>

       <div className="p-6 md:p-12 max-w-4xl mx-auto">
          {activeTab === 'artworks' && (
            <form onSubmit={handleArtworkSubmit} className="bg-white p-6 md:p-12 border-2 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
               <h3 className="font-display font-bold text-2xl mb-8 uppercase border-b-2 border-retro-black pb-2">New Artwork</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Input label="Title" value={artworkForm.title || ''} onChange={(e: any) => setArtworkForm({...artworkForm, title: e.target.value})} required />
                 <Input label="Year" value={artworkForm.year || ''} onChange={(e: any) => setArtworkForm({...artworkForm, year: e.target.value})} />
                 <Input label="Medium" value={artworkForm.medium || ''} onChange={(e: any) => setArtworkForm({...artworkForm, medium: e.target.value})} />
                 <Input label="Dimensions" value={artworkForm.dimensions || ''} onChange={(e: any) => setArtworkForm({...artworkForm, dimensions: e.target.value})} />
                 <div className="mb-4">
                    <label className="block font-mono text-xs uppercase font-bold mb-2">Collection</label>
                    <select 
                      className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none"
                      value={artworkForm.collectionId || ''}
                      onChange={(e) => setArtworkForm({...artworkForm, collectionId: e.target.value})}
                    >
                      <option value="">Select Collection</option>
                      {collections.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                 </div>
                 <div className="mb-4">
                    <label className="block font-mono text-xs uppercase font-bold mb-2">Status</label>
                    <select 
                      className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none"
                      value={artworkForm.status || 'Available'}
                      onChange={(e) => setArtworkForm({...artworkForm, status: e.target.value as any})}
                    >
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                 </div>
               </div>
               <Input label="Image URL" value={artworkForm.imageUrl || ''} onChange={(e: any) => setArtworkForm({...artworkForm, imageUrl: e.target.value})} required />
               <TextArea label="Description" value={artworkForm.description || ''} onChange={(e: any) => setArtworkForm({...artworkForm, description: e.target.value})} />
               <SubmitButton>Add to Portfolio</SubmitButton>
            </form>
          )}

          {activeTab === 'collections' && (
            <form onSubmit={handleCollectionSubmit} className="bg-white p-6 md:p-12 border-2 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
               <h3 className="font-display font-bold text-2xl mb-8 uppercase border-b-2 border-retro-black pb-2">New Collection</h3>
               <Input label="Title" value={collectionForm.title || ''} onChange={(e: any) => setCollectionForm({...collectionForm, title: e.target.value})} required />
               <Input label="Year Range" value={collectionForm.yearRange || ''} onChange={(e: any) => setCollectionForm({...collectionForm, yearRange: e.target.value})} placeholder="e.g. 2020-2022" />
               <Input label="Cover Image URL" value={collectionForm.coverImage || ''} onChange={(e: any) => setCollectionForm({...collectionForm, coverImage: e.target.value})} required />
               <TextArea label="Description" value={collectionForm.description || ''} onChange={(e: any) => setCollectionForm({...collectionForm, description: e.target.value})} />
               <SubmitButton>Create Collection</SubmitButton>
            </form>
          )}

          {activeTab === 'exhibitions' && (
             <form onSubmit={handleExhibitionSubmit} className="bg-white p-6 md:p-12 border-2 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
               <h3 className="font-display font-bold text-2xl mb-8 uppercase border-b-2 border-retro-black pb-2">New Exhibition</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Title" value={exhibitionForm.title || ''} onChange={(e: any) => setExhibitionForm({...exhibitionForm, title: e.target.value})} required />
                  <Input label="Gallery Name" value={exhibitionForm.gallery || ''} onChange={(e: any) => setExhibitionForm({...exhibitionForm, gallery: e.target.value})} />
                  <Input label="Location" value={exhibitionForm.location || ''} onChange={(e: any) => setExhibitionForm({...exhibitionForm, location: e.target.value})} />
                  <div className="mb-4">
                    <label className="block font-mono text-xs uppercase font-bold mb-2">Status</label>
                    <select 
                      className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none"
                      value={exhibitionForm.status || 'Upcoming'}
                      onChange={(e) => setExhibitionForm({...exhibitionForm, status: e.target.value as any})}
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Current">Current</option>
                      <option value="Past">Past</option>
                    </select>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <Input label="Start Date" type="date" value={exhibitionForm.startDate || ''} onChange={(e: any) => setExhibitionForm({...exhibitionForm, startDate: e.target.value})} />
                 <Input label="End Date" type="date" value={exhibitionForm.endDate || ''} onChange={(e: any) => setExhibitionForm({...exhibitionForm, endDate: e.target.value})} />
               </div>
               <Input label="Image URL" value={exhibitionForm.imageUrl || ''} onChange={(e: any) => setExhibitionForm({...exhibitionForm, imageUrl: e.target.value})} />
               <SubmitButton>Announce Exhibition</SubmitButton>
            </form>
          )}

          {activeTab === 'diaries' && (
            <form onSubmit={handleDiarySubmit} className="bg-white p-6 md:p-12 border-2 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
               <h3 className="font-display font-bold text-2xl mb-8 uppercase border-b-2 border-retro-black pb-2">New Client Diary</h3>
               <Input label="Project Title" value={diaryForm.title || ''} onChange={(e: any) => setDiaryForm({...diaryForm, title: e.target.value})} required placeholder="e.g. Private Residence" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Location" value={diaryForm.location || ''} onChange={(e: any) => setDiaryForm({...diaryForm, location: e.target.value})} />
                  <Input label="Date" value={diaryForm.date || ''} onChange={(e: any) => setDiaryForm({...diaryForm, date: e.target.value})} placeholder="e.g. October 2024" />
               </div>
               <Input label="Showcase Image URL" value={diaryForm.imageUrl || ''} onChange={(e: any) => setDiaryForm({...diaryForm, imageUrl: e.target.value})} required />
               <TextArea label="Description" value={diaryForm.description || ''} onChange={(e: any) => setDiaryForm({...diaryForm, description: e.target.value})} />
               <SubmitButton>Publish Diary Entry</SubmitButton>
            </form>
          )}
       </div>
    </div>
  );
};

export default AdminDashboard;