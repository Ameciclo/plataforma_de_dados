import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: "Missing ID parameter" });
      return;
    }

    // Consulta para obter os dados da edição de contagem
    const editionQuery = `SELECT
    e.id,
    e.name,
    (SELECT SUM(dc.count) FROM cyclist_count.direction_counts dc JOIN cyclist_count.session s ON dc.session_id = s.id WHERE s.edition_id = e.id) AS total_cyclists,
    e.date,
    CAST(SUM(CASE WHEN ch.type = 'cargo' THEN cc.count ELSE 0 END) AS INTEGER) AS total_cargo,
    CAST(SUM(CASE WHEN ch.type = 'helmet' THEN cc.count ELSE 0 END) AS INTEGER) AS total_helmet,
    CAST(SUM(CASE WHEN ch.type = 'juveniles' THEN cc.count ELSE 0 END) AS INTEGER) AS total_juveniles,
    CAST(SUM(CASE WHEN ch.type = 'motor' THEN cc.count ELSE 0 END) AS INTEGER) AS total_motor,
    CAST(SUM(CASE WHEN ch.type = 'ride' THEN cc.count ELSE 0 END) AS INTEGER) AS total_ride,
    CAST(SUM(CASE WHEN ch.type = 'service' THEN cc.count ELSE 0 END) AS INTEGER) AS total_service,
    CAST(SUM(CASE WHEN ch.type = 'shared_bike' THEN cc.count ELSE 0 END) AS INTEGER) AS total_shared_bike,
    CAST(SUM(CASE WHEN ch.type = 'sidewalk' THEN cc.count ELSE 0 END) AS INTEGER) AS total_sidewalk,
    CAST(SUM(CASE WHEN ch.type = 'women' THEN cc.count ELSE 0 END) AS INTEGER) AS total_women,
    CAST(SUM(CASE WHEN ch.type = 'wrong_way' THEN cc.count ELSE 0 END) AS INTEGER) AS total_wrong_way
FROM
    cyclist_count.edition e
LEFT JOIN
    cyclist_count.characteristics_count cc ON e.id = cc.edition_id
LEFT JOIN
    cyclist_count.characteristics ch ON cc.characteristics_id = ch.id
WHERE
    e.id = ${id}
GROUP BY
    e.id, e.name, e.date;
  `;

    const { rows: editionData } = await sql.query(editionQuery);

    if (editionData.length === 0) {
      res.status(404).json({ error: "Edition not found" });
      return;
    }

    const edition = editionData[0];

    const data = {
      edition,
    };

    res.status(200).json(data);
  } catch (error) {
    
    console.error("Error executing SQL queries:", error);
    res.status(500).json({ error: `Internal Server Error` });
  }
}
