# convert_image_to_box_shadow
Inport image data covert to css using box-shadow.

import data

![input](https://user-images.githubusercontent.com/42743454/73116195-8f880100-3f75-11ea-9c40-653b1579a327.png)


converted css

```
.mosaic {position: relative;}
.mosaic::before {
    width:3px;height:3px;
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    box-shadow:3px 0px rgba(222,133,121,255),
    6px 0px rgba(223,134,123,255),
    9px 0px rgba(222,131,119,255),
    12px 0px rgba(223,134,123,255),
    ...
    ...
}
```

## Execute convert image to css using box-shadow
```
npm run convert
```

## Execute confirm on server

```
npm run server
```

## option

```
Usage: convert_image_to_box_shadow [options]

Options:
  -o, --output <type>       out file name(default param is "public/dst/output.css") 
  -i, --input <type>        input file name(default param is "src/input.png")       
  -e, --enlargement <type>  enlargement(default param is 1)
  -s, --split <type>        pixel split size(default param is 1)
  -t, --target <type>       output target is id(default param is ".mosaic").        
  -h, --help                output usage information
```