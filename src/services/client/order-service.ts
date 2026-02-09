// Lấy tất cả order kèm thông tin user (cho admin)
export const getAllOrdersWithUser = async (page: number, pageSize: number) => {
    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: { user: true }
        }),
        prisma.order.count()
    ]);
    return { orders, total };
};

// Lấy chi tiết order kèm user (cho admin)
export const getOrderByIdWithUser = async (orderId: number) => {
    return prisma.order.findUnique({
        where: { id: orderId },
        include: { user: true, orderDetails: { include: { product: true } } }
    });
};
import { prisma } from 'config/client';

export const getOrdersByUser = async (userId: number, page: number, pageSize: number) => {
    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
        prisma.order.count({ where: { userId } })
    ]);
    return { orders, total };
};

export const getOrderById = async (orderId: number) => {
    return prisma.order.findUnique({
        where: { id: orderId },
        include: { orderDetails: { include: { product: true } } }
    });
};

export const getAllOrders = async (page: number, pageSize: number) => {
    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
        prisma.order.count()
    ]);
    return { orders, total };
};

export const createOrderFromCart = async (userId: number, receiverName?: string, receiverAddress?: string, receiverPhone?: string) => {
    return await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({ where: { userId }, include: { cartDetails: true, user: true } });
        if (!cart || cart.cartDetails.length === 0) throw new Error('Cart empty');
        const totalPrice = cart.cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const user = cart.user;
        // Create order and orderDetails snapshot
        const order = await tx.order.create({
            data: {
                userId,
                totalPrice,
                receiverAddress: receiverAddress || user?.address || '',
                receiverName: receiverName || user?.fullName || '',
                receiverPhone: receiverPhone || user?.phone || '',
                status: 'PENDING',
                paymentMethod: 'CASH',
                paymentStatus: 'PAYMENT_UNPAID',
                orderDetails: {
                    create: cart.cartDetails.map(item => ({
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            }
        });
        // Increment product.sold for each item
        for (const item of cart.cartDetails) {
            await tx.product.update({
                where: { id: item.productId },
                data: { sold: { increment: item.quantity } }
            });
        }
        // Clear cart
        await tx.cartDetail.deleteMany({ where: { cartId: cart.id } });
        await tx.cart.delete({ where: { id: cart.id } });
        return order;
    });
};
