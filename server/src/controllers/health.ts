import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function getHealth(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({
    name: "lottery syndicate",
    status: "up",
  });
}

export const HealthController = {
  getHealth,
};