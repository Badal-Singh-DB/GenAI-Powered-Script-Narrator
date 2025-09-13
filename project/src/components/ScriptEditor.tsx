import React, { useState, useRef } from 'react';
import { FileText, Upload, Wand2, Eye, Save, Copy } from 'lucide-react';

interface ScriptEditorProps {
  script: string;
  onScriptChange: (script: string) => void;
  isGenerating: boolean;
}

export function ScriptEditor({ script, onScriptChange, isGenerating }: ScriptEditorProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeScript = async () => {
    if (!script.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const wordCount = script.split(' ').length;
      const sentences = script.split('.').length - 1;
      
      setAnalysis({
        sentiment: 'Professional',
        complexity: wordCount > 200 ? 'High' : wordCount > 100 ? 'Medium' : 'Low',
        readability: sentences > 0 ? Math.round(wordCount / sentences) : 0,
        estimatedTime: `${Math.ceil(wordCount / 150)}:${String(Math.floor((wordCount % 150) * 0.4)).padStart(2, '0')}`,
        wordCount,
        keyTopics: ['Technology', 'Innovation', 'Business'],
        suggestedTone: 'Professional',
        emotionalScore: 0.7,
        suggestions: [
          'Consider adding pauses for better flow',
          'The tone is well-suited for professional content',
          'Good balance of technical and accessible language'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onScriptChange(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Advanced Script Editor</h2>
              <p className="text-sm text-slate-400">AI-powered script analysis and optimization</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all"
            >
              <Upload className="h-4 w-4" />
              <span className="text-sm">Upload</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all">
              <Save className="h-4 w-4" />
              <span className="text-sm">Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={script}
              onChange={(e) => onScriptChange(e.target.value)}
              placeholder="Enter your script here... The AI will analyze tone, emotion, and suggest optimal voice settings for natural narration."
              className="w-full h-64 p-4 bg-slate-900/50 border-2 border-slate-600 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-slate-400 transition-all"
              disabled={isGenerating}
            />
            
            <div className="absolute bottom-4 right-4 flex items-center space-x-3">
              <span className="text-xs text-slate-400">
                {script.length}/5000 characters
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(script)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={analyzeScript}
                disabled={!script.trim() || isAnalyzing || isGenerating}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wand2 className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing...' : 'AI Analyze'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-all">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
            </div>
            
            {script.length > 0 && (
              <div className="text-sm text-slate-400">
                {script.split(' ').length} words • ~{Math.ceil(script.split(' ').length / 150)} min
              </div>
            )}
          </div>

          {analysis && (
            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600">
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">AI Analysis Results</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Sentiment</div>
                  <div className="text-purple-400 font-bold text-lg">{analysis.sentiment}</div>
                </div>
                <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Complexity</div>
                  <div className="text-blue-400 font-bold text-lg">{analysis.complexity}</div>
                </div>
                <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Duration</div>
                  <div className="text-green-400 font-bold text-lg">{analysis.estimatedTime}</div>
                </div>
                <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Readability</div>
                  <div className="text-yellow-400 font-bold text-lg">{analysis.readability}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keyTopics.map((topic: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">AI Suggestions</h4>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-sm text-slate-400 flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}