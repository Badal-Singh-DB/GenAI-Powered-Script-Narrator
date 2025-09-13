import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Play, Download, Trash2, Edit } from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    name: 'Corporate Training Module',
    script: 'Welcome to our comprehensive training program...',
    tone: 'Professional',
    voice: 'Sarah',
    duration: '3:45',
    createdAt: '2024-01-15',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Product Demo Narration',
    script: 'Discover the revolutionary features of our new...',
    tone: 'Friendly',
    voice: 'Alex',
    duration: '2:30',
    createdAt: '2024-01-14',
    status: 'processing'
  },
  {
    id: 3,
    name: 'Podcast Introduction',
    script: 'Welcome to Tech Talk, the podcast where we explore...',
    tone: 'Casual',
    voice: 'Michael',
    duration: '1:15',
    createdAt: '2024-01-13',
    status: 'completed'
  }
];

export function ProjectDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Project Dashboard</h1>
        <p className="text-slate-400">Manage your voice generation projects</p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{project.script}</p>
                </div>
                <button className="p-1 text-slate-400 hover:text-white transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tone:</span>
                  <span className="text-purple-400 font-medium">{project.tone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Voice:</span>
                  <span className="text-blue-400 font-medium">{project.voice}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-green-400 font-medium">{project.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-500">{project.createdAt}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : project.status === 'processing'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-all">
                  <Play className="h-3 w-3" />
                  <span>Play</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-all">
                  <Edit className="h-3 w-3" />
                  <span>Edit</span>
                </button>
                <button className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all">
                  <Download className="h-3 w-3" />
                </button>
                <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}