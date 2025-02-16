import { Router } from 'express';
import { auth } from '../config/firebase.js'
import { signInWithEmailAndPassword } from "firebase/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to user authentication
 * 
 * /auth:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate a user with email and password
 *     description: This endpoint authenticates a user with their email and password and returns a Firebase ID token (JWT) upon success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Authentication successful, returns a Firebase token and user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 *                 token:
 *                   type: string
 *                   description: Firebase ID token (JWT)
 *                   example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4YzE3ZTg5ZWE5YTg2MzVhYTcxZTgwNDE0NTFiNjYzNmExZDFhMGQ5MmQ5ZjYxYTI1ZjA4YmM4Y2QwNTQxYmM5YjM1ZTY4NjNlZjNlZTI5NzNmM2YzNjEzYzlkNmJmM2ExZTg3ZTJlYzFiMjYxNzgxNjU0ZTJkNjcyYzBhZjQ1ZmY4ZmU0ZTUzZDZiNzZjMTMwZDgxNjI5OjoD4QO7tChRkzE_50ZxnbCQ7A3Iq2XE"
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: "123456789"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Invalid payload or authentication failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid payload"
 *                 message:
 *                   type: string
 *                   example: "Email and password are required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong"
 *                 message:
 *                   type: string
 *                   example: "An unknown error occurred during authentication."
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate a user using email and password
 *     description: Sign in a user with their email and password and return a Firebase ID token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "supersecurepassword"
 *     responses:
 *       200:
 *         description: Authentication successful, returns the user details and token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 *                 token:
 *                   type: string
 *                   description: The Firebase ID token (JWT) for the authenticated user
 *                   example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IkZfY1ltb..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: "1234567890"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Invalid payload or incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid payload"
 *                 message:
 *                   type: string
 *                   example: "Email and password are required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong"
 *                 message:
 *                   type: string
 *                   example: "An unknown error occurred during authentication."
 */
router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        error: "Invalid payload",
        message: "Email and password are required."
      });
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
  
      // Respond with status 200 and the token
      return res.status(200).json({
        message: "Authentication successful",
        token, // Firebase ID token (JWT)
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        },
      });
    } catch (error) {
        // Handle errors that occur during sign-in
        if (error.code === 'auth/invalid-credential') {
            return res.status(400).json({
                error: "Authentication failed",
                message: "Invalid payload.",
            });
        }  else {
            // For other errors, respond with 500 (internal server error)
            return res.status(500).json({
                error: "Something went wrong",
                message: error.message || "An unknown error occurred during authentication.",
            });
        }
    }
});
  
  export default router;
