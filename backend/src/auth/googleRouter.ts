import express, { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const googleRouter = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyAdmin = (email: any) => {
  const admins = process.env.ADMINS?.split(',');
  return admins?.includes(email);
};

googleRouter.post('/', async (req: any, res: any) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Missing token' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const jwtToken = jwt.sign(
      { userId: payload.sub, email: payload.email, name: payload.name },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        isAdmin: verifyAdmin(payload.email)
      },
      token: jwtToken
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
});

export default googleRouter;