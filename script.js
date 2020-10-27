//
// View bindings
//
const
  docOutput = document.getElementById('docOutput'),
  conInput = document.getElementById('conInput'),
  conOutput = document.getElementById('conOutput'),
  conLoader = document.getElementById('conLoader'),
  docLoader = document.getElementById('docLoader');

//
// Game state
//
let
  missionNum = 0,
  goalNum = 0,
  currentMission = content.mission[missionNum],
  history = [],
  historyPlace = -1,
  hintRequested = false,
  score = {
    hints: 0,
    fails: 0,
    skips: 0
  };

//
// Key controls
//
conInput.addEventListener('keyup', e => {

  //
  // Enter a command
  //
  if (e.key == 'Enter') {
    document.getElementById('debug').innerHTML += '\n' + conInput.value;
    if (conInput.value === '') {
      return;
    }
    try {
      let command = parseCommand(conInput.value);
      switch (command[0]) {
        //
        // Get mission details
        //
        case 'mission':
          loadText(currentMission.title + currentMission.goal[goalNum]);
          break;

        //
        // Find command
        //
        case 'find': {
          let params = parseRegex(command[1]);
          if (params.error) {
            loadText('\n<span class="error">Invalid ' + params.error + ':</span> <i>' + [command[1], command[2]].join(' ') + '</i>');
          } else {
            let matches = currentMission.document
              .match(new RegExp(params[0], 'gi'))
            if (matches) {
              loadText(
                '\n' +
                matches.map(m =>
                  m.replace(
                    new RegExp(params[0], 'i'),
                    params[1] || '$&'
                  )
                )
                .join('\n'),
                false,
                '\n<i>submit</i> to submit this output'
              )
            } else {
              loadText('\n[No matches found]');
            }
          }
          break;
        }

        //
        // Replace command
        //
        case 'replace': {
          let params = parseRegex(command[1]);
          console.log(params);
          if (params.error || params[1] === false) {
            loadText(
              '\n<span class="error"> Invalid ' +
              (
                params.error
                  ? params.error + ':</span> <i>' + [command[1], command[2]].join(' ') + '</i>'
                  : 'command: missing replacement text</span>'
              )
            )
          } else {
            let
              regex = new RegExp(params[0], 'gi'),
              replaces = currentMission.document.match(regex)?.length || 0;
            loadText(
              currentMission.document.replace(
                regex,
                `<b${params[1] === '' ? ' class="empty"' : ''}>${params[1] || ' '}</b>`
              ),
              false,
              `\n[${replaces} edit${replaces === 1 ? '' : 's'} made]\n<i>submit</i> to submit this document`
            )
          } 
          break;
        }

        //
        // Count command
        //
        case 'count': {
          let params = parseRegex(command[1]);
          if (params) {
            loadText(
              '\n' + (
                currentMission.document.match(new RegExp(params[0], 'gi'))?.length
                || 0
              ),
              false,
              '\n<i>submit</i> to submit this output'
            );
          } else {
            loadText('</br><span class="error">Invalid regex:</span> <i>' + command[1] + '</i>');
          }
          break;
        }

        //
        // Submit solution
        //
        case 'submit':
          if (goalNum === currentMission.goal.length - 1) {
            hintRequested = false;
            goalNum = 0;
            missionNum += 1;
            currentMission = content.mission[missionNum];
            loadText(currentMission.title + currentMission.goal[goalNum]);
            loadText(currentMission.document, true);
          } else if (checkSolution()) {
            hintRequested = false;
            goalNum += 1;
            loadText(
              currentMission.title +
              (goalNum === currentMission.goal.length - 1 ? '\nMission Success\n' : '\nSuccess\n') +
              currentMission.goal[goalNum]
            );
          } else {
            score.fail += 1;
            let failText =
              currentMission.title +
              '\n<span class="error">Attempt Failed</span>\n' +
              content.fail[Math.floor(Math.random() * content.fail.length)] +
              '\n\n\n<i>submit</i>  again when you have the correct information in the console output' +
              '\n<i>hint</i>    request assistance\n<i>skip</i>    give up on this mission goal'
            loadText(failText);
          }
          break;

        //
        // Display mission hint
        //
        case 'hint':
          let hint = currentMission.hint[goalNum];
          if (hint) {
            if (!hintRequested) {
              score.hint += 1;
              hintRequested = true;
            }
          } else {
            hint = 'No hints available';
          }
          loadText(
            '\n<span class="title">-- REQUESTNG HINT</span>\n\n' +
            hint +
            '\n\n\n<i>functions</i>  learn about the commands <i>count</i>, <i>find</i> and <i>replace</i>' +
            '\n<i class="sp-1">regex</i>      learn about creating regex patterns'
          );
          break;

        //
        // Skip mission goal
        //
        case 'skip':
          if (goalNum === currentMission.goal.length - 1) {
            hintRequested = false;
            goalNum = 0;
            missionNum += 1;
            currentMission = content.mission[missionNum];
            loadText(
              currentMission.title +
              '\n<span class="error">Mission Goal Failed</span>\n' +
              currentMission.goal[goalNum]
            );
            loadText(currentMission.title + currentMission.goal[goalNum]);
            loadText(currentMission.document, true);
          } else {
            hintRequested = false;
            score.fails += 1;
            goalNum += 1;
            loadText(
              currentMission.title +
              '\n<span class="error">Mission Goal Failed</span>\n' +
              currentMission.goal[goalNum]
            );
          }
          break;

        //
        // Functions, Help & Regex commands
        //
        default:
          if (!content[command[0]]) {
            loadText('</br><span class="error">Invalid command:</span> <i>' + command.join(' ') + '</i>');
          } else {
            loadText(
              content[command[0]][command[1] || 'default'] ||
              '<br /><span class="error">Invalid command option:</span> <i>' + command[1] + '</i>'
            );
          }
          break;
       }

    //
    // Invalid command error
    //
    } catch(e) {
      console.log(e);
      loadText('</br><span class="error">Invalid command</span>');
    }

    history.unshift(conInput.value);
    historyPlace = -1;
    conInput.value = '';
  }

  //
  //  Command history
  //
  else if (e.key === 'ArrowUp') {
    if (historyPlace < history.length - 1) {
      historyPlace += 1;
      conInput.value = history[historyPlace];
      setTimeout(() => conInput.selectionStart = conInput.selectionEnd = 10000);
    }
  } else if (e.key === 'ArrowDown') {
    if (historyPlace > -1) {
      historyPlace -= 1;
      conInput.value = historyPlace === -1 ? '' : history[historyPlace];
      setTimeout(() => conInput.selectionStart = conInput.selectionEnd = 10000);
    }
  }

  //
  //  Text input listener to render regex matches on document
  //
  let regex = conInput.value.match(/\/([^\/]*)/);
  if (regex && regex[1]) {
    try {
      docOutput.innerHTML =
        docOutput.innerText
        .replace(new RegExp(regex[1], 'gi'), '<b>$&</b>'); 
    } catch(e) {}
  } else {
    docOutput.innerHTML = docOutput.innerText;
  }
});

