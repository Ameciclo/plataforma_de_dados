import { sql } from "@vercel/postgres";

export async function GET(request) {
  try {
    const summaryQuery = `SELECT
      e.id,
      e.name,
      CAST((SELECT SUM(dc.count) FROM cyclist_count.direction_counts dc JOIN cyclist_count.session s ON dc.session_id = s.id WHERE s.edition_id = e.id) AS INTEGER) AS total_cyclists,
      e.date,
      c.point AS coordinates
    FROM
      cyclist_count.edition e
    JOIN
      public.coordinates c ON e.coordinates_id = c.id
      ORDER BY e.id ASC;
    `; // Sua consulta summaryQuery aqui
    const characteristicsQuery = `SELECT cc.edition_id,
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
         cyclist_count.characteristics_count cc
      JOIN
        cyclist_count.characteristics ch ON cc.characteristics_id = ch.id
      GROUP BY
        cc.edition_id;`; // Sua consulta characteristicsQuery aqui

    const { rows: characteristicsData } = await sql.query(characteristicsQuery);
    const { rows: summaryData } = await sql.query(summaryQuery);
    const total = summaryData.reduce(
      (acc, row) => acc + parseInt(row.total_cyclists),
      0
    );
    const last_count = summaryData[0].date; // Assumindo que a data da contagem mais recente está na primeira linha
    const number_counts = summaryData.length;
    const different_counts_points = new Set(summaryData.map((row) => row.name))
      .size;
    const max_total_of_count = Math.max(
      ...summaryData.map((row) => parseInt(row.total_cyclists))
    );
    const where_max_count = summaryData.find(
      (row) => parseInt(row.total_cyclists) === max_total_of_count
    );

    const formattedCounts = summaryData.map((count) => {
      const countCharacteristics = characteristicsData.find(
        (char) => char.edition_id === count.id
      );
    
      // Remover acentos do nome da contagem
      const slugName = count.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
    
      // Adicionar hífen entre a data e o nome da contagem
      const slugDate = new Date(count.date).toISOString().slice(0, 10);
      const slug = `${count.id}-${slugDate}-${slugName}`;
    
      return {
        ...count,
        ...countCharacteristics,
        slug,
      };
    });
    
    const characteristicsSums = {};

    formattedCounts.forEach((count) => {
      Object.keys(count).forEach((key) => {
        if (key.startsWith('total_')) {
          if (!characteristicsSums[key]) {
            characteristicsSums[key] = 0;
          }
          characteristicsSums[key] += parseInt(count[key]);
        }
      });
    });

    const summary = {
      total,
      last_count,
      number_counts,
      different_counts_points,
      max_total_of_count,
      where_max_count,
      ...characteristicsSums,
    };

    const data = {
      summary: summary,
      counts: formattedCounts,
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error executing SQL queries:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
