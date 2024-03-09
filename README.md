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

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Docker

inside docer folder run

> docker-compose up -d
> docker exec -it mongodb bash
> mongosh --username root --password root --authenticationDatabase admin
> show dbs
>
> in .env file add : DATABASE_URL=mongodb://rooot:root@localhost:27017/trimm?authSource=admin

https://www.youtube.com/watch?v=CQk9AOPh5pw

### TODO

- add lanes with short server functions

  - add lane :D
  - create form
  - reorder lanes
  - handle error on create
  - delete column

- docerize db
