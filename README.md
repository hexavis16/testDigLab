# testDigLab

Para el desarrollo de la aplicación fue utilizado JHipster en la versión 6.10.3

## Development

Para la ejecución del proyecto se debe realizar lo siguiente en el equipo:

1. [Node.js](V.11 o mayor): Instalar node y ejecutar el siguiente comando en la carpeta del proyecto:

```
npm install
```

2. [PostgreSQL](V.13 o mayor): Es utilizada como base de datos del proyecto. Se debe crear una base de datos vacia con el nombre "testDigLab" y esta es configurada automaticamente al momento de ejecutar los siguientes pasos.
   Se debe ajustar la URL, puerto, usuario y contraseña definido para la base de datos localmente o en el servidor en las etiquetas de datasource en las siguientes rutas:
   src\main\resources\config\application-dev.yml - Configuración para desarrollo
   src\main\resources\config\application-prod.yml - Configuración para producción

3. Desde una consola de comandos se debe ejecutar el siguiente comando para iniciar los servicios y configuración del proyecto en modo developer:

```
./mvnw
```

4. Abrir una nueva consola y ejecutar el siguiente comando para visualizar el front en tiempo real

```
npm start
```

### Dependencies

Las versiones de las dependencias usadas en el proyecto se encuentran en el archivo package.json

### Packaging as war

Para realizar el empaquetamiendo de la aplicación como war se debe ejeuctar lo siguiente:

```
./mvnw -Pprod,war clean verify
```

## Testing

Para ejecutar las pruebas unitarias creadas con protactor para el Front, se debe ejecutar el siguiente comando (Se debe tener activo el despliegue especificado en el punto 3 de la sección development):

```
npm run e2e
```
