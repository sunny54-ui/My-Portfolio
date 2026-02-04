import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Github, ExternalLink } from 'lucide-react';

const ProjectsEditor = ({ projects, onChange }) => {
    const [editingProject, setEditingProject] = useState(null); // null = list view, object = edit view (empty id for new)

    const handleSaveProject = (project) => {
        let updatedProjects;
        if (project.id) {
            // Update existing
            updatedProjects = projects.map(p => p.id === project.id ? project : p);
        } else {
            // Add new
            const newId = Math.max(...projects.map(p => p.id), 0) + 1;
            updatedProjects = [...projects, { ...project, id: newId }];
        }
        onChange(updatedProjects);
        setEditingProject(null);
    };

    const handleDeleteProject = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            onChange(projects.filter(p => p.id !== id));
        }
    };

    return (
        <div>
            {editingProject ? (
                <ProjectForm
                    initialData={editingProject}
                    onSave={handleSaveProject}
                    onCancel={() => setEditingProject(null)}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-surface border border-white/5 rounded-xl overflow-hidden group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingProject(project)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded bg-prime border border-white/5 text-gray-500">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => setEditingProject({ title: '', description: '', techStack: [], link: '', github: '' })}
                        className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col justify-center items-center min-h-[200px] text-gray-500 hover:border-accent/50 hover:bg-white/5 transition-all"
                    >
                        <Plus size={32} className="mb-2" />
                        <span className="font-medium">Add New Project</span>
                    </button>
                </div>
            )}
        </div>
    );
};

const ProjectForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData);
    const [newTech, setNewTech] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTech = () => {
        if (!newTech.trim()) return;
        setFormData(prev => ({ ...prev, techStack: [...(prev.techStack || []), newTech.trim()] }));
        setNewTech('');
    };

    const handleRemoveTech = (index) => {
        setFormData(prev => ({ ...prev, techStack: prev.techStack.filter((_, i) => i !== index) }));
    };

    return (
        <div className="bg-surface border border-white/5 rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
                {initialData.id ? 'Edit Project' : 'New Project'}
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Project Title</label>
                    <input
                        className="w-full bg-prime border border-white/10 rounded p-3 text-white focus:border-accent outline-none"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. E-Commerce Platform"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <textarea
                        className="w-full bg-prime border border-white/10 rounded p-3 text-white focus:border-accent outline-none"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Describe the project..."
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Tech Stack</label>
                    <div className="flex gap-2 mb-3">
                        <input
                            className="flex-1 bg-prime border border-white/10 rounded p-2 text-sm text-white focus:border-accent outline-none"
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                            placeholder="Add technology..."
                        />
                        <button
                            type="button"
                            onClick={handleAddTech}
                            className="bg-accent text-black px-4 rounded font-bold hover:bg-blue-600 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.techStack?.map((tech, i) => (
                            <span key={i} className="bg-prime px-3 py-1 rounded-full text-sm text-gray-300 flex items-center gap-2 border border-white/5">
                                {tech}
                                <button type="button" onClick={() => handleRemoveTech(i)} className="hover:text-red-400">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Project Link (Demo)</label>
                        <input
                            className="w-full bg-prime border border-white/10 rounded p-3 text-white focus:border-accent outline-none"
                            value={formData.link} // Note: JSON uses 'link' 
                            onChange={(e) => handleChange('link', e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">GitHub Repo (Optional)</label>
                        <input
                            className="w-full bg-prime border border-white/10 rounded p-3 text-white focus:border-accent outline-none"
                            value={formData.github || ''} // Handle if field doesn't exist yet
                            onChange={(e) => handleChange('github', e.target.value)}
                            placeholder="https://github.com/..."
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="px-6 py-2 bg-accent text-black font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Save Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsEditor;
