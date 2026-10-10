// DOM Ready helper function to guarantee execution even with defer/async scripts
function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Preloader with safety fallback
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && preloader.style.display !== 'none') {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 400);
  }
};

window.addEventListener('load', hidePreloader);
onReady(hidePreloader);
// Fallback in case external scripts/CDNs take too long to load
setTimeout(hidePreloader, 1000);



// Toggle Icon Navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navDropdowns = document.querySelectorAll('.nav-dropdown');

function closeMobileMenu() {
  if (menuIcon) menuIcon.classList.remove('bx-x');
  if (navbar) navbar.classList.remove('active');
  navDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  document.querySelectorAll('.navbar .dropdown-trigger').forEach(trig => {
    trig.setAttribute('aria-expanded', 'false');
  });
}

function openMobileMenu() {
  if (menuIcon) menuIcon.classList.add('bx-x');
  if (navbar) navbar.classList.add('active');
}

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navbar.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

// Scroll Sections Active Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

window.addEventListener('scroll', () => {
  let currentSection = 'home';

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 160;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      currentSection = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // If an active link is inside a dropdown, also highlight that dropdown trigger
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const hasActiveChild = !!dropdown.querySelector('.nav-dropdown-content a.active');
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (trigger) {
      trigger.classList.toggle('active', hasActiveChild);
    }
  });

  const header = document.querySelector('header');
  if (header) header.classList.toggle('sticky', window.scrollY > 100);
});

// Theme Setting (Default Dark Mode with Toggle Support)
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const htmlElement = document.documentElement;

// Check for saved theme (Default to dark)
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

if (themeToggle) {
  themeToggle.style.display = 'flex';
}

if (currentTheme === 'light' && themeIcon) {
  themeIcon.classList.remove('bx-sun');
  themeIcon.classList.add('bx-moon');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
      }
      localStorage.setItem('theme', 'light');
      if (typeof initParticles === 'function') initParticles('light');
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
      }
      localStorage.setItem('theme', 'dark');
      if (typeof initParticles === 'function') initParticles('dark');
    }
  });
}


