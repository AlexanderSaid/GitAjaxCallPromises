function Request(requestRL, cb) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest;
    function processRequest() {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.response));
      } else if (req.readyState === 4 && req.status !== 200) {
        reject(req, req.status)
      }
    }
    req.open('GET', requestRL, true);
    req.send();
    req.onreadystatechange = processRequest;
  }).then(cb)
}
function RenderList(selector, html) {
  let parent = document.querySelector(selector);
  $parent.innerHTML = html
}

function GetHtmlRepoList(reposatories) {
  return reposatories.map(repo => {
    return `<li><a href="${repo.url}">${repo.name}</a></li>`
  }).join('')
}

function GetHtmlMemberList(members) {
  return members.map(member => {
    return `<li><a href="${member.url}"><img =src${member.avatar_url} width="150">${repo.name}</a></li>`
  }).join('')
}
const members = []
const GitHubORG = 'HackYourFuture'
const HYFReposApiEndpoint = `https://api.github.com/orgs/HackYourFuture/repos`
const HYFMembersApiEndpiont = `https://api.github.com/orgs/${GitHubORG}/members`

let $repoList = '.repo-list ul'
let $memberList = '.member-list ul'

Request(HYFReposApiEndpoint, 'GET')
  .then(GetHtmlRepoList)
  .then(RenderList.bind(null, $repoList))
  .catch(RenderList.bind(null, $repoList, '<li>Error</li>'))

Request(HYFMembersApiEndpiont, 'GET')
  .then(GetHtmlMemberList)
  .then(RenderList.bind(null, $memberList))
  .catch(RenderList.bind(null, $memberList, '<li>Error</li>'))