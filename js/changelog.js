require(['github_activity'], function(GitHubActivity) {
  GitHubActivity.feed({
    username: 'socrata',
    repository: 'dev.socrata.com',
    selector: '#feed',
    limit: 10
  });
});
