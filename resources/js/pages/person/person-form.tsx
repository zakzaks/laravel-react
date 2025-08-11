import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Person',
        href: '/person/create',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Person" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="ml-auto">
                    <Link href={route('person.index')} className="self-start">
                        &larr; Back to People
                    </Link>
                </div>

                <Card className="flex flex-col gap-4">
                    <CardTitle className="ml-4 text-2xl font-semibold">Add Person</CardTitle>
                    <CardContent className="flex flex-col gap-4">
                        <form className="grid gap-4" autoComplete="off">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name" tabIndex={1} autoFocus />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="address">Address</Label>
                                <Input type="text" id="address" name="address" tabIndex={2} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="city">City</Label>
                                <Input type="text" id="city" name="city" tabIndex={3} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="state">State</Label>
                                <Input type="text" id="state" name="state" tabIndex={4} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="zip">Zip</Label>
                                <Input type="text" id="zip" name="zip" tabIndex={5} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="number" id="phone" name="phone" tabIndex={6} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="birth">Birth</Label>
                                <Input type="date" id="birth" name="birth" tabIndex={7} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="gender">Gender</Label>
                                <Input type="text" id="gender" name="gender" tabIndex={8} />
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="photo">Photo</Label>
                                <Input type="file" id="photo" name="photo" tabIndex={8} />
                            </div>
                            <div className="grid gap-4">
                                <Button className="w-fit cursor-pointer" type="submit">
                                    Save Person
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