// Multilingual i18n Translation Engine (EN / AR / RU)
const translations = {
  en: {
    meta: {
      title: 'Mohamed Hamed Sallam | Software Engineer',
      description: 'Portfolio of Mohamed Hamed Mohamed Sallam, Software Engineer.'
    },
    logo: 'ENG MOHAMED SALLAM',
    nav: {
      home: 'Home',
      training: 'Training',
      training_zahraa: 'Zahraa System Training',
      training_erp: 'ERP HR System Training',
      training_erp_finance: 'ERP Financial System Training',
      training_web: 'Programmers Website Training',
      more: 'More',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      research: 'Research',
      certifications: 'Certifications',
      videos: 'Demos',
      datacenter: 'MNU DATA CENTER',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hello, It's Me",
      titlePrefix: "And I'm",
      description: 'Building robust software, modern web applications, and seamless user experiences. "Zero Trust" was implemented in the systems for the first time; additionally, numerous systems at public universities were developed, incorporating leading cybersecurity measures into their architecture.',
      download: 'Download CV',
      contact: 'Contact Me'
    },
    training: {
      heading: 'System <span>Training</span>',
      kicker: 'Training staff on the system',
      title: 'Activating the Al-Zahraa system after the new update for Mansoura National University',
      intro: 'Photos from the staff training session on the system to activate Al-Zahraa after the new update for Mansoura National University.',
      cards: [
        'Training Session 1',
        'Training Session 2',
        'Training Session 3',
        'Training Session 4',
        'Training Session 5',
        'Training Session 6',
        'Training Session 7',
        'Training Session 8',
        'Training Session 9'
      ]
    },
    trainingHr: {
      kicker: 'HR Training on ERPNext',
      title: 'Human Resources (HR) Training on the ERP System',
      intro: '<p>We successfully delivered a comprehensive training program for managers and staff across the Human Resources, Finance, and Administrative departments on ERPNext.</p><p>The training covered core HR modules, including payroll management for administrative staff, faculty members, and all university employees. It also included the implementation of attendance and fingerprint systems, along with advanced reporting tools tailored to support executive-level decision-making.</p><p>ERPNext is more than just an HR system - it is a fully integrated platform designed to manage all organizational operations efficiently. It stands out for its user-friendly interface, high flexibility, and ability to be customized according to each organization\'s needs. The system provides real-time insights across all departments, enabling smarter and faster strategic decisions, reducing operational errors, increasing productivity, and seamlessly connecting all departments within one unified system that truly supports digital transformation.</p>',
      cards: [
        'ERP HR Session 1',
        'ERP HR Session 2',
        'ERP HR Session 3',
        'ERP HR Session 4',
        'ERP HR Session 5',
        'ERP HR Session 6',
        'ERP HR Session 7',
        'ERP HR Session 8',
        'ERP HR Session 9',
        'ERP HR Session 10',
        'ERP HR Session 11',
        'ERP HR Session 12',
        'ERP HR Session 13',
        'ERP HR Session 14'
      ]
    },
    about: {
      heading: 'About <span>Me</span>',
      title: 'Software Engineer & Multidisciplinary Specialist',
      intro: 'Technology has never been just a career for me—it\'s a passion that drives me to continuously learn, build, and innovate. My journey began with a strong curiosity to understand how technology works behind the scenes, evolving into cross-disciplinary expertise that seamlessly combines <strong>engineering</strong>, <strong>infrastructure</strong>, <strong>security</strong>, and <strong>design</strong>.',
      cards: [
        { title: 'Software Engineering', text: 'Building modern, scalable, and high-performance applications with clean architecture and a strong focus on user experience, maintainability, and security.' },
        { title: 'Infrastructure & Systems', text: 'Practical background in IT Support & System Administration—managing enterprise Windows/Linux servers, network architecture, and system reliability.' },
        { title: 'Design & Brand Identity', text: 'Created over <strong>1,200+ professional designs</strong> including brand identities, logos, marketing campaigns, and digital assets for companies & universities.' },
        { title: 'Security & Strategy', text: 'Integrating security best practices into software architecture, understanding how infrastructure, servers, and cybersecurity protect real-world systems.' }
      ],
      badges: ['Software Engineer', 'Full-Stack Developer', 'System Administrator', 'IT Specialist', 'Graphic Designer', 'Cybersecurity Enthusiast'],
      quote: 'Building technology with logic, securing it with knowledge, and bringing it to life through design.',
      counters: ['Years Experience', 'Designs Created', 'Systems Supported', 'Users Handled']
    },
    skills: {
      heading: 'My <span>Skills</span>',
      cards: [
        { header: 'Systems & Infrastructure', items: ['System Administration (Windows/Linux)', 'Active Directory & GPO'], tags: ['Windows Server', 'RedHat Linux', 'Virtualization', 'Backup Systems'] },
        { header: 'Networking & Hardware', items: ['TCP/IP, Routing & Switching', 'VLANs & Network Security'], tags: ['Cisco (CCNA)', 'DNS/DHCP', 'VPN Config', 'Packet Tracer'] },
        { header: 'Cybersecurity', items: ['Vulnerability Assessment & Audit', 'Network Traffic Analysis'], tags: ['CEH', 'Nmap Scanning', 'Wireshark', 'Security Policies'] },
        { header: 'Cloud & IT Support', items: ['IT Support & Troubleshooting', 'Cloud Operations (AWS)'], tags: ['AWS Certified', 'Hardware Diagnostics', 'User Helpdesk', 'SLA Management'] }
      ]
    },
    experience: {
      heading: 'My <span>Experience</span>',
      items: [
        { title: 'Software Engineer', org: 'ENG-DERMAN (Remote • Present)', desc: 'Architecting and developing cutting-edge software solutions, enterprise web applications, and scalable digital platforms with clean architecture and modern technologies.' },
        { title: 'Software Engineer', org: 'Mansoura National University', desc: 'Developed and maintained internal university web systems, optimized SQL databases for academic portals, and automated administrative workflows to enhance digital operations.' },
        { title: 'IT Engineer & System Admin', org: 'Intilaq Group - IG (FEB 2024 - Present)', desc: 'Developed and managed 5+ enterprise systems at IG (Intilaq Group) — including ERP, Ibn Al-Haitham, LMS, Al-Zahraa, and Ibn Sina. Provided technical support for 300+ users, optimized reliability, and maintained high availability.' }
      ]
    },
    education: {
      heading: 'My <span>Education</span>',
      cards: [
        { date: "Master's Degree &bull; Sep 2026 - Present", title: "Master's in Information Security", org: 'Mansoura University', desc: "Advanced postgraduate master's research and academic studies specializing in information security architectures, threat intelligence, advanced cryptography, and zero-trust security frameworks.", tags: ['Sep 2026 - Present', 'Information Security', 'Zero Trust Architecture', 'Advanced Cryptography', 'Threat Intelligence'] },
        { date: 'Postgraduate Studies &bull; Jan 2026', title: 'Postgraduate Professional Diploma in Information Security', org: 'Mansoura University', desc: 'Graduated with <strong>84% Grade (Very Good High - جيد جداً مرتفع)</strong>, specializing in information security, vulnerability assessment, threat analysis, system security hardening, digital forensics, and organizational security and protection.', tags: ['Grade: 84% (Very Good High)', 'Vulnerability Assessment', 'Threat Analysis', 'System Hardening', 'Digital Forensics', 'Organizational Protection'] },
        { date: 'Undergraduate &bull; Jan 2023', title: "Bachelor's Degree in Information Systems", org: 'Mansoura University', desc: 'Graduated with <strong>90% Grade (Excellent with Honors)</strong>, specializing in Information Systems, software development, database systems, and core system architecture.', tags: ['Grade: 90% (Honors)', 'Information Systems', 'Software Development', 'Database Systems', 'System Architecture'] }
      ]
    },
    projects: {
      heading: 'Featured <span>Projects</span>',
      cards: [
        { title: 'MNU DATA CENTER - Preliminary Acceptance & Handover', desc: 'State-of-the-art enterprise MNU DATA CENTER preliminary handover — featuring high-density server rack deployment, smart HVAC precision cooling, dual-bus UPS power redundancy, optical fiber backbones, and zero-trust security infrastructure.', tags: ['#DataCenter', '#ServerRacks', '#PrecisionCooling', '#UPS_Power', '#FiberOptics', '#ZeroTrust'], alt: 'MNU DATA CENTER Preliminary Acceptance & Handover' },
        { title: 'ERP System Support & Optimization', desc: 'Streamlined ERP operations, improved database response times, and implemented secure access controls for enterprise users.', tags: ['Windows Server', 'SQL', 'ERP'], alt: 'ERP System Support' },
        { title: 'Network Troubleshooting Lab', desc: 'Designed and simulated complex network topologies using Cisco Packet Tracer to test routing protocols and VLAN configurations.', tags: ['Cisco', 'VLANs', 'Routing'], alt: 'Network Troubleshooting Lab' },
        { title: 'New Students Welcome Event', desc: 'Welcoming new students and introducing them to the university community, academic life, and available student services.', tags: ['Student Welcome', 'University Event', 'Mansoura National University'], alt: 'New Students Welcome Event' }
      ]
    },
    datacenter: {
      kicker: 'MNU DATA CENTER | Commissioning & Handover',
      title: 'MNU DATA CENTER - Preliminary Acceptance & Handover',
      intro: '<p> <strong>Major Milestone Achieved: Preliminary Handover of the State-of-the-Art MNU DATA CENTER!</strong> </p><p>I am thrilled to announce the successful completion and preliminary acceptance of our new enterprise-grade MNU DATA CENTER facility. This critical milestone represents months of meticulous engineering, infrastructure deployment, and rigorous testing to build a robust, scalable, and highly available core foundation.</p><p> <strong>Key Infrastructure & Technical Highlights:</strong></p><ul><li> <strong>Rack Deployment & Cabling Excellence:</strong> High-density rack enclosures with structured cable routing, optical fiber backbones, and color-coded patch panels for optimal thermal management.</li><li> <strong>Precision Cooling & Environmental Control:</strong> Smart HVAC precision cooling units maintaining strict humidity and temperature thresholds for peak server efficiency.</li><li> <strong>Power Redundancy & UPS Systems:</strong> Dual-bus power distribution, redundant UPS battery banks, and automatic transfer switches ensuring 99.999% uptime reliability.</li><li> <strong>Zero-Trust Security & Access Control:</strong> Multi-factor physical access control, biometric authentication, and 24/7 CCTV surveillance integration.</li><li> <strong>Site Acceptance Testing (SAT):</strong> Rigorous load testing, thermal imaging audits, and seamless emergency power cutover simulations.</li></ul><p>Deep gratitude to the engineering teams, contractors, and leadership whose collaborative dedication made this milestone possible. Ready to power the next generation of digital services! </p>'
    },
    research: {
      heading: 'Scientific <span>Research</span>',
      title: 'Securing Generative AI Applications Using Zero Trust Architecture',
      badge: 'First documented scientific research on using Zero Trust in university e-learning systems.',
      desc: 'A comprehensive security framework designed for protecting sensitive data, identity credentials, and GenAI models in Higher Education Institutions.',
      cyberHeading: 'Cybersecurity Pillars & Architecture Details',
      cyberFeat1Title: 'Zero Trust Architecture (Never Trust, Always Verify)',
      cyberFeat1Desc: 'Enforces continuous identity authentication, explicit verification for every API request, and minimal privilege access (Least Privilege) across all e-learning platforms.',
      cyberFeat2Title: 'GenAI & LLM Threat Mitigation',
      cyberFeat2Desc: 'Comprehensive defense against Prompt Injection, Data Poisoning, Model Inversion, and unauthorized data leakage in Generative AI workflows.',
      cyberFeat3Title: 'Micro-Segmentation & Network Isolation',
      cyberFeat3Desc: 'Isolates AI processing engines and confidential university databases to prevent lateral movement and contain potential security breaches.',
      cyberFeat4Title: 'Data Privacy & End-to-End Encryption',
      cyberFeat4Desc: 'Implements robust E2EE for data at rest and in transit, combined with Attribute-Based Access Control (ABAC) for sensitive student and faculty records.',
      cards: [
        { date: 'July 9, 2026', title: 'Faculty of Computers & Information Sciences — Mansoura University', category: 'Research' },
        { date: 'July 26, 2026', title: 'Zero Trust Architecture Research Title Slide', category: 'Research' },
        { date: 'July 25, 2026', title: 'Zero Trust Architecture Security Infographic', category: 'Security' },
        { date: 'July 24, 2026', title: 'Research Discussion with Supervisors & Committee', category: 'Academic' },
        { date: 'July 23, 2026', title: 'Research Presentation & Discussion Group', category: 'Event' },
        { date: 'July 22, 2026', title: 'Academic Discussion Ceremony Photo', category: 'Ceremony' }
      ]
    },
    videos: {
      heading: 'Action <span>Demos</span>',
      cards: [{ title: 'Network Setup Demo' }, { title: 'Cybersecurity Tools in Action' }]
    },
    certifications: {
      heading: 'Licenses & <span>Certifications</span>',
      viewBtn: 'View Certificate',
      cards: [
        { title: 'CEH', desc: 'Certified Ethical Hacker (Cisco Academy)' },
        { title: 'CCNA', desc: 'Routing & Switching (Cisco Academy)' },
        { title: 'Red Hat', desc: 'System Administration (Mahara-Tech)' },
        { title: 'AWS Cloud & ML', desc: 'Machine Learning & Cloud Fundamentals' },
        { title: 'Python Programming', desc: 'DEPI Certification' },
        { title: 'Linux Essentials', desc: 'Cisco Networking Academy' },
        { title: 'Cybersecurity', desc: 'Introduction to Cybersecurity (Cisco)' }
      ]
    },
    contact: {
      heading: 'Contact <span>Me</span>',
      items: [
        { label: 'Personal Email', value: 'mohamedhamedsallam14@gmail.com' },
        { label: 'Professional Email', value: 'mohamed@mohamedsallam.dev' },
        { label: 'Mansoura University', value: 'mhamedsallam@mans.edu.eg' },
        { label: 'Mansoura National Univ.', value: 'eng.mohamedsallam@mansnu.edu.eg' },
        { label: 'Phone', value: '01065401273' },
        { label: 'Location', value: 'Mansoura, Egypt' }
      ],
      form: { title: 'Send Message', placeholders: ['Full Name', 'Email Address', 'Subject / Topic', 'Your Message...'], button: 'Send Message' }
    },
    stats: {
      visits: 'Total Visitors',
      likes: 'Website Likes',
      likeBtn: 'Like Site',
      likedBtn: 'Liked',
      status: 'System Status',
      statusOnline: 'Online',
      systemStatus: 'Active System',
      live: 'Live',
      rating: 'User Rating',
      toastLiked: 'Thank you for liking the site.',
      toastUnliked: 'Like removed.'
    },
    footer: 'Copyright &copy;| All Rights Reserved by ENG Mohamed Hamed Sallam.',
    typed: ['a Software Engineer', 'a Full Stack Developer', 'an IT Specialist'],
    labels: { langSelect: 'Select Language', themeToggle: 'Toggle Theme', menuToggle: 'Toggle Menu' },
    languageOptions: { en: 'English', ar: 'Arabic', ru: 'Russian' },
    images: { profile: 'Mohamed Hamed Sallam Profile', engDerman: 'ENG-DERMAN Software Solutions Logo', mnu: 'Mansoura National University Logo', intilaq: 'Intilaq Group (IG) Logo', projectErp: 'ERP System Support', projectNetwork: 'Network Troubleshooting Lab', projectCyber: 'New Students Welcome Event', researchMain: 'Research commemorative photo - Mansoura University Faculty of Computers and Information Sciences' }
  },
  ar: {
    meta: { title: 'محمد حامد سلام | مهندس برمجيات', description: 'ملف محمد حامد محمد سلام، مهندس برمجيات.' },
    logo: 'المهندس محمد سلام',
    nav: {
      home: 'الرئيسية',
      training: 'تدريب',
      training_zahraa: 'تدريب نظام الزهراء',
      training_erp: 'تدريب نظام ERP HR',
      training_erp_finance: 'تدريب نظام ERP المالية',
      training_web: 'تدريب موقع المبرمجين',
      more: 'المزيد',
      about: 'عني',
      skills: 'المهارات',
      experience: 'الخبرات',
      education: 'التعليم',
      projects: 'المشاريع',
      research: 'البحث العلمي',
      certifications: 'الشهادات',
      videos: 'عروض توضيحية',
      datacenter: 'الاستلام المبدئي لـ MNU DATA CENTER',
      contact: 'تواصل معي'
    },
    hero: { greeting: 'مرحباً، أنا', titlePrefix: 'وأنا', description: 'بناء برمجيات قوية، وتطبيقات ويب حديثة، وتجارب مستخدم سلسة. تم تطبيق نموذج "Zero Trust" في الأنظمة لأول مرة؛ بالإضافة إلى تطوير العديد من الأنظمة في الجامعات الحكومية بدمج أفضل معايير الأمن السيبراني.', download: 'تحميل السيرة الذاتية', contact: 'تواصل معي' },
    training: {
      heading: 'تدريب <span>النظام</span>',
      kicker: 'تدريب الموظفين على السيستم',
      title: 'تفعيل نظام الزهراء بعد التحديث الجديد لجامعة المنصورة الأهلية',
      intro: 'صور من تدريب الموظفين على السيستم لتفعيل نظام الزهراء بعد التحديث الجديد لجامعة المنصورة الأهلية.',
      cards: [
        'جلسة تدريبية 1',
        'جلسة تدريبية 2',
        'جلسة تدريبية 3',
        'جلسة تدريبية 4',
        'جلسة تدريبية 5',
        'جلسة تدريبية 6',
        'جلسة تدريبية 7',
        'جلسة تدريبية 8',
        'جلسة تدريبية 9'
      ]
    },
    trainingHr: {
      kicker: 'التدريب على نظام ERPNext',
      title: 'دورة تدريب الموارد البشرية HR على نظام الـ ERP',
      intro: '<p>لقد نجحنا في تقديم برنامج تدريبي شامل للمديرين والموظفين في أقسام الموارد البشرية والمالية والإدارية على نظام ERPNext.</p><p>شمل التدريب الوحدات الأساسية للموارد البشرية (HR)، بما في ذلك إدارة الرواتب للموظفين الإداريين، وأعضاء هيئة التدريس، وجميع منسوبي الجامعة. كما تضمن التدريب تطبيق أنظمة الحضور والانصراف وبصمة الإصبع، إلى جانب أدوات إعداد التقارير المتقدمة المصممة خصيصاً لدعم اتخاذ القرار على المستوى التنفيذي.</p><p>إن نظام ERPNext هو أكثر من مجرد نظام للموارد البشرية - فهو منصة متكاملة تماماً مصممة لإدارة جميع العمليات التنظيمية بكفاءة. ويتميز بواجهته سهلة الاستخدام، ومرونته العالية، وقابليته للتخصيص وفقاً لاحتياجات كل مؤسسة. يوفر النظام رؤى مباشرة عبر جميع الأقسام، مما يتيح اتخاذ قرارات استراتيجية أسرع وأكثر ذكاءً، ويقلل الأخطاء التشغيلية، ويزيد الإنتاجية، ويربط جميع الأقسام بسلاسة داخل نظام واحد موحد يدعم التحول الرقمي الحقيقي.</p>',
      cards: [
        'جلسة تدريب الـ ERP الموارد البشرية 1',
        'جلسة تدريب الـ ERP الموارد البشرية 2',
        'جلسة تدريب الـ ERP الموارد البشرية 3',
        'جلسة تدريب الـ ERP الموارد البشرية 4',
        'جلسة تدريب الـ ERP الموارد البشرية 5',
        'جلسة تدريب الـ ERP الموارد البشرية 6',
        'جلسة تدريب الـ ERP الموارد البشرية 7',
        'جلسة تدريب الـ ERP الموارد البشرية 8',
        'جلسة تدريب الـ ERP الموارد البشرية 9',
        'جلسة تدريب الـ ERP الموارد البشرية 10',
        'جلسة تدريب الـ ERP الموارد البشرية 11',
        'جلسة تدريب الـ ERP الموارد البشرية 12',
        'جلسة تدريب الـ ERP الموارد البشرية 13',
        'جلسة تدريب الـ ERP الموارد البشرية 14'
      ]
    },
    about: {
      heading: 'نبذة <span>عني</span>',
      title: 'مهندس برمجيات ومتخصص متعدد المجالات',
      intro: 'التكنولوجيا بالنسبة لي لم تكن مجرد وظيفة، بل شغف يدفعني للتعلم والبناء والابتكار باستمرار. بدأت رحلتي بدافع قوي لفهم كيف تعمل التقنية من الداخل، ثم تطورت إلى خبرة متعددة المجالات تجمع بين <strong>الهندسة</strong> و<strong>البنية التحتية</strong> و<strong>الأمن</strong> و<strong>التصميم</strong> بسلاسة.',
      cards: [
        { title: 'هندسة البرمجيات', text: 'بناء تطبيقات حديثة وقابلة للتوسع وعالية الأداء، مع بنية نظيفة وتركيز قوي على تجربة المستخدم وقابلية الصيانة والأمان.' },
        { title: 'البنية التحتية والأنظمة', text: 'خلفية عملية في دعم تقنية المعلومات وإدارة الأنظمة، تشمل إدارة خوادم Windows/Linux وبنية الشبكات وموثوقية الأنظمة.' },
        { title: 'التصميم وهوية العلامة', text: 'إنشاء أكثر من <strong>1200+ تصميم احترافي</strong> بما يشمل الهويات البصرية والشعارات والحملات التسويقية والأصول الرقمية للشركات والجامعات.' },
        { title: 'الأمن والاستراتيجية', text: 'دمج أفضل ممارسات الأمان في بنية البرمجيات، وفهم كيف تحمي البنية التحتية والخوادم والأمن السيبراني الأنظمة الواقعية.' }
      ],
      badges: ['مهندس برمجيات', 'مطور Full-Stack', 'مدير أنظمة', 'أخصائي تقنية معلومات', 'مصمم جرافيك', 'مهتم بالأمن السيبراني'],
      quote: 'نبني التقنية بالمنطق، ونؤمنها بالمعرفة، ونحييها بالتصميم.',
      counters: ['سنوات الخبرة', 'تصميم تم إنشاؤه', 'أنظمة مدعومة', 'مستخدم تم التعامل معه']
    },
    skills: {
      heading: '<span>مهاراتي</span>',
      cards: [
        { header: 'الأنظمة والبنية التحتية', items: ['إدارة الأنظمة (Windows/Linux)', 'Active Directory و GPO'], tags: ['Windows Server', 'RedHat Linux', 'الافتراضية', 'أنظمة النسخ الاحتياطي'] },
        { header: 'الشبكات والأجهزة', items: ['TCP/IP والتوجيه والتبديل', 'VLANs وأمن الشبكات'], tags: ['Cisco (CCNA)', 'DNS/DHCP', 'إعداد VPN', 'Packet Tracer'] },
        { header: 'الأمن السيبراني', items: ['تقييم الثغرات والتدقيق', 'تحليل حركة الشبكة'], tags: ['CEH', 'فحص Nmap', 'Wireshark', 'سياسات الأمان'] },
        { header: 'السحابة ودعم تقنية المعلومات', items: ['دعم تقنية المعلومات وحل المشكلات', 'عمليات السحابة (AWS)'], tags: ['AWS معتمد', 'تشخيص العتاد', 'مكتب خدمة المستخدمين', 'إدارة SLA'] }
      ]
    },
    experience: {
      heading: '<span>خبراتي المهنية</span>',
      items: [
        { title: 'مهندس برمجيات (Software Engineer)', org: 'شركة ENG-DERMAN (عن بُعد • حتى الآن)', desc: 'تطوير وهندسة البرمجيات وحلول الويب المتطورة، وبناء تطبيقات وأنظمة برمجية قابلة للتوسع بأعلى معايير الأداء وهندسة البرمجيات الحديثة.' },
        { title: 'مهندس برمجيات', org: 'جامعة المنصورة الأهلية', desc: 'تطوير وصيانة الأنظمة الداخلية للجامعة، وتحسين قواعد بيانات SQL للبوابات الأكاديمية، وأتمتة المهام الإدارية لتحسين العمل الرقمي.' },
        { title: 'مهندس تقنية معلومات ومدير أنظمة', org: 'مجموعة انطلاق - IG (فبراير 2024 - حتى الآن)', desc: 'تطوير وإدارة أكثر من 5 أنظمة مؤسسية متكاملة في IG (مجموعة انطلاق) تشمل: نظام الـ ERP، ابن الهيثم، LMS، الزهراء، وابن سينا، مع تقديم الدعم الفني لأكثر من 300 مستخدم وضمان استمرارية وكفاءة التشغيل.' }
      ]
    },
    education: {
      heading: '<span>تعليمي</span>',
      cards: [
        { date: 'درجة الماجستير &bull; سبتمبر 2026 - حتى الآن', title: 'ماجستير في أمن المعلومات', org: 'جامعة المنصورة', desc: 'دراسات عليا وبحوث أكاديمية متقدمة في مرحلة الماجستير متخصصة في أمن المعلومات، استخبارات التهديدات السيبرانية، التشفير المتقدم، وبنية انعدام الثقة (Zero Trust).', tags: ['سبتمبر 2026 - حتى الآن', 'أمن المعلومات', 'بنية Zero Trust', 'التشفير المتقدم', 'استخبارات التهديدات'] },
        { date: 'دراسات عليا &bull; يناير 2026', title: 'دبلوم مهني دراسات عليا في أمن المعلومات', org: 'جامعة المنصورة', desc: 'تخرجت بتقدير <strong>جيد جداً مرتفع بنسبة 84%</strong>، مع تخصص دقيق في أمن المعلومات، تقييم الثغرات، تحليل التهديدات، تقوية أمن الأنظمة، الأدلة الجنائية الرقمية، وأمن وحماية المؤسسات.', tags: ['الدرجة: 84% (جيد جداً مرتفع)', 'تقييم الثغرات', 'تحليل التهديدات', 'تقوية الأنظمة', 'الأدلة الجنائية الرقمية', 'حماية المؤسسات'] },
        { date: 'مرحلة البكالوريوس &bull; يناير 2023', title: 'بكالوريوس نظم معلومات', org: 'جامعة المنصورة', desc: 'تخرجت بدرجة <strong>90% (امتياز مع مرتبة الشرف)</strong> مع تخصص في نظم المعلومات، تطوير البرمجيات، أنظمة قواعد البيانات، وبنية الأنظمة الأساسية.', tags: ['الدرجة: 90% (شرف)', 'نظم المعلومات', 'تطوير البرمجيات', 'قواعد البيانات', 'بنية الأنظمة'] }
      ]
    },
    projects: {
      heading: '<span>مشاريع مميزة</span>',
      cards: [
        { title: 'الاستلام المبدئي لـ MNU DATA CENTER', desc: 'الاستلام المبدئي والتجهيز الفني لمركز البيانات الرئيسي MNU DATA CENTER، شاملاً كبائن الخوادم عالية الكثافة، التبريد الدقيق HVAC، أنظمة طوارئ الطاقة UPS، شبكة الألياف الضوئية، وأمن المحيط بنظام انعدام الثقة.', tags: ['#داتا_سنتر', '#كبائن_الخوادم', '#التبريد_الدقيق', '#طاقة_UPS', '#ألياف_ضوئية', '#ZeroTrust'], alt: 'الاستلام المبدئي لـ MNU DATA CENTER' },
        { title: 'دعم وتحسين نظام ERP', desc: 'تبسيط عمليات ERP، وتحسين زمن استجابة قاعدة البيانات، وتطبيق ضوابط وصول آمنة للمستخدمين داخل المؤسسة.', tags: ['Windows Server', 'SQL', 'ERP'], alt: 'دعم نظام ERP' },
        { title: 'مختبر استكشاف أعطال الشبكات', desc: 'تصميم ومحاكاة هياكل شبكات معقدة باستخدام Cisco Packet Tracer لاختبار بروتوكولات التوجيه وإعدادات VLAN.', tags: ['Cisco', 'VLANs', 'Routing'], alt: 'مختبر أعطال الشبكات' },
        { title: 'فعالية استقبال الطلبة الجدد', desc: 'استقبال الطلبة الجدد وتعريفهم بالمجتمع الجامعي والحياة الأكاديمية والخدمات المتاحة داخل الجامعة.', tags: ['استقبال الطلبة', 'فعالية جامعية', 'جامعة المنصورة الأهلية'], alt: 'فعالية استقبال الطلبة الجدد' }
      ]
    },
    datacenter: {
      kicker: 'تسليم وتجهيز MNU DATA CENTER',
      title: 'الاستلام المبدئي لمركز البيانات الرئيسي (MNU DATA CENTER)',
      intro: '<p> <strong>إنجاز هام: الاستلام المبدئي لمركز البيانات الرئيسي (MNU DATA CENTER)!</strong> </p><p>أعلن بكل فخر عن إتمام الاستلام المبدئي والفحص الفني لمركز البيانات الرئيسي (MNU DATA CENTER). يمثل هذا الإنجاز محطة مفصلية توجت شهوراً من العمل الهندسي الدقيق، وتجهيز البنية التحتية، والاختبارات المكثفة لبناء بيئة عالية الاعتمادية والأداء.</p><p> <strong>أبرز المقومات والتجهيزات الفنية:</strong></p><ul><li> <strong>تركيب الكبائن وتنظيم الكابلات:</strong> تجهيز الكبائن عالية الكثافة مع تنظيم واحترافي لكابلات الفايبر والإيثرنت لضمان سلاسة التبريد وسهولة الصيانة.</li><li> <strong>أنظمة التبريد الدقيق (Precision Cooling):</strong> تفعيل وحدات التبريد الذكية للتحكم بالحرارة والرطوبة بأعلى درجات الكفاءة.</li><li> <strong>الاستمرارية وتأمين الطاقة (UPS):</strong> شبكة توزيع طاقة مزدوجة ومولدات طاقة احتياطية تضمن استمرارية التشغيل دون أي انقطاع.</li><li> <strong>الأمن والحماية:</strong> تطبيق منظومة وصول آمنة، وتكامل كاميرات المراقبة، وأنظمة إنذار وإطفاء الحريق المتطورة.</li><li> <strong>اختبارات الاستلام الفني (SAT):</strong> إجراء اختبارات الأحمال والفحص الحراري للتأكد من جاهزية المركز للعمل بكفاءة كاملة.</li></ul><p>كل الشكر والتقدير لفرق العمل والمهندسين والإدارة على جهودهم المخلصة لإنجاز هذا المشروع القومي. </p>'
    },
    research: {
      heading: 'البحث <span>العلمي</span>',
      title: 'تأمين تطبيقات الذكاء الاصطناعي التوليدي باستخدام بنية "انعدام الثقة" (Zero Trust)',
      badge: 'أول بحث علمي موثق في استخدام Zero Trust في الأنظمة الخاصة بالتعليم الإلكتروني بالجامعات',
      desc: 'إطار عمل متكامل لحماية البيانات الحساسة والهويات وبنية نماذج الذكاء الاصطناعي التوليدي في مؤسسات التعليم العالي.',
      cyberHeading: 'محاور وتفاصيل الأمن السيبراني في البحث',
      cyberFeat1Title: 'بنية انعدام الثقة (Zero Trust Architecture)',
      cyberFeat1Desc: 'تطبيق مبدأ التحقق المستمر (Never Trust, Always Verify) للتحقق من هوية المستخدمين وصلاحيات كل طلب برلمجي (API) ومنع الوصول غير المصرح به.',
      cyberFeat2Title: 'الحماية من تهديدات الذكاء الاصطناعي التوليدي (GenAI)',
      cyberFeat2Desc: 'التصدّي لهجمات Prompt Injection وتسميم البيانات (Data Poisoning) واستخراج النماذج والتسريب غير المصرح به للبيانات الحساسة.',
      cyberFeat3Title: 'تجزئة الشبكة والحماية الحصرية (Micro-Segmentation)',
      cyberFeat3Desc: 'عزل محركات معالجة الذكاء الاصطناعي وقواعد البيانات عن بقية الشبكة لمنع الحركة الجانبية للمخترقين وتقليل نطاق التأثير.',
      cyberFeat4Title: 'تشفير البيانات وحماية الخصوصية (Data Privacy & E2EE)',
      cyberFeat4Desc: 'تطبيق التشفير الشامل للبيانات أثناء التخزين والنقل، وتحديد صلاحيات الوصول الدقيقة (ABAC) لسجلات الطلاب وأعضاء هيئة التدريس.',
      cards: [
        { date: '٩ يوليو ٢٠٢٦', title: 'كلية الحاسبات والمعلومات — جامعة المنصورة', category: 'البحث العلمي' },
        { date: '٢٦ يوليو ٢٠٢٦', title: 'شريحة عنوان البحث: تأمين تطبيقات الذكاء الاصطناعي التوليدي', category: 'البحث العلمي' },
        { date: '٢٥ يوليو ٢٠٢٦', title: 'مخطط بنية انعدام الثقة لتأمين البيانات (Infographic)', category: 'الأمن السيبراني' },
        { date: '٢٤ يوليو ٢٠٢٦', title: 'مناقشة البحث العلمي مع المشرفين واللجنة الأكاديمية', category: 'مناقشة علمية' },
        { date: '٢٣ يوليو ٢٠٢٦', title: 'عرض تقديمي جماعي لمناقشة تطبيقات الذكاء الاصطناعي', category: 'فعالية' },
        { date: '٢٢ يوليو ٢٠٢٦', title: 'صورة تذكارية للجنة المناقشة والحضور بالكلية', category: 'حفل تخرج' }
      ]
    },
    videos: {
      heading: 'عروض <span>توضيحية</span>',
      cards: [{ title: 'عرض إعداد الشبكة' }, { title: 'أدوات الأمن السيبراني في العمل' }]
    },
    certifications: {
      heading: 'الرخص <span>والشهادات</span>',
      viewBtn: 'عرض الشهادة',
      cards: [
        { title: 'CEH', desc: 'شهادة الهكر الأخلاقي المعتمد (أكاديمية سيسكو)' },
        { title: 'CCNA', desc: 'توجيه وتبديل الشبكات (أكاديمية سيسكو)' },
        { title: 'Red Hat', desc: 'إدارة الأنظمة (مهارة تك)' },
        { title: 'AWS Cloud & ML', desc: 'أساسيات السحابة وتعلم الآلة' },
        { title: 'Python Programming', desc: 'برمجة بايثون (شهادة DEPI)' },
        { title: 'Linux Essentials', desc: 'أساسيات لينكس (أكاديمية سيسكو)' },
        { title: 'Cybersecurity', desc: 'مقدمة في الأمن السيبراني (سيسكو)' }
      ]
    },
    contact: {
      heading: 'تواصل <span>معي</span>',
      items: [
        { label: 'البريد الإلكتروني الشخصي', value: 'mohamedhamedsallam14@gmail.com' },
        { label: 'البريد الإلكتروني المهني', value: 'mohamed@mohamedsallam.dev' },
        { label: 'جامعة المنصورة', value: 'mhamedsallam@mans.edu.eg' },
        { label: 'جامعة المنصورة الأهلية', value: 'eng.mohamedsallam@mansnu.edu.eg' },
        { label: 'الهاتف', value: '01065401273' },
        { label: 'الموقع', value: 'المنصورة، مصر' }
      ],
      form: { title: 'أرسل رسالة', placeholders: ['الاسم الكامل', 'البريد الإلكتروني', 'الموضوع', 'رسالتك...'], button: 'إرسال الرسالة' }
    },
    stats: {
      visits: 'إجمالي الزيارات',
      likes: 'إعجابات بالموقع',
      likeBtn: 'إعجاب بالموقع',
      likedBtn: 'تم الإعجاب',
      status: 'حالة النظام',
      statusOnline: 'متصل',
      systemStatus: 'نظام نشط',
      live: 'مباشر',
      rating: 'تقييم الزوار',
      toastLiked: 'شكراً لتسجيل إعجابك بالموقع.',
      toastUnliked: 'تم إلغاء الإعجاب.'
    },
    footer: 'جميع الحقوق محفوظة &copy;| للمهندس محمد حامد سلام.',
    typed: ['مهندس برمجيات', 'مطور Full Stack', 'أخصائي تقنية معلومات'],
    labels: { langSelect: 'اختر اللغة', themeToggle: 'تبديل المظهر', menuToggle: 'تبديل القائمة' },
    languageOptions: { en: 'الإنجليزية', ar: 'العربية', ru: 'الروسية' },
    images: { profile: 'صورة محمد حامد سلام الشخصية', engDerman: 'شعار شركة ENG-DERMAN للحلول البرمجية', mnu: 'شعار جامعة المنصورة الأهلية', intilaq: 'شعار مجموعة انطلاق (IG)', projectErp: 'دعم نظام ERP', projectNetwork: 'مختبر استكشاف أعطال الشبكات', projectCyber: 'فحص الأمن السيبراني', researchMain: 'صورة تذكارية للبحث - كلية الحاسبات والمعلومات جامعة المنصورة' }
  },
  ru: {
    meta: { title: 'Мохамед Хамед Саллам | Инженер-программист', description: 'Портфолио Мохамеда Хамеда Мохамеда Саллама, инженера-программиста.' },
    logo: 'ИНЖ. МОХАМЕД САЛЛАМ',
    nav: {
      home: 'Главная',
      training: 'Обучение',
      training_zahraa: 'Обучение системе Al-Zahraa',
      training_erp: 'Обучение ERP HR-системе',
      training_erp_finance: 'Обучение финансовой ERP',
      training_web: 'Обучение сайту программистов',
      more: 'Ещё',
      about: 'Обо мне',
      skills: 'Навыки',
      experience: 'Опыт',
      education: 'Образование',
      projects: 'Проекты',
      research: 'Исследования',
      certifications: 'Сертификаты',
      videos: 'Демо',
      datacenter: 'MNU DATA CENTER',
      contact: 'Контакты'
    },
    hero: { greeting: 'Привет, я', titlePrefix: 'И я', description: 'Разработка надежного программного обеспечения, современных веб-приложений и удобных интерфейсов. Впервые внедрена модель «Zero Trust»; также разработаны многочисленные системы для государственных университетов с интеграцией передовых мер кибербезопасности.', download: 'Скачать CV', contact: 'Связаться со мной' },
    training: {
      heading: 'Обучение <span>системе</span>',
      kicker: 'Обучение сотрудников работе с системой',
      title: 'Активация системы Al-Zahraa после нового обновления для Частного университета Мансуры',
      intro: 'Фотографии с обучения сотрудников работе с системой для активации Al-Zahraa после нового обновления для Частного университета Мансуры.',
      cards: [
        'Учебная сессия 1',
        'Учебная сессия 2',
        'Учебная сессия 3',
        'Учебная сессия 4',
        'Учебная сессия 5',
        'Учебная сессия 6',
        'Учебная сессия 7',
        'Учебная сессия 8',
        'Учебная сессия 9'
      ]
    },
    trainingHr: {
      kicker: 'Обучение HR в ERPNext',
      title: 'Обучение отдела кадров (HR) работе с ERP-системой',
      intro: '<p>Мы успешно провели комплексную программу обучения для руководителей и сотрудников отделов кадров, финансов и администрирования по работе с ERPNext.</p><p>Обучение охватило основные модули управления персоналом, включая расчет заработной платы для административного персонала, преподавателей и всех сотрудников университета. Оно также включало внедрение систем учета рабочего времени и сканирования отпечатков пальцев, а также передовых инструментов отчетности, адаптированных для поддержки принятия решений на уровне руководства.</p><p>ERPNext — это больше, чем просто HR-система: это полностью интегрированная платформа, разработанная для эффективного управления всеми операциями организации. Она отличается удобным интерфейсом, высокой гибкостью и возможностью кастомизации под нужды каждой организации, позволяя принимать быстрые стратегические решения, сокращая операционные ошибки, повышая производительность и объединяя все отделы в единую систему, которая действительно поддерживает цифровую трансформацию.</p>',
      cards: [
        'Сессия ERP HR 1',
        'Сессия ERP HR 2',
        'Сессия ERP HR 3',
        'Сессия ERP HR 4',
        'Сессия ERP HR 5',
        'Сессия ERP HR 6',
        'Сессия ERP HR 7',
        'Сессия ERP HR 8',
        'Сессия ERP HR 9',
        'Сессия ERP HR 10',
        'Сессия ERP HR 11',
        'Сессия ERP HR 12',
        'Сессия ERP HR 13',
        'Сессия ERP HR 14'
      ]
    },
    about: {
      heading: 'Обо <span>мне</span>',
      title: 'Инженер-программист и многопрофильный специалист',
      intro: 'Технологии для меня никогда не были просто работой — это увлечение, которое побуждает меня постоянно учиться, создавать и развиваться. Мой путь начался с сильного интереса к тому, как технологии работают изнутри, и вырос в междисциплинарную экспертизу, которая органично объединяет <strong>инженерию</strong>, <strong>инфраструктуру</strong>, <strong>безопасность</strong> и <strong>дизайн</strong>.',
      cards: [
        { title: 'Обучение сотрудников работе с системами', text: 'Проведение практических тренингов для сотрудников и преподавателей по работе с ERP-системами, Ибн Аль-Хайсам и LMS.' },
        { title: 'Разработка ПО', text: 'Создание современных, масштабируемых и высокопроизводительных приложений с чистой архитектурой и сильным фокусом на пользовательский опыт, поддержку и безопасность.' },
        { title: 'Инфраструктура и системы', text: 'Практический опыт в поддержке IT и администрировании систем — управление корпоративными Windows/Linux-серверами, сетевой архитектурой и надежностью систем.' },
        { title: 'Дизайн и бренд', text: 'Создано более <strong>1200+ профессиональных дизайнов</strong>, включая айдентику, логотипы, маркетинговые кампании и цифровые материалы для компаний и университетов.' },
        { title: 'Безопасность и стратегия', text: 'Встраивание лучших практик безопасности в архитектуру ПО и понимание того, как инфраструктура, серверы и кибербезопасность защищают реальные системы.' }
      ],
      badges: ['Инструктор по системам', 'Инженер-программист', 'Full-Stack разработчик', 'Системный администратор', 'IT-специалист', 'Графический дизайнер', 'Энтузиаст кибербезопасности'],
      quote: 'Создаю технологии с логикой, защищаю их знанием и оживляю дизайном.',
      counters: ['Лет опыта', 'Создано дизайнов', 'Поддержано систем', 'Пользователей обслужено']
    },
    skills: {
      heading: '<span>Мои навыки</span>',
      cards: [
        { header: 'Системы и инфраструктура', items: ['Администрирование систем (Windows/Linux)', 'Active Directory и GPO'], tags: ['Windows Server', 'RedHat Linux', 'Виртуализация', 'Системы резервного копирования'] },
        { header: 'Сети и оборудование', items: ['TCP/IP, маршрутизация и коммутация', 'VLAN и сетевая безопасность'], tags: ['Cisco (CCNA)', 'DNS/DHCP', 'Настройка VPN', 'Packet Tracer'] },
        { header: 'Кибербезопасность', items: ['Оценка уязвимостей и аудит', 'Анализ сетевого трафика'], tags: ['CEH', 'Сканирование Nmap', 'Wireshark', 'Политики безопасности'] },
        { header: 'Облако и IT-поддержка', items: ['IT-поддержка и устранение неполадок', 'Облачные операции (AWS)'], tags: ['AWS Certified', 'Диагностика оборудования', 'Служба поддержки', 'Управление SLA'] }
      ]
    },
    experience: {
      heading: '<span>Опыт</span>',
      items: [
        { title: 'Инженер-программист (Software Engineer)', org: 'ENG-DERMAN (Удаленно • Настоящее время)', desc: 'Проектирование и разработка передовых программных решений, корпоративных веб-приложений и масштабируемых цифровых платформ с использованием современных технологий.' },
        { title: 'Инженер-программист', org: 'Национальный университет Мансуры', desc: 'Разрабатывал и поддерживал внутренние веб-системы университета, оптимизировал базы данных SQL для академических порталов и автоматизировал административные процессы.' },
        { title: 'IT-инженер и системный администратор', org: 'Intilaq Group - IG (ФЕВ 2024 - настоящее время)', desc: 'Разработал и управлял более чем 5 корпоративными системами в IG (Intilaq Group) — включая ERP, Ibn Al-Haitham, LMS, Al-Zahraa и Ibn Sina. Техническая поддержка более 300 пользователей.' }
      ]
    },
    education: {
      heading: '<span>Образование</span>',
      cards: [
        { date: 'Магистратура &bull; Сен 2026 - настоящее время', title: 'Магистр по информационной безопасности', org: 'Университет Мансуры', desc: 'Продвинутые магистерские исследования и академическое обучение в области информационной безопасности, анализа угроз, современной криптографии и архитектур Zero Trust.', tags: ['Сен 2026 - наст. время', 'Информационная безопасность', 'Архитектура Zero Trust', 'Криптография', 'Анализ угроз'] },
        { date: 'Послевузовское обучение &bull; Янв 2026', title: 'Профессиональный диплом послевузовского образования по информационной безопасности', org: 'Университет Мансуры', desc: 'Окончил с <strong>оценкой 84% (очень хорошо с отличием / Very Good High)</strong>, специализация: информационная безопасность, оценка уязвимостей, анализ угроз, усиление систем, цифровая криминалистика и защита организаций.', tags: ['Оценка: 84%', 'Оценка уязвимостей', 'Анализ угроз', 'Усиление систем', 'Цифровая криминалистика', 'Защита организаций'] },
        { date: 'Бакалавриат &bull; Янв 2023', title: 'Степень бакалавра по информационным системам', org: 'Университет Мансуры', desc: 'Окончил с <strong>оценкой 90% (отлично с отличием)</strong>, специализация: информационные системы, разработка ПО, базы данных и архитектура систем.', tags: ['Оценка: 90% (с отличием)', 'Информационные системы', 'Разработка ПО', 'Базы данных', 'Архитектура систем'] }
      ]
    },
    projects: {
      heading: '<span>Избранные проекты</span>',
      cards: [
        { title: 'Предварительная приемка MNU DATA CENTER', desc: 'Первичная приемка и ввод в эксплуатацию современного MNU DATA CENTER, включая серверные стойки, прецизионное охлаждение HVAC, резервирование ИБП, оптические линии связи и Zero Trust безопасность.', tags: ['#DataCenter', '#ServerRacks', '#PrecisionCooling', '#UPS_Power', '#FiberOptics', '#ZeroTrust'], alt: 'Предварительная приемка MNU DATA CENTER' },
        { title: 'Поддержка и оптимизация ERP-системы', desc: 'Упрощение операций ERP, ускорение отклика базы данных и внедрение безопасных механизмов доступа для корпораческих пользователей.', tags: ['Windows Server', 'SQL', 'ERP'], alt: 'Поддержка ERP-системы' },
        { title: 'Лаборатория сетевой диагностики', desc: 'Проектирование и моделирование сложных сетевых топологий в Cisco Packet Tracer для тестирования протоколов маршрутизации и VLAN.', tags: ['Cisco', 'VLAN', 'Маршрутизация'], alt: 'Лаборатория сетевой диагностики' },
        { title: 'Мероприятие по встрече новых студентов', desc: 'Встреча новых студентов и знакомство с университетским сообществом, академической жизнью и доступными студенческими услугами.', tags: ['Встреча студентов', 'Университетское мероприятие', 'Национальный университет Мансуры'], alt: 'Мероприятие по встрече новых студентов' }
      ]
    },
    datacenter: {
      kicker: 'Ввод в эксплуатацию MNU DATA CENTER',
      title: 'Предварительная приемка MNU DATA CENTER',
      intro: '<p> <strong>Важный этап: Предварительная приемка нового MNU DATA CENTER!</strong> </p><p>С гордостью сообщаю об успешном завершении предварительной приемки нового корпоративного MNU DATA CENTER. Этот этап является результатом трудов по проектированию, развертыванию инфраструктуры и тестированию.</p><p> <strong>Ключевые технические особенности:</strong></p><ul><li> <strong>Монтаж стоек и кабель-менеджмент:</strong> Высокоплотные серверные стойки и оптические линии связи.</li><li> <strong>Прецизионное охлаждение:</strong> Интеллектуальное управление климатом.</li><li> <strong>Резервирование питания (UPS):</strong> Двойной ввод питания и ИБП.</li><li> <strong>Безопасность Zero-Trust:</strong> Биометрический контроль доступа и видеонаблюдение 24/7.</li></ul>'
    },
    research: {
      heading: 'Научные <span>исследования</span>',
      title: 'Безопасность приложений генеративного ИИ с использованием архитектуры Zero Trust',
      badge: 'Первое задокументированное научное исследование по использованию Zero Trust в системах электронного обучения в университетах.',
      desc: 'Комплексная структура безопасности для защиты конфиденциальных данных и моделей генеративного ИИ в высших учебных заведениях.',
      cyberHeading: 'Основы кибербезопасности и детали архитектуры',
      cyberFeat1Title: 'Архитектура Zero Trust (Никому не доверяй, всегда проверяй)',
      cyberFeat1Desc: 'Обеспечивает непрерывную аутентификацию и минимальные привилегии доступа для всех запросов API.',
      cyberFeat2Title: 'Защита от угроз генеративного ИИ и LLM',
      cyberFeat2Desc: 'Защита от атак инъекции промптов (Prompt Injection), отравления данных и утечки информации.',
      cyberFeat3Title: 'Микросегментация и сетевая изоляция',
      cyberFeat3Desc: 'Изоляция вычислительных модулей ИИ и баз данных для предотвращения горизонтального перемещения угроз.',
      cyberFeat4Title: 'Конфиденциальность данных и сквозное шифрование',
      cyberFeat4Desc: 'Сквозное шифрование (E2EE) данных при хранении и передаче в сочетании с разграничением доступа.',
      cards: [
        { date: '9 июля 2026 г.', title: 'Факультет компьютерных и информационных наук — Университет Мансуры', category: 'Исследование' },
        { date: '26 июля 2026 г.', title: 'Титульный слайд исследования архитектуры Zero Trust', category: 'Исследование' },
        { date: '25 июля 2026 г.', title: 'Инфографика безопасности архитектуры Zero Trust', category: 'Безопасность' },
        { date: '24 июля 2026 г.', title: 'Обсуждение исследования с руководителями и комитетом', category: 'Академический' },
        { date: '23 июля 2026 г.', title: 'Групповое фото после презентации исследования', category: 'Событие' },
        { date: '22 июля 2026 г.', title: 'Памятное фото с церемонии обсуждения', category: 'Церемония' }
      ]
    },
    videos: { heading: '<span>Демо в действии</span>', cards: [{ title: 'Демонстрация настройки сети' }, { title: 'Инструменты кибербезопасности в работе' }] },
    certifications: {
      heading: '<span>Лицензии и сертификаты</span>',
      viewBtn: 'Просмотр сертификата',
      cards: [
        { title: 'CEH', desc: 'Certified Ethical Hacker (Cisco Academy)' },
        { title: 'CCNA', desc: 'Маршрутизация и коммутация (Cisco Academy)' },
        { title: 'Red Hat', desc: 'Администрирование систем (Mahara-Tech)' },
        { title: 'AWS Cloud & ML', desc: 'Основы машинного обучения и облаков' },
        { title: 'Python Programming', desc: 'Сертификация DEPI' },
        { title: 'Linux Essentials', desc: 'Cisco Networking Academy' },
        { title: 'Cybersecurity', desc: 'Введение в кибербезопасность (Cisco)' }
      ]
    },
    contact: {
      heading: '<span>Связаться со мной</span>',
      items: [
        { label: 'Личная почта', value: 'mohamedhamedsallam14@gmail.com' },
        { label: 'Рабочая почта', value: 'mohamed@mohamedsallam.dev' },
        { label: 'Университет Мансуры', value: 'mhamedsallam@mans.edu.eg' },
        { label: 'Национальный университет Мансуры', value: 'eng.mohamedsallam@mansnu.edu.eg' },
        { label: 'Телефон', value: '01065401273' },
        { label: 'Местоположение', value: 'Мансура, Египет' }
      ],
      form: { title: 'Отправить сообщение', placeholders: ['Полное имя', 'Адрес электронной почты', 'Тема', 'Ваше сообщение...'], button: 'Отправить сообщение' }
    },
    stats: {
      visits: 'Всего просмотров',
      likes: 'Отметки «Нравится»',
      likeBtn: 'Нравится',
      likedBtn: 'Понравилось',
      status: 'Статус системы',
      statusOnline: 'В сети',
      systemStatus: 'Активная система',
      live: 'В сети',
      rating: 'Оценка пользователей',
      toastLiked: 'Спасибо за вашу оценку.',
      toastUnliked: 'Отметка «Нравится» удалена'
    },
    footer: 'Авторское право &copy;| Все права защищены, ENG Mohamed Hamed Sallam.',
    typed: ['Инженер-программист', 'Full Stack разработчик', 'IT-специалист'],
    labels: { langSelect: 'Выбор языка', themeToggle: 'Переключить тему', menuToggle: 'Переключить меню' },
    languageOptions: { en: 'Английский', ar: 'Арабский', ru: 'Русский' },
    images: { profile: 'Портрет Мохамеда Хамеда Саллама', engDerman: 'Логотип ENG-DERMAN Software Solutions', mnu: 'Логотип Национального университета Мансуры', intilaq: 'Логотип Intilaq Group (IG)', projectErp: 'Поддержка ERP-системы', projectNetwork: 'Лаборатория сетевой диагностики', projectCyber: 'Сканирование кибербезопасности', researchMain: 'Памятное фото исследования — факультет компьютерных и информационных наук, университет Мансуры' }
  }
};

