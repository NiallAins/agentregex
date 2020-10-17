//
// View bindings
//
const
  docOutput = document.getElementById('docOutput'),
  conInput = document.getElementById('conInput'),
  conOutput = document.getElementById('conOutput');

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
    if (conInput.value === '') {
      return;
    }
    try {
      let command = parseCommand(conInput.value);
      switch (command[0]) {

        //
        // Find command
        //
        case 'find':
          let matches = text
            .document[currentMission]
            .match(new RegExp(command[1], 'g'))
          if (matches) {
            matches = matches
              .map(m =>
                m.replace(
                  new RegExp(command[1]),
                  command[2] || '$&'
                )
              )
              .join('\n')
          } else {
            matches = '\n[No matches found]';
          }
          loadText(matches);
          break;

        //
        // Replace command
        //
        case 'replace':
          loadText(
            text
              .document[currentMission]
              .replace(new RegExp(command[1], 'g'), command[2])
          );
          break;

        //
        // Count command
        //
        case 'count':
          let count = text
            .document[currentMission]
            .match(new RegExp(command[1], 'g'))
          loadText(count ? count.length : '0');
          break;
        
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
            hint = '\nNo hints available';
          }
          loadText('\n<span class="title">-- REQUESTNG HINT</span>\n' + hint);
          break;

        //
        // Submit solution
        //
        case 'submit':
          if (currentMission === 0 || checkSolution()) {
            currentSubMission += 1;
            if (currentSubMission === text.mission[currentMission].length) {
              currentSubMission = 0;
              currentMission += 1;
              loadText(text.document[currentMission], true);
            }
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
            loadText('</br><span class="error">Invalid command</span>');
          } else {
            loadText(
              text[command[0]][command[1] || 'default'] ||
              '<br /><span class="error">Invalid command option</span>'
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
  else {
    let regex = conInput.value.match(/\/(.*)\//);
    if (regex && regex[1]) {
      try {
        docOutput.innerHTML = text
          .document[currentMission]
          .replace(new RegExp(regex[1], 'g'), '<b>$&</b>'); 
      } catch(e) {}
    }
  }
});

//
// Parse comand line input arguments
//
function parseCommand(str) {
  if (str === '') {
    return ['', '', ''];
  }
  let parts = str.split(' ');
  if (parts[0] === 'find' || parts[0] === 'count' || parts[0] === 'replace') {
    let params = parts
      .join(' ')
      .match(/\/(.*)\/(?: '(.*)')?$/);
    parts[1] = params[1] || '';
    parts[2] = params[2] || '';
  }
  return parts;
}

//
// Compare output with solution
//
function checkSolution() {
  let
    a = text.solution[currentMission][currentSubMission],
    b = conOutput.innerText;

  a = a.toString().replace(/[\n\s]/g, '');
  b = b.toString().replace(/[\n\s]/g, '');

  return a === b;
}

//
// Text loading effect
//
let
  conTextInterval,
  docTextInterval;
function loadText(stream, isDoc = false) {
  let
    pos = 0,
    target = isDoc ? docOutput : conOutput,
    interval = isDoc ? docTextInterval : conTextInterval,
    end = false;

  stream = isDoc ? stream.toString() : stream.toString().split('\n')
  clearInterval(interval);
  target.innerHTML = '';

  if (assets.textClick.paused) {
    assets.textClick.play();
  }

  interval = setInterval(
    () => {
      target.innerHTML += stream[pos] + (isDoc ? '' : '\n');
      pos += 1;
      if (
        target.clientHeight > (isDoc ? 550 :480) &&
        stream.length - pos > 0
      ) {
        target.innerHTML += `\n[${stream.length - pos} more lines]`;
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
    isDoc ? 2 : 30
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