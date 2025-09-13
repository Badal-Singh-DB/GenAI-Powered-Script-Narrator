import React from 'react';
import { Settings, Sliders, Play, Zap } from 'lucide-react';

interface VoiceControlsProps {
  settings: {
    speed: number;
    pitch: number;
    emotion: string;
    voice: string;
  };
  onSettingsChange: (settings: any) => void;
  onGenerate: (settings: any) => void;
  script: string;
  isGenerating: boolean;
}

const voices = [
  { id: 'alex', name: 'Alex', gender: 'Male', accent: 'American' },
  { id: 'sarah', name: 'Sarah', gender: 'Female', accent: 'British' },
  { id: 'michael', name: 'Michael', gender: 'Male', accent: 'Australian' },
  { id: 'emma', name: 'Emma', gender: 'Female', accent: 'Canadian' },
  { id: 'james', name: 'James', gender: 'Male', accent: 'Irish' },
  { id: 'sophia', name: 'Sophia', gender: 'Female', accent: 'American' }
];

const emotions = [
  'Neutral', 'Happy', 'Confident', 'Calm', 'Excited', 'Serious', 'Warm', 'Energetic'
];

export function VoiceControls({ settings, onSettingsChange, onGenerate, script, isGenerating }: VoiceControlsProps) {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
        <div className="flex items-center space-x-3">
          <Settings className="h-6 w-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">Voice Controls</h2>
            <p className="text-sm text-slate-400">Fine-tune your voice generation</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Voice Selection */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
            Voice Selection
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => updateSetting('voice', voice.id)}
                className={`p-3 rounded-xl text-left transition-all ${
                  settings.voice === voice.id
                    ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400'
                    : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="font-medium text-white text-sm">{voice.name}</div>
                <div className="text-xs text-slate-400">{voice.gender} • {voice.accent}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Emotion Selection */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
            Emotion
          </h3>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <button
                key={emotion}
                onClick={() => updateSetting('emotion', emotion.toLowerCase())}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  settings.emotion === emotion.toLowerCase()
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>

        {/* Speed and Pitch Controls */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Speed
              </h3>
              <span className="text-sm font-medium text-purple-400">
                {settings.speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.speed}
              onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
              className="w-full h-3 bg-slate-600 rounded-full appearance-none cursor-pointer slider-purple"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Pitch
              </h3>
              <span className="text-sm font-medium text-purple-400">
                {settings.pitch > 0 ? '+' : ''}{settings.pitch}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={settings.pitch}
              onChange={(e) => updateSetting('pitch', parseInt(e.target.value))}
              className="w-full h-3 bg-slate-600 rounded-full appearance-none cursor-pointer slider-purple"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Lower</span>
              <span>Higher</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-6 border-t border-slate-600">
          <button
            onClick={() => onGenerate(settings)}
            disabled={!script.trim() || isGenerating}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isGenerating ? (
              <>
                <Sliders className="h-5 w-5 animate-pulse" />
                <span>Generating Voice...</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                <span>Generate Voice</span>
              </>
            )}
          </button>
          
          {script.trim() && (
            <p className="text-center text-xs text-slate-400 mt-2">
              Estimated processing time: {Math.ceil(script.split(' ').length / 100)} seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
}