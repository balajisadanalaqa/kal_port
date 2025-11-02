/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#007BFF",
        secondary: "#6c5ce7",
        accent: "#FF6B35",
        success: "#00b894",
        danger: "#e74c3c",
        background: "#ffffff",
        surface: "#f8f9fa",
        text: "#2d3436",
        "text-secondary": "#636e72",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #007BFF 0%, #6c5ce7 50%, #a29bfe 100%)",
        "gradient-secondary": "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)",
        "gradient-success": "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
        "gradient-danger": "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
      },
      boxShadow: {
        "neon-primary": "0 0 20px rgba(0, 123, 255, 0.4)",
        "neon-secondary": "0 0 20px rgba(108, 92, 231, 0.4)",
        "neon-success": "0 0 20px rgba(0, 184, 148, 0.4)",
        "neon-danger": "0 0 20px rgba(231, 76, 60, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "pulse-glow": "pulse-glow-light 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
    }
  },
  plugins: [],
}