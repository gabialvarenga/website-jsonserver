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
// Exemplo simplificado para carregar dinamicamente o carrossel
document.addEventListener('DOMContentLoaded', () => {
  const carouselImages = [
    { src: '/public/assets/img/imagem-chatbot.png', alt: 'tecnologia', title: 'Chatbot', description: 'Descrição do chatbot.', link: 'https://example.com/chatbot' },
    { src: '/public/assets/img/imagem-iot.png', alt: 'inovação', title: 'IoT', description: 'Descrição de IoT.', link: 'https://example.com/iot' },
    // Adicione mais objetos conforme necessário
  ];

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
 
});


  // Carregar dados da página
  getProfileData(userProfileURL, 'about-content');
  getRepoData();
  getTeamData();
  loadCarouselContent();
});
