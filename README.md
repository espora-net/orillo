# orillo

Orillo es una aplicación web para diseñar portadas y contraportadas de libros de forma sencilla y potente.

## Características

- **Diseño dual:** Edita simultáneamente la portada y contraportada de tu libro
- **Selector de tamaños:** Elige entre varios tamaños predefinidos (A4, A5, Carta, etc.)
- **Elementos personalizables:** Añade textos y formas con propiedades editables
- **Importar/Exportar:** Guarda y carga tus diseños en formato .orillo (JSON)
- **Exportar PNG:** Exporta tus diseños como imágenes de alta calidad
- **Sin scroll:** Interfaz optimizada que mantiene las proporciones

## Tecnologías

- Next.js 16 con App Router
- TypeScript
- Tailwind CSS
- html2canvas para exportación de imágenes

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. Selecciona el tamaño del libro en el menú superior
2. Añade elementos (texto, rectángulos) a las portadas usando los botones correspondientes
3. Edita las propiedades de los elementos en el panel lateral
4. Arrastra los elementos para posicionarlos
5. Exporta tu diseño como JSON (.orillo) o como imágenes PNG
