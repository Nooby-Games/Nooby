// Array of all pages to search
const pages = [
    'index.html', 'games.html', 'movies.html', 'proxies.html',
    'hacks.html', 'credits.html', 'update-log.html', 'privateBrowser.html'
  ];
  
  // IDs and classes to search within
  const searchableElements = ['#content', '#gameTitle', '#movieTitle', '.hack-name'];
  
  // Function to fetch and parse HTML files
  async function fetchAndParse(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  }
  
  // Function to search through all pages
  async function searchSite(query) {
    const results = [];
  
    for (const page of pages) {
      const doc = await fetchAndParse(page);
      if (doc) {
        for (const selector of searchableElements) {
          const elements = doc.querySelectorAll(selector);
          elements.forEach(element => {
            const content = element.textContent;
            if (content.toLowerCase().includes(query.toLowerCase())) {
              results.push({
                url: `${page}#${element.id || ''}`,
                title: page.replace('.html', ''),
                snippet: content.trim().substring(0, 100) + '...'
              });
            }
          });
        }
      }
    }
  
    return results;
  }
  
  // Function to display search results
  function displayResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
  
    if (results.length === 0) {
      resultsDiv.innerHTML = '<p>No matching results found.</p>';
    } else {
      const ul = document.createElement('ul');
      results.forEach(result => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = result.url;
        a.textContent = result.title;
        li.appendChild(a);
        li.appendChild(document.createElement('br'));
        li.appendChild(document.createTextNode(result.snippet));
        ul.appendChild(li);
      });
      resultsDiv.appendChild(ul);
    }
  }
  
  // Main search function
  async function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query.trim() === '') {
      displayResults([]);
      return;
    }
    const results = await searchSite(query);
    displayResults(results);
  }
  
  // Add event listener to search button
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search.allButton');
    if (searchButton) {
      searchButton.addEventListener('click', performSearch);
    }
  
    // Optional: Add event listener for 'Enter' key in search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }
  });
  