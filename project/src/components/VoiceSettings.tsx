import React, { useState } from 'react';
import { Settings, Mic, Zap, Play } from 'lucide-react';

interface VoiceSettingsProps {
  script: string;
  onGenerate: (settings: any) => void;
}

const voiceTypes = [
  { id: 'professional', name: 'Professional', color: 'bg-blue-500', description: 'Clear and authoritative' },
  { id: 'casual', name: 'Casual', color: 'bg-green-500', description: 'Relaxed and friendly' },
  { id: 'dramatic', name: 'Dramatic', color: 'bg-red-500', description: 'Intense and engaging' },
  { id: 'friendly', name: 'Friendly', color: 'bg-yellow-500', description: 'Warm and approachable' }
];

const emotions = ['Neutral', 'Happy', 'Confident', 'Calm', 'Excited', 'Serious'];

export function VoiceSettings({ script, onGenerate }: VoiceSettingsProps) {
  const [selectedVoice, setSelectedVoice] = useState('professional');
  const [selectedEmotion, setSelectedEmotion] = useState('Neutral');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);

  const handleGenerate = () => {
    onGenerate({
      voiceType: selectedVoice,
      emotion: selectedEmotion,
      speed,
      pitch,
      script
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-emerald-100">
        <div className="flex items-center space-x-3">
          <Settings className="h-6 w-6 text-teal-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Voice Settings</h2>
            <p className="text-sm text-gray-600">Customize tone and emotion</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Voice Type
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {voiceTypes.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-105 ${
                  selectedVoice === voice.id
                    ? 'border-emerald-400 bg-emerald-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${voice.color}`}></div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {voice.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {voice.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Emotion
          </h3>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <button
                key={emotion}
                onClick={() => setSelectedEmotion(emotion)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedEmotion === emotion
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Speed
              </h3>
              <span className="text-sm font-medium text-emerald-600">
                {speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-emerald"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Pitch
              </h3>
              <span className="text-sm font-medium text-emerald-600">
                {pitch > 0 ? '+' : ''}{pitch}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-emerald"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Lower</span>
              <span>Higher</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={handleGenerate}
            disabled={!script.trim()}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            <Zap className="h-5 w-5" />
            <span>Generate Voice</span>
          </button>
        </div>
      </div>
    </div>
  );
}