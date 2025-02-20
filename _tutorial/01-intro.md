---
layout: default
title: "Intro"
permalink: /tutorial/01-intro/
---

# How to build a tiny self-custodial node to accept Lightning in your shop

A tutorial for installing Phoenixd and LNBits on an OrangePi Zero 2W and using Zeus Wallet as the PoS app.

Alternatively, you can use Albyhub and/or LDK, instead of LNBits and/or Phoenixd.

## Cost:
- USA:
  - without inbound: US$44
  - with 2Msat inbound: US$69
- Brazil:
  - without inbound: US$41
  - with 2Msat inbound: US$66
- If you're just using a **laptop** or you already have access to a **vps**:
  - ~$FREE

### Cost breakdown
- Hardware: US$44 if in USA, US$41 if in Brazil
- Phoenixd autoLiquidity fee: $25 (this can potentially be waived if you transfer a seed from the mobile Phoenix Wallet app rather than creating the node on phoenixd)
- If you're just using a **laptop** or you already have access to a **vps**:
  - ~$FREE
## Hardware
### OrangePi
- OrangePi Zero 2W + power supply
  - USA: [OPi + 3A power supply for US$31](https://www.amazon.com/Orange-Pi-Zero-2W-Development/dp/B0CHMT4SJW/)
  - Brazil: US$29
    - [OrangePi for US$25](https://www.aliexpress.com/item/1005006016355138.html)
    - [4A power supply for US$4](https://www.aliexpress.com/item/1005005078736401.html)

- 32GB MicroSD card
  - USA: [US$13](https://www.amazon.com/SanDisk-Extreme-microSDHC-Memory-Adapter/dp/B06XYHN68L)
  - Brazil: [US$12](https://www.amazon.com.br/SanDisk-Extreme-microSDHC-Memory-Adapter/dp/B06XYHN68L)

- I am assuming you already have access to these:
  - A device for command line access to set everything up, either:
    - A laptop/desktop computer (for SSH access), or
    - A keyboard, mouse, and monitor (for direct access)
  - A device for flashing the sd card (probably a laptop and maybe a USB to microsd adapter)
  - An internet connection/router and a way to connect the OPi to it (wifi or ethernet, see internet connection section below)
  - At least one Android-like or iOS cell phone to use as the point-of-sale terminal
  - A Lightning-enabled wallet to pay Phoenixd's ~US$25 autoLiquidity fee

### Laptop or VPS
- Works on Linux, Mac, or (even!) Windows
- Feel free to use one of these just to learn, though keep in mind you will want something that you can leave powered on and connected to the internet 24/7 if you really want to use this in a shop, though. Most VPSes carry a monthly cost (though I hear it's possible to find a free VPS on Oracle. The cheapest I found was US$2/mo).

### Android phone with Termux
- This is experimental (but ~works)

## Software

To successfully complete this tutorial, you will need:

- A Lightning **node**
  - Phoenixd, or
  - Albyhub with LDK
- A Lightning **"hub"** (for connecting mobile client apps and hacking with third-party extensions/connections)
  - LNBits, or
  - Albyhub
- And a **point-of-sale app**
  - Zeus
    - works with albyhub and lnbits
    - albyhub with zeus requires an alby website account
  - Alby Go
    - works with albyhub
    - connects via nwc, no alby account needed
  - Buzzpay
    - works with albyhub
    - connects via nwc, no alby account needed
    - works with phoenixd backend as of v1.14 (released 2025-02-17)
