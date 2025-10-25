# Home Media Automation UI

A simple web page for downloading movies and TV shows to your home Jellyfin server.

## What It Does

This tool helps you add movies and shows to your home server without doing it manually.

## How It Works

1. **Pick what you want** - Use the web page to search for movies or shows (gets info from IMDb)
2. **Add to queue** - Your choice gets written to a text file on your home server
3. **Auto download** - Another computer checks the text file and starts downloading
4. **Auto sort** - Downloads go to the right Jellyfin folder:
   - Movies → `/movies`
   - Shows → `/shows`
   - Anime → `/anime`

## The Setup

```
[Web Page] → [Text File] → [Download Script] → [Jellyfin]
```

- Web page runs on one machine
- Text file lives on your home server
- Another machine watches the text file and downloads stuff
- Everything ends up in Jellyfin, ready to watch

## What You Get

- Movie info from IMDb
- Simple text file system
- Everything happens automatically
- Files go to the right folders
- All on your home network

## Setup

TODO

## What You Need

TODO
