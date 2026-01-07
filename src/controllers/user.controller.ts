import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "services/user-service";

const getHomePage = async(req:Request, res:Response) => {
    const users = await getAllUsers();
    //console.log(">>> check users:", users);//test get all users
    return res.render("home.ejs",{
        users :users
    }
    )
} 
const getCreateUserPage = (req:Request, res:Response) => {
    return res.render("create-user.ejs")
} 
const postCreateUser =async  (req:Request, res:Response) => {
    const{name, email, local} = req.body;
    //handle create user
    await handleCreateUser(name, email,local);
    return res.redirect("/")
} 
export { getHomePage ,getCreateUserPage,postCreateUser};//export ham getHomePage de su dung o file khac va co the su dung nhieu file