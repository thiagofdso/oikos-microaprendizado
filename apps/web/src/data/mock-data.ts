import type {
  Church,
  Exercise,
  ExerciseFeedback,
  ForumTopic,
  Lesson,
  Notification,
  NotificationCategory,
  PastorUser,
  Plan,
  Session,
  Student,
} from "@/types/content";

export const sessions: Session[] = [
  {
    id: "session-welcome-week",
    slug: "welcome-week",
    title: "Welcome Week Kickoff",
    description: "Introduces the rhythm, score system, and weekly goals for new cohorts.",
    status: "scheduled",
    startsAt: "2026-04-02T19:30:00-03:00",
    durationMinutes: 45,
    hostName: "Pr. Samuel Rocha",
    attendeeCount: 84,
    lessonIds: ["lesson-rhythm", "lesson-scoreboard"],
    primaryGoal: "Help students complete the first two lessons in the first 48 hours.",
  },
  {
    id: "session-leadership-lab",
    slug: "leadership-lab",
    title: "Leadership Lab Live",
    description: "A practical session on discussion flow and short-form facilitation.",
    status: "live",
    startsAt: "2026-03-29T20:00:00-03:00",
    durationMinutes: 60,
    hostName: "Pra. Ana Matos",
    attendeeCount: 126,
    lessonIds: ["lesson-openers", "lesson-feedback"],
    primaryGoal: "Equip group leaders with repeatable prompts for microlearning circles.",
  },
  {
    id: "session-follow-up-clinic",
    slug: "follow-up-clinic",
    title: "Follow-up Clinic",
    description: "Reviews engagement signals and pastor follow-up actions after lesson completion.",
    status: "completed",
    startsAt: "2026-03-21T09:00:00-03:00",
    durationMinutes: 50,
    hostName: "Pr. Lucas Vieira",
    attendeeCount: 57,
    lessonIds: ["lesson-follow-up", "lesson-community-loop"],
    primaryGoal: "Turn lesson completion into conversations, prayer requests, and pastoral care.",
  },
];

export const lessons: Lesson[] = [
  {
    id: "lesson-rhythm",
    sessionId: "session-welcome-week",
    slug: "microlearning-rhythm",
    title: "The 15-minute discipleship rhythm",
    summary: "Shows how to structure a complete learning block with prayer, content, and action.",
    format: "video",
    durationMinutes: 12,
    releaseDate: "2026-04-01",
    skillLevel: "beginner",
    tags: ["discipleship", "rhythm"],
    exerciseIds: ["exercise-rhythm-check"],
  },
  {
    id: "lesson-scoreboard",
    sessionId: "session-welcome-week",
    slug: "healthy-scoreboards",
    title: "Healthy scoreboards that motivate",
    summary: "Frames rankings as encouragement instead of pressure.",
    format: "reading",
    durationMinutes: 9,
    releaseDate: "2026-04-01",
    skillLevel: "beginner",
    tags: ["engagement", "ranking"],
    exerciseIds: ["exercise-scoreboard-reflection"],
  },
  {
    id: "lesson-openers",
    sessionId: "session-leadership-lab",
    slug: "conversation-openers",
    title: "Conversation openers for live groups",
    summary: "Provides short prompts that move students from passive watching into active sharing.",
    format: "audio",
    durationMinutes: 14,
    releaseDate: "2026-03-28",
    skillLevel: "intermediate",
    tags: ["leadership", "community"],
    exerciseIds: ["exercise-opener-quiz"],
  },
  {
    id: "lesson-feedback",
    sessionId: "session-leadership-lab",
    slug: "fast-feedback-loops",
    title: "Fast feedback loops",
    summary: "Teaches leaders to respond to answers with clarity, warmth, and next steps.",
    format: "live",
    durationMinutes: 18,
    releaseDate: "2026-03-29",
    skillLevel: "intermediate",
    tags: ["feedback", "coaching"],
    exerciseIds: ["exercise-feedback-note"],
  },
  {
    id: "lesson-follow-up",
    sessionId: "session-follow-up-clinic",
    slug: "pastoral-follow-up",
    title: "Pastoral follow-up in 24 hours",
    summary: "Covers the signals pastors can use to prioritize personal check-ins.",
    format: "video",
    durationMinutes: 11,
    releaseDate: "2026-03-20",
    skillLevel: "advanced",
    tags: ["care", "follow-up"],
    exerciseIds: ["exercise-follow-up-plan"],
  },
  {
    id: "lesson-community-loop",
    sessionId: "session-follow-up-clinic",
    slug: "community-loop",
    title: "Closing the community loop",
    summary: "Connects notifications, forum prompts, and next-session invites into one habit.",
    format: "reading",
    durationMinutes: 10,
    releaseDate: "2026-03-20",
    skillLevel: "intermediate",
    tags: ["community", "operations"],
    exerciseIds: ["exercise-loop-check"],
  },
];

