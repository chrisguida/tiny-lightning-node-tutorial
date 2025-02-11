---
layout: default
title: "Phoenixd"
permalink: /tutorial/03-phoenixd/
---


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
Make sure to open a channel with the ACINQ LSP and have it give you 2M sats of inbound liquidity. At the time of writing, this is just a bit under 25k sats (US$25), so we do:
```
docker exec -it phoenixd /phoenix/bin/phoenix-cli createinvoice --amountSat=25000 --desc="autoLiquidity 2M"
```
- Copy the resulting bolt11 (`lnbc...`)
- Create a QR of your bolt11:
```
qrencode -t ANSIUTF8 <lnbc....>
```
- Scan it with your lightning wallet and pay
- If you don't do this step, any money under ~25k sats that you receive will be held by ACINQ custodially, with no ability to spend, until it reaches the feeCredit required to open a channel with 2M sats of autoLiquidity.
- Once you pay ~25k sats into your node, the feeCredit will be transferred off your node and paid to ACINQ for the inbound liquidity service. You will not get this money back, so make sure you actually want to use this node for something before completing this step.
- If you want less inbound liquidity and don't feel like paying $25 to start using your node, you can restore a seed from the Phoenix Wallet app, which allows requests for inbound liquidity of less than 2M sats.