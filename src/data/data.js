// Centralized Data Store for Torque 2K26

export const festInfo = {
  year: '2K26',
  fullYear: '2026',
  title: 'Torque 2K26',
  university: 'Jawaharlal Nehru Technological University Kakinada',
  college: 'University College of Engineering Kakinada',
  department: 'Department of Mechanical Engineering',
  tagline: 'COMING SOON',
  festDate: '2026-04-15T09:00:00',
  email: 'torque2k26@gmail.com',
  brochureLink: 'https://drive.google.com/file/d/1Oq5hlPsLnExh-L0_W1Fa91KBd_wzN4R0/view?usp=drive_link',
  registrationOpen: true,
  registrationOpenDate: '2026-03-14T09:00:00',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbxTcig1pdGvfMOkWv2B7WipM4XEQJwbaRyMt0CvAs47EkysZin-cVSXbYaFItXFganmNQ/exec',
  upiId: 'torque2k26@upi',
  upiName: 'Torque 2K26',
  upiQr: null,
  socialLinks: {
    twitter: 'https://x.com/TORQUE_2K25?t=ILgS1XjD_ygM9mzeEA1mbQ&s=08',
    instagram: 'https://www.instagram.com/torque_2k26?igsh=OTljbjU5bHluOWto',
    youtube: 'https://youtube.com/@torque_2k26?si=ORxbhNqQoHCZqgKK'
  },
  location: {
    address: 'Department of Mechanical Engineering',
    college: 'University College of Engineering Kakinada',
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
  {
    "id": "robotics",
    "name": "Robotics",
    "emoji": "🤖",
    "tagline": "Join the next Industrial Revolution!",
    "image": "https://www.tdk.com/en/tech-mag/sites/default/files/2024-08/robotics-in-manufactoring.jpg",
    "description": "Master the fundamentals of robotics and automation. Learn robot kinematics, control systems, sensor integration, and programming for industrial and service robotics applications.",
    "highlights": [
      "Robot design and kinematics",
      "Sensor integration and control",
      "Programming and automation",
      "Industrial robotics applications",
      "Build and program your own robot"
    ],
    "duration": "3 Days",
    "level": "Intermediate to Advanced",
    "prerequisites": "Programming basics and mechanical fundamentals",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 200,
      "external": 500,
      "onsite": 600
    },
    "upiId": null,
    "upiQr": null,
    "sections": [
      {
        "type": "text",
        "title": "🔹 What You’ll Learn:",
        "content": "✅ Basics of robotics & automation.\r\n            ✅ Hands-on experience with sensors & actuators\r\n            \r\n             ✅ Real-world applications & project-building\r\n             \r\n            Certificate of Participation::  Enhance your skills with official recognition."
      }
    ],
    "coordinators": [
      {
        "name": "T Umesh",
        "phone": "+91 9492266295",
        "image": "/images/cordinators/Umesh.jpeg"
      },
      {
        "name": "S Anjum",
        "phone": null,
        "image": "/images/cordinators/Anjum.jpeg"
      }

    ]
  },
  /*
  {
    "id": "ev",
    "name": "Electric Vehicles",
    "emoji": "🚗",
    "tagline": "Drive the Future!",
    "image": "https://img.freepik.com/premium-photo/bicycle-with-bike-front-words-bike-bottom_1134658-2052.jpg?w=900",
    "description": "Dive into the world of electric mobility and sustainable transportation. Learn about EV technology, battery systems, charging infrastructure, and the future of automotive engineering.",
    "highlights": [
      "Hands-on experience with EV components",
      "Battery management systems",
      "Motor control and power electronics",
      "Charging infrastructure design",
      "Industry expert sessions"
    ],
    "duration": "2 Days",
    "level": "Intermediate",
    "prerequisites": "Basic knowledge of electrical systems",
    "registrationLink": null,
    "sections": [
      {
        "type": "text",
        "title": "Get charged up! ⚡Join our Electric Vehicle Workshop and dive into the world of sustainable transportation.",
        "content": "Keynote Speaker: Dr.Venkata Reddy, renowned expert in EV, shares insights on the future of EV..\r\n            \r\n            Hands-on-session: Live demos and interactive discussions will give you unparalleled insights into the world of EV.\r\n         \r\n            Certificate of Participation:  Enhance your skills with official recognition."
      }
    ],
    "coordinators": []
  },
  {
    "id": "vr",
    "name": "Virtual Reality",
    "emoji": "🥽",
    "tagline": "Immerse, Innovate, Inspire!",
    "image": "https://miro.medium.com/v2/resize:fit:831/0*pHaWxMAMhvjsBtKP.png",
    "description": "Step into the immersive world of Virtual Reality. Explore VR development, 3D modeling, interactive simulations, and applications in engineering design and training.",
    "highlights": [
      "VR hardware and software fundamentals",
      "3D environment creation",
      "Interactive simulation development",
      "Engineering applications of VR",
      "Hands-on VR project development"
    ],
    "duration": "2 Days",
    "level": "Beginner to Intermediate",
    "prerequisites": "Basic programming knowledge helpful",
    "registrationLink": null,
    "sections": [
      {
        "type": "text",
        "title": "Join us for an immersive experience in VR, featuring",
        "content": "Expert Talk: [Name], a leading VR specialist, shares insights on the future of VR.-->\r\n            Hands-on-experience:  Try live VR demos, interactive simulations, and development basics.\r\n            \r\n            Certificate of Participation::  Enhance your skills with official recognition."
      }
    ],
    "coordinators": [
      {
        "name": "V. Ramya Suchitha",
        "phone": null,
        "image": "/images/nik.jpg"
      }
    ]
  }
  */
];

