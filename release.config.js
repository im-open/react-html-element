module.exports = {
  repositoryUrl: 'git@github.com:WTW-IM/react-html-element.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        message: 'Docs: ${nextRelease.version} [skip ci]\n\n${nextRelease.note}'
      }
    ],
    '@semantic-release/npm'
  ],
  preset: 'eslint'
};
