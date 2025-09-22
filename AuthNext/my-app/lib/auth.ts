import jwt from 'jsonwebtoken';

export const signToken = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1hr" });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        return null;
    }
}