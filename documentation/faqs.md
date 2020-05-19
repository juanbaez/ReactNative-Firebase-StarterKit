# FAQs

## Code Style Guide?

We're using [Airbnb's](https://github.com/airbnb/javascript) JS/React Style Guide with ESLint linting. We just like it :)

## How do I change the Reach Native App Icon?

You might want to change the app icons for iOS and Android. You can use the [app-icon](https://github.com/dwmkerr/app-icon) utility to generate all of the required icons for each required size.

```bash
npx app-icon generate -i ./src/images/app-icon.png
```

This will generate the icon in all required sizes. You can also add labels to icons, which can be useful for testing. This example labels the icon with 'beta' and the current version number:

```bash
npx app-icon label -i ./src/images/app-icon.png -o temp.png --top beta --bottom $(jq .version package.json)
npx app-icon generate -i temp.png
```

![Icon Labelled with Beta and Version Number](./icon-label.png)

## How do I change the React Native App Name/Bundle ID?

 **You will need to be running Node version 7.6 or greater for the rename functionality to work**

-  `npm run rename` - you'll be prompted to enter a project name and company name
-   Note down the package name value - you'll need this when setting up your Firebase project

