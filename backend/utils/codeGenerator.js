// Code generator utility - generates practice code problems and solutions

const codeProblems = {
  easy: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Write a function to reverse a given string.",
      template: `function reverseString(str) {
  // Your code here
}`,
      solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
      testCases: [
        { input: '"hello"', expected: '"olleh"' },
        { input: '"world"', expected: '"dlrow"' }
      ],
      topic: "strings"
    },
    {
      id: 2,
      title: "Find Maximum in Array",
      description: "Write a function to find the maximum value in an array.",
      template: `function findMax(arr) {
  // Your code here
}`,
      solution: `function findMax(arr) {
  return Math.max(...arr);
}`,
      testCases: [
        { input: '[1, 3, 2, 8, 5]', expected: '8' },
        { input: '[-1, -5, -2]', expected: '-1' }
      ],
      topic: "arrays"
    },
    {
      id: 3,
      title: "Check Palindrome",
      description: "Write a function to check if a string is a palindrome.",
      template: `function isPalindrome(str) {
  // Your code here
}`,
      solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
      testCases: [
        { input: '"racecar"', expected: 'true' },
        { input: '"hello"', expected: 'false' }
      ],
      topic: "strings"
    }
  ],
  medium: [
    {
      id: 4,
      title: "Two Sum",
      description: "Given an array and a target sum, find two numbers that add up to the target.",
      template: `function twoSum(nums, target) {
  // Your code here
}`,
      solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      testCases: [
        { input: '[2, 7, 11, 15], 9', expected: '[0, 1]' },
        { input: '[3, 2, 4], 6', expected: '[1, 2]' }
      ],
      topic: "arrays"
    },
    {
      id: 5,
      title: "Valid Parentheses",
      description: "Check if a string of brackets is valid (properly opened and closed).",
      template: `function isValid(s) {
  // Your code here
}`,
      solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if ('({['.includes(char)) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
      testCases: [
        { input: '"()"', expected: 'true' },
        { input: '"()[]{}"', expected: 'true' },
        { input: '"(]"', expected: 'false' }
      ],
      topic: "stacks"
    }
  ],
  hard: [
    {
      id: 6,
      title: "Longest Common Subsequence",
      description: "Find the length of the longest common subsequence between two strings.",
      template: `function lcs(text1, text2) {
  // Your code here
}`,
      solution: `function lcs(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
      testCases: [
        { input: '"abcde", "ace"', expected: '3' },
        { input: '"abc", "abc"', expected: '3' }
      ],
      topic: "dynamic programming"
    }
  ]
};

function getCodeProblem(difficulty = 'easy', topic = null) {
  const problems = codeProblems[difficulty] || codeProblems.easy;
  const filtered = topic ? problems.filter(p => p.topic === topic) : problems;
  const selected = filtered[Math.floor(Math.random() * filtered.length)];

  if (!selected) return null;

  return {
    id: selected.id,
    title: selected.title,
    description: selected.description,
    template: selected.template,
    testCases: selected.testCases,
    difficulty,
    topic: selected.topic
  };
}

function getSolution(problemId, difficulty = 'easy') {
  const problems = codeProblems[difficulty] || codeProblems.easy;
  const problem = problems.find(p => p.id === problemId);
  return problem ? { solution: problem.solution, explanation: problem.description } : null;
}

function getAllProblems() {
  const all = [];
  Object.entries(codeProblems).forEach(([difficulty, problems]) => {
    problems.forEach(p => all.push({ ...p, difficulty }));
  });
  return all;
}

module.exports = { getCodeProblem, getSolution, getAllProblems };
