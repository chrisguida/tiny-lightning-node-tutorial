---
layout: default
title: "Lndhub"
permalink: /tutorial/05-lndhub/
---


## LndHub

### Install and Get Invoice QR
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

### Turn off LNBITS_ADMIN_UI again

Once LNDHub is installed, you'll want to turn off LNBITS_ADMIN_UI again in LNBits. Go back to your terminal and edit the LNBits .env file:

```
nano ~/code/lnbits/.env
```

Change `LNBITS_ADMIN_UI=true` to `LNBITS_ADMIN_UI=false`

Save and close (ctrl+s, ctrl+x)

**Now let's connect your point of sale app!**
