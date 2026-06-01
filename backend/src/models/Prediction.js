const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prediction = sequelize.define("Prediction", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  risk_level: {
    type: DataTypes.ENUM(
      "Rendah",
      "Sedang",
      "Tinggi"
    ),
    allowNull: false
  },

  burnout_score: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  mental_health_index: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  analysis_text: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: true // True to maintain backward compatibility if old rows exist
  },

  burnout_prediction: {
    type: DataTypes.STRING,
    allowNull: true
  },

  mental_health_prediction: {
    type: DataTypes.STRING,
    allowNull: true
  },

  raw_assessment_input: {
    type: DataTypes.JSONB,
    allowNull: true
  },

  recommendation: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  daily_insight: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  daily_recommendations: {
    type: DataTypes.JSONB,
    allowNull: true
  },

  mood_today: {
    type: DataTypes.STRING(50),
    allowNull: true
  }

}, {
  timestamps: true,
  tableName: "predictions"
});

module.exports = Prediction;