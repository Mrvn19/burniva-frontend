const { DailyInput, Todo } = require("../models");
const { Op } = require("sequelize");

const getHistory = async (req, res) => {
  try {
    const history = await DailyInput.findAll({
      where: {
        user_id: req.user.id
      },
      include: [
        {
          model: require('../models').Prediction
        }
      ],
      order: [
        ["createdAt", "DESC"]
      ]
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getHistoryById = async (req, res) => {
  try {
    const history = await DailyInput.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
      include: [
        {
          model: require('../models').Prediction
        }
      ]
    });

    if (!history) {
      return res.status(404).json({ message: "Riwayat tidak ditemukan" });
    }

    // Ambil Todo yang dibuat pada hari yang sama dengan history ini
    const historyDate = new Date(history.createdAt);
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const todayStr = formatter.format(historyDate);
    
    const startOfDay = new Date(`${todayStr}T00:00:00+07:00`);
    const endOfDay = new Date(`${todayStr}T23:59:59.999+07:00`);

    const todos = await Todo.findAll({
      where: {
        user_id: req.user.id,
        generated_by_ai: true,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    res.json({
      history,
      todos
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getHistory,
  getHistoryById
};