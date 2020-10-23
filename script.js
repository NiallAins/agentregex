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
  currentMission = 0,
  currentSubMission = 0,
  history = [],
  historyPlace = -1,
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
  if (e.code == 'Enter') {
    document.getElementById('debug').innerHTML += '\n' + conInput.value;
    if (conInput.value === '') {
      return;
    }
    try {
      let command = parseCommand(conInput.value);
      switch (command[0]) {

        //
        // Find command
        //
        case 'find': {
          let params = parseRegex(command[1]);
          if (params.error) {
            loadText('\n<span class="error">Invalid ' + params.error + ':</span> <i>' + [command[1], command[2]].join(' ') + '</i>');
          } else {
            let matches = text
              .document[currentMission]
              .match(new RegExp(params[0], 'gi'))
            if (matches) {
              loadText(
                matches.map(m =>
                  m.replace(
                    new RegExp(params[0], 'i'),
                    params[1] || '$&'
                  )
                )
                .join('\n')
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
          if (params.error || params[1] === '') {
            loadText(
              '\n<span class="error"> Invalid ' +
              (
                params.error
                  ? params.error + ':</span> <i>' + [command[1], command[2]].join(' ') + '</i>'
                  : 'command: missing replace pattern</span>'
              )
            )
          } else {
            let
              regex = new RegExp(params[0], 'gi');
              replaces = text.document[currentMission].match(regex);
            replaces = replaces ? replaces.length : 0;
            loadText(
              text.document[currentMission].replace(regex, '<b>' + params[1] + '</b>'),
              false,
              '\n[' + replaces + ' edits made]'
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
            let count = text
              .document[currentMission]
              .match(new RegExp(params[0], 'gi'));
            loadText(count ? count.length : '0');
          } else {
            loadText('</br><span class="error">Invalid regex:</span> <i>' + command[1] + '</i>');
          }
          break;
        }
        
        //
        // Get mission details
        //
        case 'mission':
          loadText(text.mission[currentMission][currentSubMission]);
          break;

        //
        // Display mission hint
        //
        case 'hint':
          let hint = text.hint[currentMission][currentSubMission];
          if (hint) {
            score.hint += 1;
          } else {
            hint = 'No hints available';
          }
          hint += '\n\n\nEnter <i>functions</i> to learn more about the <i>count</i>, <i>find</i> and <i>replace</i> commands\nEnter <i>regex</i> to learn more about creating regex patterns';
          loadText('\n<span class="title">-- REQUESTNG HINT</span>\n\n' + hint);
          break;

        //
        // Submit solution
        //
        case 'submit':
          if (currentSubMission === text.mission[currentMission].length - 1) {
            currentSubMission = 0;
            currentMission += 1;
            loadText(text.mission[currentMission][currentSubMission]);
            loadText(text.document[currentMission], true);
          } else if (checkSolution()) {
            currentSubMission += 1;
            loadText(text.mission[currentMission][currentSubMission]);
          } else {
            let failText =
              text.fail.header +
              text.fail.message[Math.floor(Math.random() * text.fail.message.length)] +
              text.fail.footer;
            loadText(failText);
          }
          break;

        //
        // Functions, Help & Regex commands
        //
        default:
          if (!text[command[0]]) {
            loadText('</br><span class="error">Invalid command:</span> <i>' + command.join(' ') + '</i>');
          } else {
            loadText(
              text[command[0]][command[1] || 'default'] ||
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
  else if (e.code === 'ArrowUp') {
    if (historyPlace < history.length - 1) {
      historyPlace += 1;
      conInput.value = history[historyPlace];
      setTimeout(() => conInput.selectionStart = conInput.selectionEnd = 10000);
    }
  } else if (e.code === 'ArrowDown') {
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
    return [parts[1], parts[2] || ''];
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
    answer = text.solution[currentMission][currentSubMission];

  return answer === submit || answer(submit);
}

//
// Text loading effect
//
let
  conTextInterval,
  docTextInterval;
function loadText(text, isDoc = false, appendText = '') {
  let
    maxHeight = isDoc ? 540 : 540,
    output = isDoc ? docOutput : conOutput,
    loader = isDoc ? docLoader : conLoader,
    contain = isDoc ? docContain : conContain,
    interval = isDoc ? docTextInterval : conTextInterval;

  clearInterval(interval);
  output.innerHTML = text;
  loader.innerHTML = '';
  loader.style.paddingTop = maxHeight;
  
  setTimeout(() => {
    let
      target = Math.max(20, maxHeight - output.clientHeight);
      current = maxHeight;

    if (assets.textClick.paused) {
      assets.textClick.play();
    }

    interval = setInterval(() => {
      current -= 20;
      loader.style.paddingTop = current + 'px';
      if (current <= target) {
        clearInterval(interval);
        isDoc ? docTextInterval = 0 : conTextInterval = 0;
        if (!docTextInterval && !docTextInterval) {
          assets.textClick.pause();
        }
        let overflow = (output.clientHeight - contain.clientHeight) + (isDoc ? 85 : 130);
        if (overflow > 0) {
          loader.innerHTML = '[' + Math.ceil(overflow / 20) +  ' more lines]';
        }
      }
    }, 30);
    isDoc ? docTextInterval = interval : conTextInterval = interval;
  }, 30);
}

function loadText1(stream, isDoc = false, appendText = '') {




  interval = setInterval(
    () => {
      target.innerHTML += stream[pos] + (isDoc ? '' : '\n');
      pos += 1;
      if (
        target.clientHeight > maxHeight &&
        stream.length - pos > 0
      ) {
        let linesLeft =
          isDoc
            ? stream.match(/\n/g).length - target.innerHTML.match(/\n/g).length
            : stream.length - pos;
        if (isDoc) {
          target.innerHTML = target.innerHTML.substr(0, target.innerHTML.length - 1);
        }
        target.innerHTML += appendText;
        target.innerHTML += `\n[${linesLeft} more lines]`;
        end = true;
      }
      if (pos >= stream.length || end) {
        clearInterval(interval);
        isDoc ? docTextInterval = 0 : conTextInterval = 0;
        if (!docTextInterval && !conTextInterval) {
          assets.textClick.pause();
        }
      }
    },
    isDoc ? 0 : 30
  );
  isDoc ? docTextInterval = interval : conTextInterval = interval;
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
    loadText(text.help.default);
  }
  assets.textClick.load();
}

init();