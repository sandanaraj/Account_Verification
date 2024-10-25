const phrases = [
    "Hello there",
    "How are you",
    "Stay positive",
    "Keep it simple",
    "Believe in yourself",
    "Let it go",
    "You got this",
    "Stay focused",
    "Good job",
    "Enjoy the journey",
    "Time flies",
    "Dream big",
    "Stay curious",
    "Keep smiling",
    "Stay strong",
    "Be kind",
    "Think positive",
    "Trust the process",
    "Live freely",
    "Make it happen"
];



        let currentText = '';

        function displayRandomText() {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            currentText = phrases[randomIndex];
            document.getElementById('text-display').innerText = currentText;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        document.getElementById('start-button').addEventListener('click', () => {
            displayRandomText();
            recognition.start();
        });

       
        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            const resultDiv = document.getElementById('result');

            if (spokenText.trim().toLowerCase() === currentText.trim().toLowerCase()) {
                resultDiv.innerText = "Success! You repeated the text correctly.";
            } else {
                resultDiv.innerText = `Try again! You said: "${spokenText}".`;
            }
        };

        recognition.onerror = (event) => {
            document.getElementById('result').innerText = 'Error occurred in recognition: ' + event.error;
        };