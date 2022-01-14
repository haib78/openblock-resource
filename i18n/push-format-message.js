#!/usr/bin/env node

/**
 * @fileoverview
 * Push the extracted 18n content in external resource.
 *
 * The default scan path is the path where the current command is executed,
 * but you can use --dir to specify the download address, e.g: --dir=external-resources
 */

const {execSync} = require('child_process');
const path = require('path');
const parseArgs = require('../script/parseArgs');


const {dir} = parseArgs();

let workDir;
if (dir) {
    workDir = dir;
} else {
    workDir = './';
}

let exitCode = 0;

const runCliSync = cmd => {
    try {
        return execSync(cmd).toString();
    } catch (error) {
        if (error.message) {
            console.log('message=', error.message.toString());
            exitCode = 1;
        }
    }
};

const pushBlocksContent = 'tx-push-src openblock-resources blocks ${path.resovle(workDir)}/translations/blocks/en.json';
const pushInterfaceContent = `tx-push-src openblock-resources interface ${path.resovle(workDir)}/translations/interface/en.json`; // eslint-disable-line max-len

runCliSync(pushBlocksContent);
runCliSync(pushInterfaceContent);

if (exitCode === 0) {
    console.log('\nSuccessfully pushed to transifex');
}