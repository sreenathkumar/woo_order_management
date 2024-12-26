import bcrypt from "bcrypt";

export const saltAndHashPassword = async (password: string) => {
    const saltRound = Number(process.env.SALT_ROUND) || 10;
    const hash = await bcrypt.hash(password, saltRound);

    return hash;
};