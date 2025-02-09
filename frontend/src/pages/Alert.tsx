


export const Alert = () => {
  return (
    <div id="webcrumbs"> 
            	<div className='min-h-[800px] bg-white shadow-lg rounded-lg p-8'>
    	  <header className='mb-8'>
    	    <nav className='flex items-center justify-between'>
    	      <div className='flex items-center space-x-6'>
    	        <button className='px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg flex items-center'>
    	          <span className='material-symbols-outlined mr-2'>home</span>
    	          Dashboard
    	        </button>
    	        <button className='px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition-colors rounded-lg flex items-center'>
    	          <span className='material-symbols-outlined mr-2'>notifications</span>
    	          Alerts
    	        </button>
    	        <button className='px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg flex items-center'>
    	          <span className='material-symbols-outlined mr-2'>info</span>
    	          About
    	        </button>
    	      </div>
    	      <div className='relative'>
    	        <input type='text' placeholder='Search location...' className='w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500' />
    	        <span className='material-symbols-outlined absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors'>search</span>
    	      </div>
    	    </nav>
    	  </header>
    	
    	  <main className='space-y-8'>
    	    <section className='bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-lg'>
    	      <h1 className='text-3xl font-bold mb-4'>Emergency Alerts & Safety</h1>
    	      <p className='text-gray-600 mb-6'>Stay informed about potential fire hazards and emergency situations in your area</p>
    	      <div className='grid grid-cols-4 gap-6'>
    	        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
    	          <span className='material-symbols-outlined text-red-500 text-3xl mb-3'>warning</span>
    	          <h3 className='font-semibold mb-2'>Live Fire Alerts</h3>
    	          <p className='text-sm text-gray-600'>Real-time notifications based on your location</p>
    	        </div>
    	        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
    	          <span className='material-symbols-outlined text-blue-500 text-3xl mb-3'>route</span>
    	          <h3 className='font-semibold mb-2'>Evacuation Routes</h3>
    	          <p className='text-sm text-gray-600'>Suggested safe paths to emergency shelters</p>
    	        </div>
    	        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
    	          <span className='material-symbols-outlined text-green-500 text-3xl mb-3'>shield</span>
    	          <h3 className='font-semibold mb-2'>Safety Measures</h3>
    	          <p className='text-sm text-gray-600'>Guidelines for affected areas</p>
    	        </div>
    	        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
    	          <span className='material-symbols-outlined text-purple-500 text-3xl mb-3'>campaign</span>
    	          <h3 className='font-semibold mb-2'>Community Updates</h3>
    	          <p className='text-sm text-gray-600'>Latest news and local information</p>
    	        </div>
    	      </div>
    	    </section>
    	
    	    <section className='grid grid-cols-3 gap-8'>
    	      <div className='col-span-2 bg-white rounded-lg shadow-md p-6'>
    	        <h2 className='text-xl font-semibold mb-6'>Alert Subscription Settings</h2>
    	        <div className='space-y-6'>
    	          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
    	            <div className='flex items-center space-x-4'>
    	              <span className='material-symbols-outlined text-orange-500'>phone_iphone</span>
    	              <div>
    	                <h3 className='font-medium'>SMS Alerts</h3>
    	                <p className='text-sm text-gray-600'>Receive text messages for critical updates</p>
    	              </div>
    	            </div>
    	            <label className='relative inline-flex items-center cursor-pointer'>
    	              <input type='checkbox' className='sr-only peer' />
    	              <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500'></div>
    	            </label>
    	          </div>
    	
    	          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
    	            <div className='flex items-center space-x-4'>
    	              <span className='material-symbols-outlined text-blue-500'>mail</span>
    	              <div>
    	                <h3 className='font-medium'>Email Notifications</h3>
    	                <p className='text-sm text-gray-600'>Daily summaries and reports</p>
    	              </div>
    	            </div>
    	            <label className='relative inline-flex items-center cursor-pointer'>
    	              <input type='checkbox' className='sr-only peer' />
    	              <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500'></div>
    	            </label>
    	          </div>
    	
    	          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
    	            <div className='flex items-center space-x-4'>
    	              <span className='material-symbols-outlined text-green-500'>notifications_active</span>
    	              <div>
    	                <h3 className='font-medium'>Push Notifications</h3>
    	                <p className='text-sm text-gray-600'>Instant alerts on your devices</p>
    	              </div>
    	            </div>
    	            <label className='relative inline-flex items-center cursor-pointer'>
    	              <input type='checkbox' className='sr-only peer' />
    	              <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500'></div>
    	            </label>
    	          </div>
    	        </div>
    	      </div>
    	
    	      <div className='space-y-6'>
    	        <div className='bg-white p-6 rounded-lg shadow-md'>
    	          <h3 className='font-semibold mb-4'>Emergency Contacts</h3>
    	          <div className='space-y-4'>
    	            <button className='w-full p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center justify-between'>
    	              <span className='flex items-center'>
    	                <span className='material-symbols-outlined mr-2'>emergency</span>
    	                Fire Department
    	              </span>
    	              <span className='material-symbols-outlined'>call</span>
    	            </button>
    	            <button className='w-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center justify-between'>
    	              <span className='flex items-center'>
    	                <span className='material-symbols-outlined mr-2'>local_police</span>
    	                Police
    	              </span>
    	              <span className='material-symbols-outlined'>call</span>
    	            </button>
    	            <button className='w-full p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center justify-between'>
    	              <span className='flex items-center'>
    	                <span className='material-symbols-outlined mr-2'>medical_services</span>
    	                Medical Emergency
    	              </span>
    	              <span className='material-symbols-outlined'>call</span>
    	            </button>
    	          </div>
    	        </div>
    	
    	        <div className='bg-white p-6 rounded-lg shadow-md'>
    	          <h3 className='font-semibold mb-4'>Resource Links</h3>
    	          <div className='space-y-3'>
    	            <a href='#' className='block p-3 hover:bg-gray-50 rounded-lg transition-colors'>
    	              <div className='flex items-center justify-between'>
    	                <span className='flex items-center text-blue-600'>
    	                  <span className='material-symbols-outlined mr-2'>description</span>
    	                  Evacuation Guide
    	                </span>
    	                <span className='material-symbols-outlined'>arrow_forward</span>
    	              </div>
    	            </a>
    	            <a href='#' className='block p-3 hover:bg-gray-50 rounded-lg transition-colors'>
    	              <div className='flex items-center justify-between'>
    	                <span className='flex items-center text-blue-600'>
    	                  <span className='material-symbols-outlined mr-2'>map</span>
    	                  Safety Locations
    	                </span>
    	                <span className='material-symbols-outlined'>arrow_forward</span>
    	              </div>
    	            </a>
    	            <a href='#' className='block p-3 hover:bg-gray-50 rounded-lg transition-colors'>
    	              <div className='flex items-center justify-between'>
    	                <span className='flex items-center text-blue-600'>
    	                  <span className='material-symbols-outlined mr-2'>help</span>
    	                  FAQ
    	                </span>
    	                <span className='material-symbols-outlined'>arrow_forward</span>
    	              </div>
    	            </a>
    	          </div>
    	        </div>
    	      </div>
    	    </section>
    	  </main>
    	</div> 
            </div>
  )
}

