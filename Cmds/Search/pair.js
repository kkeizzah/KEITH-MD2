const fetch = require("node-fetch");
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); //Import sendReply from context.js

module.exports = async (messageContext) => {
  const { client, m: message, text: phoneNumber } = messageContext;

  try {
    // Check if phone number is provided
    if (!phoneNumber) {
      return sendReply(client, message, "Please provide a valid phone number."); // Use sendReply for text replies
    }

    // Encode the phone number for the API request
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const response = await fetch(`https://keithmd.onrender.com/code?number=${encodedPhoneNumber}`);

    // Check if the API response is successful
    if (!response.ok) {
      return sendReply(client, message, "Error fetching data from the API. Please try again later."); // Use sendReply for error messages
    }

    // Parse the API response
    const data = await response.json();
    if (!data || !data.code) {
      return sendReply(client, message, "Invalid phone number."); // Use sendReply for text replies
    }

    // Send the verification code
    const verificationCode = data.code;
    return sendReply(client, message, ` ${verificationCode}`); // Use sendReply for success messages

  } catch (error) {
    console.log("Error occurred:", error);
    return sendReply(client, message, "An unexpected error occurred. Please try again later."); // Use sendReply for error messages
  }
};
