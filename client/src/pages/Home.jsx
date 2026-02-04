import React, { useEffect, useState } from 'react';
import { getPortfolioData } from '../services/api';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Download } from 'lucide-react';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const result = await getPortfolioData();
            if (result) setData(result);
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return <div className="flex h-[80vh] items-center justify-center text-accent">Initialize System...</div>;
    if (!data) return <div className="text-center mt-20 text-red-500">System Error: Data Unavailable</div>;

    const { personalInfo, skills, projects } = data;

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mt-10">
                <motion.div
                    initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.6 }}
                    className="flex-1 space-y-6"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-code mb-2">
                        System Online
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Hello, I'm <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
                            {personalInfo.name}
                        </span>
                    </h1>
                    <h2 className="text-2xl text-gray-400">{personalInfo.title}</h2>
                    <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                        {personalInfo.summary}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-blue-600 rounded-lg text-black font-bold transition-all">
                            <Linkedin size={20} /> LinkedIn
                        </a>
                        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface/80 border border-white/10 rounded-lg transition-all">
                            <Github size={20} /> GitHub
                        </a>
                        <a href={personalInfo.resumeLink} className="flex items-center gap-2 px-6 py-3 bg-transparent border border-accent text-accent hover:bg-accent/10 rounded-lg transition-all">
                            <Download size={20} /> Resume
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-surface shadow-2xl relative z-10 glow-effect">
                        <img
                            src={personalInfo.profilePic || `https://ui-avatars.com/api/?name=${personalInfo.name.replace(' ', '+')}&background=0D8ABC&color=fff&size=512`}
                            alt={personalInfo.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-0"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-0"></div>
                </motion.div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="scroll-mt-24">
                <motion.h3
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-3xl font-bold mb-10 flex items-center gap-3"
                >
                    <span className="w-2 h-8 bg-accent rounded-full"></span>
                    Technical Protocol
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-6 hover:border-accent/50 transition-colors group"
                        >
                            <h4 className="text-xl font-bold mb-4 text-gray-200 group-hover:text-accent transition-colors">{skillGroup.category}</h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 rounded text-sm text-gray-300 border border-white/5">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="scroll-mt-24">
                <motion.h3
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-3xl font-bold mb-10 flex items-center gap-3"
                >
                    <span className="w-2 h-8 bg-secondary rounded-full"></span>
                    Deployed Projects
                </motion.h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-panel p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                            <p className="text-gray-400 mb-6">{project.description}</p>

                            <div className="mb-6">
                                <h5 className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-bold">Tech Stack</h5>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono text-accent">
                                            #{tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <a href={project.link} className="inline-flex items-center text-sm font-bold text-white hover:text-accent transition-colors">
                                View Deployment &rarr;
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="pb-20 scroll-mt-24">
                <div className="glass-panel p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-purple-500 to-accent"></div>

                    <h2 className="text-4xl font-bold mb-6">Initialize Communication</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Whether you have a question, a project opportunity, or just want to say hello, my inbox is always open.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-gray-300">
                        <div className="flex items-center gap-2">
                            <Mail className="text-accent" size={18} />
                            {personalInfo.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="text-accent" size={18} />
                            {personalInfo.phone}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="text-accent" size={18} />
                            {personalInfo.location}
                        </div>
                    </div>

                    <a href={`mailto:${personalInfo.email}`} className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors inline-block">
                        Send Message
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
