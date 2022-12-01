module.exports = {
  repositoryUrl: 'git@github.com:WTW-IM/react-html-element.git',
  branches: [
    { name: 'main' },
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
        message:
          'Docs: ${nextRelease.version} [skip ci]\n\n${nextRelease.note}',
        assets: [
          'CHANGELOG.md',
          'package.json',
          'package-lock.json',
          'npm-shrinkwrap.json',
        ],
      },
    ],
    '@semantic-release/npm',
  ],
  preset: 'eslint',
};
