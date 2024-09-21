            return now.toLocaleDateString('en-US', options);
        }

        function getLastWord(sentence) {
            const words = sentence.trim().split(/\s+/); // Split by whitespace
            return words[words.length - 1]; // Return the last word
        }

        document.getElementById('userInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevents the default action (e.g., form submission)
                sendMessage();