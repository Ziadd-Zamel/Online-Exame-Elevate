import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { LoginResponse } from "./lib/types/auth";
import { AuthenticationError } from "./lib/utils/app-errors";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        if ("code" in payload) {
          console.log(payload);
          throw new AuthenticationError(payload.message);
        }

        return {
          id: payload.user._id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
