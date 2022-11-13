const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, teacherService } = require('../services');

const createTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);
  res.status(httpStatus.CREATED).send(teacher);
});

const createTeacherAndSubject = catchAsync(async (req, res) => {
  const teacher = await teacherService.createTeacerAndSubject(req.body.subject, req.body.teacher);
  res.status(httpStatus.CREATED).send(teacher);
});

const updateTeacherAndSubject = catchAsync(async (req, res) => {
  const teacher = await teacherService.updateTeacherAndSubject(req.body.subjects, req.body.teacher);
  res.status(httpStatus.CREATED).send(teacher);
});

const geTeacherById = catchAsync(async (req, res) => {
  const result = await teacherService.getTeacherAndSubject(req.params.teacherId);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTeacher,
  createTeacherAndSubject,
  updateTeacherAndSubject,
  geTeacherById,
  getUser,
  updateUser,
  deleteUser,
};
