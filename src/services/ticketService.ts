import { PrismaClient, Ticket } from '@prisma/client';

const prisma = new PrismaClient();

export const createTicket = async (data: Partial<Ticket>): Promise<Ticket> => {
    const { createdBy, title, description, category, priority, dueDate } = data;
    if (!createdBy || !title || !description || !priority) {
        throw new Error('Required fields: createdBy, title, description, and priority must be provided.');
    }

    const ticket = await prisma.ticket.create({
        data: {
            createdBy,
            title,
            description,
            category: category || 'general',
            priority,
            status: 'open',
            dueDate: dueDate ? new Date(dueDate) : null,
        },
    });

    return ticket;
};

export const updateTicket = async (id: string, data: Partial<Ticket>): Promise<Ticket | null> => {
    const { assignedTo, modifiedBy, status, description, priority, title, category, dueDate } = data;
    if (!modifiedBy) {
        throw new Error('ModifiedBy field is required.');
    }
    const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: {
            assignedTo: assignedTo || null,
            modifiedBy,
            status: status || 'open',
            title,
            description,
            priority,
            category,
            dueDate: dueDate ? new Date(dueDate) : null,
        },
    });
    return updatedTicket;
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
    const ticket = await prisma.ticket.findUnique({
        where: { id },
    });
    return ticket;
};
