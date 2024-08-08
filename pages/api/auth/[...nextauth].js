import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prismadb";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/onboarding", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user.isAdmin = user.isAdmin;
      session.user.isPhotographer = user.isPhotographer;
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
