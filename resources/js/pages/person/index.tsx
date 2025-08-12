import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Person',
        href: '/person',
    },
];

export default function Index() {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Person" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert
                        variant={'default'}
                        className={`${flash?.success ? 'bg-green-800' : flash?.error ? 'bg-red-800' : ''} ml-auto max-w-md text-white`}
                    >
                        <AlertTitle className="font-bold">{flash?.success ? 'Success' : 'Error'}</AlertTitle>
                        <AlertDescription className="text-white">{flashMessage}</AlertDescription>
                    </Alert>
                )}
                <div className="ml-auto">
                    <Link as="button" href={route('person.create')} className="cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white">
                        Create Person
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-400">
                            <tr>
                                <th className="border p-4">#</th>
                                <th className="border p-4">Name</th>
                                <th className="border p-4">Email</th>
                                <th className="border p-4">Phone</th>
                                <th className="border p-4">Address</th>
                                <th className="border p-4">City</th>
                                <th className="border p-4">State</th>
                                <th className="border p-4">Zip</th>
                                <th className="border p-4">Gender</th>
                                <th className="border p-4">Photo</th>
                                <th className="border p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 text-center">1</td>
                                <td className="border px-4 py-2 text-center">Arief</td>
                                <td className="border px-4 py-2 text-center">arief@example.com</td>
                                <td className="border px-4 py-2 text-center">123-456-7890</td>
                                <td className="border px-4 py-2 text-center">123 Main St</td>
                                <td className="border px-4 py-2 text-center">Anytown</td>
                                <td className="border px-4 py-2 text-center">CA</td>
                                <td className="border px-4 py-2 text-center">12345</td>
                                <td className="border px-4 py-2 text-center">Male</td>
                                <td className="border px-4 py-2 text-center"></td>
                                <td className="border px-4 py-2 text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
