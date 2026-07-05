Quiero desarrollar un módulo dentro de mi proyecto React existente llamado Cravernau.

Este módulo será un generador de plantillas para noticias de Burbuja Política.

NO quiero un editor complejo tipo Canva.

Quiero una herramienta sencilla donde únicamente pueda cambiar el contenido de una plantilla ya diseñada.

El funcionamiento será el siguiente:

====================================================

PANEL IZQUIERDO

====================================================

Crear un pequeño formulario con los siguientes campos:

• Input para Categoría

• Textarea para el Titular

• Botón para subir una imagen

• Botón "Exportar PNG"

Nada más.

====================================================

PANEL DERECHO

====================================================

Mostrar una vista previa de la plantilla.

La vista previa debe actualizarse automáticamente cada vez que escriba o seleccione una imagen.

No debe existir botón de actualizar.

Todo debe hacerse en tiempo real mediante React.

====================================================

FUNCIONAMIENTO

====================================================

Cuando escriba la categoría, debe reemplazar automáticamente el texto de la barra roja superior.

Cuando escriba el titular, debe aparecer automáticamente con la misma tipografía, tamaño, color, sombras y posición que tiene la plantilla.

Cuando cargue una imagen, esta debe colocarse automáticamente en el espacio destinado para la fotografía principal, respetando el diseño.

La imagen debe ocupar todo el espacio utilizando object-fit: cover para que nunca se deforme.

====================================================

PLANTILLA

====================================================

La plantilla ya existe.

No debe modificarse.

Todos estos elementos permanecerán fijos:

• Fondo

• Gradientes

• Logo Burbuja Política

• Redes sociales

• Marca de agua

• Colores

• Sombras

• Posiciones

Únicamente cambiarán:

• Categoría

• Titular

• Imagen principal

====================================================

VISTA PREVIA

====================================================

La vista previa debe verse exactamente igual al diseño original.

Debe conservar la relación de aspecto original.

El usuario debe poder visualizar exactamente cómo quedará antes de exportarla.

====================================================

EXPORTACIÓN

====================================================

Al presionar "Exportar PNG", debe descargarse la plantilla completa exactamente igual a la vista previa.

Resolución:

1080 × 1350 px

Debe conservar:

• Imagen

• Textos

• Tipografía

• Sombras

• Bordes

• Transparencias

• Logos

• Calidad

====================================================

ARQUITECTURA

====================================================

Debe integrarse dentro del proyecto React existente.

Usar:

• React

• TypeScript

• Tailwind CSS

• Componentes reutilizables

• Hooks

No crear un proyecto nuevo.

No usar jQuery.

No usar manipulación manual del DOM.

====================================================

IMPORTANTE

====================================================

Este será únicamente el primer generador.

Más adelante crearé otros generadores con el mismo funcionamiento.

Por esa razón quiero que la arquitectura sea reutilizable.

Cada plantilla deberá ser un componente independiente.

Por ejemplo:

PlantillaNoticia45.tsx

Posteriormente crearé otra página para una plantilla en formato Historia (9:16), que funcionará exactamente igual:

- Input Categoría.
- Input Titular.
- Subir Imagen.
- Vista previa en tiempo real.
- Exportar PNG.

La única diferencia será el diseño y el tamaño de la plantilla.

Por ello, el código debe quedar preparado para soportar múltiples plantillas reutilizando la misma lógica del editor, cambiando únicamente el componente visual correspondiente.