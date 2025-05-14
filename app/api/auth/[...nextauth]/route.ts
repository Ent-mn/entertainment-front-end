import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/restaurant",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await axios.post("/api/api_open", {
            sn: "customer_login_google",
            email: user.email,
            name: user.name,
            image: user.image,
          });
        } catch (error) {
          console.error("Google хэрэглэгчийг бүртгэхэд алдаа:", error);
          return false;
        }
      }
      return true;
    },
  },
});

// ✅ зөвхөн GET, POST л экспортлох хэрэгтэй
export { handler as GET, handler as POST };
