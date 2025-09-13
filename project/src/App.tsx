import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ScriptEditor } from './components/ScriptEditor';
import { ToneSelector } from './components/ToneSelector';
import { VoiceControls } from './components/VoiceControls';
import { AudioPlayer } from './components/AudioPlayer';
import { ProjectDashboard } from './components/ProjectDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  const [activeView, setActiveView] = useState('editor');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 0,
    emotion: 'neutral',
    voice: 'alex'
  });

  const handleGenerate = async (settings: any) => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setAudioUrl('/generated-audio.mp3');
    }, 4000);
  };

  return (
    <ThemeProvider>
      <ProjectProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Header />
          
          <div className="flex">
            <Sidebar activeView={activeView} onViewChange={setActiveView} />
            
            <main className="flex-1 p-6">
              {activeView === 'dashboard' ? (
                <ProjectDashboard />
              ) : (
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column - Script Editor */}
                    <div className="xl:col-span-2 space-y-6">
                      <ScriptEditor 
                        script={script}
                        onScriptChange={setScript}
                        isGenerating={isGenerating}
                      />
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ToneSelector 
                          selectedTone={selectedTone}
                          onToneChange={setSelectedTone}
                          script={script}
                        />
                        
                        <VoiceControls 
                          settings={voiceSettings}
                          onSettingsChange={setVoiceSettings}
                          onGenerate={handleGenerate}
                          script={script}
                          isGenerating={isGenerating}
                        />
                      </div>
                    </div>
                    
                    {/* Right Column - Audio Player */}
                    <div>
                      <AudioPlayer 
                        audioUrl={audioUrl}
                        isGenerating={isGenerating}
                        script={script}
                        settings={voiceSettings}
                      />
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;