export const exercises: Exercise[] = [
  {
    id: "exercise-rhythm-check",
    lessonId: "lesson-rhythm",
    type: "objective",
    title: "Choose the best rhythm",
    prompt: "Which sequence best matches the recommended 15-minute lesson flow?",
    points: 50,
    options: [
      { id: "a", label: "A", text: "Prayer, content, action, reminder" },
      { id: "b", label: "B", text: "Announcement, quiz, prayer, break" },
      { id: "c", label: "C", text: "Icebreaker, sermon replay, survey" },
    ],
    correctOptionId: "a",
    explanation: "The core rhythm keeps a short devotional arc and a concrete next step.",
  },
  {
    id: "exercise-scoreboard-reflection",
    lessonId: "lesson-scoreboard",
    type: "discursive",
    title: "Reframe the ranking",
    prompt: "Write a short pastor note that uses the leaderboard as encouragement, not pressure.",
    points: 80,
    suggestedTopics: ["celebrate progress", "invite action", "protect tone"],
    rubric: [
      "Names a concrete win",
      "Invites the next action",
      "Keeps language pastoral and hopeful",
    ],
    exemplarAnswer: "Celebrate consistent steps, name the next lesson, and remind the group that progress matters more than comparison.",
    minWords: 60,
  },
  {
    id: "exercise-opener-quiz",
    lessonId: "lesson-openers",
    type: "objective",
    title: "Pick the stronger opener",
    prompt: "Which prompt is more likely to spark a practical conversation in under three minutes?",
    points: 40,
    options: [
      { id: "a", label: "A", text: "What detail from today can you use before tonight ends?" },
      { id: "b", label: "B", text: "Did everyone enjoy the lesson?" },
      { id: "c", label: "C", text: "Who wants to volunteer first without thinking?" },
    ],
    correctOptionId: "a",
    explanation: "Specific, action-oriented prompts make participation easier and faster.",
  },
  {
    id: "exercise-feedback-note",
    lessonId: "lesson-feedback",
    type: "discursive",
    title: "Coach with warmth",
    prompt: "Draft a two-sentence response to a student who shared an honest but incomplete answer.",
    points: 70,
    suggestedTopics: ["affirm effort", "clarify next step"],
    rubric: [
      "Affirms the student",
      "Adds one helpful correction",
      "Points to the next action",
    ],
    exemplarAnswer: "Thank the student for sharing honestly, then add one clarifying insight and invite them to revisit the prompt with that lens.",
    minWords: 45,
  },
  {
    id: "exercise-follow-up-plan",
    lessonId: "lesson-follow-up",
    type: "discursive",
    title: "Prioritize your follow-up",
    prompt: "Outline who you would contact first after a student misses two lessons and why.",
    points: 90,
    suggestedTopics: ["urgency", "care", "context"],
    rubric: [
      "Identifies a clear priority",
      "Shows pastoral reasoning",
      "Includes a realistic contact step",
    ],
    exemplarAnswer: "Contact students showing both inactivity and a recent care request first, because pastoral need outweighs raw completion metrics.",
    minWords: 75,
  },
  {
    id: "exercise-loop-check",
    lessonId: "lesson-community-loop",
    type: "objective",
    title: "Close the loop",
    prompt: "Which action most directly closes the community loop after a lesson ends?",
    points: 35,
    options: [
      { id: "a", label: "A", text: "Archive the discussion so the feed stays clean" },
      { id: "b", label: "B", text: "Send a forum prompt and point students to the next session" },
      { id: "c", label: "C", text: "Wait until the next ranking update before saying anything" },
    ],
    correctOptionId: "b",
    explanation: "A forum prompt plus a next-session invite keeps momentum alive between lessons.",
  },
];

