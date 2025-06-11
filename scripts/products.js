// Products page JavaScript

let currentCategory = "all"
let allProducts = []

document.addEventListener("DOMContentLoaded", () => {
  // Wait for products data to load
  if (window.productsData) {
    initializeProductsPage()
  } else {
    const checkData = setInterval(() => {
      if (window.productsData) {
        initializeProductsPage()
        clearInterval(checkData)
      }
    }, 100)
  }
})

function initializeProductsPage() {
  // Flatten all products from categories
  allProducts = []
  window.productsData.categories.forEach((category) => {
    category.products.forEach((product) => {
      allProducts.push({
        ...product,
        category: category.slug,
        categoryName: category.name,
      })
    })
  })

  // Load categories sidebar
  loadCategoriesSidebar()

  // Load products
  loadProducts()

  // Setup search functionality
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch)
  }

  // Check for category parameter in URL
  const urlParams = new URLSearchParams(window.location.search)
  const categoryParam = urlParams.get("category")
  if (categoryParam) {
    selectCategory(categoryParam)
  }
}

function loadCategoriesSidebar() {
  const categoryList = document.getElementById("categoryList")
  if (!categoryList) return

  const allCategoryItem = `
    <a href="#" class="category-item ${currentCategory === "all" ? "active" : ""}" onclick="selectCategory('all')">
      All Categories
    </a>
  `

  const categoryItems = window.productsData.categories
    .map(
      (category) => `
      <a href="#" class="category-item ${currentCategory === category.slug ? "active" : ""}" onclick="selectCategory('${category.slug}')">
        ${category.name}
      </a>
    `,
    )
    .join("")

  categoryList.innerHTML = allCategoryItem + categoryItems
}

function selectCategory(categorySlug) {
  currentCategory = categorySlug

  // Update active state in sidebar
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.remove("active")
  })

  const activeItem = document.querySelector(`[onclick="selectCategory('${categorySlug}')"]`)
  if (activeItem) {
    activeItem.classList.add("active")
  }

  // Update page title
  const categoryTitle = document.getElementById("categoryTitle")
  if (categoryTitle) {
    if (categorySlug === "all") {
      categoryTitle.textContent = "All Products"
    } else {
      const category = window.productsData.categories.find((cat) => cat.slug === categorySlug)
      categoryTitle.textContent = category ? category.name : "Products"
    }
  }

  // Update URL without page reload
  const newUrl = categorySlug === "all" ? "products.html" : `products.html?category=${categorySlug}`
  window.history.pushState({}, "", newUrl)

  // Load filtered products
  loadProducts()
}

function loadProducts() {
  const productsGrid = document.getElementById("productsGrid")
  if (!productsGrid) return

  let filteredProducts = allProducts

  // Filter by category
  if (currentCategory !== "all") {
    filteredProducts = allProducts.filter((product) => product.category === currentCategory)
  }

  // Filter by search term
  const searchInput = document.getElementById("searchInput")
  if (searchInput && searchInput.value.trim()) {
    const searchTerm = searchInput.value.toLowerCase().trim()
    filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(searchTerm))
  }

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-box-open"></i>
        <h3>No products found</h3>
        <p>Try adjusting your search or selecting a different category.</p>
      </div>
    `
    return
  }

  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <a href="https://api.whatsapp.com/send?phone=919871124465&text=I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}" 
             target="_blank" 
             class="whatsapp-btn">
            <i class="fab fa-whatsapp"></i>
            Order on WhatsApp
          </a>
        </div>
      </div>
    `,
    )
    .join("")
}

function handleSearch() {
  loadProducts()
}

// Make selectCategory globally available
window.selectCategory = selectCategory
