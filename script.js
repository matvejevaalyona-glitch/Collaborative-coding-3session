// 1. storing the values and descriptions for each answer
const results = {
  A: {
    title: "You are a Croissant! 🥐",
    description:
      "You are sophisticated, layered, and appreciate the finer things in life. You have a beautiful structure and a warm, slightly reserved demeanor. You are a classic that never goes out of style, and people love you for your satisfying depth and complexity.",
  },
  B: {
    title: "You are a Macaron! 🌈",
    description:
      "You are vibrant, innovative, and perfectly put-together. You thrive in environments that value precision and are always ready for a new challenge or flavor. Your energy is infectious, and you bring a bright pop of color and joy wherever you go.",
  },
  C: {
    title: "You are a Sachertorte 🍫",
    description:
      "You are rich, elegant, and deeply satisfying. You have a profound respect for tradition and a cozy, comforting presence. While you may seem formal on the surface, beneath your beautiful exterior lies a core of intense, delightful passion and warmth.",
  },
  D: {
    title: "You are a Cannoli! 🍰",
    description:
      "You are warm, lively, and wonderfully expressive. You have a relaxed, sweet disposition and bring a feeling of celebration and joy to every gathering. Your heart is filled with smooth, comforting goodness, and you have a delightful, crispy sense of humor.",
  },
};

// 2. Initialize scores for each answer option. Normally quizz is empty, then the value is given by user
const quizScores = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
};
// 3. Listen for the form submission event
const form = document.getElementById("quiz_form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the form from submitting .

  const formData = new FormData(form); // Collects all form data

  for (const [name, value] of formData.entries()) {
    // Iterates over each form entry (loop through each question)
    console.log(name, value); // Log each question name and its selected answer
    if (value == "A")
      quizScores.A += 1; // Increment the score for the selected answer(checked box)
    else if (value == "B") quizScores.B += 1;
    else if (value == "C") quizScores.C += 1;
    else quizScores.D += 1;
  }
  // Determine the answer with the highest score
  let winningScore = 0;
  let finalKey = ""; // This will hold the 'A', 'B', 'C', or 'D' key

  // Loop through the score object to find the maximum value
  for (const key in quizScores) {
    if (quizScores[key] > winningScore) {
      // If the current score is greater than the winning score
      winningScore = quizScores[key]; // Update the winning score
      finalKey = key; // Update the final key to the current key
    }
  }
  console.log(`Winner key:${finalKey}, score: ${winningScore}`); // a line just in case, for debugging

  // 4. Display the result based on the winning answer
  const finalResult = results[finalKey]; // Get the correct result object (e.g., results.A)
  const resultBox = document.getElementById("quiz-results"); //define the result box and link to html quiz-results space

  //innerHTML to inject the dynamic content into the HTML element(inner html replaces the content of resultbox by following html code
  resultBox.innerHTML = `
        <h3>🎉 Your Pastry Personality Is: ${finalResult.title}</h3>
        <p>${finalResult.description}</p>
    `;
});

const fieldsets = document.querySelectorAll("fieldset");
console.log(fieldsets);
//always start with question 1:
let currentIndex = 0;

// Add event listeners to all radio buttons
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("click", () => {
    moveToNextQuestion();
  });
});

function moveToNextQuestion() {
  // Hide current question
  fieldsets[currentIndex].hidden = true;

  // Move to next question - it increases the value of currentIndex by 1
  currentIndex++;

  // Show next question if it exists
  if (currentIndex < fieldsets.length) {
    fieldsets[currentIndex].hidden = false;
  } else {
    // All questions answered - show submit button
    document.querySelector('button[type="submit"]').style.display = "block";
  }
}

// Initialize: hide submit button until all questions are answered. display.none-the same as hidden
document.querySelector('button[type="submit"]').style.display = "none";

// Ensure first question is visible
fieldsets[0].hidden = false;
