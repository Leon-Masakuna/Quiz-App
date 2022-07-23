//get all importants informations from html elements
let form = document.querySelector("form");
let firstForm = document.querySelector(".validation-part");
let secondForm = document.querySelector(".quiz-part");
let thirdForm = document.querySelector(".result-part");
let formContainer = document.querySelector(".form");
let firstErrorMsg = document.querySelector(".error-message1");
let secondErrorMsg = document.querySelector(".error-message2");
let goButton = document.querySelector("#submit-button");

let radios = document.querySelectorAll(".check-input");

let email = form.querySelector("#user-email");
let nom = form.querySelector("#user-name");

let getName = document.querySelector("#name-result");
let getEmail = document.querySelector("#email-result");
let lastResult = document.querySelector("#last-result-score"); //score
let resultSymbol = document.querySelector("i");

let move = null;
let firstChoice = document.querySelector("#first-radio");
let secondChoice = document.querySelector("#second-radio");
let thirdChoice = document.querySelector("#third-radio");
let fourthChoice = document.querySelector("#fourth-radio");
let choiceBack = document.querySelectorAll(".answers");

let responseChecked; //get checked answer

const btnNext = document.querySelector("#nextButton");
const btnQuit = document.querySelector("#quitButton");

const btnHome = document.querySelector("#home-page");

let timer = document.querySelector("#time-counter");

let max; //max points max
let successScore = 00; //good answer réussite
let id = 0;

//objects array
let answersArray = [];

//listen button click event
goButton.addEventListener("click", validate);

//create validate function called in goButton callback
function validate(event) {
    event.preventDefault();

    // let checkMail = email.value.indexOf("@gmail.com");
    // let checkName = nom.value;

    const checkMail = /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
    const checkMail2 =
        /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,3}\.[a-zA-Z]{1,3}$/;
    const checkMail3 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

    //check form inputs values
    if (
        nom.value == "" ||
        nom.value.length < 2 ||
        email.value == "" ||
        email.value == -1
    ) {
        if (nom.value == "") {
            nom.classList.add("error");
            firstErrorMsg.style.display = "block";
        } else if (nom.value.length < 2) {
            nom.classList.add("error");
            firstErrorMsg.textContent =
                "Saisissez un nom ayant au-moins deux caractères";
            firstErrorMsg.style.display = "block";
        } else {
            firstErrorMsg.textContent = "";
            firstErrorMsg.style.display = "block";
            nom.classList.remove("error");
        }
        if (email.value == "") {
            email.classList.add("error");
            secondErrorMsg.style.display = "block";
        } else if (email.value == -1) {
            email.classList.add("error");
            secondErrorMsg.textContent = "Votre adresse email n'est pas valide";
            secondErrorMsg.style.display = "block";
        } else {
            email.classList.remove("error");
            secondErrorMsg.textContent = "";
            secondErrorMsg.style.display = "block";
        }
    } else if (
        checkMail.test(email.value) ||
        checkMail2.test(email.value) ||
        checkMail3.test(email.value)
    ) {
        firstForm.classList.add("disappear");
        secondForm.style.display = "block";
        progressBar();
        questionnaire(id);
        localStorage.setItem("name", nom.value);
        localStorage.setItem("email", email.value);
        firstForm.style.display = "none";
        form.reset();
    } else {
        email.classList.add("error");
        secondErrorMsg.textContent = "Votre adresse email n'est pas valide";
        secondErrorMsg.style.display = "block";

        firstErrorMsg.textContent = "";
        firstErrorMsg.style.display = "block";
        nom.classList.remove("error");
    }
}

