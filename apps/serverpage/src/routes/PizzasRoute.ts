import { Router } from "express";
import { getPizzas, getPizzaById, getPizzasByTag, getPizzaByTagAndId } from "../controllers/PizzasController.js";
// import { loginUser, logOutUser, registerUser } from "../controllers/firebase-authController.js";
// import { order } from "../controllers/order.js";
// import { verifyToken } from "../middleware/index.js";
// import asyncHandler from "express-async-handler";

const router: Router = Router();

router.get("/pizzas/tag/:tag", getPizzasByTag);
router.get("/pizzas/tag/:tag/:id", getPizzaByTagAndId);
router.get("/pizzas/:id", getPizzaById);
router.get("/pizzas", getPizzas);

// // signin user
// router.post("/signup", asyncHandler(registerUser));
// router.post("/login", loginUser);
// router.post("/logout", logOutUser)

//orders
// router.post("/orders", verifyToken, order)

export default router;
