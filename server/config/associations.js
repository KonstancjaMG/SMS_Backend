import User from '../models/user.js';
import AdministratorProfile from '../models/admin.profile.js';
import TeacherProfile from '../models/teacher.profile.js';
import StudentProfile from '../models/student.profile.js';
import Class from '../models/class.js';
import Grade from '../models/grade.js';
import EducationalMaterial from '../models/materials.js';
import Schedule from '../models/schedule.js';

User.hasOne(AdministratorProfile, { foreignKey: 'user_id' });
User.hasOne(TeacherProfile, { foreignKey: 'user_id' });
User.hasOne(StudentProfile, { foreignKey: 'user_id' });

AdministratorProfile.belongsTo(User, { foreignKey: 'user_id' });

TeacherProfile.belongsTo(User, { foreignKey: 'user_id' });
TeacherProfile.hasMany(Class, { foreignKey: 'teacher_id' });
TeacherProfile.hasMany(EducationalMaterial, { foreignKey: 'teacher_id' });

StudentProfile.belongsTo(User, { foreignKey: 'user_id' });
StudentProfile.hasMany(Grade, { foreignKey: 'student_id' });

Class.belongsTo(TeacherProfile, { foreignKey: 'teacher_id' });
Class.hasMany(EducationalMaterial, { foreignKey: 'class_id' });
Class.hasMany(Grade, { foreignKey: 'class_id' });

Class.hasOne(Schedule, { foreignKey: 'class_id' });
Schedule.belongsTo(Class, { foreignKey: 'class_id' });

Grade.belongsTo(StudentProfile, { foreignKey: 'student_id' });
Grade.belongsTo(Class, { foreignKey: 'class_id' });

EducationalMaterial.belongsTo(Class, { foreignKey: 'class_id' });
EducationalMaterial.belongsTo(TeacherProfile, { foreignKey: 'teacher_id' });