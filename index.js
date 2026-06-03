#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import pc from 'picocolors';
import { Command } from 'commander';
import boxen from 'boxen';

const program = new Command();

program
  .name('branch-reaper')
  .description('Interactively sweep your repository for dead local Git branches and mass-delete them.')
  .version('1.0.0')
  .parse(process.argv);

console.log(
  boxen(
    pc.red(pc.bold('🌿 BRANCH REAPER')) + '\n' + pc.gray('Time to trim the dead leaves.'),
    { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'red' }
  )
);

try {
  // Check if we are in a git repo
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
} catch (e) {
  console.log(pc.red('❌ You are not inside a Git repository. Exiting.'));
  process.exit(1);
}

try {
  const currentBranch = execSync('git branch --show-current').toString().trim();
  const rawBranches = execSync("git for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short)|%(committerdate:relative)'").toString().trim();
  
  if (!rawBranches) {
    console.log(pc.green('✨ Your repository is completely clean. No branches found.'));
    process.exit(0);
  }

  const branches = rawBranches.split('\n').map(line => {
    const [name, date] = line.split('|');
    return { name: name.trim(), date: date.trim() };
  }).filter(b => b.name !== currentBranch);

  if (branches.length === 0) {
    console.log(pc.green(`✨ You only have the current branch (${currentBranch}). Nothing to reap.`));
    process.exit(0);
  }

  const choices = branches.map(b => {
    // Color code based on age
    let dateColored = pc.gray(b.date);
    if (b.date.includes('year') || b.date.includes('months')) {
      dateColored = pc.red(b.date);
    } else if (b.date.includes('weeks')) {
      dateColored = pc.yellow(b.date);
    }

    return {
      name: `${b.name.padEnd(30)} 🕒 ${dateColored}`,
      value: b.name,
      short: b.name
    };
  });

  const { selected } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'selected',
    message: `Select dead branches to permanently delete (Current: ${pc.cyan(currentBranch)}):`,
    choices: choices,
    pageSize: 10,
    loop: false
  }]);

  if (selected.length === 0) {
    console.log(pc.gray('\nMission aborted. No branches deleted.'));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: pc.bgRed(pc.white(` WARNING: You are about to permanently delete ${selected.length} branches. Proceed? `)),
    default: false
  }]);

  if (!confirm) {
    console.log(pc.gray('\nMission aborted.'));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  console.log();
  let deleted = 0;
  for (const branch of selected) {
    try {
      execSync(`git branch -D ${branch}`, { stdio: 'ignore' });
      console.log(pc.green(`✔ Deleted branch: `) + pc.white(branch));
      deleted++;
    } catch (e) {
      console.log(pc.red(`❌ Failed to delete branch: `) + pc.white(branch));
    }
  }

  console.log(
    boxen(
      pc.green(`Mission Accomplished.\n`) + pc.white(`Reaped ${deleted} dead branches.`),
      { padding: 1, margin: { top: 1 }, borderStyle: 'round', borderColor: 'green' }
    )
  );

  console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));

} catch (error) {
  console.error(pc.red('\nAn unexpected error occurred:'), error.message);
  process.exit(1);
}
