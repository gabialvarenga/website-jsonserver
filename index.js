const axios = require('axios');
const fs = require('fs');

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

async function getProfileData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter dados do perfil de ${url}:`, error);
    return null;
  }
}

async function getRepoData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados dos repositórios:', error);
    return null;
  }
}

async function getTeamData(urls) {
  const teamDataPromises = urls.map(url => axios.get(url));
  try {
    const teamDataResponses = await Promise.all(teamDataPromises);
    return teamDataResponses.map(response => response.data);
  } catch (error) {
    console.error('Erro ao obter dados da equipe:', error);
    return null;
  }
}

async function salvarDados() {
  const dadosusuario = await getProfileData(userProfileURL);
  const dadosRepositorios = await getRepoData(userReposURL);
  const dadosEquipe = await getTeamData(teamMemberURLs);

  if (dadosusuario && dadosRepositorios && dadosEquipe) {
    const githubUser = {
      id: dadosusuario.id,
      login: dadosusuario.login,
      name: dadosusuario.name,
      bio: dadosusuario.bio,
      location: dadosusuario.location,
      followers: dadosusuario.followers,
      following: dadosusuario.following,
      public_repos: dadosusuario.public_repos,
      public_gists: dadosusuario.public_gists,
      avatar_url: dadosusuario.avatar_url,
      html_url: dadosusuario.html_url,
      blog: dadosusuario.blog
    };

    const repositoriosArray = dadosRepositorios.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      created_at: repo.created_at,
      topics: repo.topics
    }));

    const equipeArray = dadosEquipe.map(member => ({
      id: member.id,
      login: member.login,
      name: member.name,
      avatar_url: member.avatar_url,
      html_url: member.html_url
    }));

    const dadosFinais = {
      usuario: githubUser,
      repositorios: repositoriosArray,
      equipe: equipeArray,
      carrossel: carouselImages
    };

    fs.writeFileSync('./db/db.json', JSON.stringify(dadosFinais, null, 2));
    console.log('Dados do GitHub adicionados ao arquivo db.json com sucesso!');
  } else {
    console.log('Erro ao obter dados do usuário, dos repositórios ou da equipe no GitHub');
  }
}

salvarDados();
