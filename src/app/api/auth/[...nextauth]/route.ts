import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            email:credentials?.email,
            password:credentials?.password,
          })
        });
        const user = await res.json();
        if(!res.ok) return null;
        return{
          id:user.id,
          email:user.email
        }

      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
