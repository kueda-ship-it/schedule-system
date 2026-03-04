const fs = require('fs');

async function main() {
    const env = fs.readFileSync('.env', 'utf8');
    const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1];
    const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];

    const response = await fetch(`${url}/rest/v1/`, {
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    const data = await response.json();

    console.log("--- Equipment Properties ---");
    if (data.definitions && data.definitions.Equipment) {
        console.log(JSON.stringify(Object.keys(data.definitions.Equipment.properties), null, 2));
    } else {
        console.log("Equipment definition not found");
        console.log("Available definitions:", Object.keys(data.definitions || {}));
    }

    console.log("\n--- profiles Properties ---");
    if (data.definitions && data.definitions.profiles) {
        console.log(JSON.stringify(Object.keys(data.definitions.profiles.properties), null, 2));
    }
}

main().catch(console.error);
