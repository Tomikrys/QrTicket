# QR Ticket

Mobile application for event tickets managing.

## Link to git
[https://github.com/Tomikrys/QrTicket](https://github.com/Tomikrys/QrTicket)

## To run the app locally

### Install expo to your mobile phone or emulator:

Google play - [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Run the application on your PC using expo:

1. Move to the project root folder:

```bash
cd QrTicket
```

2. Install all dependencies:

```bash
yarn install
```

3. Start the app with:


```bash
yarn start
```

4. The expo Dev tools should open up in your browser. Connect both devices to same LAN. If it is not possible, then set "Tunnel" option in Expo Dev Tool instead of "LAN".

5. Open Expo app on your phone / emulator and click on "Scan QR Code".

6. Scan QR Code from Expo Dev Tool and wait till the application is build and ready to run on your device.

7. The app should be running fine now. The password is *1234* for admin, nothing for validator.

8. Enjoy.

### Building the app
[https://docs.expo.dev/classic/building-standalone-apps/](https://docs.expo.dev/classic/building-standalone-apps/)


1. Android
The build will be executed on Expo Servers and the apk is avaliable there.

```bash
expo build:android -t apk
```

2. Web

```bash
expo build:web
```

3. iOS

```bash
expo build:ios -t archive
```

### Accounts
1. Expo
```bash
tomikrys
3xp0T0mikrys
```

2. Database 
```bash
Connection String	mysql://rdxr45odtrm8ay4m:gp77l7vqtdg3iqi6@yvu4xahse0smimsc.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/fhg6lye7nr6gxocf
Host		yvu4xahse0smimsc.chr7pe7iynqr.eu-west-1.rds.amazonaws.com	
Username	rdxr45odtrm8ay4m	
Password	gp77l7vqtdg3iqi6	
Port		3306	
Database	fhg6lye7nr6gxocf
```