import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

/** @type {import("next-auth").NextAuthOptions} */
export const authOptions = {
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
          const res = await axios.post("/api/api_open", {
            sn: "customer_login_google",
            email: user.email,
            name: user.name,
            image: user.image,
          });

          if (res.data.status !== "success") {
            console.warn("⚠️ DB insert амжилтгүй:", res.data);
            // Хүсвэл энд return false хийж болно
          }
        } catch (error) {
          console.error("📛 Google DB insert алдаа:", error);
          // ✳️ Access Denied болохгүйн тулд true буцаана
        }
      }
      return true; // ☑️ бүх тохиолдолд login зөвшөөрөх
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
