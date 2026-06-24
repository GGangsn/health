const STORAGE_KEY = "rpe-bulk-pwa-state-v1";

const RPE_PERCENT = {
  7: 0.82,
  8: 0.86,
  9: 0.9
};

const BARBELL_EXERCISE_IDS = new Set([
  "bench-press",
  "barbell-row",
  "back-squat",
  "romanian-deadlift",
  "overhead-press",
  "deadlift",
  "front-squat"
]);

const EXERCISE_TRAINING_CLASS = {
  "bench-press": "main",
  "barbell-row": "main",
  "back-squat": "main",
  "romanian-deadlift": "main",
  "overhead-press": "main",
  "pull-up": "main",
  "deadlift": "main",
  "front-squat": "main",
  "incline-db-press": "accessory",
  "lat-pulldown": "accessory",
  "cable-fly": "accessory",
  "leg-press": "accessory",
  "dumbbell-bench": "accessory",
  "seated-row": "accessory",
  "dip": "accessory",
  "leg-curl": "accessory",
  "machine-shoulder": "accessory",
  "face-pull": "isolation",
  "lateral-raise": "isolation",
  "standing-calf": "isolation",
  "rear-delt-fly": "isolation",
  "ez-curl": "isolation",
  "cable-lateral": "isolation",
  "triceps-pushdown": "isolation"
};

const TRAINING_CLASS_LABEL = {
  main: "메인",
  accessory: "보조",
  isolation: "소근육"
};

const EXERCISE_GROUP_KEY = {
  "bench-press": "horizontal_chest_push",
  "dumbbell-bench": "horizontal_chest_push",
  "incline-db-press": "incline_chest_push",
  "cable-fly": "chest_fly",
  "dip": "chest_dip",
  "barbell-row": "horizontal_back_pull",
  "seated-row": "horizontal_back_pull",
  "lat-pulldown": "vertical_back_pull",
  "pull-up": "vertical_back_pull",
  "back-squat": "knee_dominant_squat",
  "front-squat": "knee_dominant_squat",
  "leg-press": "knee_dominant_squat",
  "romanian-deadlift": "hip_hinge",
  "deadlift": "hip_hinge",
  "leg-curl": "hamstring_isolation",
  "overhead-press": "vertical_shoulder_push",
  "machine-shoulder": "vertical_shoulder_push",
  "lateral-raise": "lateral_raise",
  "cable-lateral": "lateral_raise",
  "face-pull": "rear_delt_external_rotation",
  "rear-delt-fly": "rear_delt_external_rotation",
  "ez-curl": "elbow_flexion",
  "triceps-pushdown": "elbow_extension",
  "standing-calf": "calf_raise"
};

const VARIANT_KEY_OVERRIDES = {
  "bench-press:base": "horizontal_chest_push:barbell_bench_press",
  "bench-press:0": "horizontal_chest_push:dumbbell_bench_press",
  "bench-press:1": "horizontal_chest_push:machine_chest_press",
  "dumbbell-bench:base": "horizontal_chest_push:dumbbell_bench_press",
  "dumbbell-bench:0": "horizontal_chest_push:barbell_bench_press",
  "dumbbell-bench:1": "horizontal_chest_push:machine_chest_press",
  "dumbbell-bench:2": "horizontal_chest_push:smith_bench_press",
  "barbell-row:base": "horizontal_back_pull:barbell_row",
  "barbell-row:0": "horizontal_back_pull:seated_row",
  "seated-row:base": "horizontal_back_pull:seated_row",
  "seated-row:0": "horizontal_back_pull:barbell_row",
  "seated-row:1": "horizontal_back_pull:dumbbell_row",
  "lat-pulldown:base": "vertical_back_pull:lat_pulldown",
  "lat-pulldown:0": "vertical_back_pull:pull_up",
  "pull-up:base": "vertical_back_pull:pull_up",
  "pull-up:0": "vertical_back_pull:lat_pulldown",
  "pull-up:1": "vertical_back_pull:assisted_pull_up",
  "dip:base": "chest_dip:bodyweight_dip",
  "dip:assist": "chest_dip:assisted_dip",
  "overhead-press:base": "vertical_shoulder_push:barbell_overhead_press",
  "overhead-press:0": "vertical_shoulder_push:dumbbell_shoulder_press",
  "overhead-press:1": "vertical_shoulder_push:machine_shoulder_press",
  "machine-shoulder:base": "vertical_shoulder_push:machine_shoulder_press",
  "machine-shoulder:0": "vertical_shoulder_push:dumbbell_shoulder_press",
  "machine-shoulder:1": "vertical_shoulder_push:barbell_overhead_press",
  "lateral-raise:base": "lateral_raise:dumbbell_lateral_raise",
  "lateral-raise:0": "lateral_raise:cable_lateral_raise",
  "lateral-raise:1": "lateral_raise:machine_lateral_raise",
  "cable-lateral:base": "lateral_raise:cable_lateral_raise",
  "cable-lateral:0": "lateral_raise:dumbbell_lateral_raise",
  "cable-lateral:1": "lateral_raise:machine_lateral_raise",
  "face-pull:base": "rear_delt_external_rotation:face_pull",
  "face-pull:0": "rear_delt_external_rotation:rear_delt_fly",
  "rear-delt-fly:base": "rear_delt_external_rotation:rear_delt_fly",
  "rear-delt-fly:0": "rear_delt_external_rotation:face_pull",
  "back-squat:base": "knee_dominant_squat:back_squat",
  "back-squat:0": "knee_dominant_squat:leg_press",
  "front-squat:base": "knee_dominant_squat:front_squat",
  "front-squat:1": "knee_dominant_squat:leg_press",
  "leg-press:base": "knee_dominant_squat:leg_press",
  "leg-press:0": "knee_dominant_squat:back_squat",
  "deadlift:base": "hip_hinge:deadlift",
  "deadlift:1": "hip_hinge:romanian_deadlift",
  "romanian-deadlift:base": "hip_hinge:romanian_deadlift",
  "romanian-deadlift:0": "hip_hinge:dumbbell_romanian_deadlift",
  "leg-curl:base": "hamstring_isolation:leg_curl",
  "leg-curl:1": "hip_hinge:dumbbell_romanian_deadlift",
  "ez-curl:base": "elbow_flexion:ez_bar_curl",
  "triceps-pushdown:base": "elbow_extension:cable_pushdown"
};

const VARIANT_META = {
  "horizontal_chest_push:barbell_bench_press": { loadStep: 5, loadMode: "load" },
  "horizontal_chest_push:dumbbell_bench_press": { loadStep: 2.5, loadMode: "load" },
  "horizontal_chest_push:machine_chest_press": { loadStep: 2.5, loadMode: "load" },
  "horizontal_chest_push:smith_bench_press": { loadStep: 5, loadMode: "load" },
  "vertical_back_pull:pull_up": { loadStep: 2.5, loadMode: "load" },
  "vertical_back_pull:assisted_pull_up": { loadStep: 5, loadMode: "assistance" },
  "chest_dip:bodyweight_dip": { loadStep: 2.5, loadMode: "load" },
  "chest_dip:assisted_dip": { loadStep: 5, loadMode: "assistance" },
  "knee_dominant_squat:back_squat": { loadStep: 5, loadMode: "load" },
  "knee_dominant_squat:front_squat": { loadStep: 5, loadMode: "load" },
  "hip_hinge:deadlift": { loadStep: 5, loadMode: "load" },
  "hip_hinge:romanian_deadlift": { loadStep: 5, loadMode: "load" },
  "vertical_shoulder_push:barbell_overhead_press": { loadStep: 5, loadMode: "load" },
  "vertical_shoulder_push:dumbbell_shoulder_press": { loadStep: 2.5, loadMode: "load" },
  "vertical_shoulder_push:machine_shoulder_press": { loadStep: 2.5, loadMode: "load" },
  "lateral_raise:dumbbell_lateral_raise": { loadStep: 2, loadMode: "load" },
  "lateral_raise:cable_lateral_raise": { loadStep: 2.5, loadMode: "load" },
  "lateral_raise:machine_lateral_raise": { loadStep: 2.5, loadMode: "load" },
  "elbow_flexion:ez_bar_curl": { loadStep: 2.5, loadMode: "load" },
  "elbow_flexion:dumbbell_curl": { loadStep: 2, loadMode: "load" },
  "elbow_flexion:cable_curl": { loadStep: 2.5, loadMode: "load" },
  "elbow_extension:cable_pushdown": { loadStep: 2.5, loadMode: "load" }
};

