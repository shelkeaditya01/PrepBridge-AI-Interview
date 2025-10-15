// utils/GeminiAIModel.js

import { GoogleGenAI } from '@google/generative-ai';
import mime from 'mime';
import { writeFile } from 'fs/promises';  // use promises version to use async/await

async function saveBinaryFile(fileName, content) {
  try {
    await writeFile(fileName, content);
    console.log(`File ${fileName} saved to file system.`);
  } catch (err) {
    console.error(`Error writing file ${fileName}:`, err);
  }
}

export const chatSession = {
  sendMessage: async (prompt) => {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const config = {
      responseModalities: ['IMAGE', 'TEXT'],
    };

    const model = 'gemini-2.5-flash-image';

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponseText = '';

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }
      if (chunk.candidates[0].content.parts[0].inlineData) {
        const fileName = `file_${Date.now()}`;
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        const fileExtension = mime.getExtension(inlineData.mimeType || '');
        const buffer = Buffer.from(inlineData.data || '', 'base64');
        await saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
      } else {
        fullResponseText += chunk.text || '';
      }
    }

    return {
      response: {
        text: () => Promise.resolve(fullResponseText),
      },
    };
  },
};
