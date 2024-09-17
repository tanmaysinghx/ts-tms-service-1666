import { Router } from 'express';
import {
    createTicketController,
    updateTicketController,
    getTicketByIdController,
    getAssignedTicketsController,
} from '../controller/ticketController';
import { validateTicketCreation, validateTicketUpdate } from '../middleware/validateTicket';

const router = Router();

router.post('/create', validateTicketCreation, createTicketController); 
router.put('/update/:id', validateTicketUpdate, updateTicketController); 
router.get('/:id', getTicketByIdController);
router.get('/getAssignedTickets/:emailId', getAssignedTicketsController);

export default router;