//Create all questions
let allQuestions = [{
        id: 0,
        question: "La méthode qui fait écouter un événement en JavaScript est ?",
        questionNumber: "Question 1/15",
        goodAnswer: "addEventListener",
        responses: [
            "eventListener",
            "executeEvent",
            "addEventListener",
            "function() Listener{}",
        ],
    },
    {
        id: 1,
        question: "Quel est le type d'un fichier JavaScript ?",
        questionNumber: "Question 2/15",
        goodAnswer: ".js",
        responses: [".ts", ".j", ".jsx", ".js"],
    },
    {
        id: 2,
        question: "Quelle est la méthode qui supprime le dernier élément d'un tableau et retourne cet élément ?",
        questionNumber: "Question 3/15",
        goodAnswer: "pop()",
        responses: ["pop()", "push()", "shift()", "unshift()"],
    },
    {
        id: 3,
        question: "Lequel des ces quatre types de données n'est pas primitif en JavaScript ?",
        questionNumber: "Question 4/15",
        goodAnswer: "array",
        responses: ["number", "string", "boolean", "array"],
    },
    {
        id: 4,
        question: "Une des ces conditions retourne un boolean false, laquelle ?",
        questionNumber: "Question 5/15",
        goodAnswer: 'if(1==="1")',
        responses: ["if(1==1)", 'if(1=="1")', "if(1===1)", 'if(1==="1")'],
    },
    {
        id: 5,
        question: "Quelle phrase ci-dessous est vraie au sujet de constante ?",
        questionNumber: "Question 6/15",
        goodAnswer: "une fois déclarée, sa valeur ne peut être changée",
        responses: [
            "on peut déclarer une constante sans l'initialiser",
            "son type peut être modifié après déclaration",
            "une fois déclarée, sa valeur ne peut être changée",
            "sa valeur n'est jamais concaténée",
        ],
    },
    {
        id: 6,
        question: "En JavaScript, un objet est déclaré comme une liste de paires clé/valeur entre ...",
        questionNumber: "Question 7/15",
        goodAnswer: "{} accolades",
        responses: [
            "[] crochets",
            "() parenthèses",
            "{} accolades",
            "aucune des réponses ci-dessus",
        ],
    },
    {
        id: 7,
        question: "Comment feriez-vous pour calculer le nombre d'éléments dans l'array onlineUsers ?",
        questionNumber: "Question 8/15",
        goodAnswer: "let numberOfUsers = onlineUsers.length;",
        responses: [
            "let numberOfUsers = onlineUsers.length;",
            "let numberOfUsers = onlineUsers.size;",
            "let numberOfUsers = onlineUsers.quantity;",
            "let numberOfUsers = onlineUsers.index;",
        ],
    },
    {
        id: 8,
        question: "Qu'est-ce que le DOM ?",
        questionNumber: "Question 9/15",
        goodAnswer: "une API qui permet d'accéder aux éléments HTML",
        responses: [
            "une API qui permet d'accéder aux éléments HTML",
            "un pays d'outre-mer",
            "une API pour faire des requêtes à un serveur web",
            "un nouveau langage de programmation",
        ],
    },
    {
        id: 9,
        question: 'Que permet de rechercher cet extrait ? //document.getElementById("my-list")',
        questionNumber: "Question 10/15",
        goodAnswer: 'l\'élément ayant pour ID "my-list"',
        responses: [
            'l\'élément ayant pour ID "my-list"',
            'tous les éléments ayant pour nom "my-list"',
            'tous les éléments ayant pour classe "my-list"',
            "aucune bonne réponse",
        ],
    },
    {
        id: 10,
        question: 'Que permet de faire cet extrait ? //element.innerHTML = "<strong>Salut !</strong>;"',
        questionNumber: "Question 11/15",
        goodAnswer: "modifier le contenu de element sous forme de HTML",
        responses: [
            "ce code affichera une erreur",
            "modifier le contenu de element sous forme de HTML",
            "modifier le contenu de element sous forme de texte",
            'remplacer element par le contenu HTML "<strong>"',
        ],
    },
    {
        id: 11,
        question: 'Que fait cet extrait ? //element.classList.add("hello")',
        questionNumber: "Question 12/15",
        goodAnswer: 'il ajoute la classe "hello" à element',
        responses: [
            'il supprime la classe "hello" à element',
            'il remplace la classe de element par "hello"',
            "aucune bonne réponse",
            'il ajoute la classe "hello" à element',
        ],
    },
    {
        id: 12,
        question: "Que fait cet extrait ? //JSON.parse(value)",
        questionNumber: "Question 13/15",
        goodAnswer: "il transforme un contenu JSON en objet JavaScript",
        responses: [
            "il transforme un objet JavaScript en contenu JSON",
            "il transforme un contenu JSON en objet JavaScript",
            "la méthode parse() n'existe pas",
            "il transforme un objet JavaScript en string",
        ],
    },
    {
        id: 13,
        question: 'Comment sera traité ce champ ? //<input type="email" required />',
        questionNumber: "Question 14/15",
        goodAnswer: "il sera obligatoire et devra être au format e-mail",
        responses: [
            "il sera obligatoire mais pourra contenir n'importe quoi",
            "il sera obligatoire et devra être au format e-mail",
            "il n'est pas obligatoire mais doit contenir un e-mail",
            "il n'est obligatoire que s'il contient une adresse e-mail",
        ],
    },
    {
        id: 14,
        question: "Que fait cette ligne de code ? //setInterval(callback, 1000)",
        questionNumber: "Question 15/15",
        goodAnswer: "il exécute la callback toutes les 1 seconde",
        responses: [
            "il exécute la callback au bout de 1 seconde",
            "il exécute la callback toutes les 1 seconde",
            "il exécute la callback au bout de 1000 secondes",
            "il exécute la callback toutes les 1000 secondes",
        ],
    },
];

