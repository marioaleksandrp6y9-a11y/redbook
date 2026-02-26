import React, { useState } from 'react';
import { AppState } from '../types';
import { Card } from './Card';
import { ZoomIn, ZoomOut, LayoutGrid, List } from 'lucide-react';
import { cn } from '../lib/utils';

interface PreviewProps {
  state: AppState;
}

export const Preview: React.FC<PreviewProps> = ({ state }) => {
  const [zoom, setZoom] = useState(0.8);
  const [layout, setLayout] = useState<'grid' | 'list'>('list');

  const pages = state.content.split('@---');

  return (
    <main className="flex-1 bg-gray-100 relative overflow-hidden flex flex-col min-w-0">
      
      {/* Toolbar */}
      <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-xl border border-white/60 flex flex-col gap-2 transition-all">
          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button 
              onClick={() => setZoom(Math.max(0.2, zoom - 0.1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md text-gray-600 shadow-sm active:scale-90 transition-all"
            >
              <ZoomOut size={16} />
            </button>
            <span className="w-12 text-center font-mono text-xs font-bold text-gray-600 select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(Math.min(2.0, zoom + 0.1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md text-gray-600 shadow-sm active:scale-90 transition-all"
            >
              <ZoomIn size={16} />
            </button>
          </div>
          
          <button 
            onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
            className="w-full h-9 flex items-center justify-center bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg text-xs font-bold transition-all active:scale-95 gap-2 border border-gray-200"
          >
            {layout === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
            <span>{layout === 'grid' ? '列表视图' : '网格视图'}</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-y-auto p-8 w-full custom-scrollbar flex justify-center bg-[#E5E5E5]">
        <div 
          className={cn(
            "origin-top transition-all duration-300 pb-32 gap-8",
            layout === 'list' ? "flex flex-col items-center" : "flex flex-row flex-wrap justify-center items-start"
          )}
          style={{ transform: `scale(${zoom})`, width: layout === 'grid' ? `${100/zoom}%` : 'auto' }}
        >
          {/* Cover Card */}
          <div className="card-preview shadow-2xl transition-transform hover:scale-[1.02] duration-300">
            <Card state={state} type="cover" />
          </div>

          {/* Content Cards */}
          {pages.map((pageContent, index) => (
            <div key={index} className="card-preview shadow-2xl transition-transform hover:scale-[1.02] duration-300">
              <Card 
                state={state} 
                type="content" 
                content={pageContent} 
                pageNumber={index + 1} 
                totalPages={pages.length} 
              />
            </div>
          ))}

          {/* Contact Card */}
          {state.showAgentCard && (
            <div className="card-preview shadow-2xl transition-transform hover:scale-[1.02] duration-300">
              <Card state={state} type="contact" />
            </div>
          )}

        </div>
      </div>
    </main>
  );
};
