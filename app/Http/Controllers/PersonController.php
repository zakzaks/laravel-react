<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Person;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\PersonFormRequest;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $person = Person::latest()->get()->map(fn($person) => [
            'id' => $person->id,
            'name' => $person->name,
            'phone' => $person->phone,
            'address' => $person->address,
            'city' => $person->city,
            'state' => $person->state,
            'zip' => $person->zip,
            'gender' => $person->gender,
            'photo' => $person->photo,
            'created_at' => $person->created_at->format('Y-m-d'),
        ]);
        return Inertia::render('person/index', [
            'person' => $person
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('person/person-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PersonFormRequest $request)
    {
        /** @var Request $request */
        try {
            $data = $request->validated();

            if ($request->hasFile('photo')) {
                /** @var UploadedFile $file */
                $file = $request->file('photo');
                $data['photo'] = $file->store('person', 'public');
            } else {
                // Ensure key exists as null if your DB allows nulls
                $data['photo'] = $data['photo'] ?? null;
            }

            $person = Person::create($data);

            if ($person) {
                return redirect()->route('person.index')->with('success', 'Person created successfully.');
            }

            return redirect()->back()->with('error', 'Failed to create person.');
        } catch (\Exception $e) {
            Log::error('Person creation failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An unexpected error occurred while creating the person.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        return Inertia::render('person/person-form', [
            'person' => $person,
            'isView' => true
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person)
    {
        return Inertia::render('person/person-form', [
            'person' => $person,
            'isEdit' => true
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PersonFormRequest $request, Person $person)
    {
        /** @var Request $request */
        $data = $request->validated();
        try {
            if ($person) {
                if ($request->hasFile('photo')) {
                    // Delete old photo if it exists
                    if ($person->photo) {
                        Storage::disk('public')->delete($person->photo);
                    }
                    /** @var UploadedFile $file */
                    $file = $request->file('photo');
                    $data['photo'] = $file->store('person', 'public');
                } else {
                    $data['photo'] = $person->photo;
                }
                $person->update($data);
                return redirect()->route('person.index')->with('success', 'Person updated successfully.');
            }
            return redirect()->back()->with('error', 'Unable to update person. Please try again!');
        } catch (\Exception $e) {
            Log::error('Person update failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An unexpected error occurred while updating the person.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        try {
            if ($person) {
                if ($person->photo) {
                    Storage::disk('public')->delete($person->photo);
                }
                $person->delete();
                return redirect()->back()->with('success', 'Person deleted successfully.');
            }
            return redirect()->back()->with('error', 'Unable to delete person. Please try again!');
        } catch (\Exception $e) {
            Log::error('Person delete failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An unexpected error occurred while deleting the person.');
        }
    }
}
