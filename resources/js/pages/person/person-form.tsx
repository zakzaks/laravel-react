import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ ...props }) {
    const { person, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'View ' : isEdit ? 'Update' : 'Add'} Person`,
            href: '/person/create',
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        name: person?.name || '',
        phone: person?.phone || '',
        birth: person?.birth || '',
        address: person?.address || '',
        city: person?.city || '',
        state: person?.state || '',
        zip: person?.zip || '',
        gender: person?.gender || '',
        photo: person?.photo || (null as File | null),
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('photo', e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('person.store'), {
            onSuccess: () => {
                reset();
                console.log('Person created successfully');
            },
            onError: (errors) => console.error('Error creating person', errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isView ? 'View ' : isEdit ? 'Update' : 'Add'} Person`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="ml-auto">
                    <Link href={route('person.index')} className="self-start">
                        &larr; Back to People
                    </Link>
                </div>

                <Card className="flex flex-col gap-4">
                    <CardTitle className="ml-4 text-2xl font-semibold">{`${isView ? 'View ' : isEdit ? 'Update' : 'Add'} Person`}</CardTitle>
                    <CardContent className="flex flex-col gap-4">
                        <form onSubmit={handleSubmit} className="grid gap-4" autoComplete="off">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    tabIndex={1}
                                    autoFocus
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    type="text"
                                    id="address"
                                    name="address"
                                    tabIndex={2}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.address} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    type="text"
                                    id="city"
                                    name="city"
                                    tabIndex={3}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.city} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                    type="text"
                                    id="state"
                                    name="state"
                                    tabIndex={4}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.state} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="zip">Zip</Label>
                                <Input
                                    value={data.zip}
                                    onChange={(e) => setData('zip', e.target.value)}
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    tabIndex={5}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.zip} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    tabIndex={6}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="birth">Birth</Label>
                                <Input
                                    value={data.birth}
                                    onChange={(e) => setData('birth', e.target.value)}
                                    type="date"
                                    id="birth"
                                    name="birth"
                                    tabIndex={7}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.birth} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="gender">Gender</Label>
                                <Input
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    tabIndex={8}
                                    disabled={isView || processing}
                                />
                                <InputError message={errors.gender} />
                            </div>
                            {!isView ? (
                                <div className="grid gap-4">
                                    <Label htmlFor="photo">Photo</Label>
                                    <Input onChange={handleFileUpload} type="file" id="photo" name="photo" tabIndex={8} />
                                    <InputError message={errors.photo} />
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    <Label htmlFor="photo">Photo</Label>
                                    <img src={`/storage/person/${data.photo}`} alt={data.name} className="h-32 w-32 object-cover" />
                                </div>
                            )}

                            {!isView && (
                                <div className="grid gap-4">
                                    <Button className="w-fit cursor-pointer" type="submit">
                                        Save Person
                                    </Button>
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
