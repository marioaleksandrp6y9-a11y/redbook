import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AppState } from '../types';
import { cn } from '../lib/utils';
import { ShieldCheck, CheckCircle2, AlertTriangle, Phone, User, Award } from 'lucide-react';

interface CardProps {
  state: AppState;
  type: 'cover' | 'content' | 'contact';
  content?: string;
  pageNumber?: number;
  totalPages?: number;
}

const THEMES = {
  'insurance-blue': {
    bg: 'bg-slate-50',
    headerBg: 'bg-[#0F4C81]', // Classic Blue
    headerText: 'text-white',
    accent: 'text-[#0F4C81]',
    border: 'border-[#0F4C81]',
    highlight: 'bg-blue-50 text-blue-900',
    fontTitle: 'font-serif',
    fontBody: 'font-sans',
    icon: ShieldCheck,
  },
  'insurance-gold': {
    bg: 'bg-[#1a1a1a]', // Dark background
    headerBg: 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028]', // Gold
    headerText: 'text-black',
    accent: 'text-[#D4AF37]',
    border: 'border-[#D4AF37]',
    highlight: 'bg-[#333] text-[#D4AF37] border border-[#D4AF37]/30',
    fontTitle: 'font-serif',
    fontBody: 'font-sans',
    icon: Award,
  },
  'minimalist': {
    bg: 'bg-white',
    headerBg: 'bg-white border-b-2 border-black',
    headerText: 'text-black',
    accent: 'text-black',
    border: 'border-black',
    highlight: 'bg-gray-100 text-black',
    fontTitle: 'font-sans',
    fontBody: 'font-sans',
    icon: CheckCircle2,
  },
  'warm-family': {
    bg: 'bg-[#FFF8F0]', // Warm beige
    headerBg: 'bg-[#FF8C42]', // Warm Orange
    headerText: 'text-white',
    accent: 'text-[#FF8C42]',
    border: 'border-[#FF8C42]',
    highlight: 'bg-orange-50 text-orange-800',
    fontTitle: 'font-serif',
    fontBody: 'font-sans',
    icon: User,
  },
};

