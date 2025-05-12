import NextAuth, {
  NextAuthOptions,
  Session,
  User,
  Account,
  Profile,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { JWT } from "next-auth/jwt";

// Environment variable validation
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

if (!FACEBOOK_CLIENT_ID || !FACEBOOK_CLIENT_SECRET) {
  throw new Error("Missing Facebook OAuth credentials");
}

if (!NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET");
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/restaurant",
  },
  debug: process.env.NODE_ENV === "development",
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn callback - Profile:", profile);
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.given_name = (profile as any).given_name;
        token.family_name = (profile as any).family_name;
        token.locale = (profile as any).locale;
        token.picture = (profile as any).picture;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.given_name = token.given_name;
      session.user.family_name = token.family_name;
      session.user.locale = token.locale;
      session.user.image = token.picture;
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      given_name?: string;
      family_name?: string;
      locale?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    given_name?: string;
    family_name?: string;
    locale?: string;
    picture?: string;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
