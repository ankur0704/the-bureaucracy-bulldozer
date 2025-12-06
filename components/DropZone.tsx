import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { FileData } from '../types';

interface DropZoneProps {
  onFileSelect: (fileData: FileData | null) => void;
  selectedFile: FileData | null;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileSelect({
          file,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <motion.div 
      className={`col-span-1 md:col-span-1 lg:col-span-1 border-3 border-deep-black bg-off-white p-6 shadow-hard relative cursor-pointer overflow-hidden group`}
      whileHover={{ scale: 1.01, boxShadow: "8px 8px 0px 0px #101010" }}
      animate={{ 
        borderColor: isDragging ? '#FFD028' : '#101010',
        backgroundColor: isDragging ? '#101010' : '#FDFBF7',
        color: isDragging ? '#FFD028' : '#101010'
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept="image/*,application/pdf"
        onChange={handleChange}
      />
      
      {/* Dashed Border Overlay */}
      <div className={`absolute inset-3 border-2 border-dashed pointer-events-none transition-colors duration-200 ${isDragging ? 'border-hazard-yellow' : 'border-gray-300'}`} />

      <div className="h-full flex flex-col items-center justify-center text-center relative z-10 min-h-[200px]">
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center w-full"
            >
              <Upload size={48} strokeWidth={2.5} className="mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-2xl font-bold uppercase mb-2">Drop Plans Here</h3>
              <p className="font-mono text-sm opacity-60 mb-6 max-w-[200px]">CLICK TO BROWSE, DRAG & DROP OR PASTE (CTRL+V)</p>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center w-full"
            >
               {selectedFile.file.type.startsWith('image/') ? (
                  <img src={selectedFile.preview} alt="Preview" className="w-24 h-24 object-cover border-2 border-deep-black mb-4 shadow-sm" />
               ) : (
                  <FileText size={64} className="mb-4" />
               )}
              <p className="font-bold truncate w-full px-4">{selectedFile.file.name}</p>
              <button 
                onClick={clearFile}
                className="mt-4 bg-error-red text-white p-2 border-2 border-deep-black hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_#101010] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DropZone;