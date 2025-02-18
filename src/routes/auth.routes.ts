import express from "express";
const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
        res.send("Auth Route Working");
});

export default router;
