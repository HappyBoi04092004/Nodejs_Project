// Lấy sản phẩm có filter (phục vụ trang Shop)
const getProductsWithFilter = async (filter: any, page: number, pageSize: number) => {
    return prisma.product.findMany({
        where: filter,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' }
    });
};

// Đếm tổng số sản phẩm theo filter
const getProductCount = async (filter: any) => {
    return prisma.product.count({ where: filter });
};
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
        // Kiểm tra cartDetail đã có chưa
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where:{
                productId: productId,
                cartId:cart.id
            }
        });
        if(currentCartDetail){
            // update số lượng cartDetail
            await prisma.cartDetail.update({
                where: { id: currentCartDetail.id },
                data: { quantity: { increment: quantity } }
            });
        }else{
            // tạo mới cartDetail
            await prisma.cartDetail.create({
                data: {
                    price: product.price,
                    quantity: quantity,
                    productId: productId,
                    cartId: cart.id
                }
            });
        }
        // Cập nhật lại tổng sum đúng với tổng quantity các cartDetail
        const allDetails = await prisma.cartDetail.findMany({ where: { cartId: cart.id } });
        const newSum = allDetails.reduce((sum, item) => sum + item.quantity, 0);
        await prisma.cart.update({ where: { id: cart.id }, data: { sum: newSum } });
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
        });
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

const DeleteProductInCart = async (cartDetailId: number, userId: number,sumCart: number) => {
    await prisma.cartDetail.delete({ where: { id: cartDetailId } });
    // Sau khi xóa, cập nhật lại sum đúng với tổng quantity còn lại
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if(cart){
        const allDetails = await prisma.cartDetail.findMany({ where: { cartId: cart.id } });
        const newSum = allDetails.reduce((sum, item) => sum + item.quantity, 0);
        if(newSum === 0){
            await prisma.cart.delete({ where: { userId } });
        }else{
            await prisma.cart.update({ where: { userId }, data: { sum: newSum } });
        }
    }
    }

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, addProductToCart, getProductInCart, DeleteProductInCart, getProductsWithFilter, getProductCount };