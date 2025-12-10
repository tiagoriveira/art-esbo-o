import React, { useRef, useState, DragEvent } from 'react';
import { EXAMPLE_IMAGES, PROFILE_IMAGE } from '../constants';
import { useImageContext } from '../context/ImageContext';

interface UploadScreenProps {
  onNavigate: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onNavigate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setOriginalImage } = useImageContext();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG or PNG image.');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      return false;
    }

    setError(null);
    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalImage(dataUrl);
      onNavigate();
    };
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleExampleClick = (imageUrl: string) => {
    setOriginalImage(imageUrl);
    onNavigate();
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 dark:border-white/10 px-6 py-4 lg:px-10">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white group cursor-pointer">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-[32px]">brush</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">SketchCoach</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4 sm:gap-8 items-center">
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal">Home</a>
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal">My Sketches</a>
            <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal">Profile</a>
          </nav>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-white/10"
            style={{ backgroundImage: `url("${PROFILE_IMAGE}")` }}
          >
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="layout-content-container flex flex-col max-w-[960px] w-full flex-1">
          {/* Page Heading */}
          <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl sm:text-4xl font-bold leading-tight">
              Let's start your drawing lesson.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
              Upload a photo you want to sketch, and we'll guide you step-by-step.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Upload Area (Empty State) */}
          <div className="flex flex-col mb-12">
            <div
              onClick={handleDropZoneClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative group cursor-pointer flex flex-col items-center gap-6 rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out px-6 py-16 sm:py-20 ${isDragging
                  ? 'border-primary bg-primary/10 scale-[1.02]'
                  : 'border-slate-300 dark:border-primary/30 hover:border-primary dark:hover:border-primary hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
            >
              {/* Icon */}
              <div className={`size-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-125 text-primary' : 'text-slate-400 dark:text-primary/80 group-hover:scale-110'
                }`}>
                <span className="material-symbols-outlined !text-[40px]">cloud_upload</span>
              </div>
              <div className="flex max-w-[480px] flex-col items-center gap-2 z-10">
                <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight text-center">
                  {isDragging ? 'Drop your image here!' : 'Drag & drop an image here'}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal text-center">
                  Supported files: JPG, PNG. Max size: 10MB.
                </p>
              </div>
              <button
                onClick={handleBrowseClick}
                className="relative overflow-hidden rounded-lg h-12 px-8 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide shadow-[0_0_15px_rgba(19,236,91,0.3)] hover:shadow-[0_0_25px_rgba(19,236,91,0.5)] hover:bg-primary/90 transition-all active:scale-95 mt-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined !text-[20px]">folder_open</span>
                  Browse Files
                </span>
              </button>
            </div>
          </div>

          {/* Example Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight px-1">
              Or try these examples
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {EXAMPLE_IMAGES.map((img) => (
                <div key={img.id} onClick={() => handleExampleClick(img.url)} className="group relative flex flex-col gap-3 cursor-pointer">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden shadow-sm ring-1 ring-white/10 transition-all duration-300 group-hover:ring-primary group-hover:shadow-[0_4px_20px_-8px_rgba(19,236,91,0.5)]"
                    style={{ backgroundImage: `url("${img.url}")` }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-white/20 backdrop-blur-md text-white rounded-full p-2">
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
