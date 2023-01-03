export const debug = false; // window.document.location.href.includes('localhost') || window.document.location.href.includes('?debug');
export const practices = {
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

export const practicesForDisplay = [
    {
        category: 'Reframing Work Design',
        practices: [
            'stop-work-authority',
            'emotional-ambivalence',
            'managing-reliability-drift',
        ],
    },
    {
        category: 'Reframing Work Training',
        practices: [
            'emergency-drills',
            'tabletop-exercises',
            'just-in-time-learning',
            'post-event-debriefings',
        ],
    },
    {
        category: 'Reframing Relating Colleagues Peers',
        practices: [
            'institutionalizing-prosocial-motivation',
            'fostering-social-ties-and-mutual-respect',
        ],
    },
    {
        category: 'Reframing How the Work Should Be Done',
        practices: [
            'practicing-mindfulness',
            'fostering-sense-of-accountability'
        ],
    },
    {
        category: 'Reframing Work Communication',
        practices: [
            'implementing-safety-huddles',
            'reporting-near-misses-incidents',
        ],
    }
];


export const practicesForCritique = practicesForDisplay.flatMap((category) => (
    category.practices.flatMap((id) => (
        {
            id,
            label: practices[id].label
        }
    ))
));

export const makeId = (prefix = '', length = 6) => `${prefix}${Math.random().toString(36).substr(2, 2 + length)}`;

const getRandomValue = (range = [0, 100]) =>
    range[0] + Math.round((range[1] - range[0]) * Math.random());

const createPractices = () => (
    Object.keys(practices).reduce((acc, cur) => {
        acc[cur] = {
            ...practices[cur],
            value: getRandomValue(),
        };
        return acc;
    }, {})
);

export const getSelected = (strategies) => {
    if (strategies.length > 0) {
        const strategy = strategies[0];
        return {
            selectedStrategy: strategy.id,
            selectedCritique: strategy.critiques.length > 0 ? strategy.critiques[0].id : '',
        }
    }
    return {
        selectedStrategy: '',
        selectedCritique: '',
    }
}

export const createStategy = (props = {}) => {
    const id = makeId();
	return {
		id,
		name: 'Strategy',
		description: 'A description of this strategy',
		model: 'V00.01',
		lastModified: new Date(),
		critiques: [
            createCritique(id),
        ],
        practices: createPractices(),
		...props,
	};
}

export const createCritique = (strategyId, props = {}) => {
	const id = makeId();
	return {
		id,
        strategyId,
		name: 'Critique',
		practice: '',
		...props,
	};
}
