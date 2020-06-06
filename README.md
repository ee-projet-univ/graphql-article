## Initialisation du projet

- Création d'un nouveau repo git "graphql-articles", dans ce dossier :
- _git clone_
- `npm init -y`
- `package.json` => `"start": "nodemon --exec babel-node server/index.js"`
- `mkdir server`

## Installation des dépendences

- `npm i body-parser cors express express-graphql graphql graphql-tools graphql-yoga jsonwebtoken merge-graphql-schemas mongoose mongoose-unique-validator slug`

- `npm i -D @babel/cli @babel/core @babel/preset-env @babel/node concurrently nodemon`

## Configuration babel

Créer le fichier `.babelrc`

```
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

## Déclaration des _models_

Les _models_ sont les déclaration des schemas _mongo_

- Copier le dossier _models_ dans le dossier _server_

## Déclaration de _graphql_

Le dossier graphql contient la configuration GraphQL :

- _resolvers_ : contient les _queries_ et _mutations_ (https://graphql.org/learn/queries/)
- _types_ : contient les _schemas_ (https://graphql.org/learn/schema/)

- Copier le dossier _graphql_ dans le dossier _server_
- Créer les _resolvers_ et le _type_ pour le _model_ "Comment"

## Implémentation du serveur

- Copier le fichier `index.js` dans le dossier _server_

## Test du serveur :

- `npm start`
- http://localhost:4000/playground

### Créer un utilisateur

```js
mutation {
  createUser(user: { username: "testuser", email: "test@tesl.com", password: "TestPassword"}) {
    username
    email
  }
}
```

### Récupérer la liste des utilisateurs

```js
query {
  users {
    _id
    username
    email
  }
}
```

### Créer un article

### Créer un commentaire

### Récupérer la liste des articles et leur commentaire

### Récupérer les trois permiers articles par date de création

(Help: https://mongoosejs.com/docs/queries.html)

### Implémenter une query permettant d'effectuer une recherche sur le body d'un article et le body d'un commentaire

(Help : https://graphql.org/learn/schema/#union-types)
