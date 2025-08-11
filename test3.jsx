import React, { useState, useEffect } from 'react';
import { 
  Beaker, 
  Microscope, 
  Thermometer, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Award,
  Eye,
  Droplets,
  Zap,
  FlaskConical,
  AlertTriangle,
  Calculator,
  Download,
  Plus,
  Minus,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Target,
  Clock,
  Flame,
  Pipette,
  TestTube,
  User,
  LogOut,
  Trophy,
  Star,
  Menu,
  Check,
  X,
  Volume2,
  VolumeX,
  RotateCw,
  Syringe,
  FlaskRound,
  Ruler,
  Scale
} from 'lucide-react';

const BiomedicalLabPlatform = () => {
  // Authentication and User State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('labUsers') || '[]');
    } catch {
      return [];
    }
  });

  // Navigation State
  const [currentExperiment, setCurrentExperiment] = useState('dashboard');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPreLab, setShowPreLab] = useState(false);

  // Enhanced User Profile
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    email: '',
    experimentsCompleted: 0,
    badges: [],
    totalScore: 0,
    quizScores: {},
    labProgress: {},
    achievements: [],
    joinDate: new Date().toISOString(),
    lastActive: new Date().toISOString()
  });

  // Load user data on login
  useEffect(() => {
    if (currentUser) {
      const userData = users.find(u => u.email === currentUser.email);
      if (userData) {
        setStudentProfile(userData);
      }
    }
  }, [currentUser, users]);

  // Save user data
  const saveUserData = (updatedProfile) => {
    const updatedUsers = users.map(u => 
      u.email === currentUser.email ? { ...updatedProfile, lastActive: new Date().toISOString() } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('labUsers', JSON.stringify(updatedUsers));
    setStudentProfile(updatedProfile);
  };

  // Dashboard Component
  const Dashboard = () => {
    if (!isLoggedIn) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Microscope className="w-12 h-12 text-blue-400 mr-4" />
                <h1 className="text-5xl font-bold text-white">Virtual Biomedical Lab</h1>
              </div>
              <p className="text-xl text-blue-200 mb-8">Interactive Laboratory Simulations for BME Students</p>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Login to Start Learning
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(experiments).map(([key, experiment]) => (
                <div
                  key={key}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
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
                </div>
              ))}
            </div>
          </div>
          {showLogin && <LoginForm />}
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with User Info */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Microscope className="w-10 h-10 text-blue-400 mr-4" />
              <h1 className="text-4xl font-bold text-white">Virtual Biomedical Lab</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <User className="w-5 h-5 text-white mr-2" />
                <span className="text-white">{studentProfile.name}</span>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser(null);
                  setStudentProfile({
                    name: '',
                    email: '',
                    experimentsCompleted: 0,
                    badges: [],
                    totalScore: 0,
                    quizScores: {},
                    labProgress: {},
                    achievements: [],
                    joinDate: new Date().toISOString(),
                    lastActive: new Date().toISOString()
                  });
                }}
                className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Welcome back, {studentProfile.name}!</h2>
                <div className="space-y-2 text-blue-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {studentProfile.experimentsCompleted} Experiments Completed
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    {studentProfile.badges.length} Badges Earned
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    {studentProfile.totalScore} Total Points
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {Math.round((studentProfile.experimentsCompleted / Object.keys(experiments).length) * 100)}%
                </div>
                <div className="text-blue-200">Overall Progress</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(studentProfile.experimentsCompleted / Object.keys(experiments).length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Recent Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.badges.slice(-3).map((badge, index) => (
                    <span key={index} className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">
                      {badge}
                    </span>
                  ))}
                  {studentProfile.badges.length === 0 && (
                    <span className="text-gray-400 text-sm">Complete experiments to earn badges!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Experiments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(experiments).map(([key, experiment]) => {
              const isCompleted = studentProfile.experimentsCompleted > 0 && studentProfile.labProgress[key];
              const quizScore = studentProfile.quizScores[key];
              
              return (
                <div
                  key={key}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => {
                    setCurrentExperiment(key);
                  }}
                >
                  <div className={`w-16 h-16 ${experiment.color} rounded-2xl flex items-center justify-center mb-4 text-white relative`}>
                    {experiment.icon}
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{experiment.title}</h3>
                  <p className="text-blue-200 mb-4">{experiment.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm text-blue-300">
                      <span className="px-3 py-1 bg-blue-500/30 rounded-full">{experiment.difficulty}</span>
                      <span className="flex items-center">
                        <Timer className="w-4 h-4 mr-1" />
                        {experiment.duration}
                      </span>
                    </div>
                    
                    {quizScore && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-yellow-300">Quiz Score:</span>
                        <span className={`font-semibold ${quizScore >= 70 ? 'text-green-400' : 'text-red-400'}`}>
                          {quizScore}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {experiment.tools.slice(0, 3).map(tool => (
                      <span key={tool} className="bg-gray-500/30 text-gray-300 px-2 py-1 rounded text-xs">
                        {tool}
                      </span>
                    ))}
                    {experiment.tools.length > 3 && (
                      <span className="bg-gray-500/30 text-gray-300 px-2 py-1 rounded text-xs">
                        +{experiment.tools.length - 3}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                    {isCompleted ? 'Review Lab' : 'Start Lab'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Main render function
  return (
    <div className="min-h-screen bg-gray-100">
      {currentExperiment === 'dashboard' && <Dashboard />}
      {currentExperiment === 'osmotic-solutions' && <OsmoticSolutionsDemo />}
    </div>
  );
};

export default BiomedicalLabPlatform;

  // Enhanced experiments configuration with quizzes
  const experiments = {
    'osmotic-solutions': {
      title: 'Osmotic Solutions Lab',
      description: 'Study isotonic, hypotonic, and hypertonic solutions using onion cells and RBCs',
      difficulty: 'Beginner',
      duration: '45 min',
      icon: <Droplets className="w-6 h-6" />,
      color: 'bg-blue-500',
      tools: ['microscope', 'slides', 'coverslips', 'pipette', 'solutions'],
      quiz: {
        questions: [
          {
            question: "What happens to plant cells in a hypotonic solution?",
            options: ["They shrink", "They become turgid", "They burst", "No change"],
            correct: 1,
            explanation: "Plant cells become turgid as water enters the cell, but the cell wall prevents bursting."
          },
          {
            question: "What is the process called when the cell membrane pulls away from the cell wall?",
            options: ["Hemolysis", "Crenation", "Plasmolysis", "Turgidity"],
            correct: 2,
            explanation: "Plasmolysis occurs when water leaves plant cells in hypertonic solutions."
          },
          {
            question: "Which solution has the same concentration as the cell's interior?",
            options: ["Hypotonic", "Hypertonic", "Isotonic", "Concentrated"],
            correct: 2,
            explanation: "Isotonic solutions have the same solute concentration as the cell's cytoplasm."
          }
        ]
      }
    },
    'bradford-assay': {
      title: 'Bradford Protein Assay',
      description: 'Quantify protein concentration using BSA standards and microplate reader',
      difficulty: 'Intermediate', 
      duration: '60 min',
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'bg-purple-500',
      tools: ['pipettes', 'microplate', 'bradford-reagent', 'spectrophotometer', 'standards'],
      quiz: {
        questions: [
          {
            question: "What does the Bradford assay measure?",
            options: ["DNA concentration", "Protein concentration", "RNA concentration", "Cell viability"],
            correct: 1,
            explanation: "The Bradford assay specifically measures protein concentration using Coomassie Blue dye."
          },
          {
            question: "What wavelength is used to measure absorbance in the Bradford assay?",
            options: ["280 nm", "260 nm", "595 nm", "490 nm"],
            correct: 2,
            explanation: "The Bradford assay measures absorbance at 595 nm where the protein-dye complex absorbs."
          },
          {
            question: "What is the purpose of BSA standards in the Bradford assay?",
            options: ["To block binding sites", "To create a calibration curve", "To denature proteins", "To buffer the solution"],
            correct: 1,
            explanation: "BSA standards of known concentrations are used to create a standard curve for quantification."
          }
        ]
      }
    },
    'pcr-simulation': {
      title: 'PCR Amplification',
      description: 'Simulate DNA amplification with thermal cycling and gel electrophoresis',
      difficulty: 'Advanced',
      duration: '90 min',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-red-500',
      tools: ['thermal-cycler', 'pipettes', 'pcr-tubes', 'gel-apparatus', 'primers'],
      quiz: {
        questions: [
          {
            question: "What is the purpose of the denaturation step in PCR?",
            options: ["Primers bind to DNA", "DNA strands separate", "DNA synthesis occurs", "Proteins denature"],
            correct: 1,
            explanation: "Denaturation at 95°C separates the double-stranded DNA into single strands."
          },
          {
            question: "At what temperature do primers typically anneal?",
            options: ["95°C", "72°C", "55°C", "37°C"],
            correct: 2,
            explanation: "Primers typically anneal at 50-65°C, with 55°C being common for many primer pairs."
          },
          {
            question: "What enzyme is responsible for DNA synthesis in PCR?",
            options: ["DNA ligase", "DNA helicase", "Taq polymerase", "Reverse transcriptase"],
            correct: 2,
            explanation: "Taq polymerase is a heat-stable DNA polymerase that synthesizes new DNA strands."
          }
        ]
      }
    },
    'gram-staining': {
      title: 'Gram Staining Protocol',
      description: 'Differentiate bacteria using crystal violet, iodine, decolorizer and safranin',
      difficulty: 'Intermediate',
      duration: '75 min',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-yellow-500',
      tools: ['microscope', 'stains', 'slides', 'bunsen-burner', 'inoculation-loop'],
      quiz: {
        questions: [
          {
            question: "What is the primary stain in Gram staining?",
            options: ["Safranin", "Crystal violet", "Iodine", "Methylene blue"],
            correct: 1,
            explanation: "Crystal violet is the primary stain that colors all bacteria purple initially."
          },
          {
            question: "What color are Gram-positive bacteria after complete staining?",
            options: ["Pink", "Purple", "Blue", "Green"],
            correct: 1,
            explanation: "Gram-positive bacteria retain the crystal violet and appear purple/violet."
          },
          {
            question: "What is the role of iodine in Gram staining?",
            options: ["Primary stain", "Counterstain", "Mordant", "Decolorizer"],
            correct: 2,
            explanation: "Iodine acts as a mordant, fixing the crystal violet to the peptidoglycan layer."
          }
        ]
      }
    },
    'cell-staining': {
      title: 'Cytoskeleton & Nucleus Staining',
      description: 'Visualize actin filaments with phalloidin and nuclei with DAPI',
      difficulty: 'Advanced',
      duration: '100 min',
      icon: <Beaker className="w-6 h-6" />,
      color: 'bg-indigo-500',
      tools: ['fluorescence-microscope', 'dapi', 'phalloidin', 'cell-culture', 'blocking-buffer'],
      quiz: {
        questions: [
          {
            question: "What does DAPI specifically bind to?",
            options: ["Proteins", "RNA", "DNA", "Lipids"],
            correct: 2,
            explanation: "DAPI binds specifically to A-T rich regions in DNA, staining cell nuclei."
          },
          {
            question: "What cellular structure does phalloidin stain?",
            options: ["Microtubules", "Actin filaments", "Intermediate filaments", "Ribosomes"],
            correct: 1,
            explanation: "Phalloidin specifically binds to F-actin (actin filaments) in the cytoskeleton."
          },
          {
            question: "Why is cell permeabilization necessary?",
            options: ["To kill the cells", "To allow stains to enter cells", "To fix the cells", "To block non-specific binding"],
            correct: 1,
            explanation: "Permeabilization creates pores in the cell membrane allowing staining reagents to enter."
          }
        ]
      }
    }
  };

  // Lab Tools Component
  const LabTools = ({ availableTools, onToolSelect, selectedTool }) => {
    const toolDefinitions = {
      'microscope': { name: 'Light Microscope', icon: <Microscope className="w-8 h-8" />, color: 'bg-gray-600' },
      'fluorescence-microscope': { name: 'Fluorescence Microscope', icon: <Microscope className="w-8 h-8" />, color: 'bg-purple-600' },
      'slides': { name: 'Glass Slides', icon: <Ruler className="w-8 h-8" />, color: 'bg-blue-400' },
      'coverslips': { name: 'Cover Slips', icon: <Ruler className="w-8 h-8" />, color: 'bg-blue-300' },
      'pipette': { name: 'Pipettes', icon: <Pipette className="w-8 h-8" />, color: 'bg-green-500' },
      'pipettes': { name: 'Pipette Set', icon: <Pipette className="w-8 h-8" />, color: 'bg-green-500' },
      'solutions': { name: 'Test Solutions', icon: <TestTube className="w-8 h-8" />, color: 'bg-orange-500' },
      'microplate': { name: 'Microplate', icon: <BarChart3 className="w-8 h-8" />, color: 'bg-gray-500' },
      'bradford-reagent': { name: 'Bradford Reagent', icon: <FlaskConical className="w-8 h-8" />, color: 'bg-blue-600' },
      'spectrophotometer': { name: 'Spectrophotometer', icon: <Calculator className="w-8 h-8" />, color: 'bg-indigo-600' },
      'standards': { name: 'BSA Standards', icon: <TestTube className="w-8 h-8" />, color: 'bg-purple-400' },
      'thermal-cycler': { name: 'Thermal Cycler', icon: <Thermometer className="w-8 h-8" />, color: 'bg-red-600' },
      'pcr-tubes': { name: 'PCR Tubes', icon: <TestTube className="w-8 h-8" />, color: 'bg-red-400' },
      'gel-apparatus': { name: 'Gel Electrophoresis', icon: <BarChart3 className="w-8 h-8" />, color: 'bg-blue-500' },
      'primers': { name: 'PCR Primers', icon: <FlaskRound className="w-8 h-8" />, color: 'bg-yellow-500' },
      'stains': { name: 'Staining Kit', icon: <Droplets className="w-8 h-8" />, color: 'bg-pink-500' },
      'bunsen-burner': { name: 'Bunsen Burner', icon: <Flame className="w-8 h-8" />, color: 'bg-orange-600' },
      'inoculation-loop': { name: 'Inoculation Loop', icon: <RotateCw className="w-8 h-8" />, color: 'bg-gray-600' },
      'dapi': { name: 'DAPI Stain', icon: <Droplets className="w-8 h-8" />, color: 'bg-blue-600' },
      'phalloidin': { name: 'Phalloidin-Alexa', icon: <Droplets className="w-8 h-8" />, color: 'bg-green-600' },
      'cell-culture': { name: 'Cell Culture Plate', icon: <BarChart3 className="w-8 h-8" />, color: 'bg-teal-500' },
      'blocking-buffer': { name: 'Blocking Buffer', icon: <FlaskConical className="w-8 h-8" />, color: 'bg-yellow-600' }
    };

    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Available Lab Tools
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {availableTools.map(toolKey => {
            const tool = toolDefinitions[toolKey];
            if (!tool) return null;
            
            return (
              <button
                key={toolKey}
                onClick={() => onToolSelect(toolKey)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedTool === toolKey 
                    ? 'border-yellow-400 bg-yellow-400/20' 
                    : 'border-white/30 bg-white/10 hover:border-white/50'
                }`}
              >
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white`}>
                  {tool.icon}
                </div>
                <p className="text-xs text-white text-center">{tool.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Authentication Components
  const LoginForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      if (isRegistering) {
        // Registration
        if (users.find(u => u.email === formData.email)) {
          setError('Email already exists');
          return;
        }
        
        const newUser = {
          ...formData,
          experimentsCompleted: 0,
          badges: [],
          totalScore: 0,
          quizScores: {},
          labProgress: {},
          achievements: [],
          joinDate: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('labUsers', JSON.stringify(updatedUsers));
        setCurrentUser(newUser);
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        // Login
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
          setShowLogin(false);
        } else {
          setError('Invalid email or password');
        }
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-md relative">
          <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
          <div onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-500 hover:underline"
            >
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

  // Simple Osmotic Solutions Lab Demo
  const OsmoticSolutionsDemo = () => {
    const [step, setStep] = useState(0);
    const [selectedTool, setSelectedTool] = useState(null);
    const [solutions, setSolutions] = useState({
      A: { name: 'Solution A', type: 'hypotonic', revealed: false },
      B: { name: 'Solution B', type: 'isotonic', revealed: false },
      C: { name: 'Solution C', type: 'hypertonic', revealed: false }
    });

    const steps = [
      "Prepare Materials",
      "Apply Solutions", 
      "Observe Results",
      "Analyze Data"
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-blue-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Osmotic Solutions Lab</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-cyan-200 mt-2">{steps[step]}</p>
          </div>

          <LabTools 
            availableTools={experiments['osmotic-solutions'].tools}
            onToolSelect={setSelectedTool}
            selectedTool={selectedTool}
          />

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-6">
            {step === 0 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Prepare Materials and Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Materials Checklist:</h4>
                    <div className="space-y-2">
                      {[
                        'Light microscope',
                        'Glass slides and coverslips', 
                        'Micropipettes',
                        'Purple onion',
                        'Blood sample',
                        'Test solutions A, B, C'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">Lab Safety Reminder</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Handle glass slides carefully</li>
                      <li>• Dispose of biological samples properly</li>
                      <li>• Clean work surface before and after</li>
                      <li>• Wash hands thoroughly</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Materials Ready - Continue
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Apply Test Solutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Available Solutions:</h4>
                    <div className="space-y-3">
                      {Object.entries(solutions).map(([key, solution]) => (
                        <div key={key} className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              if (selectedTool === 'pipette') {
                                alert(`Applied ${solution.name} to cell samples`);
                              } else {
                                alert('Select pipette tool first to apply solutions');
                              }
                            }}
                            className="w-12 h-16 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center hover:bg-blue-300 transition-colors"
                          >
                            <span className="font-bold text-blue-800">{key}</span>
                          </button>
                          <div>
                            <p className="font-semibold">{solution.name}</p>
                            <p className="text-xs text-gray-600">Unknown composition</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-64 bg-gray-100 rounded-lg border-2 border-gray-300">
                    <h4 className="font-semibold mb-2 text-center">Cell Samples on Slides</h4>
                    <div className="flex justify-center items-center h-full">
                      <div className="text-center">
                        <div className="w-24 h-16 bg-purple-200 rounded mx-auto mb-2"></div>
                        <p className="text-sm">Onion Cells</p>
                      </div>
                      <div className="text-center ml-8">
                        <div className="w-24 h-16 bg-red-200 rounded mx-auto mb-2"></div>
                        <p className="text-sm">Blood Cells</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Solutions Applied - Observe Results
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Observe Microscopic Results</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Expected Observations:</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded">
                        <h5 className="font-semibold text-blue-800">Hypotonic Solution:</h5>
                        <p className="text-sm text-blue-700">
                          Plant cells: Turgid (swollen)<br/>
                          Animal cells: Hemolysis (bursting)
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <h5 className="font-semibold text-yellow-800">Isotonic Solution:</h5>
                        <p className="text-sm text-yellow-700">
                          Both cell types: No change
                        </p>
                      </div>
                      <div className="p-3 bg-red-50 rounded">
                        <h5 className="font-semibold text-red-800">Hypertonic Solution:</h5>
                        <p className="text-sm text-red-700">
                          Plant cells: Plasmolysis (shrinking)<br/>
                          Animal cells: Crenation (shriveling)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-center">Microscope View (400x):</h4>
                    <div className="w-80 h-80 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Microscope className="w-16 h-16 mx-auto mb-2" />
                          <p className="text-sm">Select microscope tool to view cells</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        400x Magnification
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Continue to Analysis
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Data Analysis and Conclusions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Solution Identification:</h4>
                    <div className="space-y-4">
                      {Object.entries(solutions).map(([key, solution]) => (
                        <div key={key} className="p-4 border rounded">
                          <p className="font-semibold">Solution {key}</p>
                          <button
                            onClick={() => {
                              setSolutions(prev => ({
                                ...prev,
                                [key]: { ...prev[key], revealed: true }
                              }));
                            }}
                            disabled={solution.revealed}
                            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-green-500"
                          >
                            {solution.revealed ? `✓ ${solution.type}` : 'Reveal Identity'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Lab Summary:</h4>
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-semibold text-green-800 mb-2">Key Results:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Hypotonic: Cell swelling (turgid/hemolysis)</li>
                        <li>• Isotonic: No change</li>
                        <li>• Hypertonic: Cell shrinkage (plasmolysis/crenation)</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 p-4 rounded">
                      <h5 className="font-semibold text-blue-800 mb-2">Learning Outcomes:</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Understanding osmosis principles</li>
                        <li>• Cell wall vs membrane differences</li>
                        <li>• Solution tonicity effects</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {Object.values(solutions).every(s => s.revealed) && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        const updatedProfile = {
                          ...studentProfile,
                          experimentsCompleted: studentProfile.experimentsCompleted + 1,
                          totalScore: studentProfile.totalScore + 100,
                          labProgress: {
                            ...studentProfile.labProgress,
                            'osmotic-solutions': 'completed'
                          },
                          badges: [...new Set([...studentProfile.badges, 'Osmosis Expert'])]
                        };
                        saveUserData(updatedProfile);
                        setCurrentExperiment('dashboard');
                      }}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600"
                    >
                      Complete Lab & Return to Dashboard
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
