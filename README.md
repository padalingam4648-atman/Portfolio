# Padalingam S - Portfolio

## 🚀 How to Run in VS Code

This project is built with **React**, **TypeScript**, and **Vite**. Follow these steps to run it on your local system using Visual Studio Code.

### Prerequisites
1.  **Install Node.js**: Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).
2.  **Install VS Code**: Download from [code.visualstudio.com](https://code.visualstudio.com/).

### Step 1: Setup the Project
1.  Open **VS Code**.
2.  Open the Terminal in VS Code (`Ctrl + ~` or **Terminal > New Terminal**).
3.  Run this command to create a new folder with the project setup:
    ```bash
    npm create vite@latest my-portfolio -- --template react-ts
    ```
    *(If it asks to install `create-vite`, type `y` and press Enter).*
4.  Move into the new folder:
    ```bash
    cd my-portfolio
    ```

### Step 2: Install Dependencies
Copy and paste this command to install the required libraries:

```bash
npm install framer-motion lucide-react @google/genai
```

### Step 3: Add Your Files
1.  **Copy the Code**: Copy the content of the files provided here into your VS Code project:
    *   `App.tsx` → `src/App.tsx`
    *   `index.css` → `src/index.css` (Replace existing content)
    *   `types.ts` → `src/types.ts` (Create this file)
    *   `components/AIChat.tsx` → `src/components/AIChat.tsx` (Create folder `components` first)

2.  **Update index.html**: Open `index.html` in your project and add these font links inside the `<head>` tag:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    ```

### Step 4: Configure API Key
1.  Create a new file in the `my-portfolio` folder named `.env`.
2.  Add your Google Gemini API key inside it like this:
    ```env
    VITE_API_KEY=your_actual_api_key_here
    ```
    *(The app is pre-configured to read this key automatically).*

### Step 5: Run the App
In the terminal (ensure you are inside `my-portfolio` folder), run:

```bash
npm run dev
```

Hold **Ctrl** and click the link (e.g., `http://localhost:5173`) to see your site!
