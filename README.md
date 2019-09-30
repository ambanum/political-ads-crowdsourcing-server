Server allowing to get and annotate political ads

## API

GET /random?nb_ads
GET /annotations/:type?
GET /counts

## Run during developpement

```
NODE_ENV=development SALT=abc npm start
```

## Run in production

Create a file `srv/.env`:

```
SALT="abc"
```
