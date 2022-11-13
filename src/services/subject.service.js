const { db } = require('../models');

/**
 * creates a subject
 * @param {Object} subjectBody
 * @returns {Promise<Object>}
 */
const createSubject = async (subjectBody) => {
  return db.subjects.create(subjectBody);
};

/**
 * gets subject by Id
 * @param {*} subjectId
 * @returns
 */
const getSubjectById = async (subjectId) => {
  const result = await db.subjects.findOne({
    where: { id: subjectId },
  });
  return result;
};

/**
 * gets all subject
 *
 * @returns
 */
const getAllSubjects = async () => {
  const result = await db.subjects.findAll();
  return result;
};

module.exports = {
  createSubject,
  getSubjectById,
  getAllSubjects,
};
