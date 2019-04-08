# Dx Dinner

A demo application showcasing a simple food ordering system for a fictional restaurant startup.

This app is publicly available at [https://dx-dinner.herokuapp.com/](https://dx-dinner.herokuapp.com).

<br>

## Running

Before run the application, please make sure you have [Node.js 11+](https://nodejs.org) installed on your machine.

After that, on the project folder, install its dependencies by running:

```text
$ npm install
```

### API

To run the API _(Backend)_, on the project root folder, run:

```text
$ npm run api-start
```

The server will start on the port configured in the `.env` file.

### Frontend

To build the web client _(Frontend)_, on the project root folder, run:

```text
$ npm run app-build
```

The artifacts will be bundled into the `/output/parcel-build` folder.

<br>

## Tests

To run the test suite located in the `/tests` folder, run:

```text
$ npm run api-test
```

This covers simple business logic of the application.

Also, you can check the tests history on the [Travis CI project](https://travis-ci.org/Potentii/Dx-Dinner).

<br>

## Project

Given the scope of the project: "A simple food ordering system for a startup", I tried to imagine what might be the scenarios, or the use cases that this can led, and I come to the idea that this app could be used as either:

- A **kiosk application** that customers of a restaurant may use in their table to order food, instead of having to wait for a waitress, for example;

- A **food delivery app** that customers of a fast-food chain for example, can use to order food from home;

For sake of simplicity, I choose to stick with the first one for now.

### Challenges

For this project, I put to myself **three main challenges** besides the original scope: 

- The timebox to complete it _(only a few days)_;

- Implement a promotion system that could be as generic as possible;

- Build a richer user experience;

### Code

The app follows most of the `MVVM pattern` constraints, and has an frontend that is basically a client of a `REST API` exposed by the backend code.

The main code is divided into three directories, each one having its role:

- `/app`: The frontend stuff. Basically only `.vue` files and VOs for displaying data with little or no business related logic.

- `/api`: The server side. All the business logic and access to persistence _(in-memory for now)_, as well as a REST API to expose the main system's functionality.

- `/infra`: Low-level-ish code. All the application's utils and components not related with the domain.

Since the app's logic is **100% JavaScript**, both frontend and backend can **share some of their code** between each other. In other projects I usually would have a fourth directory for this, called `/shared`, that will have all the domain code _(mainly entities)_ that can be shared and extended between the two facets of the system. 

In this case both frontend and backend code will have to extend the shared classes, giving their own implementation. But for this project I decided to make a test to see if it works too, so the entities will be in the backend, and only the frontend will extend them.

You can see this code sharing in action if you open a VO on the frontend, and realize that it **extends** a class from the backend, in most cases with same methods name, but with different implementation, as it may seem be obvious that a client does things differently from the server, for example:

- Let's imagine we have a shared entity called `Order` that has a method `addItem`.

- In the backend code, the entity would override the method **calling a database** to persist the item.

- But in the frontend code, the entity actually would **call an API endpoint** instead, that will eventually persist this item somehow.

### Design

As the system was intended to be used as a **kiosk application**, all the elements on the screen tries to mimic objects and symbols found on a restaurant _(a menu, a receipt, etc)_ to create a **visual affordance** with the environment and hopefully **to ease the user experience**.



