const langSelect = document.getElementById('lang-select');
let typedInstance = null;

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === 'string') {
    element.textContent = value;
  }
}

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === 'string') {
    element.innerHTML = value;
  }
}

function setAttr(selector, attributeName, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) {
    element.setAttribute(attributeName, value);
  }
}

function updateTypedStrings(lang) {
  const strings = translations[lang]?.typed || translations.en.typed;

  if (typedInstance) {
    typedInstance.destroy();
  }

  const multipleTextEl = document.querySelector('.multiple-text');
  if (multipleTextEl && typeof Typed === 'function') {
    try {
      typedInstance = new Typed('.multiple-text', {
        strings: strings,
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 1200,
        loop: true
      });
    } catch (err) {
      console.warn('Typed initialization skipped:', err);
    }
  }

}

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  const translation = translations[lang];

  htmlElement.setAttribute('lang', lang);
  htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.title = translation.meta.title;
  const logoTextEl = document.querySelector('.logo .logo-text');
  if (logoTextEl) {
    logoTextEl.innerHTML = `${translation.logo} <span>.</span>`;
  } else {
    setHTML('.logo', `${translation.logo} <span>.</span>`);
  }

  // Translate nav links dynamically
  setText('.navbar [data-i18n="nav_home"]', translation.nav.home);
  setText('.navbar [data-i18n="nav_about"]', translation.nav.about);
  setText('.navbar [data-i18n="nav_skills"]', translation.nav.skills);
  setText('.navbar [data-i18n="nav_experience"]', translation.nav.experience);
  setText('.navbar [data-i18n="nav_projects"]', translation.nav.projects);
  setText('.navbar [data-i18n="nav_contact"]', translation.nav.contact);
  setText('.navbar [data-i18n="nav_education"]', translation.nav.education);
  setText('.navbar [data-i18n="nav_research"]', translation.nav.research);
  setText('.navbar [data-i18n="nav_certifications"]', translation.nav.certifications);
  setText('.navbar [data-i18n="nav_videos"]', translation.nav.videos);
  setText('.navbar [data-i18n="nav_datacenter"]', translation.nav.datacenter);
  setText('.navbar [data-i18n="nav_training_zahraa"]', translation.nav.training_zahraa);
  setText('.navbar [data-i18n="nav_training_erp"]', translation.nav.training_erp);
  setText('.navbar [data-i18n="nav_training_erp_finance"]', translation.nav.training_erp_finance);
  setText('.navbar [data-i18n="nav_training_web"]', translation.nav.training_web);

  document.querySelectorAll('.navbar [data-i18n="nav_training"]').forEach(trigger => {
    trigger.innerHTML = `${translation.nav.training} <i class='bx bx-chevron-down'></i>`;
  });

  document.querySelectorAll('.navbar [data-i18n="nav_more"]').forEach(trigger => {
    trigger.innerHTML = `${translation.nav.more} <i class='bx bx-chevron-down'></i>`;
  });

  setText('[data-i18n="hero_greeting"]', translation.hero.greeting);
  setText('[data-i18n="hero_title_prefix"]', translation.hero.titlePrefix);
  setHTML('[data-i18n="hero_desc"]', translation.hero.description);
  const downloadBtn = document.querySelector('[data-i18n="hero_download"]');
  if (downloadBtn) {
    downloadBtn.textContent = translation.hero.download;
    const cvFile = lang === 'ar' ? 'Mohamed_Hamed_Sallam_CV_Arabic.doc' : 'Mohamed_Hamed_Sallam_CV.doc';
    downloadBtn.setAttribute('href', cvFile);
    downloadBtn.setAttribute('download', cvFile);
  }
  setText('[data-i18n="hero_contact"]', translation.hero.contact);

  setAttr('#lang-select', 'aria-label', translation.labels.langSelect);
  setAttr('.theme-toggle', 'aria-label', translation.labels.themeToggle);
  if (menuIcon) {
    menuIcon.setAttribute('aria-label', translation.labels.menuToggle);
  }

  ['en', 'ar', 'ru'].forEach(value => {
    const option = langSelect ? langSelect.querySelector(`option[value="${value}"]`) : null;
    if (option && translation.languageOptions[value]) {
      option.textContent = `${value.toUpperCase()} · ${translation.languageOptions[value]}`;
    }
  });

  const heroContent = document.querySelector('.home-content');

  setAttr('.home-img img', 'alt', translation.images.profile);
  setAttr('.research-main-image', 'alt', translation.images.researchMain);

  setHTML('.about .heading', translation.about.heading);
  setText('.about-content > h3', translation.about.title);
  setHTML('.about-intro', translation.about.intro);
  document.querySelectorAll('.about-card').forEach((card, index) => {
    const config = translation.about.cards[index];
    if (!config) return;
    const title = card.querySelector('h4');
    const text = card.querySelector('p');
    if (title) title.textContent = config.title;
    if (text) text.innerHTML = config.text;
  });
  document.querySelectorAll('.about-badge').forEach((badge, index) => {
    const icon = badge.querySelector('i');
    const iconHtml = icon ? `<i class="${icon.className}"></i> ` : '';
    if (translation.about.badges[index]) {
      badge.innerHTML = `${iconHtml}${translation.about.badges[index]}`;
    }
  });
  setHTML('.about-quote p', translation.about.quote);
  document.querySelectorAll('.counter-box p').forEach((label, index) => {
    if (translation.about.counters[index]) {
      label.textContent = translation.about.counters[index];
    }
  });

  setHTML('.skills .heading', translation.skills.heading);
  document.querySelectorAll('.skills-card').forEach((card, index) => {
    const config = translation.skills.cards[index];
    if (!config) return;
    const header = card.querySelector('.skills-card-header h3');
    if (header) header.textContent = config.header;
    card.querySelectorAll('.skill-item').forEach((item, itemIndex) => {
      const label = item.querySelector('.skill-name-percent span:first-child');
      if (label && config.items[itemIndex]) {
        label.textContent = config.items[itemIndex];
      }
    });
    card.querySelectorAll('.skill-tag').forEach((tag, tagIndex) => {
      if (config.tags[tagIndex]) {
        tag.textContent = config.tags[tagIndex];
      }
    });
  });

  setHTML('.experience .heading', translation.experience.heading);
  document.querySelectorAll('.timeline-content').forEach((content, index) => {
    const config = translation.experience.items[index];
    if (!config) return;
    const title = content.querySelector('h3');
    const org = content.querySelector('h4');
    const desc = content.querySelector('p');
    if (title) title.textContent = config.title;
    if (org) org.textContent = config.org;
    if (desc) desc.textContent = config.desc;
  });
  document.querySelectorAll('.timeline-icon img').forEach((img, index) => {
    const altValues = [translation.images.engDerman, translation.images.mnu, translation.images.intilaq];
    if (altValues[index]) {
      img.setAttribute('alt', altValues[index]);
    }
  });

  if (translation.education) {
    setHTML('.education .heading', translation.education.heading);
  }
  if (translation.training) {
    setHTML('.training .heading', translation.training.heading);
    
    // Zahraa training panel
    setText('.zahraa-panel .training-kicker-text', translation.training.kicker);
    setText('.zahraa-panel .training-title', translation.training.title);
    setHTML('.zahraa-panel .training-intro', translation.training.intro);
    if (translation.training.cards) {
      document.querySelectorAll('.zahraa-panel .training-slide-caption h3').forEach((h3, idx) => {
        if (translation.training.cards[idx]) {
          h3.textContent = translation.training.cards[idx];
        }
      });
      document.querySelectorAll('.zahraa-panel .training-thumb img').forEach((img, idx) => {
        if (translation.training.cards[idx]) {
          img.setAttribute('alt', translation.training.cards[idx]);
        }
      });
    }
  }
  if (translation.trainingHr) {
    // ERP HR training panel
    setText('.erp-panel .training-kicker-text-hr', translation.trainingHr.kicker);
    setText('.erp-panel .training-title-hr', translation.trainingHr.title);
    setHTML('.erp-panel .training-intro-hr', translation.trainingHr.intro);
    if (translation.trainingHr.cards) {
      document.querySelectorAll('.erp-panel .training-slide-caption h3').forEach((h3, idx) => {
        if (translation.trainingHr.cards[idx]) {
          h3.textContent = translation.trainingHr.cards[idx];
        }
      });
      document.querySelectorAll('.erp-panel .training-thumb img').forEach((img, idx) => {
        if (translation.trainingHr.cards[idx]) {
          img.setAttribute('alt', translation.trainingHr.cards[idx]);
        }
      });
    }
  }
  if (translation.datacenter) {
    setText('.datacenter-panel .training-kicker-text-dc', translation.datacenter.kicker);
    setText('.datacenter-panel .training-title-dc', translation.datacenter.title);
    setHTML('.datacenter-panel .training-intro-dc', translation.datacenter.intro);
  }
  // Keep the new web training post in English as requested
  setText('.web-panel .training-kicker-text', 'Web Training Program');
  setText('.web-panel .training-title', 'Programmers Training on the University Electronic Website');
  setText('.web-panel .training-intro', 'A dedicated training post for programmers focused on operating, maintaining, and improving the university electronic website workflow.');
  document.querySelectorAll('.education-card').forEach((card, index) => {
    const config = translation.education.cards[index];
    if (!config) return;
    const date = card.querySelector('.education-date');
    const title = card.querySelector('h3');
    const org = card.querySelector('h4');
    const desc = card.querySelector('p');
    if (date) date.innerHTML = config.date;
    if (title) title.textContent = config.title;
    if (org) org.textContent = config.org;
    if (desc) desc.innerHTML = config.desc;
    card.querySelectorAll('.tech-stack span').forEach((tag, tagIndex) => {
      if (config.tags[tagIndex]) {
        tag.textContent = config.tags[tagIndex];
      }
    });
  });

  setHTML('.projects .heading', translation.projects.heading);
  document.querySelectorAll('.project-card').forEach((card, index) => {
    const config = translation.projects?.cards?.[index];
    if (!config) return;
    const title = card.querySelector('.project-info h3');
    const desc = card.querySelector('.project-info p');
    if (title) title.textContent = config.title;
    if (desc) desc.textContent = config.desc;
    const techStackEl = card.querySelector('.tech-stack');
    if (techStackEl && config.tags) {
      techStackEl.innerHTML = config.tags.map(tag => `<span>${tag}</span>`).join('');
    }
    const image = card.querySelector('.project-img img');
    if (image && config.alt) {
      image.setAttribute('alt', config.alt);
    }
  });

  const cyberImage = document.querySelector('.project-card:nth-child(3) .project-img img');
  if (cyberImage && cyberImage.getAttribute('src') === 'assets/project_cybersecurity.png') {
    cyberImage.setAttribute('src', 'assets/project_network.png');
  }

  if (translation.research) {
    setHTML('.research .heading', translation.research.heading);
    const researchTitle = document.querySelector('.research-post-title, .research-info h3');
    const researchBadge = document.querySelector('.research-badge-text');
    const researchDesc = document.querySelector('.research-post-desc, .research-info p[data-i18n="research_desc"]');
    if (researchTitle) researchTitle.textContent = translation.research.title;
    if (researchBadge) researchBadge.textContent = translation.research.badge;
    if (researchDesc) researchDesc.textContent = translation.research.desc;
    
    const cyberHeading = document.querySelector('[data-i18n="research_cyber_heading"]');
    if (cyberHeading && translation.research.cyberHeading) {
      cyberHeading.innerHTML = `<i class='bx bx-shield-quarter'></i> ${translation.research.cyberHeading}`;
    }
    setText('[data-i18n="cyber_feat1_title"]', translation.research.cyberFeat1Title);
    setText('[data-i18n="cyber_feat1_desc"]', translation.research.cyberFeat1Desc);
    setText('[data-i18n="cyber_feat2_title"]', translation.research.cyberFeat2Title);
    setText('[data-i18n="cyber_feat2_desc"]', translation.research.cyberFeat2Desc);
    setText('[data-i18n="cyber_feat3_title"]', translation.research.cyberFeat3Title);
    setText('[data-i18n="cyber_feat3_desc"]', translation.research.cyberFeat3Desc);
    setText('[data-i18n="cyber_feat4_title"]', translation.research.cyberFeat4Title);
    setText('[data-i18n="cyber_feat4_desc"]', translation.research.cyberFeat4Desc);
    
    document.querySelectorAll('.carousel-slide').forEach((slide, index) => {
      const config = translation.research.cards[index];
      if (!config) return;
      
      const dateEl = slide.querySelector('.research-card-date');
      const titleEl = slide.querySelector('.research-card-title');
      const categoryEl = slide.querySelector('.research-card-category');
      const image = slide.querySelector('img');
      
      if (dateEl) dateEl.textContent = config.date;
      if (titleEl) titleEl.textContent = config.title;
      if (categoryEl) categoryEl.textContent = config.category;
      if (image) image.setAttribute('alt', config.title);
    });
  }

  setHTML('.videos .heading', translation.videos.heading);
  document.querySelectorAll('.video-card').forEach((card, index) => {
    const config = translation.videos.cards[index];
    const title = card.querySelector('h3');
    if (title && config) {
      title.textContent = config.title;
    }
    const video = card.querySelector('video');
    if (video && index === 1 && video.getAttribute('poster') === 'assets/project_cybersecurity.png') {
      video.setAttribute('poster', 'assets/project_network.png');
    }
  });

  setHTML('.certifications .heading', translation.certifications.heading);
  document.querySelectorAll('.cert-card').forEach((card, index) => {
    const config = translation.certifications.cards[index];
    if (!config) return;
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    if (title) title.textContent = config.title;
    if (desc) desc.textContent = config.desc;
    const viewBtn = card.querySelector('.view-cert-btn');
    if (viewBtn) viewBtn.textContent = translation.certifications.viewBtn || 'View Certificate';
  });

  setHTML('.contact .heading', translation.contact.heading);
  document.querySelectorAll('.contact-info .info-item').forEach((item, index) => {
    const config = translation.contact.items[index];
    if (!config) return;
    const label = item.querySelector('h4');
    const valueLink = item.querySelector('p a');
    if (label) label.textContent = config.label;
    if (valueLink) valueLink.textContent = config.value;
  });
  const contactFormTitle = document.querySelector('.contact-form h3');
  if (contactFormTitle) contactFormTitle.textContent = translation.contact.form.title;
  const contactInputs = document.querySelectorAll('.contact-form .input-box input');
  if (contactInputs[0]) contactInputs[0].setAttribute('placeholder', translation.contact.form.placeholders[0]);
  if (contactInputs[1]) contactInputs[1].setAttribute('placeholder', translation.contact.form.placeholders[1]);
  if (contactInputs[2]) contactInputs[2].setAttribute('placeholder', translation.contact.form.placeholders[2]);
  const messageField = document.querySelector('.contact-form textarea');
  if (messageField) messageField.setAttribute('placeholder', translation.contact.form.placeholders[3]);
  const submitButton = document.querySelector('.contact-form button');
  if (submitButton) {
    submitButton.innerHTML = `${translation.contact.form.button} <i class='bx bx-paper-plane'></i>`;
  }

  setHTML('.footer-text p', translation.footer);

  if (translation.stats) {
    setText('[data-i18n="stats_visits"]', translation.stats.visits);
    setText('[data-i18n="stats_likes"]', translation.stats.likes);
    setText('[data-i18n="stats_status"]', translation.stats.status);
    setText('[data-i18n="stats_status_online"]', translation.stats.statusOnline);
    setText('[data-i18n="stats_system_status"]', translation.stats.systemStatus);
    setText('[data-i18n="stats_live"]', translation.stats.live);
    setText('[data-i18n="stats_rating"]', translation.stats.rating);

    const userHasLiked = localStorage.getItem('site_user_has_liked') === 'true';
    const likeBtnText = document.getElementById('like-btn-text');
    if (likeBtnText) {
      likeBtnText.textContent = userHasLiked ? translation.stats.likedBtn : translation.stats.likeBtn;
    }
  }

  updateTypedStrings(lang);

  localStorage.setItem('lang', lang);
  if (langSelect) langSelect.value = lang;
}

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
}

