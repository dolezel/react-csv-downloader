# React CSV Downloader
[![Travis Build Status][build-badge]][build]
[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]

A simple react component to allow download CSV file from js object

## Installation

```javascript
$ npm install --save-dev react-csv-downloader
```
## Usage
Use with children component

```javascript
import CsvDownloader from 'react-csv-downloader';

<CsvDownloader>
  <button>Download</button>
</CsvDownloader>
```

Use without children component

```javascript
<CsvDownloader text="Download"/>
```
### Datas
pass the downloaded datas as a component prop

```javascript
const datas = [{
  cell1: 'row 1 - cell 1',
  cell2: 'row 1 - cell 2'
}, {
  cell1: 'row 2 - cell 1',
  cell2: 'row 2 - cell 2'
}];

<CsvDownloader datas={datas}/>
```

### Column
pass the columns definition as a component prop to change the cell display name. If column isn't passed the cell display name is automatically defined with datas keys

```javascript
const columns = [{
  id: 'cell1',
  displayName: 'Cell 1'
}, {
  id: 'cell2',
  displayName: 'Cell 2'
}];

<CsvDownloader columns={columns}/>
```

You can also use the columns definition to set the columns display order

&nbsp;
## Props
| Name      	| Type              	| Default 	| Required 	| Description                                                                       	|
|-----------	|-------------------	|---------	|----------	|-----------------------------------------------------------------------------------	|
| bom       	| boolean           	| true    	|   false  	| Activate or desactivate bom mode                                                  	|
| columns   	| array of object   	| null    	|   false  	| Columns definition                                                                	|
| datas     	| array of object   	| null    	|   true   	| Downloaded datas                                                                  	|
| filename  	| string            	| null    	|   true   	| You can pass the filename without extension. The extension is automatically added 	|
| separator 	| string            	| ','     	|   false  	|                                                                                   	|
| noHeader  	| bool              	| false   	|   false  	| If `true` the header isn't added to the csv file                                   	|
| prefix    	| string or boolean 	| false   	|   false  	| Filename prefix. If `true` prefix becomes a date in YYYYMMDDhhiiss format          	|
| suffix    	| string or boolean 	| false   	|   false  	| Filename suffix/postfix. If `true` suffix becomes a date in YYYYMMDDhhiiss format  	|
| text      	| string            	| null    	|   false  	| Download button text. Used if no children component.                              	|

## Full example
pass the downloaded datas as a component prop

```javascript
render() {
  const columns = [{
    id: 'first',
    displayName: 'First column'
  }, {
    id: 'second',
    displayName: 'Second column'
  }];

  const datas = [{
    first: 'foo',
    second: 'bar'
  }, {
    first: 'foobar',
    second: 'foobar'
  }];

  return (
    <div>
      <CsvDownloader
        filename="myfile"
        separator=";"
        columns={columns}
        datas={datas}
        text="DOWNLOAD" />
    </div>
  );
}

// content of myfile.csv
// First column;Second column
// foo;bar
// foobar;foobar
```

## License

[MIT License](http://opensource.org/licenses/MIT)

[build-badge]: https://travis-ci.org/Terminux/react-csv-downloader.svg?branch=master
[build]: https://travis-ci.org/Terminux/react-csv-downloader

[deps-badge]: https://david-dm.org/Terminux/react-csv-downloader.svg
[deps]: https://david-dm.org/Terminux/react-csv-downloader

[dev-deps-badge]: https://david-dm.org/Terminux/react-csv-downloader/dev-status.svg
[dev-deps]: https://david-dm.org/Terminux/react-csv-downloader#info=devDependencies
