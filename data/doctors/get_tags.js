import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

const tags = new Set(data.flatMap(d => d.tags));

console.log([...tags]);