if (!document.getElementById("my-extension-panel")) {

  const panel = document.createElement("div");
  panel.id = "my-extension-panel";

  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.right = "20px";
  panel.style.zIndex = "999999";
  panel.style.background = "#fff !important";
  panel.style.border = "1px solid #ccc";
  panel.style.padding = "10px";
  panel.style.color = "black !important";
  panel.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  panel.style.fontFamily = "sans-serif";

  panel.innerHTML = `
    <div style="margin-bottom:8px;">
      <input id="my-number" type="number" placeholder="Enter value" style="width:120px;" />
    </div>
    <button id="run-btn">Run</button>
  `;

  document.body.appendChild(panel);

  document.getElementById("run-btn").addEventListener("click", () => {
    const inputValue = parseFloat(document.getElementById("my-number").value);
    if (isNaN(inputValue)) {
      alert("Please enter a valid number");
      return;
    }

    // 🔍 Find target nodes
    const nodes = document.querySelectorAll(".page-item-detail");

    nodes.forEach(node => {
      const child = node.querySelector(".score");
    
      if (!child) {
        
        return;
    }

      const value = parseFloat(child.textContent.trim());
       
      if (isNaN(value)) return;

      // ⚖️ Compare and apply style
      if (value >= inputValue) {
        node.style.opacity = "1";
      } else {
        node.style.opacity = "0.2";
      }
    });
  });
}