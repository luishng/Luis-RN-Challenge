# React Native Developer Challenge

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://expo.dev)
[![Coverage](https://img.shields.io/badge/coverage-90%25-blue)](https://jestjs.io/)
[![Expo SDK](https://img.shields.io/badge/expo--sdk-52%2B-orange)](https://docs.expo.dev)

A mobile app built with Expo Router and TypeScript that fetches articles from Hacker News with offline support, favorites, deleted view, and push notifications.

<h1 align="center">
  <img width="200px" height="350px" src=".github/Home.png" alt="Home">
  <img width="200px" height="350px"src=".github/Favorites.png" alt="Favorites">
  <img width="200px" height="350px"src=".github/Deleted-Articles.png" alt="Deleted Articles">
  <img width="200px" height="350px"src=".github/Notification-preferences.png" alt="Notification Preferences">
</h1>


## Features

- Fetches articles from Hacker News API
- Offline caching (React Query + AsyncStorage)
- Favorite articles
- Swipe to delete (with restore)
- Push notifications based on user preferences (Android/iOS)
- Notification preferences screen

## Tech Stack

- **Expo SDK 52+**
- **TypeScript**
- **React Query**
- **AsyncStorage**
- **expo-notifications**
- **expo-background-fetch**
- **Jest + Testing Library**

## Getting Started

```bash
npm install
npx expo run:android  # If you want choose the device use: npx expo run android -d
```

## Running Tests
```bash
npm test
npm run coverage
```

##### PS: Notifications feature just work using a physical device!