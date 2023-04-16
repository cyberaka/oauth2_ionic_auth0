# oauth2_ionic_auth0
A test app which is the proving ground for Ionic, Auth0 using OAuth2 protocols. 

## Getting Started Sample Auth0 UI

### Software Requirements
Install [Node](https://nodejs.org/en)

Install [Ionic](https://ionicframework.com/docs/cli)

### Web

Using  [Node](https://nodejs.org/en) in your project directory run the following command:

```
npm install && ionic build --prod
```

Now you are getting `www` folder, Use this folder and host.


### Android

```
npm install 
npx cap install @capacitor/android
ionic build --prod && npx cap sync
npx cap open android
```
**Note:** Using below comments to add custom URL scheme into your `AndroidManifest.xml`

This article assumes you will be using Custom URL Schemes to handle the callback within your application. To do this, register your YOUR_PACKAGE_ID as a URL scheme for your chosen platform. To learn more, [Create Deep Links](https://developer.android.com/training/app-links/deep-linking) to App Content for Android.


### iOS

```
npm install 
npx cap install @capacitor/ios
ionic build --prod && npx cap sync
npx cap open ios
```

**Note:** Using below comments to add custom URL scheme into your `Xcode project`

This article assumes you will be using Custom URL Schemes to handle the callback within your application. To do this, register your YOUR_PACKAGE_ID as a URL scheme for your chosen platform. To learn more, read Defining a [Custom URL Scheme](https://github.com/auth0/Auth0.swift#configure-custom-url-scheme) for iOS.


