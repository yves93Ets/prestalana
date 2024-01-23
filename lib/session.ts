import { NextAuthOptions, User, getServerSession } from "next-auth";

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const getUserSession = async (
  authOptions: NextAuthOptions
): Promise<any> => {
  const authUserSession = await getServerSession(authOptions);
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user;
};
