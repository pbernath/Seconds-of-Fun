# seconds-of-fun

## Mid-project review
This project aims to provide seconds of fun, thus the name. To accomplish this and ensure everyone gets their seconds of fun, our aim is to incorporate both several different APIs, but also personal preferences for the site to maximize enjoyment.

So far, we have created the framework for the site, started on design as well as making sure some basics are working. One API is making a call to fetch a short joke, this is still however not displayed as text with promises as in our tutorials, but as a pop-up message. 

Plan to do:
Implement models.
Implement presenters. 
More api calls.
Add more functionality 
Improve designs/layout.

Wishlist:
Compatible with mobiles.

Assets:
   base.css/main.cssThey came with the template and are the base for what the app displays.

Components:
Icons: They are icons.
ActivityChooser.vue: This component contains buttons that lets someone navigate to a different view or get a joke. 
LandingPage.vue: This component contains what is show in the home view.
WelcomeItem.vue: This component is used to group (and styles) the icons and the buttons in ActivityChooser.vue.

Configs:
Firebase configuration.
jokeSource.js: Api calls.

Model:
Models are not currently used, placeholders for future models. 
firebaseModel.js will fetch the online data and sync it with the local model secondsModel.js

Presenters:
Presenters are currently not used, placeholder for future presenters when we have a model to talk to.

Router:
index.js: Initializes the routing of the different views. 

Views:
AnotherPage.vue: A different view, will have some functionality later on.
App.vue: Manages components and views. 

main.js: Creates the app.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
