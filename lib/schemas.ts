import { z } from 'zod';

export const hostFormSchema = z.object({
	imposter_amount: z
		.number()
		.min(1, 'At least 1 imposter')
		.max(3, 'Max 3 imposters'),
	hints: z.boolean(),
	categories: z.array(z.string()).min(1, 'Select at least one category'),
});

export const joinFormSchema = z.object({
	roomCode: z.string().length(6, 'Room code must be 6 characters'),
});

export type HostFormValues = z.infer<typeof hostFormSchema>;
export type JoinFormValues = z.infer<typeof joinFormSchema>;
