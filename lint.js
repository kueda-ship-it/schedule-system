import { ESLint } from "eslint";
import url from "url";

(async function main() {
    const eslint = new ESLint({
        useEslintrc: false,
        overrideConfig: {
            env: { browser: true, es2021: true },
            parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
            plugins: ["react"],
            rules: {
                "no-undef": "error",
                "no-unused-vars": "warn",
                "react/jsx-uses-vars": "error",
                "react/jsx-no-undef": "error"
            }
        }
    });
    const results = await eslint.lintFiles(["src/App.jsx"]);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    console.log(resultText);
})().catch(console.error);
