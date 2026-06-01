module.exports = (
  sequelize,
  DataTypes
) => {

  const Todo =
    sequelize.define(
      "Todo",
      {
        id: {
          type:
            DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
        },

        user_id: {
          type:
            DataTypes.UUID,
          allowNull: false,
        },

        title: {
          type:
            DataTypes.STRING,
          allowNull: false,
        },

        description: {
          type:
            DataTypes.TEXT,
        },

        priority: {
          type:
            DataTypes.STRING,
          defaultValue:
            "medium",
        },

        status: {
          type:
            DataTypes.STRING,
          defaultValue:
            "pending",
        },

        generated_by_ai:
          {
            type:
              DataTypes.BOOLEAN,
            defaultValue:
              true,
          },

        source_prediction_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        
        source: {
          type: DataTypes.STRING,
          defaultValue: 'system' // 'gemini' or 'fallback' or 'system'
        }
      },

      {
        tableName:
          "todos",
      }
    );

  Todo.associate =
    (models) => {

      Todo.belongsTo(
        models.User,
        {
          foreignKey:
            "user_id",
          as: "user",
        }
      );

    };

  return Todo;
};