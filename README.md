# The Bureaucracy Bulldozer 🚜

**Your AI-Powered Zoning Attorney & Spatial Analyst.**

The Bureaucracy Bulldozer is an aggressive, hyper-competent AI agent designed to help you navigate complex zoning laws, municipal bylaws, and bureaucratic red tape. Whether you're trying to build a 12ft fence, a backyard shed, or a new room, the Bulldozer finds the legal pathway—or the loophole.

![App Screenshot](./assets/screenshot (323).png) 
*(Note: Replace with your actual screenshot if desired)*

## 🚀 Features

-   **Visual Vibe Check**: Upload a site plan or photo, and the AI estimates distances, materials, and feasibility.
-   **Document Analysis**: Upload a PDF or image of zoning text, and the AI treats it as "THE LAW" to audit your request.
-   **Adversarial Mode**: It doesn't just check rules; it looks for the "Gotcha" clauses that could sink your project.
-   **Action Plan Generation**: Drafts the *exact* text you need for your permit application to maximize approval odds.
-   **Retro Terminal UI**: A satisfying, haptic-style interface with typewriter effects and "hard" shadows.

## 🛠️ Tech Stack

-   **Frontend**: React (v19), Vite, TypeScript
-   **Styling**: Tailwind CSS (Custom "Neo-Brutalist" Design System)
-   **Animations**: Framer Motion
-   **AI Core**: Google Gemini API (`gemini-2.5-flash`) via the Google AI Web SDK

## 🏃‍♂️ Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/the-bureaucracy-bulldozer.git
    cd the-bureaucracy-bulldozer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    -   Create a `.env.local` file in the root directory (copy the example if available, or start fresh).
    -   Add your Google Gemini API key:
        ```env
        GEMINI_API_KEY=your_actual_api_key_here
        ```
    -   *Note: You can get an API key from [Google AI Studio](https://aistudio.google.com/).*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit `http://localhost:3000` (or the port shown in your terminal).

## 🎮 How to Use

1.  **Upload Assets**: Drag & drop a site photo, sketch, or zoning document PDF into the drop zone.
2.  **Describe Intent**: Type what you want to do (e.g., *"I want to build a 10x10 soundproof shed in my backyard 2ft from the property line."*).
3.  **BULLDOZE**: Hit the big yellow button.
4.  **Analyze**: Watch the terminal output as the AI parses bylaws and generates your Verdict, Analysis, "Gotcha" warning, and Permit Application text.

## ⚠️ Disclaimer

This tool is for entertainment and educational purposes. Always consult a real human attorney or city planner before starting construction. The "Bureaucracy Bulldozer" is an AI, and AI can hallucinate zoning bylaws (though we try to make it strict!).
