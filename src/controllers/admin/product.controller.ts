import { Request, Response} from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema"; 
import errorMap from "zod/lib/locales/en";


const getDetailProductPage = async (req:Request, res:Response) => {
    //const { id } = req.params;
    return res.render("admin/product/detail.ejs", );
}

const getCreateProductPage = async(req:Request, res:Response) => {
    const errors = [];
    return res.render("admin/product/create-product.ejs", { errors: errors });
}

const postAdminCreateProductPage = async(req:Request, res:Response) => {
    try {
        const validate = ProductSchema.safeParse(req.body);
        if (!validate.success) {
            const errorZod = validate.error.issues;
            const errors = errorZod.map(item => `${item.message}`);
            return res.render("admin/product/create-product.ejs", { 
                errors: errors
            });
        }   
        
        const productData = validate.data;
        // Save to database
        // TODO: Implement database logic here
        console.log("Product data:", productData);
        
        return res.redirect('/admin/product');
    } catch (error) {
        console.error("Error creating product:", error);
        return res.render("admin/product/create-product.ejs", { 
            errors: ["Có lỗi xảy ra khi tạo sản phẩm"]
        });
    }
}

const postAdminProductPage = async(req:Request, res:Response) => {
    const {name} = req.body;
    // Logic to handle product creation can be added here
    return res.redirect('/admin/product');
}   

export { getDetailProductPage, getCreateProductPage, postAdminProductPage, postAdminCreateProductPage };