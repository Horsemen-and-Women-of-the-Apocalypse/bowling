# bowling

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Run docker image

A docker image is attached to each release, so you can run a self-hosted version of the application. First you have to download
the docker image, and install docker.

#### Load docker image

```
docker load < bowling_docker_img.tar
```

#### Run docker image

```
docker run -p ${HOST_PORT}:80 -it bowling_docker_img
```

N.B: Don't forget to change `${HOST_PORT}` by the port you want to expose for this application on your computer
