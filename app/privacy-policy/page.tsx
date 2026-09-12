export const metadata = {
	title: 'Privacy Policy | Blend In',
	description:
		'Privacy Policy for Blend In - GDPR / EEA compliant data notice covering what we collect, lawful basis, your rights, and third parties.',
};

export default function PrivacyPolicyPage() {
	return (
		<div className='w-full md:w-3/4 py-12 px-4 md:px-0'>
			<div className='prose prose-neutral dark:prose-invert max-w-none'>
				<h1 className='text-4xl font-bold text-primary mb-4'>
					Privacy Policy
				</h1>
				<p className='text-xl text-secondary-foreground mb-2'>
					(EU / EEA &amp; GDPR Compliant)
				</p>
				<p className='text-muted-foreground mb-8'>
					Last updated: September 13, 2026
				</p>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						1. Controller and Contact Information
					</h2>
					<p className='mb-2'>
						The <strong>controller</strong> of your personal data
						under the General Data Protection Regulation (GDPR) and
						applicable EEA national data protection laws is:
					</p>
					<div className='bg-card border border-border rounded-lg p-5 mb-4 not-prose'>
						<p className='font-medium mb-1'>Blend In</p>
						<p className='text-sm text-muted-foreground mb-1'>
							Email contact for data protection matters:
						</p>
						<p className='text-sm font-mono'>
							drinidrizi9@gmail.com
						</p>
					</div>
					<p className='mb-2'>
						If you have any questions about this policy, your
						personal data, or wish to exercise any of your rights
						described below, please contact us at the email above.
					</p>
					<p>
						<em>
							Note: We are currently a small project and do not
							have a formally designated Data Protection Officer
							(DPO). All data protection inquiries should be sent
							to the address above and will receive a prompt
							response.
						</em>
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						2. Overview and Scope
					</h2>
					<p className='mb-3'>
						This Privacy Policy describes the personal data we
						process when you access or use the Blend In game and
						website (the &quot;Service&quot;), the legal bases
						relying upon to process it, who we share it with, how
						long we keep it, and the rights you have under the GDPR
						and EEA data protection law.
					</p>
					<p>
						<strong>Our guiding principle</strong>: we collect and
						process the absolute minimum data needed to authenticate
						you and run the game. We never sell your data, we never
						use it for advertising or marketing, and we never build
						profiles about you.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						3. Categories of Personal Data We Collect and Process
					</h2>

					<h3 className='text-xl font-medium mb-3'>
						3.1 Account and Profile Data (Persisted in Database)
					</h3>
					<p className='mb-3'>
						When you sign up or sign in, the following{' '}
						<em>limited</em> set of data is stored persistently in
						our database (hosted by Supabase - see section 5):
					</p>
					<ul className='list-disc pl-6 mb-4 space-y-1'>
						<li>
							<strong>User ID</strong> - a pseudonymous unique
							identifier issued by our authentication provider,
							Clerk
						</li>
						<li>
							<strong>First name and Last name</strong> - as
							provided in your Clerk account profile at
							registration
						</li>
						<li>
							<strong>Profile picture URL</strong> - a link to the
							avatar image hosted by your authentication provider
						</li>
					</ul>
					<p>
						We intentionally do <strong>not</strong> store your
						email address, phone number, password hash, OAuth
						tokens, or IP address in our own database. Those are
						held exclusively by Clerk (see section 5.1).
					</p>

					<h3 className='text-xl font-medium mb-3 mt-6'>
						3.2 Ephemeral Game Session Data (Temporary, In-Memory
						Only)
					</h3>
					<p className='mb-3'>
						While you are connected to a game room, the following
						data is stored only in the volatile memory (RAM) of our
						WebSocket server and is{' '}
						<strong>
							never written to any disk, database, log file, or
							backup
						</strong>
						:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>
							Display name you choose when joining or creating a
							room (max 24 characters)
						</li>
						<li>
							Room settings (imposter count, categories, hints)
						</li>
						<li>
							Room chat messages (limited to the last 200 messages
							per room, max 500 characters each)
						</li>
						<li>Words submitted each round (max 35 characters)</li>
						<li>
							Votes, elimination statuses, turn order, game
							outcomes, and assigned roles (player / imposter)
						</li>
						<li>
							WebSocket connection and current room association
						</li>
					</ul>
					<p className='mt-3'>
						All of the above data is irrecoverably deleted as soon
						as: (a) all players leave the room and it is closed; or
						(b) the server process is restarted. We do not retain
						any game history, transcripts, or logs of chat messages
						or submitted words.
					</p>

					<h3 className='text-xl font-medium mb-3 mt-6'>
						3.3 Data We Do Not Collect
					</h3>
					<p>
						We do <strong>not</strong> collect or process: email
						addresses, passwords, phone numbers, payment
						information, IP addresses, device fingerprints, location
						data, browsing history, or analytics/tracking data of
						any kind.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						4. Purposes and Lawful Basis for Processing (Article 6
						GDPR)
					</h2>
					<p className='mb-4'>
						Under Article 6 of the GDPR, every processing activity
						must be based on a lawful ground. Our processing
						activities rely on the following grounds:
					</p>

					<div className='space-y-4'>
						<div className='bg-card border border-border rounded-lg p-5 not-prose'>
							<p className='font-semibold mb-2'>
								4.1 Performance of a Contract - Art. 6(1)(b)
								GDPR
							</p>
							<p className='text-sm'>
								We process your User ID, first name, last name,
								and profile picture URL because they are
								necessary to perform the Terms of Use (the
								contract between you and us). Specifically,
								these are required to authenticate your account
								and to display your identity to other players in
								the game rooms you join. Without this data, we
								cannot deliver the Service to you.
							</p>
						</div>

						<div className='bg-card border border-border rounded-lg p-5 not-prose'>
							<p className='font-semibold mb-2'>
								4.2 Legitimate Interests - Art. 6(1)(f) GDPR
							</p>
							<p className='text-sm'>
								We process ephemeral in-memory session data
								(chat messages, submitted words, votes, roles,
								room settings) on the basis of our legitimate
								interest in operating the real-time multiplayer
								game functionality. We have assessed that this
								does not override your rights and freedoms:
								processing is minimal, strictly limited to the
								duration of the room, never persisted, never
								used outside of immediate gameplay, and never
								linked to your identity beyond the room.
							</p>
						</div>

						<div className='bg-card border border-border rounded-lg p-5 not-prose'>
							<p className='font-semibold mb-2'>
								4.3 Legal Obligation - Art. 6(1)(c) GDPR
							</p>
							<p className='text-sm'>
								We may process or retain personal data if and to
								the extent required by a binding law,
								regulation, or court order (e.g. responding to a
								valid subpoena). We have no general legal
								retention obligations and do not retain data
								&quot;just in case&quot;.
							</p>
						</div>
					</div>

					<p className='mt-4'>
						<em>
							We do <strong>not</strong> rely on consent (Art.
							6(1)(a)) as a basis for any core processing. Consent
							is never required to play the game. Where we rely on
							legitimate interests, you have the right to object
							at any time - see section 8.
						</em>
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						5. Recipients and Categories of Recipients of Personal
						Data
					</h2>
					<p className='mb-4'>
						We only share your personal data with the following
						trusted third-party processors who are bound by
						contractual obligations to protect your data. We conduct
						a minimal-privacy-impact assessment for each and never
						sell or rent your data to anyone.
					</p>

					<div className='space-y-5'>
						<div className='bg-card border border-border rounded-lg p-5 not-prose'>
							<p className='font-semibold text-lg mb-2'>
								5.1 Clerk, Inc. - Authentication Provider
							</p>
							<p className='mb-2'>
								<strong>Role</strong>: Processor of
								authentication credentials and profile data
							</p>
							<p className='mb-2'>
								<strong>Data they receive/hold</strong>: Email
								address, password hash, OAuth provider
								identifiers and tokens, first/last name, profile
								picture, phone number (if used), device/session
								metadata, CAPTCHA and fraud-prevention signals,
								server logs.
							</p>
							<p className='mb-2'>
								<strong>Why</strong>: Account creation, sign-in,
								session management, bot/CAPTCHA protection, and
								security monitoring.
							</p>
							<p>
								<strong>Privacy Policy</strong>:{' '}
								<a
									href='https://clerk.com/privacy'
									target='_blank'
									rel='noopener noreferrer'
									className='text-primary underline'>
									clerk.com/privacy
								</a>
							</p>
						</div>

						<div className='bg-card border border-border rounded-lg p-5 not-prose'>
							<p className='font-semibold text-lg mb-2'>
								5.2 Supabase, Inc. - Database Hosting
							</p>
							<p className='mb-2'>
								<strong>Role</strong>: Processor hosting our
								PostgreSQL database and infrastructure
							</p>
							<p className='mb-2'>
								<strong>Data they receive/hold</strong>: Our
								entire `users` table (User ID, first name, last
								name, profile picture URL). They also store
								automated database backups for disaster recovery
								and basic server/access logs.
							</p>
							<p className='mb-2'>
								<strong>Why</strong>: Durable storage of the
								account profile records described in section
								3.1.
							</p>
							<p>
								<strong>Privacy Policy</strong>:{' '}
								<a
									href='https://supabase.com/privacy'
									target='_blank'
									rel='noopener noreferrer'
									className='text-primary underline'>
									supabase.com/privacy
								</a>
							</p>
						</div>

						<div className='bg-card border border-border rounded-lg p-5 not-prose'>
							<p className='font-semibold text-lg mb-2'>
								5.3 Groq, Inc. - AI Service (Word Generation)
							</p>
							<p className='mb-2'>
								<strong>Role</strong>: Processor for on-demand
								AI word and hint generation
							</p>
							<p className='mb-2'>
								<strong>Data they receive</strong>:{' '}
								<em>No personal data whatsoever</em>. Each API
								request contains only: (a) the categories
								selected for a game, and (b) static
								word-generation instructions. We never send your
								User ID, name, email, IP address, or any
								player-identifiable data to Groq.
							</p>
							<p className='mb-2'>
								<strong>Why</strong>: Generating words and vague
								hints at the start of each game.
							</p>
							<p>
								<strong>Privacy Policy</strong>:{' '}
								<a
									href='https://groq.com/privacy-policy'
									target='_blank'
									rel='noopener noreferrer'
									className='text-primary underline'>
									groq.com/privacy-policy
								</a>
							</p>
						</div>
					</div>

					<p className='mt-5'>
						No other recipients. We do not transfer any personal
						data to law enforcement, advertising networks, analytics
						providers, or social media platforms.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						6. International / Cross-Border Data Transfers (Article
						44+ GDPR)
					</h2>
					<p className='mb-3'>
						Some of our third-party processors are based in the
						United States, which means personal data may be
						transferred from the EU/EEA to a country that the
						European Commission has not deemed to provide an
						&quot;adequate&quot; level of data protection.
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							<strong>Clerk, Supabase, and Groq</strong> are US
							based. To the extent they act as our sub-processors
							and transfer personal data outside the EEA, they
							have either certified to the{' '}
							<strong>EU-US Data Privacy Framework (DPF)</strong>{' '}
							and/or rely on{' '}
							<strong>Standard Contractual Clauses (SCCs)</strong>{' '}
							as approved by the European Commission, combined
							with appropriate technical and organisational
							measures.
						</li>
						<li>
							You have the right to receive further details of the
							transfer mechanisms and to obtain a copy of the
							relevant safeguards by contacting us - see section
							1.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						7. Retention Periods (Article 5(1)(e) GDPR)
					</h2>
					<div className='overflow-hidden rounded-lg border border-border not-prose'>
						<table className='w-full text-sm'>
							<thead className='bg-muted/40'>
								<tr>
									<th className='text-left p-3 font-semibold'>
										Category of data
									</th>
									<th className='text-left p-3 font-semibold'>
										Retention period
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-border'>
								<tr>
									<td className='p-3 align-top'>
										Persistent user profile (User ID, name,
										profile picture URL)
									</td>
									<td className='p-3 align-top'>
										Stored until{' '}
										<strong>your account is deleted</strong>{' '}
										through Clerk. Deletion is automatic and
										immediate via webhook.
									</td>
								</tr>
								<tr>
									<td className='p-3 align-top'>
										Game session data (chat, words, votes,
										roles, settings)
									</td>
									<td className='p-3 align-top'>
										<strong>
											Duration of the room session only
										</strong>{' '}
										- permanently deleted when the last
										player leaves or server restarts.
									</td>
								</tr>
								<tr>
									<td className='p-3 align-top'>
										Cookies and session tokens
									</td>
									<td className='p-3 align-top'>
										Per Clerk&apos;s session policy -
										typically 7–30 days, or until you sign
										out.
									</td>
								</tr>
								<tr>
									<td className='p-3 align-top'>
										Legal / court-ordered data
									</td>
									<td className='p-3 align-top'>
										Only retained for as long as the
										applicable legal obligation requires.
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p className='mt-4'>
						We do not retain personal data for longer than strictly
						necessary and we conduct periodic internal reviews to
						ensure nothing is kept beyond the purposes listed above.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						8. Your Rights Under the GDPR and EEA Law
					</h2>
					<p className='mb-4'>
						If you are located in the European Economic Area (EEA)
						or Switzerland, you have the following rights in
						relation to your personal data. You may exercise them
						free of charge and we are required to respond within{' '}
						<strong>one month</strong> of your request.
					</p>

					<ul className='space-y-4'>
						<li>
							<strong>Right of Access (Art. 15 GDPR)</strong>- You
							may request a copy of all personal data we hold
							about you together with the information in this
							notice.
						</li>
						<li>
							<strong>
								Right to Rectification (Art. 16 GDPR)
							</strong>{' '}
							- You may ask us to correct any inaccurate or
							incomplete personal data. Most of your profile can
							be edited directly in your Clerk account settings;
							any changes are automatically synced to our
							database.
						</li>
						<li>
							<strong>
								Right to Erasure / &quot;Right to Be
								Forgotten&quot; (Art. 17 GDPR)
							</strong>{' '}
							- You may request that we delete all personal data
							we hold about you, subject to limited exceptions
							(e.g. ongoing legal obligations). You can trigger
							this by deleting your Clerk account, which
							automatically removes your profile record from our
							database within seconds.
						</li>
						<li>
							<strong>
								Right to Restriction of Processing (Art. 18
								GDPR)
							</strong>{' '}
							- You may request restriction where: (a) accuracy of
							the data is contested; (b) processing is unlawful
							but you oppose erasure; (c) we no longer need the
							data but you require it for legal claims; or (d) you
							object to processing pending our verification.
						</li>
						<li>
							<strong>
								Right to Data Portability (Art. 20 GDPR)
							</strong>{' '}
							- You may request your profile data (User ID, name,
							profile picture URL) in a structured,
							machine-readable format.
						</li>
						<li>
							<strong>Right to Object (Art. 21 GDPR)</strong> -
							Where processing is based on legitimate interests
							(see section 4.2), you may object at any time on
							grounds relating to your particular situation. We
							will stop unless we can demonstrate compelling
							overriding legitimate grounds or establish,
							exercise, or defend legal claims.
						</li>
						<li>
							<strong>
								Rights Relating to Automated Decision-Making and
								Profiling (Art. 22 GDPR)
							</strong>{' '}
							- We do <strong>not</strong> perform any automated
							decision-making or profiling that produces legal or
							similarly significant effects concerning you. Game
							roles (player/imposter) are assigned randomly and
							are not &quot;profiling&quot; under the GDPR.
						</li>
						<li>
							<strong>
								Right to Withdraw Consent (Art. 7(3) GDPR)
							</strong>{' '}
							- To the extent any processing is based on consent
							(currently none), you may withdraw that consent at
							any time, without affecting the lawfulness of
							processing carried out before withdrawal.
						</li>
					</ul>

					<div className='mt-6 bg-card border border-border rounded-lg p-5 not-prose'>
						<p className='font-semibold mb-2'>
							How to exercise your rights
						</p>
						<p className='text-sm mb-2'>
							Send an email to{' '}
							<span className='font-mono'>
								drinidrizi9@gmail.com
							</span>{' '}
							with &quot;GDPR Request&quot; in the subject. We may
							need to verify your identity (via your Clerk
							account) before complying.
						</p>
					</div>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						9. Right to Lodge a Complaint with a Supervisory
						Authority (Article 77 GDPR)
					</h2>
					<p className='mb-3'>
						If you consider our processing of your personal data to
						be in breach of the GDPR or other applicable EEA data
						protection legislation, you have the right to lodge a
						complaint:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>
							With the{' '}
							<strong>Data Protection Authority (DPA)</strong> of
							your habitual residence, place of work, or place of
							the alleged infringement; or
						</li>
						<li>
							Directly with the DPA of the EU/EEA member state in
							which we are established (if different from the
							above).
						</li>
					</ul>
					<p className='mt-3'>
						A list of all EU Data Protection Authorities is
						available from the European Data Protection Board (EDPB)
						at{' '}
						<a
							href='https://edpb.europa.eu/about-edpb/about-edpb/members_en'
							target='_blank'
							rel='noopener noreferrer'
							className='text-primary underline'>
							edpb.europa.eu
						</a>
						. You do not need to have contacted us first before
						filing a complaint with your DPA.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						10. Cookies and Similar Technologies (ePrivacy
						Directive)
					</h2>
					<p className='mb-3'>
						Under the EU ePrivacy Directive (2002/58/EC), cookies
						that are not &quot;strictly necessary&quot; for the
						provision of a service explicitly requested by the user
						require your prior informed consent.
					</p>
					<p className='mb-3'>
						<strong>Our stance</strong>: We only set cookies and
						store browser tokens that are{' '}
						<em>strictly necessary</em> to deliver the service you
						have requested. Specifically:
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							<strong>Clerk session cookies/tokens</strong> -
							required to keep you signed into your account
							between visits.
						</li>
						<li>
							<strong>Supabase session cookies</strong> - required
							for authenticated database access.
						</li>
						<li>
							<strong>Clerk CAPTCHA cookies</strong> - used by
							Clerk&apos;s bot protection to prevent abuse of the
							sign-in/sign-up endpoints (also strictly necessary
							security cookies).
						</li>
					</ul>
					<p className='mt-3'>
						We do <strong>not</strong> use any marketing cookies,
						advertising cookies, analytics cookies, social media
						pixels, or any other non-essential tracking technology.
						Therefore, we do not show a cookie consent banner
						(because we have nothing to consent to). If you wish,
						you can block all cookies via your browser settings, but
						you will be unable to stay signed in.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						11. Children&apos;s Privacy (Age Limits)
					</h2>
					<p className='mb-3'>
						Blend In is not directed at children, and we do not
						knowingly collect any personal data from children.
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>
							Under the GDPR, processing of a child&apos;s data
							based on consent requires parental or guardian
							authorisation.
						</li>
						<li>
							<strong>Our age threshold</strong>: You must be at
							least <strong>16 years old</strong> to create an
							account. If you are aged between 13 and 16, you must
							obtain the consent of your parent or legal holder of
							parental responsibility before using the Service.
						</li>
						<li>
							If we become aware that we hold personal data of a
							child under 16 without valid parental consent, we
							will immediately delete that data and the account.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						12. Security of Your Personal Data (Article 32 GDPR)
					</h2>
					<p className='mb-3'>
						We implement appropriate technical and organisational
						measures (TOMs) to protect your personal data against
						accidental or unlawful destruction, loss, alteration,
						unauthorised disclosure, or access:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>
							All traffic between your browser and our services is
							encrypted with TLS 1.2+ (HTTPS and wss://).
						</li>
						<li>
							Authentication credentials are never handled by our
							servers - they are processed exclusively by Clerk.
						</li>
						<li>
							Database access is restricted via row-level security
							and service-role keys (never exposed to the client).
						</li>
						<li>
							Secrets and API keys are held in environment
							variables, never in source code or public
							repositories.
						</li>
						<li>
							Ephemeral game data is held only in RAM and is never
							written to persistent storage.
						</li>
					</ul>
					<p className='mt-3'>
						In the event of a personal data breach that is likely to
						result in a high risk to your rights and freedoms, we
						will notify you and the competent supervisory authority
						without undue delay, in accordance with Articles 33 and
						34 of the GDPR.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						13. Changes to This Privacy Policy
					</h2>
					<p className='mb-2'>
						We may update this Privacy Policy from time to time to
						reflect changes in our processing, legal requirements,
						or the Services offered.
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>
							We will post the updated version on this page with a
							revised &quot;Last updated&quot; date.
						</li>
						<li>
							If changes are <strong>material</strong> (i.e. they
							impact your rights or our processing activities in a
							significant way), we will additionally notify you
							via a prominent in-Service notice or (where we hold
							an email for you through Clerk) by email, at least
							30 days before the changes take effect.
						</li>
						<li>
							You are free to accept or reject the updated terms.
							Continued use of the Service after changes take
							effect constitutes acceptance. If you do not agree,
							please cease use and delete your account.
						</li>
					</ul>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4'>14. Contact</h2>
					<p>
						For any data protection inquiry, exercise of rights, or
						incident report, please contact the controller at:
					</p>
					<div className='bg-card border border-border rounded-lg p-5 mt-4 not-prose'>
						<p className='font-mono text-base'>
							drinidrizi9@gmail.com
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
