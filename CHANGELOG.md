## [4.0.2](https://github.com/WTW-IM/react-html-element/compare/v4.0.1...v4.0.2) (2023-01-10)


### Fix

* awaiting potential react-dom promise ([18421b6](https://github.com/WTW-IM/react-html-element/commit/18421b6c0b5106c0252e5d971884f829a5043c76))
* ensuring we don't rerender while awaiting a root ([954ceeb](https://github.com/WTW-IM/react-html-element/commit/954ceeba2f6fc266522329042fe2494527ddc4a5))
* properly handling global react-dom@18 ([2376cae](https://github.com/WTW-IM/react-html-element/commit/2376cae801153d615794265515fb3f4d7ea5ab71))

## [4.0.1](https://github.com/WTW-IM/react-html-element/compare/v4.0.0...v4.0.1) (2022-12-07)


### Build

* ensuring we persist github credentials after checkout ([a128488](https://github.com/WTW-IM/react-html-element/commit/a12848851584b6ae88fd0a0d7a7a523a6dab2aff))

### Fix

* correcting 'types' property in package.json ([a9402b0](https://github.com/WTW-IM/react-html-element/commit/a9402b0578a1e3af8747aa760f76d908bc896c52))

# [4.0.0](https://github.com/WTW-IM/react-html-element/compare/v3.1.0...v4.0.0) (2022-12-05)


### Breaking

* making the default module an ES module ([317de20](https://github.com/WTW-IM/react-html-element/commit/317de20ffbc3badc83dd0c9de8d2d2901a54efd3))

### Build

* ensuring semantic-release finds all relevant branches ([b858f3c](https://github.com/WTW-IM/react-html-element/commit/b858f3cab187f02bd20b0eae415316ca8e6eb24d))
* releasing development builds with PRs ([ce4f6f6](https://github.com/WTW-IM/react-html-element/commit/ce4f6f6c1c22925e9d866f9d3b97d3cabedce475))
* replace travis pipeline with gha ([9c45a86](https://github.com/WTW-IM/react-html-element/commit/9c45a867b10a6606f4ed18a7fcd1d29af796c2df))
* updating master references to main ([f5e6cf1](https://github.com/WTW-IM/react-html-element/commit/f5e6cf124cd0abd6ea88b4d1140f66f1b076bf24))
* using both GH_TOKEN and GITHUB_TOKEN to cover bases in semantic-release ([4f2dd1e](https://github.com/WTW-IM/react-html-element/commit/4f2dd1eb6f9bc7222a999c284c48287124425581))

### Fix

* setting up 'real' pipeline bot git user; bumping version ([667ffff](https://github.com/WTW-IM/react-html-element/commit/667ffff85b968ec8e9728e174c025bd8253e05bb))
* using correct token in semantic-release's git step ([1222372](https://github.com/WTW-IM/react-html-element/commit/12223723690d77878ad7d571f6a09a323da2e577))

### New

* support react 18 createRoot ([addcbcb](https://github.com/WTW-IM/react-html-element/commit/addcbcb52ecb6d99851e955716a9565a7aba5944))

### Update

* doing root.render asynchronously ([ead4edc](https://github.com/WTW-IM/react-html-element/commit/ead4edcbcaca21efabb64541d492b6fc78538783))
* exporting types separate from code ([d191b81](https://github.com/WTW-IM/react-html-element/commit/d191b81d5bc43006edd2213b115916cfeeab51ac))

### Upgrade

* Bump hosted-git-info from 2.8.8 to 2.8.9 ([5554000](https://github.com/WTW-IM/react-html-element/commit/55540006cf0d939dfe84fc48c39c3fad59fe55a9))
* Bump lodash from 4.17.20 to 4.17.21 ([4d34e83](https://github.com/WTW-IM/react-html-element/commit/4d34e8349a80b0f701528a0b5f8b0eb0b6a99b64))
* Bump y18n from 4.0.0 to 4.0.1 ([57d49c9](https://github.com/WTW-IM/react-html-element/commit/57d49c9f1f781e75c4a990f8254c7ee738c46591))

# [3.1.0](https://github.com/WTW-IM/react-html-element/compare/v3.0.0...v3.1.0) (2021-02-10)


### Update

* ensuring we don't mount when not connected ([34cbd21](https://github.com/WTW-IM/react-html-element/commit/34cbd21c8b08c261b7315619a625d524e9519946))

# [3.0.0](https://github.com/WTW-IM/react-html-element/compare/v2.2.0...v3.0.0) (2021-02-10)


### Breaking

* removing event retargeting ([60abc05](https://github.com/WTW-IM/react-html-element/commit/60abc05ffed68591840c7651d0c3a49668c4d040))

### Build

* ensuring we push package.json with semantic-release commit ([f0531bc](https://github.com/WTW-IM/react-html-element/commit/f0531bca4998708fe7e37117e28a4e5ab213cf8c))
* reconfiguring .travis.yml to use on conditions ([6ab64a3](https://github.com/WTW-IM/react-html-element/commit/6ab64a3794bd6fa6c308d7c7567382bba4e54361))
* reconfiguring .travis.yml to use on conditions ([f587a7c](https://github.com/WTW-IM/react-html-element/commit/f587a7cc127ed61413c74cbcfc9f26bc7b015755))
* running release build on react-16 and react-17 branches ([47ddaf4](https://github.com/WTW-IM/react-html-element/commit/47ddaf47a5b3133170c823491196e416d3e7da81))
* running release build on react-16 and react-17 branches ([4abdde9](https://github.com/WTW-IM/react-html-element/commit/4abdde98d68464bd32b0f52acebee9701dde6815))
* setting up release for react-17 ([9d9d4ad](https://github.com/WTW-IM/react-html-element/commit/9d9d4add5f77e7b6089195a357893abc1764a6fe))

### Docs

* 3.0.0-react-17.1 [skip ci] ([27b4af8](https://github.com/WTW-IM/react-html-element/commit/27b4af8ae15ed735d50f78a34d413f686156fdf9))
* 3.0.0-react-17.2 [skip ci] ([82242c0](https://github.com/WTW-IM/react-html-element/commit/82242c0a692566f8486044248d1190d75119b1d7))
* 3.0.0-react-17.3 [skip ci] ([9c61c45](https://github.com/WTW-IM/react-html-element/commit/9c61c4567c65af195acef226b25021a8e48238ca))
* completing React 17 docs ([1d48bc0](https://github.com/WTW-IM/react-html-element/commit/1d48bc0e31df2fa50de84fd930779c6c69cb8006))
* describing why this is useful with React 17 ([c12ca21](https://github.com/WTW-IM/react-html-element/commit/c12ca21c9d0cff0c8636593d15889c641034205a))
* fixing react-16 link ([43435a4](https://github.com/WTW-IM/react-html-element/commit/43435a4ccc425433afabaefd577aff633e0accff))

### Update

* adding a base-level render function ([9cb8a6b](https://github.com/WTW-IM/react-html-element/commit/9cb8a6b5a5a66eafa827dfebe2e83577f7a70b68))
* adding this.shadow for easy style placement ([1a5c275](https://github.com/WTW-IM/react-html-element/commit/1a5c2758acaf3850d67852efe61fa95899f00259))
* ensuring we can accommodate lower versions of React 17 ([2cac97b](https://github.com/WTW-IM/react-html-element/commit/2cac97b4eea0305b018f87f65eca049d79520878))

### Upgrade

* updating all dependencies ([5737167](https://github.com/WTW-IM/react-html-element/commit/5737167f47ffb4b3e99fc7f15e4bd1f987663eb7))

# [3.0.0-react-17.3](https://github.com/WTW-IM/react-html-element/compare/v3.0.0-react-17.2...v3.0.0-react-17.3) (2021-02-05)


### Docs

* completing React 17 docs ([1d48bc0](https://github.com/WTW-IM/react-html-element/commit/1d48bc0e31df2fa50de84fd930779c6c69cb8006))
* fixing react-16 link ([43435a4](https://github.com/WTW-IM/react-html-element/commit/43435a4ccc425433afabaefd577aff633e0accff))

# [3.0.0-react-17.2](https://github.com/WTW-IM/react-html-element/compare/v3.0.0-react-17.1...v3.0.0-react-17.2) (2021-02-04)


### Docs

* describing why this is useful with React 17 ([c12ca21](https://github.com/WTW-IM/react-html-element/commit/c12ca21c9d0cff0c8636593d15889c641034205a))

### Fix

* ensuring we only load the HTML 5 Adapter when we need it ([871755f](https://github.com/WTW-IM/react-html-element/commit/871755fc4b78fc557e77bf3b7bd6048480b3a34d))

# [3.0.0-react-17.1](https://github.com/WTW-IM/react-html-element/compare/v2.2.0...v3.0.0-react-17.1) (2021-02-04)


### Breaking

* removing event retargeting ([60abc05](https://github.com/WTW-IM/react-html-element/commit/60abc05ffed68591840c7651d0c3a49668c4d040))

### Build

* ensuring we push package.json with semantic-release commit ([f0531bc](https://github.com/WTW-IM/react-html-element/commit/f0531bca4998708fe7e37117e28a4e5ab213cf8c))
* reconfiguring .travis.yml to use on conditions ([f587a7c](https://github.com/WTW-IM/react-html-element/commit/f587a7cc127ed61413c74cbcfc9f26bc7b015755))
* running release build on react-16 and react-17 branches ([4abdde9](https://github.com/WTW-IM/react-html-element/commit/4abdde98d68464bd32b0f52acebee9701dde6815))
* setting up release for react-17 ([9d9d4ad](https://github.com/WTW-IM/react-html-element/commit/9d9d4add5f77e7b6089195a357893abc1764a6fe))

### Update

* adding a base-level render function ([9cb8a6b](https://github.com/WTW-IM/react-html-element/commit/9cb8a6b5a5a66eafa827dfebe2e83577f7a70b68))
* adding this.shadow for easy style placement ([1a5c275](https://github.com/WTW-IM/react-html-element/commit/1a5c2758acaf3850d67852efe61fa95899f00259))
* ensuring we can accommodate lower versions of React 17 ([2cac97b](https://github.com/WTW-IM/react-html-element/commit/2cac97b4eea0305b018f87f65eca049d79520878))

### Upgrade

* updating all dependencies ([5737167](https://github.com/WTW-IM/react-html-element/commit/5737167f47ffb4b3e99fc7f15e4bd1f987663eb7))

# [2.2.0](https://github.com/WTW-IM/react-html-element/compare/v2.1.0...v2.2.0) (2021-01-12)


### Build

* updating vulnerable build dependencies ([cdf5e6a](https://github.com/WTW-IM/react-html-element/commit/cdf5e6a4520ef3fe0284c99983e9e428240f0986))

### Update

* importing es5 polyfills by default ([3566c5b](https://github.com/WTW-IM/react-html-element/commit/3566c5ba9deffb304bbba91ced5d92c6d26672a2))

# [2.1.0](https://github.com/WTW-IM/react-html-element/compare/v2.0.0...v2.1.0) (2020-11-20)


### Fix

* cleanup composedpath return ([163b178](https://github.com/WTW-IM/react-html-element/commit/163b17879cfbaea459a015ba1032ffa218aaaff0))
* make sure to call cleanup function ([49615d1](https://github.com/WTW-IM/react-html-element/commit/49615d199126217eb1d046a9f4eac7298b38f766))
* remove onclick ([c845c02](https://github.com/WTW-IM/react-html-element/commit/c845c0293fdaf53da8be52d62eacd43ec6df37ab))

### Update

* ensure mouse events are on shadow root ([4a20433](https://github.com/WTW-IM/react-html-element/commit/4a20433798fb17e7536f7a71aee161cd2f200719))

# [2.0.0](https://github.com/WTW-IM/react-html-element/compare/v1.1.0...v2.0.0) (2020-05-26)


### Breaking

* converting dist to commonjs ([168c317](https://github.com/WTW-IM/react-html-element/commit/168c3177f579b3f8f2a0d99b497098c34e00215b))

### Build

* use correct plugin to push changelog to github ([d2a197e](https://github.com/WTW-IM/react-html-element/commit/d2a197e0da7d3c55c90e20e657d9cc1eab5ee620))

### Docs

* adding some instructions around Styled Components ([959ad72](https://github.com/WTW-IM/react-html-element/commit/959ad72422e35a0531d2c54801208df32b6f1f4b))
* Updating README to include a note about the es5 polyfills. ([780d227](https://github.com/WTW-IM/react-html-element/commit/780d227c9639d5a1012b20fbca0272ab92f06b10))
* updating README with a Polyfills anchor ([199559f](https://github.com/WTW-IM/react-html-element/commit/199559f4647b48360357f561c720591b3e0a1f3b))
