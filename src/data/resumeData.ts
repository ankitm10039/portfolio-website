import type { ResumeData } from './types';

// First full-time role started Oct 2020, so the experience count stays current on its own
const CAREER_START = new Date(2020, 9, 1);
export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
);

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Ankit Meena",
    email: "ankitm.uidev@gmail.com",
    phone: "(+91) 7674988775",
    location: "Indore, Madhya Pradesh",
    role: "Senior Analyst · Python Full Stack Developer",
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/ankit-fullstack-dev",
    github: "https://github.com/ankitm10039",
    whatsapp: "https://wa.me/917674988775",
  },
  profileSummary: [
    {
      title: "Experience Context",
      description:
        `Full Stack Engineer with ${yearsOfExperience} years of experience designing, building and maintaining scalable web applications across the full SDLC, from requirements and architecture to deployment and support.`,
    },
    {
      title: "Backend Expertise",
      description:
        "Strong backend expertise in Python, FastAPI and Flask: REST APIs, Pydantic validation, SQLAlchemy and Pytest, backed by PostgreSQL, MS SQL Server and MongoDB.",
    },
    {
      title: "Frontend Mastery",
      description:
        "Deep frontend expertise in Vue.js, React and Next.js with TypeScript, building reusable component libraries and clean, responsive interfaces with Pinia, Redux, Vuetify and Tailwind CSS.",
    },
    {
      title: "Cloud & Security",
      description:
        "Recently built a multi-cloud control assessment and governance platform (AWS, Azure, GCP), a FinOps Command Center for multi-cloud cost analytics and an Azure AD SSO-based reimbursement portal.",
    },
    {
      title: "AI & Modern Tooling",
      description:
        "Experienced with Docker, Azure and AWS, LLM integration with the Gemini API, Agile/Scrum delivery, and AI-assisted development tools such as GitHub Copilot, ChatGPT and Claude.",
    },
  ],
  coreCompetencies: [
    "Full Stack Development",
    "REST API Design",
    "Cloud Architecture",
    "Authentication & Security",
    "LLM Integration",
    "Performance Optimization",
    "Code Reviews",
    "Agile / Scrum",
  ],
  careerSummary: [
    {
      company: "PibyThree Consulting Pvt Ltd",
      role: "Senior Analyst",
      type: "Full Time",
      duration: "June 2025 - Present",
      description: [
        "Working as a Python Full Stack Developer with FastAPI, Flask, Vue 3, React and Next.js.",
        "Built CloudControl, the FinOps Command Center and the Azure AD SSO-based Reimbursement Portal.",
        "Integrated secure Single Sign-On (SSO) authentication flows and SMTP-based notifications.",
      ],
    },
    {
      company: "Eminence Infotech",
      role: "Web Developer",
      type: "Contract",
      duration: "Nov 2024 - May 2025",
      description: [
        "Developed user-friendly interfaces enhancing customer satisfaction.",
        "Implemented SEO strategies, increasing organic traffic by 40%.",
        "Optimized site performance, reducing load times by 50%.",
      ],
    },
    {
      company: "Chetu India Pvt Ltd",
      role: "Web Developer",
      type: "Full Time",
      duration: "Mar 2023 - Nov 2024",
      description: [
        "Maintained code quality, resulting in a 15% decrease in bugs.",
        "Conducted A/B testing, driving conversion rates up by 20%.",
        "Integrated APIs, expanding functionality and user experience.",
      ],
    },
    {
      company: "Coding Age Pvt Ltd",
      role: "Web Developer",
      type: "Contract",
      duration: "Jan 2023 - Mar 2023",
      description: [
        "Crafted responsive websites boosting user engagement by 30%.",
        "Collaborated with cross-functional teams to deliver projects on time.",
        "Trained junior developers, fostering a culture of continuous learning.",
      ],
    },
    {
      company: "Dollop Infotech Pvt Ltd",
      role: "Web Developer",
      type: "Full Time",
      duration: "Oct 2020 - Dec 2022",
      description: [
        "Crafted responsive websites boosting user engagement by 30%.",
        "Optimized site performance, reducing load times by 50%.",
        "Collaborated with cross-functional teams to deliver projects on time.",
      ],
    },
  ],
  technicalSkills: [
    { title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
    {
      title: "Backend",
      skills: ["FastAPI", "Pydantic", "SQLAlchemy", "Flask", "Node.js", "Express.js", "RESTful APIs", "GraphQL", "Microservices"],
    },
    {
      title: "Frontend",
      skills: ["Vue.js 3", "Nuxt.js", "Pinia", "Vuex", "Vuetify", "Quasar", "PrimeVue", "React.js", "Next.js", "Redux", "Tailwind CSS"],
    },
    {
      title: "Auth & Security",
      skills: ["Azure AD SSO (MSAL)", "JWT", "RBAC", "Cloud Security Posture", "CEL Rule Engine", "pip-audit", "Trivy"],
    },
    { title: "Databases", skills: ["PostgreSQL", "MS SQL Server", "MongoDB", "MySQL", "SQLite"] },
    {
      title: "Cloud & DevOps",
      skills: ["Azure", "AWS", "GCP (BigQuery)", "Docker", "Docker Compose", "CI/CD", "Jenkins", "GitLab CI", "Git", "Bitbucket"],
    },
    { title: "AI & Data", skills: ["LLM Integration", "Gemini API", "GitHub Copilot", "ChatGPT", "Claude", "Dataiku"] },
    {
      title: "Testing & Process",
      skills: ["Pytest", "Postman", "Code Reviews", "Debugging", "Performance Optimization", "Agile/Scrum", "JIRA"],
    },
  ],
  academicDetails: [
    {
      year: "2022",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Maharishi Mahesh Yogi Vedic Vishwavidyalaya, Jabalpur",
      score: "74%",
    },
    {
      year: "2018",
      degree: "Higher Secondary",
      institution: "Ankur Higher Secondary School, Madhya Pradesh",
      score: "60%",
    },
    {
      year: "2016",
      degree: "Secondary (10th)",
      institution: "Genius Higher Secondary School, Jaora",
      score: "68%",
    },
  ],
  certificates: [
    { name: "AWS Certified Cloud Practitioner (CLF-C02)", issuer: "Amazon Web Services" },
    { name: "APM & Distributed Tracing Fundamentals", issuer: "Datadog" },
  ],
  projects: [
    {
      name: "CloudControl",
      tagline: "Multi-Cloud Control Assessment & Governance Platform",
      category: "Cloud & AI",
      featured: true,
      description:
        "A multi-cloud governance platform that scans AWS, Azure and GCP accounts and evaluates every resource against a declarative control library using a CEL rule engine, with hashed evidence snapshots, control scoring and PDF assessment reports.",
      techStack: [
        "FastAPI",
        "SQLAlchemy",
        "Pydantic",
        "PostgreSQL",
        "Vue 3",
        "TypeScript",
        "Pinia",
        "Tailwind CSS",
        "Vite",
        "boto3",
        "Azure SDK",
        "Google Cloud SDK",
        "CEL",
        "ReportLab",
        "Pytest",
        "Docker Compose",
      ],
    },
    {
      name: "FinOps Command Center",
      tagline: "Multi-Cloud Cost Analytics Platform",
      category: "Cloud & AI",
      featured: true,
      description:
        "A FinOps product that gives one view of cloud spend across AWS and GCP, with cost dashboards, savings recommendations and a Gemini-powered chatbot. Signup and login are restricted to work email domains.",
      techStack: [
        "React 18",
        "Tailwind CSS",
        "DaisyUI",
        "Highcharts",
        "Recharts",
        "Python",
        "Flask",
        "boto3",
        "Google BigQuery",
        "Gemini API",
        "Docker",
        "AWS CloudFormation",
      ],
    },
    {
      name: "Reimbursement Portal",
      tagline: "Employee Expense Claims & Approval System",
      category: "Enterprise",
      featured: true,
      description:
        "An internal expense-claims portal with Azure AD SSO and role-based approvals, where employees submit claims with receipts, managers verify them and finance approves and disburses.",
      techStack: [
        "Vue 3",
        "TypeScript",
        "Vuetify",
        "Pinia",
        "Vite",
        "ECharts",
        "Chart.js",
        "PDF.js",
        "FastAPI",
        "PostgreSQL",
        "Azure AD (MSAL)",
        "AWS S3",
      ],
    },
    {
      name: "ICAssist · Financial Insights",
      tagline: "AI Chatbot for Company Financial Reports",
      category: "Cloud & AI",
      description:
        "An AI-powered chatbot that streamlines corporate data retrieval. Users ask complex questions in natural language and instantly get precise financial and operational insights from a company's quarterly and annual reports.",
      techStack: [
        "Next.js",
        "Python",
        "Flask",
        "REST APIs",
        "LLM Integration",
        "Dataiku",
        "Azure",
        "AWS",
        "Bitbucket",
        "CI/CD",
      ],
    },
    {
      name: "AutoLit",
      tagline: "Healthcare Reporting & Analytics Platform",
      category: "Healthcare",
      description:
        "A data reporting platform for the healthcare sector that generates customised reports by therapeutic area and medical condition, and delivers them on a daily, weekly or monthly schedule by email.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Python",
        "Flask",
        "Dataiku",
        "LLM Integration",
        "AWS",
        "Azure",
        "Bitbucket",
      ],
    },
    {
      name: "IT Service Desk Application",
      tagline: "Internal IT Service Desk & Asset Management",
      category: "Enterprise",
      description:
        "A comprehensive IT service management platform featuring role-based authentication. Enables users to raise and seamlessly track support tickets, while providing SuperAdmins with advanced inventory and system management capabilities.",
      techStack: ["Next.js", "Python", "AWS S3", "SSO", "SMTP", "PostgreSQL"],
    },
    {
      name: "Lyvup",
      tagline: "Digital Therapy Platform",
      category: "Healthcare",
      description:
        "Our mission is to provide innovative digital therapies that seamlessly align with the needs of individuals of all ages. Patients can receive the care they need from the comfort of their own homes.",
      techStack: ["React.js", "Python", "MySQL", "Bootstrap", "AWS S3", "Node.js", "Github"],
    },
    {
      name: "Ordant",
      tagline: "Cloud Platform for Print Businesses",
      category: "Business & SaaS",
      description:
        "Next-Gen Cloud Based platform that runs your entire print business from start to finish. Powerful, customizable modules work independently but integrate seamlessly to replace disconnected silos of data.",
      techStack: ["Vue.js", "Node.js", "Express.js", "Stripe", "AWS", "Azure", "Bitbucket"],
    },
    {
      name: "POS System",
      tagline: "Point-of-Sale Platform",
      category: "Business & SaaS",
      description:
        "A combination of hardware, software, and payment services that businesses use to make sales and route funds to bank accounts efficiently.",
      techStack: ["Vue.js", "Quasar", "Pinia", "PostgreSQL", "AWS", "Azure"],
    },
    {
      name: "Park Smart",
      tagline: "Parking Management Solution",
      category: "Business & SaaS",
      description:
        "A platform that offers a roadmap for new and existing parking facilities to use innovative, solutions-oriented strategies complementing LEED and other certifications.",
      techStack: ["Vue.js", "Node.js", "Quasar", "Google Map", "Payment Gateway", "Github"],
    },
    {
      name: "Cough Drop",
      tagline: "Augmentative & Alternative Communication (AAC) Software",
      category: "Healthcare",
      description:
        "Powerful open-source software (AAC) that helps bring out the voices of those with complex communication needs, easily adapting to the individual and supporting everyone around them.",
      techStack: ["Vue.js", "Eye Gaze Tracking", "JavaScript", "HTML5", "CSS3", "Python", "AWS S3", "Azure", "Github"],
    },
    {
      name: "Social Angel",
      tagline: "Donor & Volunteer Community Platform",
      category: "Social & Education",
      description:
        "A platform connecting those in need with supporters through donations, skills, and community action to foster real, lasting change.",
      techStack: ["Vue.js", "Python", "Google Map", "SMTP", "AWS", "Stripe", "Vuetify", "Github"],
    },
    {
      name: "School dash",
      tagline: "School Administration System",
      category: "Social & Education",
      description:
        "A comprehensive school management software designed to streamline administrative tasks like student enrollment, attendance tracking, grading, and communication.",
      techStack: ["Vue.js", "Quasar", "Java", "AWS", "Azure", "Payment Gateway", "MySQL", "Nuxt.js"],
    },
  ],
  languages: ["Hindi", "English"],
};
