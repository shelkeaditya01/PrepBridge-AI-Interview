// utils/GeminiAIModel.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import mime from 'mime';
import { writeFile } from 'fs';

function saveBinaryFile(fileName, content) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
    } else {
      console.log(`File ${fileName} saved.`);
    }
  });
}

const ai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY, // ✅ Use a non-public key
});

export const chatSession = {
  async sendMessage(prompt) {
    const config = { responseModalities: ['IMAGE', 'TEXT'] };
    const model = 'gemini-2.5-flash-image';
    const contents = [{ role: 'user', parts: [{ text: prompt }]}];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let output = '';
    let fileIndex = 0;

    for await (const chunk of response) {
      const part = chunk.candidates?.[0]?.content?.parts?.[0];
      if (!part) continue;

      if (part.inlineData) {
        const fileName = `gemini_output_${fileIndex++}`;
        const ext = mime.getExtension(part.inlineData.mimeType || '');
        const buffer = Buffer.from(part.inlineData.data || '', 'base64');
        saveBinaryFile(`${fileName}.${ext}`, buffer);
      } else if (part.text) {
        output += part.text;
      }
    }

    return { response: { text: () => output } };
  },
};
