import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
//import getConnection from "config/database";


const handleCreateUser = async (
    fullName:string,
    email:string,
    local:string,
    phone:string,
    avatar:string | null
    ) => {

    //insert user vao database
    //return kq
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email || null, // Ensure username is set from email
            address: local,
            password: "123456",
            accountType: "ACCOUNT_TYPE.SYSTEM",
            avatar: avatar || null,
            phone: phone || null
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
const handleUpdateUser = async(id: string, name: string, email: string, local: string) => {
  const postUpdateUser = await prisma.user.update({
    where: { id: +id },
    data: {
      fullName: name,
      username: email,
      address: local,
      password: "",
      accountType: ""
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
export { handleCreateUser,getAllUsers,handleDeleteUser,getUserById,handleUpdateUser,getAllRoles };
