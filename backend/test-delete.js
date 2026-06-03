const axios = require('axios');
const sequelize = require('./src/config/database');
const { User, DailyInput } = require('./src/models');
const { Op } = require('sequelize');

async function test() {
  await sequelize.authenticate();
  
  // Find a user with a daily input today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const input = await DailyInput.findOne({
    where: { createdAt: { [Op.between]: [startOfDay, endOfDay] } }
  });
  
  if (input) {
    console.log(`Found input for user ${input.user_id} today. Deleting...`);
    // Delete manually simulating the controller
    const { Prediction, Todo } = require('./src/models');
    await Prediction.destroy({ where: { daily_input_id: input.id } });
    await Todo.destroy({
      where: {
        user_id: input.user_id,
        generated_by_ai: true,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });
    await input.destroy();
    console.log("Deleted successfully.");
  } else {
    console.log("No input found for today.");
  }
  process.exit();
}
test();
