---
title: "Initialization"
sidebar_position: 2
---


## Set up the hardware and install system dependencies

### Install the OS
- Download debian bookworm from [OrangePi's website](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-Zero-2W.html)
- Unzip and flash the OS image to the SD card using [Balena Etcher](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-Zero-2W.html) (for most people) or [`dd`](https://superuser.com/a/351815) (for advanced users who can't get Balena working on Linux, like me)
- Put the flashed SD card into the OPi's SD card slot
- Plug the power supply into the wall
- Plug the power adapter's USB-C connector into one of the USB-C ports on the OPi

### Connect to the Internet
Decide whether you're using Wifi or Ethernet. Then:
- Wifi: must be set up using either:
  - wpa supplicant (you can do this by editing the sd card after flashing it), or
  - an ethernet cable to connect the OPi to your router or to your laptop using Internet Connection Sharing (see below for connecting ethernet)
  - using your monitor, keyboard, and mouse, log into the desktop environment, and configure Wifi in the OS settings
- Ethernet: connect your OPi to your router using your cable
  - Since the OPi itself does not have an Ethernet port, you will need either:
    - a [USB-C-to-Ethernet adapter](https://www.amazon.com/USB-Ethernet-Adapter-Gigabit-Switch/dp/B09GRL3VCN)
    - or the [expansion board](https://www.amazon.com/Orange-Pi-Zero-2W-Development/dp/B0CHMSPZVD) which is $5 more

### Access your device's command line
- If using a desktop image with a monitor, just open the Terminal app (windows/Super key then type "terminal" + Enter)
- If connecting via SSH:
  - run `ip a | grep inet` which should yield your LAN IP address. Grab the first 3 sections of this IP (usually something like `192.168.100`), then
  - `sudo nmap -sP <1st.3.sections.0/24, for example 192.168.100.0/24>` to scan for the OPi's IP, then
  - `ssh orangepi@<OPi's IP>` and password `orangepi` to log into it (consider changing the password for security).

### Install some dependencies for later
```
sudo apt update
sudo apt install docker.io qrencode
```

Add yourself to the `docker` group so you can execute docker commands without `sudo`:

```
sudo usermod -aG docker $USER
```

You can log out and log back into reflect the changes, or just do

```
su - $USER
```

to reload your shell.

Check to see if your user appears in the `docker` group now:

```
groups
```

Test to make sure you have access to the docker daemon now:

```
docker ps
```

You should see something like this:
```
orangepi@orangepizero2w:~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

If so, you're good to go to the next step: setting up your Lightning server!
