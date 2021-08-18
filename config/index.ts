const dev = process.env.NODE_ENV !== "production";
export const server = dev
  ? "http://localhost:2999"
  : "https://api.ideciclo.ameciclo.org";
