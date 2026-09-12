export const metadata = {
	title: 'Terms of Use | Blend In',
	description:
		'Terms of Use for Blend In - EU / EEA consumer-law compliant, including right of withdrawal, statutory guarantees, and ODR notice.',
};

export default function TermsOfUsePage() {
	return (
		<div className='w-full md:w-3/4 py-12 px-4 md:px-0'>
			<div className='prose prose-neutral dark:prose-invert max-w-none'>
				<h1 className='text-4xl font-bold text-primary mb-4'>
					Terms of Use
				</h1>
				<p className='text-xl text-secondary-foreground mb-2'>
					(EU / EEA Consumer Law Compliant)
				</p>
				<p className='text-muted-foreground mb-8'>
					Last updated: September 13, 2026
				</p>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						1. Parties, Acceptance, and Definitions
					</h2>
					<p className='mb-3'>
						These Terms of Use (&quot;Terms&quot;) are a binding
						contract between <strong>you</strong> (the user) and{' '}
						<strong>Blend In</strong> (&quot;we&quot;,
						&quot;us&quot;, &quot;our&quot;), the operator of the
						Blend In multiplayer game and website. For contact
						details see section 22.
					</p>
					<p className='mb-3'>
						By creating an account, accessing, or using the Blend In
						website, game, or any related features (&quot;the
						Service&quot;), you confirm that you have read,
						understood, and agree to be bound by these Terms in
						full. If you do not agree to these Terms, please do not
						use the Service.
					</p>
					<p>
						You acknowledge that you have also had the opportunity
						to review our{' '}
						<a
							href='/privacy-policy'
							className='text-primary underline'>
							Privacy Policy
						</a>
						, which describes how we handle your personal data.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						2. Description of the Service
					</h2>
					<p>
						Blend In is a multiplayer social deduction party game
						where players take turns saying words associated with a
						secret word, while one or more &quot;imposter&quot;
						players attempt to blend in without knowing the word.
						The Service includes, as available: account creation and
						authentication, room creation and joining, real-time
						chat between players in the same room, random
						AI-generated words/hints, and gameplay mechanics (role
						assignment, voting, elimination, and round progression).
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						3. Account Registration, Age Requirements, and Capacity
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							To use the Service you must register for an account
							via our authentication provider{' '}
							<strong>Clerk</strong>. Supported sign-up methods
							include email/password and third-party OAuth
							providers (e.g. Google).
						</li>
						<li>
							You agree to provide accurate, current, and complete
							information during registration and to update it as
							necessary.
						</li>
						<li>
							You are solely responsible for safeguarding your
							account credentials and for all activity that occurs
							under your account. You must notify us immediately
							of any suspected unauthorised use or security
							breach.
						</li>
						<li>
							<strong>Age thresholds</strong>: You must be at
							least <strong>16 years old</strong> to create an
							account. If you are aged between 13 and 16, you may
							only use the Service after your parent or legal
							holder of parental responsibility has reviewed and
							expressly consented to both the creation of the
							account and these Terms. Accounts believed to belong
							to users under 13, or users 13–16 without valid
							parental consent, will be suspended and deleted.
						</li>
						<li>
							By agreeing to these Terms you confirm that you have
							the legal capacity to enter into a binding contract
							under the law of your country of residence.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						4. User Conduct and Acceptable Use
					</h2>
					<p className='mb-3'>
						You agree to use the Service lawfully, responsibly, and
						respectfully, and <strong>not</strong> to:
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							Use the Service for any unlawful purpose or in
							violation of any applicable law or regulation,
							including in a way that breaches the GDPR or
							national data-protection laws.
						</li>
						<li>
							Harass, threaten, abuse, defraud, defame,
							impersonate, or discriminate against other players
							or persons based on protected characteristics
							(including, but not limited to, gender, race,
							religion, disability, age, or sexual orientation).
						</li>
						<li>
							Post, transmit, or display in chat any content that
							is illegal, hateful, violent, sexually explicit,
							discriminatory, harassing, deceptive, or otherwise
							clearly objectionable.
						</li>
						<li>
							Cheat, exploit bugs, use bots, scripts, hacks, or
							automated tools to gain unfair advantages in the
							game or disrupt gameplay.
						</li>
						<li>
							Attempt to disrupt, compromise, or gain unauthorised
							access to the Service, its servers, accounts not
							your own, or other users&apos; data.
						</li>
						<li>
							Use the Service to send spam, solicitations, scams,
							unsolicited commercial communications, or links to
							third-party services without our permission.
						</li>
						<li>
							Copy, modify, distribute, sell, rent, lease,
							reverse-engineer, decompile, or disassemble any part
							of the Service or its underlying software, except to
							the extent such restriction is expressly prohibited
							by mandatory applicable law (e.g., the EU Software
							Directive).
						</li>
						<li>
							Engage in any activity that could harm, degrade, or
							negatively impact other users&apos; experience or
							the operation of the Service.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						5. Game Rooms, Hosting, and Ephemeral Data
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							<strong>Room Hosts</strong>: When you create a room
							you become the Host. You set the game settings
							(imposter count, categories, hints) and have
							exclusive ability to start, stop, and kick players
							from the room. Host decisions are final for the
							duration of the room.
						</li>
						<li>
							<strong>Room Codes</strong>: Room codes are randomly
							generated. You should only share a room code with
							people you want to invite. Anyone who possesses a
							code can join while the room is open and no game is
							in progress.
						</li>
						<li>
							<strong>No persistence</strong>: Game rooms, chat
							messages, submitted words, votes, settings, and
							results are held <em>only in server memory</em>.
							When a room is closed (all players leave) or the
							server is restarted, all room data is permanently
							deleted and cannot be recovered. Please do not use
							the chat to send information you cannot afford to
							lose.
						</li>
						<li>
							<strong>Kicking and leaving</strong>: Hosts may kick
							members at their discretion, including for
							disruptive behaviour or violation of these Terms.
							Any player may voluntarily leave a room at any time.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						6. User Content (Chat, Display Names, Words) and Content
						Licence
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							You remain{' '}
							<strong>solely legally responsible</strong> for all
							words, chat messages, and display names you submit
							or transmit through the Service. You represent and
							warrant that you have all rights necessary to submit
							such content and that it does not infringe
							third-party rights or any applicable law.
						</li>
						<li>
							By submitting content through the Service, you grant
							us a{' '}
							<strong>
								limited, non-exclusive, royalty-free, worldwide,
								revocable licence
							</strong>{' '}
							to display, transmit, cache, and process that
							content solely for the purpose of running the game
							and showing it to other players in the same room for
							the lifetime of the room.
						</li>
						<li>
							Chat messages and submitted words are temporary and
							not permanently stored by us. However, they are
							visible to other players during the room and may be
							captured or recorded by those players - this is
							outside our control.
						</li>
						<li>
							We are <em>not</em> under a general obligation to
							actively monitor or pre-moderate all chat or user
							content. However, we reserve the right to remove
							content and to suspend or terminate accounts that
							violate these Terms, upon receiving a credible
							report or becoming aware of a breach.
						</li>
						<li>
							We operate as a &quot;hosting provider&quot; within
							the meaning of the EU Digital Services Act (DSA) for
							user-uploaded chat and display-name content. If you
							believe any user content on the Service infringes
							your rights, please notify us at the email address
							in section 22.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						7. Fees, Pricing, and Free-of-Charge Service
					</h2>
					<p>
						At this time, the Service is provided to you{' '}
						<strong>completely free of charge</strong>. There are no
						subscriptions, in-app purchases, pay-to-play features,
						or hidden fees. No monetary consideration of any kind is
						required to create an account or to play the full game.
						We reserve the right to introduce paid features in the
						future, but any such change will be notified in advance
						and will never remove features that were offered free of
						charge at the time you created your account without a
						clear, separate opt-in from you.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						8. Right of Withdrawal (EU / EEA Consumers) - CRD
						Article 9
					</h2>
					<div className='bg-card border border-border rounded-lg p-5 mb-4 not-prose'>
						<p className='font-semibold mb-2'>
							Information about your statutory 14-day right of
							withdrawal
						</p>
						<p className='text-sm mb-2'>
							If you are a consumer resident in the European Union
							or EEA, you have the right to withdraw from this
							contract within 14 days without giving any reason.
							The withdrawal period expires 14 days from the day
							on which you first agreed to these Terms (i.e., the
							day on which you created your account or first used
							the Service).
						</p>
						<p className='text-sm mb-2'>
							To exercise the right of withdrawal, you must inform
							us of your decision by means of a clear statement
							(e.g., a letter sent by post or email). You may use
							the contact details in section 22 below. If you
							prefer, you can simply delete your account through
							your Clerk account settings; this also serves as a
							legally sufficient withdrawal.
						</p>
						<p className='text-sm'>
							If you withdraw, we will reimburse you any sums paid
							to us in relation to the Service. Because the
							Service is currently free of charge, no
							reimbursement will typically be due.
						</p>
					</div>
					<p className='italic text-sm'>
						<strong>Important exception</strong>: Under Article
						16(m) of the EU Consumer Rights Directive (CRD), the
						right of withdrawal does not apply to the supply of
						digital content that is not supplied on a tangible
						medium when the performance has begun with the
						consumer&apos;s prior express consent and the consumer
						has acknowledged loss of the right of withdrawal. By
						agreeing to these Terms and first playing a game, you
						expressly consent to us providing the digital game
						content immediately and you acknowledge that, once
						gameplay begins, the 14-day withdrawal right ceases to
						apply to the game content already performed, while
						remaining in full for any future contractual aspect not
						yet performed. Deleting your account at any time remains
						available to you regardless.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						9. Statutory Consumer Guarantees / Legal Warranty (EU /
						EEA Consumers) - CRD Article 14 &amp; Sale of Goods
						Directive
					</h2>
					<p className='mb-3'>
						If you are a consumer resident in the EU or EEA, nothing
						in these Terms limits or excludes any statutory
						guarantees or warranties that cannot be lawfully
						excluded - including:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>
							The legal guarantee of <strong>conformity</strong>{' '}
							for a period of <strong>2 years</strong> from the
							date you first obtained access to the Service. Under
							this guarantee, we must supply a digital service
							that: (a) matches the description we provided; (b)
							is fit for the purposes for which services of this
							type would normally be used; (c) exhibits the
							quality and performance that may reasonably be
							expected; and (d) complies with applicable laws.
						</li>
						<li>
							If the Service is non-conforming, you have the right
							to require us to bring the Service into conformity,
							at <strong>no cost to you</strong>, through repair
							or, where repair is impossible or disproportionate,
							through a proportionate price reduction or, in
							serious cases, a full termination (refund of any
							sums paid) - in accordance with Articles 19–24 of
							the EU Sale of Goods Directive / national
							implementing laws.
						</li>
					</ul>
					<p className='mt-3'>
						The disclaimers and limitation of liability in sections
						14 and 15 are written to respect and not exceed these
						mandatory statutory guarantees.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						10. Third-Party Services and Sub-Processors
					</h2>
					<p className='mb-3'>
						The Service incorporates or relies on the following
						third-party services. Each one is independently provided
						under its own terms and its own privacy policy, which we
						encourage you to review:
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							<strong>Clerk</strong>: Authentication, account
							management, security, CAPTCHA/bot protection.{' '}
							<a
								href='https://clerk.com/terms'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								Clerk Terms of Service
							</a>{' '}
							/{' '}
							<a
								href='https://clerk.com/privacy'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								Privacy Policy
							</a>
							.
						</li>
						<li>
							<strong>Supabase</strong>: Database hosting for your
							profile record.{' '}
							<a
								href='https://supabase.com/terms'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								Supabase Terms of Service
							</a>{' '}
							/{' '}
							<a
								href='https://supabase.com/privacy'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								Privacy Policy
							</a>
							.
						</li>
						<li>
							<strong>Groq</strong>: AI-powered generation of
							random words and hints at the start of each game.{' '}
							<a
								href='https://groq.com/terms-of-use'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								Groq Terms of Use
							</a>{' '}
							/{' '}
							<a
								href='https://groq.com/privacy-policy'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								Privacy Policy
							</a>
							.
						</li>
					</ul>
					<p className='mt-3'>
						We are not liable for the independent acts, omissions,
						policies, or failures of these third-party providers,
						except to the extent that mandatory consumer-protection
						law provides otherwise.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						11. Intellectual Property Rights
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							Blend In and all its content, features, branding,
							logos, names, domain names, UI elements, and
							software code are and will remain the exclusive
							property of Blend In and our licensors. All rights
							not expressly granted to you in these Terms are
							reserved.
						</li>
						<li>
							Subject to your continued compliance with these
							Terms, we grant you a{' '}
							<strong>
								limited, non-exclusive, non-sublicensable,
								non-transferable, revocable personal licence
							</strong>{' '}
							to access and use the Service for your private,
							non-commercial, entertainment purposes only.
						</li>
						<li>
							Save for the limited licence above, and to the
							fullest extent permissible by law, you may not copy,
							reproduce, distribute, publish, modify, create
							derivative works of, publicly display, publicly
							perform, frame, mirror, scrape, or use any portion
							of the Service or its content without our prior
							written consent.
						</li>
						<li>
							Nothing in this section limits any fair use, fair
							dealing, or similar rights granted by mandatory
							applicable copyright laws.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						12. Third-Party Copyright and Takedown Notices
					</h2>
					<p className='mb-2'>
						We respect the intellectual property rights of others.
						If you believe any content available via the Service
						infringes your copyright, please notify us in writing at
						the email in section 22, including:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>Your identity and contact information;</li>
						<li>
							A sufficient description of the copyrighted work you
							claim has been infringed;
						</li>
						<li>
							The exact URL or location where the allegedly
							infringing material appears; and
						</li>
						<li>
							A statement, made under penalty of perjury, that you
							have the authority to act on behalf of the copyright
							owner and that your complaint is made in good faith.
						</li>
					</ul>
					<p className='mt-3'>
						We will respond to compliant notices promptly and will
						apply a notice-and-takedown procedure consistent with
						the EU DSA, the UK CDPA, and the DMCA, as applicable. We
						will also provide a counter-notification process to
						affected users in accordance with applicable law.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						13. Availability and Maintenance
					</h2>
					<p className='mb-2'>
						We intend the Service to be available continuously, but
						we cannot promise uninterrupted or error-free
						availability. Downtime may occur for scheduled
						maintenance, upgrades, server restarts, network failure,
						or events outside our control.
					</p>
					<p>
						For EU/EEA consumers: where the Service is temporarily
						unavailable for maintenance or other causes within our
						control, we will, where feasible, provide reasonable
						advance notice. Any interruption that would constitute a
						non-conformity under the legal guarantee in section 9
						may be remedied through the remedies described there.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						14. Disclaimers - To the Extent Not Restricted by
						Mandatory Law
					</h2>
					<div className='bg-muted/40 border border-border rounded-lg p-5 mb-4 not-prose'>
						<p className='font-semibold mb-2'>
							Important Notice for Consumers
						</p>
						<p className='text-sm'>
							This section applies{' '}
							<em>only to the extent permitted by law</em>. If you
							are a consumer in the EU/EEA, the legal guarantees
							in section 9 and any other non-excludable
							consumer-protection rights granted by the laws of
							your country of residence take precedence over
							anything in this section.
						</p>
					</div>
					<p className='mb-3'>
						Save as otherwise required by mandatory law (and without
						prejudice to EU/EEA consumer guarantees in section 9),
						THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND
						&quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT
						PERMITTED BY APPLICABLE NON-MANDATORY LAW:
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							We make no representations, warranties, or
							conditions, express or implied, regarding the
							reliability, uninterrupted availability, accuracy,
							merchantability, fitness for a particular purpose,
							or non-infringement of the Service.
						</li>
						<li>
							We do not warrant that the Service will be
							uninterrupted, error-free, secure, or free from
							viruses or other harmful components.
						</li>
						<li>
							AI-generated words and hints are produced by a
							third-party large-language model (Groq) and may
							occasionally be inaccurate, nonsensical, unexpected,
							or offensive. We accept no liability for such
							outputs save for liability that cannot be excluded
							by law.
						</li>
						<li>
							No advice, statement, or information - whether oral
							or written - obtained from us or through the Service
							creates any warranty, guarantee, or condition not
							expressly stated in these Terms.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						15. Limitation of Liability - To the Extent Not
						Restricted by Mandatory Law
					</h2>
					<div className='bg-muted/40 border border-border rounded-lg p-5 mb-4 not-prose'>
						<p className='font-semibold mb-2'>
							Important Notice for Consumers
						</p>
						<p className='text-sm'>
							Nothing in this section is intended to exclude or
							limit: (a) liability for death or personal injury
							caused by our negligence or the negligence of our
							employees or agents; (b) liability for fraud or
							fraudulent misrepresentation; (c) liability for
							breach of the mandatory statutory consumer
							guarantees in section 9; or (d) any other liability
							that cannot lawfully be excluded under the law of
							your country of residence. Such liabilities remain
							fully unaffected.
						</p>
					</div>
					<p className='mb-3'>
						Subject to the carve-outs above and any other
						non-excludable liability under mandatory applicable law,
						IN NO EVENT WILL BLEND IN OR OUR AFFILIATES, OFFICERS,
						EMPLOYEES, PARTNERS, OR LICENSORS BE LIABLE TO YOU FOR:
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							Any indirect, incidental, special, consequential,
							exemplary, or punitive damages, including but not
							limited to loss of profits, loss of data, loss of
							goodwill, or loss of anticipated savings.
						</li>
						<li>
							Any damages resulting from user-to-user conduct,
							chat content, defamation, or disputes between
							players. (Such liability rests solely with the
							actors involved.)
						</li>
						<li>
							Any damages arising from our temporary, lawful
							suspension or termination of an account that has
							materially breached these Terms.
						</li>
					</ul>
					<p className='mt-3'>
						For consumers in the EU/EEA, where the above limitations
						are permitted by law, our total aggregate liability for
						all claims arising under or in connection with these
						Terms or the Service shall in no event exceed the
						greater of: (i) any amount actually paid by you to us in
						the 12 months prior to the first event giving rise to
						liability; or (ii) EUR 50. This cap does not apply to
						liability listed in the carve-out notice above.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						16. Indemnification
					</h2>
					<p>
						To the fullest extent permitted by applicable law, you
						agree to indemnify, defend, and hold harmless Blend In
						and our affiliates, officers, employees, and partners
						from and against any and all claims, liabilities,
						damages, losses, fines, and expenses (including, but not
						limited to, reasonable attorneys&apos; fees and court
						costs) arising out of or related to: (a) your access to
						or use of the Service; (b) your violation of these
						Terms; (c) your user content or chat messages; or (d)
						your violation of any rights of any third person or
						entity. This indemnification does not apply to the
						extent the loss arises from our own proven negligence or
						wilful misconduct.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						17. Suspension, Termination, and Account Deletion
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							<strong>By us</strong>: We reserve the right to
							suspend your access to, or terminate your account
							and these Terms, at any time where: (a) you have
							materially breached these Terms (including, for
							example, harassment, cheating, abusive chat,
							unauthorised access, or repeated lesser violations);
							(b) we are required to do so by law, regulation, or
							a binding court order; or (c) continued provision of
							the Service to you is no longer commercially
							feasible. Where it is practicable and lawful to do
							so, we will provide advance notice and an
							opportunity to remedy. For serious breaches (e.g.,
							threat of harm, cheating, or illegal activity) we
							may act immediately without notice.
						</li>
						<li>
							<strong>By you</strong>: You may stop using the
							Service and terminate these Terms at any time by
							deleting your account through your Clerk account
							settings. Deletion is immediate; your profile record
							in our database is automatically removed within
							seconds.
						</li>
						<li>
							<strong>Effect of termination</strong>: Upon
							termination, all rights and licences granted to you
							in these Terms cease immediately. Any provision
							that, by its nature, ought to survive termination -
							including intellectual property, disclaimers,
							limitation of liability, indemnification,
							governing-law, and dispute-resolution clauses - will
							survive.
						</li>
						<li>
							<strong>For EU/EEA consumers</strong>: Any
							termination by us is without prejudice to any refund
							or remedy to which you may be entitled under
							mandatory law.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						18. Modifications to the Service or These Terms
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							We reserve the right to modify, suspend, or
							discontinue the Service (or any part of it) at any
							time, temporarily or permanently, for technical,
							legal, or commercial reasons.
						</li>
						<li>
							We may update or amend these Terms from time to time
							to reflect, for example, changes in the Service, new
							features, or new legal requirements.
						</li>
						<li>
							If amendments are material (i.e., they significantly
							affect your rights or obligations under the
							contract), we will: (a) revise the &quot;Last
							updated&quot; date on this page; and (b) where you
							are an EU/EEA consumer, provide you with clear
							advance notice of at least <strong>30 days</strong>{' '}
							via an in-Service notice and/or (if we hold an email
							address for you via Clerk) by email, together with a
							clear explanation of the changes.
						</li>
						<li>
							If you are an EU/EEA consumer and you do not accept
							the amended Terms, you may terminate the contract
							without charge and without penalty before the
							amendments take effect simply by stopping use and
							deleting your account. Continued use of the Service
							after the amendments take effect constitutes
							acceptance of the amended Terms.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						19. Governing Law (Dual Rule: EU Consumers vs. Others)
					</h2>
					<ul className='list-disc pl-6 space-y-3'>
						<li>
							<div>
								<p className='font-medium mb-1'>
									If you are a consumer resident in the
									European Union or EEA:
								</p>
								<p>
									These Terms and the contract between us
									shall be governed by the law of the{' '}
									<strong>
										EU/EEA member state in which you have
										your habitual residence
									</strong>
									. Mandatory provisions of the law of that
									state - including the EU Consumer Rights
									Directive, the EU Sale of Goods Directive,
									the GDPR, and national implementing laws -
									shall apply regardless of this choice. Any
									disputes may be brought before the
									<strong>
										courts of your habitual residence
									</strong>{' '}
									as well as any otherwise-competent court;
									you will never be required to travel outside
									your home jurisdiction to pursue a claim
									against us as a consumer.
								</p>
							</div>
						</li>
						<li>
							<div>
								<p className='font-medium mb-1'>
									Users outside the EU / EEA (non-consumer and
									consumer):
								</p>
								<p>
									These Terms and all related non-contractual
									obligations shall be governed by and
									construed in accordance with the laws of the
									jurisdiction in which Blend In is operated,
									without regard to its conflict-of-law rules.
									Any dispute arising out of or relating to
									these Terms or the Service shall be resolved
									in the competent courts of that
									jurisdiction, without prejudice to any
									mandatory forum protections conferred by the
									law of your country of residence.
								</p>
							</div>
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						20. Alternative Dispute Resolution (ADR) and Online
						Dispute Resolution (ODR) - EU Consumers
					</h2>
					<p className='mb-2'>
						If you are a consumer resident in the EU, please note:
					</p>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							The European Commission provides an{' '}
							<strong>
								Online Dispute Resolution (ODR) platform
							</strong>{' '}
							that allows consumers to resolve disputes out of
							court without having to contact us first. You can
							access the platform at:{' '}
							<a
								href='https://ec.europa.eu/consumers/odr'
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline'>
								https://ec.europa.eu/consumers/odr
							</a>
							.
						</li>
						<li>
							If you wish to resolve a dispute with us directly
							through an alternative dispute resolution body,
							please contact us at the email in section 22 and we
							will endeavour to agree on a competent certified ADR
							entity.
						</li>
						<li>
							We are <strong>neither obliged nor willing</strong>{' '}
							to participate in dispute-resolution proceedings
							before a consumer arbitration board, except where we
							are legally required to do so by the law of your
							member state.
						</li>
					</ul>
				</section>

				<section className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>
						21. Severability, Waiver, and Assignment
					</h2>
					<ul className='list-disc pl-6 space-y-2'>
						<li>
							If any provision of these Terms (or part of a
							provision) is held to be unlawful, void, voidable,
							or unenforceable by a court or tribunal of competent
							jurisdiction, that provision shall be severed and
							the remaining provisions shall continue in full
							force and effect to the maximum extent compatible
							with the intention evidenced by the Terms.
						</li>
						<li>
							No failure or delay on our part to exercise or
							enforce any right, power, or remedy under these
							Terms shall operate as a waiver of it; nor shall any
							single or partial exercise preclude any further or
							other exercise.
						</li>
						<li>
							You may not assign or transfer any of your rights or
							obligations under these Terms without our prior
							written consent. We may assign or transfer these
							Terms (in whole or in part) in connection with a
							merger, sale of assets, reorganisation, or change of
							control, provided that EU/EEA consumers are given
							notice and a right to terminate before such transfer
							takes effect if it materially affects their rights.
						</li>
						<li>
							These Terms (together with our Privacy Policy and
							any policies expressly incorporated by reference)
							constitute the entire agreement between you and us
							concerning the Service and supersede all prior oral
							or written understandings on the same subject
							matter.
						</li>
					</ul>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4'>
						22. Contact and Notices
					</h2>
					<p className='mb-3'>
						For questions, complaints, notices, legal requests,
						withdrawals, takedown notices, exercise of consumer-law
						rights, or any other matter related to these Terms or
						the Service, please contact us at:
					</p>
					<div className='bg-card border border-border rounded-lg p-5 mb-6 not-prose'>
						<p className='font-medium mb-1'>Blend In</p>
						<p className='text-sm text-muted-foreground mb-2'>
							For all contractual, legal, and data-protection
							matters:
						</p>
						<p className='font-mono text-base'>
							drinidrizi9@gmail.com
						</p>
					</div>
					<p>
						Any legal notice or formal communication sent to the
						above email address will be deemed received on the day
						of transmission (as evidenced by the sending log). All
						communications will be responded to promptly, and in any
						event within any timeframe required by applicable law
						(e.g., one month for GDPR requests, as described in our
						Privacy Policy).
					</p>
				</section>
			</div>
		</div>
	);
}
