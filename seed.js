const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const runSeed = async (dbConfig, sqlFilePath) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    console.log(
      `Connected to database: ${dbConfig.database} at ${dbConfig.host}`,
    );

    const sql = fs.readFileSync(sqlFilePath, "utf8");
    await client.query(sql);
    console.log(
      `Successfully executed seed script for ${dbConfig.database} from ${path.basename(sqlFilePath)}`,
    );
  } catch (err) {
    console.error(
      `Error seeding ${dbConfig.database} from ${path.basename(sqlFilePath)}:`,
      err.message,
    );
    throw err;
  } finally {
    await client.end();
    console.log(`Disconnected from database: ${dbConfig.database}`);
  }
};

const main = async () => {
  const eventsDbConfig = {
    host: "events-db",
    port: 5432,
    user: "events_user",
    password: "Admin123",
    database: "events_db",
  };

  const fansDbConfig = {
    host: "fans-db",
    port: 5432,
    user: "fans_user",
    password: "Admin123",
    database: "fans_db",
  };

  try {
    console.log("Starting database seeding...");
    await runSeed(
      eventsDbConfig,
      path.join(__dirname, "seeders", "events.sql"),
    );
    await runSeed(fansDbConfig, path.join(__dirname, "seeders", "fans.sql"));
    console.log("All databases seeded successfully!");
  } catch (error) {
    console.error("An error occurred during the seeding process:", error);
    process.exit(1);
  }
};

main();
