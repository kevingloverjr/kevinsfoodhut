// Welcome Modal
const welcomeModal = document.getElementById("welcome-modal");
const closeModalBtn = welcomeModal.querySelector(".close-modal");

// Show modal when page loads
window.addEventListener("load", () => {
  welcomeModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

// Close modal when clicking the close button
closeModalBtn.addEventListener("click", () => {
  welcomeModal.classList.remove("show");
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
welcomeModal.addEventListener("click", (e) => {
  welcomeModal.classList.remove("show");
});

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  // Toggle navigation
  navLinks.classList.toggle("nav-active");

  // Animate links
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Hamburger animation
  hamburger.classList.toggle("toggle");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      // Close mobile menu if open
      if (navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active");
        hamburger.classList.remove("toggle");
        links.forEach((link) => {
          link.style.animation = "";
        });
      }

      // Smooth scroll to target
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for fixed header
        behavior: "smooth",
      });
    }
  });
});

// Add shadow to navbar on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Add animation to elements when they come into view
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add CSS for mobile navigation
const style = document.createElement("style");
style.textContent = `
    .nav-links {
        transition: all 0.3s ease-in;
    }

    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 70px;
        background-color: white;
        width: 100%;
        padding: 2rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .nav-active li {
        opacity: 0;
        margin: 1rem 0;
    }

    .toggle span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .toggle span:nth-child(2) {
        opacity: 0;
    }

    .toggle span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

// Navigation Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Menu Category Filtering
const categoryButtons = document.querySelectorAll(".category-btn");
const menuItems = document.querySelectorAll(".menu-item");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.dataset.category;

    menuItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Testimonials Slider
const testimonialsSlider = document.querySelector(".testimonials-slider");
let isDown = false;
let startX;
let scrollLeft;

testimonialsSlider.addEventListener("mousedown", (e) => {
  isDown = true;
  testimonialsSlider.style.cursor = "grabbing";
  startX = e.pageX - testimonialsSlider.offsetLeft;
  scrollLeft = testimonialsSlider.scrollLeft;
});

testimonialsSlider.addEventListener("mouseleave", () => {
  isDown = false;
  testimonialsSlider.style.cursor = "grab";
});

testimonialsSlider.addEventListener("mouseup", () => {
  isDown = false;
  testimonialsSlider.style.cursor = "grab";
});

testimonialsSlider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonialsSlider.offsetLeft;
  const walk = (x - startX) * 2;
  testimonialsSlider.scrollLeft = scrollLeft - walk;
});

// Form Validation
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("error");
      } else {
        field.classList.remove("error");
      }
    });

    if (isValid) {
      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "送信が完了しました。ありがとうございます。";
      form.appendChild(successMessage);

      // Reset form
      form.reset();

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });
});

// Date and Time Validation for Reservation
const reservationForm = document.querySelector(".reservation-form");
if (reservationForm) {
  const dateInput = reservationForm.querySelector("#date");
  const timeInput = reservationForm.querySelector("#time");

  // Set min date to today
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // Set time constraints
  timeInput.addEventListener("change", () => {
    const selectedTime = timeInput.value;
    const [hours, minutes] = selectedTime.split(":").map(Number);

    if (hours < 11 || (hours === 22 && minutes > 0) || hours > 22) {
      timeInput.setCustomValidity("営業時間は11:00から22:00までです。");
    } else {
      timeInput.setCustomValidity("");
    }
  });
}

// Newsletter Form
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "ニュースレターの登録が完了しました。";
    newsletterForm.appendChild(successMessage);

    // Reset form
    newsletterForm.reset();

    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  });
}

// Add CSS for form validation and success messages
const formStyles = document.createElement("style");
formStyles.textContent = `
    .error {
        border-color: #e63946 !important;
    }

    .success-message {
        background-color: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
        animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(formStyles);

// Gallery Image Modal
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.createElement("div");
modal.className = "gallery-modal";
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img src="" alt="Gallery Image">
        <p class="modal-caption"></p>
    </div>
`;

document.body.appendChild(modal);

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-overlay p");

    modal.querySelector("img").src = img.src;
    modal.querySelector(".modal-caption").textContent = caption.textContent;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

modal.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Add CSS for gallery modal
const modalStyles = document.createElement("style");
modalStyles.textContent = `
    .gallery-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }

    .modal-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    }

    .modal-caption {
        color: white;
        text-align: center;
        margin-top: 1rem;
    }

    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
`;

document.head.appendChild(modalStyles);
