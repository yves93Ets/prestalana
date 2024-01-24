This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Prestalana

### Technologias

- nextjs 14 -> a notar que hace un tiempo que no lo usaba y a cambiado bastante
- mongodb
- prisma
- redux
- tailwind
- boostrap.react
- typescript
- Y varias librerias como la de dnd

## paginas

- / => Dashboard donde vemos el dnd
- /item/create => Agregar alguna tarea en el estado que sea
- /auth => Conectarse,
  - si estoy conectado me redirge a /
  - si no estoy conectado me redirige a esta pagina

## features

### Conectarse y crear un usuario

- crear cuenta y conexion con enlace magico
- connexion con otros proveedores, en este caso google
  - no funcionara, ya que yo necesito agregarlos a la lista de usuarios que pueden usar este servicio de google
  - si quieren probarlo mandenme los correos

### Crear un par de formularios con validacion de formik

- la validacion es minima pero tengo

### dnd

Se pueden mover los elementos en una misma columna o de una columna a la otra
En los dos casos es doble sentido

### Uso de una base de datos nosql

- la base de datos es mongodb
- uso de prisma un orm agnistco del tipo de bd
- se pueden hacer todos los tipos de crud pero no implemente el delete

### en un mundo ideal tambien hubiera agregado pruebas (test)

- Algunas pruebas simples de las funciones que llevan cierta logica
- TODO de ui

## Estructura

segui las estructura de next.js
cree un folder lib
folders

- utils lo mismo que lib pero mas simple
- lib para todo lo que no tiene que ver con conponentes.
- interfaces donde estan las interfaces
- app/componentes components mas grandes y unicos
- app/componentes/common los componentes comunes a reutilzar
- hooks donde puse los hooks personalizados que solo es useColumns, lo uso para facilitar y centralizar el uso de redux

## css

Le di menos importancia al css mantuve una cierta logica donde cree clases para reutilzar y mantener un UI consistente.

## Responsive

- TODO

## Redux

Utilso rtk y thunk para hacer llamadas del api a traves de un midleware
solo ahy un elemento que llame columnas, al entrar al dashboard voy a buscar las tareas y los estados. A partir de eso creo el objeto Columna que tiene todo la informacion normalizada para un acceso mas eficaz.
No implemente nada para los error ol estado de espera (loading) pero se puede hacer.

Como la demanda era abierta y sin muchos detallas puede ser complicado saber que quieren exactamente. Trate de hacer un poco de todo sin necesariamente hacerlo al 100 ya que no tenia mucho tiempo y tampoco queria invertir tanto tiempo en este proyecto.

# Usar localmente

- npm i para instalar las dependecias
- agregar el .env y llenarla las zonas vacias
- lanzar la comanda ~npm prisma generate
  - esto va generar un mapping con los modelos de db, si no lo hace prisma no los va a detectear
- npm run dev
- poner un email checar el link que aveces llega a los spam
- jugar en el dnd
- con el boton add se pueden agregar tareas,
  - en esta pagina se valida que la tarea no este vacia y que el estado sea uno de los 4 de forma dynamica, es decir que podemos agregar mas y seguira funcionando.
  - regresar despues de haber agregado la tarea y notaran que estara en la lista. Se agrega al store de redux
- ultima cosa es desconectarse
