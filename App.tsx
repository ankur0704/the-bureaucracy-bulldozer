import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import DropZone from './components/DropZone';
import Terminal from './components/Terminal';
import BulldozeButton from './components/BulldozeButton';
import { runBulldozerLogic } from './backend/bulldozer';
import { AppState, FileData, ZoningResult } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<ZoningResult | null>(null);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [shake, setShake] = useState(false);

  // Handle Paste Event (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (appState === AppState.ANALYZING) return;
      
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          e.preventDefault();
          const reader = new FileReader();
          reader.onload = (event) => {
            setFileData({
              file: file,
              preview: event.target?.result as string
            });
            // Visual feedback for paste
            setShake(true);
            setTimeout(() => setShake(false), 200);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [appState]);

  const handleBulldoze = async () => {
    if (!description && !fileData) return;

    // Trigger Shake Effect
    setShake(true);
    setTimeout(() => setShake(false), 500);

    setAppState(AppState.ANALYZING);
    setResult(null);
    setTerminalOutput('');

    // Artificial delay for dramatic effect
    const minDelay = new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      const apiCall = runBulldozerLogic(description, fileData?.preview);
      const [apiResult] = await Promise.all([apiCall, minDelay]);
      
      setResult(apiResult);
      
      // Format the rich object into a terminal string
      const formattedLog = `
> INITIALIZING SPATIAL AUDIT...
> PARSING MUNICIPAL BYLAWS (IRC-2021)...
> RUNNING "VIBE CHECK" ON SUBMITTED ASSETS...
> ADVERSARIAL MODE: ACTIVE

--------------------------------------------------
VERDICT: ${apiResult.verdict}
--------------------------------------------------

>> CASE ANALYSIS:
${apiResult.analysis}

>> THE "GOTCHA" (WARNING):
${apiResult.gotcha}

>> PRESCRIBED ACTION (PERMIT TEXT):
${apiResult.actionPlan}

> CASE CLOSED.
`;
      setTerminalOutput(formattedLog);
      setAppState(AppState.COMPLETE);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      setResult({
        verdict: 'DENIED',
        analysis: 'CRITICAL FAILURE',
        gotcha: 'SYSTEM_ERROR',
        actionPlan: 'RETRY'
      });
      setTerminalOutput("> ERROR: COULD NOT CONNECT TO LEGAL MAINFRAME.");
    }
  };

  return (
    <motion.div 
        className="min-h-screen bg-off-white p-4 md:p-8 font-sans selection:bg-hazard-yellow selection:text-deep-black"
        animate={shake ? { x: [-5, 5, -5, 5, -2, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Hero accepts verdict to display the Stamp */}
          <Hero verdict={result?.verdict} />

          {/* Input Section - Left Col */}
          <div className="col-span-1 flex flex-col gap-6 relative">
            <DropZone onFileSelect={setFileData} selectedFile={fileData} />
            
            <div className="border-3 border-deep-black bg-white shadow-hard p-4 transition-shadow hover:shadow-hard-lg focus-within:shadow-hard-lg">
                <label className="block font-bold text-sm mb-2 uppercase tracking-wide">Project Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your zoning request (e.g., 'Building a 12ft fence in the front yard')..."
                    className="w-full h-40 p-3 bg-gray-100 border-2 border-gray-200 focus:border-deep-black focus:bg-hazard-yellow/10 outline-none resize-none font-mono text-sm"
                />
            </div>
          </div>

          {/* Terminal Section - Right Cols */}
          <Terminal 
            text={terminalOutput} 
            isTyping={appState === AppState.ANALYZING} 
          />

        </div>

        {/* Static Button */}
        <BulldozeButton 
            onClick={handleBulldoze} 
            disabled={appState === AppState.ANALYZING || (!fileData && !description)} 
        />

      </div>
    </motion.div>
  );
};

export default App;