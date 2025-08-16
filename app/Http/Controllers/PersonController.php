<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Person;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\PersonFormRequest;

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
        try {
            $photo = null;

            if ($request->file('photo')) {
                $photo  = $request->file('photo');
                $photoOriginalName = $photo->getClientOriginalName();
                $photo = $photo->store('person', 'public');
            }

            $person = Person::create([
                'name' => $request->name,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zip' => $request->zip,
                'phone' => $request->phone,
                'gender' => $request->gender,
                'birth' => $request->birth,
                'photo' => $photoOriginalName ?? null,
            ]);
            if ($person) {
                return redirect()->route('person.index')->with('success', 'Person created successfully.');
            } else {
                return redirect()->back()->withErrors('error', 'Failed to create person.');
            }
        } catch (\Exception $e) {
            Log::error('Person creation failed: ' . $e->getMessage());
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
        $data = $request->validated();
        try {
            if ($person) {

                if ($request->file('photo')) {
                    $photo = $request->file('photo');
                    $photo = $photo->store('person', 'public');
                    $data['photo'] = $photo;
                }

                $person->update($data);

                return redirect()->route('person.index')->with('success', 'Person updated successfully.');
            }
            return redirect()->back()->with('error', 'Unable to update person. Please try again!');
        } catch (\Exception $e) {
            Log::error('Person update failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        try {
            if ($person) {
                $person->delete();
                return redirect()->back()->with('success', 'Person deleted successfully.');
            }
            return redirect()->back()->with('error', 'Unable to delete person. Please try again!');
        } catch (\Exception $e) {
            Log::error('Person delete failed: ' . $e->getMessage());
        }
    }
}
