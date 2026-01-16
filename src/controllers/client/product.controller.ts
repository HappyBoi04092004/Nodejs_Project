import { Request, Response} from "express";

const getDetailProductPage = async (req:Request, res:Response) => {
    //const { id } = req.params;
    return res.render("client/product/detail.ejs", );
}

export { getDetailProductPage };