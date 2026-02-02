import { Request, Response } from "express";
const getContactPage = async(req: Request, res: Response) => {
  res.render("client/contact/contact.ejs");
}

export { getContactPage };