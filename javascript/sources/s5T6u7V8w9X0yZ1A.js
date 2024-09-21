    { keyword: 'community', response: 'Community matters! How do you engage with yours?' },
    { keyword: 'hope', response: 'Hope keeps us going! What are you hopeful for?' },
    { keyword: 'love', response: 'Love is everything! What does love mean to you?' },
    { keyword: 'peace', response: 'Peace is vital! How do you find your peace?' },
    { keyword: 'gratitude', response: 'Gratitude is powerful! What are you grateful for today?' },
]

    const allKeywords = [...initialKeywords, ...additionalKeywords];

    for (const { keyword, response } of allKeywords) {
        const matches = inputText.match(keyword);