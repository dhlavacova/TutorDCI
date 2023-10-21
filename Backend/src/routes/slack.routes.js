import Router from "express";
import { slackTutorCommunity,  slackToOnePerson} from "../controllers/slack.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/slackTutorCommutiny',auth,slackTutorCommunity)
router.get('/slackPrivat',slackToOnePerson)
export default router;