// Initial language load
const savedLang = localStorage.getItem('lang') || 'en';
setLanguage(savedLang);

// Scroll Reveal Animations
if (typeof ScrollReveal === 'function') {
  try {
    const isRTL = htmlElement.getAttribute('dir') === 'rtl';

    ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
    });

    ScrollReveal().reveal('.heading', { origin: 'top' });
    ScrollReveal().reveal('.home-content', { origin: isRTL ? 'right' : 'left', delay: 400, duration: 2500 });
    ScrollReveal().reveal('.home-img', { origin: isRTL ? 'left' : 'right', delay: 1800, duration: 2500 });
    ScrollReveal().reveal('.about-intro, .about-quote', { origin: 'bottom', delay: 200 });
    ScrollReveal().reveal('.about-card', { origin: 'bottom', interval: 150 });
    ScrollReveal().reveal('.about-badge', { origin: 'bottom', interval: 80 });
    ScrollReveal().reveal('.skills-grid, .education-container, .projects-container, .cert-container, .contact-wrapper', { origin: 'bottom' });
    const timelineOrigin = window.matchMedia('(max-width: 991px)').matches
      ? 'bottom'
      : (isRTL ? 'right' : 'left');
    ScrollReveal().reveal('.timeline-item:nth-child(even)', { origin: timelineOrigin });
    ScrollReveal().reveal('.timeline-item:nth-child(odd)', { origin: timelineOrigin === 'bottom' ? 'bottom' : (isRTL ? 'left' : 'right') });
  } catch (err) {
    console.warn('ScrollReveal skipped:', err);
  }
}