const EXERCISE_ALTERNATIVES = {
  "bench-press": [
    { name: "덤벨 벤치프레스", muscle: "가슴", loadStep: 2.5 },
    { name: "머신 체스트프레스", muscle: "가슴", loadStep: 2.5 },
    { name: "푸쉬업 가중/맨몸", muscle: "가슴", loadStep: 2.5 }
  ],
  "barbell-row": [
    { name: "시티드로우", muscle: "등", loadStep: 2.5 },
    { name: "체스트서포티드 로우", muscle: "등", loadStep: 2.5 },
    { name: "원암 덤벨로우", muscle: "등", loadStep: 2.5 }
  ],
  "incline-db-press": [
    { name: "인클라인 머신프레스", muscle: "가슴", loadStep: 2.5 },
    { name: "스미스 인클라인프레스", muscle: "가슴", loadStep: 5 },
    { name: "인클라인 푸쉬업", muscle: "가슴", loadStep: 2.5 }
  ],
  "lat-pulldown": [
    { name: "풀업/어시스트 풀업", muscle: "등", loadStep: 2.5 },
    { name: "뉴트럴그립 풀다운", muscle: "등", loadStep: 2.5 },
    { name: "스트레이트암 풀다운", muscle: "등", loadStep: 2.5 }
  ],
  "cable-fly": [
    { name: "펙덱 플라이", muscle: "가슴", loadStep: 2.5 },
    { name: "덤벨 플라이", muscle: "가슴", loadStep: 2.5 },
    { name: "푸쉬업", muscle: "가슴", loadStep: 2.5 }
  ],
  "face-pull": [
    { name: "리어델트 플라이", muscle: "후면 어깨", loadStep: 2.5 },
    { name: "밴드 페이스풀", muscle: "후면 어깨", loadStep: 2.5 },
    { name: "케이블 리버스 플라이", muscle: "후면 어깨", loadStep: 2.5 }
  ],
  "back-squat": [
    { name: "레그프레스", muscle: "하체", loadStep: 2.5 },
    { name: "핵스쿼트", muscle: "하체", loadStep: 2.5 },
    { name: "불가리안 스플릿스쿼트", muscle: "하체", loadStep: 2.5 }
  ],
  "romanian-deadlift": [
    { name: "덤벨 루마니안 데드리프트", muscle: "햄스트링", loadStep: 2.5 },
    { name: "레그컬", muscle: "햄스트링", loadStep: 2.5 },
    { name: "백익스텐션", muscle: "후면사슬", loadStep: 2.5 }
  ],
  "leg-press": [
    { name: "백스쿼트", muscle: "하체", loadStep: 5 },
    { name: "핵스쿼트", muscle: "하체", loadStep: 2.5 },
    { name: "런지", muscle: "하체", loadStep: 2.5 }
  ],
  "overhead-press": [
    { name: "덤벨 숄더프레스", muscle: "어깨", loadStep: 2.5 },
    { name: "머신 숄더프레스", muscle: "어깨", loadStep: 2.5 },
    { name: "스미스 숄더프레스", muscle: "어깨", loadStep: 5 }
  ],
  "lateral-raise": [
    { name: "케이블 레터럴 레이즈", muscle: "측면 어깨", loadStep: 2.5 },
    { name: "머신 레터럴 레이즈", muscle: "측면 어깨", loadStep: 2.5 },
    { name: "원암 덤벨 레터럴", muscle: "측면 어깨", loadStep: 2.5 }
  ],
  "standing-calf": [
    { name: "시티드 카프레이즈", muscle: "종아리", loadStep: 2.5 },
    { name: "레그프레스 카프레이즈", muscle: "종아리", loadStep: 2.5 },
    { name: "덤벨 카프레이즈", muscle: "종아리", loadStep: 2.5 }
  ],
  "pull-up": [
    { name: "랫풀다운", muscle: "등", loadStep: 2.5 },
    { name: "어시스트 풀업", muscle: "등", loadStep: 2.5 },
    { name: "시티드로우", muscle: "등", loadStep: 2.5 }
  ],
  "dumbbell-bench": [
    { name: "벤치프레스", muscle: "가슴", loadStep: 5 },
    { name: "머신 체스트프레스", muscle: "가슴", loadStep: 2.5 },
    { name: "스미스 벤치프레스", muscle: "가슴", loadStep: 5 }
  ],
  "seated-row": [
    { name: "바벨로우", muscle: "등", loadStep: 5 },
    { name: "덤벨로우", muscle: "등", loadStep: 2.5 },
    { name: "랫풀다운", muscle: "등", loadStep: 2.5 }
  ],
  "dip": [
    { name: "머신 딥스", muscle: "가슴", loadStep: 2.5 },
    { name: "클로즈그립 푸쉬업", muscle: "가슴", loadStep: 2.5 },
    { name: "디클라인 체스트프레스", muscle: "가슴", loadStep: 2.5 }
  ],
  "rear-delt-fly": [
    { name: "페이스풀", muscle: "후면 어깨", loadStep: 2.5 },
    { name: "리버스 펙덱", muscle: "후면 어깨", loadStep: 2.5 },
    { name: "밴드 풀어파트", muscle: "후면 어깨", loadStep: 2.5 }
  ],
  "ez-curl": [
    { name: "덤벨 컬", muscle: "이두", loadStep: 2.5 },
    { name: "케이블 컬", muscle: "이두", loadStep: 2.5 },
    { name: "머신 컬", muscle: "이두", loadStep: 2.5 }
  ],
  "deadlift": [
    { name: "랙풀", muscle: "후면사슬", loadStep: 5 },
    { name: "루마니안 데드리프트", muscle: "후면사슬", loadStep: 5 },
    { name: "힙쓰러스트", muscle: "둔근", loadStep: 5 }
  ],
  "front-squat": [
    { name: "핵스쿼트", muscle: "하체", loadStep: 2.5 },
    { name: "레그프레스", muscle: "하체", loadStep: 2.5 },
    { name: "고블릿 스쿼트", muscle: "하체", loadStep: 2.5 }
  ],
  "leg-curl": [
    { name: "루마니안 데드리프트", muscle: "햄스트링", loadStep: 5 },
    { name: "덤벨 RDL", muscle: "햄스트링", loadStep: 2.5 },
    { name: "노르딕 컬", muscle: "햄스트링", loadStep: 2.5 }
  ],
  "machine-shoulder": [
    { name: "덤벨 숄더프레스", muscle: "어깨", loadStep: 2.5 },
    { name: "오버헤드프레스", muscle: "어깨", loadStep: 5 },
    { name: "스미스 숄더프레스", muscle: "어깨", loadStep: 5 }
  ],
  "cable-lateral": [
    { name: "덤벨 레터럴 레이즈", muscle: "측면 어깨", loadStep: 2.5 },
    { name: "머신 레터럴 레이즈", muscle: "측면 어깨", loadStep: 2.5 },
    { name: "원암 케이블 레터럴", muscle: "측면 어깨", loadStep: 2.5 }
  ],
  "triceps-pushdown": [
    { name: "케이블 오버헤드 익스텐션", muscle: "삼두", loadStep: 2.5 },
    { name: "스컬크러셔", muscle: "삼두", loadStep: 2.5 },
    { name: "머신 딥스", muscle: "삼두", loadStep: 2.5 }
  ]
};

const ROUTINE = [
  {
    id: "upper-a",
    label: "상체 A",
    focus: "가슴/등 길항",
    exercises: [
      ["bench-press", "벤치프레스", "가슴", 8, 10, 60],
      ["barbell-row", "바벨로우", "등", 8, 10, 55],
      ["incline-db-press", "인클라인 덤벨프레스", "가슴", 10, 12, 24],
      ["lat-pulldown", "랫풀다운", "등", 10, 12, 50],
      ["cable-fly", "케이블 플라이", "가슴", 12, 15, 20],
      ["face-pull", "페이스풀", "후면 어깨", 12, 15, 22.5]
    ]
  },
  {
    id: "lower-a",
    label: "하체 A",
    focus: "스쿼트/어깨",
    exercises: [
      ["back-squat", "백스쿼트", "하체", 8, 10, 80],
      ["romanian-deadlift", "루마니안 데드리프트", "햄스트링", 8, 10, 70],
      ["leg-press", "레그프레스", "하체", 10, 12, 140],
      ["overhead-press", "오버헤드프레스", "어깨", 8, 10, 35],
      ["lateral-raise", "사이드 레터럴 레이즈", "측면 어깨", 12, 15, 8],
      ["standing-calf", "스탠딩 카프레이즈", "종아리", 12, 15, 50]
    ]
  },
  {
    id: "upper-b",
    label: "상체 B",
    focus: "등/가슴 길항",
    exercises: [
      ["pull-up", "풀업/어시스트 풀업", "등", 6, 10, 0],
      ["dumbbell-bench", "덤벨 벤치프레스", "가슴", 8, 10, 26],
      ["seated-row", "시티드로우", "등", 10, 12, 55],
      ["dip", "딥스/어시스트 딥스", "가슴", 8, 12, 0],
      ["rear-delt-fly", "리어델트 플라이", "후면 어깨", 12, 15, 10],
      ["ez-curl", "EZ바 컬", "이두", 10, 12, 25]
    ]
  },
  {
    id: "lower-b",
    label: "하체 B",
    focus: "힙힌지/어깨",
    exercises: [
      ["deadlift", "데드리프트", "후면사슬", 5, 8, 100],
      ["front-squat", "프론트스쿼트", "하체", 8, 10, 60],
      ["leg-curl", "레그컬", "햄스트링", 10, 12, 35],
      ["machine-shoulder", "머신 숄더프레스", "어깨", 8, 10, 40],
      ["cable-lateral", "케이블 레터럴 레이즈", "측면 어깨", 12, 15, 7.5],
      ["triceps-pushdown", "트라이셉스 푸시다운", "삼두", 10, 12, 30]
    ]
  }
].map((day) => ({
  ...day,
  exercises: day.exercises.map(([id, name, muscle, minReps, maxReps, baseWeight]) => ({
    id,
    name,
    muscle,
    minReps,
    maxReps,
    baseWeight,
    trainingClass: EXERCISE_TRAINING_CLASS[id] || "accessory",
    loadStep: BARBELL_EXERCISE_IDS.has(id) ? 5 : 2.5
  }))
}));

