// Contact page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize contact form
  initializeContactForm()

  // Initialize FAQ functionality
  initializeFAQ()
})

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Validate form
      const inputs = this.querySelectorAll("input[required], select[required], textarea[required]")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = "#ef4444"
        } else {
          input.style.borderColor = "#e2e8f0"
        }
      })

      if (isValid) {
        // Simulate form submission
        alert("Thank you for your message! We will get back to you within 24 hours.")
        this.reset()
      } else {
        alert("Please fill in all required fields.")
      }
    })

    // Reset border color on input
    const inputs = contactForm.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        this.style.borderColor = "#e2e8f0"
      })
    })
  }
}

// FAQ functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Declare showNotification function
function showNotification(message, type) {
  alert(message)
}
