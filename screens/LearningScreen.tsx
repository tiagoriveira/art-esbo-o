import React, { useState, useEffect } from 'react';
import { PROFILE_IMAGE, LEARNING_STEPS } from '../constants';
import { useImageContext } from '../context/ImageContext';
import { Step } from '../types';

interface LearningScreenProps {
  onNavigateBack: () => void;
}

export const LearningScreen: React.FC<LearningScreenProps> = ({ onNavigateBack }) => {
  const { sketchImageURL, originalImageURL } = useImageContext();
  const [selectedStep, setSelectedStep] = useState<Step>(LEARNING_STEPS[0]);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [showTips, setShowTips] = useState(true);
  const [showReference, setShowReference] = useState(false);
  const [referenceOpacity, setReferenceOpacity] = useState(85);
  const [exerciseStarted, setExerciseStarted] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('sketchcoach-notes');
    if (savedNotes) {
      try {
        setUserNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
  }, []);

  const handleSelectStep = (step: Step) => {
    setSelectedStep(step);
  };

  const handleSaveNote = () => {
    const updatedNotes = {
      ...userNotes,
      [selectedStep.id]: userNotes[selectedStep.id] || ''
    };
    localStorage.setItem('sketchcoach-notes', JSON.stringify(updatedNotes));
    alert('Note saved!');
  };

  const handleNoteChange = (value: string) => {
    setUserNotes(prev => ({
      ...prev,
      [selectedStep.id]: value
    }));
  };

  const handleStartExercise = () => {
    setExerciseStarted(true);
    console.log(`Exercise started for step: ${selectedStep.title}`);
  };

  const currentStepIndex = LEARNING_STEPS.findIndex(s => s.id === selectedStep.id);
  const displayImage = showReference ? originalImageURL : sketchImageURL;
  const fallbackImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%231a1a1a" width="400" height="400"/><text fill="%23666" x="50%" y="50%" text-anchor="middle" dy=".3em">No image loaded</text></svg>';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

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
              <span className="text-white text-xs font-medium">Learning Guide</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Drawing Steps</h3>
            <div className="flex items-center gap-2 text-sm text-[#92c9a4]">
              <span className="material-symbols-outlined text-base">timer</span>
              <span>Step {currentStepIndex + 1} of {LEARNING_STEPS.length}</span>
            </div>
            <div className="h-px w-full bg-[#23482f] mt-4"></div>
          </div>

          {/* Timeline/Steps */}
          <div className="px-6 py-2 flex-1">
            <div className="grid grid-cols-[32px_1fr] gap-x-3">
              {LEARNING_STEPS.map((step, index) => {
                const isActive = step.id === selectedStep.id;
                const isCompleted = index < currentStepIndex;
                const isLast = index === LEARNING_STEPS.length - 1;

                return (
                  <React.Fragment key={step.id}>
                    {/* Step indicator */}
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button
                        onClick={() => handleSelectStep(step)}
                        className={`flex items-center justify-center size-8 rounded-full font-bold text-sm transition-all ${isActive
                            ? 'bg-primary text-background-dark shadow-[0_0_10px_rgba(19,236,91,0.4)]'
                            : isCompleted
                              ? 'bg-primary/30 text-primary border border-primary/50'
                              : 'border border-[#326744] bg-surface-hover text-[#92c9a4] hover:border-primary/50'
                          }`}
                      >
                        {isCompleted ? (
                          <span className="material-symbols-outlined text-lg">check</span>
                        ) : (
                          index + 1
                        )}
                      </button>
                      {!isLast && (
                        <div className={`w-[2px] h-full min-h-[40px] grow ${isActive ? 'bg-gradient-to-b from-primary to-[#326744]' : 'bg-[#326744]'
                          }`}></div>
                      )}
                    </div>

                    {/* Step content */}
                    <button
                      onClick={() => handleSelectStep(step)}
                      className={`flex flex-1 flex-col pb-8 pt-1 text-left transition-opacity ${!isActive && 'opacity-70 hover:opacity-100'
                        }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className={`text-base font-bold leading-normal ${isActive ? 'text-primary' : 'text-white'
                          }`}>{step.title}</p>
                        {isActive && (
                          <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm font-normal leading-relaxed">{step.description}</p>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-[#23482f] bg-background-dark/50">
            <button
              onClick={onNavigateBack}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#326744] text-white hover:bg-[#326744]/20 transition-all text-sm font-medium"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Sketch Editor
            </button>
          </div>
        </aside>

        {/* Main Visual Stage */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark relative">
          {/* Stage Header */}
          <div className="px-8 py-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-white text-3xl font-bold leading-tight tracking-tight">
                  Step {currentStepIndex + 1}: {selectedStep.title}
                </h1>
                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getDifficultyColor(selectedStep.difficulty)}`}>
                  {selectedStep.difficulty}
                </span>
              </div>
              <p className="text-[#92c9a4] max-w-2xl text-base">{selectedStep.description}</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => setShowTips(!showTips)}
                className={`p-2 rounded-lg border transition-colors ${showTips
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-surface-dark border-[#326744] text-white hover:bg-surface-hover'
                  }`}
                title="Toggle Tips"
              >
                <span className="material-symbols-outlined">lightbulb</span>
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
                    <span className="text-xs font-bold text-white uppercase tracking-wider">View Mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${!showReference ? 'text-primary font-bold' : 'text-white/50'}`}>SKETCH</span>
                    <button
                      onClick={() => setShowReference(!showReference)}
                      className="relative w-8 h-4 bg-primary/20 rounded-full cursor-pointer"
                    >
                      <div className={`absolute top-0.5 size-3 bg-primary rounded-full shadow-sm transition-all ${showReference ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                    </button>
                    <span className={`text-[10px] ${showReference ? 'text-primary font-bold' : 'text-white/50'}`}>PHOTO</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-white/50 mb-1">
                      <span>Opacity</span>
                      <span>{referenceOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={referenceOpacity}
                      onChange={(e) => setReferenceOpacity(Number(e.target.value))}
                      className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              </div>

              {/* The Image Stage */}
              <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <div className="relative shadow-2xl rounded-sm overflow-hidden max-w-[90%] max-h-[90%]">
                  <img
                    className="w-full h-full object-contain"
                    src={displayImage || fallbackImage}
                    alt="Current sketch or reference"
                    style={{ opacity: referenceOpacity / 100 }}
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

          {/* Tips Section (Collapsible) */}
          {showTips && (
            <div className="px-8 py-4">
              <div className="bg-surface-dark border border-[#23482f] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                  <h4 className="text-white font-bold">Tips for this step</h4>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedStep.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#92c9a4]">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Detailed Instructions */}
          <div className="px-8 py-4">
            <div className="bg-surface-dark border border-[#23482f] rounded-xl p-5">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Detailed Instructions
              </h4>
              <div className="text-[#92c9a4] text-sm leading-relaxed whitespace-pre-line">
                {selectedStep.detailedInstructions}
              </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="px-8 py-6">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
              {/* Action Bar */}
              <div className="flex-1 bg-surface-dark border border-[#23482f] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-full border flex items-center justify-center ${exerciseStarted
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-background-dark border-[#326744] text-primary'
                    }`}>
                    <span className="material-symbols-outlined text-2xl">
                      {exerciseStarted ? 'draw' : 'gesture'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">
                      {exerciseStarted ? 'Exercise in Progress' : 'Ready to sketch?'}
                    </h4>
                    <p className="text-sm text-[#92c9a4]">
                      {exerciseStarted
                        ? `Working on: ${selectedStep.title}`
                        : 'Complete this step to unlock the next phase.'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleStartExercise}
                    className={`flex-1 sm:flex-none py-3 px-6 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 ${exerciseStarted
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-background-dark'
                        : 'bg-primary hover:bg-primary/90 text-background-dark shadow-[0_0_15px_rgba(19,236,91,0.3)]'
                      }`}
                  >
                    <span className="material-symbols-outlined">
                      {exerciseStarted ? 'pause' : 'play_arrow'}
                    </span>
                    {exerciseStarted ? 'Pause Exercise' : 'Start Exercise'}
                  </button>
                </div>
              </div>

              {/* Notes Widget */}
              <div className="w-full xl:w-1/3 bg-surface-dark border border-[#23482f] rounded-xl p-1 flex flex-col group/notes">
                <div className="relative flex-1">
                  <textarea
                    className="w-full h-full min-h-[80px] bg-transparent border-none text-white placeholder-white/30 text-sm p-4 focus:ring-0 resize-none focus:outline-none"
                    placeholder="Add personal notes about this step... (e.g. 'Struggled with the proportions')"
                    value={userNotes[selectedStep.id] || ''}
                    onChange={(e) => handleNoteChange(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleSaveNote}
                    className="absolute bottom-2 right-2 p-1.5 rounded bg-[#326744]/40 hover:bg-[#326744] text-[#92c9a4] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-lg">save</span>
                    <span className="text-xs">Save</span>
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
