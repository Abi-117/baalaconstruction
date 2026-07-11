import heroVilla from "@/assets/hero-villa.jpg";
import constructionSite from "@/assets/construction-site.jpg";
import interior from "@/assets/interior-luxury.jpg";
import commercial from "@/assets/commercial-building.jpg";
import blueprint from "@/assets/blueprint.jpg";
import villaPool from "@/assets/villa-pool.jpg";
import renovation from "@/assets/renovation.jpg";
import apartment from "@/assets/apartment.jpg";
import ConstructionExecution from "@/assets/image.png";
import PlanningEstimation from "@/assets/PlanningEstimation.jpg";
import dimg from "@/assets/3dimg.jpg";
import design from "@/assets/design.jpg";
import renovation2 from "@/assets/renovations.jpg";
import renovations from "@/assets/renovationdesign.jpg"
import interior1 from "@/assets/interier1.jpg";
import interior2 from "@/assets/interior1.jpg";

export const IMAGES = {
  heroVilla,
  constructionSite,
  interior,
  commercial,
  blueprint,
  villaPool,
  renovation,
  apartment,
  ConstructionExecution,
  PlanningEstimation,
  dimg,
  design,
  renovation2,
  renovations,
};

export const BRAND = {
  name: "BAALA Constructions",
  short: "BAALA",
  tagline: "Trusted Quality Contractor",
  phone: "+91 89394 07760",
  email: "baalaconstructions@gmail.com",
  address: "12, Green Avenue, Anna Nagar, Chennai — 600040",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    slug: "construction",
    title: "Construction",
    tag: "01",
    summary:
      "End-to-end construction of premium residential and commercial properties built to precision.",

    description:
      "We provide complete construction services from concept to completion, delivering high-quality residential, commercial, and industrial projects. Our experienced engineers, skilled workforce, and strict quality standards ensure every project is completed on time, within budget, and built to last.",

    image: constructionSite,

    gallery: [
      constructionSite,
      ConstructionExecution,
      PlanningEstimation,
    ],

    points: [
      "Structural Engineering",
      "Experienced Site Management",
      "Premium Quality Materials",
      "Skilled Workforce",
      "Timely Project Delivery",
      "Quality Assurance",
    ],

    process: [
      "Initial Consultation",
      "Site Survey",
      "Planning & Estimation",
      "Construction Execution",
      "Quality Inspection",
      "Final Finishing",
      "Project Handover",
    ],
  },

  {
    slug: "architecture",
    title: "Architecture",
    tag: "02",
    summary:
      "Contemporary architectural design that balances form, function, and timeless aesthetics.",

    description:
      "Our architectural team creates elegant, sustainable, and functional spaces tailored to your lifestyle or business needs. From concept sketches to construction documentation, every detail is thoughtfully designed for beauty and performance.",

    image: blueprint,

    gallery: [
      blueprint,
      dimg,
      design,
    ],

    points: [
      "Architectural Planning",
      "Concept Development",
      "Space Optimization",
      "3D Visualization",
      "Working Drawings",
      "Municipality Approval Support",
    ],

    process: [
      "Requirement Discussion",
      "Concept Planning",
      "3D Design Presentation",
      "Design Refinement",
      "Working Drawings",
      "Approval Assistance",
      "Construction Coordination",
    ],
  },

  {
    slug: "renovation",
    title: "Renovation",
    tag: "03",
    summary:
      "Transform aging spaces into modern, elegant environments with expert renovation solutions.",

    description:
      "Whether it's a complete home makeover or a commercial renovation, we enhance existing structures while preserving their integrity. Our renovation services combine modern materials, innovative ideas, and expert craftsmanship to create refreshed living and working spaces.",

    image: renovation,

    gallery: [
      renovation,
      renovation2,
      renovations,
    ],

    points: [
      "Structural Remodeling",
      "Interior Upgrades",
      "Flooring Replacement",
      "Electrical & Plumbing",
      "Modern Finishes",
      "Minimal Site Disruption",
    ],

    process: [
      "Property Inspection",
      "Design Consultation",
      "Budget Planning",
      "Demolition & Preparation",
      "Renovation Works",
      "Quality Inspection",
      "Final Delivery",
    ],
  },

  {
    slug: "interior-design",
    title: "Interior Design",
    tag: "04",
    summary:
      "Luxury interior spaces designed to reflect your personality while maximizing comfort and functionality.",

    description:
      "We create sophisticated interiors that combine creativity, comfort, and functionality. From space planning and furniture selection to lighting and décor, every element is carefully curated to deliver timeless elegance.",

    image: interior,

    gallery: [
      interior,
      interior1,
      interior2,
    ],

    points: [
      "Space Planning",
      "Custom Furniture Design",
      "False Ceiling Design",
      "Lighting Design",
      "Material Selection",
      "Luxury Finishes",
    ],

    process: [
      "Client Consultation",
      "Mood Board Creation",
      "3D Interior Design",
      "Material Selection",
      "Execution",
      "Styling & Decoration",
      "Final Reveal",
    ],
  },

  {
    slug: "turnkey-projects",
    title: "Turnkey Projects",
    tag: "05",
    summary:
      "Complete design-build solutions delivered through a single point of responsibility.",

    description:
      "Our turnkey services handle everything from planning and approvals to construction and interior finishing. We manage every stage so clients enjoy a hassle-free experience with guaranteed quality, cost control, and timely delivery.",

    image: villaPool,

    gallery: [
      villaPool,
      constructionSite,
      interior,
    ],

    points: [
      "Complete Project Management",
      "Architecture & Construction",
      "Interior Execution",
      "Vendor Coordination",
      "Budget Control",
      "Single Point Accountability",
    ],

    process: [
      "Project Consultation",
      "Design & Planning",
      "Cost Estimation",
      "Construction",
      "Interior Fit-Out",
      "Quality Inspection",
      "Key Handover",
    ],
  },

  {
    slug: "pmc",
    title: "Project Management Consultancy",
    tag: "06",
    summary:
      "Professional project management services focused on quality, budget control, and timely delivery.",

    description:
      "Our Project Management Consultancy (PMC) services ensure construction projects are executed efficiently through expert planning, monitoring, quality control, and risk management. We protect our clients' investments by maintaining transparency and accountability throughout the project lifecycle.",

    image: commercial,

    gallery: [
      commercial,
      constructionSite,
      blueprint,
    ],

    points: [
      "Project Planning",
      "Cost Management",
      "Quality Audits",
      "Vendor Coordination",
      "Risk Management",
      "Progress Monitoring",
    ],

    process: [
      "Project Assessment",
      "Planning & Scheduling",
      "Resource Allocation",
      "Execution Monitoring",
      "Quality Audits",
      "Progress Reporting",
      "Project Closure",
    ],
  },
];

