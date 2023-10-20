import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export function useProject() {
  return useContext(ProjectContext);
}

export function ProjectProvider({ children }) {
  const [projectId, setProjectId] = useState(null);
  const [mesureProjectId, setMesureProjectId] = useState(null);

  const setProject = (id) => {
    setProjectId(id);
  };

  const setMesureProject = (id) => {
    setMesureProjectId(id);
  };

  return (
    <ProjectContext.Provider value={{ projectId, setProject, mesureProjectId, setMesureProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
