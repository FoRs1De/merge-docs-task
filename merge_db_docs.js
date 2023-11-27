const fs = require('fs');

// creation of function for merging logic
const mergeMarkdown = (baseContent, projectContent) => {
  // Split the content of each file into lines
  let baseLines = baseContent.split('\n'); // "\n" is a regex symbol to split between lines into array
  let projectLines = projectContent.split('\n');

  // Here i made iteration over base arrray
  for (let i = 0; i < baseLines.length; i++) {
    // and inside iteration over project array
    for (let j = 0; j < projectLines.length; j++) {
      //here i splited all indexes by ':' symbol for both arrays
      const baseLineParts = baseLines[i].split(':');
      const projectLineParts = projectLines[j].split(':');

      // here i checked if the lines before ':' have the same content (in our case DESCRIPTION)
      if (baseLineParts[0].trim() === projectLineParts[0].trim()) {
        //here i replaced the line in baseLines with the line from projectLines
        baseLines[i] = projectLines[j];
        // and removed the same line from projectLines
        projectLines.splice(j, 1);
        // here i stop the inner loop to move to the next line in baseLines
        break;
      }
    }
  }

  // that is just standard filter if lines in base same like in project (in our case it is 'TEAMS')
  projectLines = projectLines.filter((line) => !baseLines.includes(line));

  // after all i just make on one array from 2
  let updatedLines = [...baseLines, ...projectLines];

  // and in the end i join everything to remove array
  return updatedLines.join('\n');
};

// here i destructed values from command line
const [, , baseFilePath, projectFilePath, outputFilePath] = process.argv;

// function that merges and writes content from both base and project files
const mergeMarkdownFiles = (basePath, projectPath, outputPath) => {
  // content of files assignment to variables
  const baseContent = fs.readFileSync(basePath, 'utf-8');
  const projectContent = fs.readFileSync(projectPath, 'utf-8');

  // use of merging logic function
  const mergedContent = mergeMarkdown(baseContent, projectContent);

  //standard method of node file system to write content inside the file
  fs.writeFileSync(outputPath, mergedContent);
};
// started the function for merge files
mergeMarkdownFiles(baseFilePath, projectFilePath, outputFilePath);