export const STATS = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 180, suffix: "+", label: "Happy Clients" },
  { value: 22, suffix: "", label: "Years Experience" },
  { value: 18, suffix: "", label: "Awards Won" },
];

export const WHY_US = [
  { title: "Trusted Team", copy: "Multi-disciplinary specialists with two decades of on-site excellence." },
  { title: "Quality Materials", copy: "Certified, sustainably sourced materials from verified suppliers." },
  { title: "Experienced Engineers", copy: "Structural and MEP engineers guiding every critical decision." },
  { title: "On-time Delivery", copy: "Milestone tracking and weekly reviews keep every project on schedule." },
  { title: "Transparent Pricing", copy: "Line-item costing with zero hidden charges from day one." },
  { title: "Safety Standards", copy: "IS-16819 certified site safety protocols, weekly audits and PPE compliance." },
  { title: "Modern Technology", copy: "BIM, drone surveys and real-time progress dashboards for clients." },
];

export const FEATURED_PROJECTS = [
  {
    slug: "atelier-villa",
    title: "Atelier Villa",
    category: "Luxury Residence",
    location: "ECR, Chennai",
    image: heroVilla,
    year: 2025,
  },
  {
    slug: "meridian-tower",
    title: "Meridian Tower",
    category: "Commercial",
    location: "Guindy, Chennai",
    image: commercial,
    year: 2024,
  },
  {
    slug: "cove-house",
    title: "Cove House",
    category: "Coastal Villa",
    location: "Pondicherry",
    image: villaPool,
    year: 2024,
  },
  {
    slug: "north-loft",
    title: "North Loft",
    category: "Interior",
    location: "Anna Nagar",
    image: interior,
    year: 2025,
  },
  {
    slug: "verdant-heights",
    title: "Verdant Heights",
    category: "Apartments",
    location: "OMR, Chennai",
    image: apartment,
    year: 2023,
  },
  {
    slug: "studio-rewrite",
    title: "Studio Rewrite",
    category: "Renovation",
    location: "Adyar, Chennai",
    image: renovation,
    year: 2025,
  },
];

