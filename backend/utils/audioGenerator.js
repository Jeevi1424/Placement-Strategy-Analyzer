// Audio content generator - generates text-based audio scripts for topics

const audioScripts = {
  aptitude: {
    intro: "Welcome to Quantitative Aptitude. This section covers arithmetic, algebra, and data interpretation.",
    topics: {
      percentages: "Percentages represent parts per hundred. To find percentage: divide the part by whole and multiply by 100. For example, 36 out of 240 is 15 percent.",
      timeWork: "In time and work problems, if a person completes work in N days, their one day work is one divided by N. Add fractions to find combined work rate.",
      speedDistance: "Distance equals Speed multiplied by Time. Average speed for equal distances is the harmonic mean of the two speeds."
    }
  },
  reasoning: {
    intro: "Welcome to Logical Reasoning. This section tests your analytical and pattern recognition abilities.",
    topics: {
      codingDecoding: "In coding problems, identify the rule connecting each letter to its code. Common patterns include position shifts and alphabet reversal.",
      syllogisms: "For syllogisms, draw Venn diagrams to visualize the relationship between sets before drawing conclusions."
    }
  },
  technical: {
    intro: "Welcome to Technical Skills. This covers data structures, algorithms, and programming concepts.",
    topics: {
      dataStructures: "Data structures organize data efficiently. Arrays provide O(1) access. Linked lists allow O(1) insertion. Trees give O(log n) search in balanced cases.",
      algorithms: "Algorithm complexity measures efficiency. Big O notation describes worst-case performance. O(1) is constant, O(log n) is logarithmic, O(n) is linear."
    }
  }
};

function generateAudioScript(topic, subtopic = null) {
  const topicContent = audioScripts[topic];
  if (!topicContent) {
    return {
      success: false,
      message: "Audio content not available for this topic"
    };
  }

  if (subtopic && topicContent.topics[subtopic]) {
    return {
      success: true,
      topic,
      subtopic,
      script: topicContent.topics[subtopic],
      duration: estimateDuration(topicContent.topics[subtopic]),
      type: "subtopic"
    };
  }

  const fullScript = topicContent.intro + " " +
    Object.values(topicContent.topics).join(" ");

  return {
    success: true,
    topic,
    script: fullScript,
    duration: estimateDuration(fullScript),
    type: "full",
    sections: Object.keys(topicContent.topics)
  };
}

function estimateDuration(text) {
  // Average reading speed: ~150 words per minute
  const wordCount = text.split(' ').length;
  const minutes = Math.ceil(wordCount / 150);
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}

function getAvailableAudioContent() {
  return Object.entries(audioScripts).map(([topic, content]) => ({
    topic,
    intro: content.intro.substring(0, 100) + "...",
    subtopics: Object.keys(content.topics)
  }));
}

module.exports = { generateAudioScript, getAvailableAudioContent };
