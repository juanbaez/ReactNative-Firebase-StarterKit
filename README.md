[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fmcnamee%2Freact-native-starter-kit%2Fbadge%3Fref%3Dmaster&style=flat)](https://github.com/juanbaez/react-native-starter-kit/actions)![Master test](https://github.com/juanbaez/vexpress/workflows/Test/badge.svg?branch=master)![Develop test](https://github.com/juanbaez/vexpress/workflows/Test/badge.svg?branch=develop)

---

# React Native + Firebase starter
---

## 🚀 Getting Started

 - Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger/releases) and open before running the app
 - Install `eslint`, `prettier` and `editor config` plugins into your IDE
 - Ensure your machine has the [React Native dependencies installed](https://facebook.github.io/react-native/docs/getting-started)

```bash
# Install dependencies
yarn install && ( cd ios && pod install )
```

#### iOS

```bash
# Start in the iOS Simulator
npx react-native run-ios --simulator="iPhone 11"
```

#### Android

```bash
# Start in the Android Simulator
#  - Note: open Android Studio > Tools > AVD > Run a device
#  - Example device specs: https://medium.com/pvtl/react-native-android-development-on-mac-ef7481f65e47#d5da
npx react-native run-android
```

---

## 📖 Docs

- [FAQs & Opinions](documentation/faqs.md)
- [Tests & testing](documentation/testing.md)
- [Understanding the file structure](documentation/file-structure.md)
- [Deploy the app](documentation/deploy.md)

---

## 👋 Features on react-native Level

- __Flux architecture__
    - [Redux](https://redux.js.org/docs/introduction/)
    - Redux Wrapper: [Rematch](https://github.com/rematch/rematch)
- __Routing and navigation__
    - [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) for native mobile navigation
- __Data Caching / Offline__
    - [Redux Persist](https://github.com/rt2zz/redux-persist)
- __UI Toolkit/s__
    - [Native Base](https://nativebase.io/) for native mobile
- __Code Linting__ with
    - [Airbnb's JS Linting](https://github.com/airbnb/javascript) guidelines
- __Deployment strategy__
    - [Both manual and automated strategies](documentation/deploy.md)
- __Splash Screen + Assets__
    - [React Native Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen)

---


