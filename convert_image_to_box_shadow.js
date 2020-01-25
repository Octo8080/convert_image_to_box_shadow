const program = require("commander");
var Jimp = require("jimp");
const outputFile = require("output-file");

program
  .option("-o, --output <type>", "out file name(default param is \"public/dst/output.css\")")
  .option("-i, --input <type>", "input file name(default param is \"src/input.png\")")
  .option("-e, --enlargement <type>", "enlargement(default param is 1)")
  .option("-s, --split <type>", "pixel split size(default param is 1)")
  .option("-t, --target <type>", "output target is id(default param is \".mosaic\").");

program.parse(process.argv);

const outputFileName = program.output === undefined ? "public/dst/output.css" : program.output;
const inputFileName = program.input === undefined ? "src/input.png" : program.input;
const split = program.split === undefined ? 1 : Number(program.split);
const enlargement = program.enlargement === undefined ? 1 : Number(program.enlargement);
const target = program.target===undefined ? ".mosaic" : program.target;

Jimp.read(inputFileName, (err, image) => {
  if (err) throw err;
  image = image
    .resize(
      Math.round(image.bitmap.width * enlargement),
      Math.round(image.bitmap.height * enlargement)
    )
    .pixelate(split);
  let styletext = "";
  styletext += `${target} {position: relative;}`;
  styletext += `${target}::before {width:${split}px;height:${split}px;content: "";position: absolute;top: -${split}px;left: -${split}px;box-shadow:`;
  for (let y = 0; y < image.bitmap.height; y += split) {
    for (let x = 0; x < image.bitmap.width; x += split) {
      const c = Jimp.intToRGBA(image.getPixelColor(x, y));
      styletext += `${Number(split) + x}px ${y}px rgba(${c.r},${c.g},${c.b},${c.a}),`;
    }
  }
  styletext = styletext.slice(0, styletext.length - 1);
  styletext += "}";

  (async () => {
    await outputFile(outputFileName, styletext);
  })();
});
