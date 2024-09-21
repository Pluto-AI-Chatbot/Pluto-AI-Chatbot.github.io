                botMessageElement.className = 'chat-message bot';
                chatBox.appendChild(botMessageElement);

                // Scroll to the bottom of the chat box
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        async function getBotResponse(message) {
            const inputText = message.toLowerCase();

            // Sanitize the message input
            const sanitizedMessage = sanitizeInput(message);

            // Check if the sanitized message is a valid expression
            try {
                const result = eval(sanitizedMessage);
                if (!isNaN(result)) {
                    return `The result is ${result}.`;
                }
            } catch (error) {
                console.error('Evaluation error:', error);
            }