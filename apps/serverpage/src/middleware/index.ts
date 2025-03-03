// import { NextFunction, Request, Response } from "express";
// import cookieParser from "cookie-parser";
// import { admin } from "../config/firebase.js";

// export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const idToken = req.cookies.access_token;
    
//     if (!idToken) {
//         res.status(401).json({ message: "No token provided" });
//         return;
//     }

//     try {
//         const decodeToken = await admin.auth().verifyIdToken(idToken);
//         (req as any).user = decodeToken;
//         next();
//     } catch (error) {
//         res.status(403).json({ error: 'Unauthorized' });
//         return;
//     }
// }