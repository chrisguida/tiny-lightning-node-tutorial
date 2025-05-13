---
title: "Lightning Hub"
sidebar_position: 4
---

# Lightning Hub

Para actuar como conector con tus apps cliente, necesitarás LNBits o Albyhub, además de tu nodo Lightning.

Haz clic para elegir un Lightning Hub como tu base de operaciones:

- [**LNBits**](#lnbits) se conecta prácticamente con cualquier backend de Lightning
- [**Albyhub**](#albyhub) se conecta a Phoenixd (recomendado), LDK (incluido con Albyhub), y LND.

## LNBits
### Clona el repositorio
```
mkdir -p ~/code && cd ~/code
git clone https://github.com/lnbits/lnbits
cd ~/code/lnbits
```
### Instala las dependencias
```
sudo apt install build-essential libsecp256k1-dev pkg-config python3-dev
# install poetry
curl -sSL https://install.python-poetry.org | python3 -
```

Asegúrate de copiar y pegar el comando `export` que muestra el instalador de poetry para poder ejecutar poetry desde tu shell actual. Si deseas instalar poetry de forma permanente, agrega este comando `export` a tu archivo `~/.bashrc`. Para probar si poetry funciona, ejecuta:

```
poetry --version
```

Si funcionó, ahora tienes poetry y puedes pasar al siguiente paso:

```
git checkout main
poetry install --only main
```

Si Poetry se queda colgado durante la instalación de dependencias, el problema puede resolverse desactivando keyring:
```
poetry config keyring.enabled false
```
### Configura LNBits
Copia al portapapeles el http-password desde phoenix.conf
```
docker exec -it phoenixd cat /phoenix/.phoenix/phoenix.conf | grep http-password=
```
Ahora crea y edita el archivo .env
```
cp .env.example .env
nano .env
```

- Cambia `HOST=127.0.0.1` a `HOST=0.0.0.0`
- Cambia `LNBITS_BACKEND_WALLET_CLASS=VoidWallet` a `LNBITS_BACKEND_WALLET_CLASS=PhoenixdWallet`
- Busca la sección `# PhoenixdWallet` y cambia la línea que dice `PHOENIXD_API_PASSWORD=PHOENIXD_KEY` por `PHOENIXD_API_PASSWORD=<pega tu http-password>`
- Ctrl+s luego Ctrl+x para guardar y salir

### Servicio systemd
Sigue las instrucciones para [instalar LNBits como servicio systemd](https://github.com/lnbits/lnbits/blob/main/docs/guide/installation.md#lnbits-as-a-systemd-service) (repeated here for your convenience):
```
sudo nano /etc/systemd/system/lnbits.service
```
Copia y pega lo siguiente en el archivo (ctrl+shift+v para pegar en linux o cmd+v en mac) (**NOTA: Si no usas un orangepi para este tutorial, asegúrate de reemplazar todas las apariciones de "orangepi" por tu usuario real**):
```
# Systemd unit for lnbits
# /etc/systemd/system/lnbits.service

[Unit]
Description=LNbits
# you can uncomment these lines if you know what you're doing
# it will make sure that lnbits starts after lnd (replace with your own backend service)
#Wants=lnd.service
#After=lnd.service

[Service]
# replace with the absolute path of your lnbits installation
WorkingDirectory=/home/orangepi/code/lnbits
# same here. run `which poetry` if you can't find the poetry binary
ExecStart=/home/orangepi/.local/bin/poetry run lnbits
# replace with the user that you're running lnbits on
User=orangepi
Restart=always
TimeoutSec=120
RestartSec=30
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```
- Ctrl+s, Ctrl+x para guardar y salir
- Habilita lnbits para que inicie al arrancar el sistema y arráncalo:
```
sudo systemctl enable lnbits.service
sudo systemctl start lnbits.service
```

Verifica que lnbits esté conectado a phoenixd. Revisa los logs y asegúrate de ver `PhoenixdWallet`, no `VoidWallet`:

`sudo journalctl -u lnbits -ef`

En algunos sistemas puedes necesitar esto en su lugar:

`sudo tail -f /var/log/syslog`

Una vez que lnbits esté corriendo y conectado a phoenixd correctamente, deberías habilitar la interfaz de administración (admin UI) para poder instalar la extensión LNDHub:

```
nano .env
```

- Cambia `LNBITS_ADMIN_UI=false` a `LNBITS_ADMIN_UI=true` (**ATENCIÓN A LA NOTA SUPERIOR EXPLICANDO QUE EL RESTO DE LA CONFIGURACIÓN SE IGNORA CUANDO ESTA OPCIÓN ESTÁ ACTIVA**)

Continúa con el siguiente paso para instalar LNDHub. Una vez instalado, puedes desactivar la admin UI de nuevo.

### LndHub

#### Instala y obtén el QR para los pagos
- Ingresa al portal de superusuario de lnbits desde tu navegador (`http://<IP LAN de orangepi, igual que SSH>:5000`)
- Crea un nombre de usuario y contraseña, asegurándote de guardar el enlace de tu wallet en un lugar seguro, como un gestor de contraseñas.
- Haz clic en `Extensions`
- Haz clic en `All`
- Busca "lndhub" en la barra de búsqueda
- Encuentra la extensión `LndHub` y haz clic en `Manage`
- Haz clic en el menú desplegable que aparece y selecciona la última versión disponible (0.5.0 al momento de escribir esto)
- Serás llevado a la página `Installed`
- Haz clic en `Enable` en la extensión `LndHub`.
- Aparecerá un ítem de `LndHub` bajo el título `Extensions` en la izquierda de tu ventana. Haz clic ahí.
- Se te mostrarán 2 códigos QR. El de la izquierda es la "invoice URL" y el de la derecha la "admin URL". Usaremos la "invoice URL" para configurar tu dispositivo de punto de venta.

#### Desactiva de nuevo LNBITS_ADMIN_UI

Una vez instalado LNDHub, debes desactivar de nuevo LNBITS_ADMIN_UI en LNBits. Vuelve a tu terminal y edita el archivo .env de LNBits:
```
nano ~/code/lnbits/.env
```

Cambia `LNBITS_ADMIN_UI=true` a `LNBITS_ADMIN_UI=false`

Guarda y cierra (ctrl+s, ctrl+x)

**¡Ahora conecta tu app de punto de venta! (Zeus si usas LNBits con LNDHub)**


## Albyhub

Albyhub es una manera rápida de empezar a aceptar pagos Lightning. En este tutorial lo usaremos con uno de dos backends:

- LDK (incluido con Albyhub), o
- Phoenixd

Puedes ejecutar albyhub en muchos entornos:
- Escritorio/laptop
- Docker (para orangepi o vps)
- Nodos preconfigurados como Start9 (por ahora no funciona con phoenixd)

### Desktop
- Instala la última versión desde [aquí](https://github.com/getAlby/hub/releases) ([v1.14.2](https://github.com/getAlby/hub/releases/tag/v1.14.2) al momento de escribir esto)
  - Elige el archivo comprimido apropiado para tu sistema operativo
  - Extrae el archivo en un directorio conveniente
- Ejecuta el binario "Alby Hub"
  - En Linux es `./albyhub-Desktop-Linux/albyhub-Desktop-Linux/bin/Alby\ Hub` desde el directorio donde descomprimiste el archivo

### Docker (solo probado en Linux)
¡Docker facilita la configuración de Albyhub!

#### docker-compose (asegúrate de detener tu contenedor phoenixd anterior si eliges esta opción)
- Ideal para correr Albyhub y Phoenixd juntos.

- Instala docker-compose:
```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Crea un directorio para los datos de albyhub:
```
mkdir -p albyhub && cd albyhub
```

Crea y edita `docker-compose.yml`:
- Crea:
```
nano docker-compose.yml
```
- Pega:
```
services:
  albyhub:
    container_name: albyhub
    image: ghcr.io/getalby/hub:latest
    volumes:
      - ./albyhub-phoenixd:/data
    ports:
      - "8080:8080"
    links:
      - "albyhub-phoenixd:albyhub-phoenixd"
    environment:
      - WORK_DIR=/data/albyhub
      - LOG_EVENTS=true
    restart: unless-stopped # al arrancar, inicia el contenedor

  albyhub-phoenixd:
    platform: linux/arm64
    image: ghcr.io/sethforprivacy/phoenixd:v0.4.2
    container_name: albyhub-phoenixd
    ports:
      - "9740:9740"
    volumes:
      - phoenixd_data:/phoenix
    command: --agree-to-terms-of-service --http-bind-ip 0.0.0.0
    restart: unless-stopped # al arrancar, inicia el contenedor

volumes:
  phoenixd_data:
    external: true
```

### Configura Albyhub con el backend seleccionado (necesario tanto en Escritorio como en Docker)
- Para LDK, usa el valor por defecto.
  - Deberás adquirir liquidez entrante comprando un canal a un LSP.
- Para Phoenixd, selecciona "advanced" y luego "connect custom node" al iniciar la configuración.
  - No puedes cambiar esto después sin borrar los datos de Albyhub, así que hazlo bien la primera vez.
  - Usa `http://127.0.0.1:9740` (o la IP de tu LAN si es en otro equipo) para Escritorio, y `http://albyhub-phoenixd:9740` si es en docker-compose.
  - Obtén tu `http-password` de Phoenixd como se describe en la [sección LNBits de arriba](#configura-lnbits), y pégalo en el campo "Authorization" de Albyhub Desktop.
  - Ya debiste haber adquirido liquidez entrante al configurar [Phoenixd en el paso anterior](/tiny-lightning-node-tutorial/es/node).


**¡Felicidades, ya tienes tu Lightning Hub configurado!**

Sigue leyendo para conectar la app de punto de venta para tus trabajadores.
