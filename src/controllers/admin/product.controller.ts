import { Request, Response} from "express";
import { ProductSchema, TProductSchema } from "../../validation/product.schema"; 
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,} from "../../services/client/product-service";

import { prisma } from "config/client";


const getDetailProductPage = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const product = await getProductById(+id);
        
        if (!product) {
            return res.status(404).render("client/product/detail.ejs", {
                product: null,
                errors: ["Sản phẩm không tìm thấy"]
            });
        }

        return res.render("client/product/detail.ejs", { product: product, errors: [] });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).render("client/product/detail.ejs", {
            product: null,
            errors: ["Có lỗi xảy ra khi tải sản phẩm"]
        });
    }
}

const getCreateProductPage = async(req:Request, res:Response) => {
    const errors = [];

    const olddata= {
        name: "",
        detailDesc: "",
        shortDesc: "",
        price: "",
        quantity: "",
        factory: "",
        target: "",
    };

    return res.render("admin/product/create-product.ejs", { errors: errors, olddata: olddata });
}

const postAdminCreateProductPage = async(req:Request, res:Response) => {
    try {
        const validate = ProductSchema.safeParse(req.body);
        if (!validate.success) {
            const errorZod = validate.error.issues;
            const errors = errorZod.map(item => `${item.message}`);
            const olddata = {
                name: req.body.name || "",
                detailDesc: req.body.detailDesc || "",
                shortDesc: req.body.shortDesc || "",
                price: req.body.price || "",
                quantity: req.body.quantity || "",
                factory: req.body.factory || "",
                target: req.body.target || "",
            };
            return res.render("admin/product/create-product.ejs", { 
                errors: errors,
                olddata: olddata
            });
        }   
        
        const productData = validate.data;
        const image = req?.file ? req.file.filename : null;
        
        // Save to database
        await createProduct({
            name: productData.name,
            price: productData.price,
            detailDesc: productData.detailDesc,
            shortDesc: productData.shortDesc,
            quantity: productData.quantity,
            factory: productData.factory,
            target: productData.target,
            image: image
        });
        
        return res.redirect('/admin/product');
    } catch (error) {
        console.error("Error creating product:", error);
        return res.render("admin/product/create-product.ejs", { 
            errors: ["Có lỗi xảy ra khi tạo sản phẩm"],
            olddata: req.body
        });
    }
}

const postAdminProductPage = async(req:Request, res:Response) => {
    const {name} = req.body;
    // Logic to handle product creation can be added here
    return res.redirect('/admin/product');
}

const getEditProductPage = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const product = await getProductById(+id);
        
        if (!product) {
            return res.status(404).render("admin/product/edit-product.ejs", {
                product: null,
                olddata: null,
                errors: ["Sản phẩm không tìm thấy"]
            });
        }
        
        return res.render("admin/product/edit-product.ejs", { 
            product: product,
            olddata: product,
            errors: [] 
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).render("admin/product/edit-product.ejs", {
            product: null,
            olddata: null,
            errors: ["Có lỗi xảy ra khi tải sản phẩm"]
        });
    }
}

const postUpdateProductPage = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const validate = ProductSchema.safeParse(req.body);
        
        if (!validate.success) {
            const errorZod = validate.error.issues;
            const errors = errorZod.map(item => `${item.message}`);
            const product = await getProductById(+id);
            
            return res.render("admin/product/edit-product.ejs", { 
                product: product,
                olddata: req.body,
                errors: errors
            });
        }   
        
        const productData = validate.data;
        const image = req?.file ? req.file.filename : undefined;
        
        const updateData: any = {
            name: productData.name,
            price: productData.price,
            detailDesc: productData.detailDesc,
            shortDesc: productData.shortDesc,
            quantity: productData.quantity,
            factory: productData.factory,
            target: productData.target
        };
        
        if (image) {
            updateData.image = image;
        }
        
        await updateProduct(+id, updateData);
        
        return res.redirect('/admin/product');
    } catch (error) {
        console.error("Error updating product:", error);
        const product = await getProductById(+(req.params.id));
        
        return res.render("admin/product/edit-product.ejs", { 
            product: product,
            olddata: req.body,
            errors: ["Có lỗi xảy ra khi cập nhật sản phẩm"]
        });
    }
}


const postDeleteProductPage = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        await deleteProduct(+id);
        
        return res.redirect('/admin/product');
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Có lỗi xảy ra khi xóa sản phẩm" });
    }
}

export { getDetailProductPage, getCreateProductPage, postAdminProductPage, postAdminCreateProductPage, getEditProductPage, postUpdateProductPage, postDeleteProductPage , getProductById};