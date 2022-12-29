export const makeId = (prefix = '', length = 6) => `${prefix}${Math.random().toString(36).substr(2, 2 + length)}`;

export const sliders = {
    'stop-work-authority': {
        label: 'Stop-Work Authority',
        id: 'stop-work-authority',
        value: 0,
        category: 'Reframing Work Design'
    },
    'emotional-ambivalence': {
        label: 'Emotional Ambivalence',
        id: 'emotional-ambivalence',
        value: 0,
        category: 'Reframing Work Design'
    },
    'managing-reliability-drift': {
        label: 'Managing Reliability Drift',
        id: 'managing-reliability-drift',
        value: 0,
        category: 'Reframing Work Design'
    },
    'emergency-drills': {
        label: 'Emergency Drills',
        id: 'emergency-drills',
        value: 0,
        category: 'Reframing Work Training'
    },
    'tabletop-exercises': {
        label: 'Tabletop Exercises',
        id: 'tabletop-exercises',
        value: 0,
        category: 'Reframing Work Training'
    },
    'just-in-time-learning': {
        label: 'Just-In-Time-Learning',
        id: 'just-in-time-learning',
        value: 0,
        category: 'Reframing Work Training'
    },
    'post-event-debriefings': {
        label: 'Post-Event Debriefings',
        id: 'post-event-debriefings',
        value: 0,
        category: 'Reframing Work Training'
    },
    'institutionalizing-prosocial-motivation': {
        label: 'Institutionalizing Prosocial Motivation',
        id: 'institutionalizing-prosocial-motivation',
        value: 0,
        category: 'Reframing Relating Colleagues Peers'
    },
    'fostering-social-ties-and-mutual-respect': {
        label: 'Fostering Social Ties and Mutual Respect',
        id: 'fostering-social-ties-and-mutual-respect',
        value: 0,
        category: 'Reframing Relating Colleagues Peers'
    },
    'practicing-mindfulness': {
        label: 'Practicing Mindfulness',
        id: 'practicing-mindfulness',
        value: 0,
        category: 'Reframing How the Work Should Be Done'
    },
    'fostering-sense-of-accountability': {
        label: 'Fostering Sense of Accountability',
        id: 'fostering-sense-of-accountability',
        value: 0,
        category: 'Reframing How the Work Should Be Done'
    },
    'implementing-safety-huddles': {
        label: 'Implementing Safety Huddles',
        id: 'implementing-safety-huddles',
        value: 0,
        category: 'Reframing Work Communication'
    },
    'reporting-near-misses-incidents': {
        label: 'Reporting Near-Misses/Incidents',
        id: 'reporting-near-misses-incidents',
        value: 0,
        category: 'Reframing Work Communication'
    }
};

const createSliders = () => (
    Object.keys(sliders).reduce((acc, cur) => {
        acc[cur] = {...sliders[cur]};
        return acc;
    }, {})
);

export const slidersForDisplay = [
    {
        category: 'Reframing Work Design',
        items:[
            'stop-work-authority',
            'emotional-ambivalence',
            'managing-reliability-drift',
        ],
    },
    {
        category: 'Reframing Work Training',
        items: [
            'emergency-drills',
            'tabletop-exercises',
            'just-in-time-learning',
            'post-event-debriefings',
        ],
    },
    {
        category: 'Reframing Relating Colleagues Peers',
        items: [
            'institutionalizing-prosocial-motivation',
            'fostering-social-ties-and-mutual-respect',
        ],
    },
    {
        category: 'Reframing How the Work Should Be Done',
        items: [
            'practicing-mindfulness',
            'fostering-sense-of-accountability'
        ],
    },
    {
        category: 'Reframing Work Communication',
        items: [
            'implementing-safety-huddles',
            'reporting-near-misses-incidents',
        ],
    }
];

export const createStategy = (props = {}) => {
	const id = makeId();
	return {
		id,
		name: `Strategy ${id}`,
		description: '[Description goes here]',
		model: 'V1',
		lastModified: new Date(),
		critiques: [],
        items: createSliders(),
		...props,
	};
}

export const createCritique = (props = {}) => {
	const id = makeId();
	return {
		id,
		name: `Critique [${id}]`,
		description: '[Description goes here]',
		model: 'V1',
		lastModified: new Date(),
		critiques: [],
		...props,
	};
}


// export const slidersForDisplay = Object.values(sliders).reduce((acc, cur) => {
//     const {label, id, value, category} = cur;
//     if (!acc[category]) {
//         acc[category] = [];
//     }
//     acc[category].push(id);
//     return acc;
// }, {});

console.log(slidersForDisplay);

// const sliders = [
//     {
//         label: 'Stop-Work Authority',
//         id: 'stop-work-authority',
//         value: 0,
//         category: 'Reframing Work Design'
//     },
//     {
//         label: 'Emotional Ambivalence',
//         id: 'emotional-ambivalence',
//         value: 0,
//         category: 'Reframing Work Design'
//     },
//     {
//         label: 'Managing Reliability Drift',
//         id: 'managing-reliability-drift',
//         value: 0,
//         category: 'Reframing Work Design'
//     },
//     {
//         label: 'Emergency Drills',
//         id: 'emergency-drills',
//         value: 0,
//         category: 'Reframing Work Training'
//     },
//     {
//         label: 'Tabletop Exercises',
//         id: 'tabletop-exercises',
//         value: 0,
//         category: 'Reframing Work Training'
//     },
//     {
//         label: 'Just-In-Time-Learning',
//         id: 'just-in-time-learning',
//         value: 0,
//         category: 'Reframing Work Training'
//     },
//     {
//         label: 'Post-Event Debriefings',
//         id: 'post-event-debriefings',
//         value: 0,
//         category: 'Reframing Work Training'
//     },
//     {
//         label: 'Institutionalizing Prosocial Motivation',
//         id: 'institutionalizing-prosocial-motivation',
//         value: 0,
//         category: 'Reframing Relating Colleagues Peers'
//     },
//     {
//         label: 'Fostering Social Ties and Mutual Respect',
//         id: 'fostering-social-ties-and-mutual-respect',
//         value: 0,
//         category: 'Reframing Relating Colleagues Peers'
//     },
//     {
//         label: 'Practicing Mindfulness',
//         id: 'practicing-mindfulness',
//         value: 0,
//         category: 'Reframing How the Work Should Be Done'
//     },
//     {
//         label: 'Fostering Sense of Accountability',
//         id: 'fostering-sense-of-accountability',
//         value: 0,
//         category: 'Reframing How the Work Should Be Done'
//     },
//     {
//         label: 'Implementing Safety Huddles',
//         id: 'implementing-safety-huddles',
//         value: 0,
//         category: 'Reframing Work Communication'
//     },
//     {
//         label: 'Reporting Near-Misses/Incidents',
//         id: 'reporting-near-misses-incidents',
//         value: 0,
//         category: 'Reframing Work Communication'
//     },
// ];