export const leaderboard: Student[] = [
  {
    id: "student-esther-lima",
    name: "Esther Lima",
    churchId: "church-renovo",
    rank: 1,
    xp: 1240,
    streakDays: 21,
    completionRate: 98,
    avatarTone: "cobre",
  },
  {
    id: "student-davi-sousa",
    name: "Davi Sousa",
    churchId: "church-renovo",
    rank: 2,
    xp: 1175,
    streakDays: 19,
    completionRate: 95,
    avatarTone: "marinho",
  },
  {
    id: "student-sarah-azevedo",
    name: "Sarah Azevedo",
    churchId: "church-ponte",
    rank: 3,
    xp: 1110,
    streakDays: 18,
    completionRate: 93,
    avatarTone: "oliva",
  },
  {
    id: "student-caio-freitas",
    name: "Caio Freitas",
    churchId: "church-renovo",
    rank: 4,
    xp: 1045,
    streakDays: 15,
    completionRate: 89,
    avatarTone: "grafite",
  },
  {
    id: "student-lia-costa",
    name: "Lia Costa",
    churchId: "church-ponte",
    rank: 5,
    xp: 990,
    streakDays: 13,
    completionRate: 87,
    avatarTone: "areia",
  },
];

export const notifications: Notification[] = [
  {
    id: "notification-live-lab",
    category: "reminder",
    title: "Leadership Lab starts in 30 minutes",
    message: "Open the live room early if you want the facilitation checklist before the session starts.",
    createdAt: "2026-03-29T19:30:00-03:00",
    isRead: false,
    audience: "leaders",
  },
  {
    id: "notification-ranking",
    category: "ranking",
    title: "Esther moved to the top of the leaderboard",
    message: "Her consistency streak hit 21 days after finishing the follow-up module.",
    createdAt: "2026-03-29T10:15:00-03:00",
    isRead: true,
    audience: "all",
  },
  {
    id: "notification-forum",
    category: "community",
    title: "New forum prompt: how do you close the loop after class?",
    message: "Join the discussion and share one practical action your team uses this week.",
    createdAt: "2026-03-28T17:10:00-03:00",
    isRead: false,
    audience: "students",
  },
  {
    id: "notification-maintenance",
    category: "system",
    title: "Reporting sync completed",
    message: "Church dashboards are up to date with lesson activity from the last 24 hours.",
    createdAt: "2026-03-28T06:45:00-03:00",
    isRead: true,
    audience: "leaders",
  },
];

export const plans: Plan[] = [
  {
    id: "plan-growth",
    tier: "growth",
    name: "Growth",
    seatLimit: 250,
    monthlyPriceBrl: 399,
    features: ["Unlimited sessions", "Leader leaderboard", "Forum moderation"],
    highlightColor: "primary",
    recommended: true,
  },
  {
    id: "plan-impact",
    tier: "impact",
    name: "Impact",
    seatLimit: 750,
    monthlyPriceBrl: 799,
    features: ["Multi-campus dashboards", "Priority support", "Pastoral care reports"],
    highlightColor: "accent",
    recommended: false,
  },
];

export const pastorUsers: PastorUser[] = [
  {
    id: "pastor-samuel-rocha",
    churchId: "church-renovo",
    planId: "plan-growth",
    name: "Samuel Rocha",
    email: "samuel@renovocuritiba.org",
    phone: "+55-41-98888-2101",
    role: "lead-pastor",
    initials: "SR",
  },
  {
    id: "pastor-ana-matos",
    churchId: "church-ponte",
    planId: "plan-impact",
    name: "Ana Matos",
    email: "ana@ponterecife.org",
    phone: "+55-81-97777-1202",
    role: "lead-pastor",
    initials: "AM",
  },
];

export const churches: Church[] = [
  {
    id: "church-renovo",
    name: "Igreja Renovo",
    city: "Curitiba",
    state: "PR",
    status: "active",
    memberCount: 420,
    activeStudents: 186,
    campusCount: 1,
    planId: "plan-growth",
    pastorId: "pastor-samuel-rocha",
  },
  {
    id: "church-ponte",
    name: "Comunidade Ponte",
    city: "Recife",
    state: "PE",
    status: "onboarding",
    memberCount: 760,
    activeStudents: 244,
    campusCount: 3,
    planId: "plan-impact",
    pastorId: "pastor-ana-matos",
  },
];

