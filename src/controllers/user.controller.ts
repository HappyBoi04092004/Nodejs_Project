import { Request, Response } from "express";
import { handleCreateUser } from "../services/user-service";

const getHomePage = (req:Request, res:Response) => {
    return res.render("home.ejs")
} 
const getCreateUserPage = (req:Request, res:Response) => {
    return res.render("create-user.ejs")
} 
const postCreateUserPage = (req:Request, res:Response) => {
    console.log(">>>check req body:", req.body);    
    //handle create user
    handleCreateUser(req.body.name, req.body.email);
    return res.redirect("/")
} 
export { getHomePage ,getCreateUserPage,postCreateUserPage};//export ham getHomePage de su dung o file khac va co the su fung nhieu file