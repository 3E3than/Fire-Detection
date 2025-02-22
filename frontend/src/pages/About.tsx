

export const About = () => {
	return (
		<div id="webcrumbs">
			<div className="w-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl overflow-hidden">
				<div className="text-center py-12 px-6 mb-12">
					<h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Why Wildfire Detection Matters</h2>
					<p className="text-lg max-w-3xl mx-auto">Wildfires cause massive destruction to the environment, wildlife, and human lives. Early detection using AI and IoT can help prevent disasters and save lives.</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
					<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:scale-105 transition-all duration-300">
						<span className="material-symbols-outlined text-5xl text-orange-500">local_fire_department</span>
						<h4 className="text-xl font-bold mt-4 mb-2">Real-Time Detection</h4>
						<p>AI-powered image processing detects wildfires in real-time and sends alerts instantly.</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:scale-105 transition-all duration-300">
						<span className="material-symbols-outlined text-5xl text-orange-500">location_on</span>
						<h4 className="text-xl font-bold mt-4 mb-2">Live Location Tracking</h4>
						<p>Geotagged reports ensure precise location tracking for quick emergency response.</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:scale-105 transition-all duration-300">
						<span className="material-symbols-outlined text-5xl text-orange-500">shield</span>
						<h4 className="text-xl font-bold mt-4 mb-2">Community Safety</h4>
						<p>Users can report fire incidents, helping authorities respond faster.</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:scale-105 transition-all duration-300">
						<span className="material-symbols-outlined text-5xl text-orange-500">smart_toy</span>
						<h4 className="text-xl font-bold mt-4 mb-2">AI & IoT Integration</h4>
						<p>Our system leverages AI & IoT for automated fire detection and cloud-based alerts.</p>
					</div>
					<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:scale-105 transition-all duration-300">
						<span className="material-symbols-outlined text-5xl text-orange-500">monitoring</span>
						<h4 className="text-xl font-bold mt-4 mb-2">Impact & Benefits</h4>
						<p>Reducing wildfire spread, protecting communities, and preventing environmental damage.</p>
					</div>
				</div>

				<div className="mt-16 px-12 text-center">
					<h3 className="text-3xl font-bold mb-6">How Our System Works</h3>
					<p className="text-lg max-w-4xl mx-auto">Our platform uses satellite imagery, drone footage, and real-time camera feeds processed by AI to detect fire outbreaks. IoT devices and GPS tracking ensure accurate location monitoring, enabling fast emergency responses.</p>
				</div>

				<div className="mx-12 mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
					<div className="text-center">
						<h3 className="text-2xl font-bold mb-4">Join Us in Preventing Wildfires</h3>
						<p className="mb-6">Stay alert, report incidents, and help us safeguard lives and nature.</p>
						<button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">Get Involved</button>
					</div>
				</div>

				<div className="mt-16 px-12 pb-12">
					<h3 className="text-3xl font-bold text-center mb-8">Meet the Developers</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

						<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center">
							<div className="w-40 h-40 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mx-auto mb-4 overflow-hidden">
								<img
									src="/images/team/amrit2.jpeg"
									alt="Amrit N. Auji"
									className="object-cover hover:scale-110 transition-transform"
								/>
							</div>
							<h4 className="text-xl font-bold">Amrit N. Auji</h4>
							<p className="text-orange-600">Frontend Developer</p>
							<div className="flex justify-center space-x-4 mt-4">
								<a href="https://www.linkedin.com/in/amrit-auji/" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">link</span>
								</a>
								<a href="https://github.com/amritauji" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">code</span>
								</a>
							</div>
						</div>


						<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center">
							<div className="w-40 h-40 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mx-auto mb-4 overflow-hidden">
								<img
									src="/images/team/ethan.jpg"
									alt="Ethan Chiang"
									className="object-cover hover:scale-110 transition-transform"

								/>
							</div>
							<h4 className="text-xl font-bold">Ethan Chiang</h4>
							<p className="text-orange-600">AI/ML  & Backend Developer</p>
							<div className="flex justify-center space-x-4 mt-4">
								<a href="https://www.linkedin.com/in/ethan-chiang-529a87221/" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">link</span>
								</a>
								<a href="https://github.com/3E3than" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">code</span>
								</a>
							</div>
						</div>


						<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center">
							<div className="w-40 h-40 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mx-auto mb-4 overflow-hidden">
								<img
									src="/images/team/puspa.jpg"
									alt="Puspa Regmi"
									className="object-cover hover:scale-110 transition-transform"

								/>
							</div>
							<h4 className="text-xl font-bold">Puspa Regmi</h4>
							<p className="text-orange-600">FullStack Developer</p>
							<div className="flex justify-center space-x-4 mt-4">
								<a href="https://www.linkedin.com/in/herodebris/" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">link</span>
								</a>
								<a href="https://github.com/Puspa222" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">code</span>
								</a>
							</div>
						</div>


						<div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center">
							<div className="w-40 h-40 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mx-auto mb-4 overflow-hidden">
								<img
									src="/images/team/bhavya.jpg"
									alt="Bhavya Jha"
									className="object-cover hover:scale-110 transition-transform"

								/>
							</div>
							<h4 className="text-xl font-bold">Bhavya Jha</h4>
							<p className="text-orange-600">AI/ML & Backend Developer</p>
							<div className="flex justify-center space-x-4 mt-4">
								<a href="https://www.linkedin.com/in/bhavya-jha-52461b250/" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">link</span>
								</a>
								<a href="https://github.com/amrit" target="_blank" rel="noopener noreferrer">
									<span className="material-symbols-outlined text-orange-500 hover:text-orange-600">code</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

