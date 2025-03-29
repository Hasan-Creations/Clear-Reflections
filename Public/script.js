// Navbar position change on scroll with smooth transition
const navbar = document.querySelector(".navbar");
let lastScrollTop = 0; // Stores last scroll position

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY; // Get current scroll position

    if (scrollTop < lastScrollTop) {
        // If scrolling up, show navbar (move down a little for effect)
        navbar.style.transform = "translateY(30px)";
        navbar.style.position = "fixed"; // Keep navbar fixed at the top
        navbar.style.top = "0"; // Set top position
        navbar.style.width = "100%"; // Ensure full width
    } else {
        // If scrolling down, hide navbar (move it up)
        navbar.style.transform = "translateY(-100%)";
    }

    lastScrollTop = scrollTop; // Update last scroll position
}); 

// Apply smooth transition effect
navbar.style.transition = "transform 0.5s ease-in-out";


// Category Scripts
document.addEventListener("DOMContentLoaded", function () {
    const mirrorContainer = document.getElementById("mirrorContainer");
    const categoryButtons = document.querySelectorAll(".filter-btn");

    let mirrors = [];

    // Fetch JSON Data
    fetch("/Assets/data/mirrors.json")
        .then(response => response.json())
        .then(data => {
            mirrors = data;
            displayMirrors("featured"); // Show featured category by default
        })
        .catch(error => console.error("Error loading mirrors:", error));

    // Function to display mirrors
    function displayMirrors(filter = "featured") {
        mirrorContainer.innerHTML = "";

        if (filter === "featured") {
            displayFeaturedMirrors();
        } else {
            const filteredMirrors = mirrors.filter(mirror => mirror.category === filter);

            if (filteredMirrors.length === 0) {
                mirrorContainer.innerHTML = `<p class="text-center">No mirrors found for this category.</p>`;
                return;
            }

            filteredMirrors.forEach((mirror, index) => createMirrorCard(mirror, index));
        }
    }

    // Function to display Featured category (one image per category)
    function displayFeaturedMirrors() {
        const displayedCategories = new Set();

        mirrors.forEach((mirror, index) => {
            if (!displayedCategories.has(mirror.category)) {
                displayedCategories.add(mirror.category);
                createMirrorCard(mirror, index, true);
            }
        });
    }

    // Function to create a mirror card
    function createMirrorCard(mirror, index, isFeatured = false) {
        const mirrorCard = document.createElement("div");
        mirrorCard.classList.add("col-md-3", "mb-4", "mirror-item");
        mirrorCard.dataset.category = mirror.category;
        mirrorCard.innerHTML = `
            <div class="card">
                <img src="${mirror.src}" class="card-img-top" alt="${mirror.name}">
                <div class="card-body text-center">
                    <h6 class="card-title">${mirror.name}</h6>
                    <p class="card-text">${mirror.description}</p>
                    ${isFeatured ? `<button class="btn btn-primary see-more-btn" data-category="${mirror.category}">See More</button>` : ""}
                </div>
            </div>
        `;

        mirrorContainer.appendChild(mirrorCard);

        // Apply animation with a slight delay for each card
        setTimeout(() => {
            mirrorCard.classList.add("show");
        }, index * 10);
    }

    // Handle "See More" button clicks
    mirrorContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("see-more-btn")) {
            const category = e.target.getAttribute("data-category");
            displayCategoryMirrors(category);
        }
    });

    // Function to display full category when "See More" is clicked
    function displayCategoryMirrors(category) {
        mirrorContainer.innerHTML = "";

        const relatedMirrors = mirrors.filter(mirror => mirror.category === category);

        relatedMirrors.forEach((mirror, index) => createMirrorCard(mirror, index));
    }

    // Category filter event
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");
            displayMirrors(category);
        });
    });
});


// contact us session
document.addEventListener("DOMContentLoaded", function () {
    // Form Submission (Dummy Handling)
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message sent! We will contact you soon.");
        this.reset();
    });
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    document.getElementById("backToTop").style.display = window.scrollY > 300 ? "block" : "none";
});