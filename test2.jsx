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
    const [pipetteVolume, setPipetteVolume] = useState(100);
    const [targetVolume] = useState(100);
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
            <div className="text-white">Practice Mode</div>
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

  // Main render function
  return (
    <div className="min-h-screen bg-gray-100">
      {currentExperiment === 'dashboard' && <Dashboard />}
      {currentExperiment === 'pipetting-training' && <PipettingTraining />}
    </div>
  );
};

export default EnhancedBiomedicalLabPlatform;
