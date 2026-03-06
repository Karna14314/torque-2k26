// Centralized Data Store for Torque 2K26

export const festInfo = {
  year: '2K26',
  fullYear: '2026',
  title: 'Torque 2K26',
  university: 'Jawaharlal Nehru Technological University Kakinada',
  college: 'University College of Engineering Kakinada',
  department: 'Department of Mechanical Engineering',
  tagline: 'COMING SOON',
  festDate: '2026-04-15T09:00:00', // April 15, 2026 - Update this to actual fest date
  email: 'torque2k25@gmail.com',
  brochureLink: 'https://drive.google.com/file/d/1Oq5hlPsLnExh-L0_W1Fa91KBd_wzN4R0/view?usp=drive_link',
  socialLinks: {
    instagram: 'https://www.instagram.com/torque_2k26?igsh=OTljbjU5bHluOWto',
    youtube: 'https://youtube.com/@torque_2k26?si=ORxbhNqQoHCZqgKK'
  },
  location: {
    address: 'Department of Mechanical Engineering',
    college: 'University College of Enginnering Kakinada',
    street: 'Pithapuram Road',
    city: 'Kakinada',
    state: 'Andhra Pradesh',
    pincode: '533003',
    country: 'India',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476.9877613625749!2d82.24030630358767!3d16.979365681533412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382841a29aaaab%3A0xd7b17072d88d1f32!2sDepartment%20Of%20Mechanical%20Engineering!5e0!3m2!1sen!2sin!4v1738430403388!5m2!1sen!2sin'
  }
};

export const aboutText = [
  "Torque is the flagship technical fest hosted by the Department of Mechanical Engineering at University College of Engineering Kakinada, JNTUK. It's a celebration of innovation, creativity, and engineering excellence—a dynamic platform where some of the brightest minds come together to showcase their technical skills and problem-solving abilities.",
  "But Torque is more than just a technical symposium. It's a vibrant celebration of the mechanical engineering community, designed to encourage collaboration, knowledge-sharing, and networking between students, faculty, and industry professionals. The event serves as a catalyst to ignite a passion for engineering, nurture emerging talent, and prepare the next generation of innovators to face the challenges of tomorrow."
];

export const workshops = [
  /*
  {
    id: 'ev',
    name: 'Electric Vehicles',
    emoji: '🚗',
    tagline: 'Drive the Future!',
    image: 'https://img.freepik.com/premium-photo/bicycle-with-bike-front-words-bike-bottom_1134658-2052.jpg?w=900',
    description: 'Dive into the world of electric mobility and sustainable transportation. Learn about EV technology, battery systems, charging infrastructure, and the future of automotive engineering.',
    highlights: [
      'Hands-on experience with EV components',
      'Battery management systems',
      'Motor control and power electronics',
      'Charging infrastructure design',
      'Industry expert sessions'
    ],
    duration: '2 Days',
    level: 'Intermediate',
    prerequisites: 'Basic knowledge of electrical systems',
    registrationLink: null
  },
  {
    id: 'vr',
    name: 'Virtual Reality',
    emoji: '🥽',
    tagline: 'Immerse, Innovate, Inspire!',
    image: 'https://miro.medium.com/v2/resize:fit:831/0*pHaWxMAMhvjsBtKP.png',
    description: 'Step into the immersive world of Virtual Reality. Explore VR development, 3D modeling, interactive simulations, and applications in engineering design and training.',
    highlights: [
      'VR hardware and software fundamentals',
      '3D environment creation',
      'Interactive simulation development',
      'Engineering applications of VR',
      'Hands-on VR project development'
    ],
    duration: '2 Days',
    level: 'Beginner to Intermediate',
    prerequisites: 'Basic programming knowledge helpful',
    registrationLink: null
  },
  */
  {
    id: 'robotics',
    name: 'Robotics',
    emoji: '🤖',
    tagline: 'Join the next Industrial Revolution!',
    image: 'https://www.tdk.com/en/tech-mag/sites/default/files/2024-08/robotics-in-manufactoring.jpg',
    description: 'Master the fundamentals of robotics and automation. Learn robot kinematics, control systems, sensor integration, and programming for industrial and service robotics applications.',
    highlights: [
      'Robot design and kinematics',
      'Sensor integration and control',
      'Programming and automation',
      'Industrial robotics applications',
      'Build and program your own robot'
    ],
    duration: '3 Days',
    level: 'Intermediate to Advanced',
    prerequisites: 'Programming basics and mechanical fundamentals',
    registrationLink: null
  }
];

