function searchBooks() {
    const query = document.getElementById('book').value;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        
        if (data.items) {
          data.items.forEach(book => {
            const bookInfo = book.volumeInfo;
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            
            bookDiv.innerHTML = `
              <h3>${bookInfo.title}</h3>
              <p><strong>Authors:</strong> ${bookInfo.authors ? bookInfo.authors.join(', ') : 'N/A'}</p>
              <p><strong>Published Date:</strong> ${bookInfo.publishedDate || 'N/A'}</p>
              ${bookInfo.imageLinks ? `<img src="${bookInfo.imageLinks.thumbnail}" alt="Book cover" />` : ''}
              <p>${bookInfo.description ? bookInfo.description.substring(0, 500) + '...' : 'No description available'}</p>
            `;
            resultsDiv.appendChild(bookDiv);
          });
        } else {
          resultsDiv.innerHTML = '<p>No results found</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }