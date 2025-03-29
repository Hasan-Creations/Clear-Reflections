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

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 DOM Loaded");

    /*** 🖼️ IMAGE FRAME ANIMATION (Intersection Observer) ***/
    const frames = document.querySelectorAll(".image-frame");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, { threshold: 0.2 });

    frames.forEach(frame => observer.observe(frame));

    
    /*** 🛒 CATEGORY SCRIPT ***/
    const mirrorContainer = document.getElementById("mirrorContainer");
    const categoryButtons = document.querySelectorAll(".filter-btn");
    let mirrors = [];

    fetch("/Assets/data/mirrors.json")
        .then(response => response.json())
        .then(data => {
            mirrors = data;
            displayMirrors("featured");
        })
        .catch(error => console.error("❌ Error loading mirrors:", error));

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
        observeNewCards(); // Observe new elements after displaying
    }

    function displayFeaturedMirrors() {
        const displayedCategories = new Set();
        mirrors.forEach((mirror, index) => {
            if (!displayedCategories.has(mirror.category)) {
                displayedCategories.add(mirror.category);
                createMirrorCard(mirror, index, true);
            }
        });
        observeNewCards(); // Observe new elements after displaying
    }

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
    }

    function observeNewCards() {
        document.querySelectorAll(".mirror-item").forEach(card => observer.observe(card));
    }

    mirrorContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("see-more-btn")) {
            const category = e.target.getAttribute("data-category");
            displayMirrors(category);
        }
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const category = this.getAttribute("data-category");
            displayMirrors(category);
        });
    });

    /*** 📞 CONTACT FORM HANDLING ***/
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("📩 Message sent! We will contact you soon.");
            this.reset();
        });
    }

    /*** ⬆️ BACK TO TOP BUTTON ***/
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
