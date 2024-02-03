import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Guest({ children, header }) {



    return (
        <main className="">
            <nav className="guest_navigation">

                <div className="navbar_buttons">
                    <NavLink href={route('events')} active={route().current('events')}>
                        Events
                    </NavLink>
                    <NavLink href={route('login')} active={route().current('login')}>
                        Login
                    </NavLink>
                    <NavLink href={route('register')} active={route().current('register')}>
                        Register
                    </NavLink>
                </div>

            </nav>



            <div className="">
                {children}
            </div>
        </main>
    );
}
