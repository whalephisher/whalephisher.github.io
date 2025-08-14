const projects = [
    {
        id: 'data-pipelines',
        title: 'Data Pipelines',
        description: 'Incremental ELT with orchestration, schema evolution, and backfills at scale.',
        tags: ['Python', 'Airflow', 'ELT'],
        image: process.env.PUBLIC_URL + '/logo512.png',
        repo: 'https://github.com/whalephisher',
        live: '',
    },
    {
        id: 're-notes',
        title: 'RE Notes',
        description: 'A collection of reverse engineering write-ups and scripts for automating analysis.',
        tags: ['Python', 'Reverse Engineering'],
        image: process.env.PUBLIC_URL + '/logo512.png',
        repo: 'https://github.com/whalephisher',
        live: '',
    },
    {
        id: 'analytics-layer',
        title: 'Analytics Layer',
        description: 'dbt models and tests that power clean, trusted metrics for BI and ML features.',
        tags: ['dbt', 'SQL', 'Testing'],
        image: process.env.PUBLIC_URL + '/logo512.png',
        repo: 'https://github.com/whalephisher',
        live: '',
    },
];

export default projects;
