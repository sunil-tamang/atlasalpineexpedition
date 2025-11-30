document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const keyword = (params.get("q") || "").toLowerCase();
  const date = params.get("date");

  const resultsContainer = document.getElementById("search-results");

  fetch("/search-data.json")
    .then((res) => res.json())
    .then((data) => {
      const results = data.filter((item) => {
        const matchesKeyword = item.title.toLowerCase().includes(keyword);
        const matchesDate = !date || item.date === date;
        return matchesKeyword && matchesDate;
      });

      if (results.length === 0) {
        resultsContainer.innerHTML = `<p>No results found for "<strong>${keyword}</strong>"</p>`;
        return;
      }

      resultsContainer.innerHTML = results
        .map((item) => {
          return `
            <div class="search-result-card">
              <h3>${item.title}</h3>
              <p>Type: ${item.type}</p>
              <p>Departure: ${item.date || "N/A"}</p>
              <p>Price: $${item.price}</p>
              <a href="${item.url}" class="btn">View Trip</a>
            </div>
          `;
        })
        .join("");
    })
    .catch((err) => {
      console.error(err);
      resultsContainer.innerHTML = "<p>Error loading search results.</p>";
    });
});
