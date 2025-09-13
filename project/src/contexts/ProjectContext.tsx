import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: string;
  name: string;
  script: string;
  tone: string;
  voice: string;
  settings: any;
  audioUrl?: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'processing' | 'completed' | 'error';
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      createProject,
      updateProject,
      deleteProject,
      setCurrentProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}