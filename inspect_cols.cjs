const https = require('https');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

https.get({
    hostname: new URL(url).hostname,
    path: '/rest/v1/Equipment?select=*&limit=1',
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
}, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const rows = JSON.parse(data);
        if (rows.length > 0) {
            console.log("--- Equipment Columns ---");
            console.log(Object.keys(rows[0]));
            console.log("\n--- Sample Raw Data ---");
            console.log(JSON.stringify(rows[0], null, 2));
        } else {
            console.log("No Equipment data found.");
        }

        // Also check profiles
        https.get({
            hostname: new URL(url).hostname,
            path: '/rest/v1/profiles?select=*&limit=1',
            headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
        }, (res2) => {
            let data2 = '';
            res2.on('data', (chunk) => data2 += chunk);
            res2.on('end', () => {
                const rows2 = JSON.parse(data2);
                if (rows2.length > 0) {
                    console.log("\nprofiles columns:", Object.keys(rows2[0]).join(", "));
                }
            });
        });
    });
}).on('error', console.error);
