const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const GAME_DISTRIBUTION_URL = 'https://gamedistribution.com/games/';
const OUTPUT_GAMES_PATH = path.join(__dirname, '../src/data/games.json');
const OUTPUT_CATEGORIES_PATH = path.join(__dirname, '../src/data/categories.json');

// Category mapping from Game Distribution to our app
const CATEGORY_MAPPING = {
  'Action': 'action',
  'Adventure': 'adventure',
  'Arcade': 'arcade',
  'Board': 'board',
  'Card': 'card',
  'Casino': 'casino',
  'Educational': 'educational',
  'Puzzle': 'puzzle',
  'Racing': 'racing',
  'Role Playing': 'rpg',
  'Shooter': 'shooter',
  'Simulation': 'simulation',
  'Sports': 'sports',
  'Strategy': 'strategy',
  'Word': 'word'
};

async function crawlGameDetails() {
  console.log('Starting game details crawler...');
  
  // Launch Edge browser
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
    args: ['--start-maximized'],
    executablePath: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    product: 'chrome'
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to game distribution
    console.log('Navigating to Game Distribution...');
    await page.goto(GAME_DISTRIBUTION_URL, { waitUntil: 'networkidle0' });
    
    // Wait for game cards to load
    await page.waitForSelector('.game-card');
    
    // Scroll to load more games
    console.log('Loading more games...');
    let previousHeight = 0;
    let currentHeight = await page.evaluate('document.documentElement.scrollHeight');
    
    while (previousHeight !== currentHeight) {
      previousHeight = currentHeight;
      await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
      await page.waitForTimeout(2000);
      currentHeight = await page.evaluate('document.documentElement.scrollHeight');
    }
    
    // Extract basic game data
    console.log('Extracting game data...');
    const games = await page.evaluate((categoryMapping) => {
      const gameCards = document.querySelectorAll('.game-card');
      return Array.from(gameCards).map(card => {
        const gameId = card.getAttribute('data-game-id');
        const slug = card.querySelector('a').getAttribute('href').split('/').pop();
        const name = card.querySelector('.game-title').textContent.trim();
        const image = card.querySelector('img').getAttribute('src');
        const plays = parseInt(card.querySelector('.game-plays')?.textContent.replace(/,/g, '') || '0');
        const rating = parseFloat(card.querySelector('.game-rating')?.textContent || '0');
        const description = card.querySelector('.game-description')?.textContent.trim() || '';
        const gameType = card.querySelector('.game-type')?.textContent.trim() || '';
        const isMobile = card.querySelector('.mobile-supported') !== null;
        const videoUrl = card.querySelector('video source')?.getAttribute('src') || '';
        const gameLink = card.querySelector('a').getAttribute('href');
        const developer = card.querySelector('.game-developer')?.textContent.trim() || '';
        
        // Extract categories
        const categoryElements = card.querySelectorAll('.game-categories .category');
        const categories = Array.from(categoryElements).map(cat => {
          const categoryName = cat.textContent.trim();
          return categoryMapping[categoryName] || categoryName.toLowerCase();
        });
        
        return {
          id: gameId,
          slug,
          name,
          image,
          plays,
          rating,
          description,
          gameType,
          isMobile,
          videoUrl,
          gameLink,
          developer,
          categories
        };
      });
    }, CATEGORY_MAPPING);
    
    // Extract categories
    console.log('Extracting categories...');
    const categories = Object.values(CATEGORY_MAPPING);
    
    // Save categories
    fs.writeFileSync(OUTPUT_CATEGORIES_PATH, JSON.stringify(categories, null, 2));
    console.log(`Saved ${categories.length} categories to ${OUTPUT_CATEGORIES_PATH}`);
    
    // Crawl individual game pages for more details
    console.log('Crawling individual game pages...');
    const detailedGames = [];
    
    for (const game of games) {
      try {
        console.log(`Crawling details for ${game.name}...`);
        await page.goto(game.gameLink, { waitUntil: 'networkidle0' });
        
        // Extract detailed game information
        const detailedGame = await page.evaluate(() => {
          const description = document.querySelector('.game-description-full')?.textContent.trim() || '';
          const videoUrl = document.querySelector('.game-video source')?.getAttribute('src') || '';
          const playCount = parseInt(document.querySelector('.game-plays-count')?.textContent.replace(/,/g, '') || '0');
          const rating = parseFloat(document.querySelector('.game-rating-value')?.textContent || '0');
          const isMobile = document.querySelector('.mobile-supported') !== null;
          const isFeatured = document.querySelector('.featured-badge') !== null;
          
          return {
            description,
            videoUrl,
            playCount,
            rating,
            isMobile,
            isFeatured
          };
        });
        
        // Merge basic and detailed game data
        detailedGames.push({
          ...game,
          ...detailedGame
        });
        
        // Add delay between requests
        await page.waitForTimeout(1000);
      } catch (error) {
        console.error(`Error crawling details for ${game.name}:`, error);
        // Keep basic game data if detailed crawling fails
        detailedGames.push(game);
      }
    }
    
    // Save games
    fs.writeFileSync(OUTPUT_GAMES_PATH, JSON.stringify(detailedGames, null, 2));
    console.log(`Saved ${detailedGames.length} games to ${OUTPUT_GAMES_PATH}`);
    
  } catch (error) {
    console.error('Error during crawling:', error);
  } finally {
    await browser.close();
    console.log('Crawling completed.');
  }
}

// Run the crawler
crawlGameDetails(); 