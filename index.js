function Request (url, method, cb) {
  return new Promise((resolve, reject) => {
    method = method || "GET";
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      let isRequestDone = req.readyState === XMLHttpRequest.DONE;
      let isRequestSuccess = req.status === 200;
      if (isRequestDone && isRequestSuccess) {
        resolve(JSON.parse(req.responseText));
      } else if (isRequestDone && !isRequestSuccess) {
        reject(req, req.status);
      }
      req.open(method, url);
      req.send
    }
  }).then(cb);
}
function RenderList () {}
function GetHtmlRepoList () {}
function GetHtmlMemberList () {}

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