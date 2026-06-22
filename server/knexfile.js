module.exports = {
  development: {
    client: "pg",
    connection: process.env.POSTGRES_URL
      ? { connectionString: process.env.POSTGRES_URL, ssl: { rejectUnauthorized: false } }
      : {
          host: process.env.DB_HOST || "localhost",
          port: 5432,
          user: "postgres",
          password: "docker",
          database: "inventory_db",
        },
  },
};