export const CURRENT_PROJECTS = [
  {
    id: 1,
    title: "Luxury Villa Project",
    location: "Coimbatore",
    progress: 65,
    completion: "December 2026",
    image: IMAGES.heroVilla,
    area: "4200 Sq.ft",
    duration: "14 Months",
    description:
      "Premium luxury villa currently under construction with modern architecture and premium finishes.",
  },

  {
    id: 2,
    title: "Commercial Office Complex",
    location: "Chennai",
    progress: 82,
    completion: "October 2026",
    image: IMAGES.villaPool,
    area: "15000 Sq.ft",
    duration: "18 Months",
    description:
      "Modern commercial office building with premium office spaces and high-end construction standards.",
  },

  {
    id: 3,
    title: "Premium Apartment",
    location: "Salem",
    progress: 45,
    completion: "March 2027",
    image: IMAGES.interior,
    area: "22000 Sq.ft",
    duration: "20 Months",
    description:
      "Multi-storey residential apartment project with luxury amenities and spacious layouts.",
  },

  {
    id: 4,
    title: "Luxury Individual House",
    location: "Madurai",
    progress: 72,
    completion: "January 2027",
    image: IMAGES.heroVilla,
    area: "3800 Sq.ft",
    duration: "12 Months",
    description:
      "Contemporary individual residence designed with elegant architecture and premium materials.",
  },
];

export const UPCOMING_PROJECTS = [
  { date: "Q1 2026", title: "The Arboretum", type: "Luxury Villas", note: "12 private residences on a 3-acre canopy plot." },
  { date: "Q2 2026", title: "Nexus One", type: "Commercial Tower", note: "18-floor Grade-A office tower with LEED Gold target." },
  { date: "Q3 2026", title: "Ivory Row", type: "Row Houses", note: "Boutique row-house community with shared amenities." },
  { date: "Q4 2026", title: "Cascade Apartments", type: "Residential", note: "84 curated apartments with landscaped courtyards." },
];

export const PROCESS = [
  { n: "01", title: "Consultation", copy: "Understanding your vision, site and lifestyle." },
  { n: "02", title: "Planning", copy: "Feasibility, budgeting and regulatory groundwork." },
  { n: "03", title: "Design", copy: "Architecture, interiors and BIM coordination." },
  { n: "04", title: "Construction", copy: "On-site execution with weekly client reviews." },
  { n: "05", title: "Quality Check", copy: "Multi-stage QA, snag lists and third-party audits." },
  { n: "06", title: "Handover", copy: "Documentation, warranties and a 12-month care plan." },
];

