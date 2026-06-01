import React, { useState, useRef, useEffect, useCallback } from "react";
import { skillsData } from "../../data/portfolioData";
import "./Skills.css";

// Map category names to directory names
const categoryDirs = Object.fromEntries(
  Object.keys(skillsData).map((name) => [
    name.toLowerCase().replace(/\s+/g, "_").replace(/&/g, "and"),
    name,
  ])
);

// Skill descriptions for `cat` command
const skillDescriptions = {
  python: "High-level, general-purpose language. Primary tool for data engineering, ETL pipelines, and automation.",
  java: "Object-oriented language used for enterprise applications and backend services.",
  javascript: "Core web language. Used for React frontends, Node.js backends, and interactive UIs.",
  sql: "Standard query language for relational databases. Daily driver for data extraction and transformation.",
  "c/c++": "Low-level systems programming. Used in cybersecurity tooling and performance-critical code.",
  bash: "Unix shell scripting for automation, CI/CD pipelines, and system administration.",
  powershell: "Windows automation and scripting. Used for Active Directory management and DevOps tasks.",
  "html/css": "Core web markup and styling. Responsive layouts, animations, and modern CSS.",
  "react.js": "Component-based UI library. Building interactive single-page applications.",
  django: "Python web framework for full-stack applications with ORM and admin interface.",
  fastapi: "Modern Python API framework. Async-first, auto-documented REST APIs.",
  "ag_grid": "Enterprise data grid component for complex tabular data with sorting, filtering, and editing.",
  "power_apps": "Microsoft low-code platform for business applications.",
  pandas: "Python data manipulation library. DataFrames for cleaning, transforming, and analyzing datasets.",
  sqlalchemy: "Python SQL toolkit and ORM for database abstraction and query building.",
  "etl/elt_pipelines": "Extract, Transform, Load workflows. Designing data flows from source to warehouse.",
  "data_modeling_and_warehousing": "Designing star/snowflake schemas, dimensional models for analytics.",
  bigquery: "Google Cloud serverless data warehouse for petabyte-scale analytics.",
  "sql_server": "Microsoft relational database. T-SQL, SSIS, stored procedures.",
  postgresql: "Advanced open-source relational database with JSON support and extensions.",
  mysql: "Popular open-source RDBMS for web applications and data storage.",
  mongodb: "NoSQL document database for flexible schema and horizontal scaling.",
  "power_bi_(dax,_power_query)": "Microsoft BI tool. DAX measures, Power Query transforms, dashboard design.",
  tableau: "Visual analytics platform for interactive dashboards and data storytelling.",
  excel: "Advanced Excel: Power Query, pivot tables, VBA macros, complex formulas.",
  "data_visualization": "Principles of effective chart design, color theory, and visual communication.",
  docker: "Container platform for consistent dev/prod environments and microservices.",
  "git/github": "Version control, branching strategies, pull requests, and code review workflows.",
  "github_actions_(ci/cd)": "Automated build, test, and deploy pipelines with YAML workflows.",
  "unit_testing_(pytest)": "Python testing framework. Test-driven development and coverage reporting.",
  "agile/scrum": "Sprint planning, standups, retrospectives. Jira/Azure DevOps boards.",
  "secure_coding_practices": "OWASP Top 10, input validation, authentication/authorization patterns.",
  "vulnerability_analysis": "Identifying and classifying security weaknesses in systems and code.",
  wireshark: "Network protocol analyzer for packet capture and traffic analysis.",
  metasploit: "Penetration testing framework for exploit development and security auditing.",
  nmap: "Network scanner for host discovery, port scanning, and service detection.",
  ghidra: "NSA reverse engineering tool for binary analysis and malware dissection.",
  "ida_pro": "Interactive disassembler for reverse engineering compiled binaries.",
  "linux/unix_systems": "System administration, kernel concepts, package management, shell scripting.",
};

const Skills = () => {
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Get all skill filenames for the current or specified category
  const getSkillFiles = (dirName) => {
    const catName = categoryDirs[dirName];
    if (!catName) return [];
    return skillsData[catName].skills.map((s) => s.toLowerCase().replace(/\s+/g, "_"));
  };

  // Get all directory names
  const getDirNames = () => Object.keys(categoryDirs);

  // Auto-run help on mount when visible
  useEffect(() => {
    if (isVisible && history.length === 0) {
      setHistory([
        { type: "output", content: getWelcome() },
        { type: "command", dir: "~", text: "help" },
        { type: "output", content: generateHelp() },
      ]);
    }
  }, [isVisible]);

  // Observe visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to bottom of terminal body after every history change
  useEffect(() => {
    const body = terminalBodyRef.current;
    if (body) {
      requestAnimationFrame(() => {
        body.scrollTop = body.scrollHeight;
      });
    }
  }, [history]);

  // Focus input on click anywhere in terminal
  const focusInput = () => inputRef.current?.focus();

  const getWelcome = () => (
    <div className="term-welcome">
      <span className="term-green">Welcome to Gabriel's Skills Terminal</span>
      <br />
      <span className="term-dim">Type <span className="term-yellow">help</span> for available commands. Use <span className="term-yellow">Tab</span> for autocomplete.</span>
    </div>
  );

  const generateHelp = () => (
    <div className="term-help">
      <span className="term-bold term-green">Available commands:</span>
      <br /><br />
      <span className="term-yellow">  ls [dir]</span>     <span className="term-dim">- List categories, or skills in a directory</span><br />
      <span className="term-yellow">  cd &lt;dir&gt;</span>    <span className="term-dim">- Navigate into a category (cd .. to go back)</span><br />
      <span className="term-yellow">  cat &lt;skill&gt;</span>  <span className="term-dim">- View details about a specific skill</span><br />
      <span className="term-yellow">  htop</span>         <span className="term-dim">- Display skills overview (htop-style)</span><br />
      <span className="term-yellow">  pwd</span>          <span className="term-dim">- Print current directory</span><br />
      <span className="term-yellow">  clear</span>        <span className="term-dim">- Clear terminal</span><br />
      <span className="term-yellow">  whoami</span>       <span className="term-dim">- Display user info</span><br />
      <span className="term-yellow">  help</span>         <span className="term-dim">- Show this message</span><br />
      <br />
      <span className="term-dim">Tab autocompletes commands, directories, and skill names.</span><br />
      <span className="term-dim">Directories: {getDirNames().join(", ")}</span>
    </div>
  );

  const generateHtop = () => {
    const colors = {
      "Programming Languages": "#667ee6",
      "Web Development": "#22c55e",
      "Data & Analytics": "#fb923c",
      "DevOps & Tools": "#d97706",
      "Security & Systems": "#ef4444",
    };

    return (
      <div className="htop-display">
        <div className="htop-header">
          <span className="term-bold term-white">SKILLS - Process Viewer</span>
          <span className="term-dim"> (sorted by category)</span>
        </div>
        <div className="htop-separator">{"─".repeat(60)}</div>
        {Object.entries(skillsData).map(([category, info]) => (
          <div key={category} className="htop-category">
            <div className="htop-cat-header">
              <span className="term-bold" style={{ color: colors[category] }}>
                {info.icon} {category}
              </span>
              <span className="term-dim"> [{info.skills.length} items]</span>
            </div>
            <div className="htop-skills">
              {info.skills.map((skill) => {
                const barLen = Math.min(20, Math.max(8, skill.length + 4));
                const bar = "█".repeat(barLen) + "░".repeat(20 - barLen);
                return (
                  <div key={skill} className="htop-skill-row">
                    <span className="htop-bar" style={{ color: colors[category] }}>{bar}</span>
                    <span className="htop-skill-name">{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="htop-separator">{"─".repeat(60)}</div>
        <span className="term-dim">Type <span className="term-yellow">help</span> for more commands.</span>
      </div>
    );
  };

  // Resolve a directory argument — handles relative paths from current dir or root
  const resolveDir = (arg) => {
    const clean = arg.toLowerCase().replace(/\//g, "").trim();
    if (categoryDirs[clean]) return clean;
    return null;
  };

  // Get all skill descriptions keys as file names
  const getAllSkillFiles = () => Object.keys(skillDescriptions);

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return null;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    switch (command) {
      case "help":
        return generateHelp();

      case "ls": {
        if (!args) {
          // No args: list current dir contents
          if (currentDir === "~") {
            return (
              <div className="term-ls">
                {getDirNames().map((d) => (
                  <span key={d} className="term-dir">{d}/</span>
                ))}
              </div>
            );
          } else {
            const dirKey = currentDir.replace("~/", "");
            const files = getSkillFiles(dirKey);
            return (
              <div className="term-ls">
                {files.map((f) => (
                  <span key={f} className="term-file">{f}</span>
                ))}
              </div>
            );
          }
        } else {
          // ls <dir> — list contents of specified directory
          const target = resolveDir(args);
          if (target) {
            const files = getSkillFiles(target);
            return (
              <div className="term-ls">
                {files.map((f) => (
                  <span key={f} className="term-file">{f}</span>
                ))}
              </div>
            );
          }
          return <span className="term-red">ls: cannot access '{args}': No such file or directory</span>;
        }
      }

      case "cd": {
        if (!args || args === "~" || args === "/" || args === "~/" ) {
          setCurrentDir("~");
          return null;
        }
        if (args === ".." || args === "../") {
          if (currentDir !== "~") {
            setCurrentDir("~");
          }
          return null;
        }
        const target = resolveDir(args);
        if (target) {
          setCurrentDir(`~/${target}`);
          return null;
        }
        return <span className="term-red">cd: no such directory: {args}</span>;
      }

      case "cat": {
        if (!args) return <span className="term-red">cat: missing operand</span>;
        const key = args.toLowerCase().replace(/\s+/g, "_").replace(/[()]/g, "");
        
        // Direct match
        let desc = skillDescriptions[key];
        if (desc) {
          return (
            <div className="term-cat">
              <span className="term-bold term-white">{key.replace(/_/g, " ")}</span>
              <br />
              <span className="term-dim">{desc}</span>
            </div>
          );
        }

        // Fuzzy match — find key that contains the search term
        const fuzzy = Object.entries(skillDescriptions).find(([k]) => 
          k.includes(key) || key.includes(k)
        );
        if (fuzzy) {
          return (
            <div className="term-cat">
              <span className="term-bold term-white">{fuzzy[0].replace(/_/g, " ")}</span>
              <br />
              <span className="term-dim">{fuzzy[1]}</span>
            </div>
          );
        }

        // Try without special chars
        const simplified = key.replace(/[^a-z]/g, "");
        const fuzzy2 = Object.entries(skillDescriptions).find(([k]) => 
          k.replace(/[^a-z]/g, "").includes(simplified)
        );
        if (fuzzy2) {
          return (
            <div className="term-cat">
              <span className="term-bold term-white">{fuzzy2[0].replace(/_/g, " ")}</span>
              <br />
              <span className="term-dim">{fuzzy2[1]}</span>
            </div>
          );
        }

        return <span className="term-red">cat: {args}: No such file. Try <span className="term-yellow">ls</span> to see available files.</span>;
      }

      case "htop":
        return generateHtop();

      case "pwd":
        return <span className="term-white">/home/whalephisher/skills{currentDir === "~" ? "" : "/" + currentDir.replace("~/", "")}</span>;

      case "whoami":
        return (
          <div className="term-cat">
            <span className="term-green term-bold">Gabriel Liau</span><br />
            <span className="term-dim">Data Engineer @ Bayer | Ex-Army Cyber Operations</span><br />
            <span className="term-dim">ASU '21 | Building data pipelines by day, hacking CTFs by night</span>
          </div>
        );

      case "clear":
        setHistory([]);
        return "CLEAR";

      case "q":
      case "exit":
        return <span className="term-dim">Nice try. You're stuck here. Type <span className="term-yellow">help</span> for commands.</span>;

      default:
        return <span className="term-red">{command}: command not found. Type <span className="term-yellow">help</span> for available commands.</span>;
    }
  }, [currentDir]);

  // Tab completion — works for commands, directories, and skill files
  const handleTab = () => {
    const input = currentInput;
    const parts = input.split(/\s+/);
    const cmd = parts[0]?.toLowerCase();

    // Complete the command itself if only one word
    if (parts.length === 1) {
      const commands = ["ls", "cd", "cat", "htop", "pwd", "clear", "whoami", "help"];
      const matches = commands.filter((c) => c.startsWith(cmd));
      if (matches.length === 1) {
        setCurrentInput(matches[0] + " ");
      }
      return;
    }

    // Complete arguments based on command
    const partial = parts.slice(1).join(" ").toLowerCase().replace(/\//g, "");

    if (cmd === "cd" || cmd === "ls") {
      // Complete directory names
      const dirs = getDirNames();
      const matches = dirs.filter((d) => d.startsWith(partial));
      if (matches.length === 1) {
        setCurrentInput(`${cmd} ${matches[0]}`);
      } else if (matches.length > 1) {
        // Find common prefix
        const common = matches.reduce((a, b) => {
          let i = 0;
          while (i < a.length && i < b.length && a[i] === b[i]) i++;
          return a.slice(0, i);
        });
        if (common.length > partial.length) {
          setCurrentInput(`${cmd} ${common}`);
        }
      }
    } else if (cmd === "cat") {
      // Complete skill filenames — from current dir or all
      let candidates;
      if (currentDir !== "~") {
        const dirKey = currentDir.replace("~/", "");
        candidates = getSkillFiles(dirKey);
      } else {
        candidates = getAllSkillFiles();
      }
      const matches = candidates.filter((f) => f.startsWith(partial));
      if (matches.length === 1) {
        setCurrentInput(`cat ${matches[0]}`);
      } else if (matches.length > 1) {
        const common = matches.reduce((a, b) => {
          let i = 0;
          while (i < a.length && i < b.length && a[i] === b[i]) i++;
          return a.slice(0, i);
        });
        if (common.length > partial.length) {
          setCurrentInput(`cat ${common}`);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = currentInput;
      const output = processCommand(cmd);

      if (output === "CLEAR") {
        setCurrentInput("");
        return;
      }

      const newHistory = [
        ...history,
        { type: "command", dir: currentDir, text: cmd },
      ];
      if (output) newHistory.push({ type: "output", content: output });

      setHistory(newHistory);
      if (cmd.trim()) {
        setCommandHistory((prev) => [...prev, cmd]);
      }
      setCurrentInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput("");
      } else {
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div className="skills-container" onClick={focusInput} ref={containerRef}>
      <div className="ubuntu-terminal-header">
        <div className="terminal-window-controls">
          <span className="window-btn close"></span>
          <span className="window-btn minimize"></span>
          <span className="window-btn maximize"></span>
        </div>
        <div className="terminal-title">whalephisher@portfolio: ~/skills</div>
      </div>

      <div className="terminal-body" ref={terminalBodyRef}>
        {history.map((entry, i) => (
          <div key={i} className="terminal-entry">
            {entry.type === "command" ? (
              <div className="terminal-line">
                <span className="prompt-user">whalephisher@portfolio</span>
                <span className="prompt-separator">:</span>
                <span className="prompt-path">{entry.dir}</span>
                <span className="prompt-symbol">$</span>
                <span className="term-white">{entry.text}</span>
              </div>
            ) : (
              <div className="terminal-output-block">{entry.content}</div>
            )}
          </div>
        ))}

        <div className="terminal-input-line">
          <span className="prompt-user">whalephisher@portfolio</span>
          <span className="prompt-separator">:</span>
          <span className="prompt-path">{currentDir}</span>
          <span className="prompt-symbol">$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Skills;
