const apiUrl = "https://crudcrud.com/api/d385f07bcf3f46efa7d88a4bfc6de728/products"; 
let products = [];


function addProduct() {
    const productName = document.getElementById("productName").value;
    const sellingPrice = parseFloat(document.getElementById("sellingPrice").value);

    if (productName && !isNaN(sellingPrice)) {
        const productData = { name: productName, price: sellingPrice };
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
            .then((response) => response.json())
            .then((data) => {
                products.push(data);
                displayProducts();
                calculateTotalValue();
                // Clear input fields
                document.getElementById("productName").value = "";
                document.getElementById("sellingPrice").value = "";
            })
            .catch((error) => console.error("Error adding product:", error));
    }
}


function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${product.name} - ₹${product.price.toFixed(2)}`;
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete Product";
        deleteButton.onclick = () => deleteProduct(product._id, index);
        listItem.appendChild(deleteButton);
        productList.appendChild(listItem);
    });
}

function deleteProduct(productId, index) {
    const deleteUrl = `${apiUrl}/${productId}`;
    fetch(deleteUrl, {
        method: "DELETE",
    })
        .then(() => {
            products.splice(index, 1);
            displayProducts();
            calculateTotalValue();
        })
        .catch((error) => console.error("Error deleting product:", error));
}

function getProducts() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            products = data;
            displayProducts();
            calculateTotalValue();
        })
        .catch((error) => console.error("Error fetching products:", error));
}

function calculateTotalValue() {
    const totalValueElement = document.getElementById("totalValue");
    const totalValue = products.reduce((total, product) => total + product.price, 0);
    totalValueElement.innerText = `Total: ₹${totalValue.toFixed(2)}`;
}

getProducts();