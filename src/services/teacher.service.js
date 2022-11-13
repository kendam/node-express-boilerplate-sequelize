const { db } = require('../models');
const getAbsentValues = require('../utils/array-compararer');

/**
 * creates a teacher given teacher model
 * @param {Object} teacherBody
 * @returns {Promise<Object>}
 */
const createTeacher = async (teacherBody) => {
  return db.teachers.create(teacherBody);
};

/**
 * gets teacher and associated subjects  by Id
 * @param {*} teacherId
 * @returns
 */
const getTeacherAndSubject = async (teacherId) => {
  const result = await db.teachers.findOne({
    where: { id: teacherId },
    include: db.subjects,
  });
  return result;
};

/**
 * creates a teacher with associated subjects
 * @param {Object} subject
 * @param {Object} teacher
 * @returns
 */
const createTeacerAndSubject = async (subject, teacher) => {
  const createdSubject = await db.subjects.create(subject);
  const createdTeacher = await db.teachers.create(teacher);
  await createdTeacher.addSubject(createdSubject, { through: { selfGranted: false } });

  const result = await getTeacherAndSubject(createdTeacher.dataValues.id);
  return result;
};

/**
 * updates teacher profile with subjects
 * @param {*} subjects
 * @param {*} teacher
 * @returns
 */
const updateTeacherAndSubject = async (subjects, teacher) => {
  await db.teachers.update(teacher, {
    where: {
      id: teacher.id,
    },
  });

  const existingSubjects = await db.teachers_subjects.findAll({
    where: {
      teacherId: teacher.id,
    },
  });

  const toDelete = getAbsentValues(existingSubjects, subjects, 'subjectId');
  const toCreate = getAbsentValues(subjects, existingSubjects, 'subjectId');

  // check if there is any subject to delete and delete accordingly
  if (toDelete.length > 0) {
    toDelete.forEach((element) => {
      db.teachers_subjects.destroy({
        where: {
          subjectId: element.subjectId,
          teacherId: element.teacherId,
        },
      });
    });
  }

  // check if there is any subject to add
  if (toCreate.length > 0) {
    const teacherSubjects = toCreate.map((element) => {
      // eslint-disable-next-line no-param-reassign
      element.teacherId = teacher.id;
      return element;
    });

    await db.teachers_subjects.bulkCreate(teacherSubjects);
  }

  return { toDelete, toCreate };
};

module.exports = {
  createTeacher,
  createTeacerAndSubject,
  getTeacherAndSubject,
  updateTeacherAndSubject,
};