// Animated Counters
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(animateCounters, 20);
    } else {
      counter.innerText = target + (target > 50 ? '+' : '');
    }
  });
}

// Trigger counters when About section is in view
let countersStarted = false;
window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  const aboutPosition = aboutSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (aboutPosition < screenPosition && !countersStarted) {
    animateCounters();
    countersStarted = true;
  }
});

// Animate skills progress bars when in view
const skillProgressBars = document.querySelectorAll('.skill-progress');
if (skillProgressBars.length > 0) {
  const showProgress = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        observer.unobserve(bar);
      }
    });
  };

  const progressObserver = new IntersectionObserver(showProgress, {
    threshold: 0.2
  });

  skillProgressBars.forEach(bar => {
    const targetWidth = bar.style.width || '0%';
    bar.style.width = '0';
    bar.dataset.width = targetWidth;
    progressObserver.observe(bar);
  });
}

// Particles.js Configuration
function initParticles(theme) {
  if (typeof particlesJS !== 'function') return;
  if (window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches) return;
  try {
    const isLight = theme === 'light';
    const particleColor = isLight ? '#0284c7' : '#f2b632';
    const linkColor = isLight ? '#0284c7' : '#f2b632';

    particlesJS('particles-js',

    {
      "particles": {
        "number": {
          "value": 45,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": particleColor
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.35,
          "random": false,
          "anim": {
            "enable": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 140,
          "color": linkColor,
          "opacity": 0.15,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.8
            }
          },
          "push": {
            "particles_nb": 3
          }
        }
      },
    });
  } catch (err) {
    console.warn('particlesJS skipped:', err);
  }
}

// Contact form: prepare a native email draft without requiring a backend service.
onReady(() => {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const getFieldValue = (fieldName) => {
      const value = formData.get(fieldName);
      return typeof value === 'string' ? value.trim() : '';
    };
    const name = getFieldValue('name');
    const email = getFieldValue('email');
    const subject = getFieldValue('subject');
    const message = getFieldValue('message');
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:mohamedhamedsallam14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = contactForm.querySelector('.form-status');

    window.location.href = mailto;
    if (status) {
      status.textContent = 'Your email app is opening with the message ready to send.';
    }
  });
});

// Initial Particles Load
onReady(() => {
  initParticles(currentTheme);
});

// ==========================================
// Research Carousel & Universal Gallery Lightbox Logic
// ==========================================
onReady(() => {
  const carouselWrapper = document.querySelector('.research-carousel-wrapper');
  if (carouselWrapper) {
    const track = carouselWrapper.querySelector('.carousel-track');
    const slides = carouselWrapper.querySelectorAll('.carousel-slide');
    const dots = carouselWrapper.querySelectorAll('.carousel-dots .dot');
    const prevBtn = carouselWrapper.querySelector('.carousel-btn.prev-btn');
    const nextBtn = carouselWrapper.querySelector('.carousel-btn.next-btn');

    let currentSlide = 0;
    let researchAutoplay = null;

    function updateCarousel(index) {
      if (!track || slides.length === 0) return;
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      currentSlide = index;

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 20; // 2rem
      const offset = currentSlide * (slideWidth + gap);

      track.style.transform = `translateX(-${offset}px)`;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      researchAutoplay = setInterval(() => {
        updateCarousel(currentSlide + 1);
      }, 3500);
    }

    function stopAutoplay() {
      if (researchAutoplay) {
        clearInterval(researchAutoplay);
        researchAutoplay = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCarousel(currentSlide - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCarousel(currentSlide + 1);
        startAutoplay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateCarousel(idx);
        startAutoplay();
      });
    });

    carouselWrapper.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => {
      updateCarousel(currentSlide);
    });

    // Initial update
    updateCarousel(0);
    startAutoplay();
  }

  // Universal Gallery Lightbox (Research & Training Slides)
  const galleryLightbox = document.getElementById('gallery-lightbox');
  const galleryImg = document.getElementById('gallery-lightbox-img');
  const galleryCap = document.getElementById('gallery-lightbox-cap');
  const galleryClose = galleryLightbox ? galleryLightbox.querySelector('.lightbox-close') : null;
  const galleryPrev = galleryLightbox ? galleryLightbox.querySelector('.lightbox-prev') : null;
  const galleryNext = galleryLightbox ? galleryLightbox.querySelector('.lightbox-next') : null;

  let galleryItems = [];
  let currentGalleryIndex = 0;

  function openGalleryLightbox(items, startIndex = 0) {
    if (!galleryLightbox || !galleryImg || items.length === 0) return;
    galleryItems = items;
    currentGalleryIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    renderGalleryItem(currentGalleryIndex);

    galleryLightbox.classList.add('active');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderGalleryItem(idx) {
    if (!galleryItems[idx]) return;
    const item = galleryItems[idx];
    galleryImg.src = item.src;
    galleryImg.alt = item.caption || 'Gallery Image';
    if (galleryCap) {
      galleryCap.textContent = item.caption || '';
      galleryCap.style.display = item.caption ? 'block' : 'none';
    }
  }

  function closeGalleryLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('active');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (galleryClose) galleryClose.addEventListener('click', closeGalleryLightbox);

  if (galleryPrev) {
    galleryPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      renderGalleryItem(currentGalleryIndex);
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      renderGalleryItem(currentGalleryIndex);
    });
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeGalleryLightbox();
    });
  }

  // Click on Research slides to open Lightbox
  const researchSlides = document.querySelectorAll('.carousel-slide');
  researchSlides.forEach((slide, idx) => {
    slide.addEventListener('click', () => {
      const items = Array.from(researchSlides).map(s => ({
        src: s.querySelector('img')?.src || '',
        caption: s.querySelector('.research-card-title')?.textContent?.trim() || ''
      })).filter(item => item.src);
      openGalleryLightbox(items, idx);
    });
  });

  // Click project carousel images to open the same gallery lightbox.
  document.querySelectorAll('.project-slider-container').forEach((container) => {
    const slides = Array.from(container.querySelectorAll('.project-slide-we-img, .project-slide-event-img'));
    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        e.stopPropagation();
        const items = slides.map((image) => ({
          src: image.src,
          caption: image.alt
        })).filter(item => item.src);
        openGalleryLightbox(items, idx);
      });
    });
  });

  // Global keydown for Gallery Lightbox
  document.addEventListener('keydown', (e) => {
    if (galleryLightbox && galleryLightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeGalleryLightbox();
      if (e.key === 'ArrowLeft') {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        renderGalleryItem(currentGalleryIndex);
      }
      if (e.key === 'ArrowRight') {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        renderGalleryItem(currentGalleryIndex);
      }
    }
  });
});