//
// Parse comand line input arguments
//
function parseCommand(str) {
  let parts = str.split(' ');
  parts[0] = parts[0].toLowerCase();
  if (parts[0] === 'find' || parts[0] === 'count' || parts[0] === 'replace') {
    let command = parts.shift();
    return [command, parts.join(' ')];
  }
  return parts;
}

//
// Parse regex function arguments
//
function parseRegex(pattern) {
  if (!pattern.match(/\/.*\//)) {
    return { error: 'regex'};
  }
  if (pattern.match(/\/.*\/\s?[^\s]+/) && !pattern.match(/\/.*\/\s+'.*'/)) {
    return { error: 'replace pattern'}
  }
  try {
    let parts = pattern.match(/\/(.*)\/(?: '(.*)')?/);
    // Test valid regex
    ''.replace(new RegExp(parts[1]), parts[2] || '');
    return [parts[1], parts[2] || parts[2] === '' ? parts[2] : false];
  } catch(e) {
    return { error: 'regex' } 
  }
}

//
// Compare output with solution
//
function checkSolution() {
  let
    submit = conOutput.innerText.toString().replace(/[\n\s]/g, ''),
    answer = currentMission.solution[goalNum];

  return typeof answer === 'string' ? answer  === submit : answer(submit);
}

//
// Text loading effect
//
let
  conTextInterval,
  docTextInterval;
function loadText(text, isDoc = false, appendText = '') {
  let
    maxHeight = isDoc ? 560 : 520,
    output = isDoc ? docOutput : conOutput,
    loader = isDoc ? docLoader : conLoader,
    contain = isDoc ? docContain : conContain,
    interval = isDoc ? docTextInterval : conTextInterval;

  clearInterval(interval);
  output.innerHTML = text;
  loader.innerHTML = '';
  loader.style.height = maxHeight;
  
  setTimeout(() => {
    let
      appendLines = appendText.match(/\n/g)?.length || 0,
      target = Math.max(20 + (appendLines * 20), maxHeight - output.clientHeight),
      current = maxHeight;

    if (assets.textClick.paused) {
      assets.textClick.play();
    }

    interval = setInterval(() => {
      loader.style.height = current + 'px';
      current -= 20;
      if (current < target) {
        clearInterval(interval);
        isDoc ? docTextInterval = 0 : conTextInterval = 0;
        if (!docTextInterval && !docTextInterval) {
          assets.textClick.pause();
        }
        let overflow = Math.ceil(
          (
            (output.clientHeight - contain.clientHeight) +
            (isDoc ? 105 : 150)
          ) / 20
        );
        if (overflow > 0) {
          loader.innerHTML = `[${overflow + appendLines} more line${overflow + appendLines === 1 ? '' : 's'}]`;
          if (appendText) {
            loader.innerHTML += appendText;
          }
        } else {
          loader.innerHTML += appendText;
        }
      }
    }, 30);
    isDoc ? docTextInterval = interval : conTextInterval = interval;
  }, 30);
}

//
// Load assets
//
const assets = {
  textClick: new Audio('./textClick.wav')
};

//
// Game entry point
//
function init() {
  conInput.focus();

  assets.textClick.loop = true;
  assets.textClick.oncanplaythrough = () => {
    assets.textClick.oncanplaythrough = () => {};
    loadText(content.help.default);
  }
  assets.textClick.load();
}

init();