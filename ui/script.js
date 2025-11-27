
let stockData = [];

function renderStock() {
    const list = document.getElementById('stockList');
    list.innerHTML = '';
    const filter = document.getElementById('filterInput').value.toLowerCase();

    stockData.forEach((item, index) => {
        if (!item.name.toLowerCase().includes(filter)) return;
        const div = document.createElement('div');
        div.className = 'item ' + (item.qty < item.threshold ? 'low-stock' : 'sufficient-stock');
        div.innerHTML = `
            <strong>${item.name}</strong> - Qty: ${item.qty} - Threshold: ${item.threshold}
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const qty = parseInt(document.getElementById('itemQty').value);
    const threshold = parseInt(document.getElementById('itemThreshold').value);
    stockData.push({ name, qty, threshold });
    this.reset();
    renderStock();
});

function editItem(index) {
    const item = stockData[index];
    const newName = prompt("Edit name:", item.name);
    const newQty = parseInt(prompt("Edit quantity:", item.qty));
    const newThreshold = parseInt(prompt("Edit threshold:", item.threshold));
    if (newName && !isNaN(newQty) && !isNaN(newThreshold)) {
        stockData[index] = { name: newName, qty: newQty, threshold: newThreshold };
        renderStock();
    }
}

function deleteItem(index) {
    if (confirm("Delete this item?")) {
        stockData.splice(index, 1);
        renderStock();
    }
}

function filterItems() {
    renderStock();
}

renderStock();
