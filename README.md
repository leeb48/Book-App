# The Book Keeper

[![Build Status](https://travis-ci.com/leeb48/Book-App.svg?branch=main)](https://travis-ci.com/leeb48/Book-App)

The Book Keeper is kind of a database application where users can create bookshelves to store their favorite books. Users can search through millions of books with the help of Google Books API.

## Demo

https://bookkeeper.bonglee.cloud/

## Build With

- Spring Boot
- React with TypeScript
- Docker
- Material UI
- Google Books API
- Nginx

## Development setup

#### Environment Variables

The following environment variables must be set in a .env file. Google and GitHub Oauth2 must be established to acquire ID and SECRET.

<a href="https://developers.google.com/identity/protocols/oauth2" target="_blank">Google Oauth 2 Instructions</a>

<a href="https://docs.github.com/en/developers/apps/authorizing-oauth-apps" target="_blank">GitHub Oauth 2 Instructions</a>

Please follow the instruction <a href="https://developers.google.com/books/docs/v1/using" target="_blank">here</a> to acquire the API_KEY for Google Books API.

```
JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

OAUTH2_REDIRECT_URL=

API_KEY=

```

Lastly the backend needs PostgreSQL running on docker on port 5432 as its database.

#### Using npm & docker-compose

There is a build.sh file that packages the maven project and builds the docker images for both client and server side. Run the below command.

```sh
./build.sh
```

After that the project should be running on http://localhost:3000.
