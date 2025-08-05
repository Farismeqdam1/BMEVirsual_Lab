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
  TestTube
} from 'lucide-react';

const BiomedicalLabPlatform = () => {
  const [currentExperiment, setCurrentExperiment] = useState('dashboard');
  const [experimentProgress, setExperimentProgress] = useState({});
  const [studentProfile, setStudentProfile] = useState({
    name: 'BME Student',
    experimentsCompleted: 0,
    badges: [],
    totalScore: 0
  });

  // Enhanced experiments configuration
  const experiments = {
    'osmotic-solutions': {
      title: 'Osmotic Solutions Lab',
      description: 'Study isotonic, hypotonic, and hypertonic solutions using onion cells and RBCs',
      difficulty: 'Beginner',
      duration: '45 min',
      icon: <Droplets className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    'bradford-assay': {
      title: 'Bradford Protein Assay',
      description: 'Quantify protein concentration using BSA standards and microplate reader',
      difficulty: 'Intermediate', 
      duration: '60 min',
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    'pcr-simulation': {
      title: 'PCR Amplification',
      description: 'Simulate DNA amplification with thermal cycling and gel electrophoresis',
      difficulty: 'Advanced',
      duration: '90 min',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    'gram-staining': {
      title: 'Gram Staining Protocol',
      description: 'Differentiate bacteria using crystal violet, iodine, decolorizer and safranin',
      difficulty: 'Intermediate',
      duration: '75 min',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    'cell-staining': {
      title: 'Cytoskeleton & Nucleus Staining',
      description: 'Visualize actin filaments with phalloidin and nuclei with DAPI',
      difficulty: 'Advanced',
      duration: '100 min',
      icon: <Beaker className="w-6 h-6" />,
      color: 'bg-indigo-500'
    }
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Microscope className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">Virtual Biomedical Lab</h1>
          </div>
          <p className="text-xl text-blue-200">Interactive Laboratory Simulations for BME Students</p>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome, {studentProfile.name}!</h2>
              <div className="flex items-center space-x-6 text-blue-200">
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {studentProfile.experimentsCompleted} Experiments Completed
                </span>
                <span className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  {studentProfile.badges.length} Badges Earned
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
            </div>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(experiments).map(([key, experiment]) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
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
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${experimentProgress[key]}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-green-400 mt-1">{experimentProgress[key]}% Complete</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Osmotic Solutions Component
  const OsmoticSolutions = () => {
    const [step, setStep] = useState(0);
    const [onionCells, setOnionCells] = useState([
      { id: 1, state: 'normal', solution: null, x: 100, y: 80 },
      { id: 2, state: 'normal', solution: null, x: 200, y: 120 },
      { id: 3, state: 'normal', solution: null, x: 150, y: 160 },
    ]);
    const [bloodCells, setBloodCells] = useState([
      { id: 1, state: 'normal', solution: null, x: 80, y: 100 },
      { id: 2, state: 'normal', solution: null, x: 180, y: 80 },
      { id: 3, state: 'normal', solution: null, x: 250, y: 140 },
    ]);
    const [solutions, setSolutions] = useState({
      A: { name: 'Solution A', type: null, revealed: false },
      B: { name: 'Solution B', type: null, revealed: false },
      C: { name: 'Solution C', type: null, revealed: false }
    });
    const [mistakes, setMistakes] = useState([]);
    const [microscopeView, setMicroscopeView] = useState('none');

    const steps = [
      "Prepare Onion Epidermis",
      "Apply Unknown Solutions to Onion Cells",
      "Observe Onion Cells Under Microscope",
      "Prepare Blood Cell Slides",
      "Observe Blood Cells Under Microscope",
      "Identify Solutions and Analyze Results"
    ];

    const solutionTypes = {
      hypotonic: { name: 'Hypotonic (Distilled Water)', color: '#e3f2fd', effect: 'swell' },
      isotonic: { name: 'Isotonic (0.9% NaCl)', color: '#f3e5f5', effect: 'normal' },
      hypertonic: { name: 'Hypertonic (10% NaCl)', color: '#fff3e0', effect: 'shrink' }
    };

    useEffect(() => {
      // Randomly assign solution types
      const types = ['hypotonic', 'isotonic', 'hypertonic'];
      const shuffled = [...types].sort(() => Math.random() - 0.5);
      setSolutions({
        A: { name: 'Solution A', type: shuffled[0], revealed: false },
        B: { name: 'Solution B', type: shuffled[1], revealed: false },
        C: { name: 'Solution C', type: shuffled[2], revealed: false }
      });
    }, []);

    const applySolutionToOnion = (cellId, solutionKey) => {
      const solution = solutions[solutionKey];
      setOnionCells(prev => prev.map(cell => {
        if (cell.id === cellId) {
          let newState = 'normal';
          if (solution.type === 'hypotonic') newState = 'turgid';
          else if (solution.type === 'hypertonic') newState = 'plasmolyzed';
          
          return { ...cell, solution: solutionKey, state: newState };
        }
        return cell;
      }));
    };

    const applySolutionToBlood = (cellId, solutionKey) => {
      const solution = solutions[solutionKey];
      setBloodCells(prev => prev.map(cell => {
        if (cell.id === cellId) {
          let newState = 'normal';
          if (solution.type === 'hypotonic') newState = 'hemolyzed';
          else if (solution.type === 'hypertonic') newState = 'crenated';
          
          return { ...cell, solution: solutionKey, state: newState };
        }
        return cell;
      }));
    };

    const renderOnionCell = (cell) => {
      const getStyle = () => {
        const base = {
          position: 'absolute',
          left: cell.x,
          top: cell.y,
          width: 60,
          height: 40,
          border: '3px solid #8d6e63',
          borderRadius: '8px',
          transition: 'all 0.5s ease'
        };

        switch (cell.state) {
          case 'turgid':
            return { ...base, backgroundColor: '#c8e6c9', transform: 'scale(1.1)' };
          case 'plasmolyzed':
            return { ...base, backgroundColor: '#ffcdd2', transform: 'scale(0.85)' };
          default:
            return { ...base, backgroundColor: '#f5f5f5' };
        }
      };

      return (
        <div key={cell.id} style={getStyle()}>
          {/* Cell wall */}
          <div className="absolute inset-0 border-2 border-brown-600 rounded">
            {/* Cytoplasm */}
            <div className={`absolute inset-1 rounded ${
              cell.state === 'plasmolyzed' ? 'inset-2 bg-pink-200' : 'bg-green-100'
            }`}>
              {/* Nucleus */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full" />
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
            Cell {cell.id}
          </div>
        </div>
      );
    };

    const renderBloodCell = (cell) => {
      const getStyle = () => {
        const base = {
          position: 'absolute',
          left: cell.x,
          top: cell.y,
          width: 30,
          height: 30,
          borderRadius: '50%',
          transition: 'all 0.5s ease'
        };

        switch (cell.state) {
          case 'hemolyzed':
            return { ...base, backgroundColor: '#ffcdd2', transform: 'scale(1.3)', opacity: 0.6 };
          case 'crenated':
            return { ...base, backgroundColor: '#d32f2f', transform: 'scale(0.7)', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' };
          default:
            return { ...base, backgroundColor: '#f44336' };
        }
      };

      return (
        <div key={cell.id} style={getStyle()}>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
            RBC {cell.id}
          </div>
        </div>
      );
    };

    const renderStep = () => {
      switch (step) {
        case 0:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare Onion Epidermis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Protocol:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Cut purple onion bulb into quarters</li>
                    <li>Remove scale with dark epidermal layer</li>
                    <li>Snap the scale backward to produce ragged epidermis</li>
                    <li>Use forceps to remove purple epidermis piece</li>
                    <li>Spread evenly on slide avoiding wrinkles</li>
                  </ol>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Epidermis Prepared - Continue
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-48 h-32 bg-purple-200 rounded-lg border-2 border-purple-400 flex items-center justify-center">
                    <span className="text-purple-700 font-semibold">Purple Onion Epidermis</span>
                  </div>
                </div>
              </div>
            </div>
          );

        case 1:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Apply Unknown Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Available Solutions:</h4>
                  <div className="space-y-3">
                    {Object.entries(solutions).map(([key, solution]) => (
                      <div key={key} className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                          <span className="font-bold text-blue-800">{key}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{solution.name}</p>
                          <p className="text-xs text-gray-600">Unknown composition</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative h-64 bg-gray-100 rounded-lg border-2 border-gray-300">
                  <h4 className="font-semibold mb-2 text-center">Onion Cells on Slide</h4>
                  {onionCells.map(cell => renderOnionCell(cell))}
                  
                  <div className="absolute bottom-4 left-4 space-x-2">
                    {Object.keys(solutions).map(key => (
                      <button
                        key={key}
                        onClick={() => {
                          onionCells.forEach(cell => {
                            if (!cell.solution) {
                              applySolutionToOnion(cell.id, key);
                              return;
                            }
                          });
                        }}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Apply {key}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {onionCells.every(cell => cell.solution) && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Solutions Applied - Observe Under Microscope
                </button>
              )}
            </div>
          );

        case 2:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Microscope Observation - Onion Cells</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-black rounded-lg p-4 h-80 relative border-4 border-gray-600">
                    <div className="absolute inset-0 bg-gradient-radial from-gray-700 to-black opacity-50 rounded-full"></div>
                    {onionCells.map(cell => renderOnionCell(cell))}
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      400x Magnification
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 space-x-2">
                    <button className="px-3 py-1 bg-gray-400 text-white text-sm rounded">10x</button>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">40x</button>
                    <button className="px-3 py-1 bg-gray-400 text-white text-sm rounded">100x</button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Observations:</h4>
                  <div className="space-y-4">
                    {onionCells.map(cell => (
                      <div key={cell.id} className="p-3 bg-gray-50 rounded">
                        <p><strong>Cell {cell.id} (Solution {cell.solution}):</strong></p>
                        <p className="text-sm text-gray-700">
                          {cell.state === 'turgid' && "Cell appears swollen, membrane pressed against cell wall"}
                          {cell.state === 'plasmolyzed' && "Cell membrane pulled away from cell wall, cytoplasm shrunken"}
                          {cell.state === 'normal' && "Cell appears normal, no significant changes"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Continue to Blood Cells
                  </button>
                </div>
              </div>
            </div>
          );

        case 3:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare Blood Cell Slides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Protocol:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Place drop of unknown solution on labeled slide</li>
                    <li>Add drop of blood to solution</li>
                    <li>Gently lower coverslip to prevent air bubbles</li>
                    <li>Observe shape changes in red blood cells</li>
                  </ol>
                  <div className="mt-6 space-x-2">
                    {Object.keys(solutions).map(key => (
                      <button
                        key={key}
                        onClick={() => {
                          bloodCells.forEach(cell => {
                            if (!cell.solution) {
                              applySolutionToBlood(cell.id, key);
                              return;
                            }
                          });
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Prepare Slide {key}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative h-64 bg-gray-100 rounded-lg border-2 border-gray-300">
                  <h4 className="font-semibold mb-2 text-center">Blood Cells</h4>
                  {bloodCells.map(cell => renderBloodCell(cell))}
                </div>
              </div>
              {bloodCells.every(cell => cell.solution) && (
                <button
                  onClick={() => setStep(4)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Blood Slides Prepared - Observe
                </button>
              )}
            </div>
          );

        case 4:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Microscope Observation - Blood Cells</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-black rounded-lg p-4 h-80 relative border-4 border-gray-600">
                    <div className="absolute inset-0 bg-gradient-radial from-gray-700 to-black opacity-50 rounded-full"></div>
                    {bloodCells.map(cell => renderBloodCell(cell))}
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      400x Magnification
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Blood Cell Observations:</h4>
                  <div className="space-y-4">
                    {bloodCells.map(cell => (
                      <div key={cell.id} className="p-3 bg-gray-50 rounded">
                        <p><strong>RBC {cell.id} (Solution {cell.solution}):</strong></p>
                        <p className="text-sm text-gray-700">
                          {cell.state === 'hemolyzed' && "Cells appear swollen and pale, membrane rupturing"}
                          {cell.state === 'crenated' && "Cells appear shrunken with spiky projections"}
                          {cell.state === 'normal' && "Cells maintain normal biconcave disc shape"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(5)}
                    className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Analyze Results
                  </button>
                </div>
              </div>
            </div>
          );

        case 5:
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Solution Identification & Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Identify Each Solution:</h4>
                  <div className="space-y-4">
                    {Object.entries(solutions).map(([key, solution]) => (
                      <div key={key} className="p-4 border rounded">
                        <p className="font-semibold">Solution {key}</p>
                        <div className="mt-2 space-x-2">
                          {Object.entries(solutionTypes).map(([type, info]) => (
                            <button
                              key={type}
                              onClick={() => {
                                setSolutions(prev => ({
                                  ...prev,
                                  [key]: { ...prev[key], revealed: true }
                                }));
                                if (type !== solution.type) {
                                  setMistakes(prev => [...prev, `Incorrect identification of Solution ${key}`]);
                                }
                              }}
                              className={`px-3 py-1 text-xs rounded ${
                                solution.revealed && solution.type === type
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                            >
                              {info.name}
                            </button>
                          ))}
                        </div>
                        {solution.revealed && (
                          <p className="mt-2 text-sm text-green-600">
                            ✓ Correct: {solutionTypes[solution.type].name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Results Summary:</h4>
                  <div className="bg-blue-50 p-4 rounded">
                    <h5 className="font-semibold text-blue-800">Osmotic Effects Observed:</h5>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• Hypotonic: Cell swelling (turgid/hemolysis)</li>
                      <li>• Isotonic: No change (normal)</li>
                      <li>• Hypertonic: Cell shrinkage (plasmolysis/crenation)</li>
                    </ul>
                  </div>
                  
                  {Object.values(solutions).every(s => s.revealed) && (
                    <div className="mt-6">
                      <div className="bg-green-50 p-4 rounded">
                        <p className="text-green-800 font-semibold">Experiment Complete!</p>
                        <p className="text-green-700 text-sm">Grade: {mistakes.length === 0 ? 'A+' : mistakes.length <= 1 ? 'A' : 'B+'}</p>
                      </div>
                      <button
                        onClick={() => {
                          setStudentProfile(prev => ({
                            ...prev,
                            experimentsCompleted: prev.experimentsCompleted + 1,
                            totalScore: prev.totalScore + (mistakes.length === 0 ? 100 : Math.max(70, 100 - mistakes.length * 5)),
                            badges: [...prev.badges, 'Osmosis Expert']
                          }));
                          setCurrentExperiment('dashboard');
                        }}
                        className="mt-4 w-full bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                      >
                        Complete Osmotic Solutions Lab
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        default:
          return <div>Step not found</div>;
      }
    };

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

          {mistakes.length > 0 && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Bradford Protein Assay
  const BradfordAssay = () => {
    const [step, setStep] = useState(0);
    const [bsaStandards, setBsaStandards] = useState([
      { id: 'A', name: 'Standard A (Blank)', concentration: 0, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'B', name: 'Standard B', concentration: 25, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'C', name: 'Standard C', concentration: 125, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'D', name: 'Standard D', concentration: 250, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'E', name: 'Standard E', concentration: 500, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'F', name: 'Standard F', concentration: 750, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'G', name: 'Standard G', concentration: 1000, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'H', name: 'Standard H', concentration: 1500, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'I', name: 'Standard I', concentration: 2000, volume: 0, absorbance: null, color: '#f8f9fa' },
      { id: 'Unknown', name: 'Unknown Sample', concentration: 875, volume: 0, absorbance: null, color: '#f8f9fa' }
    ]);
    
    const [bradfordReagent, setBradfordReagent] = useState({ volume: 5000 }); // 5mL stock
    const [selectedPipette, setSelectedPipette] = useState('P10');
    const [pipetteVolume, setPipetteVolume] = useState(5);
    const [incubationTime, setIncubationTime] = useState(0);
    const [isIncubating, setIsIncubating] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [showMicroplateReader, setShowMicroplateReader] = useState(false);
    const [standardCurve, setStandardCurve] = useState(null);

    const steps = [
      "Prepare BSA Standards",
      "Add Samples to Microplate",
      "Add Bradford Reagent", 
      "Incubate at Room Temperature",
      "Measure Absorbance at 595nm",
      "Create Standard Curve",
      "Calculate Unknown Concentration"
    ];

    const pipettes = {
      'P10': { range: '1-10 μL', color: 'bg-red-400' },
      'P200': { range: '20-200 μL', color: 'bg-yellow-400' },
      'P1000': { range: '100-1000 μL', color: 'bg-blue-400' }
    };

    const addSampleToWell = (sampleId) => {
      if (pipetteVolume !== 5) {
        setMistakes(prev => [...prev, `Wrong volume! Need exactly 5μL for ${sampleId}`]);
        return;
      }
      if (selectedPipette !== 'P10') {
        setMistakes(prev => [...prev, `Wrong pipette! Use P10 for accurate 5μL volumes`]);
        return;
      }

      setBsaStandards(prev => prev.map(sample => 
        sample.id === sampleId 
          ? { ...sample, volume: 5, color: sample.concentration > 0 ? '#e3f2fd' : '#f8f9fa' }
          : sample
      ));
    };

    const addBradfordReagent = (sampleId) => {
      if (bradfordReagent.volume < 250) {
        setMistakes(prev => [...prev, "Insufficient Bradford reagent remaining!"]);
        return;
      }

      const sample = bsaStandards.find(s => s.id === sampleId);
      if (sample.volume === 0) {
        setMistakes(prev => [...prev, `Add sample to well ${sampleId} first!`]);
        return;
      }

      setBradfordReagent(prev => ({ ...prev, volume: prev.volume - 250 }));
      setBsaStandards(prev => prev.map(s => 
        s.id === sampleId 
          ? { 
              ...s, 
              color: s.concentration === 0 ? '#ffa726' : `hsl(${240 - (s.concentration / 2000) * 120}, 70%, ${80 - (s.concentration / 2000) * 30}%)`
            }
          : s
      ));
    };

    const measureAbsorbance = (sampleId) => {
      const sample = bsaStandards.find(s => s.id === sampleId);
      if (sample.color === '#f8f9fa' || sample.color === '#e3f2fd') {
        setMistakes(prev => [...prev, `Sample ${sampleId} not ready for measurement!`]);
        return;
      }

      // Realistic Bradford assay absorbance calculation
      const baseAbsorbance = 0.1;
      const maxAbsorbance = 1.8;
      const kd = 500; // Half-saturation constant
      
      const absorbance = baseAbsorbance + ((maxAbsorbance - baseAbsorbance) * sample.concentration) / (kd + sample.concentration);
      const noisyAbsorbance = absorbance + (Math.random() - 0.5) * 0.05; // Add realistic noise
      
      setBsaStandards(prev => prev.map(s => 
        s.id === sampleId 
          ? { ...s, absorbance: Math.max(0, noisyAbsorbance).toFixed(3) }
          : s
      ));
    };

    const generateStandardCurve = () => {
      const measuredStandards = bsaStandards.filter(s => s.absorbance !== null && s.id !== 'Unknown');
      if (measuredStandards.length < 7) {
        setMistakes(prev => [...prev, "Measure all standards before generating curve!"]);
        return;
      }

      // Simple linear regression for standard curve
      const xValues = measuredStandards.map(s => parseFloat(s.absorbance));
      const yValues = measuredStandards.map(s => s.concentration);
      
      const n = xValues.length;
      const sumX = xValues.reduce((a, b) => a + b, 0);
      const sumY = yValues.reduce((a, b) => a + b, 0);
      const sumXY = xValues.reduce((acc, x, i) => acc + x * yValues[i], 0);
      const sumXX = xValues.reduce((acc, x) => acc + x * x, 0);
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      const rSquared = 0.985 + Math.random() * 0.01; // Realistic R²
      
      setStandardCurve({ slope, intercept, rSquared });
    };

    const calculateUnknownConcentration = () => {
      const unknown = bsaStandards.find(s => s.id === 'Unknown');
      if (!unknown.absorbance || !standardCurve) return null;
      
      const concentration = (parseFloat(unknown.absorbance) - standardCurve.intercept) / standardCurve.slope;
      return Math.max(0, concentration).toFixed(1);
    };

    useEffect(() => {
      let interval;
      if (isIncubating && incubationTime < 1800) { // 30 minutes = 1800 seconds
        interval = setInterval(() => {
          setIncubationTime(prev => prev + 1);
        }, 100); // Speed up for demo
      } else if (incubationTime >= 1800) {
        setIsIncubating(false);
      }
      return () => clearInterval(interval);
    }, [isIncubating, incubationTime]);

    const renderStep = () => {
      switch (step) {
        case 0: // Prepare BSA Standards
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Prepare BSA Standards</h3>
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">📋 Protocol</h4>
                  <p className="text-blue-700 text-sm">
                    Use the stock BSA solution to prepare standards from 0-2000 μg/mL. 
                    Each standard represents a different protein concentration for your calibration curve.
                  </p>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {bsaStandards.slice(0, 9).map(standard => (
                    <div key={standard.id} className="text-center">
                      <div className="w-16 h-20 bg-gray-200 rounded-lg mb-2 flex items-center justify-center border-2 border-gray-300">
                        <span className="text-xs font-semibold">{standard.id}</span>
                      </div>
                      <p className="text-xs font-medium">{standard.name}</p>
                      <p className="text-xs text-gray-600">{standard.concentration} μg/mL</p>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setStep(1)}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Standards Prepared - Continue
                </button>
              </div>
            </div>
          );

        case 1: // Add Samples to Microplate
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Samples to Microplate</h3>
              
              {/* Pipette Selection */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Select Pipette:</h4>
                <div className="flex space-x-4">
                  {Object.entries(pipettes).map(([id, pipette]) => (
                    <button
                      key={id}
                      onClick={() => setSelectedPipette(id)}
                      className={`px-4 py-2 rounded border-2 transition-colors ${
                        selectedPipette === id 
                          ? 'border-blue-500 bg-blue-100 text-blue-700' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-4 h-4 ${pipette.color} rounded mb-1 mx-auto`}></div>
                      <div className="text-xs">{pipette.range}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Setting */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Set Volume (μL):</h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setPipetteVolume(Math.max(1, pipetteVolume - 1))}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-mono font-bold w-16 text-center">{pipetteVolume}</span>
                  <button
                    onClick={() => setPipetteVolume(pipetteVolume + 1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Required: 5 μL per well</p>
              </div>

              {/* 96-Well Plate */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">96-Well Microplate:</h4>
                <div className="grid grid-cols-10 gap-1 bg-gray-100 p-4 rounded-lg max-w-2xl">
                  {bsaStandards.map(sample => (
                    <div
                      key={sample.id}
                      onClick={() => addSampleToWell(sample.id)}
                      className="w-12 h-12 rounded border-2 border-gray-400 cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center text-xs font-semibold relative"
                      style={{ backgroundColor: sample.color }}
                    >
                      {sample.id}
                      {sample.volume > 0 && (
                        <div className="absolute -bottom-1 left-0 right-0 text-xs bg-white/80 rounded">
                          {sample.volume}μL
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {bsaStandards.every(s => s.volume > 0) && (
                <button
                  onClick={() => setStep(2)}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  All Samples Added - Continue
                </button>
              )}
            </div>
          );

        case 2: // Add Bradford Reagent
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Bradford Reagent</h3>
              
              <div className="mb-6 flex items-center">
                <div className="w-20 h-32 bg-blue-800 rounded mr-4 relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-500"
                    style={{ height: `${(bradfordReagent.volume / 5000) * 100}%` }}
                  ></div>
                  <div className="absolute bottom-2 left-0 right-0 text-white text-xs text-center">
                    {bradfordReagent.volume}μL
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Bradford Coomassie Blue Reagent</h4>
                  <p className="text-sm text-gray-600">Add 250 μL to each well</p>
                  <p className="text-xs text-gray-500 mt-2">
                    The reagent will bind to basic amino acids (Arg, Lys, His) causing a color shift from brown to blue
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-10 gap-1 bg-gray-100 p-4 rounded-lg max-w-2xl mb-6">
                {bsaStandards.map(sample => (
                  <div
                    key={sample.id}
                    onClick={() => addBradfordReagent(sample.id)}
                    className="w-12 h-12 rounded border-2 border-gray-400 cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center text-xs font-semibold relative"
                    style={{ backgroundColor: sample.color }}
                  >
                    {sample.id}
                  </div>
                ))}
              </div>

              {bsaStandards.every(s => s.color !== '#f8f9fa' && s.color !== '#e3f2fd') && (
                <button
                  onClick={() => setStep(3)}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Reagent Added - Continue to Incubation
                </button>
              )}
            </div>
          );

        case 3: // Incubation
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Incubate at Room Temperature</h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
                  {Math.floor(incubationTime / 60)}:{(incubationTime % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 mb-4">
                  Target: 30:00 minutes for complete color development
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4 max-w-md mx-auto">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(incubationTime / 1800) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setIsIncubating(true)}
                  disabled={isIncubating || incubationTime >= 1800}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Incubation
                </button>
                <button
                  onClick={() => setIsIncubating(false)}
                  disabled={!isIncubating}
                  className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </button>
              </div>

              {incubationTime >= 1800 && (
                <div className="text-center">
                  <div className="text-green-600 text-xl font-semibold mb-4">
                    ✅ Incubation Complete! Color development finished.
                  </div>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
                  >
                    Proceed to Microplate Reader
                  </button>
                </div>
              )}
            </div>
          );

        case 4: // Measure Absorbance
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Microplate Reader - 595nm</h3>
              
              <div className="flex justify-center mb-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="bg-green-400 text-black px-4 py-2 rounded text-center font-mono text-xl mb-4">
                    Absorbance @ 595nm
                  </div>
                  <div className="grid grid-cols-10 gap-1 mb-4">
                    {bsaStandards.map(sample => (
                      <button
                        key={sample.id}
                        onClick={() => measureAbsorbance(sample.id)}
                        className={`w-8 h-8 text-xs rounded ${
                          sample.absorbance ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } transition-colors`}
                      >
                        {sample.id}
                      </button>
                    ))}
                  </div>
                  <div className="text-green-300 text-center">
                    Click wells to measure absorbance
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="max-w-4xl mx-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2">Well</th>
                      <th className="border border-gray-300 px-3 py-2">Sample</th>
                      <th className="border border-gray-300 px-3 py-2">Concentration (μg/mL)</th>
                      <th className="border border-gray-300 px-3 py-2">Absorbance (595nm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsaStandards.map(sample => (
                      <tr key={sample.id}>
                        <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{sample.id}</td>
                        <td className="border border-gray-300 px-3 py-2">{sample.name}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{sample.concentration}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center font-mono">
                          {sample.absorbance || '---'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {bsaStandards.every(s => s.absorbance !== null) && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setStep(5)}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    All Measurements Complete - Create Standard Curve
                  </button>
                </div>
              )}
            </div>
          );

        case 5: // Create Standard Curve
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Create Standard Curve</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <button
                    onClick={generateStandardCurve}
                    disabled={standardCurve !== null}
                    className="w-full mb-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                  >
                    <Calculator className="w-5 h-5 inline mr-2" />
                    Generate Standard Curve
                  </button>

                  {standardCurve && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Linear Regression Results</h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p><strong>Equation:</strong> y = {standardCurve.slope.toFixed(4)}x + {standardCurve.intercept.toFixed(2)}</p>
                        <p><strong>R² Value:</strong> {standardCurve.rSquared.toFixed(4)}</p>
                        <p><strong>Correlation:</strong> {standardCurve.rSquared > 0.98 ? 'Excellent' : 'Good'}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Simple visualization of standard curve */}
                  <div className="bg-gray-100 p-4 rounded-lg h-64 relative">
                    <div className="absolute bottom-4 left-4 right-4 top-4 border-l-2 border-b-2 border-gray-600">
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                        Absorbance (595nm)
                      </div>
                      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-600">
                        Concentration (μg/mL)
                      </div>
                      
                      {/* Plot points */}
                      {bsaStandards.slice(0, 9).map((sample, index) => {
                        if (!sample.absorbance) return null;
                        const x = (parseFloat(sample.absorbance) / 2) * 100; // Scale for display
                        const y = 100 - (sample.concentration / 2000) * 100; // Scale for display
                        return (
                          <div
                            key={index}
                            className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                            style={{ left: `${Math.min(95, x)}%`, top: `${Math.max(5, y)}%` }}
                            title={`${sample.concentration} μg/mL, A=${sample.absorbance}`}
                          />
                        );
                      })}
                      
                      {/* Trend line */}
                      {standardCurve && (
                        <div className="absolute inset-0">
                          <svg className="w-full h-full">
                            <line
                              x1="5%"
                              y1="95%"
                              x2="95%"
                              y2="15%"
                              stroke="#3b82f6"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {standardCurve && (
                <button
                  onClick={() => setStep(6)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Continue to Calculate Unknown
                </button>
              )}
            </div>
          );

        case 6: // Calculate Unknown Concentration
          const unknownConcentration = calculateUnknownConcentration();
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Calculate Unknown Concentration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Unknown Sample Analysis</h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <p><strong>Sample:</strong> Unknown Protein Solution</p>
                      <p><strong>Absorbance @ 595nm:</strong> {bsaStandards.find(s => s.id === 'Unknown')?.absorbance || '---'}</p>
                      {unknownConcentration && (
                        <>
                          <p><strong>Calculated Concentration:</strong> {unknownConcentration} μg/mL</p>
                          <p className="text-sm text-gray-600">
                            Using equation: Conc = (Abs - {standardCurve.intercept.toFixed(2)}) / {standardCurve.slope.toFixed(4)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Lab Report Summary</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="space-y-1 text-sm">
                      <p><strong>Experiment:</strong> Bradford Protein Assay</p>
                      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                      <p><strong>Standard Curve R²:</strong> {standardCurve?.rSquared.toFixed(4)}</p>
                      <p><strong>Unknown Concentration:</strong> {unknownConcentration} μg/mL</p>
                      <p><strong>Mistakes:</strong> {mistakes.length}</p>
                      <p><strong>Grade:</strong> {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Conclusion</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      The Bradford assay successfully quantified protein concentration using BSA standards. 
                      The assay's principle relies on the binding of Coomassie Brilliant Blue G-250 to basic amino acids 
                      (arginine, lysine, histidine), causing a spectral shift from 465nm to 595nm.
                    </p>
                  </div>
                </div>
              </div>

              {unknownConcentration && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setStudentProfile(prev => ({
                        ...prev,
                        experimentsCompleted: prev.experimentsCompleted + 1,
                        totalScore: prev.totalScore + (mistakes.length === 0 ? 100 : Math.max(70, 100 - mistakes.length * 3)),
                        badges: [...prev.badges, 'Protein Quantification Expert']
                      }));
                      setCurrentExperiment('dashboard');
                    }}
                    className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Complete Bradford Assay Lab
                  </button>
                </div>
              )}
            </div>
          );

        default:
          return <div>Step not found</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-purple-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Bradford Protein Assay</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-purple-200 mt-2">{steps[step]}</p>
          </div>

          {mistakes.length > 0 && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  };

  // PCR Simulation Component
  const PCRSimulation = () => {
    const [step, setStep] = useState(0);
    const [primerDesign, setPrimerDesign] = useState({
      forward: '',
      reverse: '',
      targetSequence: 'ATGCGATCGATCGATCGATCGATCGATCGATCGATCGATCGAT',
      validated: false
    });
    const [pcrReaction, setPcrReaction] = useState({
      template: 2,
      forward: 0.7,
      reverse: 0.7,
      taq: 15,
      water: 11.6,
      ready: false
    });
    const [thermalCycling, setThermalCycling] = useState({
      currentCycle: 0,
      totalCycles: 35,
      currentStep: 'denaturation',
      temperature: 95,
      timeRemaining: 300,
      isRunning: false,
      completed: false
    });
    const [gelElectrophoresis, setGelElectrophoresis] = useState({
      gelCast: false,
      samplesLoaded: false,
      running: false,
      voltage: 150,
      timeElapsed: 0,
      results: null
    });
    const [mistakes, setMistakes] = useState([]);

    const steps = [
      "Design PCR Primers",
      "Prepare PCR Master Mix", 
      "Set Up Thermal Cycling Parameters",
      "Run PCR Thermal Cycling",
      "Prepare Agarose Gel",
      "Load Samples and Run Electrophoresis",
      "Analyze Results"
    ];

    const thermalCycleSteps = [
      { name: 'denaturation', temp: 95, time: 30, color: 'bg-red-500' },
      { name: 'annealing', temp: 55, time: 30, color: 'bg-blue-500' },
      { name: 'extension', temp: 72, time: 30, color: 'bg-green-500' }
    ];

    useEffect(() => {
      let interval;
      if (thermalCycling.isRunning && !thermalCycling.completed) {
        interval = setInterval(() => {
          setThermalCycling(prev => {
            if (prev.timeRemaining > 0) {
              return { ...prev, timeRemaining: prev.timeRemaining - 1 };
            } else {
              // Move to next step or cycle
              const currentStepIndex = thermalCycleSteps.findIndex(s => s.name === prev.currentStep);
              if (currentStepIndex < thermalCycleSteps.length - 1) {
                const nextStep = thermalCycleSteps[currentStepIndex + 1];
                return {
                  ...prev,
                  currentStep: nextStep.name,
                  temperature: nextStep.temp,
                  timeRemaining: nextStep.time
                };
              } else if (prev.currentCycle < prev.totalCycles - 1) {
                // Next cycle
                return {
                  ...prev,
                  currentCycle: prev.currentCycle + 1,
                  currentStep: 'denaturation',
                  temperature: 95,
                  timeRemaining: 30
                };
              } else {
                // PCR completed
                return { ...prev, completed: true, isRunning: false };
              }
            }
          });
        }, 100); // Speed up for demo
      }
      return () => clearInterval(interval);
    }, [thermalCycling.isRunning, thermalCycling.completed]);

    useEffect(() => {
      let interval;
      if (gelElectrophoresis.running) {
        interval = setInterval(() => {
          setGelElectrophoresis(prev => {
            if (prev.timeElapsed < 1800) { // 30 minutes
              return { ...prev, timeElapsed: prev.timeElapsed + 1 };
            } else {
              return { 
                ...prev, 
                running: false,
                results: {
                  ladder: { position: 10, bands: [1000, 750, 500, 250, 100] },
                  sample: { position: 20, bands: [500] },
                  control: { position: 30, bands: [] }
                }
              };
            }
          });
        }, 50);
      }
      return () => clearInterval(interval);
    }, [gelElectrophoresis.running]);

    const validatePrimers = () => {
      const { forward, reverse, targetSequence } = primerDesign;
      
      if (forward.length < 18 || forward.length > 25) {
        setMistakes(prev => [...prev, "Forward primer length should be 18-25 nucleotides"]);
        return;
      }
      if (reverse.length < 18 || reverse.length > 25) {
        setMistakes(prev => [...prev, "Reverse primer length should be 18-25 nucleotides"]);
        return;
      }
      
      // Check GC content (simplified)
      const gcContent = (seq) => {
        const gc = (seq.match(/[GC]/g) || []).length;
        return (gc / seq.length) * 100;
      };
      
      if (gcContent(forward) < 40 || gcContent(forward) > 60) {
        setMistakes(prev => [...prev, "Forward primer GC content should be 40-60%"]);
        return;
      }
      
      setPrimerDesign(prev => ({ ...prev, validated: true }));
    };

    const prepareMasterMix = (component, volume) => {
      setPcrReaction(prev => {
        const newReaction = { ...prev, [component]: volume };
        const total = Object.values(newReaction).reduce((sum, val) => sum + val, 0);
        return { ...newReaction, ready: total === 30 };
      });
    };

    const renderStep = () => {
      switch (step) {
        case 0: // Design PCR Primers
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Design PCR Primers</h3>
              
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🧬 Target DNA Sequence</h4>
                  <div className="font-mono text-sm bg-white p-3 rounded border">
                    5'-{primerDesign.targetSequence}-3'
                  </div>
                  <p className="text-blue-700 text-sm mt-2">
                    Design primers that are 18-25 nucleotides long with 40-60% GC content
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">Forward Primer (5'→3'):</label>
                    <input
                      type="text"
                      value={primerDesign.forward}
                      onChange={(e) => setPrimerDesign(prev => ({ ...prev, forward: e.target.value.toUpperCase() }))}
                      className="w-full p-3 border rounded font-mono text-sm"
                      placeholder="Enter forward primer sequence"
                      pattern="[ATCG]*"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Length: {primerDesign.forward.length} | 
                      GC: {primerDesign.forward ? Math.round(((primerDesign.forward.match(/[GC]/g) || []).length / primerDesign.forward.length) * 100) : 0}%
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Reverse Primer (5'→3'):</label>
                    <input
                      type="text"
                      value={primerDesign.reverse}
                      onChange={(e) => setPrimerDesign(prev => ({ ...prev, reverse: e.target.value.toUpperCase() }))}
                      className="w-full p-3 border rounded font-mono text-sm"
                      placeholder="Enter reverse primer sequence"
                      pattern="[ATCG]*"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Length: {primerDesign.reverse.length} | 
                      GC: {primerDesign.reverse ? Math.round(((primerDesign.reverse.match(/[GC]/g) || []).length / primerDesign.reverse.length) * 100) : 0}%
                    </p>
                  </div>
                </div>

                <button
                  onClick={validatePrimers}
                  disabled={!primerDesign.forward || !primerDesign.reverse}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                >
                  Validate Primer Design
                </button>

                {primerDesign.validated && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-semibold">✅ Primers validated successfully!</p>
                    <button
                      onClick={() => setStep(1)}
                      className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Continue to Master Mix Preparation
                    </button>
                  </div>
                )}
              </div>
            </div>
          );

        case 1: // Prepare PCR Master Mix
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Prepare PCR Master Mix</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Required Components (30 μL total):</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'template', label: 'Template DNA', target: 2, unit: 'μL' },
                      { name: 'forward', label: 'Forward Primer (10μM)', target: 0.7, unit: 'μL' },
                      { name: 'reverse', label: 'Reverse Primer (10μM)', target: 0.7, unit: 'μL' },
                      { name: 'taq', label: 'BioMix Red (Taq)', target: 15, unit: 'μL' },
                      { name: 'water', label: 'Sterile dH₂O', target: 11.6, unit: 'μL' }
                    ].map(component => (
                      <div key={component.name} className="flex items-center space-x-3">
                        <div className="w-24 text-sm">{component.label}:</div>
                        <input
                          type="number"
                          step="0.1"
                          value={pcrReaction[component.name]}
                          onChange={(e) => prepareMasterMix(component.name, parseFloat(e.target.value) || 0)}
                          className="w-20 p-2 border rounded text-sm"
                        />
                        <span className="text-sm text-gray-600">{component.unit}</span>
                        <span className="text-sm text-blue-600">(Target: {component.target}{component.unit})</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="font-semibold">Total Volume: {Object.values(pcrReaction).reduce((sum, val) => sum + val, 0).toFixed(1)} μL</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">PCR Tube:</h4>
                  <div className="w-32 h-40 bg-gray-200 rounded-lg mx-auto relative overflow-hidden border-2 border-gray-400">
                    {pcrReaction.ready && (
                      <div className="absolute bottom-0 left-0 right-0 bg-pink-300 transition-all duration-500" style={{ height: '60%' }}>
                        <div className="absolute bottom-2 left-0 right-0 text-center text-xs">
                          Master Mix
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {pcrReaction.ready && (
                    <div className="mt-6 text-center">
                      <p className="text-green-600 font-semibold mb-3">✅ Master mix prepared correctly!</p>
                      <button
                        onClick={() => setStep(2)}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Thermal Cycling
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 2: // Set Up Thermal Cycling Parameters
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Set Up Thermal Cycling Parameters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">PCR Protocol:</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded bg-red-50">
                      <p className="font-semibold text-red-800">Initial Denaturation</p>
                      <p className="text-sm">95°C for 5 minutes</p>
                    </div>
                    
                    <div className="p-3 border rounded bg-yellow-50">
                      <p className="font-semibold text-yellow-800">35 Cycles of:</p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Denaturation: 95°C for 30 seconds</li>
                        <li>• Annealing: 55°C for 30 seconds</li>
                        <li>• Extension: 72°C for 30 seconds</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 border rounded bg-green-50">
                      <p className="font-semibold text-green-800">Final Extension</p>
                      <p className="text-sm">72°C for 5 minutes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Thermal Cycler Setup:</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="bg-green-400 text-black text-center py-2 rounded mb-4 font-mono">
                      THERMAL CYCLER
                    </div>
                    <div className="text-white space-y-2 text-sm">
                      <div>Program: PCR_Standard</div>
                      <div>Total Cycles: 35</div>
                      <div>Estimated Time: 2h 45min</div>
                      <div>Status: Ready</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setStep(3)}
                    className="mt-4 w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
                  >
                    Start PCR Program
                  </button>
                </div>
              </div>
            </div>
          );

        case 3: // Run PCR Thermal Cycling
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">PCR Thermal Cycling in Progress</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-800 p-6 rounded-lg text-white">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold mb-2">{thermalCycling.temperature}°C</div>
                      <div className="text-lg capitalize">{thermalCycling.currentStep}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Cycle {thermalCycling.currentCycle + 1} of {thermalCycling.totalCycles}</span>
                        <span>{thermalCycling.timeRemaining}s remaining</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            thermalCycleSteps.find(s => s.name === thermalCycling.currentStep)?.color || 'bg-blue-500'
                          }`}
                          style={{ width: `${((30 - thermalCycling.timeRemaining) / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(thermalCycling.currentCycle / thermalCycling.totalCycles) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-center text-sm mt-2">Overall Progress</p>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setThermalCycling(prev => ({ ...prev, isRunning: true }))}
                        disabled={thermalCycling.isRunning || thermalCycling.completed}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-500 transition-colors"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </button>
                      <button
                        onClick={() => setThermalCycling(prev => ({ ...prev, isRunning: false }))}
                        disabled={!thermalCycling.isRunning}
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-500 transition-colors"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">PCR Amplification Process:</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <div>
                        <p className="font-semibold">Denaturation (95°C)</p>
                        <p className="text-sm text-gray-600">DNA strands separate</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <div>
                        <p className="font-semibold">Annealing (55°C)</p>
                        <p className="text-sm text-gray-600">Primers bind to template</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <div>
                        <p className="font-semibold">Extension (72°C)</p>
                        <p className="text-sm text-gray-600">Taq polymerase synthesizes DNA</p>
                      </div>
                    </div>
                  </div>

                  {thermalCycling.completed && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <p className="text-green-800 font-semibold text-center mb-4">
                        🎉 PCR Amplification Complete!
                      </p>
                      <p className="text-sm text-green-700 text-center mb-4">
                        DNA amplified ~{Math.pow(2, thermalCycling.totalCycles).toExponential(2)} times
                      </p>
                      <button
                        onClick={() => setStep(4)}
                        className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Gel Electrophoresis
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 4: // Prepare Agarose Gel
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Prepare Agarose Gel</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Protocol:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Prepare 300mL of 1X TAE buffer from 50X stock</li>
                    <li>Add 2.4g agarose to buffer (0.8% gel)</li>
                    <li>Microwave for 5 minutes until dissolved</li>
                    <li>Cool to 60-70°C and add 15μL Safe Green</li>
                    <li>Pour into gel casting tray with comb</li>
                    <li>Allow to solidify for 20 minutes</li>
                  </ol>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => setGelElectrophoresis(prev => ({ ...prev, gelCast: true }))}
                      disabled={gelElectrophoresis.gelCast}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-green-500 transition-colors"
                    >
                      {gelElectrophoresis.gelCast ? '✅ Gel Cast Complete' : 'Cast Agarose Gel'}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Gel Casting Apparatus:</h4>
                  <div className="relative">
                    <div className="w-64 h-32 bg-gray-300 rounded mx-auto border-2 border-gray-500">
                      {gelElectrophoresis.gelCast && (
                        <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 rounded relative">
                          {/* Wells */}
                          <div className="absolute top-2 left-4 right-4 flex justify-between">
                            {[1,2,3,4,5,6].map(i => (
                              <div key={i} className="w-4 h-6 bg-blue-400 rounded-sm"></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {gelElectrophoresis.gelCast ? 'Gel ready for sample loading' : 'Empty gel casting tray'}
                    </p>
                  </div>

                  {gelElectrophoresis.gelCast && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setStep(5)}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Load Samples
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 5: // Load Samples and Run Electrophoresis
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Load Samples and Run Electrophoresis</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Sample Loading:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-8 bg-purple-400 rounded-sm"></div>
                      <div>
                        <p className="font-semibold">Well 1: DNA Ladder</p>
                        <p className="text-sm text-gray-600">10μL ladder + 2μL loading dye</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-8 bg-pink-400 rounded-sm"></div>
                      <div>
                        <p className="font-semibold">Well 2: PCR Product</p>
                        <p className="text-sm text-gray-600">10μL sample + 2μL loading dye</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-8 bg-gray-400 rounded-sm"></div>
                      <div>
                        <p className="font-semibold">Well 3: Negative Control</p>
                        <p className="text-sm text-gray-600">No template control</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setGelElectrophoresis(prev => ({ ...prev, samplesLoaded: true }))}
                    disabled={gelElectrophoresis.samplesLoaded}
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-green-500 transition-colors"
                  >
                    {gelElectrophoresis.samplesLoaded ? '✅ Samples Loaded' : 'Load All Samples'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Electrophoresis Chamber:</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="w-64 h-32 bg-blue-200 rounded mx-auto border-2 border-gray-600 relative">
                      {/* Electrode indicators */}
                      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-red-500 font-bold">(-)</div>
                      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-black font-bold">(+)</div>
                      
                      {/* Wells with samples if loaded */}
                      {gelElectrophoresis.samplesLoaded && (
                        <div className="absolute top-2 left-4 right-4 flex justify-between">
                          <div className="w-4 h-6 bg-purple-600 rounded-sm"></div>
                          <div className="w-4 h-6 bg-pink-600 rounded-sm"></div>
                          <div className="w-4 h-6 bg-gray-600 rounded-sm"></div>
                        </div>
                      )}
                      
                      {/* Migration visualization during run */}
                      {gelElectrophoresis.running && (
                        <div className="absolute top-8 left-4 right-4 flex justify-between">
                          {[1,2,3].map(i => (
                            <div key={i} className="relative">
                              <div 
                                className="w-1 h-2 bg-blue-800 rounded transition-all duration-1000"
                                style={{ 
                                  transform: `translateY(${(gelElectrophoresis.timeElapsed / 1800) * 60}px)`,
                                  opacity: i === 3 ? 0.3 : 1 // Negative control is faint
                                }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mt-4">
                      <div className="text-white mb-2">Voltage: {gelElectrophoresis.voltage}V</div>
                      <div className="text-white mb-4">
                        Time: {Math.floor(gelElectrophoresis.timeElapsed / 60)}:{(gelElectrophoresis.timeElapsed % 60).toString().padStart(2, '0')}
                      </div>
                      
                      <button
                        onClick={() => setGelElectrophoresis(prev => ({ ...prev, running: true }))}
                        disabled={!gelElectrophoresis.samplesLoaded || gelElectrophoresis.running || gelElectrophoresis.results}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-500 transition-colors"
                      >
                        {gelElectrophoresis.running ? 'Running...' : 'Start Electrophoresis'}
                      </button>
                    </div>
                  </div>

                  {gelElectrophoresis.results && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold mb-2">✅ Electrophoresis Complete!</p>
                      <button
                        onClick={() => setStep(6)}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Analyze Results
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 6: // Analyze Results
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Analyze PCR Results</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Gel Documentation:</h4>
                  <div className="bg-black p-4 rounded-lg">
                    <div className="w-full h-64 bg-gray-900 rounded relative">
                      {/* UV transilluminator effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded"></div>
                      
                      {/* DNA bands visualization */}
                      {gelElectrophoresis.results && (
                        <>
                          {/* Ladder bands */}
                          <div className="absolute left-8 top-4">
                            {gelElectrophoresis.results.ladder.bands.map((size, index) => (
                              <div
                                key={size}
                                className="w-4 h-1 bg-orange-400 mb-2 rounded shadow-lg"
                                style={{ 
                                  filter: 'drop-shadow(0 0 4px #fb923c)',
                                  transform: `translateY(${index * 8}px)`
                                }}
                              ></div>
                            ))}
                            <div className="text-orange-300 text-xs mt-2 text-center">Ladder</div>
                          </div>
                          
                          {/* PCR product band */}
                          <div className="absolute left-20 top-20">
                            <div 
                              className="w-4 h-2 bg-green-400 rounded shadow-lg"
                              style={{ filter: 'drop-shadow(0 0 6px #4ade80)' }}
                            ></div>
                            <div className="text-green-300 text-xs mt-2 text-center">Sample</div>
                          </div>
                          
                          {/* No band for negative control */}
                          <div className="absolute left-32 top-4">
                            <div className="text-gray-500 text-xs mt-16 text-center">Control</div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-center mt-2 text-purple-300 text-sm">UV Transilluminator View</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Results Analysis:</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-semibold text-green-800 mb-2">✅ PCR Success Indicators:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Clear band at expected size (~500 bp)</li>
                        <li>• Strong fluorescence intensity</li>
                        <li>• No contamination in negative control</li>
                        <li>• Ladder shows proper separation</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">📊 Band Analysis:</h5>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Lane 1 (Ladder):</strong> Multiple bands (1000-100 bp)</p>
                        <p><strong>Lane 2 (PCR Product):</strong> Single band at ~500 bp</p>
                        <p><strong>Lane 3 (Negative Control):</strong> No bands detected</p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h5 className="font-semibold text-yellow-800 mb-2">🔬 Interpretation:</h5>
                      <p className="text-sm text-yellow-700">
                        The PCR amplification was successful. The presence of a single, clear band at the expected 
                        size indicates specific amplification of the target sequence. The absence of bands in the 
                        negative control confirms no contamination occurred.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <p className="text-green-800 font-semibold">🎉 PCR Experiment Complete!</p>
                      <p className="text-green-700 text-sm">Grade: {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setStudentProfile(prev => ({
                          ...prev,
                          experimentsCompleted: prev.experimentsCompleted + 1,
                          totalScore: prev.totalScore + (mistakes.length === 0 ? 100 : Math.max(80, 100 - mistakes.length * 3)),
                          badges: [...prev.badges, 'DNA Amplification Expert']
                        }));
                        setCurrentExperiment('dashboard');
                      }}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Complete PCR Simulation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return <div>Step not found</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-orange-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">PCR Amplification</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-orange-200 mt-2">{steps[step]}</p>
          </div>

          {mistakes.length > 0 && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  };

  // Gram Staining Component
  const GramStaining = () => {
    const [step, setStep] = useState(0);
    const [selectedBacteria, setSelectedBacteria] = useState('ecoli');
    const [stainingProgress, setStainingProgress] = useState({
      crystalViolet: false,
      iodine: false,
      decolorizer: false,
      safranin: false
    });
    const [microscopyView, setMicroscopyView] = useState('none');
    const [timer, setTimer] = useState({ active: false, seconds: 0, target: 60 });
    const [mistakes, setMistakes] = useState([]);

    const bacteriaTypes = {
      ecoli: {
        name: 'E. coli',
        type: 'Gram-negative',
        finalColor: 'pink',
        shape: 'rod',
        description: 'Rod-shaped, Gram-negative bacteria'
      },
      saureus: {
        name: 'S. aureus', 
        type: 'Gram-positive',
        finalColor: 'purple',
        shape: 'cocci',
        description: 'Spherical, Gram-positive bacteria in clusters'
      }
    };

    const steps = [
      "Prepare Bacterial Smear",
      "Heat Fix the Slide",
      "Apply Crystal Violet (Primary Stain)",
      "Apply Iodine (Mordant)",
      "Apply Decolorizer",
      "Apply Safranin (Counterstain)",
      "Microscopic Examination"
    ];

    useEffect(() => {
      let interval;
      if (timer.active && timer.seconds < timer.target) {
        interval = setInterval(() => {
          setTimer(prev => ({ ...prev, seconds: prev.seconds + 1 }));
        }, 100); // Speed up for demo
      } else if (timer.seconds >= timer.target) {
        setTimer(prev => ({ ...prev, active: false }));
      }
      return () => clearInterval(interval);
    }, [timer.active, timer.seconds, timer.target]);

    const applyStain = (stainType) => {
      if (stainType === 'crystalViolet' && !timer.active && timer.seconds === 0) {
        setTimer({ active: true, seconds: 0, target: 60 });
        setTimeout(() => {
          setStainingProgress(prev => ({ ...prev, crystalViolet: true }));
        }, 6000); // 60 seconds in demo time
      } else if (stainType === 'iodine' && stainingProgress.crystalViolet) {
        setTimer({ active: true, seconds: 0, target: 60 });
        setTimeout(() => {
          setStainingProgress(prev => ({ ...prev, iodine: true }));
        }, 6000);
      } else if (stainType === 'decolorizer' && stainingProgress.iodine) {
        setStainingProgress(prev => ({ ...prev, decolorizer: true }));
      } else if (stainType === 'safranin' && stainingProgress.decolorizer) {
        setTimer({ active: true, seconds: 0, target: 60 });
        setTimeout(() => {
          setStainingProgress(prev => ({ ...prev, safranin: true }));
        }, 6000);
      } else {
        setMistakes(prev => [...prev, `Cannot apply ${stainType} - complete previous steps first`]);
      }
    };

    const renderBacterialCells = () => {
      const bacteria = bacteriaTypes[selectedBacteria];
      let cellColor = '#f3f4f6'; // Default gray
      
      if (stainingProgress.crystalViolet) cellColor = '#8b5cf6'; // Purple
      if (stainingProgress.decolorizer && bacteria.type === 'Gram-negative') cellColor = '#f3f4f6'; // Decolorized
      if (stainingProgress.safranin && bacteria.type === 'Gram-negative') cellColor = '#ec4899'; // Pink
      if (stainingProgress.safranin && bacteria.type === 'Gram-positive') cellColor = '#8b5cf6'; // Stays purple

      const cells = [];
      for (let i = 0; i < 15; i++) {
        const x = 50 + (Math.random() * 200);
        const y = 50 + (Math.random() * 150);
        
        if (bacteria.shape === 'rod') {
          cells.push(
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="12"
              ry="4"
              fill={cellColor}
              stroke="#374151"
              strokeWidth="0.5"
              transform={`rotate(${Math.random() * 360} ${x} ${y})`}
            />
          );
        } else {
          cells.push(
            <circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill={cellColor}
              stroke="#374151"
              strokeWidth="0.5"
            />
          );
        }
      }
      return cells;
    };

    const renderStep = () => {
      switch (step) {
        case 0: // Prepare Bacterial Smear
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Prepare Bacterial Smear</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Select Bacterial Culture:</h4>
                  <div className="space-y-3">
                    {Object.entries(bacteriaTypes).map(([key, bacteria]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedBacteria(key)}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                          selectedBacteria === key 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold">{bacteria.name}</div>
                        <div className="text-sm text-gray-600">{bacteria.description}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Smear Preparation:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Place a small drop of water on clean slide</li>
                      <li>Use inoculation loop to transfer bacterial culture</li>
                      <li>Mix and spread evenly over 1cm² area</li>
                      <li>Allow to air dry completely</li>
                    </ol>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-semibold mb-4">Microscope Slide:</h4>
                  <div className="w-48 h-20 bg-gray-100 border-2 border-gray-400 rounded mx-auto relative">
                    <div className="absolute inset-4 bg-gray-200 rounded-sm">
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                        Bacterial Smear
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Clean glass slide with bacterial smear</p>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Heat Fixation
              </button>
            </div>
          );

        case 1: // Heat Fix the Slide
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Heat Fix the Slide</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Safety Warning</h4>
                    <p className="text-yellow-700 text-sm">
                      Always use tongs when handling slides over flame. 
                      Avoid overheating to prevent cell distortion.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-3">Heat Fixation Protocol:</h4>
                  <ol className="list-decimal list-inside text-sm space-y-2">
                    <li>Ensure bacterial smear is completely air-dried</li>
                    <li>Hold slide with tongs, smear side up</li>
                    <li>Pass slide through Bunsen burner flame 2-3 times</li>
                    <li>Allow slide to cool before proceeding</li>
                  </ol>

                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-blue-800 text-sm">
                      <strong>Purpose:</strong> Heat fixation kills bacteria and adheres them to the slide, 
                      preventing washout during staining procedures.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-32 bg-blue-600 rounded-t-full mx-auto mb-4 relative">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-orange-400 rounded-full animate-pulse"></div>
                        <div className="w-6 h-6 bg-yellow-400 rounded-full mx-auto animate-pulse"></div>
                        <div className="w-4 h-4 bg-red-400 rounded-full mx-auto animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Bunsen Burner</p>
                  </div>

                  <div className="mt-6">
                    <div className="w-48 h-20 bg-gray-100 border-2 border-gray-400 rounded mx-auto relative">
                      <div className="absolute inset-4 bg-gray-300 rounded-sm flex items-center justify-center">
                        <Flame className="w-4 h-4 text-orange-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Heat-fixed slide</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Begin Gram Staining Protocol
              </button>
            </div>
          );

        case 2: // Apply Crystal Violet
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Apply Crystal Violet (Primary Stain)</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Staining Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Cover bacterial smear completely with crystal violet</li>
                      <li>Incubate for 60 seconds</li>
                      <li>Rinse gently with distilled water</li>
                      <li>Blot dry with bibulous paper</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-16 bg-purple-600 rounded border-2 border-purple-800 flex items-end justify-center">
                      <div className="w-2 h-2 bg-purple-800 rounded-full mb-1"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Crystal Violet Solution</p>
                      <p className="text-sm text-gray-600">Primary stain - colors all bacteria purple</p>
                    </div>
                  </div>

                  {timer.active && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">
                          {timer.target - timer.seconds}s
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(timer.seconds / timer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-purple-700 text-sm mt-2">Staining in progress...</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => applyStain('crystalViolet')}
                    disabled={stainingProgress.crystalViolet || timer.active}
                    className="w-full mt-4 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
                  >
                    {stainingProgress.crystalViolet ? '✅ Crystal Violet Applied' : 'Apply Crystal Violet'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
                  <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-56 h-56">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      400x
                    </div>
                  </div>
                  
                  {stainingProgress.crystalViolet && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">All bacteria appear purple</p>
                      <button
                        onClick={() => setStep(3)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Iodine Treatment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 3: // Apply Iodine
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Apply Iodine (Mordant)</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-amber-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-amber-800 mb-2">🔬 Function of Mordant</h4>
                    <p className="text-amber-700 text-sm">
                      Iodine forms complexes with crystal violet, creating larger molecules that are 
                      harder to remove from thick peptidoglycan layers in Gram-positive bacteria.
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-16 bg-amber-600 rounded border-2 border-amber-800 flex items-end justify-center">
                      <div className="w-2 h-2 bg-amber-800 rounded-full mb-1"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Gram's Iodine Solution</p>
                      <p className="text-sm text-gray-600">Mordant - fixes primary stain</p>
                    </div>
                  </div>

                  {timer.active && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600 mb-2">
                          {timer.target - timer.seconds}s
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-2">
                          <div
                            className="bg-amber-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(timer.seconds / timer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-amber-700 text-sm mt-2">Fixing stain...</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => applyStain('iodine')}
                    disabled={!stainingProgress.crystalViolet || stainingProgress.iodine || timer.active}
                    className="w-full mt-4 bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 disabled:bg-gray-400 transition-colors"
                  >
                    {stainingProgress.iodine ? '✅ Iodine Applied' : 'Apply Iodine'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
                  <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-56 h-56">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      400x
                    </div>
                  </div>
                  
                  {stainingProgress.iodine && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">Bacteria remain purple - crystal violet fixed</p>
                      <button
                        onClick={() => setStep(4)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Decolorization
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 4: // Apply Decolorizer
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Apply Decolorizer</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Critical Step</h4>
                    <p className="text-red-700 text-sm">
                      Add decolorizer until blue dye no longer flows from the smear. 
                      Over-decolorization can cause false negatives!
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-16 bg-red-300 rounded border-2 border-red-500 flex items-end justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mb-1"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Gram's Decolorizer</p>
                      <p className="text-sm text-gray-600">Removes stain from Gram-negative bacteria</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🔬 What Happens:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Gram-positive: Thick peptidoglycan retains stain</li>
                      <li>• Gram-negative: Thin peptidoglycan loses stain</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => applyStain('decolorizer')}
                    disabled={!stainingProgress.iodine || stainingProgress.decolorizer}
                    className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
                  >
                    {stainingProgress.decolorizer ? '✅ Decolorizer Applied' : 'Apply Decolorizer'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
                  <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-56 h-56">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      400x
                    </div>
                  </div>
                  
                  {stainingProgress.decolorizer && (
                    <div className="mt-4 text-center">
                      <p className="text-blue-600 font-semibold">
                        {bacteriaTypes[selectedBacteria].type === 'Gram-positive' 
                          ? 'Bacteria remain purple' 
                          : 'Bacteria appear colorless'
                        }
                      </p>
                      <button
                        onClick={() => setStep(5)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Counterstain
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 5: // Apply Safranin
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Apply Safranin (Counterstain)</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-pink-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-pink-800 mb-2">🔬 Counterstain Function</h4>
                    <p className="text-pink-700 text-sm">
                      Safranin provides color to decolorized Gram-negative bacteria, 
                      making them visible as pink/red under the microscope.
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-16 bg-pink-400 rounded border-2 border-pink-600 flex items-end justify-center">
                      <div className="w-2 h-2 bg-pink-700 rounded-full mb-1"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Safranin Solution</p>
                      <p className="text-sm text-gray-600">Counterstain - colors decolorized bacteria pink</p>
                    </div>
                  </div>

                  {timer.active && (
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600 mb-2">
                          {timer.target - timer.seconds}s
                        </div>
                        <div className="w-full bg-pink-200 rounded-full h-2">
                          <div
                            className="bg-pink-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(timer.seconds / timer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-pink-700 text-sm mt-2">Counterstaining...</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => applyStain('safranin')}
                    disabled={!stainingProgress.decolorizer || stainingProgress.safranin || timer.active}
                    className="w-full mt-4 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 disabled:bg-gray-400 transition-colors"
                  >
                    {stainingProgress.safranin ? '✅ Safranin Applied' : 'Apply Safranin'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
                  <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-56 h-56">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      400x
                    </div>
                  </div>
                  
                  {stainingProgress.safranin && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">
                        Final result: {bacteriaTypes[selectedBacteria].finalColor} bacteria
                      </p>
                      <button
                        onClick={() => setStep(6)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Examine Results
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 6: // Microscopic Examination
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Microscopic Examination & Results</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Final Microscopic View:</h4>
                  <div className="w-80 h-80 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-72 h-72">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      1000x Oil Immersion
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Results Analysis:</h4>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      bacteriaTypes[selectedBacteria].finalColor === 'purple' 
                        ? 'bg-purple-50 border border-purple-200' 
                        : 'bg-pink-50 border border-pink-200'
                    }`}>
                      <h5 className={`font-semibold mb-2 ${
                        bacteriaTypes[selectedBacteria].finalColor === 'purple' 
                          ? 'text-purple-800' 
                          : 'text-pink-800'
                      }`}>
                        {bacteriaTypes[selectedBacteria].name} Classification:
                      </h5>
                      <ul className={`text-sm space-y-1 ${
                        bacteriaTypes[selectedBacteria].finalColor === 'purple' 
                          ? 'text-purple-700' 
                          : 'text-pink-700'
                      }`}>
                        <li><strong>Result:</strong> {bacteriaTypes[selectedBacteria].type}</li>
                        <li><strong>Color:</strong> {bacteriaTypes[selectedBacteria].finalColor}</li>
                        <li><strong>Shape:</strong> {bacteriaTypes[selectedBacteria].shape}</li>
                        <li><strong>Cell Wall:</strong> {
                          bacteriaTypes[selectedBacteria].type === 'Gram-positive' 
                            ? 'Thick peptidoglycan layer' 
                            : 'Thin peptidoglycan layer'
                        }</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Gram Staining Interpretation:</h5>
                      <div className="text-sm text-blue-700 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span>Purple/Violet = Gram-positive bacteria</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-pink-500 rounded"></div>
                          <span>Pink/Red = Gram-negative bacteria</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-yellow-800 mb-2">Clinical Significance:</h5>
                      <p className="text-sm text-yellow-700">
                        {bacteriaTypes[selectedBacteria].type === 'Gram-positive' 
                          ? 'Gram-positive bacteria are generally more susceptible to penicillin and related antibiotics.'
                          : 'Gram-negative bacteria have an outer membrane that can make them more resistant to certain antibiotics.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <p className="text-green-800 font-semibold">🎉 Gram Staining Complete!</p>
                      <p className="text-green-700 text-sm">Grade: {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setStudentProfile(prev => ({
                          ...prev,
                          experimentsCompleted: prev.experimentsCompleted + 1,
                          totalScore: prev.totalScore + (mistakes.length === 0 ? 100 : Math.max(75, 100 - mistakes.length * 5)),
                          badges: [...prev.badges, 'Bacterial Classification Expert']
                        }));
                        setCurrentExperiment('dashboard');
                      }}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Complete Gram Staining Lab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return <div>Step not found</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-yellow-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Gram Staining Protocol</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-500 to-amber-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-amber-200 mt-2">{steps[step]}</p>
          </div>

          {mistakes.length > 0 && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  };

  // Cell Staining Component (Cytoskeleton & Nucleus)
  const CellStaining = () => {
    const [step, setStep] = useState(0);
    const [cellPlate, setCellPlate] = useState({
      wells: Array(8).fill().map((_, i) => ({
        id: i + 1,
        hasTriton: false,
        hasBlocker: false,
        hasPhalloidin: false,
        hasDAPI: false,
        permeabilized: false,
        blocked: false,
        actinStained: false,
        nucleiStained: false
      }))
    });
    const [incubationTimer, setIncubationTimer] = useState({ active: false, seconds: 0, target: 300 });
    const [selectedWell, setSelectedWell] = useState(1);
    const [microscopyFilter, setMicroscopyFilter] = useState('brightfield');
    const [mistakes, setMistakes] = useState([]);

    const steps = [
      "Cell Permeabilization with Triton X-100",
      "Wash Cells with PBS", 
      "Block Non-specific Binding with BSA",
      "Apply Phalloidin-Alexa Stain",
      "DAPI Nuclear Staining",
      "Fluorescence Microscopy Examination"
    ];

    const filters = {
      brightfield: { name: 'Brightfield', color: '#f3f4f6', description: 'Normal light microscopy' },
      blue: { name: 'Blue (FITC)', color: '#22c55e', description: 'Actin filaments (green)' },
      violet: { name: 'Violet (DAPI)', color: '#3b82f6', description: 'Cell nuclei (blue)' },
      merged: { name: 'Merged', color: '#8b5cf6', description: 'Combined fluorescence' }
    };

    useEffect(() => {
      let interval;
      if (incubationTimer.active && incubationTimer.seconds < incubationTimer.target) {
        interval = setInterval(() => {
          setIncubationTimer(prev => ({ ...prev, seconds: prev.seconds + 1 }));
        }, 100); // Speed up for demo
      } else if (incubationTimer.seconds >= incubationTimer.target) {
        setIncubationTimer(prev => ({ ...prev, active: false }));
      }
      return () => clearInterval(interval);
    }, [incubationTimer.active, incubationTimer.seconds, incubationTimer.target]);

    const applyReagent = (reagentType, wellId = null) => {
      const targetWells = wellId ? [wellId] : cellPlate.wells.map(w => w.id);
      
      setCellPlate(prev => ({
        ...prev,
        wells: prev.wells.map(well => {
          if (!targetWells.includes(well.id)) return well;
          
          const newWell = { ...well };
          
          switch (reagentType) {
            case 'triton':
              if (!newWell.hasTriton) {
                newWell.hasTriton = true;
                setTimeout(() => {
                  setCellPlate(p => ({
                    ...p,
                    wells: p.wells.map(w => 
                      w.id === well.id ? { ...w, permeabilized: true } : w
                    )
                  }));
                }, 3000); // 5 min in demo time
              }
              break;
            case 'blocker':
              if (newWell.permeabilized && !newWell.hasBlocker) {
                newWell.hasBlocker = true;
                setTimeout(() => {
                  setCellPlate(p => ({
                    ...p,
                    wells: p.wells.map(w => 
                      w.id === well.id ? { ...w, blocked: true } : w
                    )
                  }));
                }, 6000); // 20 min in demo time
              } else if (!newWell.permeabilized) {
                setMistakes(prev => [...prev, `Well ${well.id}: Permeabilize cells first!`]);
              }
              break;
            case 'phalloidin':
              if (newWell.blocked && !newWell.hasPhalloidin) {
                newWell.hasPhalloidin = true;
                setTimeout(() => {
                  setCellPlate(p => ({
                    ...p,
                    wells: p.wells.map(w => 
                      w.id === well.id ? { ...w, actinStained: true } : w
                    )
                  }));
                }, 6000); // 20 min in demo time
              } else if (!newWell.blocked) {
                setMistakes(prev => [...prev, `Well ${well.id}: Block cells first!`]);
              }
              break;
            case 'dapi':
              if (newWell.actinStained && !newWell.hasDAPI) {
                newWell.hasDAPI = true;
                setTimeout(() => {
                  setCellPlate(p => ({
                    ...p,
                    wells: p.wells.map(w => 
                      w.id === well.id ? { ...w, nucleiStained: true } : w
                    )
                  }));
                }, 900); // 3 min in demo time
              } else if (!newWell.actinStained) {
                setMistakes(prev => [...prev, `Well ${well.id}: Stain actin filaments first!`]);
              }
              break;
          }
          
          return newWell;
        })
      }));
    };

    const renderCellsInWell = (well) => {
      const cells = [];
      for (let i = 0; i < 12; i++) {
        const x = 20 + (Math.random() * 60);
        const y = 20 + (Math.random() * 60);
        
        // Cell body
        let cellColor = '#e5e7eb';
        let nucleusColor = '#9ca3af';
        let actinVisible = false;
        
        if (microscopyFilter === 'blue' && well.actinStained) {
          cellColor = 'rgba(34, 197, 94, 0.1)';
          actinVisible = true;
        } else if (microscopyFilter === 'violet' && well.nucleiStained) {
          cellColor = 'rgba(59, 130, 246, 0.1)';
          nucleusColor = '#3b82f6';
        } else if (microscopyFilter === 'merged' && well.actinStained && well.nucleiStained) {
          cellColor = 'rgba(34, 197, 94, 0.1)';
          nucleusColor = '#3b82f6';
          actinVisible = true;
        }
        
        cells.push(
          <g key={i}>
            {/* Cell body */}
            <circle
              cx={x}
              cy={y}
              r="8"
              fill={cellColor}
              stroke="#6b7280"
              strokeWidth="0.5"
            />
            
            {/* Actin filaments */}
            {actinVisible && (
              <g>
                <path
                  d={`M ${x-6} ${y} Q ${x} ${y-3} ${x+6} ${y}`}
                  stroke="#22c55e" 
                  strokeWidth="1" 
                  fill="none"
                  opacity="0.8"
                />
                <path
                  d={`M ${x} ${y-6} Q ${x+3} ${y} ${x} ${y+6}`}
                  stroke="#22c55e" 
                  strokeWidth="1" 
                  fill="none"
                  opacity="0.8"
                />
              </g>
            )}
            
            {/* Nucleus */}
            <circle
              cx={x}
              cy={y}
              r="3"
              fill={nucleusColor}
              opacity={well.nucleiStained && (microscopyFilter === 'violet' || microscopyFilter === 'merged') ? 1 : 0.5}
            />
          </g>
        );
      }
      return cells;
    };

    const renderStep = () => {
      switch (step) {
        case 0: // Cell Permeabilization
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Cell Permeabilization with Triton X-100</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🧪 Permeabilization Purpose</h4>
                    <p className="text-blue-700 text-sm">
                      Triton X-100 creates pores in the cell membrane, allowing staining reagents 
                      to penetrate and bind to intracellular structures like the cytoskeleton.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Add 0.01% Triton X-100 solution to each well</li>
                      <li>Incubate on gentle shaker for 5 minutes</li>
                      <li>Cells become permeable to reagents</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-12 bg-blue-300 rounded border flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold">0.01% Triton X-100</p>
                      <p className="text-sm text-gray-600">Non-ionic detergent</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      applyReagent('triton');
                      setIncubationTimer({ active: true, seconds: 0, target: 300 });
                    }}
                    disabled={cellPlate.wells.every(w => w.hasTriton)}
                    className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-green-500 transition-colors"
                  >
                    {cellPlate.wells.every(w => w.hasTriton) ? '✅ Triton X-100 Applied' : 'Add Triton X-100 to All Wells'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">96-Well Cell Culture Plate:</h4>
                  <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg max-w-sm mx-auto">
                    {cellPlate.wells.map(well => (
                      <div
                        key={well.id}
                        className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors ${
                          well.hasTriton ? 'border-blue-500 bg-blue-100' : 'border-gray-400 bg-white'
                        } ${selectedWell === well.id ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => setSelectedWell(well.id)}
                      >
                        <svg className="w-full h-full p-1">
                          {renderCellsInWell(well)}
                        </svg>
                        <div className="text-xs text-center mt-1">Well {well.id}</div>
                      </div>
                    ))}
                  </div>

                  {incubationTimer.active && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600 mb-2">
                          {Math.floor((incubationTimer.target - incubationTimer.seconds) / 60)}:
                          {(incubationTimer.target - incubationTimer.seconds % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(incubationTimer.seconds / incubationTimer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-blue-700 text-sm mt-2">Permeabilization in progress...</p>
                      </div>
                    </div>
                  )}

                  {cellPlate.wells.every(w => w.permeabilized) && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">✅ Cells successfully permeabilized!</p>
                      <button
                        onClick={() => setStep(1)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to PBS Wash
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 1: // Wash Cells with PBS
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Wash Cells with PBS</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🧪 Washing Purpose</h4>
                    <p className="text-blue-700 text-sm">
                      Phosphate Buffered Saline (PBS) removes residual Triton X-100 and prepares cells 
                      for the blocking step. Washing prevents reagent interactions and background staining.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Gently aspirate Triton X-100 from wells</li>
                      <li>Add 200μL PBS to each well</li>
                      <li>Rock plate gently for 30 seconds</li>
                      <li>Aspirate PBS and repeat wash</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-12 bg-blue-100 rounded border flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Phosphate Buffered Saline (PBS)</p>
                      <p className="text-sm text-gray-600">pH 7.4, isotonic</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">96-Well Plate Status:</h4>
                  <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg max-w-sm mx-auto">
                    {cellPlate.wells.map(well => (
                      <div
                        key={well.id}
                        className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors ${
                          well.permeabilized ? 'border-green-500 bg-green-100' : 'border-gray-400 bg-white'
                        } ${selectedWell === well.id ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => setSelectedWell(well.id)}
                      >
                        <svg className="w-full h-full p-1">
                          {renderCellsInWell(well)}
                        </svg>
                        <div className="text-xs text-center mt-1">Well {well.id}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setCellPlate(prev => ({
                          ...prev,
                          wells: prev.wells.map(well => ({ ...well, washed: true }))
                        }));
                      }}
                      disabled={cellPlate.wells.every(w => w.washed)}
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                    >
                      {cellPlate.wells.every(w => w.washed) ? '✅ PBS Wash Complete' : 'Complete PBS Wash'}
                    </button>
                  </div>

                  {cellPlate.wells.every(w => w.washed) && (
                    <button
                      onClick={() => setStep(2)}
                      className="mt-4 w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Continue to Blocking Step
                    </button>
                  )}
                </div>
              </div>
            </div>
          );

        case 2: // Block Non-specific Binding
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Block Non-specific Binding with BSA</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🧪 Blocking Purpose</h4>
                    <p className="text-yellow-700 text-sm">
                      Bovine Serum Albumin (BSA) binds to non-specific sites, preventing antibodies 
                      and other reagents from sticking to areas where they don't belong, reducing background staining.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Add 1% BSA solution to each well</li>
                      <li>Incubate on gentle shaker for 20 minutes</li>
                      <li>Prevents non-specific antibody binding</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-12 bg-yellow-200 rounded border flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-yellow-700" />
                    </div>
                    <div>
                      <p className="font-semibold">1% BSA Solution</p>
                      <p className="text-sm text-gray-600">In PBS</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      applyReagent('blocker');
                      setIncubationTimer({ active: true, seconds: 0, target: 1200 });
                    }}
                    disabled={cellPlate.wells.every(w => w.hasBlocker)}
                    className="w-full bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 disabled:bg-green-500 transition-colors"
                  >
                    {cellPlate.wells.every(w => w.hasBlocker) ? '✅ BSA Applied' : 'Add BSA to All Wells'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">96-Well Plate Status:</h4>
                  <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg max-w-sm mx-auto">
                    {cellPlate.wells.map(well => (
                      <div
                        key={well.id}
                        className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors ${
                          well.hasBlocker ? 'border-yellow-500 bg-yellow-100' : 
                          well.permeabilized ? 'border-green-500 bg-green-100' : 'border-gray-400 bg-white'
                        } ${selectedWell === well.id ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => setSelectedWell(well.id)}
                      >
                        <svg className="w-full h-full p-1">
                          {renderCellsInWell(well)}
                        </svg>
                        <div className="text-xs text-center mt-1">Well {well.id}</div>
                      </div>
                    ))}
                  </div>

                  {incubationTimer.active && (
                    <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600 mb-2">
                          {Math.floor((incubationTimer.target - incubationTimer.seconds) / 60)}:
                          {(incubationTimer.target - incubationTimer.seconds % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="w-full bg-yellow-200 rounded-full h-2">
                          <div
                            className="bg-yellow-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(incubationTimer.seconds / incubationTimer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-yellow-700 text-sm mt-2">Blocking in progress...</p>
                      </div>
                    </div>
                  )}

                  {cellPlate.wells.every(w => w.blocked) && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">✅ Non-specific binding sites blocked!</p>
                      <button
                        onClick={() => setStep(3)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Actin Staining
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 3: // Apply Phalloidin-Alexa Stain
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Apply Phalloidin-Alexa Stain (Actin Filaments)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">🧪 Actin Staining</h4>
                    <p className="text-green-700 text-sm">
                      Phalloidin binds specifically to F-actin in the cytoskeleton. The Alexa Fluor 
                      conjugate provides green fluorescence under blue excitation (495nm).
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Prepare Alexa Fluor-conjugated phalloidin solution</li>
                      <li>Add enough to cover cells in each well</li>
                      <li>Incubate for 20 minutes protected from light</li>
                      <li>Wash twice with PBS before proceeding</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-12 bg-green-300 rounded border flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold">Phalloidin-Alexa 488</p>
                      <p className="text-sm text-gray-600">Green fluorescence (F-actin)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      applyReagent('phalloidin');
                      setIncubationTimer({ active: true, seconds: 0, target: 1200 });
                    }}
                    disabled={cellPlate.wells.every(w => w.hasPhalloidin)}
                    className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-green-500 transition-colors"
                  >
                    {cellPlate.wells.every(w => w.hasPhalloidin) ? '✅ Phalloidin Applied' : 'Add Phalloidin to All Wells'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">96-Well Plate Status:</h4>
                  <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg max-w-sm mx-auto">
                    {cellPlate.wells.map(well => (
                      <div
                        key={well.id}
                        className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors ${
                          well.hasPhalloidin ? 'border-green-500 bg-green-100' : 
                          well.blocked ? 'border-yellow-500 bg-yellow-100' : 'border-gray-400 bg-white'
                        } ${selectedWell === well.id ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => setSelectedWell(well.id)}
                      >
                        <svg className="w-full h-full p-1">
                          {renderCellsInWell(well)}
                        </svg>
                        <div className="text-xs text-center mt-1">Well {well.id}</div>
                      </div>
                    ))}
                  </div>

                  {incubationTimer.active && (
                    <div className="mt-4 bg-green-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600 mb-2">
                          {Math.floor((incubationTimer.target - incubationTimer.seconds) / 60)}:
                          {(incubationTimer.target - incubationTimer.seconds % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(incubationTimer.seconds / incubationTimer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-green-700 text-sm mt-2">Actin staining in progress...</p>
                      </div>
                    </div>
                  )}

                  {cellPlate.wells.every(w => w.actinStained) && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">✅ Actin filaments successfully stained!</p>
                      <button
                        onClick={() => setStep(4)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Continue to Nuclear Staining
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 4: // DAPI Nuclear Staining
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">DAPI Nuclear Staining</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">🧪 Nuclear Staining</h4>
                    <p className="text-indigo-700 text-sm">
                      DAPI (4',6-diamidino-2-phenylindole) binds strongly to A-T rich regions in DNA, 
                      producing blue fluorescence under UV excitation (358nm). It stains all nuclei.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Allow DAPI solution to reach room temperature</li>
                      <li>Add to wells after actin staining</li>
                      <li>Incubate for 3 minutes protected from light</li>
                      <li>Wash twice with PBS before imaging</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-12 bg-indigo-300 rounded border flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-indigo-700" />
                    </div>
                    <div>
                      <p className="font-semibold">DAPI Solution</p>
                      <p className="text-sm text-gray-600">Blue fluorescence (nuclei)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      applyReagent('dapi');
                      setIncubationTimer({ active: true, seconds: 0, target: 180 });
                    }}
                    disabled={cellPlate.wells.every(w => w.hasDAPI)}
                    className="w-full bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 disabled:bg-green-500 transition-colors"
                  >
                    {cellPlate.wells.every(w => w.hasDAPI) ? '✅ DAPI Applied' : 'Add DAPI to All Wells'}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">96-Well Plate Status:</h4>
                  <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg max-w-sm mx-auto">
                    {cellPlate.wells.map(well => (
                      <div
                        key={well.id}
                        className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors ${
                          well.hasDAPI ? 'border-indigo-500 bg-indigo-100' : 
                          well.actinStained ? 'border-green-500 bg-green-100' : 'border-gray-400 bg-white'
                        } ${selectedWell === well.id ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => setSelectedWell(well.id)}
                      >
                        <svg className="w-full h-full p-1">
                          {renderCellsInWell(well)}
                        </svg>
                        <div className="text-xs text-center mt-1">Well {well.id}</div>
                      </div>
                    ))}
                  </div>

                  {incubationTimer.active && (
                    <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl font-bold text-indigo-600 mb-2">
                          {Math.floor((incubationTimer.target - incubationTimer.seconds) / 60)}:
                          {(incubationTimer.target - incubationTimer.seconds % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="w-full bg-indigo-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-100"
                            style={{ width: `${(incubationTimer.seconds / incubationTimer.target) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-indigo-700 text-sm mt-2">Nuclear staining in progress...</p>
                      </div>
                    </div>
                  )}

                  {cellPlate.wells.every(w => w.nucleiStained) && (
                    <div className="mt-4 text-center">
                      <p className="text-green-600 font-semibold">✅ Nuclei successfully stained!</p>
                      <button
                        onClick={() => setStep(5)}
                        className="mt-2 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Examine Under Microscope
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case 5: // Fluorescence Microscopy Examination
          const currentWell = cellPlate.wells.find(w => w.id === selectedWell);
          return (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Fluorescence Microscopy Examination</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Microscope Controls:</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(filters).map(([key, filter]) => (
                      <button
                        key={key}
                        onClick={() => setMicroscopyFilter(key)}
                        className={`p-4 border-2 rounded-lg transition-colors ${
                          microscopyFilter === key 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: filter.color }}></div>
                          <div>
                            <p className="font-semibold">{filter.name}</p>
                            <p className="text-xs text-gray-600">{filter.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">Well {selectedWell} Analysis:</h5>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Actin Staining:</strong> {currentWell.actinStained ? '✅ Present' : '❌ Absent'}</p>
                      <p><strong>Nuclear Staining:</strong> {currentWell.nucleiStained ? '✅ Present' : '❌ Absent'}</p>
                      <p><strong>Cell Morphology:</strong> Normal</p>
                      <p><strong>Staining Quality:</strong> Excellent</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Fluorescence Microscope:</h4>
                  <div className="w-80 h-80 bg-black rounded-lg mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-72 h-72">
                      {renderCellsInWell(currentWell)}
                    </svg>
                    <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      {filters[microscopyFilter].name} Filter
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Well {selectedWell} - {filters[microscopyFilter].description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Experiment Summary:</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Technique:</strong> Fluorescence microscopy of cytoskeleton and nuclei</p>
                    <p><strong>Stains Used:</strong> Phalloidin-Alexa 488 (actin), DAPI (nuclei)</p>
                    <p><strong>Results:</strong> Successful visualization of both actin filaments and nuclei</p>
                    <p><strong>Mistakes:</strong> {mistakes.length}</p>
                    <p><strong>Grade:</strong> {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setStudentProfile(prev => ({
                      ...prev,
                      experimentsCompleted: prev.experimentsCompleted + 1,
                      totalScore: prev.totalScore + (mistakes.length === 0 ? 100 : Math.max(80, 100 - mistakes.length * 4)),
                      badges: [...prev.badges, 'Fluorescence Microscopy Expert']
                    }));
                    setCurrentExperiment('dashboard');
                  }}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Complete Cell Staining Lab
                </button>
              </div>
            </div>
          );

        default:
          return <div>Step not found</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-purple-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Cytoskeleton & Nucleus Staining</h1>
            <div className="text-white">Step {step + 1} of {steps.length}</div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-purple-200 mt-2">{steps[step]}</p>
          </div>

          {mistakes.length > 0 && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Mistakes ({mistakes.length})</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  };

  // Main render function
  return (
    <div className="min-h-screen bg-gray-100">
      {currentExperiment === 'dashboard' && <Dashboard />}
      {currentExperiment === 'osmotic-solutions' && <OsmoticSolutions />}
      {currentExperiment === 'bradford-assay' && <BradfordAssay />}
      {currentExperiment === 'pcr-simulation' && <PCRSimulation />}
      {currentExperiment === 'gram-staining' && <GramStaining />}
      {currentExperiment === 'cell-staining' && <CellStaining />}
    </div>
  );
};

export default BiomedicalLabPlatform;
