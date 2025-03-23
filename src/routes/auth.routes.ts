import express, {Request,Response} from "express";
import { userLogin, getCurrentUser, userRegister, logoutUser } from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
        res.send("Auth Route Working");
});

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/logout", logoutUser);
router.get("/user", authenticateUser, getCurrentUser); // Protected Route
router.get("/me", authenticateUser, getCurrentUser);

export default router;
