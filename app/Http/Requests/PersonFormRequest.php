<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'birth' => 'required|date',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip' => 'required|string|max:10',
            'gender' => 'required|string|max:10',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'phone.required' => 'Phone is required',
            'birth.required' => 'Birth date is required',
            'address.required' => 'Address is required',
            'city.required' => 'City is required',
            'state.required' => 'State is required',
            'zip.required' => 'Zip code is required',
            'gender.required' => 'Gender is required',
            'photo.image' => 'Photo must be an image',
            'photo.mimes' => 'Photo must be a file of type: jpeg, png, jpg, gif',
            'photo.max' => 'Photo must not be greater than 2048 kilobytes',
        ];
    }
}
