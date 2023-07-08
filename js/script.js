var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const error = document.getElementById("error");
const micSubmit = document.getElementById("mic-submit");

recognition.continuous = false;
recognition.lang = "en-US";
// recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

name.addEventListener("focus", () => {
  recognition.start();
  recognition.onresult = function (event) {
    const userWords = event.results[0][0].transcript;
    name.value = userWords;
  };
});

email.addEventListener("focus", () => {
  recognition.start();
  recognition.onresult = function (event) {
    const userWords = event.results[0][0].transcript;
    email.value = userWords;
  };
});

message.addEventListener("focus", () => {
  recognition.start();
  recognition.onresult = function (event) {
    const userWords = event.results[0][0].transcript;
    message.value = userWords;
  };
});

submit.addEventListener("click", () => {
  if (!name.value || !email.value || !message.value) {
    alert("Fill in all fields");
  } else {
    alert("submitted");
  }
});

micSubmit.addEventListener("click", () => {
  if (!name.value || !email.value || !message.value) {
    alert("Fill in all fields");
  } else {
    recognition.start();
    recognition.onresult = function (event) {
      const userWords = event.results[0][0].transcript;

      if (userWords === "submit") {
        alert("submitted");
      }
    };
  }
});

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  console.log(
    "I didn't recognize your speech or you said the wrong word. Please try again"
  );
  error.textContent =
    "I didn't recognize your speech or you said the wrong word. Please try again";
};

recognition.onerror = function (event) {
  result.textContent = "Error occurred in recognition: " + event.error;
};
