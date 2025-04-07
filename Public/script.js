// =================================================================
// 1. NAVBAR SCROLL EFFECT
// =================================================================
document.addEventListener("DOMContentLoaded", function() {
    // Find the navbar element in our HTML
    const navbar = document.querySelector(".navbar");
    // Keep track of our previous scroll position
    let lastScrollTop = 0;
    
    // Make the navbar movement smooth
    navbar.style.transition = "transform 0.5s ease-in-out";
    
    // Listen for scrolling
    window.addEventListener("scroll", () => {
      // Get current scroll position
      let currentScrollPosition = window.scrollY;
      
      // Compare with previous position to determine scroll direction
      if (currentScrollPosition < lastScrollTop) {
        // SCROLLING UP: Show navbar by sliding it down
        navbar.style.transform = "translateY(30px)";
        navbar.style.position = "fixed";
        navbar.style.top = "0";
        navbar.style.width = "100%";
      } else {
        // SCROLLING DOWN: Hide navbar by sliding it up
        navbar.style.transform = "translateY(-100%)";
      }
      
      // Remember this position for next comparison
      lastScrollTop = currentScrollPosition;
    });
  });
  
  // =================================================================
  // 2. MIRROR GALLERY WITH CATEGORIES
  // =================================================================
  document.addEventListener("DOMContentLoaded", function() {
    // Get the container where mirror cards will be displayed
    const mirrorContainer = document.getElementById("mirrorContainer");
    // Get all category filter buttons
    const categoryButtons = document.querySelectorAll(".filter-btn");
    
    // Create an empty array to store our mirror data
    let mirrors = [];
    
    // Step 1: Fetch mirror data from JSON file
    fetch("/Assets/data/mirrors.json")
      .then(response => response.json())
      .then(data => {
        // Save the data to our mirrors array
        mirrors = data;
        // Show the default "featured" category first
        displayMirrors("featured");
      })
      .catch(error => console.error("Error loading mirrors:", error));
    
    // Step 2: Function to display mirrors based on selected category
    function displayMirrors(selectedCategory = "featured") {
      // Clear the container first
      mirrorContainer.innerHTML = "";
      
      // Special handling for "featured" category
      if (selectedCategory === "featured") {
        // We'll show just one mirror from each category
        const displayedCategories = new Set();
        
        mirrors.forEach((mirror, index) => {
          // Only show if we haven't shown this category yet
          if (!displayedCategories.has(mirror.category)) {
            // Mark this category as displayed
            displayedCategories.add(mirror.category);
            // Create a mirror card with "See More" button
            createMirrorCard(mirror, index, true);
          }
        });
      } else {
        // Filter mirrors that match the selected category
        const filteredMirrors = mirrors.filter(mirror => mirror.category === selectedCategory);
        
        // Handle case when no mirrors match the category
        if (filteredMirrors.length === 0) {
          mirrorContainer.innerHTML = `<p class="text-center">No mirrors found for this category.</p>`;
          return;
        }
        
        // Create a card for each mirror in this category
        filteredMirrors.forEach((mirror, index) => createMirrorCard(mirror, index));
      }
    }
    
    // Step 3: Function to create a single mirror card
    function createMirrorCard(mirror, index, isFeatured = false) {
      // Create a new div element for the card
      const mirrorCard = document.createElement("div");
      // Add CSS classes for styling
      mirrorCard.classList.add("col-md-3", "mb-4", "mirror-item");
      // Store the category as a data attribute
      mirrorCard.dataset.category = mirror.category;
      
      // Create the HTML content for the card
      mirrorCard.innerHTML = `
        <div class="card">
          <img src="${mirror.src}" class="card-img-top" alt="${mirror.name}">
          <div class="card-body text-center">
            <h6 class="card-title">${mirror.name}</h6>
            <p class="card-text">${mirror.description}</p>
            ${
              // Show different button based on if it's featured or not
              isFeatured
                ? `<button class="btn btn-primary see-more-btn" data-category="${mirror.category}">See More</button>`
                : `<a href="${mirror.info}" class="btn download-btn" download="${mirror.name}">
                     <i class="bi bi-download"></i> Download
                   </a>`
            }
          </div>
        </div>
      `;
      
      // Add the card to our container
      mirrorContainer.appendChild(mirrorCard);
      
      // Add animation with a slight delay for each card
      setTimeout(() => {
        mirrorCard.classList.add("show");
      }, index * 10);
    }
    
    // Step 4: Handle "See More" button clicks
    mirrorContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("see-more-btn")) {
        // Get the category from the button's data attribute
        const category = e.target.getAttribute("data-category");
        // Display all mirrors from that category
        displayCategoryMirrors(category);
      }
    });
    
    // Step 5: Function to display all mirrors in a category
    function displayCategoryMirrors(category) {
      // Clear the container
      mirrorContainer.innerHTML = "";
      
      // Find all mirrors that belong to this category
      const relatedMirrors = mirrors.filter(mirror => mirror.category === category);
      
      // Create a card for each mirror
      relatedMirrors.forEach((mirror, index) => createMirrorCard(mirror, index));
    }
    
    // Step 6: Handle category filter button clicks
    categoryButtons.forEach(button => {
      button.addEventListener("click", function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");
        
        // Get the category from the button
        const category = this.getAttribute("data-category");
        // Display mirrors for this category
        displayMirrors(category);
      });
    });
  });
  
  // =================================================================
  // 3. CONTACT FORM HANDLING
  // =================================================================
  document.addEventListener("DOMContentLoaded", function() {
    // Get the contact form
    const contactForm = document.getElementById("contactForm");
    
    // Only add event listener if the form exists
    if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
        // Prevent the default form submission
        e.preventDefault();
        // Show success message
        alert("Message sent! We will contact you soon.");
        // Reset form fields
        this.reset();
      });
    }
  });
  
  // =================================================================
  // 4. BACK TO TOP BUTTON
  // =================================================================
  document.addEventListener("DOMContentLoaded", function() {
    // Function to scroll back to top
    window.scrollToTop = function() {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" // Smooth scrolling
      });
    };
    
    // Show/hide back to top button based on scroll position
    window.addEventListener("scroll", () => {
      const backToTopButton = document.getElementById("backToTop");
      if (backToTopButton) {
        // Show button if scrolled down more than 300px
        backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
      }
    });
  });
  
  // =================================================================
  // 5. NEWSLETTER SUBSCRIPTION
  // =================================================================
  document.addEventListener('DOMContentLoaded', function() {
    // Get the newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Only add event listener if the form exists
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        // Prevent the default form submission
        e.preventDefault();
        
        // Get the email input field
        const emailInput = this.querySelector('.newsletter-input');
        
        // Check if email was entered
        if (emailInput.value) {
          // Show success message
          alert('Thank you for subscribing to our newsletter!');
          // Clear the input field
          emailInput.value = '';
        }
      });
    }
  });