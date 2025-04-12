document.addEventListener("DOMContentLoaded", () => {
  // 1. Modal Trailer
  const showTrailerBtn = document.getElementById("showTrailerBtn");
  const trailerModal = document.getElementById("trailerModal");
  const closeBtn = document.querySelector(".close");

  if (showTrailerBtn && trailerModal && closeBtn) {
    showTrailerBtn.addEventListener("click", () => {
      trailerModal.style.display = "block";
    });
    closeBtn.addEventListener("click", () => {
      trailerModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === trailerModal) trailerModal.style.display = "none";
    });
  }

  // 2. Fetch API for Featured Games
  const gamesContainer = document.getElementById("gamesContainer");
  const apiUrl = "https://api.rawg.io/api/games?page_size=3"; 
  if (gamesContainer) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const games = data.results;
        games.forEach(game => {
          const gameDiv = document.createElement("div");
          gameDiv.classList.add("game");
          const image = game.background_image ? game.background_image : "images/sample1.jpg";
          const released = game.released ? game.released : "N/A";
          gameDiv.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${image}" alt="${game.name}" loading="lazy" width="200" />
            <p>Released: ${released}</p>
          `;
          gamesContainer.appendChild(gameDiv);
        });
      })
      .catch(error => {
        console.error("API fetch error:", error);
        gamesContainer.innerHTML = "<p>Failed to load game data.</p>";
      });
  }

  // 3. Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message!");
      contactForm.reset();
    });
  }

  // 4. Newsletter Modal
  const newsletterModal = document.getElementById("newsletterModal");
  const newsletterForm = document.getElementById("newsletterForm");
  const closeNewsletter = document.querySelector(".close-newsletter");
  setTimeout(() => {
    if (newsletterModal) {
      newsletterModal.style.display = "block";
    }
  }, 10000);
  if (closeNewsletter) {
    closeNewsletter.addEventListener("click", () => {
      newsletterModal.style.display = "none";
    });
  }
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Subscribed successfully!");
      newsletterModal.style.display = "none";
      newsletterForm.reset();
    });
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 6. Sticky Navbar
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  let sticky = header.offsetTop;
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });

  // 7. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
  });

  // 8. Carousel for Promotions
  const carousel = document.getElementById("promoCarousel");
  const slides = carousel ? carousel.getElementsByClassName("slide") : [];
  let currentSlide = 0;
  const totalSlides = slides.length;
  const nextSlideBtn = document.getElementById("nextSlide");
  const prevSlideBtn = document.getElementById("prevSlide");
  function showSlide(index) {
    for (let i = 0; i < totalSlides; i++) {
      slides[i].style.transform = `translateX(-${index * 100}%)`;
    }
  }
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    });
  }
  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    });
  }

  // 9. Search Bar Functionality (simulação de filtragem por tópicos)
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    console.log("Search Query:", query);
    alert("Search feature coming soon for topics: Nintendo, Sony, Microsoft");
  });

  // 10. Mobile Dropdown Menu (caso haja botão mobile)
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      document.querySelector(".nav-menu").classList.toggle("active");
    });
  }

  // 11. Newsletter Email Validation (simples)
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      const email = document.getElementById("newsletterEmail").value;
      if (!email.includes("@")) {
        e.preventDefault();
        alert("Please enter a valid email address.");
      }
    });
  }

  // 12. Countdown Timer for Promotions (caso o elemento exista)
  const countdownElement = document.getElementById("countdownTimer");
  if (countdownElement) {
    let countdownTime = 3600; // segundos
    setInterval(() => {
      const hours = Math.floor(countdownTime / 3600);
      const minutes = Math.floor((countdownTime % 3600) / 60);
      const seconds = countdownTime % 60;
      countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
      if (countdownTime > 0) countdownTime--;
    }, 1000);
  }

  // 13. (Efeito hover já tratado no CSS)

  // 14. Expandable FAQ Section
  const faqs = document.querySelectorAll(".faq");
  faqs.forEach(faq => {
    faq.addEventListener("click", () => {
      faq.classList.toggle("active");
      const answer = faq.querySelector(".faq-answer");
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });

  // 15. Scroll-triggered Animations (fade-in)
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  });
  animatedElements.forEach(el => observer.observe(el));

  // 16. Parallax Effect on Hero Section
  const heroSection = document.getElementById("heroSection");
  window.addEventListener("scroll", () => {
    if (heroSection) {
      heroSection.style.backgroundPositionY = -(window.pageYOffset * 0.5) + "px";
    }
  });

  // 17. Chat Widget Stub
  const chatWidgetBtn = document.getElementById("chatWidgetBtn");
  if (chatWidgetBtn) {
    chatWidgetBtn.addEventListener("click", () => {
      alert("Chat widget coming soon!");
    });
  }

  // 18. Analytics Event Logging (simulação)
  const logEvent = (eventName) => {
    console.log("Analytics Event:", eventName);
  };
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      logEvent("Navigation Click: " + link.textContent);
    });
  });

  // 19. Cookie Consent Banner
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookies = document.getElementById("acceptCookies");
  if (cookieConsent) {
    cookieConsent.style.display = "flex";
    acceptCookies.addEventListener("click", () => {
      cookieConsent.style.display = "none";
      logEvent("Cookie Consent Accepted");
    });
  }

  // 20. Interactive Trending Products List (simulação)
  const trendingToggle = document.getElementById("trendingToggle");
  const trendingList = document.getElementById("trendingList");
  if (trendingToggle && trendingList) {
    trendingToggle.addEventListener("click", () => {
      trendingList.classList.toggle("visible");
    });
  }
});
