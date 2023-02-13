import { Configuration, OpenAIApi } from "openai";
export async function initOpenAI() {
    const configuration = new Configuration({
        apiKey: process.env.API_KEY,
    });
    return new OpenAIApi(configuration);
}
export async function askOpenAI(prompt, openai) {
    let gptAnswer = null;
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `parse this html and generate web manifest in JSON format, silent answer with no comments or explains. Take all information and icons from html tags, use only one biggest icon in array of icons. ${prompt}`,
            temperature: 0.6,
        });
        gptAnswer = completion.data;
        console.warn(gptAnswer);
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
    if (gptAnswer && gptAnswer.choices[0].text)
        try {
            manifest = JSON.parse(gptAnswer.choices[0].text);
        }
        catch (error) { }
    return manifest;
}
