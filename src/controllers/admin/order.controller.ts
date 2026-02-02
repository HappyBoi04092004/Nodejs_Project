import { Request, Response } from 'express';
import { getAllOrdersWithUser, getOrderByIdWithUser } from '../../services/client/order-service';

export const getAdminOrderPage = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const pageSize = 20;
    const { orders, total } = await getAllOrdersWithUser(page, pageSize);
    res.render('admin/order/show', {
        orders,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize)
    });
};

export const getAdminOrderDetailPage = async (req: Request, res: Response) => {


    const orderId = Number(req.params.id);
    const order = await getOrderByIdWithUser(orderId);
    if (!order) return res.status(404).render('status/404');
    res.render('admin/order/detail', { order });
};
