import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <header className='mb-8'>
            <nav className='flex items-center justify-between'>
                <div className='flex items-center space-x-6'>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${isActive ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`
                        }
                    >
                        <span className='material-symbols-outlined mr-2'>home</span>
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/alert" 
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${isActive ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`
                        }
                    >
                        <span className='material-symbols-outlined mr-2'>notifications</span>
                        Alerts
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${isActive ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`
                        }
                    >
                        <span className='material-symbols-outlined mr-2'>info</span>
                        About
                    </NavLink>
                </div>
                <div className='relative'>
                    <input 
                        type='text' 
                        placeholder='Search location...' 
                        className='w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500' 
                    />
                    <span className='material-symbols-outlined absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors'>
                        search
                    </span>
                </div>
            </nav>
        </header>
    );
};