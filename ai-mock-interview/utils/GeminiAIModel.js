const { GoogleGenAI } = require('@google/generative-ai');
const mime = require('mime');
const { writeFile } = require('fs');

function saveBinaryFile(fileName, content) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
      return;
    }
    console.log(`File ${fileName} saved to file system.`);
  });
}

const chatSession = {
  sendMessage: async (prompt) => {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
    const config = {
      responseModalities: [
        'IMAGE',
        'TEXT',
      ],
    };
    const model = 'gemini-2.5-flash-image';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,  // use the prompt passed in
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    // You can process the response here or return the stream for the caller to handle
    // For now, let's just accumulate the text response
    let fullResponseText = '';

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const fileName = `file_${Date.now()}`;
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        const fileExtension = mime.getExtension(inlineData.mimeType || '');
        const buffer = Buffer.from(inlineData.data || '', 'base64');
        saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
      } else {
        fullResponseText += chunk.text || '';
      }
    }

    // Return an object similar to what your route.js expects
    return {
      response: {
        text: () => Promise.resolve(fullResponseText),
      },
    };
  },
};

module.exports = { chatSession };
