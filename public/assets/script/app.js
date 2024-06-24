document.addEventListener('DOMContentLoaded', () => {
  const userProfileURL = 'https://api.github.com/users/gabialvarenga';
  const userReposURL = 'https://api.github.com/users/gabialvarenga/repos';
  const teamMemberURLs = [
    'https://api.github.com/users/CarlosJFigueiredo',
    'https://api.github.com/users/joaogscc',
    'https://api.github.com/users/luisajardim'
  ];

  const carouselImages = [
    { src: '/public/assets/img/imagem-chatbot.png', alt: 'tecnologia' },
    { src: '/public/assets/img/imagem-iot.png', alt: 'inovação' },
    { src: '/public/assets/img/imagem-realidade-virtual.jpg', alt: 'inteligência artificial' },
    { src: '/public/assets/img/imagem_ia.jpeg', alt: 'desenvolvimento' },
    { src: '/public/assets/img/imagem-blockchain.png', alt: 'tecnologia emergente' }
  ];

  // Função para obter dados do perfil do usuário
  async function getProfileData(url, containerId) {
    try {
      const response = await fetch(url);
      const profileData = await response.json();

      const profileHTML = `
        <img src="${profileData.avatar_url}" alt="Foto de perfil" width="160px" height="160px">
        <div class="text-content">
          <h3>${profileData.name}</h3>
          <p>${profileData.bio || 'Sem biografia disponível.'}</p>
          <div class="info-icons">
            <div class="info-text">
              <p><strong>Localização:</strong> ${profileData.location || 'Não especificado'}</p>
              <p><strong>Faculdade:</strong> PUC Minas</p>
            </div>
            <div class="followers">
              <i class="fa-solid fa-user-friends fa-2x"></i>
              <p>${profileData.followers} seguidores</p>
              <p>${profileData.following} seguindo</p>
            </div>
          </div>
          <div class="social-links">
            <a href="${profileData.html_url}" target="_blank"><i class="fa-brands fa-github"></i></a>
            ${profileData.blog ? `<a href="${profileData.blog}" target="_blank"><i class="fa-solid fa-link"></i></a>` : ''}
          </div>
        </div>
      `;

      document.getElementById(containerId).innerHTML = profileHTML;
    } catch (error) {
      console.error(`Erro ao obter dados do perfil de ${url}:`, error);
    }
  }

  // Função para obter dados dos repositórios do usuário
  async function getRepoData() {
    try {
      const response = await fetch(userReposURL);
      const reposData = await response.json();

      const reposHTML = reposData.map(repo => `
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${repo.name}</h5>
              <p class="card-text">${repo.description || 'Sem descrição disponível.'}</p>
              <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Ver repositório</a>
            </div>
          </div>
        </div>
      `).join('');

      document.getElementById('projects-content').innerHTML = reposHTML;
    } catch (error) {
      console.error('Erro ao obter dados dos repositórios:', error);
    }
  }

  // Função para obter dados dos membros da equipe
  async function getTeamData() {
    try {
      const teamData = await Promise.all(teamMemberURLs.map(async (url) => {
        const response = await fetch(url);
        return await response.json();
      }));

      const teamHTML = teamData.map(member => `
        <div class="team-member">
          <img src="${member.avatar_url}" alt="Foto do membro da equipe">
          <h4>${member.login}</h4>
        </div>
      `).join('');

      document.getElementById('team-content').innerHTML = teamHTML;
    } catch (error) {
      console.error('Erro ao obter dados da equipe:', error);
    }
  }

  // Função para carregar imagens no carousel
  function loadCarouselImages() {
    const carouselInner = document.querySelector('.carousel-inner');

    const carouselHTML = carouselImages.map((image, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${image.src}" class="d-block w-100" alt="${image.alt}">
      </div>
    `).join('');

    carouselInner.innerHTML = carouselHTML;
  }

  // Carregar dados da página
  getProfileData(userProfileURL, 'about-content');
  getRepoData();
  getTeamData();
  loadCarouselImages();
});
