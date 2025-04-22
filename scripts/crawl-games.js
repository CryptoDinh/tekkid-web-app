const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const GAMEDISTRIBUTION_URL = 'https://gamedistribution.com/games/';
const GAMES_OUTPUT_PATH = path.join(__dirname, '../public/data/games.json');
const CATEGORIES_OUTPUT_PATH = path.join(__dirname, '../public/data/categories.json');

// Categories mapping from GameDistribution to our app
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
  'Trivia': 'trivia',
  'Word': 'word'
};

async function crawlGames() {
  console.log('Starting to crawl games from GameDistribution...');
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to ensure we can see all content
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the games page
    console.log(`Navigating to ${GAMEDISTRIBUTION_URL}...`);
    await page.goto(GAMEDISTRIBUTION_URL, { waitUntil: 'networkidle2' });
    
    // Wait for the games to load
    console.log('Waiting for games to load...');
    await page.waitForSelector('.game-card', { timeout: 30000 });
    
    // Scroll to load more games (adjust the number of scrolls as needed)
    console.log('Scrolling to load more games...');
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(1000);
    }
    
    // Extract games data
    console.log('Extracting games data...');
    const games = await page.evaluate(() => {
      const gameCards = document.querySelectorAll('.game-card');
      return Array.from(gameCards).map((card, index) => {
        // Get game link
        const linkElement = card.querySelector('a');
        const gameUrl = linkElement ? linkElement.href : '';
        
        // Extract slug from URL
        const slugMatch = gameUrl.match(/\/games\/([^\/]+)/);
        const slug = slugMatch ? slugMatch[1] : `game-${index}`;
        
        // Get game image
        const imgElement = card.querySelector('img');
        const image = imgElement ? imgElement.src : '';
        
        // Get game name
        const nameElement = card.querySelector('.game-title');
        const name = nameElement ? nameElement.textContent.trim() : `Game ${index}`;
        
        // Get developer
        const developerElement = card.querySelector('.developer-name');
        const developer = developerElement ? developerElement.textContent.trim() : 'Unknown';
        
        // Get categories
        const categoryElements = card.querySelectorAll('.game-category');
        const categories = Array.from(categoryElements).map(el => el.textContent.trim().toLowerCase());
        
        return {
          game_id: index,
          slug,
          name,
          image,
          plays: Math.floor(Math.random() * 1000), // Random play count
          rating: (Math.random() * 5).toFixed(1), // Random rating
          description: `Description for ${name}. This is a placeholder description.`,
          game_type: 'other',
          mobile: Math.random() > 0.5 ? 1 : 0, // Random mobile support
          video_url: '', // No video URL for now
          gameLink: gameUrl,
          developer,
          categories
        };
      });
    });
    
    // Extract categories
    console.log('Extracting categories...');
    const categories = await page.evaluate(() => {
      const categoryElements = document.querySelectorAll('.category-filter .category-item');
      return Array.from(categoryElements).map((element, index) => {
        const name = element.textContent.trim();
        const slug = CATEGORY_MAPPING[name] || name.toLowerCase().replace(/\s+/g, '-');
        return {
          id: index + 1,
          name,
          slug,
          icon: `/images/categories/${slug}.avif`,
          featured: index < 4 ? 1 : 0 // First 4 categories are featured
        };
      });
    });
    
    // Save games to file
    console.log(`Saving ${games.length} games to ${GAMES_OUTPUT_PATH}...`);
    fs.writeFileSync(GAMES_OUTPUT_PATH, JSON.stringify({ games }, null, 2));
    
    // Save categories to file
    console.log(`Saving ${categories.length} categories to ${CATEGORIES_OUTPUT_PATH}...`);
    fs.writeFileSync(CATEGORIES_OUTPUT_PATH, JSON.stringify({ categories }, null, 2));
    
    console.log('Crawling completed successfully!');
    
  } catch (error) {
    console.error('Error during crawling:', error);
  } finally {
    await browser.close();
  }
}

// Run the crawler
crawlGames(); 