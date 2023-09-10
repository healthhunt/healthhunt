import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

console.log(data.map(d => d.title).join('\n'));