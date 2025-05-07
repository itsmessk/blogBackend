import { Router } from 'express';
import {register, login} from "../controllers/auth.controller.js";

const authRouter = Router();


authRouter.post('/login', login);

authRouter.post('/logout', (req, res) => {
    res.send("Logged out");
})

authRouter.post('/register', register);

export default authRouter;
