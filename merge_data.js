
import fs from 'fs';

const extracted = JSON.parse(fs.readFileSync('extracted_data.json', 'utf8'));

const eventMapping = {
    'chess': 'chessmonarch',
    'expo': 'projectexpo',
    'bridge': 'bridge',
    'lathe': 'lathemaster',
    'roborace': 'roborace',
    'design': 'designfreak',
    'slide': 'slideplain',
    'casting': 'castingcrowns',
    'engine': 'enginemontage',
    'quiz': 'quiz',
    'cult': 'cult',
    'mania': 'mania'
};

const workshopMapping = {
    'robotics': 'hbaja',
    'ev': 'ndt',
    'vr': 'vr'
};

const currentEvents = [
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
    },
    {
        id: 'mania',
        name: 'Mech-O-Mania',
        tagline: 'Where Quick Thinking Meets Engineering Brilliance',
        image: '/images/lathe.jpg',
        link: 'subpages/event_mania.html',
        registrationLink: null
    }
];

const currentWorkshops = [
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
    },
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
    }
];

const updatedEvents = currentEvents.map(event => {
    const extKey = eventMapping[event.id];
    if (extKey && extracted[extKey]) {
        const ext = extracted[extKey];
        return {
            ...event,
            description: ext.description || event.tagline,
            sections: ext.sections,
            coordinators: ext.coordinators
        };
    }
    return event;
});

const updatedWorkshops = currentWorkshops.map(ws => {
    const extKey = workshopMapping[ws.id];
    if (extKey && extracted[extKey]) {
        const ext = extracted[extKey];
        return {
            ...ws,
            description: ext.description || ws.description,
            sections: ext.sections,
            coordinators: ext.coordinators
        };
    }
    return ws;
});

const output = `export const workshops = ${JSON.stringify(updatedWorkshops, null, 2)};\n\nexport const events = ${JSON.stringify(updatedEvents, null, 2)};`;
fs.writeFileSync('merged_data.js', output, 'utf8');
console.log('Done!');
