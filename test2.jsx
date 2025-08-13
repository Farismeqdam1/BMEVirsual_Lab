import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Hand,
  MousePointer,
  Info,
  AlertCircle,
  GraduationCap,
  Activity
} from 'lucide-react';

const EnhancedBiomedicalLabPlatform = () => {
  const [currentExperiment, setCurrentExperiment] = useState('dashboard');
  const [studentProfile, setStudentProfile] = useState({
    name: 'BME Student',
    experimentsCompleted: 0,
    badges: [],
    totalScore: 0,
    skillLevel: 'Beginner'
  });

  // Enhanced experiments with difficulty ratings
  const experiments = {
    'pipetting-training': {
      title: 'Pipetting Technique Training',
      description: 'Master precise pipetting with real-time accuracy feedback',
      difficulty: 'Tutorial',
      duration: '30 min',
      icon: <Pipette className="w-6 h-6" />,
      color: 'bg-teal-500',
      skills: ['Precision', 'Technique', 'Accuracy']
    },
    'buffer-preparation': {
      title: 'Buffer Preparation Lab',
      description: 'Prepare solutions with precise pH and molarity calculations',
      difficulty: 'Beginner',
      duration: '45 min',
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'bg-blue-500',
      skills: ['Calculations', 'pH Adjustment', 'Dilution']
    },
    'cell-culture': {
      title: 'Cell Culture Techniques',
      description: 'Maintain sterile technique while passaging cells',
      difficulty: 'Intermediate',
      duration: '90 min',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-green-500',
      skills: ['Sterility', 'Cell Counting', 'Aseptic Technique']
    },
    'western-blot': {
      title: 'Western Blot Analysis',
      description: 'Complete protein detection from gel to membrane',
      difficulty: 'Advanced',
      duration: '4 hours',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-purple-500',
      skills: ['Gel Electrophoresis', 'Transfer', 'Antibody Incubation']
    },
    'elisa-assay': {
      title: 'ELISA Immunoassay',
      description: 'Quantify proteins using enzyme-linked detection',
      difficulty: 'Advanced',
      duration: '3 hours',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-500',
      skills: ['Serial Dilution', 'Plate Coating', 'Data Analysis']
    }
  };

  // Enhanced Dashboard with progress tracking
  const Dashboard = () => {
    const [showTutorial, setShowTutorial] = useState(true);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Microscope className="w-12 h-12 text-blue-400 mr-4" />
              <h1 className="text-5xl font-bold text-white">Virtual Biomedical Lab</h1>
            </div>
            <p className="text-xl text-blue-200">Interactive Laboratory Training with Manual Protocols</p>
          </div>

          {/* Tutorial Banner */}
          {showTutorial && (
            <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-blue-400/30">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Info className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Welcome to the Enhanced Lab!</h3>
                    <p className="text-blue-200 text-sm mb-3">
                      This version features manual interactions: drag reagents, adjust equipment settings, 
                      and perform techniques with realistic precision requirements.
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setCurrentExperiment('pipetting-training')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                      >
                        Start Tutorial
                      </button>
                      <button
                        onClick={() => setShowTutorial(false)}
                        className="text-blue-300 hover:text-white transition-colors text-sm"
                      >
                        Skip for now
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="text-blue-300 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Student Profile */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">{studentProfile.name}</h2>
                <div className="flex items-center space-x-2 text-blue-200">
                  <GraduationCap className="w-5 h-5" />
                  <span>Skill Level: {studentProfile.skillLevel}</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {studentProfile.experimentsCompleted}
                  </div>
                  <div className="text-blue-200">Experiments Completed</div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">
                    {studentProfile.totalScore}
                  </div>
                  <div className="text-green-200">Total Score</div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-blue-300 mb-2">
                <span>Progress to Next Level</span>
                <span>{Math.round((studentProfile.experimentsCompleted / Object.keys(experiments).length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(studentProfile.experimentsCompleted / Object.keys(experiments).length) * 100}%` }}
                ></div>
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
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {experiment.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-blue-500/30 rounded-full text-blue-300">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm text-blue-300">
                  <span className={`px-3 py-1 rounded-full ${
                    experiment.difficulty === 'Tutorial' ? 'bg-teal-500/30' :
                    experiment.difficulty === 'Beginner' ? 'bg-green-500/30' :
                    experiment.difficulty === 'Intermediate' ? 'bg-yellow-500/30' :
                    'bg-red-500/30'
                  }`}>
                    {experiment.difficulty}
                  </span>
                  <span className="flex items-center">
                    <Timer className="w-4 h-4 mr-1" />
                    {experiment.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Pipetting Training Component with Manual Controls
  const PipettingTraining = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [pipetteVolume, setPipetteVolume] = useState(100);
    const [targetVolume, setTargetVolume] = useState(100);
    const [aspiratedVolume, setAspiratedVolume] = useState(0);
    const [dispensedVolume, setDispensedVolume] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isAspirating, setIsAspirating] = useState(false);
    const [isDispensing, setIsDispensing] = useState(false);
    const [trials, setTrials] = useState([]);
    const [currentTrial, setCurrentTrial] = useState(1);
    const [pipetteTip, setPipetteTip] = useState(false);
    const [selectedPipette, setSelectedPipette] = useState('P200');
    const [draggedItem, setDraggedItem] = useState(null);
    const [dropZone, setDropZone] = useState(null);
    const [technique, setTechnique] = useState({
      angle: 90,
      depth: 50,
      speed: 50
    });

    const pipettes = {
      'P20': { min: 2, max: 20, color: 'bg-red-500' },
      'P200': { min: 20, max: 200, color: 'bg-yellow-500' },
      'P1000': { min: 100, max: 1000, color: 'bg-blue-500' }
    };

    const handleDragStart = (e, item) => {
      setDraggedItem(item);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e, zone) => {
      e.preventDefault();
      if (draggedItem === 'tip' && zone === 'pipette') {
        setPipetteTip(true);
      } else if (draggedItem === 'pipette' && zone === 'source' && pipetteTip) {
        handleAspiration();
      } else if (draggedItem === 'pipette' && zone === 'destination' && aspiratedVolume > 0) {
        handleDispensing();
      }
      setDraggedItem(null);
    };

    const handleAspiration = () => {
      if (!pipetteTip) {
        alert('Attach a pipette tip first!');
        return;
      }
      
      setIsAspirating(true);
      // Simulate aspiration with technique factors
      const techniqueMultiplier = (technique.angle / 90) * (technique.depth / 50) * (technique.speed / 50);
      const actualVolume = pipetteVolume * techniqueMultiplier * (0.95 + Math.random() * 0.1);
      
      setTimeout(() => {
        setAspiratedVolume(actualVolume);
        setIsAspirating(false);
      }, 1000);
    };

    const handleDispensing = () => {
      if (aspiratedVolume === 0) {
        alert('No liquid to dispense!');
        return;
      }
      
      setIsDispensing(true);
      setTimeout(() => {
        setDispensedVolume(aspiratedVolume);
        const acc = 100 - Math.abs(((aspiratedVolume - targetVolume) / targetVolume) * 100);
        setAccuracy(Math.max(0, acc));
        
        setTrials(prev => [...prev, {
          trial: currentTrial,
          target: targetVolume,
          actual: aspiratedVolume,
          accuracy: acc
        }]);
        
        setCurrentTrial(prev => prev + 1);
        setAspiratedVolume(0);
        setDispensedVolume(0);
        setIsDispensing(false);
      }, 1000);
    };

    const steps = [
      "Select appropriate pipette",
      "Attach pipette tip",
      "Set desired volume",
      "Aspirate from source",
      "Dispense to destination",
      "Evaluate accuracy"
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-teal-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Pipetting Technique Training</h1>
            <div className="text-white">Step {currentStep + 1} of {steps.length}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Controls */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Pipette Controls</h3>
              
              {/* Pipette Selection */}
              <div className="mb-6">
                <label className="text-white text-sm font-semibold mb-2 block">Select Pipette:</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(pipettes).map(([key, pipette]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedPipette(key);
                        setPipetteVolume(pipette.max / 2);
                      }}
                      className={`p-3 rounded border-2 transition-colors ${
                        selectedPipette === key 
                          ? 'border-teal-400 bg-teal-500/30' 
                          : 'border-white/30 hover:border-white/50'
                      }`}
                    >
                      <div className={`w-4 h-4 ${pipette.color} rounded mx-auto mb-1`}></div>
                      <div className="text-white text-xs">{key}</div>
                      <div className="text-gray-300 text-xs">{pipette.min}-{pipette.max}μL</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Setting */}
              <div className="mb-6">
                <label className="text-white text-sm font-semibold mb-2 block">
                  Set Volume: {pipetteVolume.toFixed(1)}μL
                </label>
                <input
                  type="range"
                  min={pipettes[selectedPipette].min}
                  max={pipettes[selectedPipette].max}
                  value={pipetteVolume}
                  onChange={(e) => setPipetteVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1">
                  <span>{pipettes[selectedPipette].min}μL</span>
                  <span>{pipettes[selectedPipette].max}μL</span>
                </div>
              </div>

              {/* Technique Parameters */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-3">Technique Parameters:</h4>
                
                <div className="mb-3">
                  <label className="text-gray-300 text-xs">Angle: {technique.angle}°</label>
                  <input
                    type="range"
                    min="45"
                    max="90"
                    value={technique.angle}
                    onChange={(e) => setTechnique(prev => ({ ...prev, angle: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="text-gray-300 text-xs">Immersion Depth: {technique.depth}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={technique.depth}
                    onChange={(e) => setTechnique(prev => ({ ...prev, depth: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="text-gray-300 text-xs">Speed: {technique.speed}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={technique.speed}
                    onChange={(e) => setTechnique(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Target Volume */}
              <div className="mb-6">
                <label className="text-white text-sm font-semibold mb-2 block">
                  Target Volume: {targetVolume}μL
                </label>
                <div className="bg-teal-500/20 p-3 rounded">
                  <p className="text-teal-300 text-xs">Try to aspirate and dispense exactly this amount</p>
                </div>
              </div>
            </div>

            {/* Center Panel - Workspace */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Laboratory Workspace</h3>
              
              {/* Pipette Display */}
              <div className="mb-6 flex justify-center">
                <div
                  draggable={pipetteTip}
                  onDragStart={(e) => handleDragStart(e, 'pipette')}
                  className={`relative cursor-${pipetteTip ? 'move' : 'not-allowed'}`}
                >
                  <div className={`w-8 h-32 ${pipettes[selectedPipette].color} rounded-t-lg relative`}>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
                      {selectedPipette}
                    </div>
                    {pipetteTip && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gray-300 rounded-b-sm"></div>
                    )}
                    {aspiratedVolume > 0 && (
                      <div className="absolute bottom-0 left-1 right-1 bg-blue-300 rounded-sm transition-all duration-500"
                        style={{ height: `${(aspiratedVolume / pipettes[selectedPipette].max) * 50}%` }}
                      ></div>
                    )}
                  </div>
                  <div className="text-center mt-2 text-white text-sm">
                    {pipetteTip ? '✅ Tip Attached' : '❌ No Tip'}
                  </div>
                </div>
              </div>

              {/* Tip Box */}
              {!pipetteTip && (
                <div className="mb-6">
                  <p className="text-white text-sm mb-2">Drag tip to pipette:</p>
                  <div className="flex justify-center">
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'tip')}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'pipette')}
                      className="w-16 h-20 bg-gray-200 rounded cursor-move flex items-center justify-center border-2 border-gray-400"
                    >
                      <div className="w-2 h-8 bg-gray-400 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Source and Destination Wells */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'source')}
                  className="bg-blue-500/20 rounded-lg p-4 border-2 border-dashed border-blue-400"
                >
                  <h4 className="text-white text-sm font-semibold mb-2">Source Well</h4>
                  <div className="w-20 h-20 bg-blue-400 rounded-full mx-auto relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-500"
                      style={{ height: '60%' }}
                    ></div>
                  </div>
                  <p className="text-center text-blue-300 text-xs mt-2">Drag pipette here to aspirate</p>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'destination')}
                  className="bg-green-500/20 rounded-lg p-4 border-2 border-dashed border-green-400"
                >
                  <h4 className="text-white text-sm font-semibold mb-2">Destination Well</h4>
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto relative overflow-hidden">
                    {dispensedVolume > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-500"
                        style={{ height: `${(dispensedVolume / 200) * 100}%` }}
                      ></div>
                    )}
                  </div>
                  <p className="text-center text-green-300 text-xs mt-2">Drag pipette here to dispense</p>
                </div>
              </div>

              {/* Status Messages */}
              {isAspirating && (
                <div className="mt-4 text-center text-yellow-300 animate-pulse">
                  Aspirating liquid...
                </div>
              )}
              {isDispensing && (
                <div className="mt-4 text-center text-green-300 animate-pulse">
                  Dispensing liquid...
                </div>
              )}
            </div>

            {/* Right Panel - Results */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
              
              {/* Accuracy Display */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-2">Current Accuracy</h4>
                <div className="relative h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold text-white">
                      {accuracy.toFixed(1)}%
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke={accuracy >= 95 ? '#10b981' : accuracy >= 90 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(accuracy / 100) * 377} 377`}
                      className="transition-all duration-500"
                    />
                  </svg>
                </div>
              </div>

              {/* Trial History */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-2">Trial History</h4>
                <div className="max-h-48 overflow-y-auto">
                  {trials.length === 0 ? (
                    <p className="text-gray-400 text-xs">No trials completed yet</p>
                  ) : (
                    <div className="space-y-2">
                      {trials.map((trial, idx) => (
                        <div key={idx} className="bg-white/5 rounded p-2">
                          <div className="flex justify-between text-xs text-gray-300">
                            <span>Trial {trial.trial}</span>
                            <span className={
                              trial.accuracy >= 95 ? 'text-green-400' :
                              trial.accuracy >= 90 ? 'text-yellow-400' :
                              'text-red-400'
                            }>
                              {trial.accuracy.toFixed(1)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Target: {trial.target}μL | Actual: {trial.actual.toFixed(1)}μL
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tips and Feedback */}
              <div className="bg-teal-500/20 rounded-lg p-4">
                <h4 className="text-teal-300 text-sm font-semibold mb-2">💡 Pro Tips</h4>
                <ul className="text-teal-200 text-xs space-y-1">
                  <li>• Keep pipette vertical (90°) for best accuracy</li>
                  <li>• Immerse tip 2-3mm below liquid surface</li>
                  <li>• Aspirate and dispense slowly for precision</li>
                  <li>• Pre-wet tip for better accuracy</li>
                </ul>
              </div>

              {/* Complete Training Button */}
              {trials.length >= 5 && (
                <button
                  onClick={() => {
                    const avgAccuracy = trials.reduce((sum, t) => sum + t.accuracy, 0) / trials.length;
                    setStudentProfile(prev => ({
                      ...prev,
                      experimentsCompleted: prev.experimentsCompleted + 1,
                      totalScore: prev.totalScore + Math.round(avgAccuracy),
                      badges: avgAccuracy >= 95 ? [...prev.badges, 'Pipetting Expert'] : prev.badges
                    }));
                    setCurrentExperiment('dashboard');
                  }}
                  className="w-full mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Complete Training (Avg: {(trials.reduce((sum, t) => sum + t.accuracy, 0) / trials.length).toFixed(1)}%)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Buffer Preparation Component with Manual pH Adjustment
  const BufferPreparation = () => {
    const [currentpH, setCurrentpH] = useState(7.0);
    const [targetpH, setTargetpH] = useState(7.4);
    const [volume, setVolume] = useState(500); // mL
    const [molarity, setMolarity] = useState(0.1); // M
    const [chemicals, setChemicals] = useState({
      NaH2PO4: 0,
      Na2HPO4: 0,
      HCl: 0,
      NaOH: 0
    });
    const [isStirring, setIsStirring] = useState(false);
    const [pHProbe, setPHProbe] = useState(false);
    const [calculations, setCalculations] = useState({
      bufferRatio: 0,
      totalMoles: 0,
      mass1: 0,
      mass2: 0
    });
    const [draggedChemical, setDraggedChemical] = useState(null);
    const [mistakes, setMistakes] = useState([]);
    const [calibrationStatus, setCalibrationStatus] = useState('uncalibrated');

    // Henderson-Hasselbalch equation for phosphate buffer
    const calculateBufferRatio = () => {
      const pKa = 7.21; // for phosphate buffer
      const ratio = Math.pow(10, targetpH - pKa);
      const totalMoles = molarity * (volume / 1000);
      const molesBase = (totalMoles * ratio) / (1 + ratio);
      const molesAcid = totalMoles - molesBase;
      
      setCalculations({
        bufferRatio: ratio,
        totalMoles: totalMoles,
        mass1: molesAcid * 137.99, // MW of NaH2PO4
        mass2: molesBase * 141.96  // MW of Na2HPO4
      });
    };

    const handleChemicalDrop = (e, target) => {
      e.preventDefault();
      if (!draggedChemical) return;
      
      if (target === 'beaker') {
        if (draggedChemical === 'NaH2PO4') {
          setChemicals(prev => ({ ...prev, NaH2PO4: prev.NaH2PO4 + 0.5 }));
          setCurrentpH(prev => Math.max(4, prev - 0.2));
        } else if (draggedChemical === 'Na2HPO4') {
          setChemicals(prev => ({ ...prev, Na2HPO4: prev.Na2HPO4 + 0.5 }));
          setCurrentpH(prev => Math.min(10, prev + 0.2));
        } else if (draggedChemical === 'HCl') {
          setChemicals(prev => ({ ...prev, HCl: prev.HCl + 0.1 }));
          setCurrentpH(prev => Math.max(1, prev - 0.1));
        } else if (draggedChemical === 'NaOH') {
          setChemicals(prev => ({ ...prev, NaOH: prev.NaOH + 0.1 }));
          setCurrentpH(prev => Math.min(14, prev + 0.1));
        }
      }
      setDraggedChemical(null);
    };

    const calibratePHMeter = () => {
      setCalibrationStatus('calibrating');
      setTimeout(() => {
        setCalibrationStatus('calibrated');
        setPHProbe(true);
      }, 3000);
    };

    useEffect(() => {
      calculateBufferRatio();
    }, [targetpH, molarity, volume]);

    useEffect(() => {
      if (isStirring && pHProbe) {
        // Simulate pH stabilization
        const interval = setInterval(() => {
          const diff = targetpH - currentpH;
          if (Math.abs(diff) > 0.01) {
            setCurrentpH(prev => prev + diff * 0.1);
          }
        }, 500);
        return () => clearInterval(interval);
      }
    }, [isStirring, currentpH, targetpH, pHProbe]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-blue-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Buffer Preparation Lab</h1>
            <div className="text-white">Target pH: {targetpH}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Calculations */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Buffer Calculations</h3>
              
              <div className="mb-6">
                <label className="text-white text-sm font-semibold mb-2 block">Target pH:</label>
                <input
                  type="number"
                  min="6.0"
                  max="8.0"
                  step="0.1"
                  value={targetpH}
                  onChange={(e) => setTargetpH(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white"
                />
              </div>

              <div className="mb-6">
                <label className="text-white text-sm font-semibold mb-2 block">Volume (mL):</label>
                <input
                  type="number"
                  min="100"
                  max="1000"
                  step="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white"
                />
              </div>

              <div className="mb-6">
                <label className="text-white text-sm font-semibold mb-2 block">Molarity (M):</label>
                <input
                  type="number"
                  min="0.01"
                  max="1.0"
                  step="0.01"
                  value={molarity}
                  onChange={(e) => setMolarity(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white"
                />
              </div>

              <div className="bg-blue-500/20 rounded-lg p-4 mb-4">
                <h4 className="text-blue-300 text-sm font-semibold mb-2">Henderson-Hasselbalch:</h4>
                <p className="text-blue-200 text-xs font-mono">
                  pH = pKa + log([A⁻]/[HA])
                </p>
                <p className="text-blue-200 text-xs mt-2">
                  pKa (phosphate) = 7.21
                </p>
              </div>

              <div className="bg-green-500/20 rounded-lg p-4">
                <h4 className="text-green-300 text-sm font-semibold mb-2">Required Masses:</h4>
                <div className="space-y-2 text-green-200 text-sm">
                  <p>NaH₂PO₄: {calculations.mass1.toFixed(2)}g</p>
                  <p>Na₂HPO₄: {calculations.mass2.toFixed(2)}g</p>
                  <p>Ratio: 1:{calculations.bufferRatio.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Center Panel - Workspace */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Laboratory Bench</h3>
              
              {/* pH Meter */}
              <div className="mb-6">
                <div className="bg-gray-800 rounded-lg p-4 relative">
                  <div className="bg-green-400 text-black px-4 py-2 rounded text-center font-mono text-2xl mb-2">
                    pH: {pHProbe ? currentpH.toFixed(2) : '--.-'}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={calibratePHMeter}
                      disabled={calibrationStatus === 'calibrated'}
                      className={`px-4 py-1 rounded text-sm ${
                        calibrationStatus === 'calibrated' 
                          ? 'bg-green-500 text-white' 
                          : calibrationStatus === 'calibrating'
                          ? 'bg-yellow-500 text-black animate-pulse'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {calibrationStatus === 'calibrated' ? '✓ Calibrated' :
                       calibrationStatus === 'calibrating' ? 'Calibrating...' :
                       'Calibrate'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Beaker with Magnetic Stirrer */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleChemicalDrop(e, 'beaker')}
                className="relative mb-6"
              >
                <div className="w-48 h-56 bg-gradient-to-b from-transparent to-blue-300/30 border-2 border-gray-400 rounded-b-lg mx-auto relative">
                  {/* Solution level */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/50 to-blue-400/30 rounded-b-lg transition-all duration-500"
                    style={{ height: `${(volume / 1000) * 80}%` }}
                  >
                    {/* Stirring animation */}
                    {isStirring && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 h-1 bg-white rounded animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* pH Probe */}
                  {pHProbe && (
                    <div className="absolute top-4 right-4 w-2 h-32 bg-gray-600 rounded-full"></div>
                  )}
                  
                  {/* Volume markings */}
                  <div className="absolute left-0 top-1/4 text-xs text-gray-400">750mL</div>
                  <div className="absolute left-0 top-1/2 text-xs text-gray-400">500mL</div>
                  <div className="absolute left-0 top-3/4 text-xs text-gray-400">250mL</div>
                </div>
                
                {/* Magnetic Stirrer Base */}
                <div className="w-56 h-8 bg-gray-700 rounded mx-auto flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setIsStirring(!isStirring)}
                    className={`px-3 py-1 rounded text-xs ${
                      isStirring ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                  >
                    {isStirring ? 'Stirring ON' : 'Stirring OFF'}
                  </button>
                  <div className="text-white text-xs">RPM: {isStirring ? '300' : '0'}</div>
                </div>
              </div>

              <p className="text-center text-blue-300 text-sm">
                Drag chemicals to beaker to adjust pH
              </p>
            </div>

            {/* Right Panel - Chemical Shelf */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Chemical Shelf</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Buffer Salts */}
                <div
                  draggable
                  onDragStart={() => setDraggedChemical('NaH2PO4')}
                  className="cursor-move"
                >
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🧪</div>
                    <p className="text-xs font-semibold">NaH₂PO₄</p>
                    <p className="text-xs text-gray-600">Monobasic</p>
                    <p className="text-xs text-blue-600">{chemicals.NaH2PO4.toFixed(1)}g added</p>
                  </div>
                </div>
                
                <div
                  draggable
                  onDragStart={() => setDraggedChemical('Na2HPO4')}
                  className="cursor-move"
                >
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🧪</div>
                    <p className="text-xs font-semibold">Na₂HPO₄</p>
                    <p className="text-xs text-gray-600">Dibasic</p>
                    <p className="text-xs text-blue-600">{chemicals.Na2HPO4.toFixed(1)}g added</p>
                  </div>
                </div>
                
                {/* pH Adjusters */}
                <div
                  draggable
                  onDragStart={() => setDraggedChemical('HCl')}
                  className="cursor-move"
                >
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">⚗️</div>
                    <p className="text-xs font-semibold">HCl (1M)</p>
                    <p className="text-xs text-gray-600">Acid</p>
                    <p className="text-xs text-red-600">{chemicals.HCl.toFixed(1)}mL added</p>
                  </div>
                </div>
                
                <div
                  draggable
                  onDragStart={() => setDraggedChemical('NaOH')}
                  className="cursor-move"
                >
                  <div className="bg-blue-100 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">⚗️</div>
                    <p className="text-xs font-semibold">NaOH (1M)</p>
                    <p className="text-xs text-gray-600">Base</p>
                    <p className="text-xs text-blue-600">{chemicals.NaOH.toFixed(1)}mL added</p>
                  </div>
                </div>
              </div>

              {/* pH Indicator */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-2">pH Status:</h4>
                <div className="relative h-8 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full">
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black transition-all duration-500"
                    style={{ left: `${((currentpH - 1) / 13) * 100}%` }}
                  ></div>
                  <div className="flex justify-between text-xs text-white mt-1">
                    <span>1</span>
                    <span>7</span>
                    <span>14</span>
                  </div>
                </div>
              </div>

              {/* Success Criteria */}
              <div className="bg-yellow-500/20 rounded-lg p-4">
                <h4 className="text-yellow-300 text-sm font-semibold mb-2">Success Criteria:</h4>
                <ul className="text-yellow-200 text-xs space-y-1">
                  <li>✓ pH within ±0.05 of target</li>
                  <li>✓ Correct buffer salt ratio</li>
                  <li>✓ Proper calibration performed</li>
                  <li>✓ Magnetic stirring used</li>
                </ul>
              </div>

              {/* Complete Button */}
              {Math.abs(currentpH - targetpH) < 0.05 && pHProbe && (
                <button
                  onClick={() => {
                    const score = 100 - mistakes.length * 5;
                    setStudentProfile(prev => ({
                      ...prev,
                      experimentsCompleted: prev.experimentsCompleted + 1,
                      totalScore: prev.totalScore + Math.max(70, score),
                      badges: score >= 95 ? [...prev.badges, 'Buffer Master'] : prev.badges
                    }));
                    setCurrentExperiment('dashboard');
                  }}
                  className="w-full mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  ✓ Buffer Successfully Prepared!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cell Culture Component with Sterile Technique
  const CellCulture = () => {
    const [sterileField, setSterileField] = useState(false);
    const [cellCount, setCellCount] = useState(2.5e5); // cells/mL
    const [viability, setViability] = useState(95);
    const [contamination, setContamination] = useState(false);
    const [currentStep, setCurrentStep] = useState('setup');
    const [hands, setHands] = useState({ sterile: false, gloved: false });
    const [hoodAirflow, setHoodAirflow] = useState(false);
    const [uvLight, setUVLight] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    const [flaskStatus, setFlaskStatus] = useState({
      confluency: 80,
      media: 'old',
      cells: 'adherent'
    });
    const [techniques, setTechniques] = useState({
      sprayedHands: false,
      sprayedItems: false,
      flameSterlized: false,
      properPipetting: false
    });

    const tools = [
      { id: 'pipette', name: 'Serological Pipette', sterile: true },
      { id: 'flask', name: 'T75 Flask', sterile: true },
      { id: 'media', name: 'Growth Media', sterile: true },
      { id: 'trypsin', name: 'Trypsin-EDTA', sterile: true },
      { id: 'pbs', name: 'PBS', sterile: true },
      { id: 'hemocytometer', name: 'Hemocytometer', sterile: false }
    ];

    const performSterileCheck = () => {
      if (!hands.gloved || !hands.sterile) {
        setContamination(true);
        return false;
      }
      if (!hoodAirflow) {
        setContamination(true);
        return false;
      }
      if (!techniques.sprayedItems) {
        setContamination(true);
        return false;
      }
      return true;
    };

    const countCells = () => {
      // Hemocytometer calculation
      const gridCount = Math.floor(Math.random() * 50) + 200;
      const dilutionFactor = 2;
      const volumeFactor = 1e4; // for hemocytometer
      const calculatedCount = gridCount * dilutionFactor * volumeFactor;
      setCellCount(calculatedCount);
      
      // Calculate viability
      const liveCount = gridCount * 0.95;
      const deadCount = gridCount * 0.05;
      setViability((liveCount / (liveCount + deadCount)) * 100);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-green-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Cell Culture Techniques</h1>
            <div className={`px-4 py-2 rounded ${contamination ? 'bg-red-500' : 'bg-green-500'}`}>
              {contamination ? '⚠️ CONTAMINATED' : '✓ STERILE'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Biosafety Cabinet */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">Biosafety Cabinet</h3>
              
              {/* Hood Controls */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setHoodAirflow(!hoodAirflow)}
                  className={`px-4 py-2 rounded ${
                    hoodAirflow ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}
                >
                  {hoodAirflow ? '💨 Airflow ON' : '💨 Airflow OFF'}
                </button>
                <button
                  onClick={() => {
                    setUVLight(!uvLight);
                    if (!uvLight) {
                      setTimeout(() => setSterileField(true), 5000);
                    }
                  }}
                  className={`px-4 py-2 rounded ${
                    uvLight ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
                  }`}
                >
                  {uvLight ? '🟣 UV ON' : '⚪ UV OFF'}
                </button>
                <div className="flex items-center text-white">
                  <Thermometer className="w-4 h-4 mr-2" />
                  <span>HEPA Filter: {hoodAirflow ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              {/* Work Surface */}
              <div className={`relative h-96 rounded-lg ${
                sterileField ? 'bg-gradient-to-b from-blue-100 to-blue-50' : 'bg-gray-200'
              } ${uvLight ? 'opacity-50' : ''}`}>
                {uvLight && (
                  <div className="absolute inset-0 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <p className="text-purple-900 font-bold">UV Sterilization in Progress...</p>
                  </div>
                )}
                
                {!uvLight && (
                  <div className="p-4">
                    {/* Cell Flask */}
                    <div className="absolute top-8 left-8">
                      <div className="w-32 h-24 bg-red-200 rounded border-2 border-red-400 relative">
                        <div className="absolute inset-2 bg-red-300 rounded">
                          <div className="text-xs text-center mt-1">T75 Flask</div>
                          <div className="text-xs text-center">Confluency: {flaskStatus.confluency}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Media Bottles */}
                    <div className="absolute top-8 right-8 space-y-2">
                      <div className="w-16 h-20 bg-pink-200 rounded border-2 border-pink-400">
                        <div className="text-xs text-center mt-1">Media</div>
                      </div>
                      <div className="w-16 h-20 bg-blue-200 rounded border-2 border-blue-400">
                        <div className="text-xs text-center mt-1">PBS</div>
                      </div>
                      <div className="w-16 h-20 bg-yellow-200 rounded border-2 border-yellow-400">
                        <div className="text-xs text-center mt-1">Trypsin</div>
                      </div>
                    </div>

                    {/* Waste Container */}
                    <div className="absolute bottom-8 right-8">
                      <div className="w-20 h-20 bg-gray-400 rounded-full border-2 border-gray-600">
                        <div className="text-xs text-center mt-6">Waste</div>
                      </div>
                    </div>

                    {/* Pipette Aid */}
                    {selectedTool === 'pipette' && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-32 bg-green-400 rounded-t-lg"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Step Instructions */}
              <div className="mt-4 bg-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-300 text-sm font-semibold mb-2">Current Step: {currentStep}</h4>
                <div className="text-blue-200 text-sm">
                  {currentStep === 'setup' && 'Prepare biosafety cabinet and sterilize work area'}
                  {currentStep === 'remove_media' && 'Aspirate old media from flask'}
                  {currentStep === 'wash' && 'Wash cells with 5mL PBS'}
                  {currentStep === 'trypsinize' && 'Add 3mL trypsin and incubate 5 min at 37°C'}
                  {currentStep === 'neutralize' && 'Add 7mL media to neutralize trypsin'}
                  {currentStep === 'count' && 'Count cells using hemocytometer'}
                  {currentStep === 'plate' && 'Plate cells at desired density'}
                </div>
              </div>
            </div>

            {/* Right Panel - Controls and Monitoring */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Sterile Technique</h3>
              
              {/* Hand Preparation */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-2">Hand Preparation:</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setHands(prev => ({ ...prev, gloved: true }))}
                    className={`w-full px-3 py-2 rounded text-sm ${
                      hands.gloved ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                  >
                    {hands.gloved ? '✓ Gloves On' : 'Put On Gloves'}
                  </button>
                  <button
                    onClick={() => {
                      if (hands.gloved) {
                        setHands(prev => ({ ...prev, sterile: true }));
                        setTechniques(prev => ({ ...prev, sprayedHands: true }));
                      }
                    }}
                    disabled={!hands.gloved}
                    className={`w-full px-3 py-2 rounded text-sm ${
                      hands.sterile ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    } ${!hands.gloved ? 'opacity-50' : ''}`}
                  >
                    {hands.sterile ? '✓ 70% Ethanol Applied' : 'Spray with 70% Ethanol'}
                  </button>
                </div>
              </div>

              {/* Item Sterilization */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-2">Item Sterilization:</h4>
                <button
                  onClick={() => setTechniques(prev => ({ ...prev, sprayedItems: true }))}
                  className={`w-full px-3 py-2 rounded text-sm ${
                    techniques.sprayedItems ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                  }`}
                >
                  {techniques.sprayedItems ? '✓ Items Sterilized' : 'Spray All Items'}
                </button>
              </div>

              {/* Cell Counting */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-semibold mb-2">Cell Counting:</h4>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-300">Count:</div>
                    <div className="text-white font-mono">{cellCount.toExponential(2)}/mL</div>
                    <div className="text-gray-300">Viability:</div>
                    <div className="text-white font-mono">{viability.toFixed(1)}%</div>
                  </div>
                  <button
                    onClick={countCells}
                    className="w-full mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Count Cells
                  </button>
                </div>
              </div>

              {/* Contamination Alert */}
              {contamination && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                  <h4 className="text-red-300 font-semibold mb-2">⚠️ Contamination Detected!</h4>
                  <p className="text-red-200 text-xs">
                    Sterile technique was broken. Common causes:
                  </p>
                  <ul className="text-red-200 text-xs mt-2 space-y-1">
                    <li>• Working without gloves</li>
                    <li>• No airflow in hood</li>
                    <li>• Items not sterilized</li>
                  </ul>
                </div>
              )}

              {/* Success Metrics */}
              <div className="bg-green-500/20 rounded-lg p-4">
                <h4 className="text-green-300 text-sm font-semibold mb-2">Success Metrics:</h4>
                <div className="space-y-2 text-green-200 text-xs">
                  <div className="flex justify-between">
                    <span>Sterility Maintained:</span>
                    <span>{!contamination ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cell Viability:</span>
                    <span>{viability >= 90 ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Proper Technique:</span>
                    <span>{techniques.sprayedHands && techniques.sprayedItems ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              {currentStep === 'plate' && !contamination && (
                <button
                  onClick={() => {
                    const score = contamination ? 50 : 100;
                    setStudentProfile(prev => ({
                      ...prev,
                      experimentsCompleted: prev.experimentsCompleted + 1,
                      totalScore: prev.totalScore + score,
                      badges: !contamination ? [...prev.badges, 'Sterile Technique'] : prev.badges
                    }));
                    setCurrentExperiment('dashboard');
                  }}
                  className="w-full mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Complete Cell Culture Lab
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Western Blot Component with Manual Gel Loading
  const WesternBlot = () => {
    const [currentPhase, setCurrentPhase] = useState('gel-prep');
    const [gelWells, setGelWells] = useState(Array(10).fill(null));
    const [loadingDye, setLoadingDye] = useState(false);
    const [samples, setSamples] = useState([
      { id: 'ladder', name: 'Protein Ladder', color: '#FF6B6B', loaded: false },
      { id: 'control', name: 'Positive Control', color: '#4ECDC4', loaded: false },
      { id: 'sample1', name: 'Sample 1', color: '#45B7D1', loaded: false },
      { id: 'sample2', name: 'Sample 2', color: '#96E6A1', loaded: false },
      { id: 'sample3', name: 'Sample 3', color: '#FFEAA7', loaded: false }
    ]);
    const [electrophoresisRunning, setElectrophoresisRunning] = useState(false);
    const [voltage, setVoltage] = useState(120);
    const [runTime, setRunTime] = useState(0);
    const [transferSetup, setTransferSetup] = useState({
      membrane: false,
      filterPaper: false,
      sandwich: false
    });
    const [antibodies, setAntibodies] = useState({
      primary: false,
      secondary: false,
      substrate: false
    });
    const [bands, setBands] = useState([]);
    const [draggedSample, setDraggedSample] = useState(null);
    const [micropipette, setMicropipette] = useState({ tip: false, sample: null });

    const handleWellDrop = (e, wellIndex) => {
      e.preventDefault();
      if (draggedSample && !gelWells[wellIndex]) {
        const newWells = [...gelWells];
        newWells[wellIndex] = draggedSample;
        setGelWells(newWells);
        
        setSamples(prev => prev.map(s => 
          s.id === draggedSample ? { ...s, loaded: true } : s
        ));
      }
      setDraggedSample(null);
    };

    const runElectrophoresis = () => {
      setElectrophoresisRunning(true);
      const interval = setInterval(() => {
        setRunTime(prev => {
          if (prev >= 60) {
            setElectrophoresisRunning(false);
            generateBands();
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    };

    const generateBands = () => {
      const newBands = gelWells.map((sample, index) => {
        if (!sample) return null;
        if (sample === 'ladder') {
          return [250, 150, 100, 75, 50, 37, 25, 20, 15, 10];
        }
        return [75, 50, 25]; // Sample bands
      });
      setBands(newBands);
    };

    const phases = [
      'gel-prep',
      'sample-loading',
      'electrophoresis',
      'transfer',
      'blocking',
      'antibody-incubation',
      'detection'
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentExperiment('dashboard')}
              className="text-white hover:text-purple-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Western Blot Analysis</h1>
            <div className="text-white">Phase: {currentPhase}</div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex space-x-2">
              {phases.map((phase, idx) => (
                <div
                  key={phase}
                  className={`flex-1 h-2 rounded ${
                    phases.indexOf(currentPhase) >= idx ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-purple-300 mt-2">
              {phases.map(phase => (
                <span key={phase}>{phase.split('-').join(' ')}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Workspace */}
            <div className="col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              {currentPhase === 'gel-prep' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Prepare SDS-PAGE Gel</h3>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3">Resolving Gel (12%)</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• 4.0 mL H₂O</li>
                          <li>• 4.0 mL 30% Acrylamide</li>
                          <li>• 2.5 mL 1.5M Tris pH 8.8</li>
                          <li>• 0.1 mL 10% SDS</li>
                          <li>• 0.1 mL 10% APS</li>
                          <li>• 0.004 mL TEMED</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-3">Stacking Gel (5%)</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li>• 2.1 mL H₂O</li>
                          <li>• 0.5 mL 30% Acrylamide</li>
                          <li>• 0.38 mL 1M Tris pH 6.8</li>
                          <li>• 0.03 mL 10% SDS</li>
                          <li>• 0.03 mL 10% APS</li>
                          <li>• 0.003 mL TEMED</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentPhase('sample-loading')}
                      className="mt-6 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
                    >
                      Gel Polymerized - Continue
                    </button>
                  </div>
                </div>
              )}

              {currentPhase === 'sample-loading' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Load Samples into Gel</h3>
                  
                  {/* Gel Wells */}
                  <div className="bg-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex justify-center space-x-1">
                      {gelWells.map((well, idx) => (
                        <div
                          key={idx}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleWellDrop(e, idx)}
                          className="relative"
                        >
                          <div className="w-8 h-16 bg-gray-700 rounded-b border-2 border-gray-800">
                            {well && (
                              <div
                                className="absolute bottom-0 left-0 right-0 rounded-b"
                                style={{
                                  backgroundColor: samples.find(s => s.id === well)?.color,
                                  height: '40%'
                                }}
                              />
                            )}
                          </div>
                          <div className="text-xs text-center mt-1">{idx + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micropipette */}
                  <div className="text-center mb-6">
                    <div className="inline-block">
                      <div className="w-6 h-24 bg-blue-500 rounded-t-lg mx-auto relative">
                        {micropipette.tip && (
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-300"></div>
                        )}
                      </div>
                      <button
                        onClick={() => setMicropipette(prev => ({ ...prev, tip: !prev.tip }))}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        {micropipette.tip ? 'Eject Tip' : 'Attach Tip'}
                      </button>
                    </div>
                  </div>

                  {/* Sample Tubes */}
                  <div className="flex justify-center space-x-4">
                    {samples.map(sample => (
                      <div
                        key={sample.id}
                        draggable={!sample.loaded}
                        onDragStart={() => setDraggedSample(sample.id)}
                        className={`cursor-${sample.loaded ? 'not-allowed opacity-50' : 'move'}`}
                      >
                        <div className="w-12 h-16 rounded-b-full border-2 border-gray-400"
                          style={{ backgroundColor: sample.color }}
                        >
                        </div>
                        <p className="text-xs text-white text-center mt-1">{sample.name}</p>
                      </div>
                    ))}
                  </div>

                  {samples.filter(s => s.loaded).length >= 3 && (
                    <button
                      onClick={() => setCurrentPhase('electrophoresis')}
                      className="mt-6 w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    >
                      Samples Loaded - Run Gel
                    </button>
                  )}
                </div>
              )}

              {currentPhase === 'electrophoresis' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Gel Electrophoresis</h3>
                  
                  {/* Electrophoresis Tank */}
                  <div className="bg-blue-900 rounded-lg p-6 relative">
                    <div className="absolute top-2 left-2 text-red-500 font-bold">(-)</div>
                    <div className="absolute bottom-2 right-2 text-black font-bold">(+)</div>
                    
                    {/* Gel Visualization */}
                    <div className="bg-gray-300 rounded mx-auto w-64 h-80 relative">
                      {bands.map((bandSet, laneIdx) => (
                        bandSet && bandSet.map((size, bandIdx) => (
                          <div
                            key={`${laneIdx}-${bandIdx}`}
                            className="absolute bg-blue-600 rounded"
                            style={{
                              left: `${10 + laneIdx * 20}%`,
                              top: `${10 + (bandIdx * 8) + (electrophoresisRunning ? runTime : 0)}%`,
                              width: '15%',
                              height: '2px',
                              transition: 'top 0.5s'
                            }}
                          />
                        ))
                      ))}
                    </div>
                    
                    {/* Controls */}
                    <div className="mt-4 flex items-center justify-center space-x-4">
                      <div>
                        <label className="text-white text-sm">Voltage:</label>
                        <input
                          type="range"
                          min="80"
                          max="200"
                          value={voltage}
                          onChange={(e) => setVoltage(e.target.value)}
                          className="ml-2"
                        />
                        <span className="text-white ml-2">{voltage}V</span>
                      </div>
                      <button
                        onClick={runElectrophoresis}
                        disabled={electrophoresisRunning}
                        className={`px-4 py-2 rounded ${
                          electrophoresisRunning 
                            ? 'bg-yellow-500 animate-pulse' 
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {electrophoresisRunning ? `Running... ${runTime}min` : 'Start Run'}
                      </button>
                    </div>
                  </div>

                  {runTime >= 60 && (
                    <button
                      onClick={() => setCurrentPhase('transfer')}
                      className="mt-6 w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
                    >
                      Continue to Transfer
                    </button>
                  )}
                </div>
              )}

              {currentPhase === 'transfer' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Transfer to Membrane</h3>
                  
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">Transfer Sandwich Assembly:</h4>
                    
                    <div className="space-y-3 max-w-md mx-auto">
                      {/* Transfer sandwich layers */}
                      <div className={`h-8 rounded ${transferSetup.sandwich ? 'bg-black' : 'bg-gray-700'} 
                        flex items-center justify-center text-white text-sm`}>
                        Cassette (-)
                      </div>
                      <div className={`h-8 rounded ${transferSetup.filterPaper ? 'bg-gray-400' : 'bg-gray-600'} 
                        flex items-center justify-center text-black text-sm`}>
                        Filter Paper
                      </div>
                      <div className={`h-8 rounded ${bands.length > 0 ? 'bg-blue-400' : 'bg-gray-600'} 
                        flex items-center justify-center text-white text-sm`}>
                        Gel
                      </div>
                      <div className={`h-8 rounded ${transferSetup.membrane ? 'bg-white' : 'bg-gray-600'} 
                        flex items-center justify-center text-black text-sm border`}>
                        PVDF Membrane
                      </div>
                      <div className={`h-8 rounded ${transferSetup.filterPaper ? 'bg-gray-400' : 'bg-gray-600'} 
                        flex items-center justify-center text-black text-sm`}>
                        Filter Paper
                      </div>
                      <div className={`h-8 rounded ${transferSetup.sandwich ? 'bg-red-600' : 'bg-gray-700'} 
                        flex items-center justify-center text-white text-sm`}>
                        Cassette (+)
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <button
                        onClick={() => setTransferSetup(prev => ({ ...prev, membrane: true }))}
                        className={`w-full px-4 py-2 rounded text-white ${
                          transferSetup.membrane ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      >
                        {transferSetup.membrane ? '✓ Membrane Activated' : 'Activate PVDF Membrane'}
                      </button>
                      <button
                        onClick={() => setTransferSetup(prev => ({ ...prev, filterPaper: true }))}
                        className={`w-full px-4 py-2 rounded text-white ${
                          transferSetup.filterPaper ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      >
                        {transferSetup.filterPaper ? '✓ Filter Paper Soaked' : 'Soak Filter Paper'}
                      </button>
                      <button
                        onClick={() => setTransferSetup(prev => ({ ...prev, sandwich: true }))}
                        disabled={!transferSetup.membrane || !transferSetup.filterPaper}
                        className={`w-full px-4 py-2 rounded text-white ${
                          transferSetup.sandwich ? 'bg-green-500' : 'bg-gray-500'
                        } ${(!transferSetup.membrane || !transferSetup.filterPaper) ? 'opacity-50' : ''}`}
                      >
                        {transferSetup.sandwich ? '✓ Sandwich Assembled' : 'Assemble Transfer Sandwich'}
                      </button>
                    </div>

                    {transferSetup.sandwich && (
                      <div className="mt-6">
                        <div className="bg-blue-500/20 rounded p-4">
                          <p className="text-blue-300 text-sm">Transfer conditions: 100V for 60 minutes at 4°C</p>
                        </div>
                        <button
                          onClick={() => setCurrentPhase('blocking')}
                          className="mt-4 w-full bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
                        >
                          Transfer Complete - Continue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentPhase === 'detection' && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Detection Results</h3>
                  
                  <div className="bg-black rounded-lg p-6">
                    <div className="bg-gray-900 rounded p-4">
                      {/* Simulated Western Blot bands */}
                      <svg className="w-full h-64">
                        {bands.map((bandSet, laneIdx) => (
                          bandSet && bandSet.map((size, bandIdx) => (
                            <rect
                              key={`${laneIdx}-${bandIdx}`}
                              x={`${15 + laneIdx * 15}%`}
                              y={`${20 + bandIdx * 20}`}
                              width="10%"
                              height="8"
                              fill={antibodies.substrate ? '#00ff00' : '#333'}
                              opacity={antibodies.substrate ? 0.8 : 0.3}
                              filter={antibodies.substrate ? 'url(#glow)' : ''}
                            />
                          ))
                        ))}
                        <defs>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-green-400 font-semibold">Western Blot Complete!</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Target protein detected at expected molecular weight
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStudentProfile(prev => ({
                        ...prev,
                        experimentsCompleted: prev.experimentsCompleted + 1,
                        totalScore: prev.totalScore + 95,
                        badges: [...prev.badges, 'Western Blot Expert']
                      }));
                      setCurrentExperiment('dashboard');
                    }}
                    className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                  >
                    Complete Western Blot Analysis
                  </button>
                </div>
              )}
            </div>

            {/* Side Panel - Protocol Guide */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Protocol Guide</h3>
              
              <div className="space-y-4">
                {phases.map((phase, idx) => (
                  <div
                    key={phase}
                    className={`p-3 rounded ${
                      currentPhase === phase 
                        ? 'bg-purple-500/30 border border-purple-400' 
                        : phases.indexOf(currentPhase) > idx
                        ? 'bg-green-500/20 border border-green-400'
                        : 'bg-gray-500/20 border border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-semibold">
                        {idx + 1}. {phase.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                      {phases.indexOf(currentPhase) > idx && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-500/20 rounded-lg p-4">
                <h4 className="text-yellow-300 text-sm font-semibold mb-2">Critical Points:</h4>
                <ul className="text-yellow-200 text-xs space-y-1">
                  <li>• Keep samples on ice</li>
                  <li>• Don't let gel dry out</li>
                  <li>• Remove air bubbles in transfer</li>
                  <li>• Block for sufficient time</li>
                  <li>• Proper antibody dilutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
