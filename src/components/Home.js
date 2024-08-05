// Home.js

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import KanbanBoard from '../components/Tasks/TaskBoard';
import ProjectForm from '../components/Tasks/ProjectForm';
import ProfileForm from '../components/Profile/ProfileForm';

const Home = () => {
  const { token, logout } = useAuth();  // Ensure token is destructured correctly
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Fetch user projects
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    fetchProjects();
  }, [token]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const openProjectForm = () => {
    setIsProjectFormOpen(true);
  };

  const openProfileForm = () => {
    setIsProfileOpen(true);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="flex h-screen">
      <aside className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <div className="text-2xl font-bold">Task Management App</div>
          <div className="text-xl mt-2">Project XYZ</div>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={openProjectForm}>Create New Project</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setIsProfileOpen(false)}>My Projects</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={openProfileForm}>Update Profile</li>
          </ul>
        </nav>
      </aside>
      <div className={`flex-1 bg-gray-100 p-8 ${isNavOpen ? 'ml-64' : ''} transition-all duration-300 ease-in-out`}>
        <header className="flex justify-between items-center mb-8">
          <button className="text-xl font-bold" onClick={toggleNav}>
            ☰ Task Management App
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={logout}>Logout</button>
        </header>
        <main>
          {projects.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="border-4 border-dotted border-gray-300 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
                <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={openProjectForm}>Create New Project</button>
              </div>
            </div>
          ) : (
            <KanbanBoard projects={projects} onProjectSelect={handleProjectSelect} />
          )}
        </main>
      </div>
      {isProjectFormOpen && <ProjectForm onClose={() => setIsProjectFormOpen(false)} />}
      {isProfileOpen && <ProfileForm onClose={() => setIsProfileOpen(false)} />}
    </div>
  );
};

export default Home;