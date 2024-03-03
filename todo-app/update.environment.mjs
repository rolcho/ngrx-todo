// build script cannot be ts :\
import { readFile, writeFile } from 'node:fs/promises';

const envPath = "./src/environments/environment.automatedtest.ts";
const envPathEnv = "./src/environments/environment.ts";

/**
 * 
 * @param {string} filePath 
 * @returns the filecontent
 */
const readContent = async (filePath) => {
    return await readFile(filePath);
}

/**
 * 
 * @param {string} filePath which should be updated
 * @param {string} pattern which should be replaced //TODO: add multiple replace help 
 * @param {string|undefined} newValue which will be replace the pattern
 * @param {boolean} log if we wanted to see the logs, defaults to true
 */
const updateInPlace = async (filePath, pattern, newValue, log = true) => {
    if (log) console.info(`updating environemnt file ${filePath} with content ${newValue} at ${pattern}`);
    const content = (await readContent(filePath)).toString();
    if (!content.includes(pattern)) {
        if (log) console.info(`pattern ${pattern} cannot be found ... skip`);
        return;
    }
    if (typeof newValue == "undefined") {
        if (log) console.info(`newValue should be present at least as an emptystring`);
        return;
    }
    const newContent = content.replace(pattern, newValue);
    if (log) console.info(`pattern ${pattern} replaced with value ${newValue}`);
    if (log) console.info(`updating original file ${filePath} with new content`);
    await writeFile(filePath, newContent, { flag: "w" });
    if (log) console.info(`pathing of ${filePath} is done`);
}


updateInPlace(envPath, "__PLACEHOLDER__", process.env['BACKEND_URL'])
    .then(console.log("Buildstep done"))
updateInPlace(envPathEnv, "http://localhost:3000", process.env['BACKEND_URL'])
    .then(console.log("Buildstep done"))