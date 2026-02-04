import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials for demonstration
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('ACCESS DENIED: Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-retro-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-2 border-retro-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 animate-fade-in">
        <div className="flex justify-center mb-6">
           <div className="w-16 h-16 bg-retro-black rounded-full flex items-center justify-center border-2 border-retro-black">
             <Lock className="text-white w-8 h-8" />
           </div>
        </div>
        <h2 className="font-display font-bold text-3xl uppercase text-center mb-2">Restricted Area</h2>
        <p className="font-mono text-xs text-center mb-8 opacity-60">AUTHORIZED PERSONNEL ONLY</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-xs uppercase font-bold mb-2">Operator ID</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase font-bold mb-2">Passkey</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-retro-black p-3 font-mono text-sm focus:outline-none focus:bg-green-50 rounded-none"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-500 p-2 text-center">
              <p className="font-mono text-xs text-red-600 font-bold">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-retro-black text-white py-4 font-mono text-xs uppercase font-bold hover:bg-retro-accent transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Authenticate Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;