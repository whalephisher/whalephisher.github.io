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

// CTF Challenge Utility - SHA-256 Based Validation
const validateCTFSolution = async (userInput, expectedHash) => {
    try {
        // Convert user input to lowercase and trim whitespace
        const cleanInput = userInput.toLowerCase().trim();

        // Create SHA-256 hash of user input
        const encoder = new TextEncoder();
        const data = encoder.encode(cleanInput);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        // Convert hash to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // Compare with expected hash
        return hashHex === expectedHash;
    } catch (error) {
        console.error('CTF validation error:', error);
        return false;
    }
};

export const experienceData = {
    topLabel: "Present",
    bottomLabel: "2018",
    // CTF Challenge configuration
    ctfChallenge: {
        // SHA-256 hash of the correct solution (lowercase)
        solutionHash: "4c28b4c2597d7488376da70b90e693ffee4a3187209370ee7985e50776fd29a6",
        cipher: "YXJ5eXNmYW4=", // Display cipher 
        hint: "This looks like Base64... but there might be another layer. Think about simple ciphers used in CTFs. What comes after decoding?",

        // Validation function
        async validate(userInput) {
            return await validateCTFSolution(userInput, this.solutionHash);
        }
    },
    items: [
        {
            id: "freelance-web-dev",
            title: "Freelance Web Designer & Developer",
            period: "April 2020 - Present",
            current: true,
            description: {
                responsibilities: [
                    "Designed and developed custom websites tailored to client branding and business needs",
                    "Advised clients on UI/UX best practices to improve usability, navigation, and customer engagement",
                    "Built responsive web applications using HTML, CSS, JavaScript, and React, ensuring cross-platform performance",
                    "Collaborated with clients to translate ideas into functional, user-friendly designs"
                ]
            }
        },
        {
            id: "freelance-painter",
            title: "Freelance Painter & Electrician",
            period: "August 2024 - Present",
            current: true,
            description: {
                responsibilities: [
                    "Renovated a historic sugar plantation repurposed into a private school, contributing to preservation and modernization efforts",
                    "Performed interior and exterior spray painting of walls, ceilings, and roofing to restore and protect surfaces",
                    "Installed and replaced ceiling fans, light fixtures, outlets, and switches to meet updated electrical code standards",
                    "Rewired circuits to ensure safety, compliance, and improved functionality",
                    "Refurbished recreational areas by repainting basketball and volleyball courts, including detailed line work",
                    "Applied tar and surface treatments to repair and smooth concrete structures"
                ]
            }
        },
        {
            id: "freelance-guitarist",
            title: "Freelance Guitarist",
            period: "September 2013 - Present",
            current: true,
            description: {
                responsibilities: [
                    "Performed acoustic and electric guitar at live events, church services, and private gatherings, consistently engaging audiences of 200+ attendees",
                    "Delivered both solo and full-band performances, demonstrating versatility across settings",
                    "Utilized professional equipment including IEMs, effects processors, and click tracks to ensure high-quality sound",
                    "Adapted quickly to spontaneous song requests and diverse musical styles in live environments",
                    "Maintained a steady performance schedule, playing for audiences at least four times monthly"
                ]
            }
        },
        {
            id: "data-engineer-bayer",
            title: "Data Engineer at Bayer Crop Science",
            period: "February 2025 - Present",
            current: true,
            description: {
                responsibilities: [
                    "Built and optimized ETL pipelines in SQL Server, BigQuery, and Microsoft Fabric, integrating multi-source datasets into scalable models and reducing processing time by 40%+",
                    "Designed and implemented complex data models and transformations in Power BI/SQL, leveraging advanced DAX, query optimization, and relational modeling at scale",
                    "Developed custom APIs and low-code integrations connecting enterprise systems with mobile apps for real-time data capture and synchronization",
                    "Created internal web tools with React, FastAPI, and AG Grid for spreadsheet-like editing with role-based access control and SQL read/write support",
                    "Standardized engineering practices with GitHub version control, CI/CD pipelines, and modular code design to improve maintainability and collaboration"
                ]
            }
        },
        {
            id: "cyber-ops-army",
            title: "Cyber Operations Specialist (17C20) at U.S. Army",
            period: "August 2021 - April 2025",
            current: false,
            subtitles: [
                "Cyberspace Capabilities Developer",
                "Unit Training Manager",
                "Digital Network Exploitation Analyst"
            ],
            description: {
                roles: [
                    {
                        title: "Cyberspace Capabilities Developer",
                        period: "August 2021 – April 2025",
                        responsibilities: [
                            "Served on a Cyber Combat Mission Team (CMT) under Joint Force Headquarters–Cyber Navy in support of NSA, USCYBERCOM, INDOPACOM, and USFK objectives",
                            "Engineered and maintained cyberspace software capabilities focused on secure system design, vulnerability analysis, and computer network exploitation (CNE)",
                            "Developed and enhanced custom cyber tools to support offensive cyberspace operations (OCO), directly strengthening mission readiness",
                            "Conducted research and prototyping to close capability gaps, integrating new techniques into operational toolkits",
                            "Delivered advanced cyber capabilities that contributed to the effectiveness of Army and Joint operations worldwide"
                        ]
                    },
                    {
                        title: "Unit Training Manager",
                        period: "September 2023 – April 2025",
                        responsibilities: [
                            "Conducted performance analyses to identify training needs, improving mission readiness and efficiency",
                            "Oversaw documentation of training records, certifications, and progression for 80+ personnel",
                            "Liaised with higher commands to report readiness status, coordinate operations, and ensure accountability",
                            "Mentored and coached junior soldiers, fostering professional growth and technical competency"
                        ]
                    },
                    {
                        title: "Digital Network Exploitation Analyst",
                        period: "November 2022 – February 2023",
                        responsibilities: [
                            "Supported CMT organizational assessments by enhancing exploitation capabilities during high-stakes evaluations",
                            "Performed all-source analysis to identify and evaluate target opportunities, mapping and exploiting foreign networks",
                            "Designed and executed exploitation and operations plans, ensuring precise, effective cyber missions",
                            "Analyzed SIGINT and cybersecurity data across the OSI model, with emphasis on IP core infrastructure, routers, and traffic flows",
                            "Produced actionable intelligence that expanded understanding of target network vulnerabilities and strengthened operational outcomes"
                        ]
                    }
                ]
            }
        },
        {
            id: "data-analyst-intern-bayer",
            title: "Data Analyst Intern at Bayer Crop Science",
            period: "September 2024 - December 2024",
            current: false,
            description: {
                responsibilities: [
                    "Developed advanced Power BI dashboards to streamline water usage recommendations, track data quality, digitize preseason planning, and analyze field spray programs, utilizing tools like DAX, Power Query, and SQL for dynamic, actionable insights",
                    "Automated manual processes by creating user-friendly apps and dashboards, such as digitizing Lockout/Tagout compliance and revamping Long-Range Plans into live data-driven visualizations, improving operational efficiency",
                    "Resolved technical challenges by troubleshooting SharePoint and PowerApps errors, enhancing app functionality, and ensuring seamless data integrations across multiple platforms",
                    "Integrated and visualized complex datasets from various sources, enabling stakeholders to make data-driven decisions with interactive filters, calculated measures, and live updates for real-time insights"
                ]
            }
        },
        {
            id: "mover-adams",
            title: "Mover at Adams Moving & Delivery Service",
            period: "June 2020 – August 2020",
            current: false,
            description: {
                responsibilities: [
                    "Assisted customers in smoothly moving furniture and boxes into moving trucks",
                    "Packaged, prepared, and staged customer’s belongings into a truck or at customer desired locations",
                    "Received multiple excellent reviews to management from customers about job performance"
                ]
            }

        },
        {
            id: "admissions-space-needle",
            title: "Admissions Agent at Seattle Space Needle",
            period: "May 2019 – August 2019",
            current: false,
            description: {
                responsibilities: [
                    "Worked in different areas such as the ticket booth, admissions, ushering, plaza, and security ",
                    "Sold over 1,500+ tickets daily at the ticket booth, ensured all ticket kiosks worked properly, and refilled all the tickets",
                    "Guided large groups of people, directed lines, and reinforced security measures",
                    "Interacted with the daily visitors and answered their questions",
                    "Provided support to the other coworkers during busy hours for smooth and efficient service",
                    "Surveyed guests and collected data to help supervisors understand how to optimize resources for smooth operations"
                ]
            }
        },
        {
            id: "logistics-nordstrom",
            title: "Logistics Processor at Nordstrom",
            period: "December 2018 - January 2019",
            current: false,
            description: {
                responsibilities: [
                    "Responsible for picking up, quality checking, and packaging all shipment orders to customers, retail stores, or the Nordstrom distribution center",
                    "Facilitated collaboration between managers, shipping employees, and coworkers on where items should be placed and when certain items needed to go for shipping",
                    "Assisted the manager by taking on additional responsibilities beyond my scope of work"
                ]
            }
        },
        {
            id: "kitchen-panda",
            title: "Kitchen Help at Panda Express",
            period: "April 2018 - September 2018",
            current: false,
            description: {
                responsibilities: [
                    "Worked mainly as a cook and washed dishes",
                    "Assisted in teaching new cooks, and helped managers recruit new employees",
                    "Helped out as a cashier occasionally, and counted the money after work"
                ]
            }
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