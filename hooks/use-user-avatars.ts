'use client';

import { useEffect, useState } from 'react';

interface UserProfile {
	user_id: string;
	first_name: string | null;
	last_name: string | null;
	profile_picture_url: string | null;
}

// Module-level cache — shared across every component using this hook,
// so the same user's avatar is never fetched twice in one session.
const cache = new Map<string, UserProfile>();

export function useUserAvatars(userIds: string[]) {
	const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});

	// Stable key so the effect doesn't re-run every render just because
	// a new array reference was passed in with the same ids.
	const key = userIds.slice().sort().join(',');

	useEffect(() => {
		if (userIds.length === 0) return;

		const missing = userIds.filter((id) => !cache.has(id));

		if (missing.length === 0) {
			setProfiles(
				Object.fromEntries(userIds.map((id) => [id, cache.get(id)!])),
			);
			return;
		}

		fetch('/api/users/avatars', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userIds: missing }),
		})
			.then((res) => res.json())
			.then((data: Record<string, UserProfile>) => {
				for (const [id, profile] of Object.entries(data)) {
					cache.set(id, profile);
				}
				setProfiles(
					Object.fromEntries(
						userIds
							.map((id) => [id, cache.get(id)])
							.filter(([, v]) => v),
					),
				);
			});
	}, [key]);

	return profiles;
}
