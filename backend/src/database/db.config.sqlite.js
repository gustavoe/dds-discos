const dbConfig = {
  dialect: "sqlite",
  storage: process.env.DB_LOCATION || "./data/discos.db",
  logging: process.env.DB_LOGGING === "true" || false,
};

export default dbConfig;
