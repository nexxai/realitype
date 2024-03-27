<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WordCheckController extends Controller
{
    public function validate(Request $request)
    {
        $word = $request->input('word');

        $result = $this->check($word);

        return response()->json(['success' => $result['exact'], 'results' => $result]);
    }

    private function check($word)
    {
        $response = Http::asForm()->post(config('services.languagetool.url').'/check', [
            'language' => 'en-US',
            'text' => $word,
        ]);

        $data = $response->json();

        $matches = $data['matches'];

        if (! $matches) {
            // If no matches are returned, then the word is spelled correctly
            return ['exact' => true, 'word' => $word];
        } elseif ($matches[0]['shortMessage'] == 'Spelling mistake') {
            if (! empty($matches[0]['replacements'])) {
                // If the first match is a spelling mistake, then return the corrected word
                return ['exact' => false, 'word' => $matches[0]['replacements'][0]['value'], 'replacement_found' => true];
            }
        }

        return ['exact' => false, 'word' => $word,  'replacement_found' => false];
    }
}
