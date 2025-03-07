---
layout: default
title: "Lightning Hub"
permalink: /tutorial/04-hub/
---

# Lightning Hub

To act as a connector to your client apps, you will need either LNBits or Albyhub, in addition to your Lightning node backend.

Click to choose a Lightning Hub as your base of operations:

- [**LNBits**](#lnbits) connects to pretty much any Lightning backend
- [**Albyhub**](#albyhub) connects to Phoenixd (recommended), LDK (bundled with Albyhub), and LND.

## LNBits
### Clone the repo
```
mkdir -p ~/code && cd ~/code
git clone https://github.com/lnbits/lnbits
cd ~/code/lnbits
```
### Install dependencies
```
sudo apt install build-essential libsecp256k1-dev pkg-config python3-dev
# install poetry
curl -sSL https://install.python-poetry.org | python3 -
```

Make sure you copy and paste the `export` command that poetry's installer spits out so that you can execute poetry from your current shell. If you want to be able to permanently install poetry on your system, you should append this `export` command to your `~/.bashrc` file. To test whether `poetry` works, run:

```
poetry --version
```

If it worked, you now have poetry and you can move on to the next step:

```
git checkout main
poetry install --only main
```

If Poetry fails to install packages due to keyring access issues, disable keyring:
```
poetry config keyring.enabled false
```
### Configure LNBits
Copy to clipboard the http-password from phoenix.conf
```
docker exec -it phoenixd cat /phoenix/.phoenix/phoenix.conf | grep http-password=
```
Now create and edit the .env file
```
cp .env.example .env
nano .env
```

- Change `HOST=127.0.0.1` to `HOST=0.0.0.0`
- Change `LNBITS_BACKEND_WALLET_CLASS=VoidWallet` to `LNBITS_BACKEND_WALLET_CLASS=PhoenixdWallet`
- find the `# PhoenixdWallet` section and change the line that says `PHOENIXD_API_PASSWORD=PHOENIXD_KEY` to `PHOENIXD_API_PASSWORD=<paste your http-password>`
- Ctrl+s then Ctrl+x to save and exit

### Systemd service
Follow instructions to [install lnbits as a systemd service](https://github.com/lnbits/lnbits/blob/main/docs/guide/installation.md#lnbits-as-a-systemd-service) (repeated here for your convenience):
```
sudo nano /etc/systemd/system/lnbits.service
```
Copy and paste the following into the file (ctrl+shift+v to paste in linux or cmd+v on mac) (**NOTE: If you're not using an orangepi for this tutorial, make sure to replace all occurrences of "orangepi" with your actual username below**):
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

Check to make sure lnbits is connected to phoenixd. Check the logs and make sure you see `PhoenixdWallet`, not `VoidWallet`:

`sudo journalctl -u lnbits -ef`

On some systems you may need this instead:

`sudo tail -f /var/log/syslog`

Once lnbits is running and connected to phoenixd properly, you should enable the admin UI to be able to install the LNDHub extension:

```
nano .env
```

- Change `LNBITS_ADMIN_UI=false` to `LNBITS_ADMIN_UI=true` (**PAY ATTENTION TO THE NOTE AT THE TOP EXPLAINING THAT THE REST OF THE CONFIG IS IGNORED WHEN THIS SETTING IS ON**)

Go on to the next step to install LNDHub. Once it's installed, you can deactivate the admin UI again.


### LndHub

#### Install and Get Invoice QR
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

#### Turn off LNBITS_ADMIN_UI again

Once LNDHub is installed, you'll want to turn off LNBITS_ADMIN_UI again in LNBits. Go back to your terminal and edit the LNBits .env file:

```
nano ~/code/lnbits/.env
```

Change `LNBITS_ADMIN_UI=true` to `LNBITS_ADMIN_UI=false`

Save and close (ctrl+s, ctrl+x)

**Now let's connect your point of sale app! (Zeus if you are using LNBits with LNDHub)**


## Albyhub

Albyhub is a quick way to get started accepting Lightning payments. In this tutorial, we will use it with one of two backends:

- LDK (bundled with Albyhub), or
- Phoenixd

You can run albyhub in many places:
- Desktop/laptop
- Docker (for orangepi or vps)
- Turnkey nodes like Start9 (doesn't work with phoenixd for now)

### Desktop
- Install the latest release from [here](https://github.com/getAlby/hub/releases) ([v1.14.2](https://github.com/getAlby/hub/releases/tag/v1.14.2) at time of writing)
  - Choose the compressed archive appropriate for your OS
  - Extract the archive to a convenient directory
- Run the "Alby Hub" binary
  - On Linux, this is `./albyhub-Desktop-Linux/albyhub-Desktop-Linux/bin/Alby\ Hub` from the dir you extracted the archive in

### Docker (only tested on Linux)
Docker makes setting up Albyhub easy!

#### docker-compose (make sure to stop your old phoenixd container if you go this route)
- Great for running Albyhub and Phoenixd together.

- Install docker-compose:
```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Create a directory for your albyhub data:
```
mkdir -p albyhub && cd albyhub
```

Create and populate `docker-compose.yml`:
- Create:
```
nano docker-compose.yml
```
- Populate:
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

  albyhub-phoenixd:
    platform: linux/arm64
    image: ghcr.io/sethforprivacy/phoenixd:latest
    container_name: albyhub-phoenixd
    ports:
      - "9740:9740"
    volumes:
      - phoenixd_data:/phoenix
    command: --agree-to-terms-of-service --http-bind-ip 0.0.0.0

volumes:
  phoenixd_data:
    external: true
```

### Configure Albyhub with your selected backend (needed for both Desktop and Docker)
- For LDK, just use the default
  - You will need to acquire inbound liquidity by buying an inbound channel from an LSP.
- For Phoenixd, say "advanced" then "connect custom node" when you first go through the setup flow.
  - You cannot change this without deleting your Albyhub data, so make sure you do it the way you want the first time.
  - Use `http://127.0.0.1:9740` (or LAN IP if running on a different computer) for Desktop, and `http://albyhub-phoenixd:9740` if running in docker-compose
  - Grab your Phoenixd `http-password` as described in the [LNBits section above](#configure-lnbits), then paste that into the "Authorization" field in Albyhub Desktop.
  - You should have already acquired inbound when you set up [Phoenixd in the previous step](03-node).


**Congrats, now you have your Lightning Hub set up!**

Read on to set up your workers' point-of-sale app!