export const events = [
  {
    "id": "chess",
    "name": "Chess Monarch",
    "tagline": "Where Strategy Meets Supremacy",
    "image": "/images/chess.jpeg",
    "link": "subpages/event_chessmonarch.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "\"Welcome to Chess Monarch: A Celebration of Intellectual Prowess, Strategic Brilliance, and Mind-Sport Excellence!\" Join us on a journey to unleash the power of chess and crown the ultimate champion. This event is the ultimate platform for chess enthusiasts to showcase their skills, strategies, and mental agility in a battle of wits that will leave only one victorious.",
    "sections": [
      {
        "type": "table",
        "title": "Tournament Details",
        "content": [
          {
            "label": "Mode",
            "value": "Online"
          },
          {
            "label": "Platform",
            "value": "Lichess"
          },
          {
            "label": "Format",
            "value": "Swiss tournament"
          },
          {
            "label": "Rounds",
            "value": "Seven rounds"
          },
          {
            "label": "Time Control",
            "value": "15 minutes (No increment)"
          },
          {
            "label": "Date",
            "value": "26-03-2026"
          },
          {
            "label": "Entry Fee",
            "value": "Rs 100/-"
          }
        ]
      },
      {
        "type": "list",
        "title": "Rules and Regulations",
        "content": [
          "All participants must have a Lichess account and be familiar with the platform's rules and regulations.",
          "The tournament will be played with a standard chess clock, with no time increment per move.",
          "Players are expected to be online and ready to play at the scheduled start time for each round.",
          "Any player who is not online and ready to play within 10 minutes of the scheduled start time will be forfeited.",
          "The tournament director's decisions are final and binding."
        ]
      },
      {
        "type": "text",
        "title": "Prizes and Recognition",
        "content": "Winner: The winner of the tournament will be crowned the Chess Monarch and will receive a prize.\r\n            Top 3 Players: The top 3 players will receive prizes and certificates of recognition.\r\n            All Participants: All participants will receive a certificate of participation and a chance to improve their chess skills."
      },
      {
        "type": "list",
        "title": "How to Participate",
        "content": [
          "Create a Lichess account if you don't already have one.",
          "Register for the tournament by clicking on the \"Register Now\" button above or scanning the QR code on the official Torque poster.",
          "Pay the entry fee of Rs 100/- through the provided payment methods.",
          "Make sure to be online and ready to play at the scheduled start time for each round."
        ]
      }
    ],
    "coordinators": [
      {
        "name": "G Veera Babu",
        "phone": "+91 8790931082",
        "image": "/images/cordinators/veera.jpeg"
      },
      {
        "name": "S Jyoshna",
        "phone": null,
        "image": "/images/cordinators/joshna.jpeg"
      }
    ]
  },
  {
    "id": "expo",
    "name": "Project Expo",
    "tagline": "Where Innovation Meets Inspiration",
    "image": "/images/expo.png",
    "link": "subpages/event_projectexpo.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "A Celebration of Creativity, Innovation, and Groundbreaking Ideas! Join us on a journey to unleash the power of imagination and innovation. This event is the ultimate platform for brilliant minds to showcase their cutting-edge projects, prototypes, presentations, inventions, and solutions that have the potential to transform the future.",
    "sections": [
      {
        "type": "text",
        "title": "Event Format",
        "content": "Project Exhibition: Teams (of maximum 4) will showcase their projects, prototypes, and posters during the event.\r\n                Judging and Evaluation: Projects will be evaluated based on innovation, creativity, feasibility, scalability, and impact.\r\n                  \r\n               Note: Poster Presentations are allowed in the event, it is not mandatory to have prototype of your project."
      }
    ],
    "coordinators": [
      {
        "name": "A Vijay Sekhar",
        "phone": "+91 9010826943",
        "image": "/images/cordinators/vijay.jpeg"
      },
      {
        "name": "M Keerthi",
        "phone": null,
        "image": "/images/cordinators/keerthi.jpeg"
      }
    ]
  },
  {
    "id": "bridge",
    "name": "Bridge Building",
    "tagline": "Where Engineering Meets Innovation",
    "image": "/images/bridge.jpg",
    "link": "subpages/event_bridge.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Are you ready to put your engineering skills to the test and build a structure that stands strong against the forces of nature? Bridge Battleground is an exciting challenge where participants must design and construct a sturdy bridge using limited materials while demonstrating their knowledge of structural mechanics and load distribution. This event combines creativity, technical expertise, and hands-on problem-solving.",
    "sections": [
      {
        "type": "text",
        "title": "Event Highlights",
        "content": "Materials Provided: Participants will be given a set of materials (e.g., popsicle sticks, straws, glue, threads) and must construct a strong and stable bridge within the given time.\r\n                Time Limit: Participants will have 2 hours to complete their bridge.\r\n                Testing Criteria: The bridge will be tested for strength, load-bearing capacity, and efficiency.\r\n                Prizes: Exciting prizes await those who can combine smart engineering with innovative thinking."
      },
      {
        "type": "text",
        "title": "Judging Criteria",
        "content": "Strength: The bridge must withstand the maximum load without collapsing.\r\n                Efficiency: The bridge should use materials optimally with minimal waste.\r\n                Design: Creativity and innovation in the bridge's design will be evaluated.\r\n                Adherence to Rules: Compliance with the provided guidelines and time limit."
      }
    ],
    "coordinators": [
      {
        "name": "E Mohit",
        "phone": "+91 8317505860",
        "image": "/images/cordinators/Mohith.jpeg"
      }
    ]
  },
  {
    "id": "lathe",
    "name": "Lathe Master",
    "tagline": "Where Precision Meets Craftsmanship",
    "image": "/images/lathe.jpg",
    "link": "subpages/event_lathemaster.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Think you’ve got what it takes to shape raw materials into finely crafted components? *Lathe Master* is an exciting machining competition where skill, accuracy, and creativity come together! This event challenges you to create precise mechanical parts using a lathe machine, demonstrating both your technical and creative abilities.",
    "sections": [
      {
        "type": "text",
        "title": "Event Format",
        "content": "Competition: Participants will use industry-standard lathes to create precise mechanical parts.\r\n            Judging Criteria: Projects will be evaluated based on dimensional accuracy, surface finish, and time efficiency."
      }
    ],
    "coordinators": [
      {
        "name": "B Raja",
        "phone": "9010882295",
        "image": "/images/cordinators/Raja.jpeg"
      },
      {
        "name": "D Soujanya",
        "phone": null,
        "image": "/images/cordinators/Soujanya.jpeg"
      }
    ]
  },
  {
    "id": "roborace",
    "name": "Robo Race",
    "tagline": "A High-Speed Innovation Challenge",
    "image": "/images/race.jpg",
    "link": "subpages/event_roborace.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Robo Race is an electrifying technical event designed to challenge the speed, agility, and innovation of robotic designs.",
    "sections": [
      {
        "type": "text",
        "title": "Event Format",
        "content": "Robo Race is an exhilarating technical event where participants bring their self-designed and self-assembled robots to compete against each other. The challenge is to navigate a predefined track filled with twists, turns, and obstacles to test the efficiency and adaptability of the robot. The robots must be manually controlled via remote control, Bluetooth, or Wi-Fi. The robot must remain within the track boundaries at all times; stepping out may lead to disqualification."
      },
      {
        "type": "text",
        "title": "Judging Criteria",
        "content": "Participants will be evaluated based on the following key aspects:\r\n\r\n                            Speed & Efficiency - The fastest bot to complete the track wins.\r\n                            Path Adherence - Staying within the track boundaries, deviations result in disqualification.\r\n                            Obstacle Handling - The bot must smoothly navigate hurdles without getting stuck.\r\n                            Design & Innovation - Bonus points may be awarded for creative design and efficient algorithms."
      }
    ],
    "coordinators": [
      {
        "name": "V lalith nandan",
        "phone": "+91 6301774273",
        "image": "/images/cordinators/Lalith.jpeg"
      },
      {
        "name": "D K S Bhanu",
        "phone": null,
        "image": "/images/cordinators/Bhanu.jpeg"
      }
    ]
  },
  {
    "id": "design",
    "name": "Design Freak",
    "tagline": "Where Ideas Take Shape in CAD",
    "image": "/images/design.jpg",
    "link": "subpages/event_designfreak.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Fancy being a design geek, a blend of precise engineering with a series of creative ideas? Design Freak is a revolutionary CAD modelling competition where innovation meets engineering excellence! This event challenges you to create an elaborate 3D model in standard CAD software like AutoCAD or CATIA.",
    "sections": [
      {
        "type": "text",
        "title": "Event Highlights",
        "content": "Design Challenge: Work on a design challenge or model a real-world mechanical component in CAD software."
      },
      {
        "type": "text",
        "title": "Judging Criteria",
        "content": "Accuracy: Precision in replicating the design or component.\r\n             Time Efficiency: Speed and efficiency in completing the task.\r\n            Creativity: Innovative and unique design elements."
      }
    ],
    "coordinators": [
      {
        "name": "P Satya Prakash ",
        "phone": "+91 9347814093",
        "image": "/images/cordinators/prakash.jpeg"
      }, {
        "name": "M venkata Lakshmi ",
        "phone": null,
        "image": "/images/cordinators/Lakshmi.jpeg"
      }
    ]
  },
  {
    "id": "slide",
    "name": "Slide Plain",
    "tagline": "Where Ideas Take Flight",
    "image": "/images/slide.jpg",
    "link": "subpages/event_slideplain.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Do you have a game-changing idea that can revolutionize the world of mechanical engineering? Slide Plain is the ultimate idea presentation competition where creativity meets technical expertise! As a part of TORQUE, this event challenges participants to present their innovative concepts with clarity, precision, and impact.",
    "sections": [
      {
        "type": "text",
        "title": "Event Highlights",
        "content": "Showcase Your Ideas: Present innovative concepts in mechanical engineering with engaging slides and technical explanations.\r\n                Judging Criteria: Originality, feasibility, technical depth, and presentation skills.\r\n                Compete and Win: Compete with brilliant minds and win exciting prizes!"
      }
    ],
    "coordinators": [
      {
        "name": "R Raj Kumar",
        "phone": "+91 9347161542",
        "image": "/images/cordinators/rajkumar.jpeg"
      },
      {
        "name": "R kavya",
        "phone": null,
        "image": "/images/cordinators/Kavya.jpeg"
      }
    ]
  },
  {
    "id": "casting",
    "name": "Casting Crown",
    "tagline": "Where precision and speed meet the art of sand casting",
    "image": "/images/casting.jpg",
    "link": "subpages/event_castingcrowns.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Participants will demonstrate their proficiency in sand casting, a foundational foundry process in mechanical engineering. The goal is to create a flawless sand mold for a given design within the shortest time while adhering to standard practices. Competitors will be judged on speed, mold quality, and technical execution.",
    "sections": [
      {
        "type": "text",
        "title": "Technical Process",
        "content": "Step 1: A pre-designed 3D pattern will be provided.\r\n                Step 2: Competitors must ensure proper sand compaction and uniformity to avoid defects like blowholes or misruns.\r\n                Step 3: Mold creation by drag preparation, cope assembly, and mold closing."
      },
      {
        "type": "text",
        "title": "Judging Criteria",
        "content": "Mold Quality: Precision and uniformity of the sand mold.\r\n                Design Accuracy: Adherence to the provided 3D pattern.\r\n                Time of Completion: Efficiency in completing the task within the shortest time."
      }
    ],
    "coordinators": [
      {
        "name": "Y Vishal",
        "phone": "+91 7075589309",
        "image": "/images/cordinators/vishal.jpeg"
      },
      {
        "name": "K Haritha",
        "phone": null,
        "image": "/images/cordinators/Haritha.jpeg"
      }
    ]
  },
  {
    "id": "engine",
    "name": "Engine Montage",
    "tagline": "Where Mechanics Meets Precision",
    "image": "/images/engine.jpg",
    "link": "subpages/event_enginemontage.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "\"Welcome to Engine Montage: A Celebration of Mechanical Skill, Precision, and Automotive Engineering!\" Join us on a journey to explore the intricacies of internal combustion engines and the art of their assembly. This event is the ultimate platform for aspiring mechanics and engineers to showcase their skills in assembling an automobile engine. Participants will gain practical experience and knowledge of engine components and their proper assembly, which is crucial for preventing engine failure.",
    "sections": [
      {
        "type": "text",
        "title": "Event Format",
        "content": "Engine Assembly: Teams (of maximum 4) will assemble an internal combustion engine under expert supervision during the event.\r\n            Judging and Evaluation: Assemblies will be evaluated based on accuracy, precision, adherence to specifications, teamwork, and efficiency.\r\n            Note: There is no time limit for the event. The team that completes the assembly and disassembly in the least time will be declared the winner."
      }
    ],
    "coordinators": [
      {
        "name": "B Sai",
        "phone": "+91 9441725173",
        "image": "/images/cordinators/Bsai.jpeg"
      },
      {
        "name": "M Harshitha",
        "phone": null,
        "image": "/images/cordinators/Harshita.jpeg"
      }
    ]
  },
  {
    "id": "quiz",
    "name": "Quiz",
    "tagline": "Where knowledge makes mechanical maestros",
    "image": "/images/quiz.jpg",
    "link": "subpages/event_quiz.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "Where knowledge makes mechanical maestros",
    "sections": [
      {
        "type": "text",
        "title": "CALLING ALL MECHANICAL MAESTROS! \r\n⚙",
        "content": "Get ready to rev your engines and put your knowledge to the test at the Mechanical quiz"
      },
      {
        "type": "text",
        "title": "Event Format",
        "content": "Ignite your mind:Tackle questions that span the breadth of Mechanical Engineering.\r\n                Compete and Connect:Go head-to-head with fellow enthusiasts, learn from each other, and forge new connections \r\n              Win Big!:Claim Exciting prizes for your prowess."
      }
    ],
    "coordinators": [
      {
        "name": "M Hemanth",
        "phone": "+91 6302823412",
        "image": "/images/cordinators/hemanth.jpeg"
      },
      {
        "name": "ChN Navya",
        "phone": null,
        "image": null
      }
    ]
  },
  {
    "id": "cult",
    "name": "Rhythmic Fusion",
    "tagline": "A Spectacle of Dance and Energy!",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyyXe75bRDY0IT1bq_3tsVKwmx5hKml2xHw&s",
    "link": "subpages/cult.html",
    "registrationLink": null,
    "prices": {
      "internalME": 0,
      "internalOthers": 100,
      "external": 150,
      "onsite": 200
    },
    "upiId": null,
    "upiQr": null,
    "description": "A Spectacle of Dance and Energy!",
    "sections": [
      {
        "type": "text",
        "title": "Event Overview",
        "content": "Get ready to witness an electrifying display of rhythm, grace, and energy! Rhythmic Fusion is a cultural dance performance presented as part of Torque, adding a vibrant touch to the technical fest. This non-competitive event is all about celebrating the passion for dance, bringing together performers to showcase their talent, coordination, and creativity on stage."
      },
      {
        "type": "text",
        "title": "Event Highlights",
        "content": "Engaging Performances: Talented students adding a cultural spark to the fest.\r\n    Perfect Blend: A mix of music, movement, and expression to entertain and energize the audience.\r\n    Creative Platform: A chance for performers to exhibit their creativity and stage presence in front of peers and faculty."
      },
      {
        "type": "text",
        "title": "Why Attend?",
        "content": "This event is a celebration of art and expression, giving participants an opportunity to embrace the joy of dancing without the pressure of competition. It's a moment to unite through rhythm, captivate the audience, and make unforgettable memories at Torque.\r\n    So, let the beats drop, the moves flow, and the stage come alive with Rhythmic Fusion! 🎶💃🔥"
      }
    ],
    "coordinators": [
      {
        "name": "B Chandu",
        "phone": null,
        "image": "/images/cordinators/chandu.jpeg"
      },

    ]
  },
  /*
  {
    "id": "mania",
    "name": "Mech-O-Mania",
    "tagline": "Where Quick Thinking Meets Engineering Brilliance",
    "image": "/images/lathe.jpg",
    "link": "subpages/event_mania.html",
    "registrationLink": null,
    "description": "Where Quick Thinking Meets Engineering Brilliance",
    "sections": [
      {
        "type": "text",
        "title": "A Just-A-Minute Challenge",
        "content": "Are you ready to put your mechanical knowledge and spontaneity to the test? Mech-O-Mania (JAM) is an exhilarating one-minute challenge where participants must think on their feet and deliver precise, creative, and technically sound responses on mechanical topics. This event is the ultimate blend of technical expertise, communication skills, and quick decision-making!"
      },
      {
        "type": "text",
        "title": "Event Highlights:",
        "content": "• You will be given a mechanical engineering topic and must speak on it for one minute without hesitation, repetition, or deviation.\r\n                • Judging criteria will be based on technical accuracy, fluency, confidence, and creativity.\r\n                • Exciting prizes await the best performers who can combine knowledge and eloquence under pressure.\r\n                Get ready to think fast, speak smart, and win big!"
      }
    ],
    "coordinators": [
      {
        "name": "K. Madhan Kumar",
        "phone": "+91 9392595704",
        "image": "/images/nik.jpg"
      }
    ]
  }
  */
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
  /*{
    name: 'Dr.K. Meera Saheb',
    role: 'Faculty Coordinator',
    year: null,
    phone: null,
    image: '/images/meera.jpeg',
    category: 'faculty'
  },
  */
  {
    name: 'Dr.V. Vara Prasad',
    role: 'Faculty Coordinator',
    year: null,
    phone: null,
    image: '/images/cordinators/drvvaraprased.jpeg',
    category: 'faculty'
  },
  


  // Added from previous list
  {
    name: 'EM.Tharun',
    role: 'Student Coordinator',
    year: 'IV',
    phone: '9398322306',
    image: '/images/cordinators/tharun.jpeg',
    category: 'student'
  },
  {
    name: 'M.Surya Vamsi',
    role: 'Student Coordinator',
    year: 'IV',
    phone: '8328396974',
    image: '/images/cordinators/surya1.jpeg',
    category: 'student'
  },
  {
    name: 'E Mohit',
    role: 'Student Coordinator',
    year: 'IV',
    phone: '8317505860',
    image: '/images/cordinators/Mohith.jpeg',
    category: 'student'
  },
  {
    name: 'D.K.S Bhanu',
    role: 'Student Coordinator',
    year: 'IV',
    phone: null,
    image: '/images/cordinators/Bhanu.jpeg',
    category: 'student'
  },
  {
    name: 'S.Anjum',
    role: 'Student Coordinator',
    year: 'IV',
    phone: null,
    image: '/images/cordinators/Anjum.jpeg',
    category: 'student'
  },
  {
    name: 'T. Umesh',
    role: 'Student Coordinator',
    year: 'IV',
    phone: '9492266295',
    image: '/images/cordinators/Umesh.jpeg',
    category: 'student'
  },
];

export const galleryImages = [
  '/images/t1.jpg',
  '/images/te.jpg',
  '/images/gallery/g4.jpeg',
  '/images/gallery/g3.jpeg',
  '/images/gallery/g5.jpeg',
  '/images/gallery/g6.jpeg',
  '/images/gallery/g7.jpeg',
  '/images/gallery/g8.jpeg',
  '/images/gallery/g9.jpeg',
  '/images/gallery/g10.jpeg',
  '/images/gallery/g11.jpeg',

];

// Developer credits
export const developers = [
  {
    name: 'Chaitanya',
    role: 'Web Developer',
    year: '2026'
  }
];
