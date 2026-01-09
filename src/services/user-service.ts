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
   try {
    const connection = await getConnection();
    const sql = 'SELECT * FROM `user` WHERE `id` = ?';
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result[0];
    } catch (err) {
    console.log(err);
    return [];
}
}
const handleUpdateUser = async(id: string, name: string, email: string, local: string) => {
   try {
    const connection = await getConnection();
    const sql = 'UPDATE `user` SET `name`=?, `email`=?, `local`=? WHERE `id`=?';
    const values = [name, email, local, id];
    const [result, fields] = await connection.execute(sql, values);

    return result;
    } catch (err) {
    console.log(err);
    return [];
}
}


const getAllUsers = async() => {
    //select all users from database
    const users = await prisma.user.findMany();
    return users;

    //return kq
   // A simple SELECT query
   
}
export { handleCreateUser,getAllUsers,handleDeleteUser,getUserById,handleUpdateUser };
