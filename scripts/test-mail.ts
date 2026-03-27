// scripts/test-mail.ts
import "dotenv/config"; // MUST be the first line
import { mailService } from "../server/services/mail.service";

async function runTest() {
  console.log("🚀 Starting Zepto Mail Test...");
  
  const apiKey = process.env.ZEPTOMAIL_API_KEY;
  const senderEmail = process.env.ZEPTOMAIL_SENDER_EMAIL;

  console.log("-----------------------------------------");
  console.log("Sender Email:", senderEmail || "❌ NOT FOUND");
  console.log("API Key Loaded:", apiKey ? `${apiKey.substring(0, 10)}...` : "❌ NOT FOUND");
  console.log("-----------------------------------------\n");

  if (!apiKey || !senderEmail) {
    console.error("🛑 STOPPING: Environment variables are missing in .env");
    return;
  }

  const testEmail = "sciajaysonkar@gmail.com";
  const testName = "Ajay Sonkar";
  const dummyToken = "test-token-12345";

  try {
    console.log(`📧 Sending verification to: ${testEmail}...`);
    
    // We await the service call
    const result = await mailService.sendVerification(testEmail, testName, dummyToken);

    // If the service returns 'undefined' (due to a skip), we shouldn't claim success
    if (result === undefined) {
      console.error("\n⚠️ WARNING: The service logged a skip. Email was NOT sent.");
      console.log("Check if mail.service.ts has a guard clause that returns early.");
    } else {
      console.log("\n✅ SUCCESS: Email sent! Check your inbox (and spam).");
    }
  } catch (error) {
    console.error("\n❌ FAILED: Zepto Mail returned an error.");
    if (error instanceof Error) {
      console.error("Error Message:", error.message);
    }
  }
}

runTest();