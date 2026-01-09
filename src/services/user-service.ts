import { prisma } from "config/client";
import getConnection from "config/database";


const handleCreateUser = async (
    name:string,
    email:string,
    local:string
    ) => {

    //insert user vao database
    //return kq
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            address: local
        }
    })
    return newUser;
        
}

const handleDeleteUser = async(id: string) => {
   try {
    const connection = await getConnection();
    const sql = 'DELETE FROM `user` WHERE `id` = ? ';
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);

    return result;
    } catch (err) {
    console.log(err);
    return [];
}
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
      name: name,
      email: email,
      address: local
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
export { handleCreateUser,getAllUsers,handleDeleteUser,getUserById,handleUpdateUser };
