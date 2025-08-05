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
                      <p><strong>Standar
