import { Request, Response } from "express";

const getContactPage = async (req: Request, res: Response) => {
  res.render("client/contact/contact.ejs", {
    pageTitle: "Liên hệ",
    sent: req.query.sent === "1",
  });
};

const postContactPage = async (req: Request, res: Response) => {
  res.redirect("/contact?sent=1");
};

export { getContactPage, postContactPage };