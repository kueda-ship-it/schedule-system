const https = require('https');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const apiUrl = new URL('/rest/v1/', url);

https.get({
    hostname: apiUrl.hostname,
    path: apiUrl.pathname,
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
}, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        console.log("profiles:", Object.keys(json.definitions.profiles.properties).join(", "));
        console.log("Equipment:", Object.keys(json.definitions.Equipment.properties).join(", "));
    });
}).on('error', console.error);
