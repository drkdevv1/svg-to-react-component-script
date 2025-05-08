# Conversor de SVG a Componentes React

Este script permite convertir automáticamente archivos SVG a componentes React en formato TypeScript (.tsx).

## Preparación

1. Coloca todos tus archivos SVG en el directorio `src/assets/svg/`

   - Si este directorio no existe, debes crearlo primero
   - Ejemplo: `src/assets/svg/arrow-up.svg`

2. Los nombres de los archivos SVG serán convertidos a PascalCase y se les añadirá el sufijo "Icon"
   - Por ejemplo, `arrow-up.svg` se convertirá en `ArrowUpIcon.tsx`

## Ejecución

Ejecuta el script desde la terminal:

```bash
node src/scripts/convertSvgToReact.js
```

## Resultado

- Los componentes React se generarán en el directorio `src/assets/icons/`
- Cada componente será un archivo TypeScript (.tsx)
- El script mantendrá el viewBox original y preservará las propiedades de los paths

## Personalización

Puedes modificar las siguientes variables al inicio del script para personalizar su comportamiento:

- `SVG_DIRECTORY`: Directorio donde se encuentran los SVGs
- `COMPONENT_OUTPUT_DIRECTORY`: Directorio donde se guardarán los componentes generados
- `FILENAME_SUFFIX`: Sufijo para los nombres de los componentes (por defecto, "Icon")

## Ejemplo del resultado

Un archivo `arrow-up.svg` se convertirá en un componente React con esta estructura:

```tsx
import { FC } from "react";

export const ArrowUpIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
  </svg>
);
```
