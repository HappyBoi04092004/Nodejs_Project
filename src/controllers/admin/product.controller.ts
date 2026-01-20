import { Request, Response} from "express";

const getDetailProductPage = async (req:Request, res:Response) => {
    //const { id } = req.params;
    return res.render("admin/product/detail.ejs", );
}
// const getAdminProductPage = async(req:Request, res:Response) => {
//     return res.render("admin/product/create-product.ejs");
// }
const getCreateProductPage = async(req:Request, res:Response) => {
    return res.render("admin/product/create-product.ejs");
}
const postAdminProductPage = async(req:Request, res:Response) => {
    const {name} = req.body;
    // Logic to handle product creation can be added here
    return res.redirect('/admin/product');
}   

export { getDetailProductPage, getCreateProductPage, postAdminProductPage };