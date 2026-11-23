export const processData = {
  eyebrow: "MY DEVELOPMENT APPROACH",
  heading: "How I build,",
  headingItalic: "start to finish.",
  subtitle: "Turning complex problems into practical software and intelligent AI applications.",
  
  stages: {
    discover: {
      step: "01",
      name: "DISCOVER",
      title: "Discover & Define",
      description: "I research problems, understand requirements, explore possibilities, and define the solution.",
    },
    architect: {
      step: "02",
      name: "ARCHITECT",
      title: "System Architecture",
      description: "I design the system architecture and choose suitable AI models, databases, frameworks, and technologies.",
    },
    develop: {
      step: "03",
      name: "DEVELOP",
      title: "Application Development",
      description: "I build applications using Python, FastAPI, React, LLMs, RAG pipelines, AI agents, and automation.",
    },
    deliver: {
      step: "04",
      name: "DELIVER",
      title: "Test, Optimize & Deploy",
      description: "I test functionality, debug issues, optimize performance, and prepare projects for deployment.",
      bannerHeading: "Don't just build AI. Build AI that solves real problems.",
      bannerDescription: "Experiment, engineer, iterate, and deliver solutions that make a difference.",
    },
  },

  planningBoard: [
    {
      title: "Problem",
      tag: "Research",
      description: "Analyze the core pain point, friction, and root cause.",
      bgClass: "bg-[#FEF9C3]",
      borderClass: "border-[#FDE047]/70",
      textClass: "text-[#713F12]",
      tagClass: "bg-[#FEF08A] text-[#854D0E]",
      rotate: "-1deg",
    },
    {
      title: "Users",
      tag: "Audience",
      description: "Understand everyday workflows and practical user expectations.",
      bgClass: "bg-[#ECFDF5]",
      borderClass: "border-[#A7F3D0]",
      textClass: "text-[#065F46]",
      tagClass: "bg-[#D1FAE5] text-[#047857]",
      rotate: "1.2deg",
    },
    {
      title: "Ideas",
      tag: "Exploration",
      description: "Assess AI feasibility, architecture ideas, and tangible value.",
      bgClass: "bg-[#F7FEE7]",
      borderClass: "border-[#D9F99D]",
      textClass: "text-[#3F6212]",
      tagClass: "bg-[#ECFCCB] text-[#4D7C0F]",
      rotate: "1deg",
    },
    {
      title: "Scope",
      tag: "Milestones",
      description: "Define MVP boundaries, deliverables, and acceptance criteria.",
      bgClass: "bg-[#F0FDF4]",
      borderClass: "border-[#BBF7D0]",
      textClass: "text-[#14532D]",
      tagClass: "bg-[#DCFCE7] text-[#15803D]",
      rotate: "-1.2deg",
    },
  ],

  architectureFlow: [
    { id: "client", label: "Client", role: "React / Vite UI", icon: "Layout" },
    { id: "api", label: "API", role: "FastAPI Services", icon: "Server" },
    { id: "model", label: "Model", role: "LLMs / RAG Agent", icon: "Cpu" },
    { id: "database", label: "Database", role: "Vector & Relational", icon: "Database" },
  ],

  terminalCommands: [
    {
      cmd: "uvicorn app.main:app --reload",
      output: "INFO: Application startup complete.",
    },
    {
      cmd: "pytest tests/test_rag.py -v",
      output: "test_rag.py::test_retrieval PASSED",
    },
    {
      cmd: "npm run build",
      output: "Built client bundle successfully.",
    },
  ],

  deployment: {
    title: "Deployment Pipeline",
    steps: [
      "Environment checks",
      "Unit & integration tests",
      "Production container build",
    ],
    status: "Build successful",
    detail: "Ready for deployment",
  },
};
