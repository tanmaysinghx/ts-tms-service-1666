import { Request, Response } from 'express';
import { createTicket, updateTicket, getTicketById } from '../services/ticketService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
  transactionId?: string;
}

export const createTicketController = async (req: CustomRequest, res: Response) => {
  const transactionId = req.transactionId;
  try {
    const ticket = await createTicket(req.body);
    return res.status(201).json(successResponse(ticket, "Ticket is successfully generated", transactionId));
  } catch (error) {
    const errorMessage = 'Unable to create ticket.';
    return res.status(400).json(errorResponse(errorMessage, "Ticket generation failed", transactionId,));
  }
};

export const updateTicketController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ticket = await updateTicket(id, req.body);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update ticket.' });
  }
};

export const getTicketByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ticket = await getTicketById(id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ticket.' });
  }
};
