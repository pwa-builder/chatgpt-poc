import { ChatGPTAPIBrowser } from 'chatgpt';
export async function initGPT() {
    const api = new ChatGPTAPIBrowser({
        email: 'gleb.khmyznikov@gmail.com',
        password: 'u!qJ8P-M-uQzjXB',
    });
    try {
        await api.initSession();
    }
    catch (error) {
        await api.closeSession();
        return null;
    }
    return api;
}
export async function askGPT(html, session) {
    let gptAnswer = null;
    try {
        gptAnswer = await session.sendMessage(`parse this html and generate web manifest in JSON format, silent answer with no comments or explains. Take all information and icons from html tags, use only one biggest icon in array of icons. ${html}`);
    }
    catch (error) { }
    let manifest = null;
    if (gptAnswer)
        try {
            manifest = JSON.parse(gptAnswer.response);
        }
        catch (error) { }
    return manifest;
}
