# Setero · Versión fácil (sin instalar nada en el ordenador)

GitHub construye la app por ti en la nube. Tú solo subes los archivos y descargas el resultado.

1. Crea una cuenta gratis en **github.com**.
2. Arriba a la derecha pulsa **+ → New repository**. Ponle de nombre `setero`, déjalo en **Private** y pulsa **Create repository**.
3. Descomprime el zip en tu ordenador. En la página del repositorio pulsa **uploading an existing file** y **arrastra el CONTENIDO de la carpeta** (no el zip): `www`, `android-plugin`, `.github`, y los archivos sueltos. Pulsa **Commit changes**.
   - Si la carpeta `.github` no se sube: pulsa **Add file → Create new file**, escribe como nombre `.github/workflows/build.yml`, pega dentro el contenido de ese archivo y pulsa **Commit changes**.
4. Entra en la pestaña **Actions**, elige **Construir app** a la izquierda y pulsa **Run workflow**. Espera unos 10 minutos hasta que salga un tic verde.
5. Abre esa ejecución y abajo, en **Artifacts**, descarga **setero-apk**. Descomprímelo, pásalo a tu móvil e instálalo (el móvil pedirá permitir instalar apps de origen desconocido).

Si sale una **X roja**, entra en la ejecución, copia el texto del error y pégamelo aquí: lo arreglo yo.

Esto genera una app **de prueba** para que veas cómo funciona en tu móvil. Para Play Store hay un paso más (firmar la app y subirla), que haremos cuando la prueba esté bien.
