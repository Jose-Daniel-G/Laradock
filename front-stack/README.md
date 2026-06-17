npm install -g @angular/cli
ng new front-stack
ng g s services/task
ng g environments

Guarda estos tres archivos en tu proyecto de Angular

Dockerfile
.dockerignore
nginx.conf

docker build -t front-stack-app .
docker run -d -p 4200:80 --name angular-frontend front-stack-app


docker stop angular-frontend
docker ps     //cómo se llama un contenedor o quieres ver cuáles están encendidos en este momento, ejecuta










# FrontStack

This project was generated using version 22.0.2. 

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
