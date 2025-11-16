import jwt from 'jsonwebtoken'
export function getToken(user: { userId: string })
{
    return jwt.sign(
                { userId: user.userId },
                process.env.JWT_SECRET as string
            );
}