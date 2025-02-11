
## Point-of-sale Device (Zeus)
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

#### Congratulations, you now have a functional Lighting-accepting point-of-sale system for your shop!
