const https = require('https');
const fs = require('fs');

function getEnvData() {
    try {
        const env = fs.readFileSync('.env', 'utf8');
        const urlMatch = env.match(/VITE_SUPABASE_URL=(.*)/);
        const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/);
        if (!urlMatch || !keyMatch) throw new Error("Could not parse .env");
        return { url: urlMatch[1].trim(), key: keyMatch[1].trim() };
    } catch (e) {
        console.error("Error reading .env:", e);
        process.exit(1);
    }
}

async function main() {
    const { url, key } = getEnvData();
    const apiUrl = new URL('/rest/v1/', url);

    const options = {
        hostname: apiUrl.hostname,
        path: apiUrl.pathname + apiUrl.search,
        method: 'GET',
        headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`
        }
    };

    https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                if (json.definitions && json.definitions.Equipment) {
                    console.log("Equipment columns:", Object.keys(json.definitions.Equipment.properties));
                } else if (json.definitions && json.definitions.equipment) {
                    console.log("equipment columns:", Object.keys(json.definitions.equipment.properties));
                } else {
                    console.log("Equipment definition not found");
                }
            } catch (e) {
                console.error("Error parsing JSON:", e);
            }
        });
    }).on('error', console.error);
}

main();
