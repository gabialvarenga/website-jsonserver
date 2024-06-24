const axios = require('axios');
const fs = require('fs');

const getGithubData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter dados da URL ${url}:`, error);
    return null;
  }
};

const fetchUserData = async (username) => {
  return await getGithubData(`https://api.github.com/users/${username}`);
};

const fetchUserRepos = async (username) => {
  return await getGithubData(`https://api.github.com/users/${username}/repos`);
};

const fetchCollaboratorsData = async (usernames) => {
  const collaboratorPromises = usernames.map(async (username) => {
    const userData = await fetchUserData(username);
    if (userData) {
      return {
        id: userData.id,
        name: userData.name,
        avatar_url: userData.avatar_url
      };
    }
  });

  const collaborators = await Promise.all(collaboratorPromises);
  return collaborators.filter(collaborator => collaborator !== undefined);
};

const buildUserObject = (data) => {
  if (!data) return null;
  return {
    id: data.id,
    login: data.login,
    name: data.name,
    bio: data.bio,
    location: data.location,
    followers: data.followers,
    following: data.following,
    public_repos: data.public_repos,
    public_gists: data.public_gists,
    avatar_url: data.avatar_url
  };
};

const buildReposArray = (repos) => {
  if (!repos) return [];
  return repos.map(repo => ({
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
};

const carrosselImages = [
  {
    src: "../public/assets/img/imagem_cloud_tecnologia.jpg",
    alt: "Fluxograma da tecnologia em nuvem"
  },
  {
    src: "../public/assets/img/image_cloud_computing.webp",
    alt: "Inforgrafico de cloud computing"
  },
  {
    src: "../public/assets/img/imagem_tecnologia_mundo.jpg",
    alt: "Tecnologia Quântica por volta do mundo"
  },
  {
    src: "../public/assets/img/imagem_de_represetacao_tq.jpg",
    alt: "Representação da tecnologia quântica"
  },
  {
    src: "../public/assets/img/imagem_tecnologia_quantica.jpg",
    alt: "Infografico da tecnologia em nuvem"
  }
];

const saveDataToFile = (data) => {
  fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));
  console.log('Dados do GitHub adicionados ao arquivo db.json com sucesso!');
};

const salvarDados = async () => {
  const username = 'CarlosJFigueiredo';
  const userData = await fetchUserData(username);
  const userRepos = await fetchUserRepos(username);
  const collaborators = await fetchCollaboratorsData(['', 'joaogscc', 'gabialvarenga', '', 'marcosffp']);

  if (userData && userRepos && collaborators) {
    const githubUser = buildUserObject(userData);
    const reposArray = buildReposArray(userRepos);

    const finalData = {
      usuario: githubUser,
      repositorios: reposArray,
      colaboradores: collaborators,
      carrossel: carrosselImages
    };

    saveDataToFile(finalData);
  } else {
    console.log('Erro ao obter dados do usuário, dos repositórios ou dos colaboradores no GitHub');
  }
};

salvarDados();