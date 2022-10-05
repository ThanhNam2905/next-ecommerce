import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import User from '../../../models/UserModel';
import db from '../../../utils/database';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user}) {
            if(user?._id) token._id = user._id;
            if(user?.isAdmin) token.isAdmin = user.isAdmin;
            return token; 
        },
        async session({ session, token}) {
            if(token?._id) session._id = token._id;
            if(token?.isAdmin) session.isAdmin = token.isAdmin;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email
                });
                await db.disconnect();
                // Check user fill in email and password match on DB.
                if(user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                }
                throw new Error('Email và mật khẩu của bạn không trùng khớp!!!');
            }
        })
    ]

})