export const TESTIMONIALS = [
  {
    quote:
      "BAALA delivered our villa two weeks ahead of schedule. Their attention to detail is unmatched — from the concrete finish to the tiniest brass fitting.",
    name: "Aravind Menon",
    role: "Homeowner · Atelier Villa",
  },
  {
    quote:
      "Working with the BAALA PMC team turned an intimidating commercial build into a genuinely enjoyable process. Weekly clarity on cost, quality, time.",
    name: "Priya Rangan",
    role: "COO · Meridian Group",
  },
  {
    quote:
      "The team's design sensitivity is rare in this industry. Our renovation feels like an entirely new home while honouring what was already there.",
    name: "Deepak & Sneha",
    role: "Renovation Client",
  },
];

export const GALLERY = [
  { src: heroVilla, tag: "Architecture", h: "tall" },
  { src: interior, tag: "Interior", h: "short" },
  { src: constructionSite, tag: "Construction", h: "short" },
  { src: villaPool, tag: "Architecture", h: "tall" },
  { src: commercial, tag: "Commercial", h: "short" },
  { src: renovation, tag: "Renovation", h: "tall" },
  { src: apartment, tag: "Residential", h: "short" },
  { src: blueprint, tag: "Design", h: "short" },
  { src: IMAGES.ConstructionExecution, tag: "Construction", h: "tall" },
  { src: IMAGES.PlanningEstimation, tag: "Planning", h: "short" },
];


export const COMPLETED_PROJECTS = [
  {
    id: 1,
    title: "Luxury Villa Residence",
    location: "Coimbatore",
    year: "2025",
    area: "4,500 Sq.ft",
    duration: "14 Months",
    status: "Completed",
    image: IMAGES.villaPool,
    gallery: [
      IMAGES.villaPool,
      IMAGES.heroVilla,
      IMAGES.interior,
    ],
    description:
      "A premium luxury villa designed with modern architecture, spacious interiors, landscaped surroundings and high-quality construction standards.",
  },

  {
    id: 2,
    title: "Modern Family Villa",
    location: "Chennai",
    year: "2024",
    area: "3,800 Sq.ft",
    duration: "12 Months",
    status: "Completed",
    image: IMAGES.heroVilla,
    gallery: [
      IMAGES.heroVilla,
      IMAGES.interior,
      IMAGES.villaPool,
    ],
    description:
      "Contemporary villa built with premium finishes, elegant elevations and smart space planning for modern family living.",
  },

  {
    id: 3,
    title: "Commercial Office Building",
    location: "Salem",
    year: "2024",
    area: "12,000 Sq.ft",
    duration: "18 Months",
    status: "Completed",
    image: IMAGES.interior,
    gallery: [
      IMAGES.interior,
      IMAGES.heroVilla,
      IMAGES.villaPool,
    ],
    description:
      "Multi-storey commercial building featuring premium office spaces, modern façade design and durable structural engineering.",
  },

  {
    id: 4,
    title: "Premium Apartment",
    location: "Erode",
    year: "2023",
    area: "18,500 Sq.ft",
    duration: "20 Months",
    status: "Completed",
    image: IMAGES.heroVilla,
    gallery: [
      IMAGES.heroVilla,
      IMAGES.villaPool,
      IMAGES.interior,
    ],
    description:
      "Luxury apartment project developed with modern amenities, efficient planning and high-quality construction materials.",
  },

  {
    id: 5,
    title: "Educational Campus",
    location: "Madurai",
    year: "2023",
    area: "28,000 Sq.ft",
    duration: "22 Months",
    status: "Completed",
    image: IMAGES.interior,
    gallery: [
      IMAGES.interior,
      IMAGES.heroVilla,
      IMAGES.villaPool,
    ],
    description:
      "Institutional construction project including classrooms, administration block and outdoor activity spaces.",
  },

  {
    id: 6,
    title: "Healthcare Centre",
    location: "Trichy",
    year: "2022",
    area: "16,000 Sq.ft",
    duration: "17 Months",
    status: "Completed",
    image: IMAGES.villaPool,
    gallery: [
      IMAGES.villaPool,
      IMAGES.heroVilla,
      IMAGES.interior,
    ],
    description:
      "Healthcare facility built with safety standards, efficient layouts and modern infrastructure for patient care.",
  },
];