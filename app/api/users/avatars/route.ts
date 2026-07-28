import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { userIds } = await req.json();

	if (!Array.isArray(userIds) || userIds.length === 0) {
		return NextResponse.json({}, { status: 200 });
	}

	// Service role: this route intentionally exposes public profile fields
	// (avatar, name) for any user id — never leaks private/sensitive data.
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	const { data, error } = await supabase
		.from('users')
		.select('user_id, first_name, last_name, profile_picture_url')
		.in('user_id', userIds);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const result = Object.fromEntries(data.map((u) => [u.user_id, u]));
	return NextResponse.json(result);
}
