module.exports = {
  repositoryUrl: 'git@github.com:WTW-IM/react-html-element.git',
  branches: [
    { name: 'master' },
    { name: 'react-17', channel: 'react-17', prerelease: 'react-17' },
    { name: 'react-16', channel: 'react-16' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        message: 'Docs: ${nextRelease.version} [skip ci]\n\n${nextRelease.note}'
      }
    ],
    '@semantic-release/npm'
  ],
  preset: 'eslint'
};
