/** @type {import('tailwindcss').Config} */
export default {
  // Especifica los archivos que Tailwind debe analizar para generar los estilos
  content: [
    "./index.html", // Archivo HTML en la raíz del proyecto
    "./src/**/*.{js,ts,jsx,tsx}", // Archivos JavaScript, TypeScript y JSX en la carpeta src y sus subcarpetas
  ],
  theme: { 
    // Define personalizaciones para el tema de Tailwind, como colores, tamaños, etc.
    patterns: {
      opacities: { // Agrega patrones de opacidad personalizados
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: { // Define tamaños personalizados
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      }
    }
  },
  plugins: [
    require('tailwindcss-bg-patterns'), // Carga el plugin tailwindcss-bg-patterns
  ],
}