export const forumTopics: ForumTopic[] = [
  {
    id: "topic-leadership-openers",
    churchId: "church-renovo",
    authorId: "pastor-samuel-rocha",
    title: "Best opener for new leaders this month?",
    excerpt: "Share the first question you ask after a lesson when the room feels quiet.",
    tag: "leadership",
    repliesCount: 12,
    participantsCount: 18,
    lastActivityAt: "2026-03-29T18:22:00-03:00",
    isPinned: true,
  },
  {
    id: "topic-prayer-follow-up",
    churchId: "church-ponte",
    authorId: "pastor-ana-matos",
    title: "How do you capture prayer requests after lesson completion?",
    excerpt: "Looking for fast ways to turn lesson reflections into real pastoral follow-up.",
    tag: "prayer",
    repliesCount: 7,
    participantsCount: 11,
    lastActivityAt: "2026-03-28T21:05:00-03:00",
    isPinned: false,
  },
  {
    id: "topic-youth-streaks",
    churchId: "church-renovo",
    authorId: "student-esther-lima",
    title: "What keeps youth students on a streak?",
    excerpt: "Our youth leaders want ideas that reinforce progress without making the app feel heavy.",
    tag: "youth",
    repliesCount: 15,
    participantsCount: 24,
    lastActivityAt: "2026-03-27T16:40:00-03:00",
    isPinned: false,
  },
];

export const feedbackEntries: ExerciseFeedback[] = [
  {
    id: "feedback-rhythm-esther",
    exerciseId: "exercise-rhythm-check",
    studentId: "student-esther-lima",
    submittedAt: "2026-03-28T08:15:00-03:00",
    score: 50,
    summary: "Strong grasp of the core lesson flow and the reason it works.",
    strengths: ["Named the right sequence", "Connected rhythm to action"],
    improvements: ["Add one local church example next time"],
  },
  {
    id: "feedback-scoreboard-davi",
    exerciseId: "exercise-scoreboard-reflection",
    studentId: "student-davi-sousa",
    submittedAt: "2026-03-28T09:10:00-03:00",
    score: 72,
    summary: "Warm pastoral tone, but the next step could be more concrete.",
    strengths: ["Encouraging language", "Protects student dignity"],
    improvements: ["Mention the next lesson by name", "End with a clear action"],
  },
  {
    id: "feedback-follow-up-sarah",
    exerciseId: "exercise-follow-up-plan",
    studentId: "student-sarah-azevedo",
    submittedAt: "2026-03-29T11:30:00-03:00",
    score: 88,
    summary: "Thoughtful prioritization that balances urgency and pastoral care.",
    strengths: ["Clear contact order", "Good reasoning"],
    improvements: ["Include who owns the follow-up if the pastor is unavailable"],
  },
];

const cloneAndDeepFreeze = <T>(value: T): Readonly<T> => {
  const clonedValue = structuredClone(value);

  const deepFreeze = <TValue>(entry: TValue): Readonly<TValue> => {
    if (entry === null || typeof entry !== "object") {
      return entry;
    }

    for (const nestedValue of Object.values(entry)) {
      deepFreeze(nestedValue);
    }

    return Object.freeze(entry);
  };

  return deepFreeze(clonedValue);
};

export const dashboardSnapshot = Object.freeze({
  sessions: cloneAndDeepFreeze(sessions),
  lessons: cloneAndDeepFreeze(lessons),
  exercises: cloneAndDeepFreeze(exercises),
  leaderboard: cloneAndDeepFreeze(leaderboard),
  notifications: cloneAndDeepFreeze(notifications),
  plans: cloneAndDeepFreeze(plans),
  pastorUsers: cloneAndDeepFreeze(pastorUsers),
  churches: cloneAndDeepFreeze(churches),
  forumTopics: cloneAndDeepFreeze(forumTopics),
  feedbackEntries: cloneAndDeepFreeze(feedbackEntries),
});

export const getSessionById = (sessionId: string) =>
  sessions.find((session) => session.id === sessionId);

export const getLessonsBySession = (sessionId: string) =>
  lessons.filter((lesson) => lesson.sessionId === sessionId);

export const getExercisesByLesson = (lessonId: string) =>
  exercises.filter((exercise) => exercise.lessonId === lessonId);

export const getLeaderboard = (limit?: number) =>
  leaderboard.slice().sort((left, right) => left.rank - right.rank).slice(0, limit ?? leaderboard.length);

export const getNotificationsByCategory = (category: NotificationCategory) =>
  notifications.filter((notification) => notification.category === category);

export const getChurchById = (churchId: string) =>
  churches.find((church) => church.id === churchId);

export const getPlanById = (planId: string) =>
  plans.find((plan) => plan.id === planId);

export const getPastorByChurch = (churchId: string) =>
  pastorUsers.find((pastor) => pastor.churchId === churchId);

export const getFeedbackByStudent = (studentId: string) =>
  feedbackEntries.filter((entry) => entry.studentId === studentId);
