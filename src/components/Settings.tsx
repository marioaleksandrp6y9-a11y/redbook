import React from 'react';
import { AppState } from '../types';
import { Download, Image, Trash2, User, Phone, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface SettingsProps {
  state: AppState;
  onChange: (newState: Partial<AppState>) => void;
}

const THEMES = [
  { id: 'insurance-blue', name: '专业蓝', color: '#0F4C81', icon: ShieldCheck },
  { id: 'insurance-gold', name: '尊享金', color: '#D4AF37', icon: Award },
  { id: 'minimalist', name: '极简白', color: '#000000', icon: CheckCircle2 },
  { id: 'warm-family', name: '温馨橙', color: '#FF8C42', icon: User },
];

export const Settings: React.FC<SettingsProps> = ({ state, onChange }) => {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'coverImage' | 'agentImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ [key]: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = async () => {
    const zip = new JSZip();
    const cards = document.querySelectorAll('.export-target');
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const dataUrl = await htmlToImage.toJpeg(card, { quality: 0.95, pixelRatio: 3 });
      const imgData = dataUrl.split(',')[1];
      zip.file(`card-${i + 1}.jpg`, imgData, { base64: true });
    }
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "insurance-cards.zip");
  };

  return (
    <aside className="w-[320px] bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20 shrink-0">
      <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 shrink-0 bg-white">
        <div className="flex items-center gap-2 font-bold text-sm text-gray-800">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">I</div>
          <span>参数设置</span>
        </div>
        <button 
          onClick={handleExport}
          className="bg-black hover:bg-gray-800 text-white text-xs px-3 py-1.5 rounded font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95"
        >
          <Download size={12} />
          <span>导出 JPG</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        
        {/* Theme Selection */}
        <div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">风格主题</h3>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onChange({ theme: theme.id as any })}
                className={cn(
                  "p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 relative overflow-hidden group",
                  state.theme === theme.id ? "border-black bg-black text-white" : "border-gray-200 hover:bg-gray-50 text-gray-600"
                )}
              >
                <div 
                  className="w-2 h-2 rounded-full border border-black/10" 
                  style={{ backgroundColor: theme.color }}
                />
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Settings */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">封面设置</h3>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <label className="flex-1 cursor-pointer bg-white border border-blue-200 text-blue-600 text-xs font-bold py-1.5 px-2 rounded hover:bg-blue-50 flex items-center justify-center gap-1 transition-colors shadow-sm">
                <Image size={12} />
                <span>更换封面图</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'coverImage')} />
              </label>
              {state.coverImage && (
                <button 
                  onClick={() => onChange({ coverImage: null })}
                  className="bg-white border border-red-200 text-red-500 p-1.5 rounded hover:bg-red-50 shadow-sm"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            {state.coverImage && (
              <div className="aspect-video w-full rounded overflow-hidden border border-blue-100">
                <img src={state.coverImage} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">主标题</label>
            <input 
              type="text" 
              value={state.title}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">副标题</label>
            <textarea 
              rows={2}
              value={state.subtitle}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs resize-none focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">期数</label>
              <input 
                type="text" 
                value={state.date}
                onChange={(e) => onChange({ date: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">作者</label>
              <input 
                type="text" 
                value={state.author}
                onChange={(e) => onChange({ author: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Agent Settings */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center justify-between">
            <span>顾问名片</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={state.showAgentCard} onChange={(e) => onChange({ showAgentCard: e.target.checked })} className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </h3>
          
          {state.showAgentCard && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-300">
                  {state.agentImage ? (
                    <img src={state.agentImage} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={20} /></div>
                  )}
                </div>
                <label className="flex-1 cursor-pointer bg-white border border-gray-300 text-gray-600 text-xs font-bold py-1.5 px-2 rounded hover:bg-gray-50 flex items-center justify-center gap-1 transition-colors shadow-sm">
                  <Image size={12} />
                  <span>上传头像</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'agentImage')} />
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="姓名"
                  value={state.agentName}
                  onChange={(e) => onChange({ agentName: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-black outline-none"
                />
                <input 
                  type="text" 
                  placeholder="头衔"
                  value={state.agentTitle}
                  onChange={(e) => onChange({ agentTitle: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-black outline-none"
                />
              </div>
              <input 
                type="text" 
                placeholder="联系电话"
                value={state.agentPhone}
                onChange={(e) => onChange({ agentPhone: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-black outline-none"
              />
            </div>
          )}
        </div>

        {/* Appearance Settings */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">外观参数</h3>
          
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1 block">画布尺寸</label>
            <div className="relative">
              <select 
                value={state.aspectRatio}
                onChange={(e) => onChange({ aspectRatio: e.target.value as any })}
                className="w-full bg-gray-50 border border-gray-200 text-xs rounded px-2 py-1.5 focus:ring-1 focus:ring-black outline-none appearance-none cursor-pointer font-medium text-gray-700"
              >
                <option value="3:4">📕 小红书 (3:4)</option>
                <option value="9:16">📱 手机海报 (9:16)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
              <span>正文字号</span>
              <span>{state.fontSize}px</span>
            </div>
            <input 
              type="range" 
              min="12" 
              max="24" 
              value={state.fontSize}
              onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

      </div>
    </aside>
  );
};
