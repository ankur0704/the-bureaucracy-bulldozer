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
      description: "CLEAR PASS or HARD FAIL.",
    },
    analysis: {
      type: Type.STRING,
      description: "The spatial auditing and adversarial reasoning. Cite specific sections (simulated or real).",
    },
    gotcha: {
      type: Type.STRING,
      description: "The 'gotcha' clause: a hidden loophole, soil requirement, or forgotten bylaw that could cause issues.",
    },
    actionPlan: {
      type: Type.STRING,
      description: "Draft the exact text for the permit application form to maximize approval odds.",
    }
  },
  required: ["verdict", "analysis", "gotcha", "actionPlan"],
};

export const runBulldozerLogic = async (text: string, imageBase64?: string): Promise<ZoningResult> => {
  try {
    const parts: any[] = [];
    
    // Add Image/PDF if present
    if (imageBase64) {
      // Remove data URL prefix if present
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      const mimeType = imageBase64.split(';')[0].split(':')[1] || "image/jpeg";
      
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      });
    }

    // System Instruction / Persona
    const systemPrompt = `
      Role: You are "The Bureaucracy Bulldozer," an aggressive, hyper-competent Zoning Attorney and Spatial Analyst. Your goal is to find a legal pathway for the user's project, no matter how complex the bureaucracy.

      IMPORTANT - ANALYZING THE IMAGE:
      The attached image could be one of two things:
      1. A SITE PLAN / PHOTO: In this case, perform a "Visual Vibe Check" (estimate distances, height, materials).
      2. A ZONING DOCUMENT / SCANNED TEXT: In this case, READ THE TEXT. The text in the image is THE LAW. You must apply these specific rules to the user's request.
      
      Input Data:
      - Primary Source of Truth: If the image contains written rules (e.g., "City of Nimbystan Bylaws"), USE THEM.
      - Secondary Source: If no rules are in the image, assume access to standard International Residential Code (IRC 2021).
      - User Request: "${text}"

      Tone: Professional, sharp, slightly conspiratorial (we are on the user's side), and extremely precise.
      
      Output Format:
      - Verdict: CLEAR PASS or HARD FAIL.
      - Analysis: Detailed reasoning. If using the image text, CITE IT (e.g., "Per Section 4.2.a of the scanned document...").
      - The "gotcha": A specific, tricky clause to watch out for.
      - Action: Draft the exact text for the permit application.
    `;

    // Add prompt
    parts.push({
      text: `${systemPrompt}\n\nAnalyze this case now.`
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5, // Lower temperature to ensure it adheres strictly to the "document" if present
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ZoningResult;
    }
    
    throw new Error("No response text from Gemini");

  } catch (error) {
    console.error("Bulldozer Logic Error:", error);
    return {
      verdict: "DENIED",
      analysis: "SYSTEM FAILURE. The bureaucratic machine has jammed. (API Error)",
      gotcha: "API_CONNECTION_TIMEOUT",
      actionPlan: "Retry the submission."
    };
  }
};