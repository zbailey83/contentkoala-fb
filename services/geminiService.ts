
import { GoogleGenAI, Modality } from "@google/genai";
import type { UploadedFile } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildImagePrompt = (description: string, styles: string[], hasSecondaryImage: boolean): string => {
  const styleText = styles.join(', ');
  let prompt = `Regenerate the primary product photo into a high-quality advertisement image.

Ad context: "${description}"

Apply these styles: ${styleText}.`;

  if (hasSecondaryImage) {
    prompt += `\n\nUse the secondary image for context (e.g., product in use, environment inspiration) but ensure the final ad focuses on the product from the primary photo.`;
  }
  
  prompt += `\n\nThe final image should be a professional ad creative with the product as the main subject.`;

  return prompt;
};

export const generateStyledImage = async (
  primaryImage: UploadedFile,
  secondaryImage: UploadedFile | null,
  description: string,
  styles: string[]
): Promise<{ imageUrl: string | null; text: string | null }> => {
  const model = 'gemini-2.5-flash-image';

  const prompt = buildImagePrompt(description, styles, !!secondaryImage);

  const parts: ({ inlineData: { data: string; mimeType: string; }; } | { text: string; })[] = [];

  parts.push({
    inlineData: {
      data: primaryImage.base64,
      mimeType: primaryImage.mimeType,
    },
  });

  if (secondaryImage) {
    parts.push({
      inlineData: {
        data: secondaryImage.base64,
        mimeType: secondaryImage.mimeType,
      },
    });
  }

  parts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: parts,
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    let imageUrl: string | null = null;
    let text: string | null = null;
    
    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          } else if (part.text) {
            text = part.text;
          }
        }
    }
    
    if (!imageUrl) {
        throw new Error("API did not return an image. It might be due to safety policies.");
    }

    return { imageUrl, text };

  } catch (error) {
    console.error("Error calling Gemini API for image generation:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the API.");
  }
};

export const generateVideoAd = async (
  image: UploadedFile,
  videoDescription: string,
  styles: string[]
): Promise<Blob> => {
    const hasApiKey = await window.aistudio.hasSelectedApiKey();
    if (!hasApiKey) {
        await window.aistudio.openSelectKey();
    }
    const aiWithSelectedKey = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let prompt = `Create a short, cinematic, UGC video ad based on this product. Ad context: "${videoDescription}"`;

    if (styles.length > 0) {
        prompt += `\nApply these video styles: ${styles.join(', ')}.`;
    }

    try {
        let operation = await aiWithSelectedKey.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: {
                imageBytes: image.base64,
                mimeType: image.mimeType,
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9',
            }
        });

        while (!operation.done) {
            // Wait for 10 seconds before polling again
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await aiWithSelectedKey.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found. The result might be blocked by safety policies.");
        }
        
        // The API key must be appended to the download URI to fetch the video
        const videoUrlWithKey = `${downloadLink}&key=${process.env.API_KEY}`;
        
        const videoResponse = await fetch(videoUrlWithKey);
        if (!videoResponse.ok) {
            const errorText = await videoResponse.text();
            console.error("Failed to download video:", errorText);
            if (errorText.includes("Requested entity was not found.")) {
                await window.aistudio.openSelectKey();
                throw new Error("API key may be invalid or missing permissions. Please select a valid key and try again.");
            }
            throw new Error(`Failed to download video: ${videoResponse.statusText}`);
        }
        
        const videoBlob = await videoResponse.blob();
        return videoBlob;

    } catch (error) {
        console.error("Error calling Gemini API for video generation:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate video: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the video.");
    }
};

interface SocialPostParams {
    inputType: 'url' | 'topic';
    inputValue: string;
    postType: string;
    tone: string;
    length: string;
}

export const generateSocialPost = async (params: SocialPostParams): Promise<string> => {
    const { inputType, inputValue, postType, tone, length } = params;

    const inputContext = inputType === 'url' 
        ? `based on the content from this URL: ${inputValue}`
        : `on the following topic: "${inputValue}"`;

    const prompt = `You are an expert social media marketing assistant.
    
    Your task is to generate a compelling "${postType}".
    
    The content should be ${inputContext}.
    
    Please adhere to the following attributes:
    - Tone: ${tone}
    - Length: ${length}
    
    Generate the content now. For a blog post, provide a title and body. For other post types, just provide the body.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        if (!text) {
            throw new Error("The API returned an empty response. This might be due to safety policies.");
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API for social post generation:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate social post: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the API.");
    }
};

export const generateBlogHeroImage = async (blogContent: string): Promise<string> => {
    try {
        // Step 1: Generate a descriptive prompt from the blog content
        const promptForPrompt = `Analyze the following blog post and generate a concise, visually descriptive prompt for an AI image generator to create a relevant hero image. The prompt should be a single sentence or a short phrase focusing on the key visual elements. Only output the prompt itself, with no additional text or labels.

Blog Post:
---
${blogContent}
---
`;
        const promptResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptForPrompt,
        });

        const imagePrompt = promptResponse.text;
        if (!imagePrompt || imagePrompt.trim() === '') {
            throw new Error("Failed to generate a valid image prompt from the blog post.");
        }

        // Step 2: Generate the image using the new prompt
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt.trim(),
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });

        const base64ImageBytes = imageResponse.generatedImages?.[0]?.image?.imageBytes;
        if (!base64ImageBytes) {
            throw new Error("Image generation failed or returned no image data. This could be due to safety policies.");
        }
        
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        return imageUrl;

    } catch (error) {
        console.error("Error generating blog hero image:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate hero image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the hero image.");
    }
};

// GBP Business Description
export interface GbpBusinessDetails {
    name: string;
    address: string;
    categories: string;
    services: string[];
    usp: string;
    tone: string;
}

export const generateGbpDescription = async (details: GbpBusinessDetails): Promise<string> => {
    const { name, address, categories, services, usp, tone } = details;
    
    const primaryKeywords = services.slice(0, 3).join(', ');

    const prompt = `You are an expert local SEO copywriter tasked with creating a Google Business Profile description.
The description must be a maximum of 750 characters.
Crucially, the most important information, including primary keywords, must be placed within the first 250 characters.
The copy must be engaging and written in a ${tone} voice.
You must strictly adhere to Google's guidelines: do not include any URLs, phone numbers, or promotional language such as '50% off' or 'sale'.
Use the following keywords naturally within the text: ${primaryKeywords}.
The business's details are as follows:
- Business Name: ${name}
- Location: ${address}
- Categories: ${categories}
- Services Offered: ${services.join(', ')}
- Unique Selling Proposition: ${usp}

Generate the business description now.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const text = response.text;
        if (!text) {
            throw new Error("The API returned an empty response.");
        }
        return text.trim();
    } catch (error) {
        console.error("Error calling Gemini API for GBP description:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate GBP description: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the API.");
    }
};

// GBP Service Description
export interface GbpServiceDetails {
    serviceName: string;
    businessName: string;
    city: string;
    primaryCategory: string;
    tone: string;
}

export const generateGbpServiceDescription = async (details: GbpServiceDetails): Promise<string> => {
    const { serviceName, businessName, city, primaryCategory, tone } = details;
    
    const prompt = `As a local SEO expert, write a compelling and keyword-rich service description for "${serviceName}" offered by "${businessName}," a leading ${primaryCategory} in ${city}. The description should clearly explain the benefits of this service to the customer and be written in a ${tone} voice. Naturally incorporate related concepts to provide more detail and value. Keep the description concise, informative, and focused on the service.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const text = response.text;
        if (!text) {
            throw new Error("The API returned an empty response.");
        }
        return text.trim();
    } catch (error) {
        console.error("Error calling Gemini API for GBP service description:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate GBP service description: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the API.");
    }
};
