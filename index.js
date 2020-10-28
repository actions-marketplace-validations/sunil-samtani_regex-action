const core = require('@actions/core');

try {
  let regexPattern = core.getInput('regex_pattern');
  let regexFlags = ''
  let searchString = core.getInput('search_string');
  if (!regexPattern) {
    core.setFailed('regex_pattern input is required');
    return;
  }
  if (!searchString) {
    core.setFailed('search_string input is required');
    return;
  }
  let regex = new RegExp(regexPattern, regexFlags);
  let matches = searchString.match(regex);
  if (!matches) {
    console.log('Could not find any matches');
    return;
  }
  console.log('Found:', matches);
  console.log('set output "first_match":', matches[0]);
  console.log('set output "match_grp":', matches[1]);
  core.setOutput('first_match', matches[0]);
  core.setOutput('match_grp', matches[1]);
} catch (error) {
  core.setFailed(error.message);
}
