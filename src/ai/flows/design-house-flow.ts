'use server';
/**
 * @fileOverview An AI agent for designing houses on lots.
 *
 * - designHouse - A function that handles the house design process.
 * - DesignHouseInput - The input type for the designHouse function.
 * - DesignHouseOutput - The return type for the designHouse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DesignHouseInputSchema = z.object({
  userPrompt: z.string().describe('The user\'s description of their dream house.'),
  lotId: z.string().describe('The ID of the lot where the house will be designed.'),
});
export type DesignHouseInput = z.infer<typeof DesignHouseInputSchema>;

const DesignHouseOutputSchema = z.object({
  description: z.string().describe('A detailed, evocative description of the designed house.'),
  imageUrl: z.string().describe("A data URI of the generated house image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type DesignHouseOutput = z.infer<typeof DesignHouseOutputSchema>;

export async function designHouse(input: DesignHouseInput): Promise<DesignHouseOutput> {
  return designHouseFlow(input);
}

const descriptionPrompt = ai.definePrompt({
    name: 'designHouseDescriptionPrompt',
    input: { schema: DesignHouseInputSchema },
    prompt: `You are a world-class architect and real estate copywriter for "Santillana Del Mar", a luxury real estate project.
A potential client is interested in lot {{{lotId}}} and has described their dream house.
Client's idea: "{{{userPrompt}}}"

Based on their idea, write a single, compelling, and evocative paragraph describing the conceptual house design. 
Focus on luxury, comfort, and how the design integrates with the natural beauty of Santillana Del Mar. 
Do not greet the user or add any conversational text. Just provide the description paragraph.
`,
});

const designHouseFlow = ai.defineFlow(
  {
    name: 'designHouseFlow',
    inputSchema: DesignHouseInputSchema,
    outputSchema: DesignHouseOutputSchema,
  },
  async (input) => {
    const [descriptionResponse, imageResponse] = await Promise.all([
        descriptionPrompt(input),
        ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: `Concept art for a luxury, modern house in a tropical, exclusive real estate development called Santillana Del Mar. The design should be based on this idea: "${input.userPrompt}". The style should be photorealistic, architectural rendering.`,
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
        })
    ]);

    const imageUrl = imageResponse.media.url;
    if (!imageUrl) {
        throw new Error('Image generation failed.');
    }
    
    return {
        description: descriptionResponse.text,
        imageUrl: imageUrl,
    };
  }
);
