// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     sendEmailVerification,
//     sendPasswordResetEmail,
//     auth
// } from '../config/firebase.js';
// import { Request, Response } from 'express';
// import prisma from '@repo/db/client';
// import bcrypt from 'bcrypt';
// import {UserSchema} from '@repo/zod';

// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//     const validation = UserSchema.safeParse(req.body);

//     if (!validation.success) {
//         res.status(400).json({ 
//             message: "Validation failed", 
//             errors: validation.error.errors 
//         });
//         return;
//     }

//     const { email, password } = validation.data;
//     let userCredential;
    
//     try {
//         // Test database connection first
//         try {
//             await prisma.$connect();
//         } catch (dbError) {
//             console.error('Database connection error:', dbError);
//             res.status(500).json({ message: "Database connection failed" });
//             return;
//         }

//         // Check if email already exists in the database
//         const existingUser = await prisma.user.findUnique({
//             where: { email }
//         });

//         if (existingUser) {
//             res.status(400).json({ message: "Email is already registered. Try logging in." });
//             return;
//         }

//         // Create the Firebase user
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Hash the password before saving to the database
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const database = await prisma.user.create({
//             data: {
//                 firbaseUid: user.uid, 
//                 email: user.email ?? '',
//                 password: hashedPassword
//             }
//         });

//         // Get ID token from the newly created user credential
//         const token = await userCredential.user.getIdToken();

//         // Set the token as an HTTP-only cookie
//         res.cookie('access_token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             maxAge: 3600000 // 1 hour
//         });

//         res.json({ 
//             message: "User Created Successfully", 
//             id: database.id, 
//             email: database.email,
//             user: {
//                 uid: user.uid,
//                 email: user.email
//             }
//         });

//     } catch (error: any) {
//         console.error('Registration error:', error);
//         if (userCredential?.user) {
//             await userCredential.user.delete();
//         }
//         if (error.code === 'auth/email-already-in-use') {
//             res.status(400).json({ message: "Email is already registered. Try logging in." });
//         } else {
//             console.log(error)
//             res.status(500).json({ message: "Internal server error", error });
//         }
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// export const loginUser = async (req: Request, res: Response) => {
//     const validation = UserSchema.safeParse(req.body)
//     if(!validation.success){
//         res.json({message: "Validation Failed"})
//         return;
//     }
//     const { email, password } = validation.data;
    

//     if (!email || !password) {
//         res.status(400).json({ message: "Please fill the mandatory details" });
//     }

//     try {
//         await prisma.$connect();
//         const existingUser =  await prisma.user.findUnique({
//             where: {email}
//         })
//         if(!existingUser){
//             res.json({message: "please signup"})
//             return;
//         }
//         const comapre = await bcrypt.compare(password , existingUser.password )
//         if(!comapre){
//             res.json({message: "wrong password"})
//             return;
//         }
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         const token = await user.getIdToken();
        
//         // Set the token as an HTTP-only cookie
//         res.cookie('access_token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             maxAge: 3600000 // 1 hour
//         });

//         res.json({
//             message: "LoggedIn Successfully",
//             user: {
//                 uid: user.uid,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({
//             message: "Internal server error"
//         });
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// export const logOutUser = async (req: Request, res: Response) => {
//     try {
//         await signOut(auth);
//         res.clearCookie('access_token');
//         res.status(200).json({ message: "User Logout successfully" });
//     } catch (error) {
//         res.status(404).json({ message: "Unable to logout" });
//     }
// }