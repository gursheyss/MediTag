import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function ask(prompt: string, data: any) {
	console.log('starting to ask');
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `You are an AI medical assistant designed to provide comprehensive information across all medical fields, with a focus on assisting nurses and patients. Your primary goal is patient safety. You offer support by providing medical knowledge, potential considerations for drug interactions, and general medical advice based on available information. Your responses should be clear, concise, and easily understandable, tailored to be helpful to both healthcare professionals and patients in a supportive role. Remember, you are an AI tool and not a licensed healthcare professional. The patient's data is as follows: ${JSON.stringify(data)}. Make sure to reference the patient's data in your response and explain why certain recommendations are made.`
			},
			{
				role: 'user',
				content: `${prompt}\nPlease respond in the following JSON format:\n{\n\t"summary": "Summary of the response in 1-3 short sentences",\n\t"explanation": "Further explanation, around 1 short paragraph"\n}`
			}
		],
		model: 'gpt-4-1106-preview',
		response_format: { type: 'json_object' }
	});

	console.log(completion.choices[0].message.content);
}
