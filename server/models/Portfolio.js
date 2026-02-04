const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    personalInfo: {
        name: String,
        profilePic: String,
        title: String,
        email: String,
        phone: String,
        location: String,
        summary: String,
        linkedin: String,
        github: String,
        website: String,
        resumeLink: String
    },
    skills: [{
        category: String,
        items: [String]
    }],
    projects: [{
        id: Number,
        title: String,
        description: String,
        techStack: [String],
        link: String
    }],
    socials: [{
        platform: String,
        url: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
