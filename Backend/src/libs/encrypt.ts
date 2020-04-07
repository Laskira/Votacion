import bcrypt from "bcryptjs";

// Encriptar
export async function encrypt(Password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(Password, salt);
}

// Validar Enpcritaciones
export async function validateEncrypt(password: string, Password: string): Promise<boolean> {
  return await bcrypt.compare(password, Password);
}
