---
title: "Lightning Node"
sidebar_position: 3
---

# Lightning Node

*Skip this page if you're using Albyhub with LDK, and just proceed straight to [setting up Albyhub](hub#albyhub).*

## Phoenixd

### Install and run the Docker image
We will use the Docker image from [sethforprivacy's ghcr repo](https://github.com/sethforprivacy/phoenixd-docker/pkgs/container/phoenixd):
- First create the data volume:
  - `docker volume create phoenixd_data`
- Now run the image:
  - `docker run -d --name phoenixd -p 9740:9740 -v phoenixd_data:/phoenix --restart unless-stopped ghcr.io/sethforprivacy/phoenixd`
- You can optionally [build it yourself](https://github.com/sethforprivacy/phoenixd-docker) rather than pulling from ghcr
    - probably do this on an Apple Silicon Mac, since the OPi will take ages to do the build

### Run some important commands
#### List all available commands
Once the container is running, be sure to list all available commands:
```
docker exec -it phoenixd /phoenix/bin/phoenix-cli --help
```
#### Back up your seed words
Write down your seed and put it somewhere secret/safe (**VERY IMPORTANT BEFORE PUTTING MONEY ON THE NODE**):

```
docker exec -it phoenixd cat /phoenix/.phoenix/seed.dat
```
- Phoenixd will make an encrypted backup of your channel database and send it to ACINQ. It can be recovered using your seed and is kept up-to-date every time your channel state changes. Thus, in the event that you lose your channel database, the seed can be used to fully recover all your funds, as long as you trust ACINQ to give you your encrypted data back.
- This is one way in which a full Lightning node such as CLN is more sovereign than Phoenixd. But you can always upgrade later. And if you just don't lose your data (ie make your own backups), then this disadvantage doesn't apply.

#### Open a channel/Get inbound liquidity
By default, phoenixd will request 2Msat of inbound liquidity from the ACINQ LSP, whenever it runs out of inbound liquidity. This of course includes when you first start the node and receive your very first payment. ACINQ charges 1% of the amount of inbound liquidity requested, which is 20ksat (plus the mining fee). Since 20ksat is about US$20 at the time of writing, and since we don't need this much inbound liquidity for a workshop, we instead configure phoenixd not to request inbound liquidity.

*(Note: if you actually want 2M sats of inbound liquidity, just omit this. If you go this route, you should send ~25ksats as your first payment, most of which will be taken by ACINQ for the fee)*:

Edit the phoenixd config:
```
sudo nano "$(docker inspect -f '{{ range .Mounts }}{{ if eq .Destination "/phoenix" }}{{ .Source }}/.phoenix/phoenix.conf{{ end }}{{ end }}' phoenixd)"
```
Add these two lines to the config file (this should be fine as long as mining fees are lower than 5k):
```
auto-liquidity=off
max-mining-fee=5000
```

Now save and exit (ctrl+s, ctrl+x).

Restart your container to pick up the new settings:
```
docker restart phoenixd
```

Next, we deposit 5ksats into our node:
```
docker exec -it phoenixd /phoenix/bin/phoenix-cli createinvoice --amountSat=5000 --desc="initial deposit"
```
- Copy the resulting bolt11 (`lnbc...`)
- Create a QR of your bolt11:
```
qrencode -t ANSIUTF8 <lnbc....>
```
- Scan it with your lightning wallet and pay

**Congrats, now you have a tiny Lightning server!** Let's hook up a point-of-sale system to allow your customers to buy things with it at your shop!
