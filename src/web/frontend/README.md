q# Checkio Web Frontend

This is the repository for the Checkio web frontend. It is a single page application built with React.

## Tech Stack
- `ReactJs`
- `Tailwindcss`
- `React-router` - For handling routing
- `Tabler-icons` - Icons are from tabler

## Notes

> [!WARNING]
> DO NOT USE `public` folder.
>
> Reason: The frontend is served statically from a flask server.
> When `vite` builds the frontend, it outputs the files in public to root dir of the build dir. This build dir is
> configured to be the `templates` folder in the flask server. Only `index.html` is served from the flask server. The rest
> of the files are served statically from the `templates/assets` folder.
> 
> If there is any static file that needs to be served, it should be placed in the `assets` folder of the folder.
