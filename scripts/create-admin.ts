import { loadEnvConfig } from "@next/env";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import bcrypt from "bcryptjs";

import { connectDB } from "../lib/mongodb";
import Admin from "../lib/models/Admin";

loadEnvConfig(process.cwd());

async function main() {
  const rl = readline.createInterface({
    input,
    output,
  });

  try {
    await connectDB();

    console.log("\n=== Create Admin Account ===\n");

    const name = await rl.question("Admin name: ");
    const email = await rl.question("Admin email: ");
    const password = await rl.question("Admin password: ");

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("\nAdmin with this email already exists.");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "admin",
    });

    console.log("\nAdmin created successfully.");
    console.log(`Email: ${email.toLowerCase()}`);
  } catch (error) {
    console.error("\nFailed to create admin:", error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

main();