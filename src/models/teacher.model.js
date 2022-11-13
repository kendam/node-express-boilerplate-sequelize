module.exports = (sequelize, dataTypes) => {
  const teacher = sequelize.define('teacher', {
    highestQualification: {
      type: dataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });
  return teacher;
};
