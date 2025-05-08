const fs = require('fs');
const path = require('path');

// Configuración
const SVG_DIRECTORY = path.resolve(__dirname, '../assets/svg'); // Directorio donde están los SVGs
const COMPONENT_OUTPUT_DIRECTORY = path.resolve(__dirname, '../assets/icons'); // Directorio donde se guardarán los componentes
const FILENAME_SUFFIX = 'Icon'; // Sufijo para los nombres de los componentes

// Crear directorio de salida si no existe
if (!fs.existsSync(COMPONENT_OUTPUT_DIRECTORY)) {
  fs.mkdirSync(COMPONENT_OUTPUT_DIRECTORY, { recursive: true });
}

// Función para convertir nombre de archivo a PascalCase
function toPascalCase(filename) {
  return filename
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Función para procesar el contenido SVG
function processSvgContent(content) {
  // Extraer el viewBox y el contenido del path
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  const pathMatch = content.match(/<path[^>]*d="([^"]+)"[^>]*>/g);
  
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
  
  // Construir el contenido del path para el componente React
  let pathContent = '';
  if (pathMatch) {
    pathContent = pathMatch.join('\n    ');
  } else {
    // Si no se encuentra un path, incluir todo el contenido dentro de las etiquetas svg
    const innerContent = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    if (innerContent && innerContent[1]) {
      pathContent = innerContent[1].trim();
    }
  }
  
  return { viewBox, pathContent };
}

// Función principal para convertir SVG a componente React
function convertSvgToReactComponent(svgFilePath) {
  const filename = path.basename(svgFilePath, '.svg');
  const componentName = toPascalCase(filename) + FILENAME_SUFFIX;
  const outputFilePath = path.join(COMPONENT_OUTPUT_DIRECTORY, `${componentName}.tsx`);
  
  const svgContent = fs.readFileSync(svgFilePath, 'utf8');
  const { viewBox, pathContent } = processSvgContent(svgContent);
  
  const componentContent = `import { FC } from "react";

export const ${componentName}: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" {...props}>
    ${pathContent}
  </svg>
);
`;
  
  fs.writeFileSync(outputFilePath, componentContent);
  console.log(`Componente creado: ${outputFilePath}`);
}

// Procesar todos los SVG en el directorio
function processAllSvgs() {
  if (!fs.existsSync(SVG_DIRECTORY)) {
    console.error(`El directorio ${SVG_DIRECTORY} no existe.`);
    console.log('Crea este directorio y coloca tus archivos SVG allí.');
    return;
  }
  
  const files = fs.readdirSync(SVG_DIRECTORY);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  if (svgFiles.length === 0) {
    console.log(`No se encontraron archivos SVG en ${SVG_DIRECTORY}`);
    return;
  }
  
  console.log(`Procesando ${svgFiles.length} archivos SVG...`);
  
  svgFiles.forEach(file => {
    const svgFilePath = path.join(SVG_DIRECTORY, file);
    convertSvgToReactComponent(svgFilePath);
  });
  
  console.log('Conversión completada con éxito.');
}

// Ejecutar la función principal
processAllSvgs();