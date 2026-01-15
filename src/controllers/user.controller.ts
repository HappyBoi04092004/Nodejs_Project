import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById ,handleUpdateUser, getAllRoles} from "services/user-service";

const getHomePage = async(req:Request, res:Response) => {
    const users = await getAllUsers();
    //console.log(">>> check users:", users);//test get all users
    return res.render("home.ejs",{
        users :users
    }
    )
} 
const getCreateUserPage = async (req:Request, res:Response) => {
    const roles = await getAllRoles(); 
    return res.render("admin/user/create-user.ejs", {
         roles: roles 
        });
} 
const postCreateUser =async  (req:Request, res:Response) => {
    const{fullName, email, local, phone, role} = req.body;
    const file = req.file;
    const avatar = file ? file.filename : " không có avatar";
    //handle create user
    const newUser = await handleCreateUser(fullName, email, local, phone, avatar);
    return res.redirect("/admin/user");
} 
const postDeleteUser =async  (req:Request, res:Response) => {
    //console.log(">>> Check req.params:", req.params.id);
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/")
}  
const getViewUser = async (req:Request, res:Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.render("view-user.ejs",{
        id:id,
        user:user
    })
}
const postUpdateUser = async (req:Request, res:Response) => {
    const { id, fullName, username, local } = req.body;
    const postUpdateUser = await handleUpdateUser(id, fullName, username, local,);
    return res.redirect("/");
}
export { getHomePage ,getCreateUserPage,postCreateUser,postDeleteUser,getViewUser,postUpdateUser};//export ham getHomePage de su dung o file khac va co the su dung nhieu file