import { Request, Response } from "express";
import CyclistCount from "../schemas/CyclistCount";

export const getCyclistCount = async (req: Request, res: Response) => {
  const cyclistCounts = await CyclistCount.find().select(
    "_id summary location name date"
  );
  return res.json(cyclistCounts);
};

export const getCyclistCountById = async (req: Request, res: Response) => {
  try {
    if (req.query.q) {
      const cyclistCount = await CyclistCount.find({
        $text: { $search: req.query.q as string },
      });
      return res.json(cyclistCount);
    }

    const cyclistCount = await CyclistCount.findById(req.params.id);
    return res.json(cyclistCount);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};

export const postCyclistCount = async (req: Request, res: Response) => {
  try {
    const cyclistCount = await CyclistCount.create(req.body);
    return res.json(cyclistCount);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

export const getCyclistCountMetadata = async (req: Request, res: Response) => {
  try {
    //TODO: Create aggregate for percentiles and distinct count
    const totalSummary = await CyclistCount.aggregate([
      {
        $group: {
          _id: null,
          numberOfCounts: { $sum: 1 },
          latestCount: { $last: "$date" },
          totalAmount: { $sum: "$summary.total" },
          MaximumValue: { $max: "$summary.total" },
          MinimumValue: { $min: "$summary.total" },
          MaximumHourValue: { $max: "$summary.hour_max" },
          AverageValue: { $avg: "$summary.total" },
        },
      },
    ]);
    res.json(totalSummary);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};
