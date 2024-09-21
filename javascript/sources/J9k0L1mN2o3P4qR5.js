
            // Display the user's message
            if (userMessage) {
                const userMessageElement = document.createElement('p');
                userMessageElement.textContent = userMessage;
                userMessageElement.className = 'chat-message user';
                chatBox.appendChild(userMessageElement);
                
                // Clear the input field
                inputBox.value = '';

                // Generate a bot response
                const botResponse = await getBotResponse(userMessage);
                const botMessageElement = document.createElement('p');
                botMessageElement.innerHTML = botResponse; // Use innerHTML for potential HTML content