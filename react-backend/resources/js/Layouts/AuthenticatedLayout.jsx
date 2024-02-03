import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <main className="">
            <nav className="auth_navigation">

                <div className="navbar_buttons">


                    <div className="">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </NavLink>
                    </div>
                    <div className="">
                        <NavLink href={route('events')} active={route().current('events')}>
                            Events
                        </NavLink>
                    </div>
                    {user.role_id === 1 &&
                        <div className="">
                            <NavLink href={route('createEvent')} active={route().current('createEvent')}>
                                Create event
                            </NavLink>
                        </div>
                    }
                    <div className="">
                        <NavLink href={route('logout')} method="post" >
                        Log Out
                        </NavLink>
                       
                    </div>
                </div>

                <div className="">
                    <div className="">


                    </div>
                </div>

                <div className="">
                    <button
                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                        className=""
                    >

                    </button>
                </div>


                {/* <div className={(showingNavigationDropdown ? '' : '') + ''}>
                    <div className="">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events')} active={route().current('events')}>
                            Events
                        </ResponsiveNavLink>
                        {user.role_id === 1 &&

                            <ResponsiveNavLink href={route('createEvent')} active={route().current('createEvent')}>
                                Create event
                            </ResponsiveNavLink>
                        }
                    </div>

                    <div className="">
                        <div className="">
                            <div className="">{user.name}</div>
                            <div className="">{user.email}</div>
                        </div>

                        <div className="">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div> */}
            </nav>

            {header && (
                <header className="">
                    <div className="">{header}</div>
                </header>
            )}

            <div>{children}</div>
        </main>
    );
}
