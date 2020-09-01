
let wordArray = ["penguin","locomotive","exciting","firefly","photoshop","Philosophy","Mathematician","Neverending","fundamentally","gastroenterologist"];
let previousWord;
let newWord;
let numberOfGuesses = 6;

const form = document.querySelector("form");
const guessedLetter = document.querySelector("#guess");
const wordElement = document.getElementById("GuessWord");
const alreadyGuessed = document.querySelector("#alreadyGuessed");
const hangmanImg = document.querySelector("img");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(guessedLetter.value != ""){
        Guess();
    } 
    else alert("Guess a letter please.");
    
});

// Initial start generator and render
RenderNumberOfGuesses();
NewWord();
OutputWord();



























////////////////////////////////////////
// Functions
////////////////////////////////////////

// Generates new random word from the array.
function NewWord(){

    

    do
    {
        
        let newWordIndex = Math.floor(Math.random() * (wordArray.length));

        newWord = wordArray[newWordIndex];
    }
    while(newWord === previousWord);

    previousWord = newWord;

}


// Outputs new word on the screen masked
function OutputWord(){

    
    const letter = document.createElement("LI");



    for (let i = 0; i < newWord.length; i++){
        const letter = document.createElement("LI");
        if (i === 0) 
        {
            letter.textContent = newWord[0];  
        }
        else if (i === newWord.length-1){
            letter.textContent = newWord[newWord.length-1];
        }
        else {
            letter.textContent = "_"
        }
        wordElement.appendChild(letter);        

    }

}

// Resets defaults for new game and generates new word
function RestartGame(){
    numberOfGuesses = 6;
    RenderNumberOfGuesses();
    alreadyGuessed.textContent = "Already guessed: ";
    
    // Learned this trick at https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    // I rewrote the code, but this snippet is so fundamental I couldn't have put it into better code myself
    // It's such simple solution, that using it is basically copying it no matter what.
    // The code runs a while loop, while my list has a firstChild element, if it does, it deletes it, then the second child becomes the next firstChild
    // The code runs until there are no child elements left in my list, which contains the letters of the word to be guessed.
    while (wordElement.firstChild){
        wordElement.removeChild(wordElement.firstChild);
    }

    NewWord();
    OutputWord();
    hangmanImg.src="img/0wrong.png";

}


// Main Guess logic
function Guess(){

    let failed = true;
    let guessString = guessedLetter.value.toLowerCase();
    for (let i = 1; i < newWord.length-1; i++)
    {
        if(newWord[i] === guessString)
        {
            let letterChange = document.querySelector("#GuessWord li:nth-of-type("+(i+1)+")");

            letterChange.textContent = guessString;
            failed = false;
            
            
        }
    }
    if (failed) {
        numberOfGuesses--;
        RenderNumberOfGuesses();
        alreadyGuessed.textContent += guessString+", ";
        RenderHangman();
    }
    
    CheckForWordComplete();
    guessedLetter.value = "";
}


// Shows current number of guesses on the screen
function RenderNumberOfGuesses(){
    const numberValue = document.querySelector("#numberOfGuesses");
    numberValue.textContent = numberOfGuesses;
}

function RenderHangman(){

    switch (numberOfGuesses)
    {
        case 5: hangmanImg.src="img/1wrong.png";
                break;
        case 4: hangmanImg.src="img/2wrong.png";
                break;
        case 3: hangmanImg.src="img/3wrong.png";
                break;
        case 2: hangmanImg.src="img/4wrong.png";
                break;
        case 1: hangmanImg.src="img/5wrong.png";
                break;
        case 0: hangmanImg.src="img/6wrong.png";
                break;
        
    }
        
}
// Check whether user guessed all the letters and decides whether player won or lost, or wheter to keep playing
function CheckForWordComplete(){
    let arrayOfLetters = wordElement.children;
    let missingLetters = false;
    for (let i = 1; i < arrayOfLetters.length-1; i++){
        let string = arrayOfLetters[i].textContent;
        if (string === "_")
        {
            missingLetters = true;
        }
        
    }

    if (missingLetters && (numberOfGuesses === 0)){
        alert("You ran out of guesses, you lost this one pal!")
        RestartGame();
    }
    else if (!missingLetters && (numberOfGuesses > 0)){
        alert("Congratulations, you won!")
        RestartGame();
    }
}


