## Initialisation du projet

- Création d'un nouveau repo git "graphql-articles"
- _git clone_
- `npm init -y`
- `package.json` => `"start": "nodemon --exec babel-node server/index.js"`
- `mkdir server`

## Installation des dépendences

- `npm i body-parser cors express express-graphql graphql graphql-tools graphql-yoga jsonwebtoken merge-graphql-schemas mongoose mongoose-unique-validator slug`

- `npm i -D @babel/cli @babel/core @babel/preset-env concurrently nodemon`

## Déclaration des _models_

Les _models_ sont les déclaration des schemas _mongo_

- Copier le dossier _models_ dans le dossier _server_

- Créer le _model_ "Comment" : 
  - body: String,
  - author: ref: 'User'
  - article: ref: 'Article'

## Déclaration de _graphql_

Le dossier graphql contient la configuration GraphQL : 
- _resolvers_ : contient les _queries_ et _mutations_ (https://graphql.org/learn/queries/)
- _types_ : contient les _schemas_ (https://graphql.org/learn/schema/)

- Copier le dossier _graphql_ dans le dossier _server_
- Créer les _resolvers_ et le _type_ pour le _model_ "Comment"

## Implémentation du serveur

```js
import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import User from "./models/User";
import Article from "./models/Article";
import Comment from "./models/Comment";
import schema from "../graphql";

const options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql",
  playground: "/playground"
};

const models = {
    Article,
    Comment,
    User
}

const context = {
  models,
};

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    'mongodb://localhost/conduit',
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = new GraphQLServer({
  schema,
  context
});

server.start(options, ({ port }) => {
  console.log(`🚀  Server is running on http://localhost:${port}`);
});
```

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