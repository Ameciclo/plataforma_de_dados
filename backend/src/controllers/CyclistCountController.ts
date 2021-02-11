import { Request, Response } from "express";
import CyclistCount from "../schemas/CyclistCount";

export const getCyclistCount = async (req: Request, res: Response) => {
  try {
    if (req.query.q) {
      const cyclistCount = await CyclistCount.find({
        $text: { $search: req.query.q as string },
      }).select("_id summary location name date");
      return res.json(cyclistCount);
    }
    const cyclistCounts = await CyclistCount.find().select(
      "_id summary location name date"
    );
    return res.json(cyclistCounts);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
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
    const totalSummary = await CyclistCount.aggregate([
      {
        $project: {
          _id: 0,
          date: "$date",
          total: "$summary.total",
          hour_max: "$summary.hour_max",
          totalWomen: {
            $multiply: ["$summary.total", "$summary.women_percent"],
          },
          totalChildren: {
            $multiply: ["$summary.total", "$summary.children_percent"],
          },
          totalHelmet: {
            $multiply: ["$summary.total", "$summary.helmet_percent"],
          },
          totalCargo: {
            $multiply: ["$summary.total", "$summary.cargo_percent"],
          },
          totalSharing: {
            $multiply: ["$summary.total", "$summary.sharing_percent"],
          },
          totalService: {
            $multiply: ["$summary.total", "$summary.service_percent"],
          },
          totalWrongWay: {
            $multiply: ["$summary.total", "$summary.wrong_way_percent"],
          },
          totalSidewalk: {
            $multiply: ["$summary.total", "$summary.sidewalk_percent"],
          },
        },
      },
      {
        $group: {
          _id: 0,
          numberOfCounts: { $sum: 1 },
          latestCount: { $last: "$date" },
          totalAmount: { $sum: "$total" },
          totalWomen: {
            $sum: "$totalWomen",
          },
          totalChildren: {
            $sum: "$totalChildren",
          },
          totalHelmet: {
            $sum: "$totalHelmet",
          },
          totalCargo: {
            $sum: "$totalCargo",
          },
          totalSharing: {
            $sum: "$totalSharing",
          },
          totalService: {
            $sum: "$totalService",
          },
          totalWrongWay: {
            $sum: "$totalWrongWay",
          },
          totalSidewalk: {
            $sum: "$totalSidewalk",
          },
          MaximumValue: { $max: "$total" },
          MinimumValue: { $min: "$total" },
          MaximumHourValue: { $max: "$hour_max" },
          AverageValue: { $avg: "$total" },
        },
      },
      {
        $addFields: {
          totalWomenPercentile: {
            $divide: ["$totalWomen", "$totalAmount"],
          },
          totalChildrenPercentile: {
            $divide: ["$totalChildren", "$totalAmount"],
          },
          totalHelmetPercentile: {
            $divide: ["$totalHelmet", "$totalAmount"],
          },
          totalCargoPercentile: {
            $divide: ["$totalCargo", "$totalAmount"],
          },
          totalSharingPercentile: {
            $divide: ["$totalSharing", "$totalAmount"],
          },
          totalServicePercentile: {
            $divide: ["$totalService", "$totalAmount"],
          },
          totalWrongWayPercentile: {
            $divide: ["$totalWrongWay", "$totalAmount"],
          },
          totalSidewalkPercentile: {
            $divide: ["$totalSidewalk", "$totalAmount"],
          },
        },
      },
    ]);
    res.json(totalSummary);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};
