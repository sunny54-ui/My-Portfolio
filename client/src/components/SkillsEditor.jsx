import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const SkillsEditor = ({ skills, onChange }) => {
    const [newCategory, setNewCategory] = useState('');
    const [newSkill, setNewSkill] = useState('');
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

    const handleAddCategory = () => {
        if (!newCategory.trim()) return;
        const updatedSkills = [...skills, { category: newCategory, items: [] }];
        onChange(updatedSkills);
        setNewCategory('');
    };

    const handleRemoveCategory = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        onChange(updatedSkills);
        if (activeCategoryIndex === index) setActiveCategoryIndex(null);
    };

    const handleAddSkill = (catIndex) => {
        if (!newSkill.trim()) return;
        const updatedSkills = [...skills];
        updatedSkills[catIndex].items.push(newSkill);
        onChange(updatedSkills);
        setNewSkill('');
    };

    const handleRemoveSkill = (catIndex, skillIndex) => {
        const updatedSkills = [...skills];
        updatedSkills[catIndex].items = updatedSkills[catIndex].items.filter((_, i) => i !== skillIndex);
        onChange(updatedSkills);
    };

    return (
        <div className="space-y-8">
            {/* Category List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((cat, index) => (
                    <div key={index} className="bg-surface border border-white/5 rounded-xl p-5 relative group">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-white">{cat.category}</h3>
                            <button
                                onClick={() => handleRemoveCategory(index)}
                                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {cat.items.map((skill, sIndex) => (
                                <span key={sIndex} className="bg-prime px-3 py-1 rounded-full text-sm text-gray-300 flex items-center gap-2 border border-white/5">
                                    {skill}
                                    <button
                                        onClick={() => handleRemoveSkill(index, sIndex)}
                                        className="hover:text-red-400"
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add skill..."
                                className="flex-1 bg-prime border border-white/10 rounded px-2 py-1 text-sm text-white focus:border-accent outline-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setNewSkill(e.target.value);
                                        handleAddSkill(index);
                                        e.target.value = '';
                                    }
                                }}
                                onChange={(e) => setNewSkill(e.target.value)}
                            />
                            <button
                                onClick={() => handleAddSkill(index)}
                                className="bg-white/10 hover:bg-accent hover:text-black p-1 rounded transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Category Card */}
                <div className="border border-dashed border-white/10 rounded-xl p-5 flex flex-col justify-center items-center min-h-[200px] text-gray-500 hover:border-accent/50 hover:bg-white/5 transition-all">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category Name"
                        className="bg-transparent text-center border-b border-white/10 pb-2 mb-4 focus:border-accent outline-none text-white placeholder-gray-600 w-full"
                    />
                    <button
                        onClick={handleAddCategory}
                        disabled={!newCategory.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-black font-bold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus size={18} /> Add Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillsEditor;
