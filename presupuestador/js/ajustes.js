(function (global) {
  'use strict';

  function render() {
    var cont = document.getElementById('ajustes-container');
    var e = Store.empresa.get();

    cont.innerHTML =
      '<div class="card">' +
        '<h2 style="font-size:0.95rem;font-weight:700;margin-bottom:10px;">Datos de la empresa</h2>' +
        '<p style="font-size:0.82rem;color:var(--steel-500);margin-bottom:12px;">Aparecen en el encabezado del PDF de cada presupuesto.</p>' +
        '<div class="field"><label for="aj-nombre">Nombre del taller</label>' +
          '<input class="input" id="aj-nombre" placeholder="Ej: Herrería Molina" value="' + Util.escapeHtml(e.nombre) + '"></div>' +
        '<div class="field"><label for="aj-telefono">Teléfono</label>' +
          '<input class="input" id="aj-telefono" value="' + Util.escapeHtml(e.telefono) + '"></div>' +
        '<div class="field"><label for="aj-direccion">Dirección</label>' +
          '<input class="input" id="aj-direccion" value="' + Util.escapeHtml(e.direccion) + '"></div>' +
        '<div class="field"><label for="aj-condiciones">Condiciones (van al pie de cada presupuesto)</label>' +
          '<textarea class="input" id="aj-condiciones" rows="4">' + Util.escapeHtml(e.condiciones) + '</textarea></div>' +
        '<button class="btn btn-primary btn-block" id="aj-guardar">Guardar datos</button>' +
      '</div>' +

      '<div class="card">' +
        '<h2 style="font-size:0.95rem;font-weight:700;margin-bottom:10px;">Copia de seguridad</h2>' +
        '<p style="font-size:0.82rem;color:var(--steel-500);margin-bottom:12px;">' +
          'Mientras no esté conectada la sincronización automática, usá esto para pasar los datos entre el celular y la compu: ' +
          'exportá un archivo desde un dispositivo y luego importalo en el otro.' +
        '</p>' +
        '<div class="form-actions">' +
          '<button class="btn btn-outline" id="aj-exportar">⬇️ Exportar copia</button>' +
          '<button class="btn btn-outline" id="aj-importar-btn">⬆️ Importar copia</button>' +
        '</div>' +
        '<input type="file" id="aj-importar-file" accept="application/json,.json" hidden>' +
      '</div>' +

      '<div class="card">' +
        '<h2 style="font-size:0.95rem;font-weight:700;margin-bottom:6px;">Sincronización</h2>' +
        '<p style="font-size:0.82rem;color:var(--steel-500);">' +
          'Por ahora los datos se guardan solo en este dispositivo (localStorage). ' +
          'La sincronización automática entre celular y compu con Firebase se conecta en un próximo paso.' +
        '</p>' +
      '</div>';

    document.getElementById('aj-guardar').addEventListener('click', function () {
      Store.empresa.save({
        nombre: document.getElementById('aj-nombre').value.trim(),
        telefono: document.getElementById('aj-telefono').value.trim(),
        direccion: document.getElementById('aj-direccion').value.trim(),
        condiciones: document.getElementById('aj-condiciones').value.trim(),
        proximoNumero: e.proximoNumero
      });
      Util.toast('Datos de la empresa guardados');
    });

    document.getElementById('aj-exportar').addEventListener('click', function () {
      var json = Store.backup.exportJSON();
      var blob = new Blob([json], { type: 'application/json' });
      var fecha = new Date().toISOString().slice(0, 10);
      Util.descargarBlob(blob, 'presupuestador-backup-' + fecha + '.json');
      Util.toast('Copia exportada');
    });

    document.getElementById('aj-importar-btn').addEventListener('click', function () {
      document.getElementById('aj-importar-file').click();
    });
    document.getElementById('aj-importar-file').addEventListener('change', function (ev) {
      var file = ev.target.files[0];
      if (!file) return;
      if (!confirm('Importar reemplaza los materiales, tipos de trabajo, presupuestos y datos de la empresa guardados en este dispositivo por los del archivo. ¿Continuar?')) {
        ev.target.value = '';
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        try {
          Store.backup.importJSON(String(reader.result));
          Util.toast('Copia importada correctamente');
          if (global.App && global.App.refrescarTodo) global.App.refrescarTodo();
          render();
        } catch (err) {
          console.error(err);
          Util.toast('El archivo no es una copia de seguridad válida');
        }
        ev.target.value = '';
      };
      reader.readAsText(file);
    });
  }

  global.VistaAjustes = { init: render };
})(window);
