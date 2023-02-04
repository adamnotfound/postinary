# POSTINARY

Postinary is an imaginary social network blog where you can share your thoughts and ideas with other people around the globe.

**Live Preview**: [Try POSTINARY now!](https://postinary.adamnotfound.com)

---

### Prerequisites

:ballot_box_with_check: **NPM** [ currently using v6.14.16 ] <br/>
:ballot_box_with_check: **Node** [ currently using v14.19 ] <br/>
:ballot_box_with_check: **Docker** <br/>
:ballot_box_with_check: **Docker-compose** <br/>

### Installation

1. Install Dependencies

```bash
# Installing NestJS dependencies
$ npm install

# Installing React dependencies
$ npm install --prefix client
```

2. Make sure environment variables are set correctly in /.env and /client/.env

_Correct environment variables are already included in this project for DevBros, you may change them if you would like to use your own database/graphql endpoint_

### Developer Mode

```bash
# NestJS Development Mode
$ npm run start:dev

# React Development Mode
$ npm run frontend
# SASS Watch Mode
$ sass --watch src/assets/scss/style.scss src/index.css --style compressed
```

### Deploying the app

```bash
# Builds the docker image
$ docker-compose build

# Starts the container
$ docker-compose up

# Starts the container in the background
$ docker-compose up -d
```

### Story

1. Created a Linux Server VPS for database and app hosting.
2. Created a subdomain for the new app to link it to the VPS.
3. Installed required packages on the VPS like NGINX, Docker, Docker-compose
4. Created a PostgreSQL database on the VPS using docker-compose.
5. Cloned the Git repo on the VPS and started the container.
6. Configured NGINX for desired port for POSTINARY and created a LetsEncrypt certificate for it.

### Client Feedback

- You have not used Sass but solely CSS.
  - Changed all styles to use SASS instead.
- You have not used flex or grid for the layout.
  - Modified Navbar to use Flex properly.
  - Removed React-masonry package.
  - Added Grid for Posts Layout.
  - Added Flex to all other components.
  - Restructured client-side project files.