# Documentación de la API

## Visión general
Esta API proporciona puntos finales para interactuar con precios de criptomonedas y datos de usuarios.

## Requisitos
- Desarrollada utilizando la última versión de Express.
- Sigue las mejores prácticas de desarrollo.
- La API debe estar desplegada y funcionando correctamente para su evaluación.

## Puntos finales

1. **GET /coin/:coinName**
   - Descripción: Obtiene el precio de una criptomoneda utilizando su nombre de la API de CoinCap.
   - Parámetros:
     - `coinName`: Nombre de la criptomoneda.
   - Respuesta:
     - Éxito: Retorna el precio en USD de la criptomoneda especificada para el día actual.
     - Error: Retorna un mensaje indicando que el nombre de la moneda no se encontró en la base de datos.

2. **GET /users**
   - Descripción: Obtiene una lista de usuarios con ordenamiento y límite opcionales.
   - Parámetros:
     - `count` (opcional): Número de usuarios a retornar.
     - `sort` (opcional): Orden de clasificación (`ASC` o `DESC`) basado en el apellido del usuario.
   - Respuesta:
     - Éxito: Retorna una lista de usuarios ordenada y limitada según los parámetros.

3. **POST /users**
   - Descripción: Simula la creación de un nuevo usuario.
   - Parámetros:
     - `nombre`: Nombre del usuario.
     - `apellido`: Apellido del usuario.
     - `correo`: Correo electrónico del usuario.
     - `ciudad` (opcional): Ciudad de residencia (por defecto: Bogotá).
     - `país` (opcional): País de residencia (por defecto: Colombia).
   - Respuesta:
     - Éxito: Retorna la información del usuario recién creado.

## Suite de Pruebas Técnicas

1. **Obtener Precio de Moneda Válida**
   - Método: GET
   - URL: `http://localhost:3000/coin/bitcoin`
   - Resultado Esperado: Recuperación exitosa del precio de Bitcoin en USD.
   - Estado: ÉXITO

2. **Obtener Precio de Moneda Inválida**
   - Método: GET
   - URL: `http://localhost:3000/coin/invalidcoin`
   - Resultado Esperado: Mensaje de error indicando un nombre de moneda inválido.
   - Estado: ÉXITO

3. **Obtener Lista de Usuarios Ascendente por Apellido**
   - Método: GET
   - URL: `http://localhost:3000/users?sort=ASC`
   - Resultado Esperado: Lista de usuarios ordenada ascendentemente por apellido.
   - Estado: ÉXITO

4. **Obtener Lista de Usuarios Descendente por Apellido**
   - Método: GET
   - URL: `http://localhost:3000/users?sort=DESC`
   - Resultado Esperado: Lista de usuarios ordenada descendentemente por apellido.
   - Estado: ÉXITO

5. **Obtener Lista de Usuarios Limitada**
   - Método: GET
   - URL: `http://localhost:3000/users?count=2`
   - Resultado Esperado: Lista de solo dos usuarios.
   - Estado: ÉXITO

6. **Crear Usuario con Todos los Campos**
   - Método: POST
   - URL: `http://localhost:3000/users`
   - Cuerpo (JSON sin formato):
     ```json
     {
         "nombre": "John",
         "apellido": "Doe",
         "correo": "john.doe@example.com",
         "ciudad": "Nueva York",
         "país": "Estados Unidos"
     }
     ```
   - Resultado Esperado: Creación exitosa de un usuario con los detalles proporcionados.
   - Estado: ÉXITO

7. **Crear Usuario Sin Especificar Ciudad y País**
   - Método: POST
   - URL: `http://localhost:3000/users`
   - Cuerpo (JSON sin formato):
     ```json
     {
         "nombre": "Jane",
         "apellido": "Smith",
         "correo": "jane.smith@example.com"
     }
     ```
   - Resultado Esperado: Creación exitosa de un usuario con ciudad y país predeterminados.
   - Estado: ÉXITO

## Información de Autenticación y Despliegue

- **Token de Autorización (Postman)**: `Bearer Token: Avb9PzrbVvmKO3elKOke3TeS`
- **Enlace de Implementación**: [https://parcialsegundo.vercel.app/](https://parcialsegundo.vercel.app/)
