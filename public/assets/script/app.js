document.addEventListener('DOMContentLoaded', async () => {
  const userProfileURL = 'https://api.github.com/users/gabialvarenga';
  const userReposURL = 'https://api.github.com/users/gabialvarenga/repos';
  const teamMemberURLs = [
    'https://api.github.com/users/CarlosJFigueiredo',
    'https://api.github.com/users/joaogscc',
    'https://api.github.com/users/luisajardim'
  ];

  const carouselImages = [
    { src: '/public/assets/img/imagem-chatbot.png', alt: 'tecnologia', title: 'Chatbot', description: 'Descrição do chatbot.', link: 'https://example.com/chatbot' },
    { src: '/public/assets/img/imagem-iot.png', alt: 'inovação', title: 'IoT', description: 'Descrição de IoT.', link: 'https://example.com/iot' },
    { src: '/public/assets/img/imagem-realidade-virtual.jpg', alt: 'inteligência artificial', title: 'Realidade Virtual', description: 'Descrição de Realidade Virtual.', link: 'https://example.com/realidade-virtual' },
    { src: '/public/assets/img/imagem_ia.jpeg', alt: 'desenvolvimento', title: 'Desenvolvimento', description: 'Descrição de Desenvolvimento.', link: 'https://example.com/desenvolvimento' },
    { src: '/public/assets/img/imagem-blockchain.png', alt: 'tecnologia emergente', title: 'Blockchain', description: 'Descrição de Blockchain.', link: 'https://example.com/blockchain' }
  ];

  // Função para obter dados dos repositórios do usuário
  async function getRepoData() {
    try {
      const response = await fetch(userReposURL);
      const reposData = await response.json();

      const reposHTML = reposData.map(repo => `
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">${repo.name}</h5>
                <div class="text-end">
                  <ul class="list-inline">
                    <li class="list-inline-item">Estrelas: ${repo.stargazers_count}</li>
                    <li class="list-inline-item">Forks: ${repo.forks_count}</li>
                  </ul>
                </div>
              </div>
              <p class="card-text">${repo.description || 'Sem descrição disponível.'}</p>
              <a href="repo.html?repo=${repo.name}" class="btn btn-primary" target="_blank">Ver repositório</a>
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
        <div class="col-md-4">
          <div class="card">
            <img src="${member.avatar_url}" class="card-img-top" alt="Foto do membro da equipe">
            <div class="card-body">
              <h5 class="card-title">${member.login}</h5>
              <a href="${member.html_url}" class="btn btn-primary" target="_blank">Ver perfil</a>
            </div>
          </div>
        </div>
      `).join('');

      document.getElementById('team-content').innerHTML = teamHTML;
    } catch (error) {
      console.error('Erro ao obter dados da equipe:', error);
    }
  }

  // Função para carregar imagens no carousel
  function loadCarouselContent() {
    const carouselInner = document.querySelector('.carousel-inner');

    const carouselHTML = carouselImages.map((image, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${image.src}" class="d-block w-100" alt="${image.alt}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${image.title}</h5>
          <p>${image.description}</p>
          <a href="${image.link}" class="btn btn-primary" target="_blank">Ver mais</a>
        </div>
      </div>
    `).join('');

    carouselInner.innerHTML = carouselHTML;
  }

  // Função para obter dados do perfil do usuário
   // Função para obter dados do perfil do GitHub
   async function getProfileData(url, targetElementId) {
    try {
      const response = await fetch(url);
      const profileData = await response.json();

      // Inserir imagem do perfil
      const profileImage = document.createElement('img');
      profileImage.src = profileData.avatar_url;
      profileImage.alt = 'Foto de perfil';
      profileImage.classList.add('profile-image');

      // Inserir nome e bio
      const profileContent = document.createElement('div');
      profileContent.innerHTML = `
        <h3>${profileData.name}</h3>
        <p>${profileData.bio || 'Sem bio disponível.'}</p>
        <p>Seguidores: ${profileData.followers}</p>
      `;

      // Inserir elementos no DOM
      const targetElement = document.getElementById(targetElementId);
      targetElement.appendChild(profileImage);
      targetElement.appendChild(profileContent);
    } catch (error) {
      console.error('Erro ao obter dados do perfil:', error);
    }
  }

  // Carregar dados da página
  try {
    await Promise.all([
      getProfileData(userProfileURL, 'about-content'),
      getRepoData(),
      getTeamData()
    ]);
    
    loadCarouselContent();
  } catch (error) {
    console.error('Erro ao carregar dados da página:', error);
  }
});
