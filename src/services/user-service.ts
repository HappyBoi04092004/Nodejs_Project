import { get } from "http";
import getConnection from "../config/database";

const handleCreateUser = (
    name:string,
    email:string) => {

        //insert user vao database

        //return kq
        console.log(">>> Created user:", name, email );

}

const getAllUsers = async() => {
    //select all users from database
    const connection = await getConnection();

    //return kq
   // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users` '
    );

    return results;
    } catch (err) {
        console.log(err);
        return [];
}
}
export { handleCreateUser,getAllUsers };
