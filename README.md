# Proyectar Ingeniería — Sitio web

Sitio web estático (HTML/CSS/JS puro, sin build ni dependencias) para
Proyectar Ingeniería, consultora técnica especializada en diseño mecánico,
dispositivos y utillajes de producción, y gestión de la calidad industrial.

## Estructura

```
index.html      Página única con las secciones: Inicio, Nosotros, Servicios, Contacto
css/style.css   Estilos
js/main.js      Menú móvil, scroll-spy, animaciones y envío del formulario
assets/         Favicon e íconos
presupuestador/ App de presupuestos para herrería (ver su propio README.md)
```

## Presupuestador (app de presupuestos)

`presupuestador/` es una app web instalable (PWA) para cargar precios de
materiales y armar presupuestos con cálculo automático de mano de obra.
Ver `presupuestador/README.md` para el detalle de uso y estructura.

## Configurar el formulario de contacto

El formulario de contacto usa [Formspree](https://formspree.io) (plan
gratuito) para recibir los mensajes por email sin necesidad de backend
propio:

1. Creá una cuenta gratuita en https://formspree.io y un nuevo formulario.
2. Copiá el ID del formulario (algo como `xzznrapv`).
3. En `index.html`, buscá la línea:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/TU_FORM_ID" method="POST">
   ```
   y reemplazá `TU_FORM_ID` por tu ID real.
4. Verificá el email de destino que te pida Formspree la primera vez.

Mientras `TU_FORM_ID` no se reemplace, el sitio muestra un aviso al
intentar enviar el formulario en lugar de fallar silenciosamente.

## Datos de contacto

Actualizá en `index.html` (sección `#contacto`) el email, teléfono y
ubicación reales de la empresa (actualmente hay valores de ejemplo).

## Cómo previsualizar localmente

No requiere instalación. Alcanza con abrir `index.html` en el navegador,
o servirlo con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000`.

## Despliegue en GitHub Pages

1. En la configuración del repositorio, ir a **Settings → Pages**.
2. Como *Source*, elegir la rama principal (`main`) y carpeta `/ (root)`.
3. Guardar. El sitio quedará publicado en unos minutos en la URL que
   indique GitHub Pages.
