/**
 👻
 @file palette-opacity
 @summary allows palettes to use an additional alpha (opacity) channel
 @license MIT
 @version auto
 @requires Bitsy Version: 7.1
 @author Freya Campbell, Max Bradbury

 @description
 Edit your game data and for each palette colour,
 add a fourth value representing opacity
 (0 = fully transparent, 255 = fully opaque)

 e.g.
 ```
 PAL 0
 NAME blueprint
 0,82,204
 128,159,255
 255,255,255
 ```
 becomes
 ```
 PAL 0
 NAME blueprint
 0,82,204,10
 128,159,255,78
 255,255,255,192
 ```
 */
import {inject} from './helpers/utils';

inject(
    /(if \(colorIn\.r == curPal\[i]\[0] && colorIn\.g == curPal\[i]\[1] && colorIn\.b == curPal\[i]\[2])/,
    "$1 && colorIn.a == curPal[i][3]"
);

inject(/(palette\[index]\[2], a:) 255/, "$1 palette[index][3]");

inject(
    /(var\scolor\s=\spalette.colors\[colorIndex];\s*return\s{\s*(\w\s?:\scolor\[\d],?\s*){3})\s*(};)/,
    "$1, \n a : color[3] $2"
);

inject(/(\w+)(\.b;\s+img\.data\[pxl\s\+\s3]\s=\s)(255)/, "$1$2$1.a");
inject(/(\[255,255,255],?){2}/, "$1,$1,$1");
inject(/(getPal\(curPal\(\)\)\[0]\[2])(\s*\+\s*"\)")/, "$1 + \",\" + getPal(curPal())[0][3]$2");
inject(/(getPal\(paletteId\)\[0]\[2] \+)/, "$1 \",\" + getPal(paletteId)[0][3] +");
