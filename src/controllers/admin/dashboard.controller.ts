
import { Request, Response } from "express";
import { getAllUsers } from "../../services/user-service";
import { getAllProducts } from "../../services/client/product-service";


const getDashboardPage = async(req:Request, res:Response) => {
    return res.render("admin/dashboard/show.ejs");
} 
const getAdminUserPage = async(req:Request, res:Response) => {
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs" ,{
        users:users
    });
} 

import { getAllOrdersWithUser } from '../../services/client/order-service';
const getAdminOrderPage = async(req:Request, res:Response) => {
    const page = Number(req.query.page) || 1;
    const pageSize = 20;
    const { orders, total } = await getAllOrdersWithUser(page, pageSize);
    return res.render("admin/order/show.ejs", {
        orders,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize)
    });
}
const getAdminProductPage = async(req:Request, res:Response) => {
    const products = await getAllProducts();
    return res.render("admin/product/show.ejs", { products: products });
}

const getAdminLogout = async(req:Request, res:Response) => {
    req.logout(function(err) {
        if (err) {
            console.log("Logout error:", err);
            return res.status(500).send("Error logging out");
        }
        return res.redirect('/');
    });
}
const getAdminSettingPage = async(req:Request, res:Response) => {
    return res.render("admin/setting.ejs");
}

export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, getAdminLogout, getAdminSettingPage };