export const events = [
  {
    id: 'chess',
    name: 'Chess Monarch',
    tagline: 'Where Strategy Meets Supremacy',
    image: '/images/chess.jpeg',
    link: 'subpages/event_chessmonarch.html',
    registrationLink: null
  },
  {
    id: 'expo',
    name: 'Project Expo',
    tagline: 'Where Innovation Meets Inspiration',
    image: '/images/expo.png',
    link: 'subpages/event_projectexpo.html',
    registrationLink: null
  },
  {
    id: 'bridge',
    name: 'Bridge Building',
    tagline: 'Where Engineering Meets Innovation',
    image: '/images/bridge.jpg',
    link: 'subpages/event_bridge.html',
    registrationLink: null
  },
  {
    id: 'lathe',
    name: 'Lathe Master',
    tagline: 'Where Precision Meets Craftsmanship',
    image: '/images/lathe.jpg',
    link: 'subpages/event_lathemaster.html',
    registrationLink: null
  },
  {
    id: 'roborace',
    name: 'Robo Race',
    tagline: 'A High-Speed Innovation Challenge',
    image: '/images/race.jpg',
    link: 'subpages/event_roborace.html',
    registrationLink: null
  },
  {
    id: 'design',
    name: 'Design Freak',
    tagline: 'Where Ideas Take Shape in CAD',
    image: '/images/design.jpg',
    link: 'subpages/event_designfreak.html',
    registrationLink: null
  },
  {
    id: 'slide',
    name: 'Slide Plain',
    tagline: 'Where Ideas Take Flight',
    image: '/images/slide.jpg',
    link: 'subpages/event_slideplain.html',
    registrationLink: null
  },
  {
    id: 'casting',
    name: 'Casting Crown',
    tagline: 'Where precision and speed meet the art of sand casting',
    image: '/images/casting.jpg',
    link: 'subpages/event_castingcrowns.html',
    registrationLink: null
  },
  {
    id: 'engine',
    name: 'Engine Montage',
    tagline: 'Where Mechanics Meets Precision',
    image: '/images/engine.jpg',
    link: 'subpages/event_enginemontage.html',
    registrationLink: null
  },
  {
    id: 'quiz',
    name: 'Quiz',
    tagline: 'Where knowledge makes mechanical maestros',
    image: '/images/quiz.jpg',
    link: 'subpages/event_quiz.html',
    registrationLink: null
  },
  {
    id: 'cult',
    name: 'Rhythmic Fusion',
    tagline: 'A Spectacle of Dance and Energy!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyyXe75bRDY0IT1bq_3tsVKwmx5hKml2xHw&s',
    link: 'subpages/cult.html',
    registrationLink: null
  }
];

export const sponsors = [
  { 
    name: 'Ministry of Education', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-a6e3i5hUAV_sH8JWtwGeMLEnha6giIPWag&s' 
  },
  { 
    name: 'ONGC', 
    logo: 'https://logodix.com/logo/1686770.png' 
  },
  { 
    name: 'Reliance', 
    logo: 'https://rilstaticasset.akamaized.net/sites/default/files/2023-02/L.3.jpg' 
  },
  { 
    name: 'Kakinada Seaports', 
    logo: 'https://raw.githubusercontent.com/Mechanical-Department-Jntuk/Torque/refs/heads/main/images/ksp%20log.jpg' 
  },
  { 
    name: 'SBI', 
    logo: 'https://static.vecteezy.com/system/resources/previews/020/335/992/non_2x/sbi-logo-sbi-icon-free-free-vector.jpg' 
  },
  { 
    name: 'KTM', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Bq1u9Wb_eHzB_Jp-DKUvwOFChCi5qfuI2Q&s' 
  },
  { 
    name: 'Hyundai', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgh48xdx_GoagMzp0anpy_Z528DVew8SFV-Q&s' 
  },
  { 
    name: 'Harley Davidson', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0AUpQNyiUB3QuC6pt-_X-RV4BqDGQRc5O_Q&s' 
  },
  { 
    name: 'Institution of Engineers', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAItfeRU8se5e76cLSYaHBNHfwfjGjlmJLBw&s' 
  }
];

export const teamMembers = [
  // Faculty Coordinators
  { 
    name: 'Dr.V. Vara Prasad', 
    role: 'Faculty Coordinator', 
    year: null,
    phone: null, 
    image: '/images/meera.jpeg',
    category: 'faculty'
  },
  
  /*{ 
    name: 'Dr.V. Jaya Prasad', 
    role: 'Faculty Coordinator', 
    year: null,
    phone: null, 
    image: '/images/jp.jpeg',
    category: 'faculty'
  },
  */
  
  // Student Coordinators - Year IV
  { 
    name: 'EM.Tharun', 
    role: 'Student Coordinator', 
    year: 'IV',
    phone: '9398322306', 
    image: '/images/nithin.png',
    category: 'student'
  },
  { 
    name: 'M.Surya Vamsi', 
    role: 'Student Coordinator', 
    year: 'IV',
    phone: '8328396974', 
    image: '/images/surya.png',
    category: 'student'
  },
  { 
    name: 'E Mohith', 
    role: 'Student Coordinator', 
    year: 'IV',
    phone: '8317505860', 
    image: '/images/harish.jpeg',
    category: 'student'
  },
  { 
    name: 'D.K.S Bhanu', 
    role: 'Student Coordinator', 
    year: 'IV',
    phone: null, 
    image: '/images/lokya.jpg',
    category: 'student'
  },
  { 
    name: 'S.Anjum', 
    role: 'Student Coordinator', 
    year: 'IV',
    phone: null, 
    image: '/images/viharika.jpg',
    category: 'student'
  },
  { 
    name: 'T. Umesh', 
    role: 'Student Coordinator', 
    year: 'IV',
    phone: '9492266295', 
    image: '/images/ram.jpg',
    category: 'student'
  },
  
  // Technical Coordinators - Year II & I - TEMPORARILY HIDDEN
  /*
  { 
    name: 'V. Leela Krishna', 
    role: 'Technical Coordinator', 
    year: 'II',
    phone: '9701978579', 
    image: '/images/VEMULAPALLILEELAKRISHNA[1].png',
    category: 'technical'
  },
  { 
    name: 'K. Ani', 
    role: 'Technical Coordinator', 
    year: 'I',
    phone: '7013362990', 
    image: '/images/Ani.jpeg',
    category: 'technical'
  }
  */
];

export const galleryImages = [
  '/images/t1.jpg',
  '/images/t2.jpg',
  '/images/te.jpg',
  '/images/t4.jpg',
  '/images/t5.jpg',
  '/images/t6.JPG',
  '/images/t7.JPG',
  '/images/t8.JPG',
  '/images/t9.JPG',
  '/images/t10.JPG',
  '/images/t11.JPG'
];

// Developer credits
export const developers = [
  {
    name: 'Chaitanya',
    role: 'Web Developer',
    year: '2026'
  }
];
