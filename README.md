# Verolist

A Yelp-like Angular application for discovering businesses in Lagos, Nigeria. Built with Angular 17, Tailwind CSS, and feature-based architecture.

## Features

- 🏠 **Home Page**: Hero search bar, popular categories, and featured businesses
- 🔍 **Search & Filter**: Search by name/category, filter by area and rating, sort results
- 📍 **Business Details**: Full business information, reviews, contact options (call/WhatsApp)
- ⭐ **Rating System**: Visual star ratings with review counts
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- 🎨 **Modern UI**: Clean, trustworthy design with Tailwind CSS

## Tech Stack

- **Angular 17** (Standalone components)
- **Tailwind CSS** (Styling)
- **TypeScript** (Type safety)
- **RxJS** (Reactive programming)
- **Angular Router** (Navigation)

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # Data services
│   ├── shared/
│   │   └── components/      # Reusable components
│   ├── features/
│   │   ├── home/           # Home page
│   │   ├── search/         # Search results page
│   │   └── business-detail/ # Business detail page
│   ├── app.component.ts    # Root component
│   └── app.routes.ts       # Routing configuration
└── assets/
    └── data/               # Mock JSON data
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Mock Data

The application uses mock JSON data located in `src/assets/data/`:
- `businesses.json`: Sample Lagos businesses
- `reviews.json`: Reviews for businesses

You can modify these files to add more businesses or reviews.

## Categories

- 🍽️ Restaurants
- 💇 Salons
- 🏥 Clinics
- 🚗 Auto Services
- 🔧 Home Services

## Areas Covered

- Lekki
- Ikoyi
- Victoria Island
- Ikeja
- Surulere
- Yaba

## Development

This is a frontend-only application. All data is served from static JSON files. To integrate with a backend API, modify the services in `src/app/core/services/`.

## License

MIT

