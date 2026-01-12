import getConnection from "config/database";

const handleCreateUser = async (
    name:string,
    email:string,
    local:string
    ) => {

        //insert user vao database
        const connection = await getConnection();
    //return kq

        try {
            const sql = 'INSERT INTO `users`(`name`, `email`, `local`) VALUES (?, ?, ?)';
            const values = [name, email, local];
            const [result, fields] = await connection.execute(sql, values);
            return result;
        } catch (err) {
            console.log(err);
            return [];
}
}

const handleDeleteUser = async(id: string) => {
   try {
    const connection = await getConnection();
    const sql = 'DELETE FROM `users` WHERE `id` = ? ';
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
    const sql = 'SELECT * FROM `users` WHERE `id` = ?';
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
    const sql = 'UPDATE `users` SET `name`=?, `email`=?, `local`=? WHERE `id`=?';
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
export { handleCreateUser,getAllUsers,handleDeleteUser,getUserById,handleUpdateUser };
