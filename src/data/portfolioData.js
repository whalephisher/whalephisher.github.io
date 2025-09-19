// Portfolio data extracted from original HTML

export const profileData = {
    name: "Gabriel Liau",
    title: "Creative Developer & Designer",
    description: "Building immersive digital experiences with code, color, and motion.",
    profileImage: "/profile.png",
    typewriterText: "Creative technologist, designer, and builder. I blend code, color, and motion to craft immersive digital experiences."
};

export const navigationData = {
    logo: "Whalephisher",
    links: [
        { href: "#work", label: "Work" },
        { href: "#about", label: "About" }
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

export const skillsData = [
    "Python", "Java", "JavaScript", "SQL", "C/C++", "Bash", "PowerShell",
    "HTML/CSS", "React.js", "Django", "FastAPI", "AG Grid", "Power Apps",
    "Pandas", "SQLAlchemy", "Docker", "Git/GitHub", "GitHub Actions (CI/CD)",
    "Unit Testing (PyTest)", "Agile/Scrum", "ETL/ELT Pipelines",
    "Data Modeling & Warehousing", "BigQuery", "SQL Server", "PostgreSQL",
    "MySQL", "MongoDB", "Power BI (DAX, Power Query)", "Tableau", "Excel",
    "Data Visualization", "Secure Coding Practices", "Vulnerability Analysis",
    "Wireshark", "Metasploit", "Nmap", "Ghidra", "IDA Pro", "Linux/Unix Systems"
];

export const educationData = [
    "Computer Information Systems B.S. (ASU, 2021)",
    "Cyber Common Technical Core (US Army, 2021-2022)",
    "Basic Leader Course (US Army NCO Academy Hawaii, 2023)",
    "CompTIA Security+ ce (2023)",
    "Google Project Management Professional Certificate (2024)",
    "IBM Data Analyst Professional Certificate (2024)",
    "CompTIA A+ ce (2024)"
];

export const interestsData = [
    "Tech Innovation", "Acoustic Guitar", "Electric Guitar", "Hiking",
    "Running", "Snorkeling", "Basketball", "Football", "Spikeball",
    "Pickleball", "Video Editing", "Traveling"
];

export const portfolioData = [
    {
        id: 1,
        title: "Chordex",
        description: "Built an interactive React + TypeScript app with chord recognition, reverse chord lookup, capo transposition, and progression assistance. Designed a responsive UI for cross-device learning with clean visualization.",
        image: "/chordex.png",
        technologies: ["React", "TypeScript", "CSS"]
    },
    {
        id: 2,
        title: "Text Editor",
        description: "Developed a Node.js + WebSocket editor with Monaco integration for syntax highlighting, tab support, and auto language detection. Added multi-file upload/download and live sync across devices with a streamlined UI.",
        technologies: ["Node.js", "WebSocket", "Monaco Editor"]
    }
];