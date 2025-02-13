---
layout: default
title: "Lnbits"
permalink: /tutorial/04-lnbits/
---


## LNBits
### Clone the repo
```
mkdir -p ~/code && cd ~/code
git clone https://github.com/lnbits/lnbits
cd ~/code/lnbits
```
### Install dependencies
```
sudo apt install build-essential libsecp256k1-dev pkg-config python3-dev python3.11-dev
# install poetry
curl -sSL https://install.python-poetry.org | python3 -
git checkout main
poetry install --only main
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
- Change `LNBITS_ADMIN_UI=false` to `LNBITS_ADMIN_UI=true` (**PAY ATTENTION TO THE NOTE AT THE TOP EXPLAINING THAT THE REST OF THE CONFIG IS IGNORED WHEN THIS SETTING IS ON**)
- Change `HOST=127.0.0.1` to `HOST=0.0.0.0`
- find the `# PhoenixdWallet` section and change the line that says `PHOENIXD_API_PASSWORD=PHOENIXD_KEY` to `PHOENIXD_API_PASSWORD=<paste your http-password>`
- Ctrl+s then Ctrl+s to save and exit

### Systemd service
Follow instructions to [install lnbits as a systemd service](https://github.com/lnbits/lnbits/blob/main/docs/guide/installation.md#lnbits-as-a-systemd-service) (repeated here for your convenience):
```
sudo nano /etc/systemd/system/lnbits.service
```
Copy and paste the following into the file (ctrl+shift+v to paste in linux or cmd+v on mac):
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
