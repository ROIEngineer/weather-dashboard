## Weather App

A React weather application that fetches current conditions and a 5-day forecast
by city or location using OpenWeatherMap. Built with a custom `useWeather` hook to separate business
logic from UI.

## Live Demo
Live Demo: https://your-vercel-link.vercel.app

## Features

* Search weather by city
* Use current location (Geolocation API)
* Toggle Celsius / Fahrenheit
* 5-day forecast
* Persistent user preferences (localStorage)
* Graceful loading and error states

## Architecture

The application uses a custom React hook (`useWeather`) to encapsulate:

* API communication
* side effects (`useEffect`)
* persistence
* geolocation

UI components remain stateless and declarative.

SearchBar / UnitToggle
↓
useWeather
↓
Weather API

## Design Decisions

* Fetching is handled in `useEffect` to keep the app declarative
* State changes drive side effects instead of event handlers
* Intent-based functions (`searchCity`, `useLocation`) are exposed instead of raw setters

## Tech Stack

* React (Vite)
* OpenWeatherMap API
* Browser Geolocation API
* CSS (no UI framework)

## Running Locally

1. Clone the repo
2. Create a `.env` file with:
   VITE_OPENWEATHERMAP_KEY=your_key_here
3. npm install
4. npm run dev
