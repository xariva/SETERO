# Añade permisos y el ID de AdMob (de PRUEBA) al AndroidManifest automáticamente
p = 'android/app/src/main/AndroidManifest.xml'
s = open(p, encoding='utf-8').read()
perms = '''    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
'''
meta = '''        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="ca-app-pub-3940256099942544~3347511713"/>
    '''
assert '<application' in s and '</application>' in s
if 'SEND_SMS' not in s:
    s = s.replace('<application', perms + '    <application', 1)
if 'ads.APPLICATION_ID' not in s:
    s = s.replace('</application>', meta + '</application>', 1)
open(p, 'w', encoding='utf-8').write(s)
print('Manifest listo')
