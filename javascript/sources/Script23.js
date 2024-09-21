y characters that are not digits, operators, parentheses, or spaces
            return input.replace(/[^0-9+\-*/(). ]/g, '');
        }

        function getCurrentDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'lo