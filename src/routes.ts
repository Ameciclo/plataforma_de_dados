import { Router } from "express";
import CyclistCount from "./schemas/CyclistCount";

const router = Router();

router
  .route("/cyclist-count")
  .get(async (req, res) => {
    const cyclistCounts = await CyclistCount.find().select(
      "_id summary location name date"
    );
    return res.json(cyclistCounts);
  })
  .post(async (req, res) => {
    try {
      const cyclistCount = await CyclistCount.create(req.body);
      return res.json(cyclistCount);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
    }
  });

router.route("/cyclist-count/:id").get(async (req, res) => {
  try {
    const cyclistCount = await CyclistCount.findById(req.params.id);
    return res.json(cyclistCount);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

export default router;
