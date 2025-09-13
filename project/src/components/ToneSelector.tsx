import React from 'react';
import { Briefcase, Heart, Zap, Users, Mic, Brain } from 'lucide-react';

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
  script: string;
}

const tones = [
  { 
    id: 'professional', 
    name: 'Professional', 
    icon: Briefcase, 
    color: 'from-blue-500 to-blue-600',
    description: 'Clear, authoritative, and business-focused',
    useCase: 'Corporate presentations, training materials'
  },
  { 
    id: 'friendly', 
    name: 'Friendly', 
    icon: Heart, 
    color: 'from-green-500 to-green-600',
    description: 'Warm, approachable, and conversational',
    useCase: 'Customer service, educational content'
  },
  { 
    id: 'dramatic', 
    name: 'Dramatic', 
    icon: Zap, 
    color: 'from-red-500 to-red-600',
    description: 'Intense, engaging, and emotionally charged',
    useCase: 'Storytelling, marketing campaigns'
  },
  { 
    id: 'casual', 
    name: 'Casual', 
    icon: Users, 
    color: 'from-purple-500 to-purple-600',
    description: 'Relaxed, informal, and easy-going',
    useCase: 'Social media, podcasts, vlogs'
  },
  { 
    id: 'authoritative', 
    name: 'Authoritative', 
    icon: Mic, 
    color: 'from-indigo-500 to-indigo-600',
    description: 'Confident, commanding, and expert',
    useCase: 'News, documentaries, lectures'
  },
  { 
    id: 'empathetic', 
    name: 'Empathetic', 
    icon: Brain, 
    color: 'from-pink-500 to-pink-600',
    description: 'Understanding, supportive, and caring',
    useCase: 'Healthcare, counseling, support'
  }
];

export function ToneSelector({ selectedTone, onToneChange, script }: ToneSelectorProps) {
  const getAIRecommendation = () => {
    if (script.toLowerCase().includes('business') || script.toLowerCase().includes('corporate')) {
      return 'professional';
    }
    if (script.toLowerCase().includes('story') || script.toLowerCase().includes('once upon')) {
      return 'dramatic';
    }
    if (script.toLowerCase().includes('welcome') || script.toLowerCase().includes('hello')) {
      return 'friendly';
    }
    return 'professional';
  };

  const recommendedTone = script ? getAIRecommendation() : null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
        <div className="flex items-center space-x-3">
          <Mic className="h-6 w-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">Tone Selection</h2>
            <p className="text-sm text-slate-400">Choose the perfect tone for your content</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {recommendedTone && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">AI Recommendation</span>
            </div>
            <p className="text-sm text-slate-300">
              Based on your script content, we recommend the <strong className="text-purple-400">{recommendedTone}</strong> tone.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tones.map((tone) => {
            const Icon = tone.icon;
            const isSelected = selectedTone === tone.id;
            const isRecommended = recommendedTone === tone.id;
            
            return (
              <button
                key={tone.id}
                onClick={() => onToneChange(tone.id)}
                className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 relative ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-2 border-purple-400 shadow-lg'
                    : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-xs font-bold text-white rounded-full">
                    AI Pick
                  </div>
                )}
                
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${tone.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{tone.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">{tone.description}</p>
                    <p className="text-xs text-slate-500">{tone.useCase}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}