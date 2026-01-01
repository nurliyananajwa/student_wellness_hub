
document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("categoryFilter");
  const articles = document.querySelectorAll(".article-item");
  const resultCount = document.getElementById("resultCount");

  function updateCount(count) {
    resultCount.textContent = `${count} article(s) found`;
  }

  function filterArticles() {
    const value = filter.value;
    let visible = 0;

    articles.forEach(article => {
      const category = article.dataset.category;

      if (value === "all" || category === value) {
        article.style.display = "";
        visible++;
      } else {
        article.style.display = "none";
      }
    });

    updateCount(visible);
  }

  filter.addEventListener("change", filterArticles);
  updateCount(articles.length);
});