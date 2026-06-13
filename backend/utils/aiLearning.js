// AI Learning Engine - generates personalized learning content

const learningContent = {
  aptitude: {
    title: "Quantitative Aptitude",
    topics: [
      {
        name: "Number Systems",
        content: "Number systems form the foundation of quantitative aptitude. Key concepts include natural numbers, integers, rational and irrational numbers.",
        tips: ["Practice LCM and HCF problems daily", "Remember divisibility rules for 2-13", "Learn shortcuts for square roots"],
        resources: ["Practice 20 problems daily", "Focus on speed and accuracy"]
      },
      {
        name: "Percentages",
        content: "Percentages are used extensively in profit/loss, discount, and interest problems.",
        tips: ["Learn percentage-fraction equivalents", "Use multiplier method for quick calculation"],
        resources: ["Practice successive percentage problems"]
      },
      {
        name: "Time & Work",
        content: "These problems involve calculating work done by multiple people or machines.",
        tips: ["Use the LCM method", "Remember: if A does work in n days, A's 1 day work = 1/n"],
        resources: ["Practice pipe & cistern problems too"]
      },
      {
        name: "Speed, Distance & Time",
        content: "Core formula: Distance = Speed × Time. Covers relative speed, trains, boats.",
        tips: ["For average speed: use harmonic mean", "Relative speed: same direction = difference, opposite = sum"],
        resources: ["Practice train problems with platform length"]
      }
    ]
  },
  reasoning: {
    title: "Logical Reasoning",
    topics: [
      {
        name: "Coding-Decoding",
        content: "Identify patterns in letter/number substitution to decode messages.",
        tips: ["Look for position shifts", "Check ASCII value patterns", "Identify mirror alphabets"],
        resources: ["Practice both letter and number coding"]
      },
      {
        name: "Blood Relations",
        content: "Map family relationships using diagrams.",
        tips: ["Always draw a family tree", "Use M/F symbols for clarity"],
        resources: ["Practice coded blood relation problems"]
      },
      {
        name: "Syllogisms",
        content: "Draw conclusions from given statements using Venn diagrams.",
        tips: ["Use Venn diagrams for all problems", "Learn the four types of statements"],
        resources: ["Practice 2-statement and 3-statement syllogisms"]
      }
    ]
  },
  verbal: {
    title: "Verbal Ability",
    topics: [
      {
        name: "Vocabulary",
        content: "Build strong vocabulary through synonyms, antonyms, and contextual usage.",
        tips: ["Learn 10 new words daily", "Use words in sentences", "Group words by root/prefix"],
        resources: ["Read editorials daily", "Use word apps like Wordly Wise"]
      },
      {
        name: "Grammar",
        content: "Master tenses, subject-verb agreement, articles, and prepositions.",
        tips: ["Practice sentence correction daily", "Focus on common error types"],
        resources: ["Wren & Martin Grammar book", "Online grammar exercises"]
      },
      {
        name: "Reading Comprehension",
        content: "Improve speed reading and ability to infer meaning from passages.",
        tips: ["Read the questions first", "Identify topic sentence of each paragraph"],
        resources: ["Read 2 RC passages daily"]
      }
    ]
  },
  technical: {
    title: "Technical Skills",
    topics: [
      {
        name: "Data Structures",
        content: "Arrays, linked lists, stacks, queues, trees, graphs — the building blocks of efficient programs.",
        tips: ["Understand time/space complexity for each", "Practice implementation from scratch"],
        resources: ["LeetCode easy problems", "GeeksforGeeks DSA course"]
      },
      {
        name: "Algorithms",
        content: "Sorting, searching, dynamic programming, greedy, divide & conquer.",
        tips: ["Master Big O notation", "Understand when to use each paradigm"],
        resources: ["Practice pattern-based problems", "CLRS textbook"]
      },
      {
        name: "Database Management",
        content: "SQL queries, normalization, joins, indexing, transactions.",
        tips: ["Master JOIN types", "Practice complex nested queries"],
        resources: ["SQLZoo for practice", "HackerRank SQL challenges"]
      },
      {
        name: "Object-Oriented Programming",
        content: "Encapsulation, inheritance, polymorphism, abstraction — core OOP concepts.",
        tips: ["Design real-world systems using OOP", "Understand SOLID principles"],
        resources: ["Head First Design Patterns book", "Refactoring.guru"]
      }
    ]
  }
};

function getLearningPlan(topic, weakAreas = []) {
  const content = learningContent[topic];
  if (!content) return null;

  const plan = {
    topic,
    title: content.title,
    estimatedTime: "2-3 hours",
    topics: content.topics,
    personalizedTips: generatePersonalizedTips(topic, weakAreas),
    studySchedule: generateStudySchedule(topic)
  };

  return plan;
}

function generatePersonalizedTips(topic, weakAreas) {
  const tips = {
    aptitude: [
      "Focus on speed — aim to solve each problem within 1.5 minutes",
      "Review your wrong answers to identify patterns",
      "Practice mental math daily"
    ],
    reasoning: [
      "Draw diagrams for every problem",
      "Practice puzzles and brain teasers daily",
      "Work on pattern recognition"
    ],
    verbal: [
      "Read English newspapers daily",
      "Practice paraphrasing sentences",
      "Build vocabulary with root words"
    ],
    technical: [
      "Code every day, even for 30 minutes",
      "Explain concepts out loud to yourself",
      "Work on real projects to apply theory"
    ]
  };

  return tips[topic] || [];
}

function generateStudySchedule(topic) {
  return [
    { day: "Day 1-2", activity: "Learn concepts and theory" },
    { day: "Day 3-4", activity: "Solve easy practice problems" },
    { day: "Day 5-6", activity: "Tackle medium difficulty problems" },
    { day: "Day 7", activity: "Take a mock test and review" }
  ];
}

function getWeakAreaRecommendations(weakAreas) {
  const recommendations = [];

  weakAreas.forEach(area => {
    const content = learningContent[area.topic];
    if (content) {
      recommendations.push({
        topic: area.topic,
        title: content.title,
        priority: area.weakness_score > 0.6 ? "High" : area.weakness_score > 0.3 ? "Medium" : "Low",
        suggestion: `Focus on ${content.title} — your accuracy needs improvement`,
        studyTime: area.weakness_score > 0.6 ? "3 hours/day" : "1-2 hours/day"
      });
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function generateInsights(quizHistory) {
  if (!quizHistory || quizHistory.length === 0) {
    return {
      message: "Take some quizzes to get personalized insights!",
      insights: []
    };
  }

  const topicScores = {};
  quizHistory.forEach(attempt => {
    if (!topicScores[attempt.topic]) {
      topicScores[attempt.topic] = { total: 0, count: 0 };
    }
    topicScores[attempt.topic].total += (attempt.score / attempt.total_questions) * 100;
    topicScores[attempt.topic].count++;
  });

  const insights = Object.entries(topicScores).map(([topic, data]) => ({
    topic,
    averageScore: Math.round(data.total / data.count),
    attempts: data.count,
    status: data.total / data.count >= 70 ? "Strong" : data.total / data.count >= 50 ? "Average" : "Needs Work"
  }));

  return { message: "Here are your personalized insights:", insights };
}

module.exports = { getLearningPlan, getWeakAreaRecommendations, generateInsights };
