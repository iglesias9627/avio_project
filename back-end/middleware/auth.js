import { admin } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";

// Middleware to verify the Firebase ID token
export const verifyToken = async (req, res, next) => {
  // Get the token from the Authorization header (Bearer token)
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      error: "Access denied",
      message: "No token provided. You must be logged in.",
    });
  }

  try {
    const decodedUser = await getAuth().verifyIdToken(token);
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
      message: "The token is invalid or has expired.",
    });
  }
};

