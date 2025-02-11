# How to build a tiny self-custodial node to accept Lightning in your shop

A tutorial for installing Phoenixd and LNBits on an OrangePi Zero 2W and using Zeus Wallet as the PoS app

## Cost:
- USA: US$69
- Brazil: US$66

### Cost breakdown
- Parts: US$44 if in USA, US$41 if in Brazil
- Phoenixd autoLiquidity fee: $25

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

## Setup process

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

### Phoenixd
- Grab the Docker image from [chrisguida's Docker Hub](https://hub.docker.com/repository/docker/chrisguida/phoenixd/tags):
  - First create the data volume:
    - `docker volume create phoenixd_data`
  - Now run the image:
    - `docker run -d --name phoenixd -p 9740:9740 -v phoenixd_data:/phoenix --restart unless-stopped chrisguida/phoenixd`
    - You can optionally [build it yourself](https://github.com/sethforprivacy/phoenixd-docker) rather than pulling from my dockerhub
      - probably do this on an Apple Silicon Mac, since the OPi will take ages to do the build
- Once the container is running, be sure to list all available commands:
    ```
    docker exec -it phoenixd /phoenix/bin/phoenix-cli --help
    ```
- Write down your seed and put it somewhere secret/safe (VERY IMPORTANT BEFORE PUTTING MONEY ON THE NODE):
    ```
    docker exec -it phoenixd /phoenix/bin/phoenix-cli --help
    ```
  - Phoenixd will make an encrypted backup of your channel database and send it to ACINQ. It can be recovered using your seed and is kept up-to-date every time your channel state changes. Thus, in the event that you lose your channel database, the seed can be used to fully recover all your funds, as long as you trust ACINQ to give you your encrypted data back.
    - This is one way in which a full Lightning node such as CLN is more sovereign than Phoenixd. But you can always upgrade later. And if you just don't lose your data, you don't need to worry about this.
- Make sure to open a channel with the ACINQ LSP and have it give you 2M sats of inbound liquidity. At the time of writing, this is just a bit under 25k sats (US$25), so we do:
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

### LNBits
- clone the repo
    ```
    mkdir -p ~/code && cd ~/code
    git clone https://github.com/lnbits/lnbits
    cd ~/code/lnbits
    ```
- install dependencies
    ```
    sudo apt install build-essential libsecp256k1-dev pkg-config python3-dev python3.11-dev
    # install poetry
    curl -sSL https://install.python-poetry.org | python3 -
    git checkout main
    poetry install --only main
    ```
- configure lnbits
  - ```
    # copy to clipboard the http-password from phoenix.conf 
    docker exec -it phoenixd cat /phoenix/.phoenix/phoenix.conf | grep http-password=
    # now create and edit the .env file
    cp .env.example .env
    nano .env
    ```
  - Change `LNBITS_ADMIN_UI=false` to `LNBITS_ADMIN_UI=true`
  - Change `HOST=127.0.0.1` to `HOST=0.0.0.0`
  - find the `# PhoenixdWallet` section and change the line that says `PHOENIXD_API_PASSWORD=PHOENIXD_KEY` to `PHOENIXD_API_PASSWORD=<paste your http-password>`
  - Ctrl+s then Ctrl+s to save and exit
- follow instructions to [install lnbits as a systemd service](https://github.com/lnbits/lnbits/blob/main/docs/guide/installation.md#lnbits-as-a-systemd-service)
  - ```
    sudo nano /etc/systemd/system/lnbits.service
    ```
  - Copy the following into the file:
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
  - Ctrl+s, Ctrl+x to save and exit
  - Enable lnbits to run on system boot, and start:
    ```
    sudo systemctl enable lnbits.service
    sudo systemctl start lnbits.service
    ```

### LndHub
- Log into the lnbits superuser portal in your browser (`http://<orangepi LAN IP, same as SSH>:5000`)
- Create a username and password, making sure to save your wallet link somewhere secure, like a password manager.
- Click `Extensions`
- Click `All`
- Search for "lndhub" in the search bar
- find the `LndHub` extension and click `Manage`
- Click the dropdown that opens and install the latest available version (0.5.0 at time of writing)
- You will be taken to the `Installed` page
- Click `Enable` on the `LndHub` extension.
- An `LndHub` item will appear under the `Extensions` heading on the left of your browser window. Go ahead and click it.
- You will be presented with 2 QR codes. The one on the left is the "invoice URL" and the one on the right is the "admin URL". We will use the "invoice URL" to set up your point of sale device.

### Point-of-sale Device (Zeus)
- Go to the [iOS App Store](https://apps.apple.com/us/app/zeus-wallet/id1456038895) or the [Google Play Store](https://play.google.com/store/apps/details?id=app.zeusln.zeus&hl=en&pli=1) and install Zeus.
- Open Zeus and click `Advanced Setup` when the app starts
- Select the option to create a new connection
- Click the square icon in the top right to open the QR scanner
- Scan the left QR code (the one that says `COPY LNDHUB INVOICE URL`).
- Give the connection a name (perhaps "My Store's Name Invoice-only")
- Zeus should now open into your orangepi's lnbits account.
- Notice the `Custodial wallet` icon.
  - This appears because lnbits is theoretically backed by the funds in Phoenixd, but if you spend all of the funds out of Phoenixd, your lnbits account will appear to have money in it but it won't actually have any funds.
  - Of course, as the system administrator, you (the shop owner) are the custodian. So just don't rug yourself.
- Notice the `Read-only wallet` icon.
  - This appears because the invoice connection can only receive money, but it can't spend.
    - This connection is perfect for giving to your employees, as then you don't need to trust them not to spend the money from your shop's account.
    - Notice that the `Send` button is grayed out.

#### Congratulations, you now have a functional Lighting-accepting point-of-sale system for your shop!
