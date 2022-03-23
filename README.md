# Kiwibot Technical Test API (Express / TypeScript / Firebase / JEST)

![Kiwibot Logo](https://global-uploads.webflow.com/5ddc307f68536f623db8c772/60b93129188d32f49610b1a1_Kiwibot%20for%20business.svg)

### Running in Heroku

[https://kiwibot-test.herokuapp.com/](https://kiwibot-test.herokuapp.com/)

### Frontend Repo

[React TypeScript Tailwind ](https://github.com/xamir-rojas/kiwi-front)

### API URL

[API Firebase endopoint ](https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/deliveries/)

# Using:

- TypeScript
- Express
- Jest / supertest
- faker.js
- firebase

# Instructions:

### Install Firebase Tools (CLI)

```sh
sudo npm i -g firebase-tools
```

### Fire base Log in

```sh
sudo firebase login
```

### Init Firebase Project and configure it

```sh
sudo firebase init functions
```

- Functions Project
- Using existing project
- TypeScript

### Running the project

```sh
sudo firebase serve
```

# Endpoints:

## Deliveries

### GET ALL

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/deliveries/
```

### GET by ID

### POST

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/deliveries/
```

**body**

```jsx
{
    "state": "pending",
    "pickup": {
        "pickup_lat": -30.10775,
        "pickup_lon": 87.14883
    },
    "dropoff": {
        "dropoff_lat": 24.53724,
        "dropoff_lon": -173.73090
    },
    "zone_id": "9c6fb628-a9f5-11ec-b909-0242ac120002"
}
```

### PATCH by ID

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/deliveries/JEuKNi53cd4VieWtD0iY
```

**body**

```jsx
{
    "state": "busy"
}
```

## Bots

### GET ALL

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/bots/
```

### GET by ID

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/bots/JEuKNi53cd4VieWtD0iY
```

### POST

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/bots/
```

**body**

```jsx
{
    "status": "available",
    "location": {
        "dropoff_lat": 45.53724,
        "dropoff_lon": 193.73090
    },
    "zone_id": "9c6fb628-a9f5-11ec-b909-0242ac120002"
}
```

### PATCH by ID

```jsx
https://us-central1-kiwi-api-327d0.cloudfunctions.net/kiwiFunctions/api/v1/bots/JEuKNi53cd4VieWtD0iY
```

**body**

```jsx
{
    "status": "busy"
}
```
