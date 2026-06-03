const { Todo } = require("../models");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        user_id: req.user.id
      },
      order: [
        ["createdAt","DESC"]
      ]
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const toggleTodo = async (req,res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    if(!todo) {
      return res.status(404).json({
        message: "Todo tidak ditemukan"
      });
    }

    todo.status = todo.status === "completed" ? "pending" : "completed";
    await todo.save();

    res.json(todo);
  } catch(error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    // Convert priority matching database ENUM/schema or defaults to 'medium'
    const validPriority = ['high', 'medium', 'low'].includes(priority) ? priority : 'medium';

    const todo = await Todo.create({
      user_id: req.user.id,
      title,
      description,
      priority: validPriority,
      status: 'pending',
      generated_by_ai: false
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo tidak ditemukan"
      });
    }

    await todo.destroy();

    res.json({
      message: "Todo berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getTodos,
  toggleTodo,
  createTodo,
  deleteTodo
};