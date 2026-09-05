# Presupuestador — Herrería

App web instalable (PWA) para cargar la lista de precios de materiales y
armar presupuestos, calculando la mano de obra como un porcentaje del costo
de materiales según el tipo de trabajo. Funciona sin conexión y no depende
de ninguna librería externa.

## Cómo usar la app

1. **Materiales**: cargá cada material con su unidad (m, kg, unidad…) y
   precio. Se puede editar en cualquier momento; queda registrada la fecha
   de la última actualización.
2. **Trabajos**: tipos de trabajo con su % de mano de obra sobre el costo
   de materiales. Viene precargada con 8 categorías típicas de herrería
   (Portones 35%, Rejas 30%, Barandas 40%, Escaleras 35%, Estructuras 25%,
   Herrería artística 60%, Muebles a medida 45%, Reparaciones 55%) — son
   solo un punto de partida, se editan o se borran libremente.
3. **Presupuestar**: elegí cliente, tipo de trabajo, y sumá los materiales
   que se van a usar con su cantidad. La app calcula materiales + mano de
   obra (% de la categoría) + total, y al guardar genera y descarga
   automáticamente el PDF del presupuesto.
4. **Historial**: todos los presupuestos guardados, con opción de volver a
   descargar el PDF o eliminarlos.
5. **Ajustes**: datos de la empresa (aparecen en el PDF) y botones para
   exportar/importar una copia de seguridad completa (materiales,
   trabajos, presupuestos y datos de la empresa) en un archivo `.json`.
6. **Botón de chat (💬)**: preguntá el precio de un material por nombre o
   por medida, por ejemplo *"cuánto vale un caño de 20x20x1.6"*. Es un
   buscador local sobre los materiales ya cargados (no manda nada a
   internet), útil para consultar rápido sin entrar a la lista completa.

## Instalar en el celular / la compu

Es una PWA: abriendo `presupuestador/index.html` desde el sitio publicado,
el navegador (Chrome/Edge en Android o compu) ofrece "Instalar app" /
"Agregar a la pantalla de inicio". Una vez instalada funciona como una app
normal, con ícono propio, y sigue andando sin conexión a internet gracias
al service worker que cachea la app.

## Dónde se guardan los datos hoy

Por ahora todo se guarda en `localStorage`, **en el dispositivo donde se
usa** (no se sincroniza solo entre el celular y la compu todavía). Para
pasar los datos de un dispositivo a otro mientras tanto: **Ajustes →
Exportar copia** en uno, y **Ajustes → Importar copia** en el otro.

### Próximo paso: sincronización automática con Firebase

Para que los datos se sincronicen solos entre el celular y la compu hace
falta un proyecto de Firebase (Firestore), gratuito para este volumen de
uso. Pasos para crear el proyecto (los hace quien tenga la cuenta de
Google del taller):

1. Entrar a https://console.firebase.google.com/ y crear un proyecto
   nuevo (cualquier nombre, por ejemplo "presupuestador-herreria").
2. Dentro del proyecto: **Compilación → Firestore Database → Crear base
   de datos** (modo producción, ubicación más cercana, ej. `southamerica-east1`).
3. **Configuración del proyecto (ícono de tuerca) → Configuración del
   proyecto → pestaña "General"** → en "Tus apps" agregar una app **Web**
   (ícono `</>`). Firebase muestra un bloque `firebaseConfig` con
   `apiKey`, `authDomain`, `projectId`, etc. — son datos públicos de
   configuración, no contraseñas.
4. Pasar ese bloque para dejar la app conectada (reemplaza el
   almacenamiento local por sincronización real entre dispositivos).

Hasta que esto esté conectado, la app funciona igual de bien para un solo
dispositivo por vez, usando exportar/importar para pasar los datos.

## Estructura

```
presupuestador/
  index.html            Shell de la app (navegación por pestañas)
  manifest.webmanifest   Metadata de instalación (PWA)
  service-worker.js      Cacheo para uso sin conexión
  css/app.css            Estilos (mobile-first, con layout de escritorio)
  icons/                 Íconos de la app
  js/
    util.js              Helpers compartidos (toast, formateo, descargas)
    store.js             Capa de datos sobre localStorage (materiales,
                          trabajos, presupuestos, empresa, backup)
    pdf-lite.js           Generador de PDF genérico, sin dependencias
    budget-pdf.js         Arma el PDF de un presupuesto sobre pdf-lite.js
    materiales.js         Pantalla Lista de precios
    categorias.js         Pantalla Tipos de trabajo
    presupuestos.js        Pantallas Nuevo presupuesto + Historial
    ajustes.js             Pantalla Ajustes (empresa + backup)
    asistente.js           Buscador de precios en lenguaje natural
    app.js                 Navegación entre pantallas e inicialización
```

### Por qué el PDF se genera "a mano" (`pdf-lite.js`)

No se usa una librería como jsPDF porque este entorno de desarrollo no
tiene salida a redes de terceros (CDNs) para descargarla, y además así la
app no depende de ningún script externo para funcionar sin conexión desde
el celular. `pdf-lite.js` escribe directamente el archivo PDF (texto con
las fuentes estándar Helvetica/Helvetica-Bold, líneas, rectángulos y
paginado automático) — probado generando y leyendo presupuestos de varias
páginas con `pypdf`.

## Previsualizar localmente

```bash
cd presupuestador
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.
