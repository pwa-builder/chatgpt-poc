import { Configuration, OpenAIApi } from "openai";

export async function initOpenAI(): Promise<OpenAIApi | null> { 
	const configuration = new Configuration({
		apiKey: process.env.API_KEY,
	  });
	return new OpenAIApi(configuration);
}

export function manifestPrompt(html: string) {
const prompt = 
`INSTRUCTION
parse this html and generate web manifest with this string properties: lang,name[max length 45],short_name[max length 12],description[max length 160],background_color[hex],dir,display,orientation,scope,start_url,theme_color[hex]. And array properties: categories[max length 3],icons[max length 1]. Take all information about icons from html tags, use only biggest icon in array of icons.
HTML
${html}
OUTPUT FILE
web app manifests in JSON format no new line or return symbols, compact: <code>`;
return prompt;
}

export function descriptionPrompt(description: string) {
const prompt = 
`TASK
Describe the app icon without emotional details, based on INPUT. Description should not contain text or symbols.
INPUT
${description}
OUTPUT`;
return prompt;
}


export async function askForManifest(prompt: string, openai: OpenAIApi): Promise<Object|null> {
	let davinciAnswer = null;
	console.log(`manifest prompt: ${prompt}`);

	try {
		const completion = await openai.createCompletion({
			model: "code-davinci-002",
			prompt,
			temperature: 0.1,
			max_tokens: 256,
			
		});
		davinciAnswer = completion.data;
		console.log(`manifest answer: ${JSON.stringify(davinciAnswer)}`)
	} catch(error: any) {

		if (error?.response) {
			console.error(error.response.status, error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
		}
	}
  
	let manifest = null;
	if (davinciAnswer?.choices && davinciAnswer.choices[0]?.text){
		const restoredResponse = `<code>${davinciAnswer.choices[0].text}`;
		try {
			manifest = JSON.parse(restoredResponse.match(/<code>(.*)<\/code>/)![1]);
		} catch (error) {}
	}

	return manifest;
}
export async function askForDescription(prompt: string, openai: OpenAIApi): Promise<string|null> {
	let davinciAnswer = null;
	console.log(`description prompt: ${prompt}`);

	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			temperature: 0.5,
			max_tokens: 128,
			
		});
		davinciAnswer = completion.data;
		console.log(`description answer: ${JSON.stringify(davinciAnswer)}`)
	} catch(error: any) {

		if (error?.response) {
			console.error(error.response.status, error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
		}
	}
  
	let description = null;
	if (davinciAnswer?.choices && davinciAnswer.choices[0]?.text)
		description = davinciAnswer.choices[0].text;

	return description;
}
export async function askForIcon(prompt: string, openai: OpenAIApi): Promise<Object|null> {
	let dalleImage = null;
	console.log(`icon prompt: ${prompt}`);

	try {
		const image = await openai.createImage({
			prompt: `${prompt}, ios app icon, no text, colorful background is filled with abstract gradient`,
			n: 4,
			size: '256x256',
			response_format: 'url'
		});
		dalleImage = image.data.data;
		console.log(`icon answer: ${JSON.stringify(dalleImage)}`)
	} catch(error: any) {
		if (error?.response) {
			console.error(error.response.status, error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error?.message || error}`);
		}
	}

	return dalleImage;
}