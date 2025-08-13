<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\PersonFormRequest;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $person = Person::latest()->get();
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Person $person)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        //
    }
}
