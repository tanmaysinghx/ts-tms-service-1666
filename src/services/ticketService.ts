import { PrismaClient, Ticket } from '@prisma/client';
import kafka from 'kafka-node';

const prisma = new PrismaClient();

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

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
    const kafkaMessage = {
        ticketId: ticket.id,
        title: ticket.title,
        description: ticket.description,
        createdBy: ticket.createdBy,
        assignedTo: ticket?.assignedTo ?? null,
        status: ticket.status,
        priority: ticket.priority,
        eventType: 'create-ticket'
    };
    producer.send([{ topic: 'ticket-updates', messages: JSON.stringify(kafkaMessage) }], (err, data) => {
        if (err) console.error('Error sending Kafka message', err);
        else console.log('Kafka message sent', data);
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

export const getAssignedTicketsByEmail = async (emailId: string): Promise<Ticket[]> => {
    const tickets = await prisma.ticket.findMany({
        where: { assignedTo: emailId },
    });
    return tickets;
};
