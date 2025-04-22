---
title: "Nodo de Lightning"
sidebar_position: 3
---

# Nodo de Lightning

*Omite esta página si estás usando Albyhub con LDK, y simplemente continúa directamente a [configurar Albyhub](hub#albyhub).*

## Phoenixd

### Instala y ejecuta la imagen de Docker
Usaremos la imagen de Docker del [sethforprivacy's ghcr repo](https://github.com/sethforprivacy/phoenixd-docker/pkgs/container/phoenixd):
- Primero crea el volumen de datos:
  - `docker volume create phoenixd_data`
- Ahora ejecuta la imagen:
  - `docker run -d --name phoenixd -p 9740:9740 -v phoenixd_data:/phoenix --restart unless-stopped ghcr.io/sethforprivacy/phoenixd`
- Opcionalmente puedes [construirla tú mismo](https://github.com/sethforprivacy/phoenixd-docker) en lugar de descargarla desde ghcr
    - probablemente sea mejor hacerlo en una Mac con Apple Silicon, ya que el OPi tardaría mucho en compilar

### Ejecuta algunos comandos importantes
#### Lista todos los comandos disponibles
Una vez que el contenedor esté en ejecución, asegúrate de listar todos los comandos disponibles:
```
docker exec -it phoenixd /phoenix/bin/phoenix-cli --help
```
#### Respalda tus palabras de la seed phrase
Escribe tu seed phrase y guárdala en un lugar secreto/seguro (**MUY IMPORTANTE ANTES DE PONER DINERO EN EL NODO**):

```
docker exec -it phoenixd cat /phoenix/.phoenix/seed.dat
```
- Phoenixd realizará un respaldo cifrado de tu base de datos de canales y lo enviará a ACINQ. Puede recuperarse usando tu semilla y se mantiene actualizado cada vez que cambia el estado de tu canal. Por lo tanto, si pierdes tu base de datos de canales, la semilla puede usarse para recuperar completamente tus fondos, siempre que confíes en que ACINQ te devolverá tu información cifrada.
- Esta es una de las formas en las que un nodo Lightning completo como CLN es más soberano que Phoenixd. Pero siempre puedes actualizar más adelante. Y si simplemente no pierdes tus datos (es decir, haces tus propios respaldos), entonces esta desventaja no aplica.

#### Abre un canal / Obtén liquidez entrante
Por defecto, phoenixd solicitará 2Msat de liquidez entrante del LSP de ACINQ cada vez que se quede sin liquidez entrante. Esto incluye, por supuesto, cuando inicias el nodo por primera vez y recibes tu primer pago. ACINQ cobra un 1% del monto solicitado, que equivale a 20ksat (más la comisión minera). Dado que 20ksat son aproximadamente US$20 al momento de escribir esto, y dado que no necesitamos tanta liquidez para un taller, configuramos phoenixd para que no solicite liquidez entrante.

*(Nota: si realmente deseas 2M sats de liquidez entrante, omite esto. Si eliges esta ruta, debes enviar ~25ksats como primer pago, la mayor parte será cobrada por ACINQ como tarifa)*:

Edita la configuración de phoenixd:
```
sudo nano "$(docker inspect -f '{% raw %}{{ range .Mounts }}{{ if eq .Destination "/phoenix" }}{{ .Source }}/.phoenix/phoenix.conf{{ end }}{{ end }}{% endraw %}' phoenixd)"
```
Agrega estas dos líneas al archivo de configuración (esto debería funcionar bien mientras las comisiones mineras sean menores a 5k):
```
auto-liquidity=off
max-mining-fee=5000
```

Guarda y sal (ctrl+s, ctrl+x).

Reinicia tu contenedor para aplicar la nueva configuración:
```
docker restart phoenixd
```

Ahora deposita 5ksats en tu nodo:
```
docker exec -it phoenixd /phoenix/bin/phoenix-cli createinvoice --amountSat=5000 --desc="initial deposit"
```
- Copia el bolt11 resultante (`lnbc...`)
- Crea un código QR de tu bolt11:
```
qrencode -t ANSIUTF8 <lnbc....>
```
- Escanéalo con tu billetera Lightning y realiza el pago

**¡Felicidades, ahora tienes un pequeño servidor Lightning!** Vamos a conectar un sistema de punto de venta para que tus clientes puedan comprar en tu tienda con él.
