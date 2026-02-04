import React, { useEffect, useState } from 'react';
import { getPortfolioData, updatePortfolioData } from '../services/api';
import { Save, User, Code, Briefcase, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SkillsEditor from '../components/SkillsEditor';
import ProjectsEditor from '../components/ProjectsEditor';

const Admin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal'); // personal, skills, projects
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await getPortfolioData();
        if (result) setData(result);
        setLoading(false);
    };

    const handleSave = async () => {
        setSaveStatus('Saving...');
        try {
            const token = localStorage.getItem('token');
            await updatePortfolioData(data, token);
            setSaveStatus('Saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            setSaveStatus('Error saving data');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleChange = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSkillsChange = (updatedSkills) => {
        setData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const handleProjectsChange = (updatedProjects) => {
        setData(prev => ({ ...prev, projects: updatedProjects }));
    };

    if (loading) return <div className="p-10 text-center text-white">Loading Admin Panel...</div>;

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <User size={18} /> },
        { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
        { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
    ];

    return (
        <div className="flex min-h-screen bg-prime">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-white/5 p-6 hidden md:block">
                <div className="text-xl font-bold mb-10 text-white">Admin Control</div>
                <div className="space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === tab.id ? 'bg-accent text-black font-medium' : 'text-gray-400 hover:bg-white/5'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-20 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-white">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h1>
                    <div className="flex items-center gap-4">
                        {saveStatus && <span className="text-green-400 text-sm">{saveStatus}</span>}
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2 bg-accent text-black font-bold rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </header>

                <div className="glass-panel p-8 max-w-5xl mx-auto">
                    {activeTab === 'personal' && (
                        <div className="space-y-8">
                            {/* Profile Picture Section */}
                            <div className="flex items-start gap-8 p-6 bg-surface/50 rounded-xl border border-white/5">
                                <div className="relative group shrink-0">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10">
                                        <img
                                            src={data.personalInfo.profilePic || 'https://via.placeholder.com/150'}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Profile Picture</label>

                                    {/* File Input (Hidden) */}
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;

                                            setSaveStatus('Uploading...');
                                            const { uploadFile } = await import('../services/api');
                                            const result = await uploadFile(file);

                                            if (result && result.success) {
                                                handleChange('personalInfo', 'profilePic', result.fileUrl);
                                                setSaveStatus('Image uploaded!');
                                                setTimeout(() => setSaveStatus(''), 3000);
                                            } else {
                                                setSaveStatus('Upload failed');
                                            }
                                        }}
                                    />

                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={data.personalInfo.profilePic || ''}
                                            readOnly
                                            disabled
                                            className="flex-1 bg-prime/50 border border-white/5 rounded p-3 text-gray-500 cursor-not-allowed outline-none"
                                            placeholder="No image uploaded"
                                        />
                                        <button
                                            onClick={() => document.getElementById('fileInput').click()}
                                            className="bg-accent text-black px-4 rounded font-bold hover:bg-blue-600 transition-colors"
                                        >
                                            Upload New
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Local upload only. Image will be saved to the database.</p>
                                </div>
                            </div>

                            {/* Resume Upload Section */}
                            <div className="p-6 bg-surface/50 rounded-xl border border-white/5">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Resume (PDF)</label>
                                <input
                                    type="file"
                                    id="resumeInput"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        setSaveStatus('Uploading Resume...');
                                        const { uploadFile } = await import('../services/api');
                                        const result = await uploadFile(file);

                                        if (result && result.success) {
                                            handleChange('personalInfo', 'resumeLink', result.fileUrl);
                                            setSaveStatus('Resume uploaded!');
                                            setTimeout(() => setSaveStatus(''), 3000);
                                        } else {
                                            setSaveStatus('Upload failed');
                                        }
                                    }}
                                />
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={data.personalInfo.resumeLink || ''}
                                        readOnly
                                        disabled
                                        className="flex-1 bg-prime/50 border border-white/5 rounded p-3 text-gray-500 cursor-not-allowed outline-none"
                                        placeholder="No resume uploaded"
                                    />
                                    <button
                                        onClick={() => document.getElementById('resumeInput').click()}
                                        className="bg-accent text-black px-4 rounded font-bold hover:bg-blue-600 transition-colors"
                                    >
                                        Upload PDF
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">Upload a PDF file. Use the "Resume" button on the home page to test.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(data.personalInfo).map(([key, value]) => {
                                    if (key === 'profilePic' || key === 'resumeLink') return null; // Handled above

                                    return (
                                        <div key={key} className={key === 'summary' ? 'md:col-span-2' : ''}>
                                            <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            {key === 'summary' ? (
                                                <textarea
                                                    value={value}
                                                    onChange={(e) => handleChange('personalInfo', key, e.target.value)}
                                                    rows={4}
                                                    className="w-full bg-prime border border-white/10 rounded p-3 text-white focus:border-accent outline-none"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => handleChange('personalInfo', key, e.target.value)}
                                                    className="w-full bg-prime border border-white/10 rounded p-3 text-white focus:border-accent outline-none"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <SkillsEditor skills={data.skills} onChange={handleSkillsChange} />
                    )}

                    {activeTab === 'projects' && (
                        <ProjectsEditor projects={data.projects} onChange={handleProjectsChange} />
                    )}
                </div>
            </main >
        </div >
    );
};

export default Admin;
