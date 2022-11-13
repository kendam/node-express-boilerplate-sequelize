const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

/*
const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
  host: sequelize.host,
  dialect: sequelize.dialect,
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    Idle: 1000
  },
});
*/
sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.teachers = require('./teacher.model')(sequelizeInstance, Sequelize);
db.subjects = require('./subject.model')(sequelizeInstance, Sequelize);
db.teachers_subjects = require('./teacher_subject.model')(sequelizeInstance, Sequelize);
// relationships for models

db.users.hasOne(db.teachers);
db.teachers.belongsTo(db.users);

db.teachers.belongsToMany(db.subjects, { through: db.teachers_subjects });
db.subjects.belongsToMany(db.teachers, { through: db.teachers_subjects });

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Role);
// db.Role.belongsTo(db.User);

module.exports = {
  db,
};
