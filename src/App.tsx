import React, { useState } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Settings } from './components/Settings';
import { AppState, DEFAULT_STATE } from './types';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);

  const handleStateChange = (newState: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-gray-900 leading-none">
              Insurance Note
            </h1>
            <span className="text-[10px] font-medium text-blue-600 tracking-wider uppercase">
              Professional Generator
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <span className="hidden sm:inline">v1.0.0</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        <Editor state={state} onChange={handleStateChange} />
        
        <div className="flex-1 relative bg-gray-100 flex flex-col min-w-0">
          <Preview state={state} />
        </div>

        <Settings state={state} onChange={handleStateChange} />
      </div>
    </div>
  );
}
