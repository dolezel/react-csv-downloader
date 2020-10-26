# Change Log

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
