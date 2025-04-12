document.addEventListener("DOMContentLoaded", () => {
    // -----------------------
    // MODAL TRAILER
    // -----------------------
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
        if (e.target === trailerModal) {
          trailerModal.style.display = "none";
        }
      });
    }
  
    // -----------------------
    // FETCH DE UMA API DE JOGOS
    // -----------------------
    const gamesContainer = document.getElementById("gamesContainer");
    
    // Substitua pela sua API Key ou URL de API desejada.
    // Aqui, usamos a RAWG.io como exemplo (sem key, mas pode ser necessário).
    const apiUrl = "https://api.rawg.io/api/games?page_size=3";
  
    if (gamesContainer) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const games = data.results;
          games.forEach(game => {
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game");
  
            // Verificando imagem de fundo e data de lançamento
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
          console.error("Erro ao buscar dados da API:", error);
          gamesContainer.innerHTML = "<p>Failed to load game data.</p>";
        });
    }
  
    // -----------------------
    // FORMULÁRIO DE CONTATO (exemplo simples)
    // -----------------------
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message!");
        // Aqui você poderia enviar os dados via fetch para um backend, por exemplo.
        contactForm.reset();
      });
    }
  });
  
