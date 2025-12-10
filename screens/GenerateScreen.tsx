import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PROFILE_IMAGE } from '../constants';
import { useImageContext } from '../context/ImageContext';
import { generateSketch, downloadSketch } from '../utils/imageProcessing';

interface GenerateScreenProps {
  onNavigateNext: () => void;
  onNavigateBack: () => void;
}

export const GenerateScreen: React.FC<GenerateScreenProps> = ({ onNavigateNext, onNavigateBack }) => {
  const { originalImageURL, sketchImageURL, sketchSettings, setSketchImage, updateSettings, resetAll } = useImageContext();

  const [complexity, setComplexity] = useState(sketchSettings.complexity);
  const [lineWeight, setLineWeight] = useState(sketchSettings.lineWeight);
  const [threshold, setThreshold] = useState(sketchSettings.shadowThreshold);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Process the image to generate sketch
  const processImage = useCallback(async () => {
    if (!originalImageURL || !canvasRef.current) return;

    setIsProcessing(true);
    setError(null);

    try {
      const sketchURL = await generateSketch(
        originalImageURL,
        { complexity, lineWeight, shadowThreshold: threshold },
        canvasRef.current
      );
      setSketchImage(sketchURL);
      updateSettings({ complexity, lineWeight, shadowThreshold: threshold });
    } catch (err) {
      console.error('Failed to generate sketch:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImageURL, complexity, lineWeight, threshold, setSketchImage, updateSettings]);

  // Process image on mount and when settings change (debounced)
  useEffect(() => {
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    processingTimeoutRef.current = setTimeout(() => {
      processImage();
    }, 300); // Debounce by 300ms

    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, [processImage]);

  // Simple drag handler for the split view
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplitPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleExport = () => {
    if (sketchImageURL) {
      downloadSketch(sketchImageURL, 'sketchcoach-sketch.png');
    }
  };

  const handleReset = () => {
    resetAll();
    onNavigateBack();
  };

  const handleNewPhoto = () => {
    resetAll();
    onNavigateBack();
  };

  // If no image is uploaded, show a placeholder or redirect
  const displayOriginal = originalImageURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
  const displaySketch = sketchImageURL || displayOriginal;

  return (
    <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden">
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Navigation Bar */}
      <header className="w-full border-b border-[#23482f] bg-[#112217] px-4 lg:px-10 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-white cursor-pointer" onClick={onNavigateBack}>
            <span className="material-symbols-outlined text-primary text-3xl">draw</span>
            <h1 className="text-white text-xl font-bold tracking-tight">SketchCoach</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">My Library</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Tutorials</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Community</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-white md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full h-9 w-9 border-2 border-[#23482f]"
              style={{ backgroundImage: `url("${PROFILE_IMAGE}")` }}
            >
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-10 py-6 lg:py-8 flex flex-col gap-6">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#23482f] pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#92c9a4] text-sm font-medium mb-1">
              <span>Projects</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span>New Sketch</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">Generate Your Sketch</h2>
            <p className="text-[#92c9a4] text-sm md:text-base font-normal max-w-xl">
              Adjust the settings to transform your reference photo into a guided sketch plan.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#326744] bg-[#1a3325] text-white hover:bg-[#23482f] transition text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              Reset
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Editor Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">
          {/* Comparison Canvas (Left - Takes up 8/12 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Toolbar for Canvas */}
            <div className="flex items-center justify-between bg-[#1a3325] p-2 rounded-lg border border-[#23482f]">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded hover:bg-[#23482f] text-white active:text-primary transition" title="Split View">
                  <span className="material-symbols-outlined text-[20px]">vertical_split</span>
                </button>
                <button className="p-2 rounded hover:bg-[#23482f] text-slate-400 hover:text-white transition" title="Overlay View">
                  <span className="material-symbols-outlined text-[20px]">layers</span>
                </button>
              </div>
              <div className="flex items-center gap-2 px-2">
                {isProcessing && (
                  <span className="text-xs text-primary animate-pulse">Processing...</span>
                )}
                <span className="material-symbols-outlined text-slate-400 text-[18px]">zoom_in</span>
                <span className="text-xs text-slate-300 font-mono">100%</span>
              </div>
            </div>

            {/* Images Container */}
            <div
              className="relative w-full h-[500px] md:h-full bg-[#0f1d15] rounded-xl overflow-hidden border border-[#23482f] select-none"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Reference Image Layer (Background) */}
              <div
                className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url("${displayOriginal}")`, backgroundColor: '#1a1a1a' }}
              >
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Reference</span>
                </div>
              </div>

              {/* Generated Sketch Layer (Foreground, clipped) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ width: `${splitPosition}%` }}
              >
                <div
                  className="absolute inset-0 h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: `url("${displaySketch}")`,
                    backgroundColor: '#ffffff',
                    width: `${100 / (splitPosition / 100)}%`
                  }}
                ></div>
                <div className="absolute top-4 right-4 z-10 bg-[#13ec5b]/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="text-xs font-bold text-[#102216] uppercase tracking-wider">Generated Sketch</span>
                </div>
              </div>

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white text-sm font-medium">Generating sketch...</span>
                  </div>
                </div>
              )}

              {/* Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#13ec5b] z-20 shadow-[0_0_10px_#13ec5b] cursor-ew-resize hover:scale-x-150 transition-transform"
                style={{ left: `${splitPosition}%` }}
                onMouseDown={handleMouseDown}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#13ec5b] rounded-full p-1 shadow-md">
                  <span className="material-symbols-outlined text-[#102216] text-[16px] block">code</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Controls (Right - Takes up 4/12 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1a3325]/30 p-6 rounded-xl border border-[#23482f]">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white">Sketch Settings</h3>
              <p className="text-sm text-slate-400">Fine-tune the algorithm to get the perfect trace.</p>
            </div>

            {/* Sliders Section */}
            <div className="flex flex-col gap-6 py-4">
              {/* Complexity Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-white text-sm font-medium">Edge Sensitivity</label>
                  <span className="text-[#13ec5b] text-xs font-mono bg-[#13ec5b]/10 px-2 py-0.5 rounded">{complexity}%</span>
                </div>
                <div className="relative h-6 flex items-center">
                  <input
                    className="w-full z-10 relative accent-[#13ec5b]"
                    max="100"
                    min="0"
                    type="range"
                    value={complexity}
                    onChange={(e) => setComplexity(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Less Detail</span>
                  <span>More Detail</span>
                </div>
              </div>

              {/* Line Weight Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-white text-sm font-medium">Line Weight</label>
                  <span className="text-[#13ec5b] text-xs font-mono bg-[#13ec5b]/10 px-2 py-0.5 rounded">{lineWeight}%</span>
                </div>
                <div className="relative h-6 flex items-center">
                  <input
                    className="w-full z-10 relative accent-[#13ec5b]"
                    max="100"
                    min="0"
                    type="range"
                    value={lineWeight}
                    onChange={(e) => setLineWeight(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Thin</span>
                  <span>Thick</span>
                </div>
              </div>

              {/* Threshold Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-white text-sm font-medium">Contrast</label>
                  <span className="text-[#13ec5b] text-xs font-mono bg-[#13ec5b]/10 px-2 py-0.5 rounded">{threshold}%</span>
                </div>
                <div className="relative h-6 flex items-center">
                  <input
                    className="w-full z-10 relative accent-[#13ec5b]"
                    max="100"
                    min="0"
                    type="range"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <hr className="border-[#23482f]" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              <button
                onClick={onNavigateNext}
                disabled={!sketchImageURL || isProcessing}
                className="w-full py-4 px-6 rounded-lg bg-primary text-[#102216] text-lg font-bold hover:bg-[#11d852] transition shadow-[0_0_20px_rgba(19,236,91,0.2)] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">school</span>
                Start Learning
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleNewPhoto}
                  className="w-full py-3 px-4 rounded-lg border border-[#326744] bg-transparent text-white hover:bg-[#1a3325] transition text-sm font-medium flex justify-center items-center gap-2"
                >
                  <span className="material-symbols-outlined">upload</span>
                  New Photo
                </button>
                <button
                  onClick={handleExport}
                  disabled={!sketchImageURL || isProcessing}
                  className="w-full py-3 px-4 rounded-lg border border-[#326744] bg-transparent text-white hover:bg-[#1a3325] transition text-sm font-medium flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">download</span>
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
