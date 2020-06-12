const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

function compilingPreperations() {
    const buildPath = path.resolve(__dirname, 'build');
    fs.removeSync(buildPath);
    return buildPath;
}

function createConfiguration() {
    return {
        language: 'Solidity',
        sources: {
            'CampaignGenerator.sol': {
                content: fs.readFileSync(path.resolve(__dirname, 'Contracts', 'CampaignGenerator.sol'), 'utf8')
            },
        },
        settings: {
            outputSelection: { // return everything
                '*': {
                    '*': ['*']
                }
            }
        }
    };
}

function compileSources(config) {
    try {
        return JSON.parse(solc.compile(JSON.stringify(config), {import : getImports}));
    } catch (e) {
        console.log(e);
    }
}

function getImports(dependency) {
    console.log('Searching for dependency: ', dependency);
    switch (dependency) {
        case 'Campaign.sol':
            return {contents: fs.readFileSync(path.resolve(__dirname, 'Contracts', 'Campaign.sol'), 'utf8')};
        default:
            return {error: 'File not found'}
    }
}


function writeOutput(compiled, buildPath) {
    fs.ensureDirSync(buildPath);

    for (let contractFileName in compiled.contracts) {
        const contractName = contractFileName.replace('.sol', '');
        console.log('Writing: ', contractName + '.json');
        fs.outputJsonSync(
            path.resolve(buildPath, contractName + '.json'),
            compiled.contracts[contractFileName][contractName]
        );
    }
}


const buildPath = compilingPreperations();
const config = createConfiguration();
console.log(config)
const compiled = compileSources(config);
console.log(compiled);
writeOutput(compiled, buildPath);