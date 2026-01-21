import { Request, Response } from "express";
import { getAllUsers } from "../../services/user-service";
import { getAllProducts } from "../../services/product-service";


const getDashboardPage = async(req:Request, res:Response) => {
    return res.render("admin/dashboard/show.ejs");
} 
const getAdminUserPage = async(req:Request, res:Response) => {
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs" ,{
        users:users
    });
} 

const getAdminOrderPage = async(req:Request, res:Response) => {
    return res.render("admin/order/show.ejs");
}
const getAdminProductPage = async(req:Request, res:Response) => {
    const products = await getAllProducts();
    return res.render("admin/product/show.ejs", { products: products });
}
export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage };