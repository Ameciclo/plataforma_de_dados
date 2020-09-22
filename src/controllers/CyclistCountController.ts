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
    const numberOfDistinctCounts = await CyclistCount.distinct("name");
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
    console.log(totalSummary);
    console.log(numberOfDistinctCounts);
    res.json(totalSummary);
    // const nCountWomen = await CyclistCount.aggregate([
    //   {
    //     $project: {
    //       hour: {
    //         $objectToArray: "$data.qualitative.women.count_per_hour",
    //       },
    //     },
    //   },
    //   { $unwind: "$hour" },
    //   {
    //     $group: {
    //       _id: 1,
    //       count: { $sum: "$hour.v" },
    //     },
    //   },
    // ]);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};
