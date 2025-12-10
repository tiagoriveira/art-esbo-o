import React from 'react';
import { PORTRAIT_REFERENCE, PROFILE_IMAGE } from '../constants';

interface LearningScreenProps {
  onNavigateBack: () => void;
}

export const LearningScreen: React.FC<LearningScreenProps> = ({ onNavigateBack }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-background-dark flex flex-col min-h-screen">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#23482f] bg-background-dark px-4 py-3 md:px-10">
        <div className="flex items-center gap-4 text-white cursor-pointer" onClick={onNavigateBack}>
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">brush</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">SketchCoach</h2>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a href="#" className="text-white/70 hover:text-white text-sm font-medium leading-normal transition-colors">Dashboard</a>
            <a href="#" className="text-white text-sm font-medium leading-normal">Courses</a>
            <a href="#" className="text-white/70 hover:text-white text-sm font-medium leading-normal transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center text-white/70 hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#23482f]" 
              style={{ backgroundImage: `url("${PROFILE_IMAGE}")` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1 flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar: Curriculum Navigator */}
        <aside className="w-full lg:w-[360px] flex flex-col border-r border-[#23482f] bg-surface-dark overflow-y-auto shrink-0">
          {/* Breadcrumbs in Sidebar Context */}
          <div className="p-6 pb-2">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <a href="#" className="text-[#92c9a4] text-xs font-medium hover:underline">My Projects</a>
              <span className="text-[#92c9a4] text-xs">/</span>
              <span className="text-white text-xs font-medium">Portrait Study #42</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Structure & Form</h3>
            <div className="flex items-center gap-2 text-sm text-[#92c9a4]">
              <span className="material-symbols-outlined text-base">timer</span>
              <span>45 min estimated</span>
            </div>
            <div className="h-px w-full bg-[#23482f] mt-4"></div>
          </div>

          {/* Timeline/Steps */}
          <div className="px-6 py-2 flex-1">
            <div className="grid grid-cols-[32px_1fr] gap-x-3">
              {/* Step 1: Active */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="flex items-center justify-center size-8 rounded-full bg-primary text-background-dark font-bold text-sm shadow-[0_0_10px_rgba(19,236,91,0.4)]">
                  1
                </div>
                <div className="w-[2px] bg-gradient-to-b from-primary to-[#326744] h-full min-h-[40px] grow"></div>
              </div>
              <div className="flex flex-1 flex-col pb-8 pt-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-primary text-base font-bold leading-normal">Formas grandes</p>
                  <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                </div>
                <p className="text-white/60 text-sm font-normal leading-relaxed">Establish the basic silhouette and large masses.</p>
              </div>

              {/* Step 2: Locked/Next */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center size-8 rounded-full border border-[#326744] bg-surface-hover text-[#92c9a4]">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <div className="w-[2px] bg-[#326744] h-full min-h-[40px] grow"></div>
              </div>
              <div className="flex flex-1 flex-col pb-8 pt-1 opacity-70">
                <p className="text-white text-base font-medium leading-normal">Contorno principal</p>
                <p className="text-[#92c9a4] text-sm font-normal leading-normal">Define inner lines</p>
              </div>

              {/* Step 3: Locked */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center size-8 rounded-full border border-[#326744] bg-surface-hover text-[#92c9a4]">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <div className="w-[2px] bg-[#326744] h-full min-h-[40px] grow"></div>
              </div>
              <div className="flex flex-1 flex-col pb-8 pt-1 opacity-70">
                <p className="text-white text-base font-medium leading-normal">Detalhes</p>
                <p className="text-[#92c9a4] text-sm font-normal leading-normal">Eyes, nose, and mouth</p>
              </div>

              {/* Step 4: Locked */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center size-8 rounded-full border border-[#326744] bg-surface-hover text-[#92c9a4]">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col pb-8 pt-1 opacity-70">
                <p className="text-white text-base font-medium leading-normal">Sombreamento</p>
                <p className="text-[#92c9a4] text-sm font-normal leading-normal">Light and shadow</p>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-[#23482f] bg-background-dark/50">
            <button 
              onClick={onNavigateBack}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#326744] text-white hover:bg-[#326744]/20 transition-all text-sm font-medium"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Course Overview
            </button>
          </div>
        </aside>

        {/* Main Visual Stage */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark relative">
          {/* Stage Header */}
          <div className="px-8 py-6 flex items-end justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold leading-tight tracking-tight mb-2">Step 1: Formas grandes</h1>
              <p className="text-[#92c9a4] max-w-2xl text-base">Focus on the overall silhouette. Don't worry about details like eyes or hair strands yet. Use the green guide lines to verify your proportions.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button aria-label="Keyboard shortcuts" className="p-2 rounded-lg bg-surface-dark border border-[#326744] text-white hover:bg-surface-hover transition-colors">
                <span className="material-symbols-outlined">keyboard</span>
              </button>
              <button aria-label="Help" className="p-2 rounded-lg bg-surface-dark border border-[#326744] text-white hover:bg-surface-hover transition-colors">
                <span className="material-symbols-outlined">help</span>
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="px-8 flex-1 min-h-[400px] flex flex-col">
            <div className="relative w-full flex-1 bg-[#1a1a1a] rounded-xl border border-[#23482f] overflow-hidden group">
              {/* Toolbar Floating inside Canvas */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background-dark/90 backdrop-blur-sm border border-[#326744] rounded-full px-4 py-2 z-10 shadow-xl">
                <button className="text-white hover:text-primary transition-colors p-1" title="Zoom Out">
                  <span className="material-symbols-outlined text-xl">remove</span>
                </button>
                <span className="text-xs text-white/70 font-mono w-12 text-center">100%</span>
                <button className="text-white hover:text-primary transition-colors p-1" title="Zoom In">
                  <span className="material-symbols-outlined text-xl">add</span>
                </button>
                <div className="w-px h-4 bg-white/20 mx-1"></div>
                <button className="text-primary hover:text-white transition-colors p-1" title="Fit to Screen">
                  <span className="material-symbols-outlined text-xl">fit_screen</span>
                </button>
              </div>

              {/* Overlay Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <div className="bg-background-dark/90 backdrop-blur-sm border border-[#326744] rounded-lg p-3 shadow-xl">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Reference</span>
                    <span className="material-symbols-outlined text-white/50 text-sm">visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50">PHOTO</span>
                    <div className="relative w-8 h-4 bg-primary/20 rounded-full cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 size-3 bg-primary rounded-full shadow-sm"></div>
                    </div>
                    <span className="text-[10px] text-primary font-bold">SKETCH</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-white/50 mb-1">
                      <span>Opacity</span>
                      <span>85%</span>
                    </div>
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Image Stage */}
              <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <div className="relative shadow-2xl rounded-sm overflow-hidden max-w-[90%] max-h-[90%] aspect-[3/4]">
                  <img 
                    className="w-full h-full object-cover opacity-30 grayscale" 
                    src={PORTRAIT_REFERENCE}
                    alt="Black and white portrait of a woman looking sideways"
                  />
                  {/* Green overlay lines (Learning Guide) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path 
                      className="drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]" 
                      d="M30 20 Q 50 10, 70 25 T 80 60 Q 70 90, 40 85 T 20 50 Z" 
                      fill="none" 
                      stroke="#13ec5b" 
                      strokeDasharray="2,1" 
                      strokeWidth="0.5"
                    ></path>
                    <circle className="animate-pulse" cx="40" cy="45" fill="#13ec5b" r="2"></circle>
                    <circle className="animate-pulse" cx="65" cy="42" fill="#13ec5b" r="2"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="px-8 py-6">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
              {/* Action Bar */}
              <div className="flex-1 bg-surface-dark border border-[#23482f] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-background-dark border border-[#326744] flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">gesture</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Ready to sketch?</h4>
                    <p className="text-sm text-[#92c9a4]">Complete this step to unlock the contour guide.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-base transition-colors shadow-[0_0_15px_rgba(19,236,91,0.3)] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Iniciar exercício
                  </button>
                </div>
              </div>

              {/* Notes Widget */}
              <div className="w-full xl:w-1/3 bg-surface-dark border border-[#23482f] rounded-xl p-1 flex flex-col group/notes">
                <div className="relative flex-1">
                  <textarea 
                    className="w-full h-full min-h-[80px] bg-transparent border-none text-white placeholder-white/30 text-sm p-4 focus:ring-0 resize-none focus:outline-none" 
                    placeholder="Add personal notes about this step... (e.g. 'Struggled with the jawline angle')"
                  ></textarea>
                  <button className="absolute bottom-2 right-2 p-1.5 rounded bg-[#326744]/40 hover:bg-[#326744] text-[#92c9a4] hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
