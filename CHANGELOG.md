# Change Log

## [3.3.0] - 2024-12-30

### Added

- React 19 support [#460](https://github.com/dolezel/react-csv-downloader/pull/460)

## [3.2.0] - 2024-12-18

### Added

- Allowing number type [#450](https://github.com/dolezel/react-csv-downloader/pull/450)

## [3.1.1] - 2024-09-17

### Fixed

- Fix duplicate columns [#438](https://github.com/dolezel/react-csv-downloader/pull/438)

## [3.1.0] - 2024-01-06

### Added

- Ability to add title at top of the csv [#386](https://github.com/dolezel/react-csv-downloader/pull/386)

## [3.0.0] - 2023-10-29

### Fixed

- Ability to specify column order for arrays of data [#375](https://github.com/dolezel/react-csv-downloader/pull/375)

## [2.9.1] - 2023-04-07

### Fixed

- Fix passing props [#347](https://github.com/dolezel/react-csv-downloader/pull/347)

## [2.9.0] - 2022-11-18

### Changed

- Fix sourcemaps [#321](https://github.com/dolezel/react-csv-downloader/pull/321)
- Handle error and empty data [#322](https://github.com/dolezel/react-csv-downloader/pull/322)

## [2.8.0] - 2022-04-22

### Changed

- Removed tslint, added eslint [#313](https://github.com/dolezel/react-csv-downloader/pull/313)
- Installs without error with React 18
- Also fixes error when data is null or undefined

## [2.7.1] - 2021-12-15

### Added

- Loosen supported npm version [#301](https://github.com/dolezel/react-csv-downloader/pull/301)

## [2.7.0] - 2021-07-09

### Added

- adds support for sep meta instruction [#265](https://github.com/dolezel/react-csv-downloader/pull/265)
- Making engine less restrictive [#267](https://github.com/dolezel/react-csv-downloader/pull/267)

## [2.6.0] - 2021-07-03

### Added

- add support to async datas resolution [#259](https://github.com/dolezel/react-csv-downloader/pull/259)
- Prettier config [#260](https://github.com/dolezel/react-csv-downloader/pull/260)
- Exporting toCsv function [#261](https://github.com/dolezel/react-csv-downloader/pull/261)
- Nulls and undefineds should be converted to empty strings [#262](https://github.com/dolezel/react-csv-downloader/pull/262)

## [2.5.0] - 2021-06-19

### Added

- Add disabled option [#252](https://github.com/dolezel/react-csv-downloader/pull/252)

## [2.4.0] - 2021-05-16

### Changed

- Proper main/module resolution, using es2015 target [#245](https://github.com/dolezel/react-csv-downloader/pull/245)

## [2.3.0] - 2021-05-16

### Added

- Optional extension [#244](https://github.com/dolezel/react-csv-downloader/pull/244)

## [2.2.0] - 2020-10-26

### Added

- Support for React v17 [#215](https://github.com/dolezel/react-csv-downloader/pull/215)

## [2.1.0] - 2020-09-16

### Added

- Passing props to children [#206](https://github.com/dolezel/react-csv-downloader/pull/206)

## [2.0.2] - 2020-08-03

### Fixed

- Fix processing empty data [#195](https://github.com/dolezel/react-csv-downloader/pull/195)

## [2.0.1] - 2020-08-03

### Fixed

- Fix processing chunks [#194](https://github.com/dolezel/react-csv-downloader/pull/194)

## [2.0.0] - 2020-07-16

### Breaking changes

- Async processing with splitting to chunks [#187](https://github.com/dolezel/react-csv-downloader/pull/187)

  `csv` function is now async and contents of CSV file are generated asynchronously

## [1.9.0] - 2020-07-16

### Added

- Option for new line at end of file [#185](https://github.com/dolezel/react-csv-downloader/pull/185)

## [1.8.0] - 2020-04-23

### Changed

- Compiling as commonjs [#165](https://github.com/dolezel/react-csv-downloader/pull/165)

## [1.7.0] - 2020-04-23

### Changed

- Compute data on click [#163](https://github.com/dolezel/react-csv-downloader/pull/163)

## [1.6.0] - 2020-03-27

### Added

- Rewritten in Typescript [#123](https://github.com/dolezel/react-csv-downloader/pull/123)

## [1.5.0] - 2019-12-17

### Added

- Add functionality to wrap column value with any character [#138](https://github.com/dolezel/react-csv-downloader/pull/138)

## [1.4.0] - 2019-10-04

### Changed

- Refactoring code, removing deprecated componentWillReceiveProps and computing csv when needed [#121](https://github.com/dolezel/react-csv-downloader/pull/121)

## [1.3.0] - 2019-10-03

### Changed

- Using file-saver for cross-browser support of saving files [#120](https://github.com/dolezel/react-csv-downloader/pull/120)

## [1.2.0] - 2019-10-03

### Changed

- dependencies and dev dependencies
- create-react-app for example [#119](https://github.com/dolezel/react-csv-downloader/pull/119)

## [1.1.0] - 2019-01-23

### Fixed

- Changing BOM to \ufeff [#72](https://github.com/dolezel/react-csv-downloader/pull/72)

## [1.0.0] - 2019-01-11

### Changed

- Fixed up click event for mozilla (Using MouseEvent) [#66](https://github.com/dolezel/react-csv-downloader/pull/66)
- Upgraded dependencies, example fixes, peerDependencies [#67](https://github.com/dolezel/react-csv-downloader/pull/67)

## [0.2.0] - 2018-09-04

### Changed

- Use Blob instead of Data URI to support large file downloads [#1](https://github.com/dolezel/react-csv-downloader/pull/1)
- Updated dependencies and rewritten tooling

## [0.1.1] - 2016-05-03

### Fixed

- license name in package.json
- dependencies and dev dependencies

## [0.1.0] - 2016-02-06

### Added

- Initial commit
