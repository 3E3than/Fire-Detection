import React, { useState } from 'react';

export const Alert: React.FC = () => {
	const [isEmailEnabled, setIsEmailEnabled] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [showEmailInput, setShowEmailInput] = useState<boolean>(false);

	const handleEmailToggle = (): void => {
		if (!isEmailEnabled) {
			setShowEmailInput(true);
		} else {
			setShowEmailInput(false);
			setEmail('');
		}
		setIsEmailEnabled(!isEmailEnabled);
	};

	const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		// Here you can handle the email submission, e.g., send it to an API or store it in state
		console.log('Email submitted:', email);
		setShowEmailInput(false);
	};

	return (
		<>
			<div id="webcrumbs">
				<main className="space-y-8">
					<section className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-lg">
						<h1 className="text-3xl font-bold mb-4">Emergency Alerts & Safety</h1>
						<p className="text-gray-600 mb-6">
							Stay informed about potential fire hazards and emergency situations in your area
						</p>
						<div className="grid grid-cols-4 gap-6">
							<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
								<span className="material-symbols-outlined text-red-500 text-3xl mb-3">warning</span>
								<h3 className="font-semibold mb-2">Live Fire Alerts</h3>
								<p className="text-sm text-gray-600">Real-time notifications based on your location</p>
							</div>
							<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
								<span className="material-symbols-outlined text-blue-500 text-3xl mb-3">route</span>
								<h3 className="font-semibold mb-2">Evacuation Routes</h3>
								<p className="text-sm text-gray-600">Suggested safe paths to emergency shelters</p>
							</div>
							<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
								<span className="material-symbols-outlined text-green-500 text-3xl mb-3">shield</span>
								<h3 className="font-semibold mb-2">Safety Measures</h3>
								<p className="text-sm text-gray-600">Guidelines for affected areas</p>
							</div>
							<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
								<span className="material-symbols-outlined text-purple-500 text-3xl mb-3">campaign</span>
								<h3 className="font-semibold mb-2">Community Updates</h3>
								<p className="text-sm text-gray-600">Latest news and local information</p>
							</div>
						</div>
					</section>

					<section className="grid grid-cols-3 gap-8">
						<div className="col-span-2 bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-6">Alert Subscription Settings</h2>
							<div className="space-y-6">
								<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
									<div className="flex items-center space-x-4">
										<span className="material-symbols-outlined text-blue-500">mail</span>
										<div>
											<h3 className="font-medium">Email Notifications</h3>
											<p className="text-sm text-gray-600">Daily summaries and reports</p>
										</div>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="sr-only peer"
											checked={isEmailEnabled}
											onChange={handleEmailToggle}
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
									</label>
								</div>

								{showEmailInput && (
									<form onSubmit={handleEmailSubmit} className="mt-4">
										<div className="flex items-center space-x-4">
											<input
												type="email"
												placeholder="Enter your email"
												value={email}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
												className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
												required
											/>
											<button
												type="submit"
												className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
											>
												Submit
											</button>
										</div>
									</form>
								)}
							</div>
						</div>

						<div className="space-y-6">
							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="font-semibold mb-4">Emergency Contacts</h3>
								<div className="space-y-4">
									<button className="w-full p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center justify-between">
										<span className="flex items-center">
											<span className="material-symbols-outlined mr-2">emergency</span>
											Fire Department
										</span>
										<span className="text-sm font-medium">101</span>
									</button>
									<button className="w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center justify-between">
										<span className="flex items-center">
											<span className="material-symbols-outlined mr-2">local_police</span>
											Police
										</span>
										<span className="text-sm font-medium">100</span>
									</button>
									<button className="w-full p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center justify-between">
										<span className="flex items-center">
											<span className="material-symbols-outlined mr-2">medical_services</span>
											Medical Emergency
										</span>
										<span className="text-sm font-medium">102</span>
									</button>
								</div>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="font-semibold mb-4">Resource Links</h3>
								<div className="space-y-3">
									<a
										href="https://www.ready.gov/sites/default/files/2020-03/ready_emergency-evacuation-planning-guide.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
									>
										<div className="flex items-center justify-between">
											<span className="flex items-center text-blue-600">
												<span className="material-symbols-outlined mr-2">description</span>
												Evacuation Guide (PDF)
											</span>
											<span className="material-symbols-outlined">arrow_forward</span>
										</div>
									</a>
									<a
										href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html"
										target="_blank"
										rel="noopener noreferrer"
										className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
									>
										<div className="flex items-center justify-between">
											<span className="flex items-center text-blue-600">
												<span className="material-symbols-outlined mr-2">map</span>
												Fire Safety Tips
											</span>
											<span className="material-symbols-outlined">arrow_forward</span>
										</div>
									</a>
									<a
										href="https://www.cdc.gov/disasters/index.html"
										target="_blank"
										rel="noopener noreferrer"
										className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
									>
										<div className="flex items-center justify-between">
											<span className="flex items-center text-blue-600">
												<span className="material-symbols-outlined mr-2">help</span>
												Disaster Preparedness (CDC)
											</span>
											<span className="material-symbols-outlined">arrow_forward</span>
										</div>
									</a>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};