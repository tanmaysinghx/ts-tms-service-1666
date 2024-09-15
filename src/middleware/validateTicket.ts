import { Request, Response, NextFunction } from 'express';

export const validateTicketCreation = (req: Request, res: Response, next: NextFunction) => {
    const { createdBy, title, description, priority } = req.body;
    if (!createdBy || !title || !description || !priority) {
        return res.status(400).json({ error: 'Missing required fields: createdBy, title, description, and priority are required.' });
    }
    next();
};

export const validateTicketUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { assignedTo, status, modifiedBy } = req.body;
    if (!assignedTo && !status && !modifiedBy) {
        return res.status(400).json({ error: 'At least one field (assignedTo, status, or modifiedBy) must be updated.' });
    }
    next();
};
