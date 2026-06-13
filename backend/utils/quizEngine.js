const questionBank = {
  'cs-fundamentals': [
    { id:1, question:"Which scheduling algorithm can cause starvation?", options:["Round Robin","FCFS","Priority Scheduling","SJF"], answer:2, explanation:"Priority Scheduling can starve low-priority processes if high-priority ones keep arriving." },
    { id:2, question:"What does ACID stand for in databases?", options:["Atomicity, Consistency, Isolation, Durability","Access, Commit, Insert, Delete","Aggregate, Compile, Index, Deploy","None of the above"], answer:0, explanation:"ACID ensures reliable database transactions: Atomicity, Consistency, Isolation, Durability." },
    { id:3, question:"In OSI model, which layer handles routing?", options:["Data Link","Transport","Network","Session"], answer:2, explanation:"The Network layer (Layer 3) handles routing and IP addressing." },
    { id:4, question:"Which is NOT a feature of OOP?", options:["Encapsulation","Compilation","Polymorphism","Inheritance"], answer:1, explanation:"Compilation is not an OOP concept. The 4 OOP pillars are Encapsulation, Inheritance, Polymorphism, Abstraction." },
    { id:5, question:"What is a virtual memory?", options:["RAM only","Disk only","Combination of RAM and disk","Cache memory"], answer:2, explanation:"Virtual memory uses both RAM and disk space to give the illusion of more memory than physically available." },
    { id:6, question:"Which normal form eliminates transitive dependency?", options:["1NF","2NF","3NF","BCNF"], answer:2, explanation:"3NF eliminates transitive dependencies (non-key attributes depending on other non-key attributes)." }
  ],
  hr: [
    { id:1, question:"What is the STAR method used for?", options:["Coding interviews","Technical rounds","Behavioral/HR interviews","System design"], answer:2, explanation:"STAR (Situation, Task, Action, Result) is used to structure answers in behavioral HR interviews." },
    { id:2, question:"Which of these is a good answer to 'What is your weakness?'", options:["I have no weaknesses","I work too hard","I struggled with public speaking but joined Toastmasters to improve","I'm lazy"], answer:2, explanation:"Acknowledging a real weakness with evidence of improvement shows self-awareness and growth mindset." },
    { id:3, question:"What should you research before a company interview?", options:["Nothing","Only salary","Company products, culture, values, and recent news","Employee names"], answer:2, explanation:"Researching the company shows genuine interest and helps you tailor your answers." },
    { id:4, question:"How long should a 'Tell me about yourself' answer be?", options:["30 seconds","60-90 seconds","10 minutes","5 minutes"], answer:1, explanation:"60-90 seconds is ideal — long enough to cover key points, short enough to maintain interest." },
    { id:5, question:"In a STAR answer, what does 'R' stand for?", options:["Responsibility","Result","Reasoning","Relevance"], answer:1, explanation:"R stands for Result — the measurable outcome of your action. Always quantify if possible." }
  ],
  dbms: [
    { id:1, question:"Which SQL command is used to retrieve data?", options:["INSERT","UPDATE","SELECT","DELETE"], answer:2, explanation:"SELECT is used to query and retrieve data from a database table." },
    { id:2, question:"What does PRIMARY KEY ensure?", options:["Unique values only","Not null only","Both unique and not null","Foreign reference"], answer:2, explanation:"PRIMARY KEY ensures both uniqueness and NOT NULL constraint on a column." },
    { id:3, question:"Which JOIN returns all rows from both tables?", options:["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL OUTER JOIN"], answer:3, explanation:"FULL OUTER JOIN returns all rows from both tables, with NULLs where there's no match." },
    { id:4, question:"What is normalization?", options:["Adding redundancy","Removing redundancy","Encrypting data","Indexing tables"], answer:1, explanation:"Normalization is the process of organizing a database to reduce redundancy and dependency." },
    { id:5, question:"Which command makes changes permanent in a transaction?", options:["ROLLBACK","SAVEPOINT","COMMIT","BEGIN"], answer:2, explanation:"COMMIT permanently saves all changes made during the current transaction." },
    { id:6, question:"What is an index in DBMS?", options:["A table backup","A data structure to speed up queries","A type of JOIN","A foreign key"], answer:1, explanation:"An index is a data structure that improves the speed of data retrieval operations." }
  ],
  networking: [
    { id:1, question:"What does HTTP stand for?", options:["HyperText Transfer Protocol","High Transfer Text Protocol","HyperText Transport Process","None"], answer:0, explanation:"HTTP — HyperText Transfer Protocol — is the foundation of data communication on the web." },
    { id:2, question:"Which layer of OSI model does IP operate?", options:["Layer 2","Layer 3","Layer 4","Layer 7"], answer:1, explanation:"IP (Internet Protocol) operates at Layer 3 — the Network layer of the OSI model." },
    { id:3, question:"What is the difference between TCP and UDP?", options:["TCP is faster","UDP is reliable","TCP is connection-oriented and reliable","UDP uses more bandwidth"], answer:2, explanation:"TCP is connection-oriented with guaranteed delivery. UDP is connectionless and faster but unreliable." },
    { id:4, question:"What port does HTTPS use?", options:["80","21","443","22"], answer:2, explanation:"HTTPS uses port 443. HTTP uses port 80, FTP uses 21, SSH uses 22." },
    { id:5, question:"What is a subnet mask?", options:["Router address","Network identifier","Used to divide IP into network and host portions","MAC address"], answer:2, explanation:"A subnet mask divides an IP address into network and host portions for routing purposes." }
  ],
  aptitude: [
    {
      id: 1,
      question: "If a train travels 60 km in 1 hour, how far will it travel in 2.5 hours?",
      options: ["120 km", "130 km", "150 km", "160 km"],
      answer: 2,
      explanation: "Distance = Speed × Time = 60 × 2.5 = 150 km"
    },
    {
      id: 2,
      question: "What is 15% of 240?",
      options: ["30", "36", "40", "42"],
      answer: 1,
      explanation: "15% of 240 = (15/100) × 240 = 36"
    },
    {
      id: 3,
      question: "A and B together can complete a work in 12 days. A alone can complete it in 20 days. How many days will B alone take?",
      options: ["25 days", "28 days", "30 days", "35 days"],
      answer: 2,
      explanation: "B's work per day = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. So B takes 30 days."
    },
    {
      id: 4,
      question: "The ratio of ages of A and B is 3:5. If the sum of their ages is 40, what is A's age?",
      options: ["12", "15", "18", "20"],
      answer: 1,
      explanation: "A = (3/8) × 40 = 15 years"
    },
    {
      id: 5,
      question: "A shopkeeper marks an article at Rs. 500 and sells it at 20% discount. What is the selling price?",
      options: ["Rs. 380", "Rs. 390", "Rs. 400", "Rs. 420"],
      answer: 2,
      explanation: "Selling price = 500 × (1 - 20/100) = 500 × 0.8 = Rs. 400"
    },
    {
      id: 6,
      question: "What is the compound interest on Rs. 1000 at 10% per annum for 2 years?",
      options: ["Rs. 200", "Rs. 210", "Rs. 220", "Rs. 230"],
      answer: 1,
      explanation: "CI = 1000 × (1.1)^2 - 1000 = 1210 - 1000 = Rs. 210"
    },
    {
      id: 7,
      question: "If 2x + 3y = 12 and x - y = 1, find x.",
      options: ["3", "4", "5", "6"],
      answer: 0,
      explanation: "From x - y = 1, x = y + 1. Substituting: 2(y+1) + 3y = 12 → 5y = 10 → y = 2, x = 3"
    },
    {
      id: 8,
      question: "A car covers a distance at 40 km/h and returns at 60 km/h. What is the average speed?",
      options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
      answer: 0,
      explanation: "Average speed = 2×40×60/(40+60) = 4800/100 = 48 km/h"
    }
  ],
  reasoning: [
    {
      id: 1,
      question: "If APPLE is coded as BQQMF, how is MANGO coded?",
      options: ["NBOHR", "NBOHP", "NBOHO", "NBOHQ"],
      answer: 1,
      explanation: "Each letter is shifted by +1. M→N, A→B, N→O, G→H, O→P = NBOHP"
    },
    {
      id: 2,
      question: "Find the odd one out: 2, 3, 5, 7, 9, 11",
      options: ["2", "5", "9", "11"],
      answer: 2,
      explanation: "9 is not a prime number (9 = 3×3). All others are prime numbers."
    },
    {
      id: 3,
      question: "In a row, A is 10th from left and 15th from right. How many people are in the row?",
      options: ["22", "23", "24", "25"],
      answer: 2,
      explanation: "Total = 10 + 15 - 1 = 24"
    },
    {
      id: 4,
      question: "If all roses are flowers and some flowers are red, which conclusion follows?",
      options: [
        "All roses are red",
        "Some roses are red",
        "No rose is red",
        "None of the above"
      ],
      answer: 3,
      explanation: "We cannot definitively conclude any of the first three options from the given statements."
    },
    {
      id: 5,
      question: "Complete the series: 1, 4, 9, 16, 25, ?",
      options: ["30", "35", "36", "49"],
      answer: 2,
      explanation: "These are perfect squares: 1², 2², 3², 4², 5², 6² = 36"
    }
  ],
  verbal: [
    {
      id: 1,
      question: "Choose the synonym of 'ELOQUENT':",
      options: ["Fluent", "Dumb", "Silent", "Confused"],
      answer: 0,
      explanation: "Eloquent means fluent or persuasive in speaking or writing."
    },
    {
      id: 2,
      question: "Choose the antonym of 'BENEVOLENT':",
      options: ["Kind", "Generous", "Malevolent", "Helpful"],
      answer: 2,
      explanation: "Benevolent means kind/charitable; malevolent means having evil intentions."
    },
    {
      id: 3,
      question: "Fill in the blank: She _____ to the market yesterday.",
      options: ["go", "goes", "went", "going"],
      answer: 2,
      explanation: "'Yesterday' indicates past tense, so 'went' is correct."
    },
    {
      id: 4,
      question: "Identify the correct sentence:",
      options: [
        "He don't know the answer.",
        "He doesn't knows the answer.",
        "He doesn't know the answer.",
        "He not know the answer."
      ],
      answer: 2,
      explanation: "With third-person singular subject, use 'doesn't' + base form of verb."
    }
  ],
  technical: [
    {
      id: 1,
      question: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      answer: 1,
      explanation: "Binary search divides the search space in half each time, giving O(log n) complexity."
    },
    {
      id: 2,
      question: "Which data structure uses LIFO (Last In First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: 1,
      explanation: "A stack follows LIFO — the last element added is the first one removed."
    },
    {
      id: 3,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Logic",
        "Sequential Query Language"
      ],
      answer: 0,
      explanation: "SQL stands for Structured Query Language, used to manage relational databases."
    },
    {
      id: 4,
      question: "Which of the following is NOT an OOP concept?",
      options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"],
      answer: 2,
      explanation: "The four OOP pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction."
    },
    {
      id: 5,
      question: "What is the output of: console.log(typeof null)?",
      options: ["null", "undefined", "object", "string"],
      answer: 2,
      explanation: "In JavaScript, typeof null returns 'object' — this is a known language quirk."
    },
    {
      id: 6,
      question: "Which HTTP method is used to update a resource?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: 2,
      explanation: "PUT is used to update/replace an existing resource in REST APIs."
    }
  ]
};

function getQuestions(topic, count = 5) {
  const questions = questionBank[topic] || questionBank.aptitude;
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
    // answer not sent to client
  }));
}

function evaluateAnswers(topic, userAnswers) {
  const questions = questionBank[topic] || questionBank.aptitude;
  let score = 0;
  const results = [];

  userAnswers.forEach(ua => {
    const question = questions.find(q => q.id === ua.questionId);
    if (question) {
      const isCorrect = question.answer === ua.selectedOption;
      if (isCorrect) score++;
      results.push({
        questionId: ua.questionId,
        question: question.question,
        selectedOption: ua.selectedOption,
        correctAnswer: question.answer,
        isCorrect,
        explanation: question.explanation
      });
    }
  });

  return { score, total: userAnswers.length, results };
}

function getAvailableTopics() {
  return Object.keys(questionBank).map(topic => ({
    id: topic,
    name: topic.charAt(0).toUpperCase() + topic.slice(1),
    questionCount: questionBank[topic].length
  }));
}

module.exports = { getQuestions, evaluateAnswers, getAvailableTopics };
