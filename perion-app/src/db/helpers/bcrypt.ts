import bcrypt from 'bcryptjs';

export const hashPass = (val: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(val, salt);
};

export const compHash = (val: string, hashed: string) => {
  return bcrypt.compareSync(val, hashed);
};
