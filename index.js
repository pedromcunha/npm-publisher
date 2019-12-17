const util = require('util');
const core = require('@actions/core');
const github = require('@actions/github');
const exec = util.promisify(require('child_process').exec);
const gitRepositoryPathOs = process.argv[1].replace(/(.*)\/\.git\/.*/, '$1');

const executeShellCommand = async (cmd, workingDirectory = gitRepositoryPathOs) => {
  // if (debugRoutine) debugInfo += `- executeShellCommand('${cmd}', '${workingDirectory}')\n`;
  const {stdout, stderr} = await exec(cmd, {
      cwd: workingDirectory
  });

  return stdout;
}

async function run() {
  try {
    const accessLevel = core.getInput('acess');
    const packageName = core.getInput('packageName');
    const values = await executeShellCommand(`npm view ${packageName} versions`);
    const lastVersion = await executeShellCommand(`git describe --abbrev=0 --tags`);
    if (!values.includes(lastVersion)) {
      console.log(`Publishing ${lastVersion} version`);
      await executeShellCommand(`npm publish --access ${accessLevel}`);
    } else {
      console.log("No publication : Version already published");
    }

    core.setOutput("version", lastVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();