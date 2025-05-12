import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/restaurant",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Called after successful sign-in, receives the user profile
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn callback - User:", user);
      console.log("signIn callback - Account:", account);
      console.log("signIn callback - Profile:", profile);
      console.log("signIn callback - Email:", email);
      return true; // Return true to allow sign-in
    },
    // Called when generating the JWT
    async jwt({ token, user, account, profile }) {
      console.log("jwt callback - Token:", token);
      console.log("jwt callback - User:", user);
      console.log("jwt callback - Account:", account);
      console.log("jwt callback - Profile:", profile);
      return token;
    },
    // Called when creating/updating the session
    async session({ session, token, user }) {
      console.log("session callback - Session:", session);
      console.log("session callback - Token:", token);
      console.log("session callback - User:", user);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
