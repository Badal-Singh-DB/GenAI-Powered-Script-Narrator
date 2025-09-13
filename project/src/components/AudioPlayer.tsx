import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Share2, Volume2, Loader, Headphones, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string | null;
  isGenerating: boolean;
  script: string;
  settings: any;
}

export function AudioPlayer({ audioUrl, isGenerating, script, settings }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(0.8);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (!audioUrl) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden h-fit sticky top-6">
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
        <div className="flex items-center space-x-3">
          <Headphones className="h-6 w-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">Audio Studio</h2>
            <p className="text-sm text-slate-400">Professional voice generation</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!audioUrl && !isGenerating ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
              <Volume2 className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Ready to Generate
            </h3>
            <p className="text-slate-400 max-w-sm mx-auto text-sm">
              Configure your script and voice settings to create professional AI-powered narration.
            </p>
          </div>
        ) : isGenerating ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
              <Loader className="h-10 w-10 text-purple-400 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Generating Audio...
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              AI is processing your script with GPT-4 powered voice synthesis
            </p>
            <div className="w-64 h-3 bg-slate-600 rounded-full mx-auto">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Using {settings.voice} voice with {settings.emotion} emotion
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Audio Info */}
            <div className="p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Generated Audio</span>
                <span className="text-xs text-slate-500">High Quality • 44.1kHz</span>
              </div>
              <div className="text-xs text-slate-400">
                Voice: {settings.voice} • Emotion: {settings.emotion} • Speed: {settings.speed}x
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="h-32 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-600">
              <div className="flex items-end space-x-1 h-20">
                {Array.from({ length: 80 }).map((_, i) => {
                  const height = Math.random() * 80 + 10;
                  const isActive = i < (progress / 100) * 80;
                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-t from-purple-500 to-blue-500' 
                          : 'bg-slate-600'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative h-2 bg-slate-600 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white transition-all transform hover:scale-110 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </button>
              
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <Volume2 className="h-4 w-4 text-slate-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-600 rounded-full appearance-none cursor-pointer slider-purple"
              />
              <span className="text-xs text-slate-400 w-8">{Math.round(volume * 100)}%</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-600">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl font-medium transition-all">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-purple-300 rounded-xl font-medium transition-all border border-purple-500/30">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}