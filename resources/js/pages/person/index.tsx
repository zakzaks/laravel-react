import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, Eye, Pencil, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
    gender: 'male' | 'female' | 'other' | string;
    photo: string | null;
    created_at: string;
}

export default function Index({ person }: { person: Person[] }) {
    type Flash = { success?: string; error?: string };

    const { flash } = usePage<{ flash?: Flash }>().props;

    const flashMessage = useMemo(() => flash?.success ?? flash?.error ?? '', [flash?.success, flash?.error]);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!flashMessage) return;

        setShowAlert(true);
        const timer = window.setTimeout(() => setShowAlert(false), 5000);
        return () => window.clearTimeout(timer);
    }, [flashMessage]);

    const imgSrc = (p: Person): string | undefined => (p.photo ? `/storage/${p.photo}` : `/storage/user-default.png`);

    const remove = (id: number) => {
        if (confirm('Are you sure you want to delete this person?')) {
            router.delete(route('person.destroy', id), { preserveScroll: true });
        }
    };

    // if (!person.length) {
    //     return <div className="rounded-xl border bg-white p-8 text-center font-semibold">No person found</div>;
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Person" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert className={flash?.success ? 'border-green-900 bg-green-800' : 'border-red-900 bg-red-800'}>
                        <CheckCircle2Icon className={flash?.success ? 'text-green-400' : 'text-red-400'} />
                        <AlertTitle className="text-white">{flash?.success ? 'Success' : 'Error'}</AlertTitle>
                        <AlertDescription className="text-white">{flashMessage}</AlertDescription>
                    </Alert>
                )}
                <div className="ml-auto">
                    <Link
                        as="button"
                        href={route('person.create')}
                        className="flex cursor-pointer rounded-lg bg-blue-800 px-4 py-2 text-sm font-bold text-white"
                    >
                        Create Person
                    </Link>
                </div>

                <div className="rounded-xl border bg-white">
                    {/* Mobile cards */}
                    <ul className="divide-y md:hidden">
                        {person.map((p, i) => (
                            <li key={p.id} className="p-4">
                                <div className="flex items-center gap-3">
                                    <img src={imgSrc(p)} alt={p.name} className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-gray-200" />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {i + 1}. {p.name}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">{p.phone}</p>
                                    </div>
                                    <div className="ml-auto flex gap-2">
                                        <Link
                                            as="button"
                                            href={route('person.show', p.id)}
                                            className="cursor-pointer rounded-lg p-2 ring-1 ring-blue-300 hover:bg-blue-100"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <Link
                                            as="button"
                                            href={route('person.edit', p.id)}
                                            className="cursor-pointer rounded-lg p-2 ring-1 ring-blue-300 hover:bg-blue-100"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => remove(p.id)}
                                            className="cursor-pointer rounded-lg p-2 ring-1 ring-red-300 hover:bg-red-100"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                                    <div>
                                        <span className="font-medium">Gender:</span> {p.gender}
                                    </div>
                                    <div>
                                        <span className="font-medium">ZIP:</span> {p.zip}
                                    </div>
                                    <div className="col-span-2">
                                        <span className="font-medium">Address:</span> {p.address}, {p.city}, {p.state}
                                    </div>
                                    <div className="col-span-2">
                                        <span className="font-medium">Created:</span> {p.created_at}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop table */}
                    <div className="hidden md:block">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-fixed">
                                <thead className="sticky top-0 bg-gray-50">
                                    <tr className="text-left text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                        <th className="w-12 px-4 py-3">#</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Phone</th>
                                        <th className="hidden px-4 py-3 lg:table-cell">Address</th>
                                        <th className="hidden px-4 py-3 xl:table-cell">City</th>
                                        <th className="hidden px-4 py-3 xl:table-cell">State</th>
                                        <th className="hidden px-4 py-3 lg:table-cell">Zip</th>
                                        <th className="px-4 py-3">Gender</th>
                                        <th className="px-4 py-3">Photo</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                        <th className="px-4 py-3">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-sm">
                                    {person.map((p, index) => (
                                        <tr key={p.id} className="odd:bg-white even:bg-gray-50">
                                            <td className="px-4 py-3 text-center">{index + 1}</td>
                                            <td className="truncate px-4 py-3">{p.name}</td>
                                            <td className="px-4 py-3">{p.phone}</td>
                                            <td className="hidden truncate px-4 py-3 lg:table-cell">{p.address}</td>
                                            <td className="hidden truncate px-4 py-3 xl:table-cell">{p.city}</td>
                                            <td className="hidden truncate px-4 py-3 xl:table-cell">{p.state}</td>
                                            <td className="hidden px-4 py-3 lg:table-cell">{p.zip}</td>
                                            <td className="px-4 py-3">
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium capitalize ring-1 ring-gray-200">
                                                    {p.gender}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={imgSrc(p)}
                                                    alt={p.name}
                                                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        as="button"
                                                        href={route('person.show', p.id)}
                                                        className="cursor-pointer rounded-lg p-2 ring-1 ring-blue-300 hover:bg-blue-100"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        href={route('person.edit', p.id)}
                                                        className="cursor-pointer rounded-lg p-2 ring-1 ring-blue-300 hover:bg-blue-100"
                                                    >
                                                        <Pencil size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => remove(p.id)}
                                                        className="cursor-pointer rounded-lg p-2 ring-1 ring-red-300 hover:bg-red-100"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">{p.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
