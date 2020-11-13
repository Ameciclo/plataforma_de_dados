import { Request, Response } from "express";
import { Parser } from "json2csv";
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
    const format = req.query.format;
    if (format === "csv") {
      const json2csv = new Parser({ header: true });
      const csv = json2csv.parse(cyclistCount);
      res.header("Content-Type", "text/csv");
      res.attachment("contagens.csv");
      return res.send(csv);
    } else if (format === "json") {
    }

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
    console.log(totalSummary);
    res.json(totalSummary);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};
