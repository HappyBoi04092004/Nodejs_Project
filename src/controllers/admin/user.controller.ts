import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById ,handleUpdateUser, getAllRoles} from "../../services/user-service";
import { getAllProducts } from "services/client/product-service";

const getHomePage = async(req:Request, res:Response) => {
    const products = await getAllProducts();
    const user =req.user;
    console.log(">>> check current user:", user);
    //const users = await getAllUsers();
    //console.log(">>> check users:", users);//test get all users
    return res.render("client/home/show.ejs", {
        products: products
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
    const avatar = file ? file.filename : null;
    //handle create user
    await handleCreateUser(fullName, email, local, phone, avatar, role);
    return res.redirect("/admin/user");
} 
const postDeleteUser =async  (req:Request, res:Response) => {
    //console.log(">>> Check req.params:", req.params.id);
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/admin/user")
}  
const getViewUser = async (req:Request, res:Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    const roles = await getAllRoles(); 

    return res.render("admin/user/detail.ejs",{
        id:id,
        user:user,
        roles:roles
    })
}
const postUpdateUser = async (req:Request, res:Response) => {
    const{id,fullName, email, local, phone, role} = req.body;
    const file = req.file;
    const avatar = file ? file.filename : undefined;
    const postUpdateUser = await handleUpdateUser(id, fullName, email, local, phone, role, avatar);
    return res.redirect("/admin/user");
}
export { getHomePage ,getCreateUserPage,postCreateUser,postDeleteUser,getViewUser,postUpdateUser};//export ham getHomePage de su dung o file khac va co the su dung nhieu file