---
title: "Inicialización"
sidebar_position: 2
---

## Configura el hardware e instala las dependencias del sistema

### Instala el sistema operativo
- Descarga Debian Bookworm desde el [sitio web de OrangePi](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-Zero-2W.html)
- Descomprime e instala la imagen del sistema operativo en la tarjeta SD usando [Balena Etcher](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-Zero-2W.html) (para la mayoría de las personas) o [`dd`](https://superuser.com/a/351815) (para usuarios avanzados que no pueden hacer funcionar Balena en Linux, como yo)
- Inserta la tarjeta SD en la ranura correspondiente del OPi
- Conecta la fuente de alimentación a la corriente
- Conecta el conector USB-C del adaptador de corriente a uno de los puertos USB-C del OPi

### Conéctate a Internet
Decide si usarás Wifi o Ethernet. Luego:
- Wifi: debe configurarse mediante:
  - wpa supplicant (puedes hacerlo editando la tarjeta SD después de flashearla), o
  - un cable ethernet para conectar el OPi a tu router o a tu laptop usando la función de Compartir Conexión a Internet (ver más abajo para conectar por ethernet)
  - usando tu monitor, teclado y ratón, inicia sesión en el entorno de escritorio y configura el Wifi en los ajustes del sistema operativo
- Ethernet: conecta tu OPi al router usando el cable
  - Como el OPi no tiene puerto Ethernet integrado, necesitarás:
    - un [adaptador USB-C a Ethernet](https://www.amazon.com/USB-Ethernet-Adapter-Gigabit-Switch/dp/B09GRL3VCN)
    - o una [placa de expansión](https://www.amazon.com/Orange-Pi-Zero-2W-Development/dp/B0CHMSPZVD) que cuesta unos $5 más

### Accede a la línea de comandos de tu dispositivo
- Si estás usando una imagen con entorno de escritorio y monitor, simplemente abre la app Terminal (tecla Windows/Super, luego escribe "terminal" y presiona Enter)
- Si estás conectándote vía SSH:
  - ejecuta `ip a | grep inet` para obtener tu dirección IP local. Toma las primeras 3 secciones de esta IP (generalmente algo como `192.168.100`), luego
  - ejecuta `sudo nmap -sP <primeras.3.secciones.0/24, por ejemplo 192.168.100.0/24>` para escanear la IP del OPi, luego
  - conéctate con `ssh orangepi@<IP del OPi>` y contraseña `orangepi` (considera cambiar la contraseña por seguridad).

### Instala algunas dependencias necesarias más adelante
```
sudo apt update
sudo apt install docker.io qrencode
```

Agrégate al grupo `docker` para poder ejecutar comandos sin `sudo`:

```
sudo usermod -aG docker $USER
```

Puedes cerrar sesión y volver a iniciar para aplicar los cambios, o simplemente hacer:

```
su - $USER
```

para recargar tu shell.

Verifica que tu usuario ahora aparezca en el grupo `docker`:

```
groups
```

Prueba si tienes acceso al daemon de Docker:

```
docker ps
```

Deberías ver algo como esto:
```
orangepi@orangepizero2w:~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Si es así, ¡estás listo para el siguiente paso: configurar tu servidor Lightning!
