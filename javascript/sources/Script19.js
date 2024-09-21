ps://corsproxy.io/?';
                     const targetUrl = 'https://pickamovie.online/movies.json';
                     const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

                     if (!response.ok) {
                         throw new Error('Network response was not ok.');
                     }

                     const data = await response.json();

                     const headers = data[0];
                     const rows = data.slice(1);
                     let movies = rows.map(row => {
                     let movie = {};
                     headers.forEach((header, index) => {
                         movie[header] = row[index];
                     });
                     return movie;
                 });

        if (movies.length === 0) {
            return "No movies found.";
        }

        const randomIndex = Math.floor(Math.random() * movies.length);
        const movie = movies[randomIndex