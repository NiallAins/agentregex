const text = {
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
    [
      `
<span class="title">-- MISSION</span>
  
We have gained access to our enemies' communication network
Using this connection, and your skills, we will attempt to gather intelligence and undertake sabotage operations
To minimise the chance of detection by our enemies' bandwidth monitoring systems, try to submit your commands in their shortest possible form

The Commander wishes you luck


Enter <i>submit</i> once you are ready to receive your first mission
Enter <i>help</i> to return to the help page
`,
    ],
    [
      `
<span class="title">-- MISSION operation brotherhood </span>
      
We have intercepted a data dump containing the names of enemy operatives
We believe several brothers of the infamous Brunner family are currently working as agents

Find out how many of these brothers are included in the data

Enter <i>submit</i> once you have the correct information in the command output
Enter <i>hint</i> to request assistance `,
      `
Mission successful!`
    ]
  ],
  hint: [
    [
      '',
    ],
    [
      `
Use the command <i>count</i> followed by a regex which matches the name 'Brunner'

Enter <i>functions</i> to learn more about the <i>count</i> command
Enter <i>regex</i> to learn more about creating regex patterns`
    ]
  ],
  solution: [
    [''],
    [
      '5'
    ]
  ],
  fail: {
    header: `
<span class="title">-- MISSION Failure </span>

You have submitted an incorrect output`,
    footer: `

Enter <i>submit</i> again once you have generated the correct output

Enter <i>hint</i> to request assistance 
Enter <i>skip</i> to give up on this mission goal`,
    message: [
      '\nAs a result of your incompetence, our enemies have carpet bombed a small rural village',
      '\nYou have brought shame on our unit in the eyes of The Commander',
      '\nYour error has led to one our agents in the field being waterboarded',
      '\nYou are a failure, just like your father!',
      '\nA messenger has been dispatched to inform your mother of your incompetence',
      '\nYou have been added to The Commander\'s list.. and not the good one',
      '\nWhy has the lord brought you to me, why must I be punished!'
    ]
  },
  document: [
    ``,
    `
[{
    id: 38423,
    lastName: "Wright",
    firstName: "Sergey"
},{
    id: 40834,
    lastName: "Evans",
    firstName: "Monika M"
},{
    id: 99719,
    lastName: "Evans",
    firstName: "Daniel"
},{
    id: 85617,
    lastName: "Brunner",
    firstName: "Dima Andrew"
},{
    id: 07394,
    lastName: "Roberts",
    firstName: "Alina Ola"
},{
    id: 85422,
    lastName: "Owen",
    firstName: "Daniel"
},{
    id: 77527,
    lastName: "Evans",
    firstName: "Tanya"
},{
    id: 66426,
    lastName: "Jenkins",
    firstName: "Aleksandra"
},{
    id: 33236,
    lastName: "Brunner",
    firstName: "Kasia Ivan"
},{
    id: 74174,
    lastName: "Jones",
    firstName: "Kasia"
},{
    id: 95317,
    lastName: "Clarke",
    firstName: "Tanya"
},{
    id: 79798,
    lastName: "Williams",
    firstName: "Kate Tanya"
},{
    id: 67010,
    lastName: "Griffiths",
    firstName: "Michael"
},{
    id: 13859,
    lastName: "Hall",
    firstName: "Michael"
},{
    id: 84022,
    lastName: "Lewis",
    firstName: "Irina S"
},{
    id: 29988,
    lastName: "Hughes",
    firstName: "Irina"
},{
    id: 39128,
    lastName: "Jones",
    firstName: "Alexander"
},{
    id: 54074,
    lastName: "Evans",
    firstName: "Dasha"
},{
    id: 73938,
    lastName: "Moss",
    firstName: "Karolina"
},{
    id: 55308,
    lastName: "Lewis",
    firstName: "Alexandra"
},{
    id: 52321,
    lastName: "Fischer",
    firstName: "Alexandra"
},{
    id: 56658,
    lastName: "Taylor",
    firstName: "Tanya"
},{
    id: 87983,
    lastName: "Hall",
    firstName: "Maria"
},{
    id: 77385,
    lastName: "Williams",
    firstName: "Mary"
},{
    id: 92245,
    lastName: "Brunner",
    firstName: "Karolina David"
},{
    id: 19581,
    lastName: "Hughes",
    firstName: "Igor"
},{
    id: 68086,
    lastName: "Dris",
    firstName: "John"
},{
    id: 91485,
    lastName: "Evans",
    firstName: "Nikita George"
},{
    id: 35642,
    lastName: "Meyer",
    firstName: "Dasha"
},{
    id: 99186,
    lastName: "Brunner",
    firstName: "Monika"
},{
    id: 30346,
    lastName: "Brunner",
    firstName: "Ola"
},{
    id: 90336,
    lastName: "Thompson",
    firstName: "Nastya"
}]`
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
  matches any character
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
  ex. <i>/a[bc?-]/</i> matches 'ab', 'ac', 'a?' and 'a-'

[-]
  matches any character within a range
  ex.
    <i>/a[a-c]/</i> matches 'aa', 'ab' and 'ac'
    <i>/a[A-B0-9]/</i> matches 'aA', 'aB', 'a0', etc.

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
  matches a new line break

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
  A replace pattern can also be given in single-quotes, to specify which groups within
  a match to output
  ex. <i>find /abc|d/</i> outputs all instances of 'abc' and 'abd' found
      <i>find /ab(c|d)/ '$1'</i> outputs only the 'c|d' part of each match

<i>replace</i>
  Replaces text found in a document by a given regex with new text given in
  single-quotes, then outputs the document
  The replacement text can also include a replace pattern
  ex. <i>replace /[0-9]/ '0'</i> outputs a document with all numbers replaced with zeros
      <i>replace /([0-9])([0-9])/ '$2'</i> outputs a document where all two digit numbers
      have had their first digit removed`
  }
};