const { execSync } = require('child_process');
const MAIN_BRANCH = 'main';

const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .replace('\n', '');

const branchSha = execSync('git rev-parse --short HEAD')
  .toString()
  .replace('\n', '');

const isMainBranch = branchName === MAIN_BRANCH;
const githubBranchConfig = isMainBranch
  ? {}
  : {
      successComment: `
This PR is part of this prerelease version for testing: \${nextRelease.version}

You can test it by using:
\`\`\`bash
npm install react-html-element@\${nextRelease.version}
\`\`\`
        `,
    };

const extraPlugins = isMainBranch
  ? [
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
    ]
  : [];

module.exports = {
  repositoryUrl: 'git@github.com:WTW-IM/react-html-element.git',
  branches: [
    { name: 'main' },
    { name: 'react-17', channel: 'react-17', prerelease: 'react-17' },
    { name: 'react-16', channel: 'react-16' },
    {
      name: '*',
      channel: 'development',
      prerelease: `\${name}-${branchSha}`,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    ['@semantic-release/github', { ...githubBranchConfig }],
    ...extraPlugins,
  ],
  preset: 'eslint',
};
