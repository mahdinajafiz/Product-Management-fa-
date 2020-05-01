// products's array get products from local storage
let products = getProducts()

// filters for search input & sort prosucts and availableProduct checkbox
let filters = {
    searchItems: '',
    sortBy: "",
    availableProduct: false
}

// sum prodicts's price
let sumPrices = 0
showSum()

// render products 
renderProduct(products, filters)
document.querySelector("#addProduct").addEventListener("submit", (e) => {
    e.preventDefault()
    let time = moment().valueOf()
    products.push({
        id: uuidv4(),
        title: e.target.elements.productTitle.value,
        price: Number(e.target.elements.productPrice.value),
        exist: true,
        created: time,
        updated: time
    })
    renderProduct(products, filters)
    saveProducts(products)
    e.target.elements.productTitle.value = ''
    e.target.elements.productPrice.value = ''
})

//search in products with input
document.querySelector("#search").addEventListener("input", (e) => {
    filters.searchItems = e.target.value
    renderProduct(products, filters)
    saveProducts(products)
})

//available products checkbox
document.querySelector("#availableProducts").addEventListener("change", (e) => {
    filters.availableProduct =e.target.checked
    renderProduct(products, filters)
})

//sort products by created & updated
document.querySelector("#sortProduct").addEventListener("change", (e)=> {
    filters.sortBy = e.target.value
    renderProduct(products, filters)
})

//multi-page synchronization 
window.addEventListener("storage", (e)=> {
    if(e.key === "products"){
        products = JSON.parse(e.newValue)
        renderProduct(products,filters)
        saveProducts(products)
    }
})