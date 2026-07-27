import { createClient } from '@/lib/server';

export default async function Page() {
	const supabase = createClient();

	const { data: users, error } = await supabase.from('users').select('*');

	if (error) {
		console.error(error);
		return <h1>Error loading users: {error.message}</h1>;
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<ul>
				{users?.map((user) => (
					<li key={user.id}>
						{user.user_id} — joined{' '}
						{new Date(user.created_at).toLocaleDateString()}
					</li>
				))}
			</ul>
		</div>
	);
}
