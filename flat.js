const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const fsExtra = require("fs-extra");

const contractsDir = "contracts";
const flatDir = "flat";

function flattenSolFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        flattenSolFiles(filePath);
      } else if (stats.isFile() && path.extname(filePath) === ".sol") {
        const relativeDir = path.relative(contractsDir, directory);
        const outputDir = path.join(flatDir, relativeDir);
        const outputFileName = path
          .basename(filePath)
          .replace(".sol", ".f.sol");
        const outputFilePath = path.join(outputDir, outputFileName);
        const command = `forge flatten ${filePath} > ${outputFilePath}`;

        try {
          fsExtra.ensureDirSync(outputDir);
          execSync(command);
          console.log(`Flattened ${filePath} to ${outputFilePath}`);
        } catch (error) {
          console.error(`Error flattening ${filePath}: ${error}`);
        }
      }
    });
  });
}

fsExtra.emptyDirSync(flatDir);

flattenSolFiles(contractsDir);
