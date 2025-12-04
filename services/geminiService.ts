import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWigDescription = async (
  title: string,
  condition: string,
  type: string,
  length: string,
  color: string,
  keyFeatures: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing");
    return "Beautiful wig available for sale. Please contact seller for more details.";
  }

  try {
    const prompt = `
      Write a catchy, friendly, and feminine product description for a wig being sold on a marketplace app called TAJ.
      
      Details:
      - Title: ${title}
      - Condition: ${condition}
      - Hair Type: ${type}
      - Length: ${length} inches
      - Color: ${color}
      - Key Features: ${keyFeatures}

      The tone should be excited but honest. Keep it under 100 words. Use emojis sparingly but effectively.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Error generating description. Please try again.";
  }
};

export const askStylist = async (wigTitle: string, userQuestion: string): Promise<string> => {
   if (!apiKey) return "Our AI stylist is currently taking a coffee break. Please try again later!";

   try {
     const prompt = `
       You are a professional hair stylist and wig expert on the TAJ app.
       A user is looking at a wig titled "${wigTitle}" and asks: "${userQuestion}".
       Give a helpful, short, and friendly answer (max 2 sentences).
     `;

     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: prompt,
     });

     return response.text || "I'm not sure, but it looks great!";
   } catch (error) {
     return "I'm having trouble connecting to the styling server.";
   }
};