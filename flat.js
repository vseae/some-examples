/* eslint-disable */
const fs = require("fs"); // Import the Node.js file system module
const path = require("path"); // Import the Node.js path module
const { exec } = require("child_process"); // Import the exec function from the Node.js child_process module
const fsExtra = require("fs-extra"); // Import the third-party library fs-extra

const contractsDir = "contracts"; // Solidity file directory
const flatDir = "flat"; // Output directory for flattened files

async function flattenSolFiles(directory) {
  const files = await fs.promises.readdir(directory); // Read the list of files in the directory

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file); // Get the complete path of the file
      const stats = await fs.promises.stat(filePath); // Get the file's status information

      if (stats.isDirectory()) {
        await flattenSolFiles(filePath); // Recursively handle subdirectories
      } else if (stats.isFile() && path.extname(filePath) === ".sol") {
        const relativeDir = path.relative(contractsDir, directory); // Get the relative path to the Solidity file directory
        const outputDir = path.join(flatDir, relativeDir); // Build the complete path of the output directory
        const outputFileName = path
          .basename(filePath)
          .replace(".sol", ".f.sol"); // Build the output file name
        const outputFilePath = path.join(outputDir, outputFileName); // Build the complete path of the output file
        const command = `forge flatten ${filePath} > ${outputFilePath}`; // Build the command to execute

        try {
          await fsExtra.ensureDir(outputDir); // Ensure the output directory exists, create it if it doesn't
          await execCommand(command); // Execute the command to flatten the file
          console.log(`✨ Flattened ${filePath} to ${outputFilePath}`); // Output success message for flattening with emoji
        } catch (error) {
          console.error(`❌ Error flattening ${filePath}: ${error}`); // Output error message for flattening with emoji
        }
      }
    })
  );
}

async function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error); // If there's an error executing the command, pass the error to the promise's reject function
      } else {
        resolve(stdout); // Pass the command execution result to the promise's resolve function
      }
    });
  });
}

async function main() {
  try {
    await fsExtra.emptyDir(flatDir); // Clear the output directory for flattened files
    await flattenSolFiles(contractsDir); // Flatten the Solidity files
  } catch (error) {
    console.error(`❌ ${error}`); // Output the error message with emoji
  }
}

main(); // Call the main function to start execution
