async function loadData() {
    try {
        const response = await fetch('../db/db.json');
        const info = await response.json();

        const user = info.user;  // Verifica se 'user' está presente e não é undefined
        const projects = info.projects;

        // Acessa propriedades do objeto 'user'
        document.getElementById('profile-pic').src = user.profile_image_url;
        document.getElementById('profile-text').getElementsByTagName('h3')[0].textContent = user.full_name;
        document.getElementById('profile-text').getElementsByTagName('p')[0].textContent = user.bio;
        document.getElementById('location').textContent = user.city;
        document.getElementById('followers').textContent = user.followers_count;

        // Preenche cards de projetos
        const projectsSection = document.getElementById('projects');
        const projectsContainer = projectsSection.querySelector('.cards .row');
        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('col');

            card.innerHTML = `
                <div class="card h-100 project" onclick="loadProjectDetails(${project.id})"> 
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.details || 'No details available'}</p>
                        <div class="icons">
                            <i class="fa-solid fa-heart"></i>
                            <p>${project.likes}</p>
                            <i class="fa-solid fa-users"></i>
                            <p>${project.subscribers}</p>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(card);
        });

        // Configura carrossel e equipe
        setupCarousel(info.carousel);
        setupTeam(info.team);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

  
  function setupCarousel(carouselItems) {
    const indicators = document.querySelector('.carousel-indicators');
    const inner = document.querySelector('.carousel-inner');
  
    indicators.innerHTML = '';
    inner.innerHTML = '';
  
    carouselItems.forEach((item, index) => {
      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.dataset.bsTarget = '#carouselExampleIndicators';
      indicator.dataset.bsSlideTo = index;
      indicator.ariaLabel = `Slide ${index + 1}`;
      if (index === 0) {
        indicator.classList.add('active');
        indicator.ariaCurrent = 'true';
      }
      indicators.appendChild(indicator);
  
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }
  
      const img = document.createElement('img');
      img.src = item.image_url;
      img.classList.add('d-block', 'w-100');
      img.alt = item.alt_text;
  
      carouselItem.appendChild(img);
      inner.appendChild(carouselItem);
    });
  }
  
  function setupTeam(teamMembers) {
    const teamContainer = document.querySelector('.team');
  
    teamContainer.innerHTML = '';
  
    teamMembers.forEach(member => {
      const memberDiv = document.createElement('div');
      memberDiv.classList.add('member');
  
      const name = member.name || 'Team Member';
      const githubUsername = member.name ? member.name.toLowerCase().replace(/\s/g, '') : 'github';
  
      memberDiv.innerHTML = `
        <img src="${member.avatar_url}" alt="profile picture of ${name}" width="120px" height="120px">
        <h3><a href="https://github.com/${githubUsername}" target="_blank">${name}</a></h3>
      `;
  
      teamContainer.appendChild(memberDiv);
    });
  }
  
  async function loadProjectDetails(projectId) {
    try {
      const response = await fetch(`../db/db.json`);
      const info = await response.json();
  
      const project = info.projects.find(proj => proj.id === projectId);
  
      window.location.href = `project.html?id=${project.id}&title=${project.title}&details=${encodeURIComponent(project.details || '')}&url=${project.url}&likes=${project.likes}&subscribers=${project.subscribers}&created_at=${project.created_at}&tags=${project.tags}`;
    } catch (error) {
      console.error('Error loading project details:', error);
    }
  }
  
  loadData();
  