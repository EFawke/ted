import express from 'express';
const googleRouter = express.Router();
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

googleRouter.post('/', async (req: any, res: any) => {
  try {
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Here you would typically:
    // 1. Check if user exists in your DB
    // 2. Create new user if doesn't exist
    // 3. Create session/JWT token
    // 4. Send back user data and token

    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    console.log('User:', user);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
});

module.exports = googleRouter;