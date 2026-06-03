const sequelize = require('./src/config/database');
const { DailyInput } = require('./src/models');

async function test() {
  await sequelize.authenticate();
  const inputs = await DailyInput.findAll({ order: [['createdAt', 'DESC']], limit: 5 });
  console.log(inputs.map(i => ({ id: i.id, userId: i.user_id, date: i.createdAt })));
  process.exit();
}
test();
