import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Code, Mail } from 'lucide-react';
import { getPortfolioData } from '../services/api';

const Layout = () => {
    const location = useLocation();
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await getPortfolioData();
            if (data?.personalInfo?.profilePic) {
                setProfilePic(data.personalInfo.profilePic);
            }
        };
        loadData();
    }, []);

    // Handle scroll to anchor
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    const navItems = [
        { name: 'Home', path: '/', icon: <Terminal size={18} /> },
        { name: 'Technical Protocol', path: '/#skills', icon: <Code size={18} /> },
        { name: 'Deployed Projects', path: '/#projects', icon: <Terminal size={18} /> },
        { name: 'Initialize Communication', path: '/#contact', icon: <Mail size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-prime text-white font-sans selection:bg-accent selection:text-black">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10 rounded-none h-16 flex items-center justify-between px-6 lg:px-12">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    {profilePic ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-accent object-cover shadow-lg shadow-accent/20"
                            />
                            <span className="font-bold text-lg tracking-tight hidden sm:block">RAJ <span className="text-accent">RANJAN</span></span>
                        </div>
                    ) : (
                        <div className="text-xl font-bold tracking-tighter text-accent flex items-center gap-2">
                            <Code className="text-secondary" />
                            <span>RAJ <span className="text-white">RANJAN</span></span>
                        </div>
                    )}
                </Link>

                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent ${location.pathname === item.path ? 'text-accent' : 'text-gray-400'
                                }`}
                        >
                            {item.icon}
                            <span className="hidden md:block">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-600 text-sm border-t border-white/5">
                <p>© {new Date().getFullYear()} Raj Ranjan. Built with MERN.</p>
            </footer>
        </div>
    );
};

export default Layout;
