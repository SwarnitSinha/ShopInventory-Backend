import express, {Request,Response} from "express";
import { 
        userLogin, 
        getCurrentUser, 
        shopRegister, 
        logoutUser,
        sendOtp,
        verifyOtp
} from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
        res.send("Auth Route Working");
});

router.post("/login", userLogin);
router.post("/register", shopRegister);
router.post("/logout",authenticateUser, logoutUser);
router.get("/user", authenticateUser, getCurrentUser); // Protected Route
router.get("/me", authenticateUser, getCurrentUser);
router.post("/otp/send",sendOtp);
router.post("/otp/verify",verifyOtp);
export default router;
