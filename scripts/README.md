# TekKid Web App Scripts

This directory contains utility scripts for the TekKid Web App.

## Game Crawler Script

The `crawl-games.js` script crawls game data from GameDistribution and saves it to the appropriate JSON files in the `public/data` directory.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the scripts directory:
   ```
   cd scripts
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Usage

Run the crawler script:
```
npm run crawl
```
or
```
yarn crawl
```

This will:
1. Navigate to the GameDistribution games page
2. Scroll to load more games
3. Extract game data including name, image, developer, and categories
4. Save the data to `../public/data/games.json` and `../public/data/categories.json`

### Customization

You can modify the script to:
- Change the number of games loaded by adjusting the scroll count
- Add more fields to extract from each game
- Change the output format or location

### Notes

- The script uses Puppeteer to simulate a browser and scrape the data
- Some fields like play count and rating are randomly generated
- The script maps GameDistribution categories to your app's category slugs
- Make sure to respect GameDistribution's terms of service when using this script 