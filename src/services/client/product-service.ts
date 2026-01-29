import { prisma } from "config/client";

interface CreateProductInput {
    name: string;
    price: number;
    detailDesc: string;
    shortDesc: string;
    quantity: number;
    factory: string;
    target: string;
    image?: string | null;
}

const createProduct = async (data: CreateProductInput) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                detailDesc: data.detailDesc,
                shortDesc: data.shortDesc,
                quantity: data.quantity,
                factory: data.factory,
                target: data.target,
                image: data.image || null,
                sold: 0
            }
        });
        return newProduct;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: 'desc' }
        });
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const getProductById = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: id }
        });
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};



const addProductToCart = async (quantity: number, productId: number, user: any) => {
    const cart = await prisma.cart.findUnique({
        where:{
            userId : user.id
        }
    })

    const product =await prisma.product.findUnique({
        where:{id:productId}
    });

    if(cart){
        //update cart
        //cap nhat sum gio hang 
        await prisma.cart.update({
            where:{id:cart.id},
            data:{
                sum: {
                    increment: quantity,
                }
            }
        })

        //cap nhat cart detail
        //neu chua co cap nhat quantity
        //upsert= update + insert
        const currentCartDetail = await prisma. cartDetail.findFirst({
            where:{
                productId: productId,
                cartId:cart.id
            }
        })


        await prisma.cartDetail.upsert({
            where: {
                id:currentCartDetail?. id ?? 0
            },
            update: {
                quantity:{
                    increment:quantity
                }
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId:productId,
                cartId: cart.id 
        },
            })

    }else{
        //create cart
        await prisma.cart.create({
            data:{
                sum:quantity,
                userId:user.id,
                cartDetails:{
                    create: [{
                        price: product.price,
                        quantity: quantity,
                        productId: productId
                    }]
                }

            }
        })
    }
}

const updateProduct = async (id: number, data: Partial<CreateProductInput>) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: data
        });
        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

const deleteProduct = async (id: number) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: id }
        });
        return deletedProduct;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

const getProductInCart = async (userId: number) => {
        const cart = await prisma.cart.findUnique({
            where: { userId: userId },
        });
        if (cart) {
            const currentCartDetails = await prisma.cartDetail.findMany({
                where: { cartId: cart.id },
                include: { product: true },
            });
            return currentCartDetails;
        }
        return [];
    
    }

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, addProductToCart, getProductInCart };
