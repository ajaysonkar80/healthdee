import dns from "dns";
import { promisify } from "util";
import readline from "readline";

const lookup = promisify(dns.lookup);

async function checkHost(host) {
  try {
    await lookup(host);
    return true;
  } catch {
    return false;
  }
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  const hosts = [
    "github.com",
  ];

  const results = await Promise.all(
    hosts.map((host) => checkHost(host))
  );

  const failed = hosts.filter((_, i) => !results[i]);

  if (failed.length > 0) {
    console.log("\n⚠️  NETWORK WARNING ⚠️");
    console.log("Some required domains are unreachable:");
    failed.forEach((h) => console.log(`   ❌ ${h}`));

    console.log(
      "\nThis may be due to university WiFi restrictions."
    );

    const answer = await askQuestion(
      "\nContinue anyway? (y/n): "
    );

    if (answer !== "y") {
      console.error("\n🚫 Aborting dev server.\n");
      process.exit(1);
    }

    console.log("\n⚡ Continuing despite network warning...\n");
  } else {
    console.log("✅ Network looks good.\n");
  }
}

main();