// ==========================================
// System Training Slider Logic
// ==========================================
onReady(() => {
  function initTrainingSlider(panelSelector) {
    const panel = document.querySelector(panelSelector);
    if (!panel) return;

    const slides = panel.querySelectorAll('.training-slide');
    const thumbs = panel.querySelectorAll('.training-thumb');
    const prevBtn = panel.querySelector('.prev-btn');
    const nextBtn = panel.querySelector('.next-btn');
    const playPauseBtn = panel.querySelector('.play-pause-btn');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval = null;
    let isPlaying = true;

    function showSlide(index) {
      // Wrap index
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      // Remove active class from all slides and thumbnails in this panel
      slides.forEach(slide => slide.classList.remove('active'));
      thumbs.forEach(thumb => thumb.classList.remove('active'));

      // Add active class to target slide and thumbnail
      slides[index].classList.add('active');
      thumbs[index].classList.add('active');

      currentSlide = index;
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Explicitly define prevSlide inside function scope
    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(nextSlide, 3500);
      isPlaying = true;
      if (playPauseBtn) {
        playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
      }
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
      isPlaying = false;
      if (playPauseBtn) {
        playPauseBtn.innerHTML = "<i class='bx bx-play'></i>";
      }
    }

    function togglePlayPause() {
      if (isPlaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    }

    // Event Listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        stopAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        stopAutoplay();
      });
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePlayPause();
      });
    }

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(index);
        stopAutoplay();
      });
    });

    // Return control API
    return {
      start: startAutoplay,
      stop: stopAutoplay
    };
  }

  const trainingSliders = {};
  trainingSliders['modal-zahraa'] = initTrainingSlider('.zahraa-panel');
  trainingSliders['modal-erp'] = initTrainingSlider('.erp-panel');
  trainingSliders['modal-erp-finance'] = initTrainingSlider('.erp-finance-panel');
  trainingSliders['modal-web'] = initTrainingSlider('.web-panel');
  trainingSliders['modal-datacenter'] = initTrainingSlider('.datacenter-panel');
  trainingSliders['modal-we-datacenter'] = initTrainingSlider('.we-datacenter-panel');

  // Store trainingSliders globally for event delegation access
  window.trainingSliders = trainingSliders;

  // Mini Carousel for Project Card (WE Data Center)
  const weSlides = document.querySelectorAll('.project-slide-we-img');
  const weDots = document.querySelectorAll('.project-slider-dots .p-dot');
  const weContainer = document.querySelector('.project-slider-container');
  if (weSlides.length > 0) {
    let weCurrentIndex = 0;
    let weInterval = null;

    function showWeSlide(idx) {
      if (idx >= weSlides.length) idx = 0;
      if (idx < 0) idx = weSlides.length - 1;
      weCurrentIndex = idx;
      weSlides.forEach((img, i) => img.classList.toggle('active', i === idx));
      weDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }

    function startWeAutoplay() {
      if (!weInterval) {
        weInterval = setInterval(() => {
          showWeSlide(weCurrentIndex + 1);
        }, 3200);
      }
    }

    function stopWeAutoplay() {
      if (weInterval) {
        clearInterval(weInterval);
        weInterval = null;
      }
    }

    weDots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showWeSlide(i);
      });
    });

    if (weContainer) {
      weContainer.addEventListener('mouseenter', stopWeAutoplay);
      weContainer.addEventListener('mouseleave', startWeAutoplay);
    }

    startWeAutoplay();
  }

  // Mini Carousel for New Students Welcome Event
  const eventSlides = document.querySelectorAll('.project-slide-event-img');
  const eventDots = document.querySelectorAll('.event-slider-dots .p-dot');
  const eventContainer = document.querySelector('.event-slider-container');
  if (eventSlides.length > 0) {
    let eventCurrentIndex = 0;
    let eventInterval = null;

    function showEventSlide(idx) {
      if (idx >= eventSlides.length) idx = 0;
      if (idx < 0) idx = eventSlides.length - 1;
      eventCurrentIndex = idx;
      eventSlides.forEach((img, i) => img.classList.toggle('active', i === idx));
      eventDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }

    const startEventAutoplay = () => {
      if (!eventInterval) {
        eventInterval = setInterval(() => showEventSlide(eventCurrentIndex + 1), 3200);
      }
    };
    const stopEventAutoplay = () => {
      if (eventInterval) {
        clearInterval(eventInterval);
        eventInterval = null;
      }
    };

    eventDots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showEventSlide(i);
      });
    });
    if (eventContainer) {
      eventContainer.addEventListener('mouseenter', stopEventAutoplay);
      eventContainer.addEventListener('mouseleave', startEventAutoplay);
    }
    startEventAutoplay();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // restore page scroll
    
    // Stop autoplay for this slider
    const modalId = modalEl.id;
    if (window.trainingSliders && window.trainingSliders[modalId] && typeof window.trainingSliders[modalId].stop === 'function') {
      window.trainingSliders[modalId].stop();
    }
  }

  // Global Event Delegation for ALL modal open links (.open-modal-btn)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const modalId = btn.getAttribute('data-modal');
    if (!modalId) return;

    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      // Close dropdown menus and mobile menu
      if (typeof navDropdowns !== 'undefined') {
        navDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      }
      closeMobileMenu();
      
      // Open target modal
      targetModal.classList.add('active');
      targetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Start autoplay for this slider
      if (window.trainingSliders && window.trainingSliders[modalId] && typeof window.trainingSliders[modalId].start === 'function') {
        window.trainingSliders[modalId].start();
      }
    }
  });

  // Global Event Delegation for modal close buttons & background overlay click
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.training-modal-close');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      const modalEl = closeBtn.closest('.training-modal');
      if (modalEl) closeModal(modalEl);
      return;
    }

    if (e.target.classList && e.target.classList.contains('training-modal')) {
      closeModal(e.target);
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.training-modal.active');
      if (activeModal) {
        closeModal(activeModal);
      }
      closeCertLightbox();
    }
  });

  // Certificate Lightbox Event Delegation
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card');
    if (!card) return;

    const certImgSrc = card.getAttribute('data-cert-img');
    if (!certImgSrc) return;

    const titleText = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
    const descText = card.querySelector('p') ? card.querySelector('p').textContent : '';

    const lightbox = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('cert-lightbox-img');
    const lightboxTitle = document.getElementById('cert-lightbox-title');
    const lightboxDesc = document.getElementById('cert-lightbox-desc');

    if (lightbox && lightboxImg) {
      lightboxImg.src = certImgSrc;
      if (lightboxTitle) lightboxTitle.textContent = titleText;
      if (lightboxDesc) lightboxDesc.textContent = descText;

      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent page scroll
    }
  });

  // Close Certificate Lightbox
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.cert-lightbox-close');
    if (closeBtn) {
      e.preventDefault();
      closeCertLightbox();
      return;
    }

    const lightbox = document.getElementById('cert-lightbox');
    if (e.target === lightbox) {
      closeCertLightbox();
    }
  });

  function closeCertLightbox() {
    const lightbox = document.getElementById('cert-lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // restore scroll
    }
  }


  // Navbar dropdown trigger click toggle (Desktop & Mobile)
  document.querySelectorAll('.navbar .dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropdownParent = trigger.closest('.nav-dropdown');
      if (!dropdownParent) return;

      const isOpen = dropdownParent.classList.contains('active');
      navDropdowns.forEach(dropdown => {
        if (dropdown !== dropdownParent) {
          dropdown.classList.remove('active');
          const otherTrigger = dropdown.querySelector('.dropdown-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        dropdownParent.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        dropdownParent.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // When clicking ANY item/link inside a dropdown, close the dropdowns and close mobile menu
  document.querySelectorAll('.nav-dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
      navDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      document.querySelectorAll('.navbar .dropdown-trigger').forEach(trig => {
        trig.setAttribute('aria-expanded', 'false');
      });
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Close dropdown menu when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      navDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      document.querySelectorAll('.navbar .dropdown-trigger').forEach(trig => {
        trig.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close the mobile menu when any navbar navigation link or CTA is clicked
  if (navbar) {
    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMobileMenu();
        }
      });
    });
  }


  // Initialize Visitor & Like Counter System
  initVisitorAndLikeSystem();
});

// System Visitor & Interactive Like System Implementation
function initVisitorAndLikeSystem() {
  const BASE_VISITS = 24580;
  const BASE_LIKES = 15340;

  // 1. Visit Counter Logic (Starts > 20,000 and increments per visitor session)
  let storedVisits = parseInt(localStorage.getItem('site_visits_count'), 10);
  if (isNaN(storedVisits) || storedVisits < BASE_VISITS) {
    storedVisits = BASE_VISITS;
  }

  if (!sessionStorage.getItem('visited_this_session')) {
    storedVisits += 1;
    localStorage.setItem('site_visits_count', storedVisits);
    sessionStorage.setItem('visited_this_session', 'true');
  }

  // 2. Like Counter & Interactive Button Logic (Starts > 15,000)
  let storedLikes = parseInt(localStorage.getItem('site_likes_count'), 10);
  if (isNaN(storedLikes) || storedLikes < BASE_LIKES) {
    storedLikes = BASE_LIKES;
  }

  let userHasLiked = localStorage.getItem('site_user_has_liked') === 'true';

  const visitCountEl = document.getElementById('visit-count');
  const likeCountEl = document.getElementById('like-count');
  const likeBtn = document.getElementById('like-btn');
  const likeIcon = document.getElementById('like-icon');
  const likeBtnText = document.getElementById('like-btn-text');

  if (visitCountEl) animateCounter(visitCountEl, storedVisits);
  if (likeCountEl) animateCounter(likeCountEl, storedLikes);

  // 3. Dynamic Live System Ping Indicator
  const statusOnlineBadge = document.querySelector('[data-i18n="stats_status_online"]');
  if (statusOnlineBadge) {
    const updatePing = () => {
      const ping = Math.floor(Math.random() * 6) + 12; // 12-17ms
      const lang = localStorage.getItem('lang') || 'en';
      const onlineText = translations[lang]?.stats?.statusOnline || 'Online';
      statusOnlineBadge.textContent = `${onlineText} • ${ping}ms`;
    };
    updatePing();
    setInterval(updatePing, 3500);
  }

  function updateLikeButtonUI() {
    const lang = localStorage.getItem('lang') || 'en';
    const trans = translations[lang]?.stats || translations.en.stats;

    if (likeBtn) {
      if (userHasLiked) {
        likeBtn.classList.add('liked');
        if (likeIcon) likeIcon.className = 'bx bxs-heart';
        if (likeBtnText) likeBtnText.textContent = trans?.likedBtn || 'Liked';
      } else {
        likeBtn.classList.remove('liked');
        if (likeIcon) likeIcon.className = 'bx bx-heart';
        if (likeBtnText) likeBtnText.textContent = trans?.likeBtn || 'Like';
      }
    }
  }


  if (likeBtn) {
    updateLikeButtonUI();

    likeBtn.addEventListener('click', (e) => {
      const lang = localStorage.getItem('lang') || 'en';
      const trans = translations[lang]?.stats || translations.en.stats;

      userHasLiked = !userHasLiked;
      localStorage.setItem('site_user_has_liked', userHasLiked);

      if (userHasLiked) {
        storedLikes += 1;
        updateLikeButtonUI();
        triggerHeartBurst(e);
        playSynthSound('like');
        showToastNotification(trans.toastLiked);
      } else {
        storedLikes = Math.max(BASE_LIKES, storedLikes - 1);
        updateLikeButtonUI();
        playSynthSound('unlike');
        showToastNotification(trans.toastUnliked);
      }

      localStorage.setItem('site_likes_count', storedLikes);
      if (likeCountEl) {
        animateCounter(likeCountEl, storedLikes, 400);
      }
    });
  }
}

// Web Audio API Sound Synthesizer (Crystal Chimes & Soft Pops)
let audioCtx = null;
function playSynthSound(type) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'like') {
      // Harmonic Crystal Chime Arpeggio: E5 -> G#5 -> B5 -> E6
      const frequencies = [659.25, 830.61, 987.77, 1318.51];
      frequencies.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.46);
      });
    } else if (type === 'unlike') {
      // Soft gentle pop sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch (err) {
    // Graceful fallback if audio permissions blocked
  }
}

