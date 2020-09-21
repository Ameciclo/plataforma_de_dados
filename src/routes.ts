import { Router } from "express"
import CyclistCount from "./schemas/CyclistCount";

const router = Router()

router.route("/cyclistCount")
    .get(async (req, res) => {
        const cyclistCounts = await CyclistCount.find()
        return res.json(cyclistCounts )
    })
    .post(async (req, res) => {
        try {
            const cyclistCount = await CyclistCount.create(req.body)
            return res.json(cyclistCount)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    })

export default router

