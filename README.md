# Mutant API
REST API encargada de analizar cadenas de ADN y determinar si es un mutante o humano. Ejercicio práctico de ingreso para Mercado Libre.

## Tecnologías
Esta API está construida con el framework `Express Js` sobre `Node Js 14.17.0` .

## Comenzando 🚀

_Instrucciones para obtener una copia del proyecto en funcionamiento en una máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Cosas necesarias para instalar el software y como instalarlas_

```
Docker y Docker Compose en sus últimas versiones
```

### Variables de entorno 🔧

_Las variables de entorno versionadas son las necesarias para ejecutar el proyecto en Docker y no requieren modificación. Si se desea ejecutarlo en un computador local con node y postgres instalado se deben configurar los siguientes parámetros:_

_Parámetros de la API_

```
DB_USER=[Usuario postgres]
DB_PASSWORD=[Contraseña postgres]
DB_HOST=[Host de la base de datos]
DB_PORT=[Puerto de la base de datos]
SOURCE_DATABASE=[Nombre de la base de datos]
PORT=[Puerto del API]
```

### Instalación 👷

_Construir la imagen de Docker Compose_

```
docker-compose build
```

_Subir el Docker Compose_

```
docker-compose up
```

_El servidor se ejecuta en el puerto seleccionado en la varible de entorno PORT http://localhost:3015/_

### Pruebas 🔍

_Las pruebas se ejecutan de forma automática al ejecutar el Docker compose. Al finalizar, se generan reportes en html los cuales pueden ser visualizados desde un navegador como se muestra en la imagen._

![Pruebas unitarias](https://i.imgur.com/e9ZwnEH.png)

_Se pueden visualizar algunas métricas en SonarCloud en la siguiente URL._
_https://sonarcloud.io/dashboard?id=Miavega_api_mutants_mercado_libre_

### Visualización 👀

_El API REST expone dos endpoints, /mutan de tipo POST para validar las cadenas de ADN, y otro /stats de tipo GET para obtener las estadísticas de las cadenas analizadas y almacenadas en la base de datos. Cada uno de estos endpoints son accesibles a través del servidor y puerto por el cual se expone el API, por ejemplo:_

```
http://localhost:3015/mutant
http://localhost:3015/stats
```

_Además, se expone un Swagger para la documentación de los servicios. Este puede ser consultado en la siguiente dirección._

```
http://localhost:3015/api-docs/
```
_Se observará un contenido de la siguiente manera:_

![Swagger](https://i.imgur.com/K6UBhQK.png)


## Construido con 🛠️

_Herramientas_

* [NodeJs](https://nodejs.org/es/) - Entorno de ejecución para JavaScript 
* [Express](https://expressjs.com/es/) - Framework de código abierto para construir aplicaciones empleando NodeJs
* [PostgreSQL](https://www.postgresql.org/) - Base de datos relacional orientada a objetos y de código abierto
* [Docker](https://www.docker.com/) - Proyecto de código abierto para la automatización de despliegue de aplicaciones por medio de contenedores
* [Docker compose](https://docs.docker.com/compose/) - Herramienta para definir y ejecutar aplicaciones Docker multicontenedor

## Autor ✒️

* Daniel Esteban Ladino Torres - [Dladinot](https://github.com/dladinot)