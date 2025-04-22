---
title: "Introducción"
sidebar_position: 1
slug: /
---

# Cómo construir un pequeño nodo autocustodiado para aceptar pagos Lightning en tu tienda

Un tutorial para instalar Phoenixd y LNBits en un OrangePi Zero 2W y usar Zeus Wallet como la app de punto de venta (PoS).

Alternativamente, puedes usar Albyhub y/o LDK, en lugar de LNBits y/o Phoenixd.

## Costos:
- USA:
  - Sin liquidez entrante: US$44
  - Con 2Msat entrante: US$69
- Brazil:
  - Sin liquidez entrante: US$41
  - Con 2Msat entrante: US$66
- Si estás usando una **laptop** o ya tienes acceso a un **VPS**:
  - ~$GRATIS

### Desglose de costos
- Hardware: US$44 en EE.UU., US$41 en Brasil
- Tarifa de auto-liquidez de Phoenixd: US$25 (esto puede evitarse si transfieres una seed phrase desde la app móvil de Phoenix Wallet en lugar de crear el nodo directamente en Phoenixd)
- Si estás usando una **laptop** o ya tienes acceso a un **VPS**:
  - ~$GRATIS

## Hardware

### OrangePi
- OrangePi Zero 2W + fuente de alimentación
  - USA: [OPi + 3A power supply for US$31](https://www.amazon.com/Orange-Pi-Zero-2W-Development/dp/B0CHMT4SJW/)
  - Brazil: US$29
    - [OrangePi for US$25](https://www.aliexpress.com/item/1005006016355138.html)
    - [4A power supply for US$4](https://www.aliexpress.com/item/1005005078736401.html)

- Tarjeta MicroSD de 32GB
  - USA: [US$13](https://www.amazon.com/SanDisk-Extreme-microSDHC-Memory-Adapter/dp/B06XYHN68L)
  - Brazil: [US$12](https://www.amazon.com.br/SanDisk-Extreme-microSDHC-Memory-Adapter/dp/B06XYHN68L)

- Estoy asumiendo que ya tienes acceso a lo siguiente:
  - Un dispositivo con acceso a línea de comandos para configurar todo, ya sea:
    - Una laptop/computadora de escritorio (para acceso SSH), o
    - Un teclado, ratón y monitor (para acceso directo)
  - Un dispositivo para flashear la tarjeta SD (probablemente una laptop y tal vez un adaptador USB a microSD)
  - Una conexión a internet/enrutador y una forma de conectar el OPi (wifi o ethernet, ver sección de conexión a internet)
  - Al menos un teléfono tipo Android o iOS para usar como terminal de punto de venta
  - Una billetera Lightning habilitada para pagar la tarifa de auto-liquidez (~US$25) de Phoenixd

### Laptop o VPS
- Funciona en Linux, Mac o (¡incluso!) Windows
- Puedes usar cualquiera de estos solo para aprender, pero ten en cuenta que si realmente deseas usar esto en una tienda, necesitarás algo que pueda mantenerse encendido y conectado a internet 24/7. La mayoría de los VPS tienen un costo mensual (aunque he oído que es posible encontrar uno gratuito en Oracle. El más barato que encontré fue de US$2/mes).

### Teléfono Android con Termux
- Esto es experimental (pero ~funciona)

## Software

Para completar este tutorial, necesitarás:

- Un **nodo** Lightning  
  - Phoenixd, o  
  - Albyhub con LDK
- Un **hub** Lightning (para conectar apps cliente móviles y experimentar con extensiones/conexiones de terceros)  
  - LNBits, o  
  - Albyhub
- Y una **app de punto de venta**  
  - Zeus  
    - Funciona con albyhub y lnbits  
    - Albyhub con Zeus requiere una cuenta en el sitio web de Alby  
  - Alby Go  
    - Funciona con albyhub  
    - Se conecta vía NWC, no se necesita cuenta de Alby  
  - Buzzpay  
    - Funciona con albyhub  
    - Se conecta vía NWC, no se necesita cuenta de Alby  
    - Funciona con backend Phoenixd desde la versión v1.14 (lanzada el 17 de febrero de 2025)
