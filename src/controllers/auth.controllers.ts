// export default const login = () => {};
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.send("hello");
};