// Smooth Number Counter Animation
function animateCounter(element, targetValue, duration = 1500) {
  const startValue = Math.max(0, targetValue - 80);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// Like confirmation animation
function triggerHeartBurst(event) {
  const target = event.currentTarget || event.target;
  const rect = target.getBoundingClientRect();

  // Floating +1 Badge
  const plusOne = document.createElement('div');
  plusOne.className = 'floating-plus-one';
  plusOne.textContent = '+1';
  plusOne.style.left = `${rect.left + rect.width / 2 - 20}px`;
  plusOne.style.top = `${rect.top - 10}px`;
  document.body.appendChild(plusOne);

  setTimeout(() => {
    plusOne.remove();
  }, 1100);

  // Floating Hearts Burst
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('i');
    heart.className = 'bx bxs-heart floating-heart';

    const x = rect.left + rect.width / 2 + (Math.random() * 50 - 25);
    const y = rect.top + (Math.random() * 20 - 10);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
    heart.style.setProperty('--rot', `${(Math.random() - 0.5) * 70}deg`);
    heart.style.fontSize = `${1.6 + Math.random() * 1.4}rem`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  }
}

// Interactive Toast Notification
let toastTimeout = null;
function showToastNotification(message) {
  let toast = document.querySelector('.like-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'like-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class='bx bx-check-circle' style='color: var(--accent-2); font-size: 2rem;'></i> ${message}`;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
