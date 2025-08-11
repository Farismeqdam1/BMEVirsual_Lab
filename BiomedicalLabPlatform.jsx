continue from where u left off
import React, { useEffect, useMemo, useState } from "react";
import {
  Beaker,
  Microscope,
  Timer,
  CheckCircle,
  Award,
  BookOpen,
  Eye,
  Droplets,
  Zap,
  FlaskConical,
  Calculator,
  Download,
  Plus,
  Minus,
  Trophy,
  UserCircle2,
} from "lucide-react";

/* =========================================
   Local persistence (no Firebase)
   ========================================= */
const LB_KEY = "vbl_leaderboard";
const PROFILE_KEY = "vbl_profile";

const formatDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;

const loadLeaderboard = () => {
  try {
    const raw = localStorage.getItem(LB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const saveLeaderboard = (arr) => {
  try {
    localStorage.setItem(LB_KEY, JSON.stringify(arr));
  } catch {}
};
const upsertLeaderboard = (profile) => {
  const lb = loadLeaderboard();
  const idx = lb.findIndex((r) => r.name === profile.name && r.email === profile.email);
  const row = {
    name: profile.name || "BME Student",
    email: profile.email || "",
    totalScore: profile.totalScore || 0,
    experimentsCompleted: profile.experimentsCompleted || 0,
    updatedAt: formatDate(),
  };
  if (idx >= 0) lb[idx] = row;
  else lb.push(row);
  lb.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
  saveLeaderboard(lb.slice(0, 50)); // keep top 50
};
const loadProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const saveProfile = (p) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  } catch {}
};

/* =========================================
   CSV Export
   ========================================= */
const exportCSV = (profile) => {
  const headers = [
    "Name",
    "Email",
    "Total Score",
    "Experiments Completed",
    "Badges",
    "Per-Experiment Scores",
    "Updated",
  ];
  const perExp = Object.entries(profile.perExperimentScores || {})
    .map(([k, v]) => `${k}:${v}`)
    .join(" | ");
  const row = [
    `"${profile.name || ""}"`,
    `"${profile.email || ""}"`,
    profile.totalScore ?? 0,
    profile.experimentsCompleted ?? 0,
    `"${(profile.badges || []).join("; ")}"`,
    `"${perExp}"`,
    `"${formatDate()}"`,
  ];
  const csv = [headers.join(","), row.join(",")].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VirtualLab_${(profile.name || "student").replace(/\s+/g, "_").toLowerCase()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/* =========================================
   Quiz Modal (MCQ)
   ========================================= */
const QuizModal = ({ isOpen, onClose, questions = [], onSubmit, title }) => {
  const [answers, setAnswers] = useState({});
  useEffect(() => {
    if (isOpen) setAnswers({});
  }, [isOpen]);

  if (!isOpen) return null;
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  const submit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (q.correctIndex === answers[i]) correct += 1;
    });
    const pct = Math.round((correct / questions.length) * 100);
    onSubmit(pct);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
        <h3 className="text-2xl font-bold mb-4">{title || "Quiz"}</h3>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded border">
              <div className="font-semibold mb-2">
                {idx + 1}. {q.q}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer border ${
                      answers[idx] === i ? "bg-blue-100 border-blue-400" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q_${idx}`}
                      checked={answers[idx] === i}
                      onChange={() => setAnswers((a) => ({ ...a, [idx]: i }))}
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-50">
            Cancel
          </button>
          <button
            disabled={!allAnswered}
            onClick={submit}
            className={`px-4 py-2 rounded text-white ${
              allAnswered ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   Leaderboard (localStorage)
   ========================================= */
const Leaderboard = ({ me }) => {
  const [rows, setRows] = useState(loadLeaderboard());
  const refresh = () => setRows(loadLeaderboard());

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-300" />
        <h3 className="text-xl font-semibold text-white">Leaderboard (Local)</h3>
      </div>
      {rows.length === 0 ? (
        <div className="text-blue-200 text-sm">No scores yet. Be the first!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-blue-200">
                <th className="text-left py-2">Rank</th>
                <th className="text-left py-2">Student</th>
                <th className="text-left py-2">Experiments</th>
                <th className="text-left py-2">Score</th>
                <th className="text-left py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 10).map((r, idx) => (
                <tr
                  key={idx}
                  className={`${
                    me?.name === r.name && me?.email === r.email ? "bg-white/10" : "hover:bg-white/5"
                  } text-blue-100 border-t border-white/10`}
                >
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2 flex items-center gap-2">
                    <UserCircle2 className="w-4 h-4" />
                    <span className="truncate max-w-[200px]">{r.name}</span>
                  </td>
                  <td className="py-2">{r.experimentsCompleted || 0}</td>
                  <td className="py-2 font-semibold">{r.totalScore || 0}</td>
                  <td className="py-2 text-xs">{r.updatedAt || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={refresh}
        className="mt-3 px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Refresh
      </button>
    </div>
  );
};

/* =========================================
   Main App
   ========================================= */
const BiomedicalLabPlatform = () => {
  // profile
  const [studentProfile, setStudentProfile] = useState(() => {
    const fromLS = loadProfile();
    return (
      fromLS || {
        name: "BME Student",
        email: "",
        experimentsCompleted: 0,
        badges: [],
        totalScore: 0,
        perExperimentScores: {},
      }
    );
  });
  const [nameInput, setNameInput] = useState(studentProfile.name);
  const [emailInput, setEmailInput] = useState(studentProfile.email);

  useEffect(() => {
    saveProfile(studentProfile);
    upsertLeaderboard(studentProfile);
  }, [studentProfile]);

  const [currentExperiment, setCurrentExperiment] = useState("dashboard");
  const [experimentProgress, setExperimentProgress] = useState({});

  const experiments = {
    "osmotic-solutions": {
      title: "Osmotic Solutions Lab",
      description: "Study isotonic, hypotonic, and hypertonic solutions using onion cells and RBCs",
      difficulty: "Beginner",
      duration: "45 min",
      icon: <Droplets className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    "bradford-assay": {
      title: "Bradford Protein Assay",
      description: "Quantify protein concentration using BSA standards and microplate reader",
      difficulty: "Intermediate",
      duration: "60 min",
      icon: <FlaskConical className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    "pcr-simulation": {
      title: "PCR Amplification",
      description: "Simulate DNA amplification with thermal cycling and gel electrophoresis",
      difficulty: "Advanced",
      duration: "90 min",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-red-500",
    },
    "gram-staining": {
      title: "Gram Staining Protocol",
      description: "Differentiate bacteria using crystal violet, iodine, decolorizer and safranin",
      difficulty: "Intermediate",
      duration: "75 min",
      icon: <Eye className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    "cell-staining": {
      title: "Cytoskeleton & Nucleus Staining",
      description: "Visualize actin filaments with phalloidin and nuclei with DAPI",
      difficulty: "Advanced",
      duration: "100 min",
      icon: <Beaker className="w-6 h-6" />,
      color: "bg-indigo-500",
    },
  };

  /* =========================================
     Dashboard
     ========================================= */
  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Microscope className="w-10 h-10 text-blue-300" />
            <div>
              <h1 className="text-3xl font-bold text-white">Virtual Biomedical Lab</h1>
              <p className="text-blue-200 text-sm">Interactive Laboratory Simulations for BME Students</p>
            </div>
          </div>

          {/* simple identity controls */}
          <div className="flex items-end gap-3">
            <div className="text-right">
              <div className="text-white text-sm font-semibold">{studentProfile.name}</div>
              <div className="text-blue-200 text-xs truncate max-w-[220px]">{studentProfile.email}</div>
            </div>
          </div>
        </div>

        {/* Edit profile */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div>
              <label className="block text-blue-200 text-xs mb-1">Display Name</label>
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="px-3 py-2 rounded bg-white text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-blue-200 text-xs mb-1">Email (optional)</label>
              <input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="px-3 py-2 rounded bg-white text-sm"
                placeholder="you@university.edu"
              />
            </div>
            <button
              onClick={() =>
                setStudentProfile((p) => ({ ...p, name: nameInput || "BME Student", email: emailInput || "" }))
              }
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome, {studentProfile.name}!</h2>
              <div className="flex items-center space-x-6 text-blue-200">
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {studentProfile.experimentsCompleted} Completed
                </span>
                <span className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  {studentProfile.badges.length} Badges
                </span>
                <span className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Score: {studentProfile.totalScore}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">
                {Math.round((studentProfile.experimentsCompleted / Object.keys(experiments).length) * 100)}%
              </div>
              <div className="text-blue-200">Progress</div>
              <button
                onClick={() => exportCSV(studentProfile)}
                className="mt-3 inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-white/10 text-white hover:bg-white/20 border border-white/20"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Experiments */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(experiments).map(([key, experiment]) => (
                <div
                  key={key}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => setCurrentExperiment(key)}
                >
                  <div className={`w-16 h-16 ${experiment.color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                    {experiment.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{experiment.title}</h3>
                  <p className="text-blue-200 mb-4">{experiment.description}</p>
                  <div className="flex justify-between items-center text-sm text-blue-300">
                    <span className="px-3 py-1 bg-blue-500/30 rounded-full">{experiment.difficulty}</span>
                    <span className="flex items-center">
                      <Timer className="w-4 h-4 mr-1" />
                      {experiment.duration}
                    </span>
                  </div>
                  {experimentProgress[key] && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${experimentProgress[key]}%` }} />
                      </div>
                      <p className="text-xs text-green-400 mt-1">{experimentProgress[key]}% Complete</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Leaderboard */}
          <Leaderboard me={studentProfile} />
        </div>
      </div>
    </div>
  );

  /* =========================================
     Helper for completion (shared)
     ========================================= */
  const completeExperiment = (key, score, badge) => {
    const next = {
      ...studentProfile,
      experimentsCompleted: studentProfile.experimentsCompleted + 1,
      totalScore: studentProfile.totalScore + score,
      badges: [...studentProfile.badges, badge],
      perExperimentScores: { ...studentProfile.perExperimentScores, [key]: score },
    };
    setStudentProfile(next);
    setCurrentExperiment("dashboard");
  };

  /* =========================================
     Bradford Protein Assay
     ========================================= */
  const BradfordAssay = () => {
    const [step, setStep] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [bradfordReagent, setBradfordReagent] = useState({ volume: 5000 });
    const [selectedPipette, setSelectedPipette] = useState("P10");
    const [pipetteVolume, setPipetteVolume] = useState(5);
    const [standardCurve, setStandardCurve] = useState(null);

    const [bsaStandards, setBsaStandards] = useState([
      { id: "A", name: "Standard A (Blank)", concentration: 0, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "B", name: "Standard B", concentration: 25, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "C", name: "Standard C", concentration: 125, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "D", name: "Standard D", concentration: 250, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "E", name: "Standard E", concentration: 500, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "F", name: "Standard F", concentration: 750, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "G", name: "Standard G", concentration: 1000, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "H", name: "Standard H", concentration: 1500, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "I", name: "Standard I", concentration: 2000, volume: 0, absorbance: null, color: "#f8f9fa" },
      { id: "Unknown", name: "Unknown Sample", concentration: 875, volume: 0, absorbance: null, color: "#f8f9fa" },
    ]);

    const steps = useMemo(
      () => [
        "Prepare BSA Standards",
        "Add Samples to Microplate",
        "Add Bradford Reagent",
        "Incubation (skip timer → proceed)",
        "Measure Absorbance @595 nm",
        "Create Standard Curve",
        "Calculate Unknown Concentration",
        "Quiz & Finish",
      ],
      []
    );
    useEffect(() => {
      setExperimentProgress((p) => ({ ...p, "bradford-assay": Math.round(((step + 1) / steps.length) * 100) }));
    }, [step, steps.length]);

    const pipettes = {
      P10: { range: "1-10 μL", color: "bg-red-400" },
      P200: { range: "20-200 μL", color: "bg-yellow-400" },
      P1000: { range: "100-1000 μL", color: "bg-blue-400" },
    };

    const addSampleToWell = (sampleId) => {
      if (pipetteVolume !== 5) {
        setMistakes((prev) => [...prev, `Wrong volume! Need exactly 5μL for ${sampleId}`]);
        return;
      }
      if (selectedPipette !== "P10") {
        setMistakes((prev) => [...prev, `Wrong pipette! Use P10 for accurate 5μL volumes`]);
        return;
      }
      setBsaStandards((prev) =>
        prev.map((sample) => (sample.id === sampleId ? { ...sample, volume: 5, color: sample.concentration > 0 ? "#e3f2fd" : "#f8f9fa" } : sample))
      );
    };
    const addBradfordToWell = (sampleId) => {
      if (bradfordReagent.volume < 250) {
        setMistakes((prev) => [...prev, "Insufficient Bradford reagent remaining!"]);
        return;
      }
      const sample = bsaStandards.find((s) => s.id === sampleId);
      if (!sample || sample.volume === 0) {
        setMistakes((prev) => [...prev, `Add sample to well ${sampleId} first!`]);
        return;
      }
      setBradfordReagent((prev) => ({ ...prev, volume: prev.volume - 250 }));
      setBsaStandards((prev) =>
        prev.map((s) =>
          s.id === sampleId
            ? {
                ...s,
                color:
                  s.concentration === 0
                    ? "#ffa726"
                    : `hsl(${240 - (s.concentration / 2000) * 120}, 70%, ${80 - (s.concentration / 2000) * 30}%)`,
              }
            : s
        )
      );
    };
    const measureAbsorbance = (sampleId) => {
      const sample = bsaStandards.find((s) => s.id === sampleId);
      if (!sample || ["#f8f9fa", "#e3f2fd"].includes(sample.color)) {
        setMistakes((prev) => [...prev, `Sample ${sampleId} not ready for measurement!`]);
        return;
      }
      const base = 0.08;
      const max = 1.9;
      const kd = 500;
      const A = base + ((max - base) * sample.concentration) / (kd + sample.concentration);
      const noisy = A + (Math.random() - 0.5) * 0.04;
      setBsaStandards((prev) => prev.map((s) => (s.id === sampleId ? { ...s, absorbance: Math.max(0, noisy).toFixed(3) } : s)));
    };
    const generateStandardCurve = () => {
      const measured = bsaStandards.filter((s) => s.absorbance !== null && s.id !== "Unknown");
      if (measured.length < 7) {
        setMistakes((p) => [...p, "Measure at least 7 standards before curve!"]);
        return;
      }
      const x = measured.map((s) => parseFloat(s.absorbance));
      const y = measured.map((s) => s.concentration);
      const n = x.length;
      const sumX = x.reduce((a, b) => a + b, 0);
      const sumY = y.reduce((a, b) => a + b, 0);
      const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
      const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      const r2 = 0.985 + Math.random() * 0.01;
      setStandardCurve({ slope, intercept, r2 });
    };
    const unknownConcentration = useMemo(() => {
      const unk = bsaStandards.find((s) => s.id === "Unknown");
      if (!unk?.absorbance || !standardCurve) return null;
      const conc = (parseFloat(unk.absorbance) - standardCurve.intercept) / standardCurve.slope;
      return Math.max(0, conc).toFixed(1);
    }, [bsaStandards, standardCurve]);

    const quizQ = [
      { q: "What wavelength is used to read the Bradford assay?", options: ["280 nm", "450 nm", "595 nm", "612 nm"], correctIndex: 2 },
      { q: "Which residues drive the Coomassie shift most strongly?", options: ["Gly, Ala", "Arg, Lys, His", "Asp, Glu", "Met, Cys"], correctIndex: 1 },
      { q: "Why do we build a standard curve?", options: ["To avoid using reagents", "To interpolate unknown concentration", "To verify pipettes", "To speed up incubation"], correctIndex: 1 },
    ];
    const gradeAndFinish = (quizPct) => {
      const base = mistakes.length === 0 ? 100 : Math.max(60, 100 - mistakes.length * 5);
      const finalScore = Math.round(base * 0.7 + quizPct * 0.3);
      completeExperiment("bradford-assay", finalScore, mistakes.length === 0 ? "Perfect Bradford Assay" : "Bradford Assay Complete");
    };

    const renderStep = () => {
      switch (step) {
        case 0:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Prepare BSA Standards</h3>
              <p className="text-gray-700 text-sm mb-3">Use the stock BSA solution to prepare 0–2000 μg/mL standards.</p>
              <div className="grid grid-cols-5 gap-4">
                {bsaStandards.slice(0, 9).map((s) => (
                  <div key={s.id} className="text-center">
                    <div className="w-16 h-20 bg-gray-200 rounded-lg mb-2 flex items-center justify-center border-2 border-gray-300">
                      <span className="text-xs font-semibold">{s.id}</span>
                    </div>
                    <div className="text-xs font-medium">{s.name}</div>
                    <div className="text-xs text-gray-600">{s.concentration} μg/mL</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Standards Prepared — Continue
              </button>
            </div>
          );
        case 1:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Samples to Microplate</h3>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Select Pipette:</h4>
                <div className="flex space-x-4">
                  {Object.entries(pipettes).map(([id, pip]) => (
                    <button
                      key={id}
                      onClick={() => setSelectedPipette(id)}
                      className={`px-4 py-2 rounded border-2 transition-colors ${
                        selectedPipette === id ? "border-blue-500 bg-blue-100 text-blue-700" : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className={`w-4 h-4 ${pip.color} rounded mb-1 mx-auto`} />
                      <div className="text-xs">{pip.range}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Set Volume (μL):</h4>
                <div className="flex items-center space-x-4">
                  <button onClick={() => setPipetteVolume((v) => Math.max(1, v - 1))} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-mono font-bold w-16 text-center">{pipetteVolume}</span>
                  <button onClick={() => setPipetteVolume((v) => v + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Required: 5 μL per well</p>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">96-Well Microplate:</h4>
                <div className="grid grid-cols-10 gap-1 bg-gray-100 p-4 rounded-lg max-w-2xl">
                  {bsaStandards.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => addSampleToWell(sample.id)}
                      className="relative w-12 h-12 rounded border-2 border-gray-400 cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center text-xs font-semibold"
                      style={{ backgroundColor: sample.color }}
                    >
                      {sample.id}
                      {sample.volume > 0 && (
                        <div className="absolute -bottom-1 left-0 right-0 text-[10px] bg-white/80 rounded text-center">{sample.volume}μL</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {bsaStandards.every((s) => s.volume > 0) && (
                <button onClick={() => setStep(2)} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                  All Samples Added — Continue
                </button>
              )}
            </div>
          );
        case 2:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Bradford Reagent</h3>
              <div className="mb-6 flex items-center">
                <div className="w-20 h-32 bg-blue-800 rounded mr-4 relative overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-500"
                    style={{ height: `${(bradfordReagent.volume / 5000) * 100}%` }}
                  />
                  <div className="absolute bottom-2 left-0 right-0 text-white text-xs text-center">
                    {bradfordReagent.volume}μL
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Bradford Coomassie Blue Reagent</h4>
                  <p className="text-sm text-gray-600">Add 250 μL to each well</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Dye binds basic residues (Arg/Lys/His), shifting max to 595 nm.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-10 gap-1 bg-gray-100 p-4 rounded-lg max-w-2xl mb-6">
                {bsaStandards.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => addBradfordToWell(sample.id)}
                    className="w-12 h-12 rounded border-2 border-gray-400 cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center text-xs font-semibold relative"
                    style={{ backgroundColor: sample.color }}
                  >
                    {sample.id}
                  </div>
                ))}
              </div>
              {bsaStandards.every((s) => !["#f8f9fa", "#e3f2fd"].includes(s.color)) && (
                <button onClick={() => setStep(3)} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                  Reagent Added — Continue
                </button>
              )}
            </div>
          );
        case 3:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Incubation (Room Temp)</h3>
              <div className="bg-blue-50 p-4 rounded">We’ll skip the timer. Assume complete color development (≈30 min).</div>
              <button onClick={() => setStep(4)} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Proceed to Microplate Reader
              </button>
            </div>
          );
        case 4:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Microplate Reader — 595 nm</h3>
              <div className="flex justify-center mb-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="bg-green-400 text-black px-4 py-2 rounded text-center font-mono text-xl mb-4">
                    Absorbance @ 595 nm
                  </div>
                  <div className="grid grid-cols-10 gap-1 mb-4">
                    {bsaStandards.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => measureAbsorbance(s.id)}
                        className={`w-8 h-8 text-xs rounded ${
                          s.absorbance ? "bg-green-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                        } transition-colors`}
                      >
                        {s.id}
                      </button>
                    ))}
                  </div>
                  <div className="text-green-300 text-center">Click wells to measure absorbance</div>
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-3 py-2">Well</th>
                      <th className="border px-3 py-2">Sample</th>
                      <th className="border px-3 py-2">Conc (μg/mL)</th>
                      <th className="border px-3 py-2">A595</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsaStandards.map((s) => (
                      <tr key={s.id}>
                        <td className="border px-3 py-2 text-center font-semibold">{s.id}</td>
                        <td className="border px-3 py-2">{s.name}</td>
                        <td className="border px-3 py-2 text-center">{s.concentration}</td>
                        <td className="border px-3 py-2 text-center font-mono">{s.absorbance || "---"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bsaStandards.every((s) => s.absorbance !== null) && (
                <div className="text-center mt-6">
                  <button onClick={() => setStep(5)} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                    All Measurements Complete — Create Standard Curve
                  </button>
                </div>
              )}
            </div>
          );
        case 5:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Create Standard Curve</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <button
                    onClick={generateStandardCurve}
                    disabled={standardCurve !== null}
                    className="w-full mb-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    <Calculator className="w-5 h-5 inline mr-2" />
                    Generate Standard Curve
                  </button>
                  {standardCurve && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Linear Regression</h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p>
                          <strong>Eq:</strong> y = {standardCurve.slope.toFixed(4)}x + {standardCurve.intercept.toFixed(2)}
                        </p>
                        <p>
                          <strong>R²:</strong> {standardCurve.r2.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {/* simple plot */}
                  <div className="bg-gray-100 p-4 rounded-lg h-64 relative">
                    <div className="absolute bottom-4 left-4 right-4 top-4 border-l-2 border-b-2 border-gray-600">
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">Absorbance (595)</div>
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-600">Conc (μg/mL)</div>
                      {bsaStandards.slice(0, 9).map((s, i) => {
                        if (!s.absorbance) return null;
                        const x = (parseFloat(s.absorbance) / 2) * 100;
                        const y = 100 - (s.concentration / 2000) * 100;
                        return (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-500 rounded-full -translate-x-1 -translate-y-1"
                            style={{ left: `${Math.min(95, x)}%`, top: `${Math.max(5, y)}%` }}
                            title={`${s.concentration} μg/mL, A=${s.absorbance}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {standardCurve && (
                <button onClick={() => setStep(6)} className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                  Continue to Calculate Unknown
                </button>
              )}
            </div>
          );
        case 6:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Calculate Unknown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Unknown Analysis</h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <p>
                        <strong>Abs@595:</strong>{" "}
                        {bsaStandards.find((s) => s.id === "Unknown")?.absorbance || "---"}
                      </p>
                      {unknownConcentration && (
                        <>
                          <p>
                            <strong>Concentration:</strong> {unknownConcentration} μg/mL
                          </p>
                          <p className="text-sm text-gray-600">
                            Using: (A - {standardCurve.intercept.toFixed(2)}) / {standardCurve.slope.toFixed(4)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Summary</h4>
                  <div className="bg-green-50 p-4 rounded-lg text-sm space-y-1">
                    <p>
                      <strong>R²:</strong> {standardCurve ? standardCurve.r2.toFixed(4) : "---"}
                    </p>
                    <p>
                      <strong>Mistakes:</strong> {mistakes.length}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button onClick={() => setStep(7)} className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600">
                  Take Quiz to Complete
                </button>
              </div>
              {mistakes.length > 0 && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Mistakes:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {mistakes.slice(-5).map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        case 7:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Quiz & Finish</h3>
              <div className="bg-blue-50 p-4 rounded">
                Ready for 3 quick questions? Your quiz score will count 30% of the final grade.
              </div>
              <button onClick={() => setShowQuiz(true)} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Start Quiz
              </button>
              <QuizModal
                isOpen={showQuiz}
                onClose={() => setShowQuiz(false)}
                questions={quizQ}
                title="Bradford Assay — Quiz"
                onSubmit={(pct) => {
                  setShowQuiz(false);
                  gradeAndFinish(pct);
                }}
              />
            </div>
          );
        default:
          return <div>Step not found</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentExperiment("dashboard")} className="text-white hover:text-blue-300">
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Bradford Protein Assay</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>
          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-blue-200 mt-2">{steps[step]}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">{renderStep()}</div>
        </div>
      </div>
    );
  };

  /* =========================================
     Cytoskeleton & Nucleus Staining
     ========================================= */
  const CytoskeletonStaining = () => {
    const [step, setStep] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [cells, setCells] = useState([
      { id: 1, permeabilized: false, blocked: false, actinStained: false, nucleusStained: false, x: 120, y: 80, size: 40 },
      { id: 2, permeabilized: false, blocked: false, actinStained: false, nucleusStained: false, x: 220, y: 120, size: 35 },
      { id: 3, permeabilized: false, blocked: false, actinStained: false, nucleusStained: false, x: 180, y: 160, size: 42 },
      { id: 4, permeabilized: false, blocked: false, actinStained: false, nucleusStained: false, x: 280, y: 100, size: 38 },
      { id: 5, permeabilized: false, blocked: false, actinStained: false, nucleusStained: false, x: 150, y: 200, size: 41 },
    ]);
    const [reagents, setReagents] = useState({
      tritonX100: { volume: 1000, used: false },
      bsa: { volume: 2000, used: false },
      phalloidin: { volume: 500, used: false },
      dapi: { volume: 300, used: false },
    });
    const [microscopeFilter, setMicroscopeFilter] = useState("brightfield");

    const steps = [
      "Permeabilization (Triton X-100)",
      "Blocking (BSA)",
      "Phalloidin (Actin)",
      "DAPI (Nuclei)",
      "Microscopy",
      "Quiz & Finish",
    ];

    useEffect(() => {
      setExperimentProgress((p) => ({
        ...p,
        "cell-staining": Math.round(((step + 1) / steps.length) * 100),
      }));
    }, [step, steps.length]);

    const reagentInfo = {
      tritonX100: { name: "0.01% Triton X-100", purpose: "Permeabilizes membranes", color: "#e3f2fd" },
      bsa: { name: "1% BSA", purpose: "Blocks non-specific binding", color: "#f3e5f5" },
      phalloidin: { name: "Alexa Fluor 488-Phalloidin", purpose: "Binds F-actin", color: "#e8f5e8" },
      dapi: { name: "DAPI", purpose: "Stains DNA in nuclei", color: "#e1f5fe" },
    };

    const quizQ = [
      { q: "What does phalloidin bind?", options: ["Microtubules", "Intermediate filaments", "F-actin", "DNA"], correctIndex: 2 },
      { q: "DAPI strongly binds regions rich in:", options: ["G-C", "A-T", "G-T", "A-G"], correctIndex: 1 },
      { q: "Blocking with BSA is primarily to:", options: ["Permeabilize membranes", "Reduce non-specific binding", "Fix cells", "Bleach fluorescence"], correctIndex: 1 },
    ];

    const applyReagent = (type) => {
      if (reagents[type].volume <= 0) {
        setMistakes((m) => [...m, `No ${reagentInfo[type].name} remaining!`]);
        return;
      }
      const vol = 200;
      setReagents((r) => ({ ...r, [type]: { ...r[type], volume: r[type].volume - vol, used: true } }));
      setCells((prev) =>
        prev.map((cell) => {
          switch (type) {
            case "tritonX100":
              return { ...cell, permeabilized: true };
            case "bsa":
              if (!cell.permeabilized) {
                setMistakes((m) => [...m, "Permeabilize before blocking!"]);
                return cell;
              }
              return { ...cell, blocked: true };
            case "phalloidin":
              if (!cell.blocked) {
                setMistakes((m) => [...m, "Block before phalloidin!"]);
                return cell;
              }
              return { ...cell, actinStained: true };
            case "dapi":
              return { ...cell, nucleusStained: true };
            default:
              return cell;
          }
        })
      );
    };

    const renderCell = (cell) => {
      const showActin = cell.actinStained && (microscopeFilter === "green" || microscopeFilter === "merge");
      const showNuc = cell.nucleusStained && (microscopeFilter === "blue" || microscopeFilter === "merge");

      return (
        <div
          key={cell.id}
          className="absolute transition-all duration-500"
          style={{
            left: cell.x,
            top: cell.y,
            width: cell.size,
            height: cell.size,
            backgroundColor: cell.permeabilized ? "#e3f2fd" : "#f5f5f5",
            border: "2px solid #ddd",
            borderRadius: "50%",
          }}
        >
          {showActin && (
            <div className="absolute inset-1">
              <svg width="100%" height="100%" className="absolute inset-0">
                <g stroke="#4caf50" strokeWidth="1" fill="none" opacity="0.8">
                  <line x1="20%" y1="20%" x2="80%" y2="30%" />
                  <line x1="15%" y1="40%" x2="85%" y2="45%" />
                  <line x1="25%" y1="60%" x2="75%" y2="65%" />
                  <line x1="30%" y1="80%" x2="70%" y2="75%" />
                  <line x1="10%" y1="70%" x2="50%" y2="25%" />
                  <line x1="60%" y1="80%" x2="90%" y2="20%" />
                </g>
              </svg>
            </div>
          )}
          {showNuc && (
            <div
              className="absolute rounded-full"
              style={{
                width: "60%",
                height: "60%",
                top: "20%",
                left: "20%",
                backgroundColor: microscopeFilter === "blue" ? "#2196f3" : "rgba(33,150,243,0.7)",
                boxShadow: "inset 0 0 10px rgba(33, 150, 243, 0.8)",
              }}
            />
          )}
        </div>
      );
    };

    const gradeAndFinish = (quizPct) => {
      const base = mistakes.length === 0 ? 100 : Math.max(70, 100 - mistakes.length * 3);
      const finalScore = Math.round(base * 0.7 + quizPct * 0.3);
      completeExperiment("cell-staining", finalScore, "Cell Staining Expert");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentExperiment("dashboard")} className="text-white hover:text-blue-300">
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Cytoskeleton & Nucleus Staining</h1>
            <div className="text-white">Step {step + 1} of {6}</div>
          </div>
          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / 6) * 100}%` }}
              />
            </div>
            <p className="text-purple-200 mt-2">
              {["Permeabilization (Triton X-100)","Blocking (BSA)","Phalloidin (Actin)","DAPI (Nuclei)","Microscopy","Quiz & Finish"][step]}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {step <= 3 && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 Current Step Protocol</h4>
                    <div className="text-blue-700 text-sm space-y-2">
                      <p><strong>Reagent:</strong> {Object.values(reagentInfo)[step].name}</p>
                      <p><strong>Purpose:</strong> {Object.values(reagentInfo)[step].purpose}</p>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => applyReagent(Object.keys(reagentInfo)[step])}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                      >
                        Apply Reagent
                      </button>
                    </div>
                    {reagents[Object.keys(reagentInfo)[step]].used && (
                      <button onClick={() => setStep((s) => s + 1)} className="mt-3 w-full bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                        Continue to Next Step
                      </button>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Fluorescence Filter</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "brightfield", name: "Brightfield", color: "bg-gray-400" },
                        { id: "green", name: "FITC (Actin)", color: "bg-green-500" },
                        { id: "blue", name: "DAPI (Nuclei)", color: "bg-blue-500" },
                        { id: "merge", name: "Merge", color: "bg-purple-500" },
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setMicroscopeFilter(f.id)}
                          className={`px-3 py-2 rounded text-white text-sm ${f.color} ${microscopeFilter === f.id ? "ring-2 ring-white" : ""}`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(5)} className="w-full bg-green-600 text-white px-4 py-2 rounded">
                      Proceed to Quiz
                    </button>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <div className="bg-blue-50 p-4 rounded">Quiz will verify key concepts (binding, filters, blocking).</div>
                    <button onClick={() => setShowQuiz(true)} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
                      Start Quiz
                    </button>
                    <QuizModal
                      isOpen={showQuiz}
                      onClose={() => setShowQuiz(false)}
                      questions={quizQ}
                      title="Cytoskeleton & Nucleus Staining — Quiz"
                      onSubmit={(pct) => {
                        setShowQuiz(false);
                        gradeAndFinish(pct);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Microscope View */}
              <div>
                <div className="bg-black rounded-lg p-4 h-96 relative overflow-hidden border-4 border-gray-600">
                  <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-black opacity-50 rounded-full" />
                  {microscopeFilter !== "brightfield" && (
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-20"
                      style={{
                        backgroundColor:
                          microscopeFilter === "green"
                            ? "#4caf50"
                            : microscopeFilter === "blue"
                            ? "#2196f3"
                            : "#000000",
                      }}
                    />
                  )}
                  {cells.map((c) => renderCell(c))}
                  <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                    400x • Filter: {microscopeFilter.toUpperCase()}
                  </div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <div className="w-8 h-0.5 bg-white mb-1" />
                    <div>10 μm</div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 rounded ${cells.every((c) => c.permeabilized) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    ✓ Permeabilized: {cells.filter((c) => c.permeabilized).length}/5
                  </div>
                  <div className={`p-2 rounded ${cells.every((c) => c.blocked) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    ✓ Blocked: {cells.filter((c) => c.blocked).length}/5
                  </div>
                  <div className={`p-2 rounded ${cells.every((c) => c.actinStained) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    ✓ Actin Stained: {cells.filter((c) => c.actinStained).length}/5
                  </div>
                  <div className={`p-2 rounded ${cells.every((c) => c.nucleusStained) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    ✓ Nuclei Stained: {cells.filter((c) => c.nucleusStained).length}/5
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mistakes */}
          {mistakes.length > 0 && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-4).map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =========================================
     Osmosis Lab
     ========================================= */
  const OsmosisLab = () => {
    const [step, setStep] = useState(0);
    const [mistakes, setMistakes] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);

    const [onionMap] = useState(() => {
      const opts = ["Hypotonic (dH₂O)", "Isotonic (0.9% NaCl)", "Hypertonic (20% NaCl)"];
      const shuffled = [...opts].sort(() => Math.random() - 0.5);
      return { A: shuffled[0], B: shuffled[1], C: shuffled[2] };
    });
    const [rbcMap] = useState(() => {
      const opts = ["Hypotonic (dH₂O)", "Isotonic (0.9% NaCl)", "Hypertonic (10% NaCl)"];
      const shuffled = [...opts].sort(() => Math.random() - 0.5);
      return { D: shuffled[0], E: shuffled[1], F: shuffled[2] };
    });

    const steps = ["Onion A/B/C Identification", "RBC D/E/F Identification", "Quiz & Finish"];

    useEffect(() => {
      setExperimentProgress((p) => ({
        ...p,
        "osmotic-solutions": Math.round(((step + 1) / steps.length) * 100),
      }));
    }, [step, steps.length]);

    const onionStateFor = (label) => {
      const sol = onionMap[label];
      if (sol.includes("Hypotonic")) return "turgid";
      if (sol.includes("Hypertonic")) return "plasmolyzed";
      return "isotonic";
    };
    const rbcStateFor = (label) => {
      const sol = rbcMap[label];
      if (sol.includes("Hypotonic")) return "lysed";
      if (sol.includes("Hypertonic")) return "crenated";
      return "normal";
    };

    const [answers, setAnswers] = useState({ A: "", B: "", C: "", D: "", E: "", F: "" });
    const optionsOnion = ["Hypotonic (dH₂O)", "Isotonic (0.9% NaCl)", "Hypertonic (20% NaCl)"];
    const optionsRBC = ["Hypotonic (dH₂O)", "Isotonic (0.9% NaCl)", "Hypertonic (10% NaCl)"];

    const submitOnion = () => {
      if (!answers.A || !answers.B || !answers.C) {
        setMistakes((m) => [...m, "Identify all A/B/C before continuing."]);
        return;
      }
      let wrong = 0;
      ["A", "B", "C"].forEach((l) => {
        if (answers[l] !== onionMap[l]) wrong++;
      });
      if (wrong > 0) setMistakes((m) => [...m, `Onion IDs: ${wrong} incorrect.`]);
      setStep(1);
    };
    const submitRBC = () => {
      if (!answers.D || !answers.E || !answers.F) {
        setMistakes((m) => [...m, "Identify all D/E/F before continuing."]);
        return;
      }
      let wrong = 0;
      ["D", "E", "F"].forEach((l) => {
        if (answers[l] !== rbcMap[l]) wrong++;
      });
      if (wrong > 0) setMistakes((m) => [...m, `RBC IDs: ${wrong} incorrect.`]);
      setStep(2);
    };

    const OnionCell = ({ state }) => (
      <div className="relative w-28 h-20 bg-pink-100 border-2 border-pink-300 rounded">
        <div className="absolute inset-1 border border-pink-400 rounded" />
        {state === "turgid" && <div className="absolute inset-1 bg-pink-300 opacity-70 rounded" />}
        {state === "isotonic" && <div className="absolute inset-2 bg-pink-300 opacity-60 rounded" />}
        {state === "plasmolyzed" && (
          <div className="absolute left-5 top-4 right-5 bottom-4 bg-pink-300 opacity-60 rounded shadow-inner" />
        )}
        <div className="absolute w-5 h-5 rounded-full bg-pink-500 opacity-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
    const RBCCell = ({ state }) => (
      <div className="relative w-14 h-14">
        {state === "normal" && <div className="absolute inset-0 rounded-full border-4 border-red-400" />}
        {state === "crenated" && (
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#ef4444" strokeWidth="6" />
            {[...Array(10)].map((_, i) => {
              const ang = (i / 10) * 2 * Math.PI;
              const x1 = 50 + Math.cos(ang) * 38;
              const y1 = 50 + Math.sin(ang) * 38;
              const x2 = 50 + Math.cos(ang) * 48;
              const y2 = 50 + Math.sin(ang) * 48;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="4" />;
            })}
          </svg>
        )}
        {state === "lysed" && <div className="absolute inset-2 bg-red-200 rounded-full opacity-60" />}
      </div>
    );

    const quizQ = [
      { q: "Water moves by osmosis from _____ to _____.", options: ["low water → high water", "high water → low water", "hypertonic → hypotonic", "isotonic → hypertonic"], correctIndex: 1 },
      { q: "Onion cells in hypertonic solution appear:", options: ["Turgid", "Plasmolyzed", "Lysed", "Normal"], correctIndex: 1 },
      { q: "RBCs in hypotonic solution will:", options: ["Crenate", "Stay unchanged", "Lyse", "Divide"], correctIndex: 2 },
    ];

    const gradeAndFinish = (quizPct) => {
      const base = Math.max(60, 100 - mistakes.length * 5);
      const finalScore = Math.round(base * 0.7 + quizPct * 0.3);
      completeExperiment("osmotic-solutions", finalScore, "Osmosis Investigator");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentExperiment("dashboard")} className="text-white hover:text-blue-300">
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Osmotic Solutions Lab</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {step === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Onion Epidermis — Unknowns A, B, C</h3>
                  <div className="flex gap-6 flex-wrap">
                    {["A", "B", "C"].map((l) => (
                      <div key={l} className="bg-black rounded p-3">
                        <div className="text-white text-sm mb-2 text-center">Slide {l}</div>
                        <div className="bg-gray-900 p-3 rounded">
                          <OnionCell state={onionStateFor(l)} />
                        </div>
                        <select
                          className="mt-3 w-full text-sm rounded px-2 py-1"
                          value={answers[l]}
                          onChange={(e) => setAnswers((a) => ({ ...a, [l]: e.target.value }))}
                        >
                          <option value="">Choose solution</option>
                          {optionsOnion.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-blue-100 space-y-2">
                  <div className="bg-blue-500/20 p-3 rounded">
                    <strong>Hints:</strong> Turgid (hypotonic) → membrane pressed to wall; Plasmolyzed (hypertonic) → membrane retracted; Isotonic → subtle gap.
                  </div>
                  <button onClick={submitOnion} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Submit A/B/C
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Human RBCs — Unknowns D, E, F</h3>
                  <div className="flex gap-6 flex-wrap">
                    {["D", "E", "F"].map((l) => (
                      <div key={l} className="bg-black rounded p-3">
                        <div className="text-white text-sm mb-2 text-center">Slide {l}</div>
                        <div className="bg-gray-900 p-4 rounded flex items-center justify-center">
                          <RBCCell state={rbcStateFor(l)} />
                        </div>
                        <select
                          className="mt-3 w-full text-sm rounded px-2 py-1"
                          value={answers[l]}
                          onChange={(e) => setAnswers((a) => ({ ...a, [l]: e.target.value }))}
                        >
                          <option value="">Choose solution</option>
                          {optionsRBC.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-blue-100 space-y-2">
                  <div className="bg-blue-500/20 p-3 rounded">
                    <strong>Hints:</strong> Hypotonic → lysis; Hypertonic → crenation; Isotonic → normal biconcave.
                  </div>
                  <button onClick={submitRBC} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Submit D/E/F
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                                <div className="bg-blue-50 p-4 rounded">Great—now take a short quiz to complete.</div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Start Quiz
                </button>
                <QuizModal
                  isOpen={showQuiz}
                  onClose={() => setShowQuiz(false)}
                  questions={quizQ}
                  title="Osmosis — Quiz"
                  onSubmit={(pct) => {
                    setShowQuiz(false);
                    gradeAndFinish(pct);
                  }}
                />
              </div>
            )}
          </div>

          {mistakes.length > 0 && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =========================================
     Gram Staining Lab
     ========================================= */
  const GramStainLab = () => {
    const [step, setStep] = useState(0);
    const [mistakes, setMistakes] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [state, setState] = useState({
      heatFixed: false,
      crystalViolet: false,
      iodine: false,
      decolorizer: 0,
      safranin: false,
    });
    const [organism] = useState(() =>
      Math.random() > 0.5 ? "Gram-positive (S. aureus)" : "Gram-negative (E. coli)"
    );

    const steps = [
      "Prepare Smear & Heat Fix",
      "Crystal Violet (60s)",
      "Iodine (60s)",
      "Decolorizer (careful!)",
      "Safranin (60s)",
      "Microscope View",
      "Quiz & Finish",
    ];

    useEffect(() => {
      setExperimentProgress((p) => ({
        ...p,
        "gram-staining": Math.round(((step + 1) / steps.length) * 100),
      }));
    }, [step, steps.length]);

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));

    const applyHeatFix = () => {
      setState((s) => ({ ...s, heatFixed: true }));
      next();
    };
    const applyCrystalViolet = () => {
      if (!state.heatFixed) setMistakes((m) => [...m, "Fix the smear before staining."]);
      setState((s) => ({ ...s, crystalViolet: true }));
      next();
    };
    const applyIodine = () => {
      if (!state.crystalViolet) setMistakes((m) => [...m, "Add crystal violet before iodine."]);
      setState((s) => ({ ...s, iodine: true }));
      next();
    };
    const applyDecolorizer = () => {
      if (!state.iodine) setMistakes((m) => [...m, "Add iodine before decolorizer."]);
      setState((s) => ({ ...s, decolorizer: s.decolorizer + 1 }));
    };
    const applySafranin = () => {
      if (state.decolorizer === 0) setMistakes((m) => [...m, "Rinse with decolorizer first."]);
      setState((s) => ({ ...s, safranin: true }));
      next();
    };

    const overDecolorized = state.decolorizer > 3;
    const underDecolorized = state.decolorizer === 0;
    const colorForCells = () => {
      const isPos = organism.includes("positive");
      if (!state.crystalViolet) return "transparent";
      if (isPos) {
        if (overDecolorized) return state.safranin ? "pink" : "faint";
        return "purple";
      } else {
        if (underDecolorized) return "purple";
        return state.safranin ? "pink" : "colorless";
      }
    };

    const quizQ = [
      { q: "The mordant in Gram staining is:", options: ["Crystal violet", "Iodine", "Ethanol/Acetone", "Safranin"], correctIndex: 1 },
      { q: "Over-decolorization may cause Gram-positive to appear:", options: ["Purple", "Pink/Red", "Green", "Colorless"], correctIndex: 1 },
      { q: "Gram-negative cells appear what color after safranin?", options: ["Purple", "Pink/Red", "Blue", "Yellow"], correctIndex: 1 },
    ];

    const BacteriaField = () => {
      const color = colorForCells();
      const stroke =
        color === "purple"
          ? "#7c3aed"
          : color === "pink"
          ? "#ec4899"
          : color === "faint"
          ? "#a78bfa"
          : "#a1a1aa";
      return (
        <div className="bg-black p-4 rounded h-80 relative overflow-hidden border-4 border-gray-600">
          <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-black opacity-50" />
          <svg className="absolute inset-0" viewBox="0 0 600 400">
            {[...Array(70)].map((_, i) => {
              const x = Math.random() * 560 + 20;
              const y = Math.random() * 360 + 20;
              const len = 16 + Math.random() * 10;
              const ang = Math.random() * Math.PI * 2;
              const x2 = x + Math.cos(ang) * len;
              const y2 = y + Math.sin(ang) * len;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={y}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              );
            })}
          </svg>
          <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">1000× Oil</div>
        </div>
      );
    };

    const gradeAndFinish = (quizPct) => {
      const penalty = (overDecolorized ? 8 : 0) + (underDecolorized ? 6 : 0);
      const base = Math.max(65, 100 - mistakes.length * 6 - penalty);
      const finalScore = Math.round(base * 0.7 + quizPct * 0.3);
      completeExperiment("gram-staining", finalScore, overDecolorized ? "Gram Stain – Survivor" : "Gram Stain Pro");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentExperiment("dashboard")} className="text-white hover:text-blue-300">
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-white">Gram Staining Protocol</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>
          <p className="text-blue-200 mb-6">Organism: {organism}</p>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {step === 0 && (
              <div>
                <div className="bg-blue-50 p-4 rounded mb-4">Make a thin smear, air-dry, then gently heat-fix.</div>
                <button onClick={applyHeatFix} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Heat Fix</button>
              </div>
            )}
            {step === 1 && (
              <div>
                <div className="bg-purple-50 p-4 rounded mb-4">Flood with crystal violet (60 s), rinse.</div>
                <button onClick={applyCrystalViolet} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Apply Crystal Violet
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="bg-yellow-50 p-4 rounded mb-4">Add iodine (mordant) for 60 s, rinse.</div>
                <button onClick={applyIodine} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                  Apply Iodine
                </button>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="bg-red-50 p-4 rounded mb-4">Brief ethanol/acetone rinse. Don’t over-decolorize!</div>
                <div className="flex items-center gap-2">
                  <button onClick={applyDecolorizer} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Decolorize (+)</button>
                  <span className="text-white text-sm">Pulses: {state.decolorizer}</span>
                  <button onClick={() => setStep(4)} className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Continue</button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <div className="bg-rose-50 p-4 rounded mb-4">Counterstain with safranin (60 s), rinse and dry.</div>
                <button onClick={applySafranin} className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700">Apply Safranin</button>
              </div>
            )}
            {step === 5 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BacteriaField />
                <div className="text-sm text-blue-100 space-y-2">
                  <div className="bg-white/10 p-3 rounded">
                    <div><strong className="text-white">Result color:</strong> <span className="text-blue-200">{colorForCells()}</span></div>
                    <div><strong className="text-white">Decolorizer pulses:</strong> <span className="text-blue-200">{state.decolorizer}</span></div>
                    {overDecolorized && <div className="text-red-300">Over-decolorized — Gram+ may look pink.</div>}
                    {underDecolorized && <div className="text-yellow-300">Under-decolorized — Gram- may stay purple.</div>}
                  </div>
                  <button onClick={() => setStep(6)} className="bg-green-600 text-white px-4 py-2 rounded">Proceed to Quiz</button>
                </div>
              </div>
            )}
            {step === 6 && (
              <div>
                <div className="bg-blue-50 p-4 rounded">Answer 3 quick questions to finish.</div>
                <button onClick={() => setShowQuiz(true)} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Start Quiz</button>
                <QuizModal
                  isOpen={showQuiz}
                  onClose={() => setShowQuiz(false)}
                  questions={quizQ}
                  title="Gram Stain — Quiz"
                  onSubmit={(pct) => {
                    setShowQuiz(false);
                    gradeAndFinish(pct);
                  }}
                />
              </div>
            )}
          </div>

          {mistakes.length > 0 && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-4).map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =========================================
     PCR Simulation (minimal flow + quiz)
     ========================================= */
  const PCRSimulation = () => {
    const [step, setStep] = useState(0);
    const [mistakes, setMistakes] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const steps = [
      "Prepare Master Mix",
      "Set Thermal Cycler",
      "Run PCR (virtual)",
      "Gel Electrophoresis",
      "Quiz & Finish",
    ];
    useEffect(() => {
      setExperimentProgress((p) => ({
        ...p,
        "pcr-simulation": Math.round(((step + 1) / steps.length) * 100),
      }));
    }, [step, steps.length]);

    const [cycler, setCycler] = useState({ denat: 95, anneal: 55, extend: 72, cycles: 30 });
    const [bands, setBands] = useState([]);

    const startPCR = () => {
      if (cycler.cycles < 25 || cycler.cycles > 35) {
        setMistakes((m) => [...m, "Cycles should typically be ~30."]);
      }
      if (cycler.anneal < 50 || cycler.anneal > 65) {
        setMistakes((m) => [...m, "Annealing temp seems off for many primers (50–65°C)."]);
      }
      setStep(3);
      // generate bands
      const ok = cycler.cycles >= 25 && cycler.cycles <= 35 && cycler.anneal >= 50 && cycler.anneal <= 65;
      const simulated = ok ? [500, 1500] : [null];
      setBands(simulated);
    };

    const quizQ = [
      { q: "DNA polymerase used in PCR is typically:", options: ["T7", "Taq", "RNA pol II", "Ligase"], correctIndex: 1 },
      { q: "PCR cycle order:", options: ["Extend → Denature → Anneal", "Denature → Anneal → Extend", "Anneal → Denature → Extend", "Denature → Extend → Anneal"], correctIndex: 1 },
      { q: "Higher annealing temp generally:", options: ["Increases non-specific binding", "Decreases specificity", "Increases specificity", "Stops polymerase"], correctIndex: 2 },
    ];

    const gradeAndFinish = (quizPct) => {
      const base = Math.max(60, 100 - mistakes.length * 5);
      const finalScore = Math.round(base * 0.7 + quizPct * 0.3);
      completeExperiment("pcr-simulation", finalScore, "PCR Pilot");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-fuchsia-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentExperiment("dashboard")} className="text-white hover:text-blue-300">← Back</button>
            <h1 className="text-3xl font-bold text-white">PCR Amplification</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {step === 0 && (
              <div>
                <div className="bg-blue-50 p-4 rounded mb-3">Add template DNA, primers, dNTPs, buffer, Mg²⁺, Taq polymerase.</div>
                <button onClick={() => setStep(1)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Master Mix Ready</button>
              </div>
            )}
            {step === 1 && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-100 text-xs mb-1">Denature (°C)</label>
                    <input
                      value={cycler.denat}
                      onChange={(e) => setCycler((c) => ({ ...c, denat: Number(e.target.value) }))}
                      type="number"
                      className="px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-100 text-xs mb-1">Anneal (°C)</label>
                    <input
                      value={cycler.anneal}
                      onChange={(e) => setCycler((c) => ({ ...c, anneal: Number(e.target.value) }))}
                      type="number"
                      className="px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-100 text-xs mb-1">Extend (°C)</label>
                    <input
                      value={cycler.extend}
                      onChange={(e) => setCycler((c) => ({ ...c, extend: Number(e.target.value) }))}
                      type="number"
                      className="px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-100 text-xs mb-1">Cycles</label>
                    <input
                      value={cycler.cycles}
                      onChange={(e) => setCycler((c) => ({ ...c, cycles: Number(e.target.value) }))}
                      type="number"
                      className="px-2 py-1 rounded"
                    />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Save Settings</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="bg-green-50 p-4 rounded mb-3">Ready to run with current settings?</div>
                <button onClick={startPCR} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Run PCR</button>
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Gel (Simulated)</h4>
                  <div className="bg-gray-900 p-4 rounded h-64 relative">
                    {/* lanes */}
                    {[0, 1, 2].map((lane) => (
                      <div key={lane} className="absolute top-4 bottom-4" style={{ left: `${20 + lane * 25}%`, width: 6, background: "#111" }}>
                        {/* bands */}
                        {bands[0] === null ? (
                          <div className="absolute left-0 right-0 h-0.5 bg-gray-600 top-[30%]" />
                        ) : (
                          <>
                            <div className="absolute left-[-6px] right-[-6px] h-1 bg-blue-400" style={{ top: "35%" }} />
                            <div className="absolute left-[-6px] right-[-6px] h-1 bg-blue-400" style={{ top: "60%" }} />
                          </>
                        )}
                      </div>
                    ))}
                    <div className="absolute bottom-2 left-2 text-white text-xs">Ladder • Sample 1 • Sample 2</div>
                  </div>
                </div>
                <div className="text-sm text-blue-100 space-y-2">
                  <div className="bg-white/10 p-3 rounded">
                    <div><strong className="text-white">Cycles:</strong> {cycler.cycles}</div>
                    <div><strong className="text-white">Anneal:</strong> {cycler.anneal} °C</div>
                    <div><strong className="text-white">Bands:</strong> {bands[0] === null ? "No specific product" : "500 bp & 1500 bp"}</div>
                  </div>
                  <button onClick={() => setStep(4)} className="bg-green-600 text-white px-4 py-2 rounded">Proceed to Quiz</button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <div className="bg-blue-50 p-4 rounded">Answer 3 quick questions to finish.</div>
                <button onClick={() => setShowQuiz(true)} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">Start Quiz</button>
                <QuizModal
                  isOpen={showQuiz}
                  onClose={() => setShowQuiz(false)}
                  questions={quizQ}
                  title="PCR — Quiz"
                  onSubmit={(pct) => {
                    setShowQuiz(false);
                    gradeAndFinish(pct);
                  }}
                />
              </div>
            )}
          </div>

          {mistakes.length > 0 && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-4).map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =========================================
     Router: pick which screen to show
     ========================================= */
  const Screen = () => {
    if (currentExperiment === "dashboard") return <Dashboard />;
    if (currentExperiment === "bradford-assay") return <BradfordAssay />;
    if (currentExperiment === "cell-staining") return <CytoskeletonStaining />;
    if (currentExperiment === "osmotic-solutions") return <OsmosisLab />;
    if (currentExperiment === "gram-staining") return <GramStainLab />;
    if (currentExperiment === "pcr-simulation") return <PCRSimulation />;
    return <Dashboard />;
  };

  return <Screen />;
};

export default BiomedicalLabPlatform;
