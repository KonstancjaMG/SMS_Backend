import bcrypt from 'bcrypt';

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

export default hashPassword;