export const Card = React.forwardRef<HTMLDivElement, CardProps & { className?: string }>(({ state, type, content, pageNumber, totalPages, className }, ref) => {
  const theme = THEMES[state.theme];
  const Icon = theme.icon;

  const aspectRatioClass = state.aspectRatio === '3:4' ? 'aspect-[3/4]' : 'aspect-[9/16]';
  const widthClass = 'w-[375px]'; // Fixed width for consistent export

  // Markdown components customization
  const markdownComponents = {
    h1: ({node, ...props}: any) => <h1 className={cn("text-xl font-bold mb-4 border-l-4 pl-3", theme.accent, theme.border)} {...props} />,
    h2: ({node, ...props}: any) => <h2 className={cn("text-lg font-bold mt-6 mb-3 flex items-center gap-2", theme.accent)}><Icon size={18} />{props.children}</h2>,
    h3: ({node, ...props}: any) => <h3 className={cn("text-base font-bold mt-4 mb-2 opacity-90", theme.accent)} {...props} />,
    p: ({node, ...props}: any) => <p className="mb-3 leading-relaxed text-sm opacity-90" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc pl-5 mb-4 space-y-1 text-sm opacity-90" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal pl-5 mb-4 space-y-1 text-sm opacity-90" {...props} />,
    blockquote: ({node, ...props}: any) => (
      <blockquote className={cn("p-3 my-4 rounded-r-lg border-l-4 text-sm italic", theme.highlight, theme.border)} {...props} />
    ),
    table: ({node, ...props}: any) => (
      <div className="overflow-x-auto my-4 rounded-lg border border-opacity-20">
        <table className="w-full text-xs text-left" {...props} />
      </div>
    ),
    thead: ({node, ...props}: any) => <thead className={cn("bg-opacity-10 font-bold", theme.highlight)} {...props} />,
    th: ({node, ...props}: any) => <th className="p-2 border-b border-opacity-10" {...props} />,
    td: ({node, ...props}: any) => <td className="p-2 border-b border-opacity-10" {...props} />,
    strong: ({node, ...props}: any) => <strong className={cn("font-bold", theme.accent)} {...props} />,
    img: ({node, ...props}: any) => <img className="rounded-lg shadow-md my-4 w-full object-cover max-h-60" {...props} />,
  };

  if (type === 'cover') {
    return (
      <div ref={ref} className={cn(widthClass, aspectRatioClass, theme.bg, "relative flex flex-col overflow-hidden export-target", className)}>
        {/* Background Image Layer */}
        {state.coverImage && (
          <div className="absolute inset-0 z-0">
            <img src={state.coverImage} alt="Cover" className="w-full h-full object-cover opacity-30" />
            <div className={cn("absolute inset-0 bg-gradient-to-b from-transparent to-black/10")} />
          </div>
        )}

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Top Badge */}
          <div className="flex justify-between items-start">
            <div className={cn("px-3 py-1 text-xs font-bold tracking-widest uppercase rounded", theme.headerBg, theme.headerText)}>
              {state.date}
            </div>
            <div className={cn("flex items-center gap-1 text-xs font-bold opacity-70", state.theme === 'insurance-gold' ? 'text-white' : 'text-gray-600')}>
              <Icon size={14} />
              {state.author}
            </div>
          </div>

          {/* Main Title Area */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className={cn("text-4xl font-black leading-tight mb-6", theme.fontTitle, state.theme === 'insurance-gold' ? 'text-white' : 'text-gray-900')}>
              {state.title}
            </h1>
            <div className={cn("w-20 h-1.5 mb-6 rounded-full", state.theme === 'insurance-gold' ? 'bg-[#D4AF37]' : theme.headerBg)}></div>
            <p className={cn("text-lg font-medium leading-relaxed opacity-90", theme.fontBody, state.theme === 'insurance-gold' ? 'text-gray-300' : 'text-gray-700')}>
              {state.subtitle}
            </p>
          </div>

          {/* Footer Area */}
          <div className="mt-auto pt-6 border-t border-current border-opacity-20 flex justify-between items-end">
             <div className={cn("text-xs font-bold opacity-60", state.theme === 'insurance-gold' ? 'text-white' : 'text-gray-500')}>
               专业 · 靠谱 · 温暖
             </div>
             {state.agentImage && (
               <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                 <img src={state.agentImage} className="w-full h-full object-cover" />
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'content') {
    return (
      <div ref={ref} className={cn(widthClass, aspectRatioClass, theme.bg, "relative flex flex-col overflow-hidden export-target", className)}>
        {/* Header */}
        <div className={cn("h-14 flex items-center justify-between px-6 shrink-0", theme.headerBg, theme.headerText)}>
          <div className="font-bold text-sm tracking-wide flex items-center gap-2">
            <Icon size={16} />
            {state.title}
          </div>
          <div className="text-xs font-mono opacity-80">
            {pageNumber && totalPages ? `${pageNumber} / ${totalPages}` : ''}
          </div>
        </div>

        {/* Body */}
        <div className={cn("flex-1 p-8 overflow-hidden", state.theme === 'insurance-gold' ? 'text-gray-200' : 'text-gray-800')}>
          <div className={cn("markdown-body h-full", theme.fontBody)} style={{ fontSize: `${state.fontSize}px` }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {content || ''}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className={cn("h-8 flex items-center justify-center text-[10px] opacity-40 shrink-0", state.theme === 'insurance-gold' ? 'text-white' : 'text-black')}>
          {state.author} · {state.date}
        </div>
      </div>
    );
  }

  if (type === 'contact') {
    return (
      <div ref={ref} className={cn(widthClass, aspectRatioClass, theme.bg, "relative flex flex-col overflow-hidden export-target", className)}>
        {/* Agent Photo */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          
          {/* Agent Photo */}
          <div className={cn("w-32 h-32 rounded-full overflow-hidden border-4 shadow-2xl mb-6", theme.border)}>
            {state.agentImage ? (
              <img src={state.agentImage} className="w-full h-full object-cover" />
            ) : (
              <div className={cn("w-full h-full flex items-center justify-center bg-gray-200 text-gray-400")}>
                <User size={48} />
              </div>
            )}
          </div>

          {/* Name & Title */}
          <h2 className={cn("text-2xl font-bold mb-2", state.theme === 'insurance-gold' ? 'text-white' : 'text-gray-900')}>
            {state.agentName}
          </h2>
          <p className={cn("text-sm font-medium mb-8 px-3 py-1 rounded-full", theme.highlight)}>
            {state.agentTitle}
          </p>

          {/* Contact Info */}
          <div className={cn("w-full max-w-[260px] space-y-4 p-6 rounded-xl border border-opacity-20", state.theme === 'insurance-gold' ? 'bg-white/5 border-white' : 'bg-white border-gray-200 shadow-sm')}>
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", theme.headerBg, theme.headerText)}>
                <Phone size={14} />
              </div>
              <div className={cn("text-sm font-mono font-bold", state.theme === 'insurance-gold' ? 'text-gray-200' : 'text-gray-700')}>
                {state.agentPhone}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", theme.headerBg, theme.headerText)}>
                <ShieldCheck size={14} />
              </div>
              <div className={cn("text-sm font-bold", state.theme === 'insurance-gold' ? 'text-gray-200' : 'text-gray-700')}>
                为您定制专属保障方案
              </div>
            </div>
          </div>

          {/* Placeholder for QR Code */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-white p-1 rounded-lg shadow-inner">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${state.agentPhone}`} className="w-full h-full" alt="QR Code" />
            </div>
            <span className={cn("text-[10px] opacity-60", state.theme === 'insurance-gold' ? 'text-gray-400' : 'text-gray-500')}>
              扫码添加微信咨询
            </span>
          </div>

        </div>
      </div>
    );
  }

  return null;
});

Card.displayName = "Card";
