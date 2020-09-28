import { Router } from "express";
import * as cyclistCountController from "./controllers/CyclistCountController";

const router = Router();

router
  .route("/cyclist-count")
  .get(cyclistCountController.getCyclistCount)
  .post(cyclistCountController.postCyclistCount);

router
  .route("/cyclist-count/:id")
  .get(cyclistCountController.getCyclistCountById);

router.route("/").get(cyclistCountController.getCyclistCountMetadata);

export default router;
