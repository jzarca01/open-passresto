# Open PassResto

> Une implémentation Progressive Webapp de l'app Pass Restaurant de Sodexo en VueJS utilisant la librairie [sodexo-api](https://github.com/jzarca01/sodexo-api)

Pour le moment les CORS ne marchent pas correctement, alors il faudra lancer Chrome avec les flags --disable-web-security --user-data-dir

Il faudra également créer le fichier config.json dans le répertoire node_modules/sodexo-api/ tant que la librairie ne sera pas mise à jour pour instancier la config de manière plus accessible

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

