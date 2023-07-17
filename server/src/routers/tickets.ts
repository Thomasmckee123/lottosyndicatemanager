import express from "express";
import { TicketController } from "../controllers/tickets";
//setting up routers
const TicketRouter = express.Router();

TicketRouter.get("/", TicketController.getAlltickets);
TicketRouter.get("/games/:gameId",TicketController.getTicketsByGameId);
TicketRouter.post("/syndicates/:syndicateId/games/:gameId",TicketController.createTickets)
TicketRouter.put("/update/:id",TicketController.updateTicketStatus);
TicketRouter.put("/delete/:ticketId",TicketController.deleteTicketById);
export { TicketRouter }; 