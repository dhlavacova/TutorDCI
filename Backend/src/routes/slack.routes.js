import Router from "express";
import { slackTutorCommunity,  slackToOnePerson} from "../controllers/slack.controllers.js";
const router = Router();

router.post('/slackTutorCommutiny',slackTutorCommunity)
router.get('/slackPrivat',slackToOnePerson)
export default router;