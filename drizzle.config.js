/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DRIZZLE_DATABASE_URL,
    }
  } ;