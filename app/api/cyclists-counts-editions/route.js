import { sql } from "@vercel/postgres";

export async function GET(request) {
    try {
      const url = new URL(request.url);
      const req_id = url.searchParams.get("id");
  
      if (!req_id) {
        return new Response(
          JSON.stringify({ error: "Missing ID parameter" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

    // Consulta para obter os dados da edição de contagem
    const editionQuery = `SELECT
        e.id,
        e.name,
        CAST((SELECT SUM(dc.count) FROM cyclist_count.direction_counts dc JOIN cyclist_count.session s ON dc.session_id = s.id WHERE s.edition_id = e.id) AS INTEGER) AS total_cyclists,
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
        e.id = $1
      GROUP BY
        e.id, e.name, e.date
    `;

    const { rows: editionData } = await sql.query(editionQuery, [req_id]);

    if (editionData.length === 0) {
      return new Response(JSON.stringify({ error: "Edition not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let { id, name, date, ...summary } = editionData[0];

    // Query para obter as coordenadas
    const coordinatesQuery = `
      SELECT c.point, c."type", c."name"
      FROM public.coordinates c
      JOIN cyclist_count.edition e ON e.coordinates_id = c.id
      WHERE e.id = $1;
    `;
    const { rows: coordinates } = await sql.query(coordinatesQuery, [req_id]);

    // Query para obter as sessões
      const sessionsQuery = `
        SELECT s.start_time, s.end_time, s.id
        FROM cyclist_count."session" s
        WHERE s.edition_id = $1;
      `;

    const { rows: sessionsData } = await sql.query(sessionsQuery, [req_id]);

    const sessions = {};
    let maxCount = 0;
    let max_hour = null;
    let directions = {};

    for (const session of sessionsData) {
      const sessionId = session.id;

      // Query para obter os dados de características da sessão
      const characteristicsQuery = `SELECT cc.characteristics_id, cc.count, ch."name"
      FROM cyclist_count.characteristics_count cc
      JOIN cyclist_count.characteristics ch ON cc.characteristics_id = ch.id
      WHERE cc.session_id = $1;
    `;

      const {
        rows: characteristicsData,
      } = await sql.query(characteristicsQuery, [sessionId]);

      const characteristics = {};
      for (const characteristic of characteristicsData) {
        characteristics[characteristic.name] = characteristic.count;
      }

      // Query para obter os dados quantitativos da sessão
      const quantitativeQuery = `
        SELECT dc.origin_cardinal, dc.destin_cardinal, dc.count, dc.origin, dc.destin
        FROM cyclist_count.direction_counts dc
        WHERE dc.session_id = ${sessionId};
      `;

      const { rows: quantitativeData } = await sql.query(quantitativeQuery);

      let total_cyclists = 0;
      const quantitative = {};
      for (const d of quantitativeData) {
        const key = `${d.origin_cardinal}_${d.destin_cardinal}`;
        quantitative[key] = d.count;
        total_cyclists += d.count;
        directions[key] = {
          origin: d.origin,
          destin: d.destin,
          origin_cardinal: d.origin_cardinal,
          destin_cardinal: d.destin_cardinal,
        };
      }
      if (total_cyclists > maxCount) {
        maxCount = total_cyclists;
        max_hour = total_cyclists;
      }
      sessions[sessionId] = {
        start_time: session.start_time,
        end_time: session.end_time,
        total_cyclists,
        characteristics,
        quantitative,
      };
    }
    // Remover acentos do nome da contagem
    const slugName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    // Adicionar hífen entre a data e o nome da contagem
    const slugDate = new Date(date).toISOString().slice(0, 10);
    const slug = `${req_id}-${slugDate}-${slugName}`;

    summary = {max_hour, ...summary}

    const data = {
      id: parseInt(req_id),
      slug,
      name,
      date,
      summary,
      coordinates,
      sessions,
      directions,
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error executing SQL queries:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
  