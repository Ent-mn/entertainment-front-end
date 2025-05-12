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
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/restaurant",
  },
  debug: process.env.NODE_ENV === "development", // Enable debug only in development
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      console.log("signIn callback - User:", user);
      console.log("signIn callback - Account:", account);
      console.log("signIn callback - Profile:", profile);
      console.log("signIn callback - Email:", email);
      return true; // Allow sign-in
    },
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
    }) {
      console.log("jwt callback - Token:", token);
      console.log("jwt callback - User:", user);
      console.log("jwt callback - Account:", account);
      console.log("jwt callback - Profile:", profile);
      if (account) {
        token.accessToken = account.access_token; // Store access token
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      console.log("session callback - Session:", session);
      console.log("session callback - Token:", token);
      console.log("session callback - User:", user);
      // Add custom data to session
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
};

// Extend the Session type to include custom fields
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// Extend the JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
