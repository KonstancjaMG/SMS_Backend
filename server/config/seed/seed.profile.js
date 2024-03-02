import Role from "../../models/role.js";
import User from "../../models/user.js";
import Profile from "../../models/profile.js"

async function seedProfiles() {
    const adminRole = await Role.findOne({ where: { name: 'administrator' } });
    const teacherRole = await Role.findOne({ where: { name: 'teacher' } });
    const studentRole = await Role.findOne({ where: { name: 'student' } });

    const admin = await User.findOne({ where: { RoleId: adminRole.id } });
    const teacher = await User.findOne({ where: { RoleId: teacherRole.id } });
    const student = await User.findOne({ where: { RoleId: studentRole.id } });

    if (admin) {
        await Profile.findOrCreate({
            where: { UserId: admin.id },
            defaults: {
                phoneNumber: '1234567890',
                address: '123 Admin Strasse',
                city: 'Admin City',
                dob: '1980-01-01',
            }
        });
    }

    if (teacher) {
        await Profile.findOrCreate({
            where: { UserId: teacher.id },
            defaults: {
                phoneNumber: '0987654321',
                address: '456 Teacher Strasse',
                city: 'Teacher City',
                dob: '1985-02-02',
            }
        });
    }

    if (student) {
        await Profile.findOrCreate({
            where: { UserId: student.id },
            defaults: {
                phoneNumber: '1122334455',
                address: '789 Student Strasse',
                city: 'Student City',
                dob: '1990-03-03',
            }
        });
    }
}

export default seedProfiles;