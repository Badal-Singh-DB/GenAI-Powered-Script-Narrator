import React from 'react';
import { FileText, BarChart3, Folder, Settings, Zap, Users } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'editor', label: 'Script Editor', icon: FileText },
  { id: 'dashboard', label: 'Projects', icon: Folder },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'collaborate', label: 'Collaborate', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800/30 backdrop-blur-xl border-r border-purple-500/20 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30">
            <Zap className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Pro Plan</span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white border border-purple-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="mt-8 p-4 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600">
          <h3 className="text-sm font-semibold text-white mb-2">Usage This Month</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Voice Generation</span>
              <span className="text-purple-400">847/1000</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '84.7%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}