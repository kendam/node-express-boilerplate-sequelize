module.exports = (sequelize, dataType) => {
  const teacherSubject = sequelize.define('teachers_subjects', {
    teacherId: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: dataType.INTEGER,
      allowNull: true,
    },
  });
  return teacherSubject;
};
