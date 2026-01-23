import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
//import getConnection from "config/database";
import bcrypt, { hash } from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plaintext: string) => {
  return await bcrypt.hash(plaintext, saltRounds);
};

const comparePassword = async (plaintext: string, hashPassword: string) => {
    return await bcrypt.compare(plaintext, hashPassword);
}

const handleCreateUser = async (
    fullName:string,
    email:string,
    local:string,
    phone:string,
    avatar:string | null,
    role: string
    ) => {

    const defaultPassword = await hashPassword("123456");

    //insert user vao database
    //return kq
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: local,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role
        }
    })
    return newUser;
        
}

const handleDeleteUser = async(id: string) => {
   const deleteUser = await prisma.user.delete({
    where: { id: +id }
   });
   return deleteUser;
}
const getUserById = async(id: string) => {
   const user = await prisma.user.findUnique({
    where: { id: +id }
   });
   return user;
}
const handleUpdateUser = async(
  id: string,
  fullName: string,
  email: string,
  local: string,
  phone: string,
  role: string,
  avatar?: string
) => {
  const postUpdateUser = await prisma.user.update({
    where: { id: +id },
    data: {
      fullName: fullName,
      username: email,
      address: local,
      phone: phone,
      roleId: +role,
      ...(avatar !== undefined && { avatar: avatar })
    }
  });
  return postUpdateUser;
}


const getAllUsers = async() => {
    //select all users from database
    const users = await prisma.user.findMany();
    return users;

    //return kq
   // A simple SELECT query
   
}
const getAllRoles = async() => {
    //select all roles from database
    const roles = await prisma.role.findMany();
    return roles;

    //return kq
   // A simple SELECT query
   
} 
export { handleCreateUser,getAllUsers,handleDeleteUser,getUserById,handleUpdateUser,getAllRoles,hashPassword,comparePassword };
