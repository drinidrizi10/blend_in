import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	let evt;
	try {
		evt = await verifyWebhook(req);
	} catch (err) {
		console.error('Webhook verification failed:', err);
		return new Response('Verification error', { status: 400 });
	}

	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	if (evt.type === 'user.created') {
		const { id, first_name, last_name, image_url } = evt.data;

		const { error } = await supabase.from('users').upsert(
			{
				user_id: id,
				first_name,
				last_name,
				profile_picture_url: image_url,
			},
			{ onConflict: 'user_id' },
		);

		if (error) {
			console.error('Insert failed:', error);
			return new Response('Database error', { status: 500 });
		}
	}

	if (evt.type === 'user.updated') {
		const { id, first_name, last_name, image_url } = evt.data;

		const { error } = await supabase
			.from('users')
			.update({
				first_name,
				last_name,
				profile_picture_url: image_url,
			})
			.eq('user_id', id);

		if (error) {
			console.error('Update failed:', error);
			return new Response('Database error', { status: 500 });
		}
	}

	if (evt.type === 'user.deleted') {
		const { id } = evt.data;

		const { error } = await supabase
			.from('users')
			.delete()
			.eq('user_id', id);

		if (error) {
			console.error('Delete failed:', error);
			return new Response('Database error', { status: 500 });
		}
	}

	return new Response('OK', { status: 200 });
}
