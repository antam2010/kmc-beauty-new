import bcrypt from 'bcrypt';

/**
 * 비밀번호 생성
 * @param input 
 */
export async function makePassword(input:any) {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(input, salt)
  return hashed
}
/**
 * 비밀번호 비교
 * @param userInputPassword 
 * @param storedHashedPassword 
 * @returns 
 */
export async function verifyPassword(userInputPassword:string, storedHashedPassword:string) {
  try {
    const isMatch = await bcrypt.compare(userInputPassword, storedHashedPassword);
    if (!isMatch) {
      console.log("Password doesn't match!");
      return false;
    } else {
      console.log("Password matches!");
      return true;
    }
  } catch (err) {
    throw err;
  }
}