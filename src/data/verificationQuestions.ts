import { VerificationCodingQuestion, LearnerProfile } from '../types';

// ============================================================================
// DATA SCIENCE & ML PROFILE ASSESSMENT SUITE (10 PROBLEMS)
// Every starterCode is 100% free of answers or solution logic!
// ============================================================================

export const dataScienceAssessmentSuite: VerificationCodingQuestion[] = [
  {
    id: 1,
    title: '1. Skill Token Frequency Counter (Python / Data Parsing)',
    category: 'Python',
    difficulty: 'Easy',
    skills: ['Python', 'String Parsing', 'Hash Map', 'Data Cleaning'],
    description: `Given a raw resume text log string of applicant skills separated by commas and spaces, count the frequency of each normalized (lowercase, trimmed) technical skill token and return a dictionary/map of skills occurring at least \`min_threshold\` times.`,
    inputDescription: `log (string): Comma-separated list of skill strings.\nmin_threshold (integer): Minimum occurrences required to include in output.`,
    outputDescription: `A dictionary mapping lowercase skill strings to their integer frequency counts (filtered by min_threshold).`,
    examples: [
      {
        input: `log = "Python, SQL, python, DOCKER, sql, Python", min_threshold = 2`,
        output: `{"python": 3, "sql": 2}`,
        explanation: `"python" appears 3 times, "sql" appears 2 times, "docker" appears 1 time (below threshold 2).`,
      },
      {
        input: `log = "React, Docker, AWS, React", min_threshold = 2`,
        output: `{"react": 2}`,
      },
    ],
    constraints: [
      '1 <= length of log <= 10^5',
      '1 <= min_threshold <= 100',
      'All tokens contain alphanumeric characters and common symbols (+, #, /)',
    ],
    starterCode: {
      Python: `def count_skill_tokens(log: str, min_threshold: int) -> dict:
    # Write your solution here
    pass`,
      JavaScript: `function countSkillTokens(log, minThreshold) {
  // Write your solution here
}`,
      Java: `import java.util.*;

public class Solution {
    public static Map<String, Integer> countSkillTokens(String log, int minThreshold) {
        // Write your solution here
        return new HashMap<>();
    }
}`,
      SQL: `-- Write your SQL query here
SELECT skill, COUNT(*) AS frequency
FROM candidate_skills
-- Complete your query below
`,
    },
    testCases: [
      { id: 1, input: '"Python, SQL, python, DOCKER, sql, Python", 2', expectedOutput: '{"python": 3, "sql": 2}', isHidden: false },
      { id: 2, input: '"React, Docker, AWS, React", 2', expectedOutput: '{"react": 2}', isHidden: false },
      { id: 3, input: '"Kubernetes, kubernetes, KUBERNETES", 1', expectedOutput: '{"kubernetes": 3}', isHidden: true },
      { id: 4, input: '"Go, Rust, TypeScript", 2', expectedOutput: '{}', isHidden: true },
      { id: 5, input: '"ML, ml, ML, PyTorch, ml", 3', expectedOutput: '{"ml": 4}', isHidden: true },
    ],
    solutionKeywords: ['split', 'strip', 'lower', 'dict', 'count', 'threshold'],
  },

  {
    id: 2,
    title: '2. Top K In-Demand Skills in Applicant Stream (Algorithms & Heap)',
    category: 'Algorithms',
    difficulty: 'Medium',
    skills: ['Algorithms', 'Priority Queue', 'Heap', 'Sorting', 'Python'],
    description: `Given a list of applicant claimed skills \`skills\` and an integer \`k\`, return the top \`k\` most frequent skills sorted by frequency in descending order. If two skills have the same frequency, sort them lexicographically.`,
    inputDescription: `skills (list[str]): List of skill strings.\nk (integer): Number of top skills to return.`,
    outputDescription: `List of top k skill strings sorted by frequency desc, then alphabetical asc.`,
    examples: [
      {
        input: `skills = ["python","sql","python","docker","sql","react","python"], k = 2`,
        output: `["python", "sql"]`,
        explanation: `"python" count is 3, "sql" count is 2. Top 2 are ["python", "sql"].`,
      },
    ],
    constraints: [
      '1 <= skills.length <= 10^4',
      '1 <= k <= number of unique skills',
      'All skill tokens are lowercase English words',
    ],
    starterCode: {
      Python: `def top_k_skills(skills: list[str], k: int) -> list[str]:
    # Write your solution here
    pass`,
      JavaScript: `function topKSkills(skills, k) {
  // Write your solution here
}`,
      Java: `import java.util.*;

public class Solution {
    public static List<String> topKSkills(String[] skills, int k) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
    },
    testCases: [
      { id: 1, input: '["python","sql","python","docker","sql","react","python"], 2', expectedOutput: '["python", "sql"]', isHidden: false },
      { id: 2, input: '["java","java","c++","c++","python"], 2', expectedOutput: '["c++", "java"]', isHidden: false },
      { id: 3, input: '["fastapi","flask","django"], 1', expectedOutput: '["django"]', isHidden: true },
      { id: 4, input: '["aws","azure","gcp","aws","gcp"], 2', expectedOutput: '["aws", "gcp"]', isHidden: true },
      { id: 5, input: '["ml","ai","nlp","ml","ai","cv"], 3', expectedOutput: '["ai", "ml", "cv"]', isHidden: true },
    ],
    solutionKeywords: ['counter', 'heapq', 'sort', 'count', 'frequency'],
  },

  {
    id: 3,
    title: '3. Placement Cohort Qualification Join (SQL Query Engine)',
    category: 'SQL',
    difficulty: 'Medium',
    skills: ['SQL', 'Aggregations', 'Subqueries', 'Analytical Queries'],
    description: `Write an SQL query to retrieve students who have passed technical verification (\`verification_status = 'VERIFIED'\`) and whose \`coding_score\` is strictly greater than their department's average coding score. Return \`student_id\`, \`student_name\`, and \`coding_score\` ordered by score descending.`,
    inputDescription: `Table: students (student_id int, student_name varchar, dept_id int, coding_score int, verification_status varchar)`,
    outputDescription: `Result set with columns (student_id, student_name, coding_score) ordered by coding_score DESC.`,
    examples: [
      {
        input: `Table: students with 10 records across 3 departments`,
        output: `Rows meeting score > dept_avg AND verification_status = 'VERIFIED'`,
        explanation: `Subquery calculates AVG(coding_score) per dept_id; outer query filters verified students strictly above average.`,
      },
    ],
    constraints: [
      'Standard ANSI SQL syntax compatible with PostgreSQL / SQLite',
      'Table aliases and subqueries must be syntactically valid',
    ],
    starterCode: {
      SQL: `-- Write your SQL query below
SELECT 
    s.student_id,
    s.student_name,
    s.coding_score
FROM students s
-- Complete your query below
`,
      Python: `def filter_qualified_students(students: list[dict]) -> list[dict]:
    # Write your solution here
    pass`,
    },
    testCases: [
      { id: 1, input: 'Standard cohort batch 2025 (4 students)', expectedOutput: '2 qualified verified students returned', isHidden: false },
      { id: 2, input: 'Tie-breaking scores in CSE department', expectedOutput: 'Sorted descending by coding_score', isHidden: false },
      { id: 3, input: 'Unverified candidates with high scores', expectedOutput: 'Correctly filtered out (status check passes)', isHidden: true },
      { id: 4, input: 'Single member department edge case', expectedOutput: 'Empty set (score not strictly greater than avg)', isHidden: true },
      { id: 5, input: 'Multi-department join with null scores', expectedOutput: 'Handled without runtime null pointer', isHidden: true },
    ],
    solutionKeywords: ['select', 'from', 'inner join', 'group by', 'avg', 'where'],
  },

  {
    id: 4,
    title: '4. Relational Skill Gap Difference Calculation (SQL / Data Logic)',
    category: 'SQL',
    difficulty: 'Easy',
    skills: ['SQL', 'Data Manipulation', 'Set Difference', 'Problem Solving'],
    description: `Given \`required_skills\` containing mandatory skills for target industry roles and \`verified_skills\` containing skills proven by candidates, return all missing skills sorted alphabetically.`,
    inputDescription: `required (list[str]): List of required skill strings.\nverified (list[str]): List of student verified skill strings.`,
    outputDescription: `Alphabetically sorted list of missing skills.`,
    examples: [
      {
        input: `required = ["Python", "SQL", "Docker"], verified = ["Python"]`,
        output: `["Docker", "SQL"]`,
        explanation: `"Docker" and "SQL" are required but not yet verified.`,
      },
    ],
    constraints: ['Case-insensitive comparison', 'Output must be sorted alphabetically'],
    starterCode: {
      Python: `def find_missing_skills(required: list[str], verified: list[str]) -> list[str]:
    # Write your solution here
    pass`,
      SQL: `-- Write your SQL query below
SELECT r.skill_name
FROM role_requirements r
-- Complete your query below
`,
      JavaScript: `function findMissingSkills(required, verified) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: 'required: ["Python","SQL","Docker"], verified: ["Python"]', expectedOutput: '["Docker", "SQL"]', isHidden: false },
      { id: 2, input: 'required: ["Git","AWS"], verified: ["git","aws"]', expectedOutput: '[]', isHidden: false },
      { id: 3, input: 'required: ["ML","NLP","CV"], verified: []', expectedOutput: '["CV", "ML", "NLP"]', isHidden: true },
      { id: 4, input: 'required: ["React"], verified: ["Angular","Vue"]', expectedOutput: '["React"]', isHidden: true },
      { id: 5, input: 'required: [], verified: ["Python"]', expectedOutput: '[]', isHidden: true },
    ],
    solutionKeywords: ['set', 'lower', 'difference', 'sorted', 'not in'],
  },

  {
    id: 5,
    title: '5. Two Sum Index Matching (Algorithms & Hash Tables)',
    category: 'Problem Solving',
    difficulty: 'Easy',
    skills: ['Problem Solving', 'Hash Map', 'Arrays', 'Time Complexity'],
    description: `Given an array of integers \`nums\` representing skill diagnostic evaluation points and an integer \`target\`, return indices of the two elements such that they add up to \`target\`. Each input will have exactly one solution, and you may not use the same element twice.`,
    inputDescription: `nums (list[int]): Array of integers.\ntarget (int): Target integer sum.`,
    outputDescription: `A list of two integer indices [index1, index2] whose values sum to target.`,
    examples: [
      {
        input: `nums = [2, 7, 11, 15], target = 9`,
        output: `[0, 1]`,
        explanation: `nums[0] + nums[1] == 2 + 7 == 9.`,
      },
      {
        input: `nums = [3, 2, 4], target = 6`,
        output: `[1, 2]`,
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Exactly one valid answer exists',
    ],
    starterCode: {
      Python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
      JavaScript: `function twoSum(nums, target) {
  // Write your solution here
}`,
      Java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    },
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]', isHidden: false },
      { id: 2, input: '[3, 2, 4], 6', expectedOutput: '[1, 2]', isHidden: false },
      { id: 3, input: '[3, 3], 6', expectedOutput: '[0, 1]', isHidden: true },
      { id: 4, input: '[-1, -2, -3, -4, -5], -8', expectedOutput: '[2, 4]', isHidden: true },
      { id: 5, input: '[1000000, 500, 2000000, 3000000], 4000000', expectedOutput: '[0, 3]', isHidden: true },
    ],
    solutionKeywords: ['lookup', 'dict', 'complement', 'diff', 'enumerate'],
  },

  {
    id: 6,
    title: '6. Feature Vector Min-Max Normalizer (Machine Learning & Math)',
    category: 'Machine Learning',
    difficulty: 'Medium',
    skills: ['Machine Learning', 'Pandas/Math', 'Data Preprocessing', 'Python'],
    description: `Implement a feature vector Min-Max scaler. Given a list of numerical features \`features\`, rescale each feature to a range between 0.0 and 1.0 using the formula: \`scaled = (x - min) / (max - min)\`. Round results to 3 decimal places. If max == min, return a list of 0.0s.`,
    inputDescription: `features (list[float]): Numerical input array.`,
    outputDescription: `Rescaled array of floats rounded to 3 decimals.`,
    examples: [
      {
        input: `features = [10, 20, 30, 40, 50]`,
        output: `[0.0, 0.25, 0.5, 0.75, 1.0]`,
      },
    ],
    constraints: ['1 <= features.length <= 10^4', 'Negative and floating point values supported'],
    starterCode: {
      Python: `def min_max_scale(features: list[float]) -> list[float]:
    # Write your solution here
    pass`,
      JavaScript: `function minMaxScale(features) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: '[10, 20, 30, 40, 50]', expectedOutput: '[0.0, 0.25, 0.5, 0.75, 1.0]', isHidden: false },
      { id: 2, input: '[5, 5, 5]', expectedOutput: '[0.0, 0.0, 0.0]', isHidden: false },
      { id: 3, input: '[0, 100]', expectedOutput: '[0.0, 1.0]', isHidden: true },
      { id: 4, input: '[-10, 0, 10]', expectedOutput: '[0.0, 0.5, 1.0]', isHidden: true },
      { id: 5, input: '[1.5, 2.5, 3.5]', expectedOutput: '[0.0, 0.5, 1.0]', isHidden: true },
    ],
    solutionKeywords: ['min', 'max', 'round', 'scale', 'float'],
  },

  {
    id: 7,
    title: '7. First Deprecated Curriculum Version (Binary Search / Algorithms)',
    category: 'Algorithms',
    difficulty: 'Medium',
    skills: ['Algorithms', 'Binary Search', 'Logarithmic Complexity', 'Problem Solving'],
    description: `You are auditing university course syllabi versions 1 to n. Since version \`k\`, an outdated library was introduced, causing all subsequent versions to fail modern industry accreditation. Given \`n\` and an API \`is_obsolete(version)\`, find the first obsolete version with minimum API calls in O(log n).`,
    inputDescription: `n (int): Total number of syllabus versions.\nis_obsolete (callable): Function returning boolean true if version is obsolete.`,
    outputDescription: `Integer representing the earliest obsolete version index.`,
    examples: [
      {
        input: `n = 5, first obsolete = 4`,
        output: `4`,
        explanation: `is_obsolete(3) -> False, is_obsolete(4) -> True. 4 is the first obsolete version.`,
      },
    ],
    constraints: ['1 <= n <= 2^31 - 1', 'Time complexity MUST be O(log n)'],
    starterCode: {
      Python: `def first_obsolete_version(n: int, is_obsolete) -> int:
    # Write your solution here
    pass`,
      JavaScript: `function firstObsoleteVersion(n, isObsolete) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: 'n = 5, bad = 4', expectedOutput: '4', isHidden: false },
      { id: 2, input: 'n = 1, bad = 1', expectedOutput: '1', isHidden: false },
      { id: 3, input: 'n = 100, bad = 73', expectedOutput: '73', isHidden: true },
      { id: 4, input: 'n = 1000000, bad = 500001', expectedOutput: '500001', isHidden: true },
      { id: 5, input: 'n = 2147483647, bad = 1700000000', expectedOutput: '1700000000', isHidden: true },
    ],
    solutionKeywords: ['left', 'right', 'mid', 'binary search', 'while'],
  },

  {
    id: 8,
    title: '8. Merge Overlapping Training Schedule Intervals (Data Structures)',
    category: 'Data Structures',
    difficulty: 'Medium',
    skills: ['Data Structures', 'Arrays', 'Interval Scheduling', 'Sorting'],
    description: `Given an array of training workshop time intervals where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all intervals in the input.`,
    inputDescription: `intervals (list[list[int]]): Array of integer start and end intervals.`,
    outputDescription: `Merged non-overlapping intervals array sorted by start time.`,
    examples: [
      {
        input: `intervals = [[1,3],[2,6],[8,10],[15,18]]`,
        output: `[[1,6],[8,10],[15,18]]`,
        explanation: `Intervals [1,3] and [2,6] overlap, merging into [1,6].`,
      },
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start <= end <= 10^4',
    ],
    starterCode: {
      Python: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
      JavaScript: `function mergeIntervals(intervals) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]', isHidden: false },
      { id: 2, input: '[[1,4],[4,5]]', expectedOutput: '[[1,5]]', isHidden: false },
      { id: 3, input: '[[6,8],[1,9],[2,4]]', expectedOutput: '[[1,9]]', isHidden: true },
      { id: 4, input: '[[1,2]]', expectedOutput: '[[1,2]]', isHidden: true },
      { id: 5, input: '[[1,4],[0,4]]', expectedOutput: '[[0,4]]', isHidden: true },
    ],
    solutionKeywords: ['sort', 'merged', 'overlap', 'max', 'append'],
  },

  {
    id: 9,
    title: '9. LRU Skill Evidence Cache (System Logic & Hash Tables)',
    category: 'Data Structures',
    difficulty: 'Hard',
    skills: ['Data Structures', 'Hash Map', 'Linked List', 'System Design'],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) Cache to store applicant verified skill telemetry tokens. Implement \`get(key)\` and \`put(key, value)\` in O(1) average time complexity. When the cache capacity is reached, invalidate the least recently used key.`,
    inputDescription: `Class operations: LRUCache(capacity), get(key), put(key, value).`,
    outputDescription: `get returns integer value or -1 if key not found.`,
    examples: [
      {
        input: `LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2);`,
        output: `get(1) returns 1, get(2) returns -1 (evicted)`,
      },
    ],
    constraints: ['capacity <= 1000', 'get and put should run in O(1) average time complexity'],
    starterCode: {
      Python: `class LRUCache:
    def __init__(self, capacity: int):
        # Write your initialization here
        pass

    def get(self, key: int) -> int:
        # Write your retrieval logic here
        pass

    def put(self, key: int, value: int) -> None:
        # Write your insertion logic here
        pass`,
      JavaScript: `class LRUCache {
  constructor(capacity) {
    // Write your initialization here
  }
  get(key) {
    // Write your retrieval logic here
  }
  put(key, value) {
    // Write your insertion logic here
  }
}`,
    },
    testCases: [
      { id: 1, input: 'capacity=2, put(1,1), put(2,2), get(1)', expectedOutput: '1', isHidden: false },
      { id: 2, input: 'put(3,3) over capacity, get(2)', expectedOutput: '-1', isHidden: false },
      { id: 3, input: 'put(4,4), get(1)', expectedOutput: '-1', isHidden: true },
      { id: 4, input: 'get(3), get(4)', expectedOutput: '3, 4', isHidden: true },
      { id: 5, input: 'update existing key with new value', expectedOutput: 'Updated without increasing size', isHidden: true },
    ],
    solutionKeywords: ['ordereddict', 'capacity', 'popitem', 'delete', 'move_to_end'],
  },

  {
    id: 10,
    title: '10. API Token Bucket Rate Limiter (Problem Solving & Systems)',
    category: 'Problem Solving',
    difficulty: 'Medium',
    skills: ['Problem Solving', 'Systems', 'Algorithms', 'Simulation'],
    description: `Implement a token bucket algorithm to rate-limit candidate diagnostic test submissions. The bucket holds at most \`capacity\` tokens and refills at \`refill_rate\` tokens per second. Given an array of request timestamps in seconds, return a boolean list indicating whether each request was accepted or rate-limited.`,
    inputDescription: `capacity (int): Maximum burst bucket capacity.\nrefill_rate (int): Tokens added per second.\ntimestamps (list[int]): Non-decreasing seconds of incoming requests.`,
    outputDescription: `List of booleans (True = accepted, False = rate-limited).`,
    examples: [
      {
        input: `capacity = 3, refill_rate = 1, timestamps = [0, 0, 0, 0, 1]`,
        output: `[True, True, True, False, True]`,
        explanation: `First 3 tokens used at t=0. 4th request rejected. At t=1, 1 token refilled, accepted.`,
      },
    ],
    constraints: ['Timestamps are non-decreasing integers', '1 <= capacity <= 100', '1 <= refill_rate <= 100'],
    starterCode: {
      Python: `def simulate_rate_limiter(capacity: int, refill_rate: int, timestamps: list[int]) -> list[bool]:
    # Write your solution here
    pass`,
      JavaScript: `function simulateRateLimiter(capacity, refillRate, timestamps) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: 'capacity=3, refill_rate=1, timestamps=[0,0,0,0,1]', expectedOutput: '[True, True, True, False, True]', isHidden: false },
      { id: 2, input: 'capacity=2, refill_rate=2, timestamps=[0,0,1,1]', expectedOutput: '[True, True, True, True]', isHidden: false },
      { id: 3, input: 'capacity=1, refill_rate=1, timestamps=[0,0]', expectedOutput: '[True, False]', isHidden: true },
      { id: 4, input: 'capacity=5, refill_rate=1, timestamps=[10,10,10,10,10,10]', expectedOutput: '[True, True, True, True, True, False]', isHidden: true },
      { id: 5, input: 'capacity=3, refill_rate=1, timestamps=[0,5,5,5,5]', expectedOutput: '[True, True, True, True, False]', isHidden: true },
    ],
    solutionKeywords: ['tokens', 'delta', 'capacity', 'refill', 'min'],
  },
];

// ============================================================================
// SOFTWARE ENGINEERING PROFILE ASSESSMENT SUITE (10 PROBLEMS)
// ============================================================================

export const softwareEngineeringAssessmentSuite: VerificationCodingQuestion[] = [
  {
    id: 1,
    title: '1. Two Sum Target Index Lookup (Hash Table / DSA)',
    category: 'Algorithms',
    difficulty: 'Easy',
    skills: ['DSA', 'Hash Table', 'Time Complexity', 'Problem Solving'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    inputDescription: `nums (list[int]): Array of integers.\ntarget (int): Target sum.`,
    outputDescription: `A pair of indices [i, j].`,
    examples: [
      {
        input: `nums = [2, 7, 11, 15], target = 9`,
        output: `[0, 1]`,
      },
    ],
    constraints: ['2 <= nums.length <= 10^4', 'Exactly one solution exists'],
    starterCode: {
      Python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
      JavaScript: `function twoSum(nums, target) {
  // Write your solution here
}`,
      Java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    },
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]', isHidden: false },
      { id: 2, input: '[3, 2, 4], 6', expectedOutput: '[1, 2]', isHidden: false },
      { id: 3, input: '[3, 3], 6', expectedOutput: '[0, 1]', isHidden: true },
      { id: 4, input: '[-1, -2, -3, -4], -5', expectedOutput: '[0, 2]', isHidden: true },
      { id: 5, input: '[100, 200, 300], 500', expectedOutput: '[1, 2]', isHidden: true },
    ],
    solutionKeywords: ['dict', 'lookup', 'complement', 'map', 'enumerate'],
  },

  {
    id: 2,
    title: '2. Valid Parentheses & Syntax Validator (Stack / Strings)',
    category: 'Data Structures',
    difficulty: 'Easy',
    skills: ['Data Structures', 'Stack', 'String Parsing', 'DSA'],
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.`,
    inputDescription: `s (str): String containing bracket characters.`,
    outputDescription: `Boolean true if valid, false otherwise.`,
    examples: [
      {
        input: `s = "()[]{}"`,
        output: `true`,
      },
      {
        input: `s = "(]"`,
        output: `false`,
      },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    starterCode: {
      Python: `def is_valid_parentheses(s: str) -> bool:
    # Write your solution here
    pass`,
      JavaScript: `function isValidParentheses(s) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: '"()[]{}"', expectedOutput: 'true', isHidden: false },
      { id: 2, input: '"(]"', expectedOutput: 'false', isHidden: false },
      { id: 3, input: '"([{}])"', expectedOutput: 'true', isHidden: true },
      { id: 4, input: '"((("', expectedOutput: 'false', isHidden: true },
      { id: 5, input: '""', expectedOutput: 'true', isHidden: true },
    ],
    solutionKeywords: ['stack', 'pop', 'append', 'bracket', 'match'],
  },

  {
    id: 3,
    title: '3. Longest Substring Without Repeating Characters (Sliding Window)',
    category: 'Algorithms',
    difficulty: 'Medium',
    skills: ['Algorithms', 'Sliding Window', 'Two Pointers', 'Strings'],
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    inputDescription: `s (str): Input string.`,
    outputDescription: `Integer representing the length of the longest distinct substring.`,
    examples: [
      {
        input: `s = "abcabcbb"`,
        output: `3`,
        explanation: `The answer is "abc", with the length of 3.`,
      },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    starterCode: {
      Python: `def length_of_longest_substring(s: str) -> int:
    # Write your solution here
    pass`,
      JavaScript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
}`,
    },
    testCases: [
      { id: 1, input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
      { id: 2, input: '"bbbbb"', expectedOutput: '1', isHidden: false },
      { id: 3, input: '"pwwkew"', expectedOutput: '3', isHidden: true },
      { id: 4, input: '""', expectedOutput: '0', isHidden: true },
      { id: 5, input: '"au"', expectedOutput: '2', isHidden: true },
    ],
    solutionKeywords: ['set', 'left', 'right', 'max', 'window'],
  },

  // Questions 4 to 10 for Software Engineering suite
  ...dataScienceAssessmentSuite.slice(1, 8).map((q, idx) => ({
    ...q,
    id: idx + 4,
  })),
];

// Compatibility alias for default export
export const verificationQuestionsList: VerificationCodingQuestion[] = dataScienceAssessmentSuite;

/**
 * Returns a personalized 10-problem assessment based on candidate profile, target role, and claimed skills.
 */
export function getAssessmentForProfile(
  profile?: LearnerProfile,
  targetRole?: string
): VerificationCodingQuestion[] {
  const role = (targetRole || profile?.targetRole || '').toLowerCase();
  const claimedSkills = Object.keys(profile?.skills || {}).map((s) => s.toLowerCase());

  const isDataOrML =
    role.includes('data') ||
    role.includes('machine learning') ||
    role.includes('ai') ||
    claimedSkills.includes('python') ||
    claimedSkills.includes('sql') ||
    claimedSkills.includes('machine learning');

  if (isDataOrML) {
    return dataScienceAssessmentSuite;
  }
  return softwareEngineeringAssessmentSuite;
}
