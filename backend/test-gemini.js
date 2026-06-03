const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

async function test() {
  try {
    const response = await axios.get("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCUgTiWB9fZDhYkBc4RY90v6mky2nfUYAE");
    console.log("Models:", response.data.models.map(m => m.name).join(", "));
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}
test();
