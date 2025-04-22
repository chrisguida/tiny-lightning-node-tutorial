---
title: "App de Punto de Venta"
sidebar_position: 5
---

# Dispositivo de Punto de Venta

Hay 3 apps de punto de venta que puedes usar en este tutorial:

- [Zeus](#zeus) (mobile app)
  - Funciona con lnbits y albyhub
  - Requiere una cuenta de Alby para usarse con Albyhub
  - También funciona muy bien como Hub Lightning móvil para otras conexiones de nodo, como CLN
- [Alby Go](#alby-go) (app móvil)
  - Funciona mediante NWC
  - Solo compatible con Albyhub
  - No requiere cuenta de Alby
- [Buzzpay](#buzzpay) (app web)
  - Funciona mediante NWC
  - Solo compatible con Albyhub
  - No requiere cuenta de Alby
  - Diseñada más como una app de punto de venta que Alby Go
  - Es una webapp, no una app móvil, por lo que puedes usarla desde cualquier navegador

## Zeus
### LNDHub
Si usas Zeus, necesitarás tener configurado LNDHub para conectarlo a tu nodo. Si usas LNBits, esto debiste hacerlo [al configurar LNBits](hub#lndhub). i usas Albyhub, sigue estos pasos:

#### Cuenta de Albyhub
- Regístrate en https://getalby.com
- Conecta tu cuenta de Alby con tu Albyhub:
  - Ve a Settings->Alby Account->Connect now

#### Credenciales LNDHub
- Una vez que hayas iniciado sesión, haz clic en "Connect" en la parte superior y selecciona "LNDHub credentials".
- Una vez que aparezca el código QR, continúa con la sección de "Zeus" a continuación.

### Zeus
- Ve a la [App Store de iOS](https://apps.apple.com/us/app/zeus-wallet/id1456038895) o a la [Google Play Store](https://play.google.com/store/apps/details?id=app.zeusln.zeus&hl=en&pli=1) e instala Zeus Wallet.
- Abre Zeus y haz clic en `Advanced Setup` al iniciar la app
- Selecciona la opción para crear una nueva conexión
- Haz clic en el ícono cuadrado en la esquina superior derecha para abrir el escáner de QR
- Escanea el código QR izquierdo (el que dice `COPY LNDHUB INVOICE URL`).
- Asigna un nombre a la conexión (por ejemplo: "Tienda XYZ Solo Facturas")
- Presiona `Save Wallet Config` para guardar la conexión.
- Zeus debería abrir la cuenta de lnbits de tu orangepi
- Si aparece el ícono de `Custodial wallet`.
  - Esto aparece porque lnbits teóricamente está respaldada por los fondos en Phoenixd, pero si gastas todos los fondos de Phoenixd, tu cuenta de lnbits parecerá tener saldo aunque realmente no lo tenga.
  - Of course, as the system administrator, you (the shop owner) are the custodian. So just don't rug yourself.
  - Por supuesto, como administrador del sistema, tú (el dueño de la tienda) eres el custodio. Así que no te sabotees a ti mismo.
- Si aparece el ícono de `Read-only wallet`.
  Esto aparece porque la conexión de factura solo puede recibir dinero, no gastarlo.
    - Esta conexión es ideal para entregársela a tus empleados, ya que no necesitas confiar en que no gastarán el dinero de la tienda.
    - Nota que el botón de `Send` está desactivado.

## Alby Go
- Ve a la tienda de Android y descarga [Alby Go](https://play.google.com/store/apps/details?id=com.getalby.mobile) (también está disponible en iOS)
- Ve a "Wallets" en la app, luego selecciona "Connect a Wallet".
- En Albyhub, ve a "Connections" y luego a "Add connection"
- Selecciona "invoice only"
- Escanea el código QR resultante con la app de Alby Go, en todos los teléfonos de tus trabajadores
- ¡Vende productos con Lightning!

## Buzzpay
- En Albyhub, ve a "Connections" y luego a "Add connection"
- Selecciona "invoice only"
- Haz clic en el enlace generado y compártelo con tus trabajadores
- ¡Vende productos con Lightning!

#### ¡Felicidades, ahora tienes un sistema funcional de punto de venta que acepta Lightning para tu tienda!
