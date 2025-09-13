import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Share2, Volume2, Loader, Headphones } from 'lucide-react';

interface AudioPreviewProps {
  audioUrl: string | null;
  isGenerating: boolean;
  script: string;
}

export function AudioPreview({ audioUrl, isGenerating, script }: AudioPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
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
    <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden h-fit">
      <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-emerald-100">
        <div className="flex items-center space-x-3">
          <Headphones className="h-6 w-6 text-cyan-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Audio Preview</h2>
            <p className="text-sm text-gray-600">Listen to your generated voice</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!audioUrl && !isGenerating ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Volume2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ready to Generate
            </h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              Enter your script and configure voice settings to create your AI-powered narration.
            </p>
          </div>
        ) : isGenerating ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader className="h-10 w-10 text-emerald-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Generating Audio...
            </h3>
            <p className="text-gray-600 mb-6">
              AI is processing your script with the selected voice settings
            </p>
            <div className="w-64 h-3 bg-gray-200 rounded-full mx-auto">
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Waveform Visualization */}
            <div className="h-32 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="flex items-end space-x-1 h-20">
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = Math.random() * 80 + 10;
                  const isActive = i < (progress / 100) * 60;
                  return (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-t from-emerald-500 to-teal-500' 
                          : 'bg-gray-300'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative h-3 bg-gray-200 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button 
                onClick={togglePlayPause}
                className="p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all transform hover:scale-110 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-medium transition-colors">
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