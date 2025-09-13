import React from 'react';
import { Mic, Sparkles, Settings, User, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-800/50 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ScriptNarrator Pro
              </h1>
              <p className="text-sm text-slate-400">
                AI-Powered Voice Generation Studio
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                GPT-4 Powered
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}