const DEFAULT_PROFILE = {
  sex: "male",
  age: 30,
  height: 175,
  weight: 75,
  activity: 1.55
};

const FOOD_LIBRARY = [
  { id: "rice", name: "쌀밥 210g", role: "carb", kcal: 310, protein: 6, carbs: 67, fat: 1 },
  { id: "oats", name: "오트밀 80g", role: "carb", kcal: 300, protein: 10, carbs: 52, fat: 6 },
  { id: "sweet-potato", name: "고구마 250g", role: "carb", kcal: 320, protein: 4, carbs: 75, fat: 0 },
  { id: "banana", name: "바나나 2개", role: "carb", kcal: 210, protein: 2, carbs: 54, fat: 1 },
  { id: "chicken", name: "닭가슴살 150g", role: "protein", kcal: 248, protein: 46, carbs: 0, fat: 5 },
  { id: "eggs", name: "계란 3개", role: "protein", kcal: 210, protein: 18, carbs: 1, fat: 15 },
  { id: "beef", name: "우둔살 150g", role: "protein", kcal: 255, protein: 42, carbs: 0, fat: 9 },
  { id: "tofu", name: "두부 300g", role: "protein", kcal: 255, protein: 27, carbs: 9, fat: 15 },
  { id: "greek-yogurt", name: "그릭요거트 250g", role: "protein", kcal: 250, protein: 25, carbs: 18, fat: 8 },
  { id: "whey", name: "웨이 프로틴 1스쿱", role: "protein", kcal: 120, protein: 24, carbs: 3, fat: 2 },
  { id: "olive-oil", name: "올리브오일 1스푼", role: "fat", kcal: 120, protein: 0, carbs: 0, fat: 14 },
  { id: "almonds", name: "아몬드 30g", role: "fat", kcal: 174, protein: 6, carbs: 6, fat: 15 },
  { id: "avocado", name: "아보카도 1/2개", role: "fat", kcal: 160, protein: 2, carbs: 9, fat: 15 }
];

const MEAL_SLOTS = [
  { id: "breakfast-carb", meal: "아침", role: "carb", target: "carbs", share: 0.28 },
  { id: "breakfast-protein", meal: "아침", role: "protein", target: "protein", share: 0.22 },
  { id: "lunch-carb", meal: "점심", role: "carb", target: "carbs", share: 0.32 },
  { id: "lunch-protein", meal: "점심", role: "protein", target: "protein", share: 0.28 },
  { id: "lunch-fat", meal: "점심", role: "fat", target: "fat", share: 0.3 },
  { id: "snack-carb", meal: "간식", role: "carb", target: "carbs", share: 0.15 },
  { id: "snack-protein", meal: "간식", role: "protein", target: "protein", share: 0.18 },
  { id: "dinner-carb", meal: "저녁", role: "carb", target: "carbs", share: 0.25 },
  { id: "dinner-protein", meal: "저녁", role: "protein", target: "protein", share: 0.32 },
  { id: "dinner-fat", meal: "저녁", role: "fat", target: "fat", share: 0.4 }
];

