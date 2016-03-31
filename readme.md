### Update data

```
$  npm run data
```

### Generate menu

```
$ npm run svg
```

#### Create pdf

```
$ npm run pdf
$ cd svgs/pdf
$ pdfunite 00.pdf 01.pdf 02.pdf 03.pdf 04.pdf 05.pdf 06.pdf 07.pdf 08.pdf 09.pdf 10.pdf 11.pdf 12.pdf 13.pdf noodl.pdf
```

The PDF file: ```svgs/pdf/noodl.pdf```

### Generate take away menu

```
$ npm run fsvg
```

#### Create pdf

```
$ npm run fpdf
$ cd flyer/pdf
$ pdfunite recto.pdf verso.pdf noodl-flyer.pdf
```

The PDF file: ```flyer/pdf/noodl-flyer.pdf```

### Generate website

```
$ npm run webdata
$ npm run site
```

Files to transfer to the server:

* index.html
* fr.html
* en.html

Images, styling and scripts are included in the HTML files 

## Dependencies

* node
* inkscape
* pdfunite




