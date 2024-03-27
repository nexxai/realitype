<?php

use function Pest\Laravel\post;

it('returns success when a word is spelled correctly', function () {
    post(route('validate'), ['word' => 'hello'])
        ->assertOk()
        ->assertJson([
            'success' => true,
        ]);
});

it('returns failure when a word is spelled incorrectly', function () {
    post(route('validate'), ['word' => 'helol'])
        ->assertJsonFragment([
            'success' => false,
        ]);
});

it('returns a corrected word when the provided word is incorrect', function () {
    post(route('validate'), ['word' => 'helol'])
        ->assertJsonFragment([
            'word' => 'hello',
            'replacement_found' => true,
        ]);
});

it('errors when a replacement word cannot be found', function () {
    post(route('validate'), ['word' => 'dskfjaslfjaskjdfklsad'])
        ->assertJsonFragment([
            'word' => 'dskfjaslfjaskjdfklsad',
            'replacement_found' => false,
        ]);
});

it('returns failure when more than one word is provided', function () {
    post(route('validate'), ['word' => 'hello there'])
        ->assertJsonFragment([
            'success' => false,
        ]);
});
