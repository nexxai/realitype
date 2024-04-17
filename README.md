# Realitype

This is a proof-of-concept Laravel app / React component that provides some
semblance of autocorrect. It is dependent on a working copy of [Silvio's
LanguageTool](https://github.com/silvio/docker-languagetool) as it uses that
container for the actual spell checking.

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
