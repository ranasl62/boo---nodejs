const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directory containing test files
const testDirectory = './test';

// Function to recursively get all JavaScript files in a directory
function getAllTestFiles(directory, fileList = []) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllTestFiles(filePath, fileList);
        } else if (path.extname(file) === '.js' &&  file.endsWith(".test.js")) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

// Get all test files
const testFiles = getAllTestFiles(testDirectory);

// Remove duplicate files
const uniqueTestFiles = [...new Set(testFiles)];

// Separate ordered and unordered files
const orderedFiles = [];
const unorderedFiles = [];

uniqueTestFiles.forEach(file => {
    const fileName = path.basename(file);
    if (/^\d+-/.test(fileName)) {
        orderedFiles.push(file);
    } else {
        unorderedFiles.push(file);
    }
});

// Sort ordered files based on priority
orderedFiles.sort((a, b) => {
    const priorityA = parseInt(path.basename(a).split('-')[0]);
    const priorityB = parseInt(path.basename(b).split('-')[0]);
    return priorityA - priorityB;
});

console.log(orderedFiles);
// Assume cmdResult is the result of a previous command
try {
    const allFiles = orderedFiles.concat(unorderedFiles);
    for (const file of allFiles) {
        try {
            console.log(`npx jest ${file}`);
            execSync(`npx jest ${file}`, { stdio: 'inherit' });
        } catch (e) {
            console.error(e)
        }
    }
} catch (error) {
    console.error(error);
}