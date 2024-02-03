import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, canLogin }) {
    console.log(auth)
    return (
        <>
            {!auth.user ? (
                <GuestLayout
                    user={auth.user}
                    header={<h2 className="">Dashboard</h2>}
                >
                    <Head title="Dashboard" />

                    <div className="">
                    </div>
                </GuestLayout>
            ) : (
                <AuthenticatedLayout
                    user={auth.user}
                
                >
                    <Head title="Dashboard" />

                    <div className="">
                    </div>
                </AuthenticatedLayout>
            )}
        </>
    );
}
