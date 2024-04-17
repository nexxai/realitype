# Realitype

This is a proof-of-concept Laravel app / React component that provides some
semblance of autocorrect. It is dependent on a working copy of [Silvio's
LanguageTool](https://github.com/silvio/docker-languagetool) as it uses that
container for the actual spell checking.

## Production-ready?

Absolutely not. This was a PoC that I created to see if this could even be
done since it appears that only Safari actually implements the `autocorrect`
property on HTML TextArea elements.

Maybe one day, other browsers will implement it too.

Source:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#autocorrect

## Interesting stuff

The interesting code can be found in `resources/js/Components/TextArea.jsx` and
`resources/js/Pages/Typing.jsx`.

## Installation

1. Copy the `.env.example` file to `.env`
2. `composer install`
3. `bun install`
4. `docker run --rm -d -p 8010:8010 silviof/docker-languagetool`

NOTE: If you choose to expose a different port on the container, you will need
to update the `LANGUAGETOOL_BASE_URL` environment variable.

## Usage

1. `bun run dev`
2. `php artisan serve`
3. Open a browser and navigate to [the web interface demo](http://localhost:8000)

## Digging into the code

If you are interested in the API calls to LanguageTool, they can be found at
`/app/Http/Controllers/WordCheckController.php` The code is most definitely
pretty but it works (most of the time).

## Contributing

All contributions are welcome and I will do my best to incorporate any
submissions promptly. That said, this package will _NOT_ be actively maintained
or updated so if you want to help, please open an issue or PR.
