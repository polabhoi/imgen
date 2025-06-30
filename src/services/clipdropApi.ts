import axios from 'axios';

const CLIPDROP_API_URL = 'https://clipdrop-api.co/text-to-image/v1';

export const generateImage = async (prompt: string, style: string): Promise<Blob> => {
  const apiKey = import.meta.env.VITE_CLIPDROP_API_KEY;
  
  if (!apiKey) {
    throw new Error('Clipdrop API key is not configured. Please add your API key to the .env file.');
  }

  // Enhance prompt with style
  const enhancedPrompt = `${prompt}, ${style} style, high quality, detailed, professional`;

  const formData = new FormData();
  formData.append('prompt', enhancedPrompt);

  try {
    const response = await axios.post(CLIPDROP_API_URL, formData, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
      timeout: 30000, // 30 second timeout
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API request failed with status: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your Clipdrop API key.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
    }
    
    console.error('Clipdrop API Error:', error);
    throw new Error('Failed to generate image. Please try again later.');
  }
};