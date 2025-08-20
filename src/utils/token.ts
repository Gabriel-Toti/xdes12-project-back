import jwt from 'jsonwebtoken'
export function getToken(user: { userId: string, userRole: number })
{
    return jwt.sign(
                { userId: user.userId, userRole: user.userRole },
                process.env.JWT_SECRET as string
            );
}