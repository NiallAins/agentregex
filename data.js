const content = {
  help: {
    default: `
<span class="title">-- HELP</span>

Enter commands in the console to perform actions
Use the up and down arrow keys to scroll through previous commands

Commands:

  <i>help</i>
    open this screen

  <i>mission</i>
    get information on your current mission

  <i>regex</i>
    learn how to use regex

  <i>functions</i>
    learn how to use the functional commands <i>find</i>, <i>count</i> and <i>replace</i>`
  },
  mission: [
    {
      title: '\n<span class="title">-- MISSION</span>\n',
      goal: [`
We have gained access to our enemy's communication network
Using this connection, and your skills, we will attempt to gather intelligence and undertake sabotage operations
To minimise the chance of detection by our enemy's bandwidth monitoring, try to submit your commands in their shortest possible form
    
The Commander wishes you luck
    

Enter <i>submit</i> once you are ready to receive your first mission
Enter <i>help</i> to return to the help page`
      ],
      hint: [],
      document: '',
    },
    {
      title: '\n<span class="title">-- MISSION operation brotherhood</span>\n',
      goal: [
        `
We have intercepted a data dump containing the names and IDs of enemy operatives
We believe several brothers of the infamous Baumann family are currently working as agents

Count how many of these brothers are included in the data


Enter <i>submit</i> once you have the correct information in the console output
Enter <i>hint</i> to request assistance`,
        `
We have now found that some members of the Baumann family spell their name <span class="nobreak">with only a single 'n'</span>
Accounting for this, re-count the number of brothers in the data`,
        `
Our intel has found that lower ID numbers are assigned to the most important agents
Find the ID numbers of any agent ranking in the top 100 most important`,
        `
Harry Baumann seems to be the highest ranked of the brothers in our data... and so the worst of our enemies!
Replace his ID number with a number above 10,000 to demote him and sabotage his credentials`,
        `
You have exposed the Baumann brothers' data and sabotaged Harry Baumann's rank; as a result his medical license will be revoked and his pediatrics research work destroyed

The High Commander commends your success!


Enter <i>submit</i> once you are ready to receive your next mission`
      ],
      solution: [
        '4',
        '6',
        a => a === '"10""7""3""6""14""16""7""12""14""85"' || a === '1073614167121485',
        a => !!a.match(/DrBaumann,Harry"[0-9]{5,}"/)
      ],
      hint: [
        "Use the command <i>count</i> followed by a regex which matches the name 'Baumann'",
        "Use the command <i>count</i> followed by a regex which matches both the name 'Baumann' and the name 'Bauman'",
        'Use the command <i>find</i> followed by a regex which matches any one or two digit number within quote marks'
      ],
      document: `
Meyer, Mateusz "0879"
Moss, Alexander "32117"
White, Andrey Irina "3079"
Moss, Mary J "10"
Taylor, Marina B "78680"
Steiner, Liza "87184"
Baumann, Artem David "311"
White, Katya "47861"
Gerber, Alex Olga "94386"
Huber, Pavel "913"
Walker, Anna "36006"
Evans, Diana "7"
Evans, Pavel "95982"
Moss, Daniel "74465"
Evans, Alex J "5666"
Dris, Liza Anastasia "16787"
Davies, Alex "43436"
Dr Baumann, Harry "68200"
White, David M "7727"
Thomas, John "60596"
Smith, Natalia "3945"
Williams, Aleksandra Kate "692"
Evans, Michael "42762"
Meier, Michael "96093"
Bauman, Sasha "90218"
Morgan, Andrey "51471"
Smith, Jakub "02458"
White, Mary "8123"
Davies, Jakub Martin "15452"
Gerber, Monika "8479"
Evans, Kasia Michael "3"
Owen, Kate Alexander "95443"
Fischer, Olga I "79154"
Hughes, Karolina "13801"
Weber, Pavel "08138"
Meyer, Kasia S "57379"
Meier, Ivan "7598"
Smith, John "82174"
Evans, Katya "32957"
Jenkins, Dmitry "62990"
Morgan, Diana Jakub "28479"
Green, Ivan "55357"
Schneider, Dima Olga "49451"
Frei, Liza "6"
Jackson, Dima Katya "68007"
Evans, Szymon Veronika "91207"
Williams, Sergey "79708"
White, Dima "01581"
Jackson, Andrew "18070"
James, Michael "14"
Brown, Ola "17715"
Dris, Daria Peter "01964"
Phillips, George Marina "64481"
Williams, Peter Peter "19615"
Wright, Dominika Liza "37905"
Owen, David Vlad "15533"
Evans, Veronika "76310"
James, Sergey "99399"
Baumann, Anton "80884"
Williams, Nikita "16"
Phillips, George "18886"
Hall, Martin "01577"
Evans, Alexandra "94711"
James, Maria Ola "44887"
Meyer, Ola "28068"
Smith, Harry "7"
Steiner, Vlad A "06698"
Brown, Andrey "02785"
Frei, David "53331"
Jones, Paulina "68314"
Brown, Aleksandra Alexandra "49125"
Evans, Daria "93539"
Wilson, Karolina Tanya "99530"
Evans, Mateusz "61456"
Jones, Monika "12"
Walker, Dmitry "19557"
Owen, Jakub "90672"
Roberts, Andrew Anastasia "31061"
Baumann, Peter Olga "71239"
Meyer, George A "62020"
Williams, Peter "95804"
Schmid, David "14"
Jones, Maria "16926"
Phillips, Karolina "52420"
Bauman, Kasia "76335"
Price, Diana Anton "88328"
Phillips, Julia "48311"
Meyer, Dasha "49737"
James, Victoria "45299"
Morgan, Olga "85"
Rees, Daria "35231"
Hall, Vlad "42288"
Evans, Julia "95001"
Jackson, Tanya Peter "13491"
Schmid, Mary "24194"
Keller, Paulina E "67528"
Williams, Nick "11425"
Moser, Daniel "74864"
Moser, Natalia "91713"
Wood, Vlad "009905"`
    },
    {
      title: 'End of Missions',
      goal: [
        '',
        ''
      ],
      solution: [

      ],
      hint: [

      ],
      document: `
      `
    }
  ],
  fail: [
    '\nAs a result of your incompetence, our enemies have carpet bombed a small rural village',
    '\nYou have brought shame on our unit in the eyes of The Commander',
    '\nYour error has led to one our agents in the field being waterboarded',
    '\nYou are a failure, just like your father!',
    '\nA messenger has been dispatched to inform your mother of your incompetence',
    '\nYou have been added to The Commander\'s list.. and not the good one',
    '\nWhy has the lord brought you to me, why must I be punished!'
  ],
  regex: {
    default: `
<span class="title">-- REGEX</span>

Regex is a pattern matching tool
It is used to perform find and replace actions on a document

Regex patterns are enclosed in forward slashes
ex. <i>/abc/</i> will find all instances of 'abc' in a document

Special characters can be used to find more advanced patterns
ex. <i>/ab[1-3]/</i> uses the 'range' brackets to find all instances of 'ab' followed
    by a number between 1 and 3

Enter <i>regex</i> followed by one of keywords below to learn more special characters:
  <span class="i-list"><i>or</i>       <i>wildcard</i>      <i>repeat</i>    <i>group</i></span>
  <span class="i-list"><i>range</i>    <i>whitespace</i>    <i>escape</i>    <i>replace</i></span>

Enter <i>regex all</i> for a summary of all special characters`,
    or: `
<span class="title">-- REGEX or</span>

|
  matches either the character before or the character after this symbol
  ex. <i>/ab|c/</i> matches 'ab' and 'ac'

More options for <i>regex</i> command:
  <span class="i-list"><i>wildcard</i>      <i>repeat</i>    <i>group</i>      <i>range</i></span>
  <span class="i-list"><i>whitespace</i>    <i>escape</i>    <i>replace</i>    <i>all</i></span>`,
    wildcard: `
-- REGEX wildcard

.
  matches any character (except for a line break)
  ex. <i>/ab./</i> matches 'abc', 'ab9', 'ab?', 'ab ', etc.

More options for <i>regex</i> command:
  <span class="i-list"><i>or</i>            <i>repeat</i>    <i>group</i>       <i>range</i></span>
  <span class="i-list"><i>whitespace</i>    <i>escape</i>    <i>replace</i>    <i>all</i></span>`,
    repeat: `
<span class="title">-- REGEX repeat</span>

*
  matches the previous character 0 or more times
  ex. <i>/ab*/</i> matches 'a', 'ab', 'abbbbbb', etc.

+
  matches the previous character 1 or more times
  ex. <i>/ab+/</i> matches 'ab', 'abbbbbb', etc.

?
  matches the previous character 0 or 1 times
  ex. <i>/ab?/</i> matches 'a' and 'ab'

{}
  specifies the number of times the previous character can repeat
  ex. <i>/ab{3}/</i>     matches 'abbb'
      <i>/ab{2,4}/</i>   matches 'abb', 'abbb' and 'abbbb'
      <i>/ab{2,}/</i>    matches 'a' followed by 'b' 2 or more times

More options for <i>regex</i> command:<span class="i-list">
  <span class="i-list"><i>or</i>            <i>wildcard</i>    <i>group</i>      <i>range</i></span>
  <span class="i-list"><i>whitespace</i>    <i>escape</i>      <i>replace</i>    <i>all</i></span>`,
    range: `
<span class="title">-- REGEX range</span>

[]
  matches any character inside
  ex. <i>/a[bc? -]/</i> matches 'ab', 'ac', 'a?', 'a ' and 'a-'

[-]
  matches any character within a range
  can include multiple ranges and single characters
  ex.
    <i>/a[a-c]/</i> matches 'aa', 'ab' and 'ac'
    <i>/a[0-9a-d!]/</i> matches 'a7', 'ab', 'a!', etc.

[^]
  matches any character not inside
  ex. <i>/[^bc]/</i> matches 'a', 'd', 'e', etc.
      <i>/[^0-6]/</i> matches '7', '8', '9', etc.

More options for <i>regex</i> command:<span class="i-list">
  <span class="i-list"><i>or</i>            <i>wildcard</i>    <i>repeat</i>     <i>group</i></span>
  <span class="i-list"><i>whitespace</i>    <i>escape</i>      <i>replace</i>    <i>all</i></span>`,
    group: `
<span class="title">-- REGEX group</span>

()
  causes the characters inside to be treated as a group
  ex. <i>/a(bc)+/</i> matches 'abc', 'abcbc', 'abcbcbc', etc.


More options for <i>regex</i> command:<span class="i-list">
  <span class="i-list"><i>or</i>            <i>wildcard</i>    <i>repeat</i>     <i>range</i></span>
  <span class="i-list"><i>whitespace</i>    <i>escape</i>      <i>replace</i>    <i>all</i></span>`,
    replace: `
<span class="title">-- REGEX replace</span>

$&
  used in a replace command to insert the matched text
  ex. <i>replace /ab/ '$& $& '</i> will turn the text 'abcd' into 'ab ab cd'

$1
  used in a replace function to insert a specific numbered group
  ex. <i>replace /(ab)(cd)/ '$2 ef $1'</i> will turn the text 'adcd' into 'cd ef ab'


More options for <i>regex</i> command:<span class="i-list">
  <span class="i-list"><i>or</i>       <i>wildcard</i>      <i>repeat</i>    <i>group</i></span>
  <span class="i-list"><i>range</i>    <i>whitespace</i>    <i>escape</i>    <i>all</i></span>`,
    whitespace: `
<span class="title">-- REGEX whitespace</span>

\\s
  matches any whitespace character

\\S
  matches any non-whitespace character

\\n
  matches a line break

\\t
  matches a tab character

More options for <i>regex</i> command:<span class="i-list">
  <span class="i-list"><i>or</i>       <i>wildcard</i>    <i>repeat</i>     <i>group</i></span>
  <span class="i-list"><i>range</i>    <i>escape</i>      <i>replace</i>    <i>all</i></span>`,
    escape: `
<span class="title">-- REGEX escape</span>

\\
  placing this before any special character causes it to be 'escaped' and so treated as a normal character
  ex. <i>/ab\\*c/</i> matches 'ab*c'


More options for <i>regex</i> command:
  <span class="i-list"><i>or</i>       <i>wildcard</i>      <i>repeat</i>    <i>group</i></span>
  <span class="i-list"><i>range</i>    <i>whitespace</i>    <i>replace</i>   <i>all</i></span>`,
    all: `
<span class="title">-- REGEX all</span>

|      character before or character after
.      any character
*      0 or more times
+      1 or more times
?      0 or 1 times
{3}    exactly 3 times
{2,}   two or more times
{2,4}  between 2 and 4 times
[abc]  one of these characters
[^ab]  not one of these characters
[a-z]  one character in this range 
(abc)  treat these characters as a group  
$&     insert the matched pattern
$2     insert the 2nd group within the matched pattern
\\n     line break
\\t     tab character
\\s     any whitespace character
\\S     any non-whitespace character
\\      treat the following special character as a normal character`
  },
  functions: {
    default: `
<span class="title">-- FUNCTIONS</span>

The following commands can be used to manipulate a document:

<i>count</i>
  Outputs the number of matches a given regex finds in a document
  ex. <i>count /abc|d/</i> outputs how many times 'abc' or 'abd' occur

<i>find</i>
  Outputs all matches a given regex finds in a document
  A replace pattern can also be given in single-quotes, to specify which groups within\n  a match to output
  ex. <i>find /abc|d/</i> outputs all instances of 'abc' and 'abd' found
      <i>find /ab(c|d)/ '$1'</i> outputs only the 'c|d' part of each match

<i>replace</i>
  Replaces text found in a document by a given regex with new text given in\n  single-quotes, then outputs the document
  The replacement text can also include a replace pattern
  ex. <i>replace /[0-9]/ '0'</i> outputs a document with all numbers replaced with zeros
      <i>replace /([0-9])([0-9])/ '$2'</i> outputs a document with all two digit numbers\n      replaced with just their second digit`
  }
};