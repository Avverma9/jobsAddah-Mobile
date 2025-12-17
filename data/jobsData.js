// Jobs App Data - Categories and Sample Jobs

export const SECTOR_CATEGORIES = {
  govt: [
    { id: 'all', label: 'All Govt' },
    { id: 'banking', label: 'Banking' },
    { id: 'railways', label: 'Railways' },
    { id: 'defence', label: 'Defence' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'upsc', label: 'UPSC/PSC' },
    { id: 'psu', label: 'PSU' }
  ],
  private: [
    { id: 'all', label: 'All Private' },
    { id: 'software', label: 'Software/IT' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'design', label: 'Design' },
    { id: 'sales', label: 'Sales & BPO' },
    { id: 'finance', label: 'Finance' },
    { id: 'hr', label: 'Human Resources' }
  ]
};

// Icon names from @expo/vector-icons (MaterialCommunityIcons / Ionicons / FontAwesome5)
export const JOBS_DATA = [
  // --- GOVT JOBS ---
  {
    id: 1,
    title: "Probationary Officer (PO)",
    org: "State Bank of India",
    sector: "govt",
    subCategory: "banking",
    location: "Pan India",
    salary: "₹65,000",
    deadline: "Oct 25, 2025",
    posted: "2h ago",
    iconName: "bank",
    iconFamily: "MaterialCommunityIcons",
    color: "#2563eb",
    bgLight: "#dbeafe",
    description: "SBI is inviting applications for PO. Best opportunity for graduates seeking a stable banking career.",
    tags: ["Full Time", "Banking", "Govt"]
  },
  {
    id: 2,
    title: "SSC CGL 2025 Notification",
    org: "Staff Selection Commission",
    sector: "govt",
    subCategory: "upsc",
    location: "Central Govt",
    salary: "Level 4-8",
    deadline: "Dec 10, 2025",
    posted: "1d ago",
    iconName: "shield-checkmark",
    iconFamily: "Ionicons",
    color: "#16a34a",
    bgLight: "#dcfce7",
    description: "Official notification for Group B & C posts. Check eligibility and apply now.",
    tags: ["Group B", "Group C", "Graduate"]
  },
  {
    id: 3,
    title: "Railway Group D Admit Card",
    org: "Indian Railways",
    sector: "govt",
    subCategory: "railways",
    location: "N/A",
    salary: "N/A",
    deadline: "Exam: Nov 15",
    posted: "Just Now",
    iconName: "train",
    iconFamily: "MaterialCommunityIcons",
    color: "#ea580c",
    bgLight: "#ffedd5",
    description: "Download e-Call Letter for RRB Group D CBT. Check exam city and dates.",
    tags: ["Admit Card", "RRB", "Exam"]
  },
  {
    id: 4,
    title: "IBPS Clerk 2025",
    org: "Institute of Banking",
    sector: "govt",
    subCategory: "banking",
    location: "Pan India",
    salary: "₹30,000",
    deadline: "Nov 30, 2025",
    posted: "3h ago",
    iconName: "bank",
    iconFamily: "MaterialCommunityIcons",
    color: "#2563eb",
    bgLight: "#dbeafe",
    description: "IBPS Clerk recruitment for clerical cadre in participating banks.",
    tags: ["Clerk", "Banking", "Govt"]
  },
  // --- PRIVATE JOBS ---
  {
    id: 5,
    title: "UI/UX Designer",
    org: "TechSolutions Pvt Ltd",
    sector: "private",
    subCategory: "design",
    location: "Bangalore",
    salary: "₹8-12 LPA",
    deadline: "Nov 01, 2025",
    posted: "5h ago",
    iconName: "palette",
    iconFamily: "MaterialCommunityIcons",
    color: "#9333ea",
    bgLight: "#f3e8ff",
    description: "Looking for a creative UI/UX Designer. Figma expertise required.",
    tags: ["Remote", "Design", "Startup"]
  },
  {
    id: 6,
    title: "Senior Backend Engineer",
    org: "InnovateHub",
    sector: "private",
    subCategory: "software",
    location: "Hyderabad",
    salary: "₹25-35 LPA",
    deadline: "Nov 20, 2025",
    posted: "1d ago",
    iconName: "code-braces",
    iconFamily: "MaterialCommunityIcons",
    color: "#4f46e5",
    bgLight: "#e0e7ff",
    description: "Hiring Python/Node.js experts for scalable backend architecture.",
    tags: ["Node.js", "Python", "MNC"]
  },
  {
    id: 7,
    title: "Digital Marketing Manager",
    org: "GrowthX Agency",
    sector: "private",
    subCategory: "marketing",
    location: "Mumbai",
    salary: "₹15-20 LPA",
    deadline: "Oct 30, 2025",
    posted: "4h ago",
    iconName: "bullhorn",
    iconFamily: "MaterialCommunityIcons",
    color: "#db2777",
    bgLight: "#fce7f3",
    description: "Lead marketing campaigns and growth strategies. SEO/SEM knowledge required.",
    tags: ["Marketing", "Lead", "Agency"]
  },
  {
    id: 8,
    title: "React Native Developer",
    org: "AppWorks Studio",
    sector: "private",
    subCategory: "software",
    location: "Remote",
    salary: "₹18-25 LPA",
    deadline: "Dec 05, 2025",
    posted: "2h ago",
    iconName: "cellphone",
    iconFamily: "MaterialCommunityIcons",
    color: "#0891b2",
    bgLight: "#cffafe",
    description: "Build cross-platform mobile apps. Experience with Expo preferred.",
    tags: ["React Native", "Mobile", "Remote"]
  },
  {
    id: 9,
    title: "Sales Executive",
    org: "SalesForce India",
    sector: "private",
    subCategory: "sales",
    location: "Delhi NCR",
    salary: "₹6-10 LPA",
    deadline: "Nov 15, 2025",
    posted: "6h ago",
    iconName: "account-tie",
    iconFamily: "MaterialCommunityIcons",
    color: "#059669",
    bgLight: "#d1fae5",
    description: "B2B sales role with attractive incentives. Strong communication skills required.",
    tags: ["Sales", "B2B", "Incentives"]
  }
];

// Theme colors based on sector
export const THEME_COLORS = {
  govt: {
    primary: '#2563eb',
    primaryLight: '#dbeafe',
    text: '#1e40af',
    border: '#3b82f6',
    bg: '#eff6ff'
  },
  private: {
    primary: '#9333ea',
    primaryLight: '#f3e8ff',
    text: '#7c3aed',
    border: '#a855f7',
    bg: '#faf5ff'
  }
};
