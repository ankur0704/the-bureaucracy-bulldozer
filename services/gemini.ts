import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ZoningResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      enum: ["APPROVED", "DENIED"],
      description: "The final verdict on the zoning request.",
    },
    analysis: {
      type: Type.STRING,
      description: "A dry, bureaucratic, slightly sarcastic but helpful explanation of why the request was approved or denied based on zoning laws.",
    },
    gotcha: {
      type: Type.STRING,
      description: "A specific 'gotcha' or hidden catch in the zoning laws.",
    },
    actionPlan: {
      type: Type.STRING,
      description: "The recommended action plan for the user.",
    },
  },
  required: ["verdict", "analysis", "gotcha", "actionPlan"],
};

export const analyzeZoning = async (text: string, imageBase64?: string): Promise<ZoningResult> => {
  try {
    const parts: any[] = [];
    
    // Add Image if present
    if (imageBase64) {
      // Remove data URL prefix if present
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      parts.push({
        inlineData: {
          mimeType: "image/jpeg", // Assuming JPEG/PNG for simplicity in this demo
          data: base64Data
        }
      });
    }

    // Add prompt
    parts.push({
      text: `You are 'The Bureaucracy Bulldozer', a tough, no-nonsense AI zoning officer. 
      Analyze the attached image (blueprint/site plan) or the text description below against standard residential zoning codes (setbacks, height limits, lot coverage).
      
      User Description: "${text}"
      
      If the input is vague, make a conservative bureaucratic judgment. 
      Be decisive. 'APPROVED' or 'DENIED'. 
      Your analysis should sound authoritative, slightly aggressive, and use bureaucratic jargon.`
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // A bit of creativity for the sarcastic tone
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ZoningResult;
    }
    
    throw new Error("No response text from Gemini");

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback for demo purposes if API fails or is not configured
    return {
      verdict: "DENIED",
      analysis: "ERROR 500: BUREAUCRATIC GRIDLOCK. The system could not process your request due to missing paperwork (API Error). Try again later.",
      gotcha: "System Malfunction",
      actionPlan: "Please try submitting your request again later."
    };
  }
};