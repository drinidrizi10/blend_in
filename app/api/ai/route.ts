import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req: Request) {
	const { prompt } = await req.json();

	const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

	async function generateText() {
		try {
			const response = await groq.chat.completions.create({
				// Just one message in the array
				messages: [{ role: 'user', content: prompt }],
				model: 'openai/gpt-oss-20b',
			});

			// Print the direct answer
			return NextResponse.json({
				output: JSON.parse(
					response.choices[0]?.message?.content || '{}',
				),
			});
		} catch (error) {
			console.error('Error generating text:', error);
			return NextResponse.json(
				{ error: 'Internal server error' },
				{ status: 500 },
			);
		}
	}

	return generateText();
}
