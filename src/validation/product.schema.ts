import {z} from "zod";

export const ProductSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    detailDesc: z.string().email("Invalid email address"),
    shortDesc: z.string().min(10, "Short description must be at least 10 characters long").optional(),
    price: z.number().min(0, "Price must be a positive number"),
    image : z.string().url("Invalid image URL").optional(),
    quantity: z.number().min(0, "Quantity must be a positive number"),
    sold : z.number().min(0, "Sold must be a positive number").optional(),
    factory : z.string().min(2, "Factory name must be at least 2 characters long").optional(),
    target : z.string().min(2, "Target must be at least 2 characters long").optional(),

});

export type TProductSchema = z.infer<typeof ProductSchema>;