const DEFAULT_STATE = {
  profile: DEFAULT_PROFILE,
  activeTab: "workout",
  activeDay: "upper-a",
  cycle: 1,
  week: 1,
  exerciseWeights: Object.fromEntries(
    ROUTINE.flatMap((day) => day.exercises).map((exercise) => [exercise.id, exercise.baseWeight])
  ),
  streaks: {},
  pendingIncrements: {},
  exerciseOverrides: {},
  selectedExerciseVariant: {},
  exerciseVariantWeights: {},
  openExercisePicker: "",
  customFoods: [],
  mealSwaps: {},
  foodSearchQuery: "",
  foodSearchResults: [],
  foodSearchStatus: "",
  logs: [],
  draft: {}
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return structuredClone(DEFAULT_STATE);
    return mergeState(structuredClone(DEFAULT_STATE), saved);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function mergeState(base, saved) {
  const merged = {
    ...base,
    ...saved,
    profile: { ...base.profile, ...(saved.profile || {}) },
    exerciseWeights: { ...base.exerciseWeights, ...(saved.exerciseWeights || {}) },
    streaks: { ...(saved.streaks || {}) },
    pendingIncrements: { ...(saved.pendingIncrements || {}) },
    exerciseOverrides: { ...(saved.exerciseOverrides || {}) },
    selectedExerciseVariant: { ...(saved.selectedExerciseVariant || {}) },
    exerciseVariantWeights: { ...(saved.exerciseVariantWeights || {}) },
    openExercisePicker: saved.openExercisePicker || "",
    customFoods: Array.isArray(saved.customFoods) ? saved.customFoods : [],
    mealSwaps: { ...(saved.mealSwaps || {}) },
    foodSearchQuery: saved.foodSearchQuery || "",
    foodSearchResults: Array.isArray(saved.foodSearchResults) ? saved.foodSearchResults : [],
    foodSearchStatus: saved.foodSearchStatus || "",
    logs: Array.isArray(saved.logs) ? saved.logs : [],
    draft: saved.draft && typeof saved.draft === "object" ? saved.draft : {}
  };
  return normalizeStoredLoads(merged);
}

function normalizeStoredLoads(nextState) {
  const exerciseWeights = { ...nextState.exerciseWeights };
  const pendingIncrements = { ...nextState.pendingIncrements };
  for (const exercise of ROUTINE.flatMap((day) => day.exercises)) {
    if (exerciseWeights[exercise.id] != null) {
      exerciseWeights[exercise.id] = roundTo(exerciseWeights[exercise.id], exercise.loadStep);
    }
    if (pendingIncrements[exercise.id] != null) {
      pendingIncrements[exercise.id] = normalizePendingIncrement(exercise.id, pendingIncrements[exercise.id]);
    }
    const variantKey = getVariantKey(exercise.id);
    if (pendingIncrements[variantKey] != null) {
      pendingIncrements[variantKey] = normalizePendingIncrement(variantKey, pendingIncrements[variantKey]);
    }
  }
  for (const key of Object.keys(pendingIncrements)) {
    pendingIncrements[key] = normalizePendingIncrement(key, pendingIncrements[key]);
  }
  return {
    ...nextState,
    exerciseWeights,
    pendingIncrements
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function kg(value) {
  const number = Number(value) || 0;
  return `${roundTo(number, 0.5).toFixed(number % 1 === 0 ? 0 : 1)}kg`;
}

function roundTo(value, step = 0.5) {
  return Math.round((Number(value) || 0) / step) * step;
}

function getLoadMetaForKey(key, fallbackExercise = null) {
  const variantMeta = VARIANT_META[key];
  if (variantMeta) return variantMeta;
  if (fallbackExercise) {
    return {
      loadMode: fallbackExercise.loadMode || "load",
      loadStep: fallbackExercise.loadStep || 2.5
    };
  }
  const baseExercise = ROUTINE.flatMap((day) => day.exercises).find((exercise) => exercise.id === key);
  return {
    loadMode: baseExercise?.loadMode || "load",
    loadStep: baseExercise?.loadStep || 2.5
  };
}

function normalizePendingIncrement(key, value, fallbackExercise = null) {
  const meta = getLoadMetaForKey(key, fallbackExercise);
  const step = meta.loadStep || fallbackExercise?.loadStep || 2.5;
  const amount = Math.abs(roundTo(Number(value) || 0, step));
  return meta.loadMode === "assistance" ? -amount : amount;
}

function epleyOneRm(weight, reps) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 0;
  if (w <= 0 || r <= 0) return 0;
  return w * (1 + r / 30);
}

function targetWeightFromOneRm(oneRm, rpe, step = 2.5) {
  return roundTo((Number(oneRm) || 0) * (RPE_PERCENT[rpe] || RPE_PERCENT[8]), step);
}

function formatLoad(value, exercise = null) {
  if (exercise?.loadMode === "assistance") return `보조 ${kg(value)}`;
  return kg(value);
}

function formatDelta(value, exercise = null) {
  const number = Number(value) || 0;
  if (exercise?.loadMode === "assistance") {
    return number < 0
      ? `난이도 +${kg(Math.abs(number))} (보조 ${kg(Math.abs(number))} 감소)`
      : `난이도 -${kg(number)} (보조 ${kg(number)} 증가)`;
  }
  return number >= 0 ? `+${kg(number)}` : `-${kg(Math.abs(number))}`;
}

function getPhase(week = state.week) {
  if (week <= 2) {
    return {
      name: "근비대",
      detail: "RPE 8",
      rpe: 8,
      volumeScale: 1,
      loadScale: 1,
      setTarget: 3
    };
  }
  if (week <= 4) {
    return {
      name: "스트렝스",
      detail: "RPE 9",
      rpe: 9,
      volumeScale: 1,
      loadScale: 1,
      setTarget: 4
    };
  }
  return {
    name: "디로드",
    detail: "볼륨/중량 -40%",
    rpe: 7,
    volumeScale: 0.6,
    loadScale: 0.6,
    setTarget: 1
  };
}

function getExerciseTrainingClass(exercise = null) {
  if (!exercise) return "main";
  return exercise.trainingClass || EXERCISE_TRAINING_CLASS[exercise.id] || "accessory";
}

function getTrainingClassLabel(exercise = null) {
  return TRAINING_CLASS_LABEL[getExerciseTrainingClass(exercise)] || TRAINING_CLASS_LABEL.accessory;
}

function getTargetSets(week = state.week, exercise = null) {
  const trainingClass = getExerciseTrainingClass(exercise);
  if (week <= 2) return trainingClass === "isolation" ? 4 : 3;
  if (week <= 4) return trainingClass === "isolation" ? 5 : 4;
  if (trainingClass === "main") return 1;
  return trainingClass === "isolation" ? 2 : 2;
}

function isOverloadStackWeek(week = state.week) {
  return week === 3 || week === 4;
}

function getTargetRpe(week = state.week) {
  return getPhase(week).rpe;
}

function currentDay() {
  return getRoutine().find((day) => day.id === state.activeDay) || getRoutine()[0];
}

function getExercise(exerciseId) {
  return getRoutine().flatMap((day) => day.exercises).find((exercise) => exercise.id === exerciseId);
}

function getExerciseByVariantKey(variantKey) {
  return getRoutine().flatMap((day) => day.exercises).find((exercise) => exercise.variantKey === variantKey);
}

function getBaseExercise(exerciseId) {
  return ROUTINE.flatMap((day) => day.exercises).find((exercise) => exercise.id === exerciseId);
}

function getVariantKey(exerciseId, index = "base") {
  const rawKey = `${exerciseId}:${index}`;
  if (VARIANT_KEY_OVERRIDES[rawKey]) return VARIANT_KEY_OVERRIDES[rawKey];
  const groupKey = EXERCISE_GROUP_KEY[exerciseId] || exerciseId;
  return `${groupKey}:${String(index).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

function getVariantMeta(exerciseId, index = "base") {
  const variantKey = getVariantKey(exerciseId, index);
  return {
    variantKey,
    groupKey: variantKey.split(":")[0],
    loadMode: "load",
    ...(VARIANT_META[variantKey] || {})
  };
}

function getExerciseVariants(exerciseId) {
  const base = getBaseExercise(exerciseId);
  if (!base) return [];
  const alternatives = [
    ...(EXERCISE_ALTERNATIVES[exerciseId] || []),
    ...(exerciseId === "dip" ? [{ name: "어시스트 딥스", muscle: "가슴", loadStep: 5 }] : [])
  ];
  const baseMeta = getVariantMeta(exerciseId);
  return [
    { ...base, ...baseMeta, loadStep: baseMeta.loadStep || base.loadStep, label: "기본" },
    ...alternatives.map((alternative, index) => {
      const variantIndex = exerciseId === "dip" && index === alternatives.length - 1 ? "assist" : index;
      const meta = getVariantMeta(exerciseId, variantIndex);
      return {
      ...base,
      ...alternative,
      ...meta,
      loadStep: meta.loadStep || alternative.loadStep || base.loadStep,
      label: "대체"
    };
    })
  ];
}

function getSelectedExerciseVariant(exerciseId) {
  const saved = state.selectedExerciseVariant[exerciseId];
  if (saved && getExerciseVariants(exerciseId).some((variant) => variant.variantKey === saved)) return saved;
  return getVariantKey(exerciseId);
}

function getVariantWeight(exerciseId, variantKey, fallbackWeight) {
  const saved = state.exerciseVariantWeights[variantKey];
  const variant = getExerciseVariants(exerciseId).find((item) => item.variantKey === variantKey);
  if (saved != null) {
    return roundTo(saved, variant?.loadStep || 2.5);
  }
  if (variant && variantKey !== getVariantKey(exerciseId)) {
    return estimateInitialVariantWeight(fallbackWeight, variant);
  }
  return fallbackWeight;
}

function getPendingIncrement(exercise) {
  if (!exercise) return 0;
  return Number(state.pendingIncrements[exercise.variantKey] ?? state.pendingIncrements[exercise.id] ?? 0);
}

function estimateInitialVariantWeight(baseWeight, variant) {
  const name = variant.name || "";
  const step = variant.loadStep || 2.5;
  if (variant.loadMode === "assistance") {
    return roundTo(Math.max(step, Number(state.profile.weight || 75) * 0.45), step);
  }
  if (name.includes("푸쉬업") || name.includes("풀업") || name.includes("딥스") || name.includes("노르딕")) {
    return 0;
  }
  if (name.includes("덤벨") || name.includes("원암")) {
    return roundTo(Math.max(step, baseWeight * 0.45), step);
  }
  if (name.includes("케이블") || name.includes("레터럴") || name.includes("컬") || name.includes("플라이")) {
    return roundTo(Math.max(step, baseWeight * 0.6), step);
  }
  return roundTo(Math.max(step, baseWeight * 0.85), step);
}

function getRoutine() {
  return ROUTINE.map((day) => ({
    ...day,
    exercises: day.exercises.map((exercise) => {
      const variantKey = getSelectedExerciseVariant(exercise.id);
      const variant = getExerciseVariants(exercise.id).find((item) => item.variantKey === variantKey);
      return {
        ...exercise,
        ...(variant || {}),
        ...(state.exerciseOverrides?.[exercise.id] || {}),
        variantKey,
        groupKey: variant?.groupKey || EXERCISE_GROUP_KEY[exercise.id] || exercise.id,
        loadMode: variant?.loadMode || "load"
      };
    })
  }));
}

function getDraft(exercise) {
  const phase = getPhase();
  const targetSets = getTargetSets(state.week, exercise);
  const defaultWeight = Number(state.exerciseWeights[exercise.id] ?? exercise.baseWeight) || 0;
  const baseWeight = getVariantWeight(exercise.id, exercise.variantKey || getSelectedExerciseVariant(exercise.id), defaultWeight);
  const targetWeight = roundTo(baseWeight * phase.loadScale, exercise.loadStep);
  const saved = state.draft[exercise.id] || {};
  return {
    weight: saved.weight ?? targetWeight,
    reps: Array.from({ length: targetSets }, (_, index) => saved.reps?.[index] ?? exercise.minReps)
  };
}

function setDraft(exerciseId, patch) {
  const current = state.draft[exerciseId] || {};
  state = {
    ...state,
    draft: {
      ...state.draft,
      [exerciseId]: {
        ...current,
        ...patch
      }
    }
  };
  saveState();
  render();
}

function calcExerciseEntry(exercise) {
  const draft = getDraft(exercise);
  const reps = draft.reps.map((rep) => Math.max(0, Number(rep) || 0));
  const avgReps = reps.reduce((sum, rep) => sum + rep, 0) / reps.length;
  const midpoint = (exercise.minReps + exercise.maxReps) / 2;
  const targetReps = exercise.maxReps;
  const targetSets = getTargetSets(state.week, exercise);
  const targetMet = reps.length === targetSets && reps.every((rep) => rep >= targetReps);
  const bestReps = Math.max(...reps);
  const oneRm = exercise.loadMode === "assistance" ? 0 : epleyOneRm(draft.weight, bestReps);
  const recommendedNext =
    exercise.loadMode === "assistance"
      ? Math.max(0, roundTo(draft.weight - exercise.loadStep, exercise.loadStep))
      : targetWeightFromOneRm(oneRm, getTargetRpe(), exercise.loadStep);
  return {
    exerciseId: exercise.id,
    name: exercise.name,
    muscle: exercise.muscle,
    targetRange: [exercise.minReps, exercise.maxReps],
    targetReps,
    targetSets,
    trainingClass: getExerciseTrainingClass(exercise),
    targetWeight: Number(draft.weight) || 0,
    rpeTarget: getTargetRpe(),
    reps,
    avgReps,
    midpoint,
    passedMidpoint: targetMet,
    targetMet,
    estimatedOneRm: oneRm,
    recommendedNext,
    loadMode: exercise.loadMode,
    variantKey: exercise.variantKey,
    loadStep: exercise.loadStep
  };
}

function completeSession() {
  const day = currentDay();
  const entries = day.exercises.map(calcExerciseEntry);
  const nextStreaks = { ...state.streaks };
  const nextWeights = { ...state.exerciseWeights };
  const nextVariantWeights = { ...state.exerciseVariantWeights };
  const nextPending = { ...state.pendingIncrements };
  const applied = [];

  for (const entry of entries) {
    const exercise = getExercise(entry.exerciseId);
    const variantKey = exercise?.variantKey || getSelectedExerciseVariant(entry.exerciseId);
    nextVariantWeights[variantKey] = roundTo(entry.targetWeight, exercise?.loadStep || 2.5);
  }

  for (const entry of entries) {
    if (!isOverloadStackWeek(state.week)) {
      nextStreaks[entry.exerciseId] = 0;
      continue;
    }
    const previous = Number(nextStreaks[entry.exerciseId] || 0);
    const streak = entry.targetMet ? previous + 1 : previous;
    if (streak >= 2) {
      const exercise = getExercise(entry.exerciseId);
      const step = exercise?.loadStep || 2.5;
      const direction = exercise?.loadMode === "assistance" ? -step : step;
      const pendingKey = exercise?.variantKey || entry.variantKey || entry.exerciseId;
      nextPending[pendingKey] = normalizePendingIncrement(
        pendingKey,
        (Number(nextPending[pendingKey]) || 0) + direction,
        exercise
      );
      nextStreaks[entry.exerciseId] = 0;
      applied.push(entry.exerciseId);
    } else {
      nextStreaks[entry.exerciseId] = streak;
    }
  }

  const log = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    cycle: state.cycle,
    week: state.week,
    phase: getPhase(),
    dayId: day.id,
    dayLabel: day.label,
    entries: entries.map((entry) => ({
      ...entry,
      overloadApplied: applied.includes(entry.exerciseId)
    }))
  };

  const nextPosition = advanceAfterSession(
    day.id,
    state.week,
    state.cycle,
    nextWeights,
    nextPending,
    nextVariantWeights
  );

  state = {
    ...state,
    cycle: nextPosition.cycle,
    week: nextPosition.week,
    activeDay: nextPosition.activeDay,
    exerciseWeights: nextPosition.exerciseWeights,
    exerciseVariantWeights: nextPosition.exerciseVariantWeights || nextVariantWeights,
    streaks: nextStreaks,
    pendingIncrements: nextPosition.pendingIncrements,
    logs: [log, ...state.logs].slice(0, 120),
    draft: {}
  };
  saveState();
  render();
}

function advanceAfterSession(dayId, week, cycle, exerciseWeights, pendingIncrements, exerciseVariantWeights = null) {
  const dayIndex = ROUTINE.findIndex((item) => item.id === dayId);
  const nextDayIndex = (dayIndex + 1) % ROUTINE.length;
  const completedTrainingWeek = nextDayIndex === 0;
  if (!completedTrainingWeek) {
    return {
      week,
      cycle,
      activeDay: ROUTINE[nextDayIndex].id,
      exerciseWeights,
      exerciseVariantWeights,
      pendingIncrements
    };
  }

  if (week < 5) {
    return {
      week: week + 1,
      cycle,
      activeDay: ROUTINE[0].id,
      exerciseWeights,
      exerciseVariantWeights,
      pendingIncrements
    };
  }

  const appliedWeights = { ...exerciseWeights };
  const appliedVariantWeights = exerciseVariantWeights ? { ...exerciseVariantWeights } : null;
  for (const [pendingKey, rawIncrement] of Object.entries(pendingIncrements)) {
    const exercise = getExercise(pendingKey) || getExerciseByVariantKey(pendingKey);
    const increment = normalizePendingIncrement(pendingKey, rawIncrement, exercise);
    const exerciseId = exercise?.id || pendingKey;
    const previousWeight = Number(appliedWeights[exerciseId]) || 0;
    const nextWeight = Math.max(0, previousWeight + increment);
    appliedWeights[exerciseId] = roundTo(nextWeight, exercise?.loadStep || 2.5);
    if (appliedVariantWeights) {
      const variantKey = pendingKey.includes(":") ? pendingKey : getSelectedExerciseVariant(exerciseId);
      appliedVariantWeights[variantKey] = roundTo(
        Math.max(0, (Number(appliedVariantWeights[variantKey] ?? previousWeight) || 0) + increment),
        exercise?.loadStep || 2.5
      );
    }
  }
  return {
    week: 1,
    cycle: cycle + 1,
    activeDay: ROUTINE[0].id,
    exerciseWeights: appliedWeights,
    exerciseVariantWeights: appliedVariantWeights,
    pendingIncrements: {}
  };
}

function calcNutrition(profile) {
  const weight = Number(profile.weight) || 0;
  const height = Number(profile.height) || 0;
  const age = Number(profile.age) || 0;
  const activity = Number(profile.activity) || 1.2;
  const sexAdjust = profile.sex === "female" ? -161 : 5;
  const bmr = 10 * weight + 6.25 * height - 5 * age + sexAdjust;
  const tdee = bmr * activity;
  const calories = tdee + 300;
  const proteinG = weight * 2;
  const fatG = (calories * 0.25) / 9;
  const carbG = Math.max(0, (calories - proteinG * 4 - fatG * 9) / 4);
  return {
    bmr,
    tdee,
    calories,
    proteinG,
    fatG,
    carbG
  };
}

function updateProfile(key, value) {
  state = {
    ...state,
    profile: {
      ...state.profile,
      [key]: ["sex"].includes(key) ? value : Number(value)
    }
  };
  saveState();
  render();
}

function updateExercise(exerciseId, key, value) {
  const current = getExercise(exerciseId);
  const nextValue = ["minReps", "maxReps", "loadStep"].includes(key) ? Number(value) : value;
  state = {
    ...state,
    exerciseOverrides: {
      ...state.exerciseOverrides,
      [exerciseId]: {
        ...(state.exerciseOverrides[exerciseId] || {}),
        [key]: nextValue
      }
    }
  };
  if (key === "loadStep") {
    const variantKey = current.variantKey || getSelectedExerciseVariant(exerciseId);
    state.exerciseWeights[exerciseId] = roundTo(state.exerciseWeights[exerciseId] ?? current.baseWeight, nextValue);
    state.exerciseVariantWeights[variantKey] = roundTo(
      state.exerciseVariantWeights[variantKey] ?? state.exerciseWeights[exerciseId],
      nextValue
    );
    if (state.pendingIncrements[variantKey] != null) {
      state.pendingIncrements[variantKey] = normalizePendingIncrement(
        variantKey,
        state.pendingIncrements[variantKey],
        current
      );
    }
  }
  saveState();
  render();
}

function toggleExercisePicker(exerciseId) {
  state = {
    ...state,
    openExercisePicker: state.openExercisePicker === exerciseId ? "" : exerciseId
  };
  saveState();
  render();
}

function selectExerciseVariant(exerciseId, variantKey) {
  const currentExercise = getExercise(exerciseId);
  const currentVariantKey = currentExercise?.variantKey || getSelectedExerciseVariant(exerciseId);
  const currentDraft = currentExercise ? getDraft(currentExercise) : null;
  const variants = getExerciseVariants(exerciseId);
  const selected = variants.find((variant) => variant.variantKey === variantKey);
  if (!selected) return;
  const nextVariantWeights = { ...state.exerciseVariantWeights };
  if (currentDraft) {
    nextVariantWeights[currentVariantKey] = roundTo(currentDraft.weight, currentExercise.loadStep);
  }
  const nextWeight = getVariantWeight(exerciseId, variantKey, selected.baseWeight);
  state = {
    ...state,
    selectedExerciseVariant: {
      ...state.selectedExerciseVariant,
      [exerciseId]: variantKey
    },
    exerciseOverrides: {
      ...state.exerciseOverrides,
      [exerciseId]: {
        ...(state.exerciseOverrides[exerciseId] || {}),
        name: selected.name,
        muscle: selected.muscle,
        loadStep: selected.loadStep
      }
    },
    exerciseVariantWeights: nextVariantWeights,
    exerciseWeights: {
      ...state.exerciseWeights,
      [exerciseId]: roundTo(nextWeight, selected.loadStep)
    },
    exerciseVariantWeights: {
      ...nextVariantWeights,
      [variantKey]: roundTo(nextWeight, selected.loadStep)
    },
    draft: {
      ...state.draft,
      [exerciseId]: {
        ...(state.draft[exerciseId] || {}),
        weight: roundTo(nextWeight, selected.loadStep)
      }
    },
    openExercisePicker: ""
  };
  saveState();
  render();
}

function allFoods() {
  return [...FOOD_LIBRARY, ...state.customFoods];
}

function getFood(foodId, role) {
  return allFoods().find((food) => food.id === foodId) || allFoods().find((food) => food.role === role);
}

function buildMealPlan(nutrition) {
  const targets = {
    protein: nutrition.proteinG,
    carbs: nutrition.carbG,
    fat: nutrition.fatG
  };
  return MEAL_SLOTS.map((slot) => {
    const candidates = allFoods().filter((food) => food.role === slot.role);
    const fallback = candidates[0];
    const food = getFood(state.mealSwaps[slot.id], slot.role) || fallback;
    const macroPerServing = Math.max(food?.[slot.target] || 1, 1);
    const serving = Math.max(0.5, Math.min(4, (targets[slot.target] * slot.share) / macroPerServing));
    return {
      ...slot,
      food,
      serving,
      kcal: (food?.kcal || 0) * serving,
      protein: (food?.protein || 0) * serving,
      carbs: (food?.carbs || 0) * serving,
      fat: (food?.fat || 0) * serving
    };
  });
}

function mealTotals(plan) {
  return plan.reduce(
    (total, item) => ({
      kcal: total.kcal + item.kcal,
      protein: total.protein + item.protein,
      carbs: total.carbs + item.carbs,
      fat: total.fat + item.fat
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function swapMealFood(slotId, role) {
  const foods = allFoods().filter((food) => food.role === role);
  if (!foods.length) return;
  const currentId = state.mealSwaps[slotId];
  const currentIndex = Math.max(0, foods.findIndex((food) => food.id === currentId));
  const nextFood = foods[(currentIndex + 1) % foods.length];
  state = {
    ...state,
    mealSwaps: {
      ...state.mealSwaps,
      [slotId]: nextFood.id
    }
  };
  saveState();
  render();
}

function setFoodQuery(value) {
  state = {
    ...state,
    foodSearchQuery: value
  };
  saveState();
}

async function searchFoodFacts() {
  const query = state.foodSearchQuery.trim();
  if (!query) return;
  state = { ...state, foodSearchStatus: "검색 중...", foodSearchResults: [] };
  saveState();
  render();
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8&fields=product_name,brands,nutriments`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    const results = (json.products || [])
      .map(foodFromOpenFoodFacts)
      .filter(Boolean)
      .slice(0, 8);
    state = {
      ...state,
      foodSearchResults: results,
      foodSearchStatus: results.length ? "검색 완료" : "영양값이 있는 결과가 없습니다."
    };
  } catch {
    state = {
      ...state,
      foodSearchResults: [],
      foodSearchStatus: "외부 검색 실패. 내장 식품표와 직접 추가를 사용하세요."
    };
  }
  saveState();
  render();
}

function foodFromOpenFoodFacts(product) {
  const nutriments = product.nutriments || {};
  const kcal = Number(nutriments["energy-kcal_100g"] || nutriments["energy-kcal"] || 0);
  const protein = Number(nutriments.proteins_100g || nutriments.proteins || 0);
  const carbs = Number(nutriments.carbohydrates_100g || nutriments.carbohydrates || 0);
  const fat = Number(nutriments.fat_100g || nutriments.fat || 0);
  const name = [product.product_name, product.brands].filter(Boolean).join(" · ");
  if (!name || kcal <= 0) return null;
  const role = protein >= carbs && protein >= fat ? "protein" : fat >= carbs ? "fat" : "carb";
  return {
    id: `off-${crypto.randomUUID()}`,
    name: `${name} 100g`,
    role,
    kcal,
    protein,
    carbs,
    fat
  };
}

function addFood(food) {
  state = {
    ...state,
    customFoods: [...state.customFoods.filter((item) => item.name !== food.name), food],
    foodSearchStatus: "식품표에 추가됨"
  };
  saveState();
  render();
}

function setTab(tab) {
  state = { ...state, activeTab: tab };
  saveState();
  render();
}

function setDay(dayId) {
  state = { ...state, activeDay: dayId };
  saveState();
  render();
}

function setWeek(week) {
  state = { ...state, week: Number(week) };
  saveState();
  render();
}

function resetData() {
  if (!confirm("모든 운동/신체 데이터를 초기화할까요?")) return;
  state = structuredClone(DEFAULT_STATE);
  saveState();
  render();
}

function h(strings, ...values) {
  return strings.reduce((html, string, index) => html + string + (values[index] ?? ""), "");
}

function render() {
  const phase = getPhase();
  document.getElementById("app").innerHTML = h`
    <header class="topbar">
      <div>
        <h1 class="title">RPE Bulk</h1>
        <div class="subtitle">Cycle ${state.cycle} · Week ${state.week} · ${currentDay().label}</div>
      </div>
      <div class="phase-pill">
        <strong>${phase.name}</strong>
        <span>${phase.detail}</span>
      </div>
    </header>
    <main class="grid">
      ${state.activeTab === "workout" ? workoutView() : ""}
      ${state.activeTab === "planner" ? plannerView() : ""}
      ${state.activeTab === "nutrition" ? nutritionView() : ""}
      ${state.activeTab === "history" ? historyView() : ""}
    </main>
    <nav class="tabs">
      ${tabButton("workout", "운동")}
      ${tabButton("planner", "루틴")}
      ${tabButton("nutrition", "영양")}
      ${tabButton("history", "기록")}
    </nav>
  `;
  bindEvents();
}

function tabButton(id, label) {
  return `<button class="tab ${state.activeTab === id ? "active" : ""}" data-tab="${id}">${label}</button>`;
}

function workoutView() {
  const day = currentDay();
  const phase = getPhase();
  const entries = day.exercises.map(calcExerciseEntry);
  const avgOneRm = entries.reduce((sum, item) => sum + item.estimatedOneRm, 0) / Math.max(entries.length, 1);
  const readyCount = entries.filter((entry) => entry.targetMet).length;
  const sessionNumber = ROUTINE.findIndex((item) => item.id === day.id) + 1;
  return h`
    <section class="panel">
      <div class="section-title">
        <strong>${day.label}</strong>
        <span class="muted">${day.focus}</span>
      </div>
      <div class="day-switch">
        ${ROUTINE.map(
          (item) =>
            `<button class="chip ${item.id === day.id ? "active" : ""}" data-day="${item.id}">${item.label}</button>`
        ).join("")}
      </div>
    </section>
    <section class="metric-row">
      <div class="metric"><span>목표 RPE</span><strong>${phase.rpe}</strong></div>
      <div class="metric"><span>평균 1RM</span><strong>${kg(avgOneRm)}</strong></div>
      <div class="metric"><span>목표 달성</span><strong>${readyCount}/${entries.length}</strong></div>
    </section>
    ${day.exercises.map(exerciseCard).join("")}
    <button class="btn primary" data-complete>세션 저장 · 다음 운동 이동</button>
  `;
}

function exerciseCard(exercise) {
  const draft = getDraft(exercise);
  const entry = calcExerciseEntry(exercise);
  const stackEligible = isOverloadStackWeek();
  const streak = stackEligible ? Number(state.streaks[exercise.id] || 0) : 0;
  const pending = getPendingIncrement(exercise);
  const targetSets = getTargetSets(state.week, exercise);
  const weightLabel = exercise.loadMode === "assistance" ? "보조 중량 kg" : "중량 kg";
  const firstMetricLabel = exercise.loadMode === "assistance" ? "현재 보조" : "Epley 1RM";
  const firstMetricValue = exercise.loadMode === "assistance" ? formatLoad(draft.weight, exercise) : kg(entry.estimatedOneRm);
  const secondMetricLabel = exercise.loadMode === "assistance" ? "다음 보조 목표" : "RPE 가이드 중량";
  return h`
    <article class="exercise">
      <div class="exercise-head">
        <div>
          <button class="exercise-name" data-open-variant="${exercise.id}">${exercise.name}</button>
          <div class="subtitle">${getTrainingClassLabel(exercise)} · ${exercise.muscle} · ${exercise.minReps}-${exercise.maxReps}회 · ${targetSets}세트 · ${exercise.loadStep}kg 단위${exercise.loadMode === "assistance" ? " · 보조 중량 입력" : ""}</div>
        </div>
        <span class="tag">${pending !== 0 ? `${formatDelta(pending, exercise)} 대기` : `${streak}/2`}</span>
      </div>
      ${state.openExercisePicker === exercise.id ? exerciseVariantPicker(exercise) : ""}
      <div class="form-grid" style="margin-top:12px">
        ${stepper(`weight:${exercise.id}`, weightLabel, draft.weight, exercise.loadStep, 0)}
        <div class="metric"><span>오늘 목표</span><strong>${targetSets}×${exercise.maxReps} · RPE ${getTargetRpe()}</strong></div>
      </div>
      <div class="set-grid">
        ${Array.from({ length: targetSets }, (_, index) => stepper(`rep:${exercise.id}:${index}`, `${index + 1}세트 reps`, draft.reps[index], 1, 0)).join("")}
      </div>
      <div class="calc-line">
        <div class="metric"><span>${firstMetricLabel}</span><strong>${firstMetricValue}</strong></div>
        <div class="metric"><span>${secondMetricLabel}</span><strong>${formatLoad(entry.recommendedNext, exercise)}</strong></div>
      </div>
      <p class="note">목표 ${targetSets}세트 × ${exercise.maxReps}회 · ${stackEligible ? (entry.targetMet ? "3-4주차 과부하 스택 누적" : "미달성: 기존 카운트 유지") : "스택 미적용 주차"}${pending !== 0 ? ` · 다음 사이클 ${formatDelta(pending, exercise)} 반영` : ""}</p>
    </article>
  `;
}

function exerciseVariantPicker(exercise) {
  const variants = getExerciseVariants(exercise.id);
  const selectedKey = exercise.variantKey || getSelectedExerciseVariant(exercise.id);
  return h`
    <div class="variant-picker">
      ${variants.map((variant) => {
        const savedWeight = getVariantWeight(exercise.id, variant.variantKey, variant.baseWeight);
        return `<button class="variant-option ${variant.variantKey === selectedKey ? "active" : ""}" data-select-variant="${exercise.id}" data-variant-key="${variant.variantKey}">
          <strong>${variant.name}</strong>
          <span>${variant.groupKey} · ${variant.loadStep}kg 단위 · 최근 ${formatLoad(savedWeight, variant)}</span>
        </button>`;
      }).join("")}
    </div>
  `;
}

function stepper(id, label, value, step, min = -Infinity, max = Infinity) {
  return h`
    <div class="field">
      <label>${label}</label>
      <div class="stepper">
        <button data-step="${id}" data-delta="${-step}" data-min="${min}" data-max="${max}">−</button>
        <input class="input" inputmode="decimal" value="${value}" data-input="${id}" data-min="${min}" data-max="${max}" />
        <button data-step="${id}" data-delta="${step}" data-min="${min}" data-max="${max}">+</button>
      </div>
    </div>
  `;
}

function plannerView() {
  const routine = getRoutine();
  return h`
    <section class="panel">
      <h2 class="section-title">5주 하이브리드 주기화</h2>
      <div class="form-grid">
        <div class="field">
          <label>현재 주차</label>
          <select class="select" data-week>
            ${[1, 2, 3, 4, 5].map((week) => `<option value="${week}" ${state.week === week ? "selected" : ""}>${week}주차</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>현재 사이클</label>
          <input class="input" value="${state.cycle}" disabled />
        </div>
      </div>
      <p class="note">1-2주차 근비대는 3세트, 3-4주차 스트렝스는 4세트, 5주차 디로드는 1세트로 자동 변경됩니다. 4개 분할을 모두 저장하면 다음 주차로 진행되고, 5주차 종료 시 보류 증량이 새 사이클에 반영됩니다.</p>
    </section>
    <section class="grid">
      ${routine.map(
        (day) => h`
          <article class="history-item">
            <h3>${day.label} · ${day.focus}</h3>
            <p>${day.exercises.map((exercise) => {
              const pending = getPendingIncrement(exercise);
              const currentLoad = getVariantWeight(
                exercise.id,
                exercise.variantKey || getSelectedExerciseVariant(exercise.id),
                state.exerciseWeights[exercise.id] ?? exercise.baseWeight
              );
              return `${exercise.name} ${formatLoad(currentLoad, exercise)}${pending !== 0 ? ` (${formatDelta(pending, exercise)} 대기)` : ""}`;
            }).join(" / ")}</p>
          </article>
        `
      ).join("")}
    </section>
    <section class="panel">
      <h2 class="section-title">운동 종목 편집</h2>
      <p class="note">운동명, 부위, 반복 범위, 중량 단위를 바꾸면 다음 입력부터 저장됩니다. 바벨은 보통 5kg 단위, 덤벨/머신은 2.5kg 단위를 쓰면 됩니다.</p>
    </section>
    <section class="grid">
      ${routine.map((day) => h`
        <article class="exercise">
          <h3>${day.label}</h3>
          <div class="grid" style="margin-top:10px">
            ${day.exercises.map(exerciseEditor).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function exerciseEditor(exercise) {
  return h`
    <div class="history-item">
      <div class="form-grid">
        <div class="field">
          <label>운동명</label>
          <input class="input" value="${exercise.name}" data-exercise="${exercise.id}" data-ex-key="name" />
        </div>
        <div class="field">
          <label>부위</label>
          <input class="input" value="${exercise.muscle}" data-exercise="${exercise.id}" data-ex-key="muscle" />
        </div>
        <div class="field">
          <label>최소 반복</label>
          <input class="input" inputmode="numeric" value="${exercise.minReps}" data-exercise="${exercise.id}" data-ex-key="minReps" />
        </div>
        <div class="field">
          <label>최대 반복</label>
          <input class="input" inputmode="numeric" value="${exercise.maxReps}" data-exercise="${exercise.id}" data-ex-key="maxReps" />
        </div>
        <div class="field full">
          <label>중량 단위 kg</label>
          <select class="select" data-exercise="${exercise.id}" data-ex-key="loadStep">
            <option value="2.5" ${Number(exercise.loadStep) === 2.5 ? "selected" : ""}>2.5kg</option>
            <option value="5" ${Number(exercise.loadStep) === 5 ? "selected" : ""}>5kg</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

function nutritionView() {
  const n = calcNutrition(state.profile);
  const totalMacroCalories = n.proteinG * 4 + n.carbG * 4 + n.fatG * 9;
  const plan = buildMealPlan(n);
  const totals = mealTotals(plan);
  return h`
    <section class="panel">
      <h2 class="section-title">칼로리 계산기</h2>
      <div class="form-grid">
        <div class="field">
          <label>성별</label>
          <select class="select" data-profile="sex">
            <option value="male" ${state.profile.sex === "male" ? "selected" : ""}>남성</option>
            <option value="female" ${state.profile.sex === "female" ? "selected" : ""}>여성</option>
          </select>
        </div>
        ${profileInput("age", "나이", state.profile.age)}
        ${profileInput("height", "키 cm", state.profile.height)}
        ${profileInput("weight", "체중 kg", state.profile.weight)}
        <div class="field full">
          <label>활동량</label>
          <select class="select" data-profile="activity">
            ${[
              [1.2, "낮음"],
              [1.375, "가벼운 활동"],
              [1.55, "주 3-5회"],
              [1.725, "고강도"],
              [1.9, "매우 높음"]
            ].map(([value, label]) => `<option value="${value}" ${Number(state.profile.activity) === value ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </div>
      </div>
    </section>
    <section class="metric-row">
      <div class="metric"><span>BMR</span><strong>${Math.round(n.bmr)}</strong></div>
      <div class="metric"><span>TDEE</span><strong>${Math.round(n.tdee)}</strong></div>
      <div class="metric"><span>벌크 목표</span><strong>${Math.round(n.calories)}</strong></div>
    </section>
    <section class="panel">
      <h2 class="section-title">매크로</h2>
      <div class="macro-bars">
        ${macroBar("단백질", n.proteinG, n.proteinG * 4, totalMacroCalories, "")}
        ${macroBar("탄수화물", n.carbG, n.carbG * 4, totalMacroCalories, "carb")}
        ${macroBar("지방", n.fatG, n.fatG * 9, totalMacroCalories, "fat")}
      </div>
      <p class="note">단백질은 체중 1kg당 2g 고정, 지방은 총열량 25%, 남은 열량은 탄수화물로 계산합니다.</p>
    </section>
    <section class="panel">
      <h2 class="section-title">오늘 식단 추천</h2>
      <div class="metric-row">
        <div class="metric"><span>추천 kcal</span><strong>${Math.round(totals.kcal)}</strong></div>
        <div class="metric"><span>단백질</span><strong>${Math.round(totals.protein)}g</strong></div>
        <div class="metric"><span>탄/지</span><strong>${Math.round(totals.carbs)}g/${Math.round(totals.fat)}g</strong></div>
      </div>
      <p class="note">못 먹는 음식은 교체를 누르면 같은 역할군의 음식으로 바뀝니다. 외부 검색으로 추가한 식품도 교체 후보에 포함됩니다.</p>
    </section>
    <section class="grid">
      ${plan.map(mealCard).join("")}
    </section>
    <section class="panel">
      <h2 class="section-title">식품 검색 / 추가</h2>
      <div class="form-grid">
        <div class="field">
          <label>검색어</label>
          <input class="input" value="${state.foodSearchQuery}" data-food-query placeholder="chicken breast, oats" />
        </div>
        <div class="field">
          <label>외부 DB</label>
          <button class="btn blue" data-food-search>Open Food Facts 검색</button>
        </div>
      </div>
      <p class="note">${state.foodSearchStatus || "Open Food Facts 공개 식품 DB에서 영양값이 있는 제품을 검색합니다. 네트워크나 CORS가 막히면 내장 식품표를 사용합니다."}</p>
    </section>
    <section class="grid">
      ${state.foodSearchResults.map(foodResultCard).join("")}
    </section>
  `;
}

function mealCard(item) {
  return h`
    <article class="history-item">
      <h3>${item.meal} · ${item.food.name}</h3>
      <p>${item.serving.toFixed(1)}회분 · ${Math.round(item.kcal)}kcal · 단 ${Math.round(item.protein)}g / 탄 ${Math.round(item.carbs)}g / 지 ${Math.round(item.fat)}g</p>
      <button class="btn ghost" data-meal-swap="${item.id}" data-role="${item.role}">못 먹음 · 교체</button>
    </article>
  `;
}

function foodResultCard(food) {
  return h`
    <article class="history-item">
      <h3>${food.name}</h3>
      <p>${food.role} · ${Math.round(food.kcal)}kcal · 단 ${Math.round(food.protein)}g / 탄 ${Math.round(food.carbs)}g / 지 ${Math.round(food.fat)}g</p>
      <button class="btn primary" data-add-food="${encodeURIComponent(JSON.stringify(food))}">식품표에 추가</button>
    </article>
  `;
}

function profileInput(key, label, value) {
  return h`
    <div class="field">
      <label>${label}</label>
      <input class="input" inputmode="decimal" value="${value}" data-profile="${key}" />
    </div>
  `;
}

function macroBar(label, grams, calories, total, className) {
  const percent = Math.max(0, Math.min(100, (calories / Math.max(total, 1)) * 100));
  return h`
    <div>
      <div class="section-title" style="margin-bottom:6px">
        <strong>${label}</strong>
        <span class="muted">${Math.round(grams)}g</span>
      </div>
      <div class="bar ${className}"><span style="width:${percent}%"></span></div>
    </div>
  `;
}

function historyView() {
  if (!state.logs.length) {
    return h`
      <section class="panel">
        <h2 class="section-title">기록 없음</h2>
        <p class="note">운동 탭에서 세션을 저장하면 1RM, 평균 반복수, 과부하 조건 충족 여부가 여기에 쌓입니다.</p>
      </section>
      <button class="btn danger" data-reset>데이터 초기화</button>
    `;
  }
  return h`
    <section class="panel">
      <h2 class="section-title">최근 기록</h2>
      <button class="btn danger" data-reset>데이터 초기화</button>
    </section>
    <section class="grid">
      ${state.logs.map(historyItem).join("")}
    </section>
  `;
}

function historyItem(log) {
  const date = new Date(log.date).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const overloads = log.entries
    .filter((entry) => entry.overloadApplied)
    .map((entry) => `${entry.name} ${entry.loadMode === "assistance" ? "난이도 상승 대기" : "증량 대기"}`);
  const top = log.entries.reduce((best, entry) => (entry.estimatedOneRm > best.estimatedOneRm ? entry : best), log.entries[0]);
  return h`
    <article class="history-item">
      <h3>${date} · C${log.cycle} W${log.week} · ${log.dayLabel}</h3>
      <p>최고 추정 1RM: ${top ? `${top.name} ${kg(top.estimatedOneRm)}` : "-"}</p>
      <p>과부하 달성: ${overloads.length ? `${overloads.join(", ")} · 다음 사이클 반영` : "없음"}</p>
    </article>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });
  document.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => setDay(button.dataset.day));
  });
  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = clampNumber(
        readValue(button.dataset.step) + Number(button.dataset.delta),
        Number(button.dataset.min),
        Number(button.dataset.max)
      );
      writeDraftValue(button.dataset.step, next);
    });
  });
  document.querySelectorAll("[data-input]").forEach((input) => {
    input.addEventListener("change", () => {
      const next = clampNumber(input.value, Number(input.dataset.min), Number(input.dataset.max));
      writeDraftValue(input.dataset.input, next);
    });
  });
  document.querySelectorAll("[data-profile]").forEach((input) => {
    input.addEventListener("change", () => updateProfile(input.dataset.profile, input.value));
  });
  document.querySelectorAll("[data-exercise]").forEach((input) => {
    input.addEventListener("change", () => updateExercise(input.dataset.exercise, input.dataset.exKey, input.value));
  });
  document.querySelectorAll("[data-open-variant]").forEach((button) => {
    button.addEventListener("click", () => toggleExercisePicker(button.dataset.openVariant));
  });
  document.querySelectorAll("[data-select-variant]").forEach((button) => {
    button.addEventListener("click", () => selectExerciseVariant(button.dataset.selectVariant, button.dataset.variantKey));
  });
  document.querySelectorAll("[data-meal-swap]").forEach((button) => {
    button.addEventListener("click", () => swapMealFood(button.dataset.mealSwap, button.dataset.role));
  });
  document.querySelectorAll("[data-food-query]").forEach((input) => {
    input.addEventListener("input", () => setFoodQuery(input.value));
  });
  const foodSearch = document.querySelector("[data-food-search]");
  if (foodSearch) foodSearch.addEventListener("click", searchFoodFacts);
  document.querySelectorAll("[data-add-food]").forEach((button) => {
    button.addEventListener("click", () => addFood(JSON.parse(decodeURIComponent(button.dataset.addFood))));
  });
  const complete = document.querySelector("[data-complete]");
  if (complete) complete.addEventListener("click", completeSession);
  const week = document.querySelector("[data-week]");
  if (week) week.addEventListener("change", () => setWeek(week.value));
  const reset = document.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", resetData);
}

