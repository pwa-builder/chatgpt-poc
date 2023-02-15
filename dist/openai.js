import { Configuration, OpenAIApi } from "openai";
export async function initOpenAI() {
    const configuration = new Configuration({
        apiKey: process.env.API_KEY,
    });
    return new OpenAIApi(configuration);
}
export function manifestPrompt(html) {
    const prompt = `INSTRUCTION
parse this html and generate web manifest with this string properties: lang,name[max lenght 45],short_name[max lenght 12],description[max lenght 160],background_color[hex],dir,display,orientation,scope,start_url,theme_color[hex]. And array properties: categories[max lenght 3],icons[max lenght 1]. Take all information and icons from html, use only biggest icon in array of icons.
HTML
${html}
OUTPUT FILE
web app manifests in JSON format no new line or return symbols, compact: <code>`;
    return prompt;
}
export async function askOpenAI(prompt, openai) {
    let davinciAnswer = null;
    console.log(`prompt: ${prompt}`);
    try {
        const completion = await openai.createCompletion({
            model: "code-davinci-002",
            prompt,
            temperature: 0.1,
            max_tokens: 256,
        });
        davinciAnswer = completion.data;
        console.log(`answer: ${JSON.stringify(davinciAnswer)}`);
    }
    catch (error) {
        if (error?.response) {
            console.error(error.response.status, error.response.data);
        }
        else {
            console.error(`Error with OpenAI API request: ${error.message}`);
        }
    }
    let manifest = null;
    if (davinciAnswer?.choices && davinciAnswer.choices[0]?.text) {
        const restoredResponse = `<code>${davinciAnswer.choices[0].text}`;
        try {
            manifest = JSON.parse(restoredResponse.match(/<code>(.*)<\/code>/)[1]);
        }
        catch (error) { }
    }
    return manifest;
}