//Select labels for question interface
let label1 = document.getElementById("label_1");
let label2 = document.getElementById("label_2");
let label3 = document.getElementById("label_3");
let label4 = document.getElementById("label_4");
let getQuestion = document.getElementById("question");
let num_qst = document.getElementById("num-qst");

//put texts in them
function questionnaire(id) {
    getQuestion.textContent = allQuestions[id].question;
    num_qst.textContent = allQuestions[id].questionNumber;
    label1.textContent = allQuestions[id].responses[0];
    label2.textContent = allQuestions[id].responses[1];
    label3.textContent = allQuestions[id].responses[2];
    label4.textContent = allQuestions[id].responses[3];
}

//function to reinitialize radios
function radioReinitialization() {
    radios[0].checked = false;
    radios[1].checked = false;
    radios[2].checked = false;
    radios[3].checked = false;
}

//browse differents answers
for (let i = 0; i < 4; i++) {
    radios[i].addEventListener("change", () => {
        btnNext.disabled = false;
        const response = radios[i].parentElement.querySelector("label").textContent;

        if (document.querySelector(".answers.valid")) {
            document.querySelector(".answers.valid").classList.remove("valid");
        }
        if (radios[i].checked == true) {
            choiceBack[i].classList.add("valid");
            btnNext.classList.add("nextButtonHover");
        }
        checkedRadio(response);
    });
}

//function to get the value of the checked input and verify if it is equal to good answer ...
function checkedRadio(response) {
    if (answersArray.find((newValue) => newValue.id === id)) {
        answersArray = answersArray.map((newValue) =>
            newValue.id === id ?
            {
                ...newValue,
                good: response.trim() === allQuestions[id].goodAnswer.trim(),
            } :
            newValue
        );
    } else {
        answersArray.push({
            id,
            good: response.trim() === allQuestions[id].goodAnswer.trim(),
        });
    }
    // console.log(answersArray);
    // console.log(
    // "score = ",
    // answersArray.filter((newValue) => newValue.good).length
    // );
    successScore = answersArray.filter((newValue) => newValue.good).length;
}

//Progress bar
function progressBar() {
    if (move) {
        clearInterval(move);
    }
    let innerBar = document.querySelector(".innerbar");
    let counter = 60;

    function manageCounter() {
        if (counter == 0) {
            clearInterval(move);
            btnNext.disabled = true;
            if (id < 14) {
                id += 1;
                questionnaire(id);
                if (document.querySelector(".next-button.nextButtonHover")) {
                    document
                        .querySelector(".next-button.nextButtonHover")
                        .classList.remove("nextButtonHover");
                }
                if (document.querySelector(".answers.valid")) {
                    document.querySelector(".answers.valid").classList.remove("valid");
                }
                if (id == 14) {
                    btnNext.value = "Terminer";
                }
                radioReinitialization();
                progressBar();
            } else {
                showResult();
            }
        } else {
            timer.textContent = counter;
            innerBar.style.width = counter * 1.6667 + "%";
        }
        counter--;
    }
    move = setInterval(manageCounter, 1000);
}

max = allQuestions.length;
//display result
function showResult() {
    secondForm.style.display = "none";
    thirdForm.style.display = "block";

    getName.textContent = localStorage.getItem("name");
    getEmail.textContent = localStorage.getItem("email");
    if (successScore < 10) {
        lastResult.textContent = "0" + successScore + "/" + max;
    } else {
        lastResult.textContent = successScore + "/" + max;
    }
    if (successScore > 7) {
        resultSymbol.classList.add(
            "fa-regular",
            "fa-circle-check",
            "success-color"
        );
    } else {
        resultSymbol.classList.add(
            "fa-regular",
            "fa-circle-xmark",
            "failure-color"
        );
        // lastResult.style.color = "red";
    }
}

//go to the next question
btnNext.addEventListener("click", btnSuivant);
//function for next button
function btnSuivant() {
    if (document.querySelector(".next-button.nextButtonHover")) {
        document
            .querySelector(".next-button.nextButtonHover")
            .classList.remove("nextButtonHover");
    }
    if (document.querySelector(".answers.valid")) {
        document.querySelector(".answers.valid").classList.remove("valid");
    }
    progressBar();

    btnNext.disabled = true;

    if (id < 14) {
        radioReinitialization();
        if (id == 13) {
            btnNext.value = "Terminer";
        }
        id += 1;
        questionnaire(id);
    } else {
        showResult();
    }
}

//exit button
btnQuit.addEventListener("click", () => {
    showResult();
});

//back home button
btnHome.addEventListener("click", () => {
    firstForm.style.display = "block";
    secondForm.style.display = "none";
    thirdForm.style.display = "none";
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    document.location.reload();
});