function readValue(key) {
  const [type, exerciseId, index] = key.split(":");
  const exercise = getExercise(exerciseId);
  const draft = getDraft(exercise);
  if (type === "weight") return Number(draft.weight) || 0;
  return Number(draft.reps[Number(index)]) || 0;
}

function writeDraftValue(key, value) {
  const [type, exerciseId, index] = key.split(":");
  const exercise = getExercise(exerciseId);
  const draft = getDraft(exercise);
  if (type === "weight") {
    const weight = roundTo(value, exercise.loadStep);
    state = {
      ...state,
      exerciseVariantWeights: {
        ...state.exerciseVariantWeights,
        [exercise.variantKey || getSelectedExerciseVariant(exerciseId)]: weight
      },
      draft: {
        ...state.draft,
        [exerciseId]: {
          ...(state.draft[exerciseId] || {}),
          weight
        }
      }
    };
    saveState();
    render();
    return;
  }
  if (type === "rep") {
    const reps = [...draft.reps];
    reps[Number(index)] = Math.round(value);
    setDraft(exerciseId, { reps });
  }
}

function clampNumber(value, min, max) {
  const number = Number(value) || 0;
  return Math.min(Math.max(number, Number.isFinite(min) ? min : -Infinity), Number.isFinite(max) ? max : Infinity);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();

export {
  ROUTINE,
  calcNutrition,
  epleyOneRm,
  getPhase,
  getExerciseTrainingClass,
  getTargetSets,
  getTargetRpe,
  getVariantKey,
  isOverloadStackWeek,
  targetWeightFromOneRm,
  advanceAfterSession
};
