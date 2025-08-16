import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, Pencil, PlusCircleIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Person',
        href: '/person',
    },
];

interface Person {
    id: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    gender: string;
    photo: string | null;
    created_at: string;
}

export default function Index({ person }: { person: Person[] }) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flash?.success || flash?.error ? true : false);

    console.log(showAlert, flashMessage, flash);
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);

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
                    <Link as="button" href={route('person.create')} className="flex cursor-pointer rounded-lg bg-blue-800 px-4 py-2 text-white">
                        <PlusCircleIcon className="mr-2" /> Create Person
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-400">
                            <tr>
                                <th className="border p-4">#</th>
                                <th className="border p-4">Name</th>
                                <th className="border p-4">Phone</th>
                                <th className="border p-4">Address</th>
                                <th className="border p-4">City</th>
                                <th className="border p-4">State</th>
                                <th className="border p-4">Zip</th>
                                <th className="border p-4">Gender</th>
                                <th className="border p-4">Photo</th>
                                <th className="border p-4">Actions</th>
                                <th className="border p-4">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {person.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="border px-4 py-2 text-center font-bold">
                                        No person found
                                    </td>
                                </tr>
                            ) : (
                                person.map((p, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2 text-center">{p.name}</td>
                                        <td className="border px-4 py-2 text-center">{p.phone}</td>
                                        <td className="border px-4 py-2 text-center">{p.address}</td>
                                        <td className="border px-4 py-2 text-center">{p.city}</td>
                                        <td className="border px-4 py-2 text-center">{p.state}</td>
                                        <td className="border px-4 py-2 text-center">{p.zip}</td>
                                        <td className="border px-4 py-2 text-center">{p.gender}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <img src={'storage/' + p.photo} alt={p?.name} className="h-12 w-12 rounded-full" />
                                        </td>
                                        <td className="border px-4 py-2 text-center">{p.created_at}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <Link
                                                as="button"
                                                href={route('person.show', p.id)}
                                                className="cursor-pointer rounded-lg bg-blue-800 p-2 text-white"
                                            >
                                                <Eye size={21}></Eye>
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route('person.edit', p.id)}
                                                className="ms-2 cursor-pointer rounded-lg bg-blue-800 p-2 text-white"
                                            >
                                                <Pencil size={21}></Pencil>
                                            </Link>
                                            <Button
                                                className="ms-2 cursor-pointer rounded-lg bg-red-800 p-2 text-white"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this person?')) {
                                                        router.delete(route('person.destroy', p.id), {
                                                            preserveScroll: true,
                                                        });
                                                    }
                                                }}
                                            >
                                                <Trash size={21}></Trash>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
