const fs = require("fs");
const compressGIF = require("../src");

(async function () {
  const file = await fs.promises.readFile("./tests/test_images/avocado.gif");

  const buffer = await compressGIF({ max_frame: 10 })(file);

  fs.writeFile("./tests/test.gif", buffer, "binary", function (err) {});
})();
