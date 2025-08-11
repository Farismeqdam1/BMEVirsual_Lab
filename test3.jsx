import React, { useState, useEffect, useRef } from 'react';
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
  LogIn,
  LogOut,
  User,
  Trophy,
  Brain,
  FileQuestion,
  Star,
  Lock,
  Unlock,
  ChevronUp,
  ChevronDown,
  ClipboardCheck,
  FlaskRound,
  Activity
} from 'lucide-react';

const BiomedicalLabPlatform = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  
  // Platform State
  const [currentExperiment, setCurrentExperiment] = useState('dashboard');
  const [experimentProgress, setExperimentProgress] = useState({});
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  
  // User Progress Tracking
  const [userProgress, setUserProgress] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  
  // Load saved data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedProgress = localStorage.getItem('userProgress');
    const savedLeaderboard = localStorage.getItem('leaderboard');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (currentUser && userProgress[currentUser.email]) {
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
      updateLeaderboard();
    }
  }, [userProgress, currentUser]);

  // Authentication Component
  const AuthenticationScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      studentId: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      if (isSignUp) {
        // Sign up logic
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        
        if (users[formData.email]) {
          setError('User already exists');
          return;
        }

        const newUser = {
          email: formData.email,
          name: formData.name,
          studentId: formData.studentId,
          joinedAt: new Date().toISOString()
        };

        users[formData.email] = {
          ...newUser,
          password: formData.password
        };

        localStorage.setItem('users', JSON.stringify(users));
        
        // Initialize user progress
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        progress[formData.email] = {
          experimentsCompleted: 0,
          totalScore: 0,
          badges: [],
          quizScores: {},
          experimentDetails: {}
        };
        setUserProgress(progress);
        localStorage.setItem('userProgress', JSON.stringify(progress));

        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setIsAuthenticated(true);
      } else {
        // Sign in logic
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[formData.email];

        if (!user || user.password !== formData.password) {
          setError('Invalid email or password');
          return;
        }

        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        // Load user progress
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        if (progress[formData.email]) {
          setExperimentProgress(progress[formData.email].experimentDetails || {});
          setCompletedQuizzes(progress[formData.email].quizScores || {});
        }
        
        setIsAuthenticated(true);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <Microscope className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Virtual Biomedical Lab</h1>
            <p className="text-blue-200">{isSignUp ? 'Create your account' : 'Welcome back!'}</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  required
                />
              </>
            )}
            
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setFormData({ email: '', password: '', name: '', studentId: '' });
              }}
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Update leaderboard
  const updateLeaderboard = () => {
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    const leaderboardData = Object.entries(progress).map(([email, data]) => ({
      email,
      name: users[email]?.name || 'Unknown',
      studentId: users[email]?.studentId || 'N/A',
      score: data.totalScore || 0,
      experimentsCompleted: data.experimentsCompleted || 0,
      badges: data.badges?.length || 0,
      averageQuizScore: calculateAverageQuizScore(data.quizScores || {})
    })).sort((a, b) => b.score - a.score);

    setLeaderboard(leaderboardData);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
  };

  const calculateAverageQuizScore = (quizScores) => {
    const scores = Object.values(quizScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  // Quiz Component
  const QuizComponent = ({ experimentKey, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const quizzes = {
      'osmotic-solutions': {
        title: 'Osmotic Solutions Quiz',
        questions: [
          {
            question: 'What happens to a plant cell in a hypotonic solution?',
            options: [
              'The cell shrinks',
              'The cell becomes turgid',
              'The cell lyses',
              'No change occurs'
            ],
            correct: 1,
            explanation: 'In a hypotonic solution, water enters the plant cell, making it turgid (swollen) but the cell wall prevents lysis.'
          },
          {
            question: 'Which solution has the same concentration of solutes as the cell?',
            options: [
              'Hypotonic',
              'Hypertonic',
              'Isotonic',
              'Distilled water'
            ],
            correct: 2,
            explanation: 'An isotonic solution has the same solute concentration as the cell, resulting in no net water movement.'
          },
          {
            question: 'What is plasmolysis?',
            options: [
              'Cell swelling',
              'Cell division',
              'Cell membrane pulling away from cell wall',
              'Cell death'
            ],
            correct: 2,
            explanation: 'Plasmolysis occurs when a plant cell loses water in a hypertonic solution, causing the membrane to pull away from the cell wall.'
          },
          {
            question: 'What happens to red blood cells in distilled water?',
            options: [
              'Crenation',
              'Hemolysis',
              'No change',
              'Plasmolysis'
            ],
            correct: 1,
            explanation: 'Red blood cells undergo hemolysis (bursting) in distilled water (hypotonic solution) due to excessive water influx.'
          },
          {
            question: 'Which concentration is typically isotonic to human blood?',
            options: [
              '0.45% NaCl',
              '0.9% NaCl',
              '3% NaCl',
              '10% NaCl'
            ],
            correct: 1,
            explanation: '0.9% NaCl (normal saline) is isotonic to human blood plasma.'
          }
        ]
      },
      'bradford-assay': {
        title: 'Bradford Protein Assay Quiz',
        questions: [
          {
            question: 'What is the principle behind the Bradford assay?',
            options: [
              'Protein precipitation',
              'Coomassie Blue binding to proteins',
              'Enzyme activity measurement',
              'DNA-protein interaction'
            ],
            correct: 1,
            explanation: 'The Bradford assay is based on Coomassie Brilliant Blue G-250 binding to proteins, causing a color shift.'
          },
          {
            question: 'At what wavelength is absorbance measured in Bradford assay?',
            options: [
              '280 nm',
              '465 nm',
              '595 nm',
              '660 nm'
            ],
            correct: 2,
            explanation: 'Absorbance is measured at 595 nm, where the protein-dye complex has maximum absorption.'
          },
          {
            question: 'Which amino acids does Coomassie Blue primarily bind to?',
            options: [
              'Hydrophobic amino acids',
              'Basic amino acids (Arg, Lys, His)',
              'Acidic amino acids',
              'All amino acids equally'
            ],
            correct: 1,
            explanation: 'Coomassie Blue primarily binds to basic amino acids: arginine, lysine, and histidine.'
          },
          {
            question: 'What is used as the protein standard in Bradford assay?',
            options: [
              'Hemoglobin',
              'Albumin (BSA)',
              'Casein',
              'Collagen'
            ],
            correct: 1,
            explanation: 'Bovine Serum Albumin (BSA) is commonly used as the protein standard.'
          },
          {
            question: 'What is the purpose of creating a standard curve?',
            options: [
              'To measure pH',
              'To calculate unknown protein concentration',
              'To determine enzyme activity',
              'To measure cell count'
            ],
            correct: 1,
            explanation: 'The standard curve relates absorbance to known protein concentrations, allowing calculation of unknown samples.'
          }
        ]
      },
      'pcr-simulation': {
        title: 'PCR Amplification Quiz',
        questions: [
          {
            question: 'What is the typical denaturation temperature in PCR?',
            options: [
              '55°C',
              '72°C',
              '95°C',
              '37°C'
            ],
            correct: 2,
            explanation: 'DNA denaturation typically occurs at 95°C to separate the double strands.'
          },
          {
            question: 'What enzyme is used in PCR?',
            options: [
              'DNA ligase',
              'RNA polymerase',
              'Taq polymerase',
              'Restriction enzyme'
            ],
            correct: 2,
            explanation: 'Taq polymerase, from Thermus aquaticus, is heat-stable and used for DNA synthesis in PCR.'
          },
          {
            question: 'What determines the specificity of PCR?',
            options: [
              'Temperature only',
              'Primer design',
              'DNA concentration',
              'Buffer pH'
            ],
            correct: 1,
            explanation: 'Primer design determines PCR specificity by targeting specific DNA sequences.'
          },
          {
            question: 'After 30 PCR cycles, approximately how many copies are produced?',
            options: [
              '30 copies',
              '900 copies',
              '1 million copies',
              '1 billion copies'
            ],
            correct: 3,
            explanation: 'PCR amplifies DNA exponentially; 2^30 ≈ 1 billion copies.'
          },
          {
            question: 'What is the purpose of the annealing step?',
            options: [
              'DNA separation',
              'Primer binding to template',
              'DNA synthesis',
              'Product verification'
            ],
            correct: 1,
            explanation: 'During annealing, primers bind to their complementary sequences on the template DNA.'
          }
        ]
      },
      'gram-staining': {
        title: 'Gram Staining Quiz',
        questions: [
          {
            question: 'What color do Gram-positive bacteria appear after staining?',
            options: [
              'Pink/Red',
              'Purple/Violet',
              'Green',
              'Yellow'
            ],
            correct: 1,
            explanation: 'Gram-positive bacteria retain crystal violet and appear purple/violet.'
          },
          {
            question: 'What is the function of iodine in Gram staining?',
            options: [
              'Primary stain',
              'Mordant',
              'Decolorizer',
              'Counterstain'
            ],
            correct: 1,
            explanation: 'Iodine acts as a mordant, forming complexes with crystal violet to fix the stain.'
          },
          {
            question: 'Which component removes stain from Gram-negative bacteria?',
            options: [
              'Crystal violet',
              'Iodine',
              'Alcohol/Acetone',
              'Safranin'
            ],
            correct: 2,
            explanation: 'Alcohol or acetone decolorizer removes the crystal violet-iodine complex from Gram-negative bacteria.'
          },
          {
            question: 'What structural difference causes the staining difference?',
            options: [
              'Cell membrane composition',
              'Peptidoglycan layer thickness',
              'Presence of flagella',
              'Nuclear structure'
            ],
            correct: 1,
            explanation: 'Gram-positive bacteria have thick peptidoglycan layers that retain the stain.'
          },
          {
            question: 'What is the counterstain used in Gram staining?',
            options: [
              'Crystal violet',
              'Methylene blue',
              'Safranin',
              'Malachite green'
            ],
            correct: 2,
            explanation: 'Safranin is the counterstain that colors decolorized Gram-negative bacteria pink/red.'
          }
        ]
      },
      'cell-staining': {
        title: 'Fluorescence Staining Quiz',
        questions: [
          {
            question: 'What does phalloidin specifically bind to?',
            options: [
              'DNA',
              'F-actin',
              'Microtubules',
              'Cell membrane'
            ],
            correct: 1,
            explanation: 'Phalloidin specifically binds to F-actin (filamentous actin) in the cytoskeleton.'
          },
          {
            question: 'What does DAPI stain?',
            options: [
              'Proteins',
              'Lipids',
              'DNA/Nuclei',
              'Mitochondria'
            ],
            correct: 2,
            explanation: 'DAPI binds to DNA, specifically A-T rich regions, staining cell nuclei.'
          },
          {
            question: 'Why is cell permeabilization necessary?',
            options: [
              'To kill the cells',
              'To allow stains to enter cells',
              'To fix the cells',
              'To remove proteins'
            ],
            correct: 1,
            explanation: 'Permeabilization creates pores in the membrane, allowing staining reagents to enter and bind intracellular structures.'
          },
          {
            question: 'What is the purpose of blocking with BSA?',
            options: [
              'Cell fixation',
              'Prevent non-specific binding',
              'Enhance fluorescence',
              'Preserve samples'
            ],
            correct: 1,
            explanation: 'BSA blocks non-specific binding sites, reducing background fluorescence.'
          },
          {
            question: 'What color fluorescence does Alexa Fluor 488 produce?',
            options: [
              'Blue',
              'Green',
              'Red',
              'Yellow'
            ],
            correct: 1,
            explanation: 'Alexa Fluor 488 produces green fluorescence when excited with blue light.'
          }
        ]
      }
    };

    const quiz = quizzes[experimentKey];
    if (!quiz) return null;

    const handleAnswer = (optionIndex) => {
      setAnswers({
        ...answers,
        [currentQuestion]: optionIndex
      });
    };

    const handleNext = () => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateScore();
      }
    };

    const calculateScore = () => {
      let correct = 0;
      quiz.questions.forEach((q, index) => {
        if (answers[index] === q.correct) {
          correct++;
        }
      });
      const finalScore = Math.round((correct / quiz.questions.length) * 100);
      setScore(finalScore);
      setShowResults(true);
      
      // Save quiz score
      if (currentUser) {
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        if (!progress[currentUser.email]) {
          progress[currentUser.email] = {
            experimentsCompleted: 0,
            totalScore: 0,
            badges: [],
            quizScores: {},
            experimentDetails: {}
          };
        }
        progress[currentUser.email].quizScores[experimentKey] = finalScore;
        localStorage.setItem('userProgress', JSON.stringify(progress));
        setUserProgress(progress);
      }
    };

    if (showResults) {
      return (
        <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
          
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-2 ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <p className="text-gray-600">
              You got {quiz.questions.filter((q, i) => answers[i] === q.correct).length} out of {quiz.questions.length} questions correct
            </p>
            {score >= 80 && (
              <div className="mt-4">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <p className="text-green-600 font-semibold">Excellent work! You've mastered this topic!</p>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {quiz.questions.map((q, index) => (
              <div key={index} className={`p-4 rounded-lg border ${answers[index] === q.correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                <p className="text-sm">
                  Your answer: <span className={answers[index] === q.correct ? 'text-green-600' : 'text-red-600'}>
                    {q.options[answers[index]]}
                  </span>
                </p>
                {answers[index] !== q.correct && (
                  <p className="text-sm text-green-600 mt-1">
                    Correct answer: {q.options[q.correct]}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-2 italic">{q.explanation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onComplete(score)}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue to Next Experiment
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className="text-sm text-gray-600">
              {Object.keys(answers).length} answered
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestion].question}</h3>
          
          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className={`px-6 py-2 rounded-lg transition-colors ${
              answers[currentQuestion] !== undefined
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  };

  // Enhanced experiments configuration
  const experiments = {
    'osmotic-solutions': {
      title: 'Osmotic Solutions Lab',
      description: 'Study isotonic, hypotonic, and hypertonic solutions using onion cells and RBCs',
      difficulty: 'Beginner',
      duration: '45 min',
      icon: <Droplets className="w-6 h-6" />,
      color: 'bg-blue-500',
      requiredScore: 0,
      locked: false
    },
    'bradford-assay': {
      title: 'Bradford Protein Assay',
      description: 'Quantify protein concentration using BSA standards and microplate reader',
      difficulty: 'Intermediate', 
      duration: '60 min',
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'bg-purple-500',
      requiredScore: 70,
      locked: true
    },
    'pcr-simulation': {
      title: 'PCR Amplification',
      description: 'Simulate DNA amplification with thermal cycling and gel electrophoresis',
      difficulty: 'Advanced',
      duration: '90 min',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-red-500',
      requiredScore: 80,
      locked: true
    },
    'gram-staining': {
      title: 'Gram Staining Protocol',
      description: 'Differentiate bacteria using crystal violet, iodine, decolorizer and safranin',
      difficulty: 'Intermediate',
      duration: '75 min',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-yellow-500',
      requiredScore: 75,
      locked: true
    },
    'cell-staining': {
      title: 'Cytoskeleton & Nucleus Staining',
      description: 'Visualize actin filaments with phalloidin and nuclei with DAPI',
      difficulty: 'Advanced',
      duration: '100 min',
      icon: <Beaker className="w-6 h-6" />,
      color: 'bg-indigo-500',
      requiredScore: 85,
      locked: true
    }
  };

  // Check if experiment is unlocked
  const isExperimentUnlocked = (experimentKey) => {
    if (!currentUser || !userProgress[currentUser.email]) return experimentKey === 'osmotic-solutions';
    
    const userScore = userProgress[currentUser.email].totalScore || 0;
    const experiment = experiments[experimentKey];
    
    return userScore >= experiment.requiredScore || !experiment.locked;
  };

  // Enhanced Dashboard Component with Leaderboard
  const Dashboard = () => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const userData = currentUser && userProgress[currentUser.email] ? userProgress[currentUser.email] : {
      experimentsCompleted: 0,
      totalScore: 0,
      badges: [],
      quizScores: {},
      experimentDetails: {}
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    };

    const startExperiment = (experimentKey) => {
      if (!isExperimentUnlocked(experimentKey)) {
        alert(`You need ${experiments[experimentKey].requiredScore} points to unlock this experiment!`);
        return;
      }

      // Check if quiz is completed for this experiment
      if (!userData.quizScores || !userData.quizScores[experimentKey]) {
        setCurrentQuiz(experimentKey);
        setShowQuiz(true);
      } else {
        setCurrentExperiment(experimentKey);
      }
    };

    if (showQuiz && currentQuiz) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Pre-Lab Quiz</h1>
              <p className="text-blue-200">Complete this quiz before starting the experiment</p>
            </div>
            
            <QuizComponent 
              experimentKey={currentQuiz}
              onComplete={(score) => {
                setShowQuiz(false);
                if (score >= 60) {
                  setCurrentExperiment(currentQuiz);
                } else {
                  alert('You need at least 60% to proceed. Please review the material and try again.');
                  setCurrentQuiz(null);
                }
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-4">
                <Microscope className="w-12 h-12 text-blue-400 mr-4" />
                <h1 className="text-5xl font-bold text-white">Virtual Biomedical Lab</h1>
              </div>
              <p className="text-xl text-blue-200">Interactive Laboratory Simulations for BME Students</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Student Profile Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Welcome, {currentUser?.name || 'Student'}!
                </h2>
                <div className="flex items-center space-x-6 text-blue-200">
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    ID: {currentUser?.studentId || 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {userData.experimentsCompleted} Experiments
                  </span>
                  <span className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    {userData.badges?.length || 0} Badges
                  </span>
                  <span className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Score: {userData.totalScore}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="flex items-center space-x-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-4 py-2 rounded-lg transition-colors"
              >
                <Trophy className="w-5 h-5" />
                <span>Leaderboard</span>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-blue-200 mb-1">
                <span>Overall Progress</span>
                <span>{Math.round((userData.experimentsCompleted / Object.keys(experiments).length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(userData.experimentsCompleted / Object.keys(experiments).length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          {showLeaderboard && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Leaderboard
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-2">Rank</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Student ID</th>
                      <th className="text-center p-2">Score</th>
                      <th className="text-center p-2">Experiments</th>
                      <th className="text-center p-2">Badges</th>
                      <th className="text-center p-2">Avg Quiz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.slice(0, 10).map((user, index) => (
                      <tr key={user.email} className={`border-b border-white/10 ${user.email === currentUser?.email ? 'bg-white/10' : ''}`}>
                        <td className="p-2">
                          {index === 0 && <span className="text-yellow-400">🥇</span>}
                          {index === 1 && <span className="text-gray-300">🥈</span>}
                          {index === 2 && <span className="text-orange-400">🥉</span>}
                          {index > 2 && <span>{index + 1}</span>}
                        </td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.studentId}</td>
                        <td className="text-center p-2 font-bold">{user.score}</td>
                        <td className="text-center p-2">{user.experimentsCompleted}</td>
                        <td className="text-center p-2">{user.badges}</td>
                        <td className="text-center p-2">{user.averageQuizScore}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Experiments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(experiments).map(([key, experiment]) => {
              const isUnlocked = isExperimentUnlocked(key);
              const quizScore = userData.quizScores?.[key];
              
              return (
                <div
                  key={key}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 ${
                    isUnlocked ? 'hover:bg-white/20 cursor-pointer transform hover:scale-105' : 'opacity-50'
                  }`}
                  onClick={() => isUnlocked && startExperiment(key)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-16 h-16 ${experiment.color} rounded-2xl flex items-center justify-center text-white`}>
                      {experiment.icon}
                    </div>
                    {!isUnlocked && (
                      <div className="flex items-center space-x-1 bg-red-500/20 px-2 py-1 rounded">
                        <Lock className="w-4 h-4 text-red-300" />
                        <span className="text-xs text-red-300">Locked</span>
                      </div>
                    )}
                    {isUnlocked && quizScore !== undefined && (
                      <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span className="text-xs text-green-300">Quiz: {quizScore}%</span>
                      </div>
                    )}
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
                  
                  {!isUnlocked && (
                    <div className="mt-3 text-xs text-yellow-300">
                      Required: {experiment.requiredScore} points
                    </div>
                  )}
                  
                  {userData.experimentDetails?.[key] && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${userData.experimentDetails[key].progress || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-green-400 mt-1">{userData.experimentDetails[key].progress || 0}% Complete</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Badges Section */}
          {userData.badges && userData.badges.length > 0 && (
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Your Badges</h3>
              <div className="flex flex-wrap gap-4">
                {userData.badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-300 text-sm">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
