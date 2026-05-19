import { Request, Response } from 'express';
import { getOrdersByUser, getOrderById, createOrderFromCart } from '../../services/client/order-service';

export const getOrderHistoryPage = async (req: Request, res: Response) => {
    const userId = (req.user as { id: number }).id;
    const page = Number(req.query.page) || 1;
    const pageSize = 10;
    const { orders, total } = await getOrdersByUser(userId, page, pageSize);
    res.render('client/order/history', {
        orders,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize)
    });
};

export const getOrderDetailPage = async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);
    const order = await getOrderById(orderId);
    if (!order) return res.status(404).render('status/404');
    res.render('client/order/detail', { order });
};

export const postCheckoutOrder = async (req: Request, res: Response) => {
    const userId = (req.user as { id: number }).id;
    const { receiverName, receiverAddress, receiverPhone } = req.body;
    try {
        await createOrderFromCart(userId, receiverName, receiverAddress, receiverPhone);
        res.redirect('/order-history');
    } catch (e) {
        res.status(500).render('status/500');
    }
};
