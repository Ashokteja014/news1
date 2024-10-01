const API_KEY = 'f404afe77a904690975fc72d17ac0c21';  // Replace with your News API key
const newsSection = document.getElementById('news-section');

async function fetchNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.status !== 'ok') {
      console.error('API Error:', data.message);
      newsSection.innerHTML = `<p>Error fetching news: ${data.message}</p>`;
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    newsSection.innerHTML = `<p>There was an error fetching the news. Please try again later.</p>`;
  }
}

function displayNews(articles) {
  newsSection.innerHTML = ''; // Clear previous articles

  if (articles.length === 0) {
    newsSection.innerHTML = `<p>No news articles available.</p>`;
    return;
  }

  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.classList.add('news-card');

    newsCard.innerHTML = `
      <img src="${article.urlToImage || 'default-image.jpg'}" alt="News Image">
      <h2>${article.title || 'No title available'}</h2>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsSection.appendChild(newsCard);
  });
}

document.addEventListener('DOMContentLoaded', fetchNews);
