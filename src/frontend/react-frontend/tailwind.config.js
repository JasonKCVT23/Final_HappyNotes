/** @type {import('tailwindcss').Config} */
// This line provides TypeScript support and ensures proper IntelliSense for the Tailwind CSS configuration

export default {
  // **Content Paths**:
  // Specify the files Tailwind should scan to generate styles.
  // This includes the index.html file and all files within the "src" directory
  // with the extensions .js, .ts, .jsx, and .tsx.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // **Theme Configuration**:
  // Extend the default Tailwind theme here. This section is used to customize
  // default styles, add new utilities, or override existing ones.
  theme: {
    extend: {}, // Currently empty but can be extended with custom theme settings
  },

  // **Plugins**:
  // Add Tailwind CSS plugins here to extend the framework's functionality.
  // This can include custom plugins or official Tailwind plugins for additional features.
  plugins: [],
};
