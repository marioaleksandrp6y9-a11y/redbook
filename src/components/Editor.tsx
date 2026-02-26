import React from 'react';
import { AppState } from '../types';
import { ImagePlus, ClipboardPaste, PenTool } from 'lucide-react';

interface EditorProps {
  state: AppState;
  onChange: (newState: Partial<AppState>) => void;
}

export const Editor: React.FC<EditorProps> = ({ state, onChange }) => {
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const textarea = document.getElementById('markdown-input') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = state.content.substring(0, start) + text + state.content.substring(end);
        onChange({ content: newText });
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const textarea = document.getElementById('markdown-input') as HTMLTextAreaElement;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          // Insert image markdown
          const imageMarkdown = `\n![Image](${result})\n`;
          const newText = state.content.substring(0, start) + imageMarkdown + state.content.substring(end);
          onChange({ content: newText });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-[350px] bg-white border-r border-gray-200 flex flex-col h-full shadow-xl z-20 shrink-0">
      <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 shrink-0 bg-white">
        <h2 className="font-bold text-sm flex items-center gap-2 text-gray-700">
          <PenTool size={16} />
          <span>正文编辑</span>
        </h2>
        <button 
          onClick={handlePaste}
          className="text-green-600 hover:bg-green-50 px-2 py-1.5 rounded text-xs flex items-center gap-1 transition-colors border border-green-200 font-medium"
        >
          <ClipboardPaste size={14} />
          <span>粘贴</span>
        </button>
      </div>

      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        <div className="mb-3 flex justify-between items-center">
          <span className="text-xs text-gray-400 font-medium">Markdown / 支持图片粘贴</span>
          <label className="cursor-pointer text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded text-xs flex items-center gap-1 transition-colors border border-blue-200 font-medium">
            <ImagePlus size={14} />
            <span>插入图片</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <textarea
          id="markdown-input"
          className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs leading-relaxed resize-none shadow-inner focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
          value={state.content}
          onChange={(e) => onChange({ content: e.target.value })}
          spellCheck={false}
          placeholder="在这里输入正文内容..."
        />
        
        <div className="mt-3 text-[10px] text-gray-400 text-center font-mono bg-gray-50 py-1 rounded border border-gray-100">
          输入 <span className="text-blue-500 font-bold">@---</span> 可强制分页
        </div>
      </div>
    </aside>
  );
};
