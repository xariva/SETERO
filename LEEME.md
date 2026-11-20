# Setero · Cómo convertirla en app de Play Store

Todo se hace en tu ordenador. Ve paso a paso y no te saltes ninguno.

## 1. Programas necesarios (una sola vez)
- **Node.js** (versión LTS): nodejs.org
- **Android Studio**: developer.android.com/studio (instala también el SDK que te proponga)

## 2. Preparar el proyecto
Abre una terminal dentro de esta carpeta (`setero-android`) y escribe, una línea cada vez:

    npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor-community/admob
    npx cap add android

## 3. Copiar las piezas nativas
Copia los dos archivos de la carpeta `android-plugin` a:

    android/app/src/main/java/com/setero/app/

(`MainActivity.java` te preguntará si sustituir el que ya existe: di que sí.)

## 4. Permisos y anuncios
Abre `android/app/src/main/AndroidManifest.xml`.

**Fuera** de `<application>`, junto a los otros permisos, añade:

    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

**Dentro** de `<application ...>` añade (este ID es de PRUEBA de Google):

    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID"
               android:value="ca-app-pub-3940256099942544~3347511713"/>

## 5. Probar en tu móvil
    npx cap sync android
    npx cap open android

En Android Studio conecta el móvil por USB (con «Depuración USB» activada) y pulsa el triángulo verde ▶.
Comprueba: GPS, guardar setas, botón SOS (cuenta atrás y llamada/SMS) y el banner de prueba.
**Prueba el SOS con un familiar avisado y con un número que no sea el 112.**

## 6. Anuncios reales (para ganar dinero)
1. Crea cuenta en **admob.google.com**, añade la app Android y crea un bloque «Banner».
2. Sustituye el ID de la app en el `AndroidManifest.xml` y el ID del banner en `www/index.html`
   (busca `ca-app-pub-3940256099942544` y quita `isTesting:true`).
3. Vuelve a ejecutar `npx cap sync android`.
4. En AdMob configura el mensaje de consentimiento (obligatorio en España/UE).

## 7. Generar el archivo para Play Store
En Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**.
Crea una clave (keystore) y **guárdala y apunta la contraseña en un sitio seguro**: si la pierdes no podrás actualizar la app.
Se genera un archivo `.aab`.

## 8. Subirla a Google Play
- Cuenta de desarrollador en play.google.com/console (pago único).
- Ficha: nombre, descripción, icono, capturas.
- **Política de privacidad** (URL pública): debe decir que usa la ubicación, que se guardan sitios en el móvil y que hay anuncios.
- Formulario **Seguridad de los datos** y clasificación de contenido.
- Formulario de **permisos de SMS y llamadas**: explica que son para el aviso de emergencia que el usuario configura.
- Si tu cuenta es personal y nueva, Google suele exigir una **prueba cerrada** con testers antes de publicar. Compruébalo en la propia consola.

## Aviso importante
- Google puede **rechazar el envío automático de SMS**. Si ocurre, quita el permiso `SEND_SMS` del manifest: la app seguirá funcionando y abrirá el SMS ya escrito para que lo envíes tú.
- La detección de caídas funciona con la app abierta y pantalla encendida. En segundo plano haría falta un servicio nativo adicional.
- Sin cobertura no salen ni la llamada ni el SMS. Dilo en la ficha de la tienda.
- La app **no garantiza** que te rescaten: no la presentes como sustituto de avisar de tu ruta.
