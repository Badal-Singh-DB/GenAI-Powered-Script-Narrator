import React, { useState } from 'react';
import { FileText, Wand2, AlertCircle } from 'lucide-react';

interface ScriptInputProps {
  script: string;
  onScriptChange: (script: string) => void;
  isGenerating: boolean;
}

export function ScriptInput({ script, onScriptChange, isGenerating }: ScriptInputProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeScript = async () => {
    if (!script.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const wordCount = script.split(' ').length;
      setAnalysis({
        sentiment: 'Professional',
        complexity: wordCount > 100 ? 'High' : wordCount > 50 ? 'Medium' : 'Low',
        estimatedTime: `${Math.ceil(wordCount / 150)}:${String(Math.floor((wordCount % 150) * 0.4)).padStart(2, '0')}`,
        wordCount,
        suggestions: [
          'Consider adding pauses for better flow',
          'The tone is well-suited for professional content',
          'Good balance of technical and accessible language'
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-emerald-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Script Editor</h2>
              <p className="text-sm text-gray-600">Paste your script and let AI analyze it</p>
            </div>
          </div>
          
          {script.length > 0 && (
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {script.split(' ').length} words
              </div>
              <div className="text-xs text-gray-400">
                ~{Math.ceil(script.split(' ').length / 150)} min read
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <textarea
            value={script}
            onChange={(e) => onScriptChange(e.target.value)}
            placeholder="Paste your script here... The AI will analyze the content and suggest optimal voice settings for natural-sounding narration."
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-800 placeholder-gray-500 transition-all"
            disabled={isGenerating}
          />

          <div className="flex justify-between items-center">
            <button
              onClick={analyzeScript}
              disabled={!script.trim() || isAnalyzing || isGenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'AI Analyze'}</span>
            </button>
            
            {script.length > 0 && (
              <div className="text-sm text-gray-500">
                Character limit: {script.length}/5000
              </div>
            )}
          </div>

          {analysis && (
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="h-5 w-5 text-cyan-600" />
                <h3 className="font-semibold text-cyan-900">AI Analysis Results</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-white rounded-xl">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sentiment</div>
                  <div className="text-cyan-600 font-bold text-lg">{analysis.sentiment}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Complexity</div>
                  <div className="text-cyan-600 font-bold text-lg">{analysis.complexity}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</div>
                  <div className="text-cyan-600 font-bold text-lg">{analysis.estimatedTime}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Words</div>
                  <div className="text-cyan-600 font-bold text-lg">{analysis.wordCount}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">AI Suggestions:</h4>
                <ul className="space-y-1">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                      <span className="text-cyan-500 mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}