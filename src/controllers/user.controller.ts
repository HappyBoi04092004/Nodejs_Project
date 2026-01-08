import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById ,handleUpdateUser} from "services/user-service";

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
    const { id, name, email, local } = req.body;
    await handleUpdateUser(id, name, email, local);
    return res.redirect("/");
}
export { getHomePage ,getCreateUserPage,postCreateUser,postDeleteUser,getViewUser,postUpdateUser};//export ham getHomePage de su dung o file khac va co the su dung nhieu file