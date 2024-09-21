                    throw new Error('Network response was not ok');
                }
                const qrCodeUrl = response.url; // The URL of the generated QR code
		const output = `
Here is your QR code:

<img src="${qrCodeUrl}" alt="QR Code" />
 `;
                return output;
            } catch (error) {
                console.error(`Error fetching data for "${query}":`, error);
                return `Sorry, I couldn't fetch the data for "${query}".`;
            }
        }

        async function fetchNumberFact() {
            try {
                const response = await fetch('http://numbersapi.com/random');
                const numfact = await response.text();   
                return `${numfact}`;
            } catch (error) {
                console.error('Error fetching number fact data:', error);
                return "Sorry, I couldn't fetch the number fact data.";
            }
        }

        async function fetchAdvice() {
            try {
                const response = await fetch('https://api.adviceslip.com/advice');
                const data = await response.json();  