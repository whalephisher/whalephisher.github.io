// Portfolio data extracted from original HTML

export const profileData = {
    name: "Gabriel Liau",
    title: "Data Engineer & Developer",
    description: "I build stuff with code and data.",
    profileImage: "/profile.png",
    typewriterText: "Data engineer and developer who likes solving problems with code. I spent some time in the military doing cyber stuff, and now I build data pipelines and web apps. I'm into making things that actually work and help people get things done."
};

export const navigationData = {
    logo: "Whalephisher",
    links: [
        { href: "#about", label: "About" },
        { href: "#work", label: "Projects" }
    ],
    socialLinks: [
        { href: "https://www.youtube.com/@HeadbandTrekker", icon: "/youtube.svg", alt: "YouTube" },
        { href: "https://github.com/whalephisher/", icon: "/github.svg", alt: "GitHub" },
        { href: "https://www.linkedin.com/in/gabriel-liau/", icon: "/linkedin.svg", alt: "LinkedIn" }
    ]
};

export const aboutData = {
    tabs: [
        {
            id: "experience",
            label: "Experience",
            icon: "💼"
        },
        {
            id: "skills",
            label: "Skills",
            icon: "🛠️"
        },
        {
            id: "education",
            label: "Education",
            icon: "🎓"
        },
        {
            id: "interests",
            label: "Interests",
            icon: "✨"
        }
    ]
};

export const experienceData = {
    topLabel: "Present",
    bottomLabel: "2018",
    items: [
        {
            title: "Freelance Web Designer & Developer",
            current: true
        },
        {
            title: "Freelance Painter and Electrician",
            current: true
        },
        {
            title: "Freelance Guitarist",
            current: true
        },
        {
            title: "Data Engineer at Bayer Crop Science",
            current: true
        },
        {
            title: "Cyber Operations Specialist (17C20) at U.S. Army",
            current: false,
            subtitles: [
                "Cyberspace Capabilities Developer",
                "Unit Training Manager",
                "Digital Network Exploitation Analyst"
            ]
        },
        {
            title: "Data Analyst Intern at Bayer Crop Science",
            current: false
        },
        {
            title: "Mover at Adams Moving & Delivery Service",
            current: false
        },
        {
            title: "Admissions Agent at Seattle Space Needle",
            current: false
        },
        {
            title: "Logistics Processor at Nordstrom",
            current: false
        },
        {
            title: "Kitchen Help at Panda Express",
            current: false
        }
    ]
};

export const skillsData = {
    "Programming Languages": {
        icon: "💻",
        color: "rgba(102, 126, 234, 0.3)",
        skills: ["Python", "Java", "JavaScript", "SQL", "C/C++", "Bash", "PowerShell"]
    },
    "Web Development": {
        icon: "🌐",
        color: "rgba(34, 197, 94, 0.3)",
        skills: ["HTML/CSS", "React.js", "Django", "FastAPI", "AG Grid", "Power Apps"]
    },
    "Data & Analytics": {
        icon: "📊",
        color: "rgba(251, 146, 60, 0.3)",
        skills: ["Pandas", "SQLAlchemy", "ETL/ELT Pipelines", "Data Modeling & Warehousing", "BigQuery", "SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Power BI (DAX, Power Query)", "Tableau", "Excel", "Data Visualization"]
    },
    "DevOps & Tools": {
        icon: "🔧",
        color: "rgba(139, 69, 19, 0.3)",
        skills: ["Docker", "Git/GitHub", "GitHub Actions (CI/CD)", "Unit Testing (PyTest)", "Agile/Scrum"]
    },
    "Security & Systems": {
        icon: "🔒",
        color: "rgba(239, 68, 68, 0.3)",
        skills: ["Secure Coding Practices", "Vulnerability Analysis", "Wireshark", "Metasploit", "Nmap", "Ghidra", "IDA Pro", "Linux/Unix Systems"]
    }
};

export const educationData = {
    degree: {
        title: "Academic Degree",
        icon: "🎓",
        color: "#FFD700",
        items: [
            {
                title: "Bachelor of Science in Computer Information Systems",
                institution: "Arizona State University",
                year: "2021",
                details: "Focus on software development, database management, and systems analysis"
            }
        ]
    },
    certifications: {
        title: "Professional Certifications",
        icon: "🏆",
        color: "#FF6B6B",
        items: [
            {
                title: "CompTIA Security+ ce",
                institution: "CompTIA",
                year: "2023",
                details: "Cybersecurity fundamentals and best practices"
            },
            {
                title: "CompTIA A+ ce",
                institution: "CompTIA",
                year: "2024",
                details: "Hardware and software troubleshooting"
            }
        ]
    },
    certificates: {
        title: "Professional Certificates",
        icon: "📜",
        color: "#3cbbb1",
        items: [
            {
                title: "Google Project Management Professional Certificate",
                institution: "Google",
                year: "2024",
                details: "Project planning, execution, and agile methodologies"
            },
            {
                title: "IBM Data Analyst Professional Certificate",
                institution: "IBM",
                year: "2024",
                details: "Data analysis, visualization, and statistical methods"
            }
        ]
    },
    military: {
        title: "Military Education",
        icon: "⭐",
        color: "#4ECDC4",
        items: [
            {
                title: "Cyber Common Technical Core",
                institution: "US Army",
                year: "2021-2022",
                details: "Advanced cybersecurity operations and network defense"
            },
            {
                title: "Basic Leader Course",
                institution: "US Army NCO Academy Hawaii",
                year: "2023",
                details: "Leadership development and military management"
            }
        ]
    }
};

export const interestsData = {
    "Tech & Creative": {
        icon: "💻",
        color: "rgba(102, 126, 234, 0.2)",
        interests: ["Tech Innovation", "Video Editing"]
    },
    "Music & Arts": {
        icon: "🎵",
        color: "rgba(139, 69, 19, 0.2)",
        interests: ["Acoustic Guitar", "Electric Guitar"]
    },
    "Outdoor & Adventure": {
        icon: "🏔️",
        color: "rgba(34, 197, 94, 0.2)",
        interests: ["Hiking", "Running", "Snorkeling", "Traveling"]
    },
    "Sports & Games": {
        icon: "⚽",
        color: "rgba(251, 146, 60, 0.2)",
        interests: ["Basketball", "Football", "Spikeball", "Pickleball"]
    }
};

export const portfolioData = [
    {
        id: 1,
        title: "Chordex",
        description: "Built an interactive React + TypeScript app with chord recognition, reverse chord lookup, capo transposition, and progression assistance. Designed a responsive UI for cross-device learning with clean visualization.",
        image: "/chordex.png",
        technologies: ["React", "TypeScript", "CSS"],
        link: "https://whalephisher.github.io/chordex-site/"
    },
    {
        id: 2,
        title: "Text Editor",
        description: "Developed a Node.js + WebSocket editor with Monaco integration for syntax highlighting, tab support, and auto language detection. Added multi-file upload/download and live sync across devices with a streamlined UI.",
        technologies: ["Node.js", "WebSocket", "Monaco Editor"],
        link: "https://github.com/whalephisher/texteditor"
    }
];