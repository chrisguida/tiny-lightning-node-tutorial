---
title: "Point-of-sale App"
sidebar_position: 5
---

# Point-of-sale Device

There are 3 point-of-sale apps you can use for this tutorial:

- [Zeus](#zeus) (mobile app)
  - Works with both lnbits and albyhub
  - Requires an Alby Account to use with Albyhub
  - Also works great as a Mobile Lightning Hub for your other node connections, like CLN
- [Alby Go](#alby-go) (mobile app)
  - Works over NWC
  - Only works with Albyhub
  - Does not require an Alby account
- [Buzzpay](#buzzpay) (web app)
  - Works over NWC
  - Only works with Albyhub
  - Does not require an Alby account
  - Designed more as a "point-of-sale" app than Alby Go
  - Is just a webapp, not a mobile app, so you can use this from any browser

## Zeus
### LNDHub
If using Zeus, you will need LNDHub set up to connect it to your node. If using LNBits, you should have already done this [when setting up LNBits](Hub#lndhub). If using Albyhub, follow the steps below:

#### Albyhub account
- Sign up for an account at https://getalby.com
- Connect your Alby account to your Albyhub:
  - Go to Settings->Alby Account->Connect now

#### LNDHub credentials
- Once logged in, click "Connect" at the top and click "LNDHub credentials".
- Once the QR is displayed, continue with the "Zeus" section below.

### Zeus
- Go to the [iOS App Store](https://apps.apple.com/us/app/zeus-wallet/id1456038895) or the [Google Play Store](https://play.google.com/store/apps/details?id=app.zeusln.zeus&hl=en&pli=1) and install Zeus Wallet.
- Open Zeus and click `Advanced Setup` when the app starts
- Select the option to create a new connection
- Click the square icon in the top right to open the QR scanner
- Scan the left QR code (the one that says `COPY LNDHUB INVOICE URL`).
- Give the connection a name (perhaps "My Store's Name Invoice-only")
- Hit `Save Wallet Config` to save the connection.
- Zeus should now open into your orangepi's lnbits account.
- Notice the `Custodial wallet` icon.
  - This appears because lnbits is theoretically backed by the funds in Phoenixd, but if you spend all of the funds out of Phoenixd, your lnbits account will appear to have money in it but it won't actually have any funds.
  - Of course, as the system administrator, you (the shop owner) are the custodian. So just don't rug yourself.
- Notice the `Read-only wallet` icon.
  - This appears because the invoice connection can only receive money, but it can't spend.
    - This connection is perfect for giving to your employees, as then you don't need to trust them not to spend the money from your shop's account.
    - Notice that the `Send` button is grayed out.

## Alby Go
- Go to the Android Play store and download [Alby Go](https://play.google.com/store/apps/details?id=com.getalby.mobile) (iOS should be easy to find as well)
- Go to "Wallets" in the app, then "Connect a Wallet".
- In Albyhub, go to "Connections" then "Add connection"
- Select "invoice only"
- Scan the resulting QR code with the Alby Go app, on all your workers' phones
- Sell things with Lightning!

## Buzzpay
- In Albyhub, go to "Connections" then "Add connection"
- Select "invoice only"
- Click the resulting link and share it with your workers
- Sell things with Lightning!

#### Congratulations, you now have a functional Lighting-accepting point-of-sale system for your shop!
