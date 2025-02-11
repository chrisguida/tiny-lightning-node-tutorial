---
layout: default
title: "Intro"
permalink: /tutorial/01-intro/
---

# How to build a tiny self-custodial node to accept Lightning in your shop

A tutorial for installing Phoenixd and LNBits on an OrangePi Zero 2W and using Zeus Wallet as the PoS app.

## Cost:
- USA: US$69
- Brazil: US$66

### Cost breakdown
- Parts: US$44 if in USA, US$41 if in Brazil
- Phoenixd autoLiquidity fee: $25 (this can potentially be waived if you transfer a seed from the mobile Phoenix Wallet app rather than creating the node on phoenixd)

## Parts
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
