import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  //   pages: {
  //     signIn: "/signin",
  //   },
  //   session: {
  //     strategy: "jwt",
  //   },
  //   jwt: {
  //     secret: process.env.NEXTAUTH_JWT_SECRET,
  //   },
  //   secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (!profile?.email) {
  //       throw new Error("No profile");
  //     }

  //     await prisma.user.upsert({
  //       where: {
  //         email: profile.email,
  //       },
  //       create: {
  //         email: profile.email,
  //         name: profile.name,
  //       },
  //       update: {
  //         name: profile.name,
  //       },
  //     });

  //     return true;
  //   },

  //   session,
  //   async jwt({ token, user, account, profile }) {
  //     if (profile) {
  //       const user = await prisma.user.findUnique({
  //         where: {
  //           email: profile.email,
  //         },
  //       });
  //       if (!user) {
  //         throw new Error("No user found");
  //       }
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  // },
} satisfies NextAuthOptions;
