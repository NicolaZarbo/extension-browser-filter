function filteroni() {
  const inputValue = parseFloat(document.getElementById("my-number").value);
  if (isNaN(inputValue)) {
    alert("Please enter a valid number");
    return;
  }

  const mangaHigherScores = [];
  const nodes = document.querySelectorAll(".page-item-detail");

  nodes.forEach(node => {
    const child = node.querySelector(".score");

    if (!child) {

      return;
    }

    const value = parseFloat(child.textContent.trim());
    if (isNaN(value)) return;


    if (value >= inputValue) {
      mangaHigherScores.push(node);

    }
  });
  document.querySelectorAll(".page-listing-item").forEach(item => {
    item.style.display = "none";
  });
  base = document.querySelector("#loop-content");
  for (i = 0; i < mangaHigherScores.length / 2; i++) {
    pageListingItem = document.createElement("div");
    pageListingItem.className = "page-listing-item";
    pageListingItem.style.display = "block";

    con = document.createElement("div");
    con.className = "row row-eq-height";

    first = document.createElement("div");
    first.className = "col-12 col-md-6 badge-pos-2";
    first.appendChild(mangaHigherScores[i * 2]);
    con.appendChild(first);
    if (mangaHigherScores[i * 2 + 1]) {
      sec = document.createElement("div");
      sec.className = "col-12 col-md-6 badge-pos-2";
      sec.appendChild(mangaHigherScores[i * 2 + 1]);
      con.appendChild(sec);
    }
    pageListingItem.appendChild(con);
    base.appendChild(pageListingItem);
  }


}
if (!document.getElementById("my-extension-panel")) {

  const panel = document.createElement("div");
  panel.id = "my-extension-panel";

  panel.style.position = "fixed";
  panel.style.top = "60px";
  panel.style.right = "20px";
  panel.style.zIndex = "999999";
  panel.style.background = "#262626";
  panel.style.border = "1px solid #ccc";
  panel.style.padding = "10px";
  panel.style.color = "#888888";
  panel.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  panel.style.fontFamily = "sans-serif";

  panel.innerHTML = `
    <div style="margin-bottom:8px;">
      <input id="my-number" placeholder="Enter value" style="width:120px;" />
    </div>
    <button id="run-btn">Run</button>
  `;

  document.body.appendChild(panel);


  document.getElementById("run-btn").addEventListener("click", () => {
    filteroni();
    document.getElementById("navigation-ajax").addEventListener("click", () => {
      const initialCount = document.querySelectorAll(".page-item-detail").length;
      const observer = new MutationObserver(() => {
        const currentCount = document.querySelectorAll(".page-item-detail").length;

        if (currentCount > initialCount) {
          observer.disconnect();
          filteroni();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  });

}