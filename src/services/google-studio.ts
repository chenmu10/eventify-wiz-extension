import { GoogleGenerativeAI } from "@google/generative-ai"; // Corrected import name

// This file contains the logic for interacting with the Google Studio API (now Google AI SDK).

// Ensure GEMINI_API_KEY is set in your environment
// The non-null assertion operator (!) is used here, assuming the API key is always available.
// If GEMINI_API_KEY might be undefined, add appropriate error handling or a check.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractEventDetails(eventData: string): Promise<any> {
  try {
    // Model can be "gemini-pro", "gemini-1.0-pro", "gemini-1.5-flash-latest", etc.
    // This might need to be configurable or updated based on specific model availability and requirements.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `extract event details in google calendar api json format from this text: ${eventData}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Check if the response has the text function and content
    if (response && typeof response.text === 'function') {
      const text = response.text();
      // Assuming the API returns a JSON string that needs to be parsed
      return JSON.parse(text);
    } else {
      // Handle cases where the response or text function is not available
      // or if the candidate parts are missing.
      // You might want to inspect `result.response.candidates` if `text()` is not directly available.
      const candidates = response?.candidates;
      if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts && candidates[0].content.parts.length > 0 && candidates[0].content.parts[0].text) {
        const textFromParts = candidates[0].content.parts[0].text;
        return JSON.parse(textFromParts);
      }
      throw new Error("Failed to extract text content from API response.");
    }

  } catch (error: any) {
    console.error("Error extracting event details from Google AI:", error);
    // It's good practice to throw a new error to avoid exposing too much detail
    // or to standardize error messages.
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && error.message) {
      errorMessage = error.message;
    }
    throw new Error(`Failed to extract event details. ${errorMessage}`);
  }
}
