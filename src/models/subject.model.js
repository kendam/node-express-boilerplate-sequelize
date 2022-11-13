module.exports = (sequelize, dataType) => {
  const subject = sequelize.define('subject', {
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
      allowNull: true,
    },
    creditUnit: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
  return subject;
};
