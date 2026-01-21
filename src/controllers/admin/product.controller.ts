import { Request, Response} from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema"; 


const getDetailProductPage = async (req:Request, res:Response) => {
    //const { id } = req.params;
    return res.render("admin/product/detail.ejs", );
}

const getCreateProductPage = async(req:Request, res:Response) => {
    return res.render("admin/product/create-product.ejs");
}

const postAdminCreateProductPage = async(req:Request, res:Response) => {
    const {name} = req.body as TProductSchema;
    try {
        const result = ProductSchema.parse(req.body);
        console.log("Validated product data:", result);
    } catch (error) {
        console.error("Error creating product:", error);
    }
    return res.redirect('/admin/product');
}

const postAdminProductPage = async(req:Request, res:Response) => {
    const {name} = req.body;
    // Logic to handle product creation can be added here
    return res.redirect('/admin/product');
}   

export { getDetailProductPage, getCreateProductPage, postAdminProductPage, postAdminCreateProductPage };