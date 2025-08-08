<div className="bg-white rounded-lg p-6">
  <h3 className="text-2xl font-bold mb-6">Apply Decolorizer</h3>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div>
      <div className="bg-red-50 p-4 rounded-lg mb-4">
        <h4 className="font-semibold text-red-800 mb-2">⚠️ Critical Step!</h4>
        <p className="text-red-700 text-sm">
          This is the most critical step! Add decolorizer drop by drop until 
          no more purple dye runs off the slide. Over-decolorization causes false negatives.
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔬 Decolorization Mechanism</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Gram-positive:</strong> Thick peptidoglycan retains purple complexes</li>
          <li>• <strong>Gram-negative:</strong> Thin peptidoglycan allows complex removal</li>
          <li>• Alcohol/acetone dissolves lipids in outer membrane</li>
        </ul>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-16 bg-red-300 rounded border-2 border-red-500 flex items-end justify-center">
          <Droplets className="w-6 h-6 text-red-700 mb-1" />
        </div>
        <div>
          <p className="font-semibold">Ethyl Alcohol Decolorizer</p>
          <p className="text-sm text-gray-600">Removes stain from Gram-negative bacteria</p>
        </div>
      </div>
    </div>

    <div>
      <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
      <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
        <svg className="absolute inset-4 w-56 h-56">
          {renderBacterialCells()}
        </svg>
        <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
          1000x
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        {stainingProgress.decolorized ? 
          (bacteriaTypes[selectedBacteria].type === 'Gram-positive' ? 
            'Bacteria remain purple (Gram-positive)' : 
            'Bacteria appear colorless (Gram-negative)'
          ) : 'Ready for decolorization'
        }
      </p>
    </div>
  </div>

  <button
    onClick={() => applyStain('decolorizer')}
    disabled={stainingProgress.decolorized}
    className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
  >
    {stainingProgress.decolorized ? '✅ Decolorizer Applied' : 'Apply Decolorizer'}
  </button>
</div>

{step === 7 && (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-2xl font-bold mb-6">Apply Safranin (Counterstain)</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="bg-pink-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-pink-800 mb-2">🔬 Counterstain Purpose</h4>
          <p className="text-pink-700 text-sm">
            Safranin provides color to decolorized Gram-negative bacteria, 
            making them visible as pink/red. Gram-positive bacteria remain purple 
            because the darker crystal violet masks the lighter safranin.
          </p>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-16 bg-pink-400 rounded border-2 border-pink-600 flex items-end justify-center">
            <Droplets className="w-6 h-6 text-white mb-1" />
          </div>
          <div>
            <p className="font-semibold">Safranin Solution</p>
            <p className="text-sm text-gray-600">Counterstain - colors decolorized bacteria pink</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h5 className="font-semibold text-green-800 mb-2">Final Results:</h5>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Gram-positive:</strong> Purple/violet color</li>
            <li>• <strong>Gram-negative:</strong> Pink/red color</li>
            <li>• Clear differentiation between bacterial types</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
        <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
          <svg className="absolute inset-4 w-56 h-56">
            {renderBacterialCells()}
          </svg>
          <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
            1000x
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {stainingProgress.safranin ? 
            `Final result: ${bacteriaTypes[selectedBacteria].finalColor} ${bacteriaTypes[selectedBacteria].name}` : 
            'Ready for counterstain'
          }
        </p>
      </div>
    </div>

    <button
      onClick={() => applyStain('safranin')}
      disabled={stainingProgress.safranin}
      className="mt-6 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 disabled:bg-gray-400"
    >
      {stainingProgress.safranin ? '✅ Safranin Applied' : 'Apply Safranin'}
    </button>
  </div>
)}

{step === 9 && (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-2xl font-bold mb-6">Microscopic Examination and Results</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold mb-4">Final Microscopic Analysis:</h4>
        <div className="w-80 h-80 bg-black rounded-full mx-auto relative border-4 border-gray-600 mb-4">
          <svg className="absolute inset-4 w-72 h-72">
            {renderBacterialCells()}
          </svg>
          <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
            1000x Oil Immersion
          </div>
        </div>
        
        <div className="text-center">
          <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${
            bacteriaTypes[selectedBacteria].finalColor === 'purple' 
              ? 'bg-purple-100 text-purple-800 border border-purple-300' 
              : 'bg-pink-100 text-pink-800 border border-pink-300'
          }`}>
            {bacteriaTypes[selectedBacteria].name}: {bacteriaTypes[selectedBacteria].type}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Results Analysis:</h4>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${
            bacteriaTypes[selectedBacteria].finalColor === 'purple' 
              ? 'bg-purple-50 border-purple-200' 
              : 'bg-pink-50 border-pink-200'
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
              <li><strong>Morphology:</strong> {bacteriaTypes[selectedBacteria].shape}</li>
              <li><strong>Cell Wall:</strong> {
                bacteriaTypes[selectedBacteria].type === 'Gram-positive' 
                  ? 'Thick peptidoglycan layer (20-80nm)' 
                  : 'Thin peptidoglycan + outer membrane'
              }</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">Clinical Significance:</h5>
            <p className="text-sm text-blue-700">
              {bacteriaTypes[selectedBacteria].type === 'Gram-positive' 
                ? 'Gram-positive bacteria are generally more susceptible to penicillin, vancomycin, and β-lactam antibiotics due to their accessible peptidoglycan layer.'
                : 'Gram-negative bacteria have an outer membrane barrier that can make them more resistant to certain antibiotics. They may require different treatment approaches.'
              }
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2">Lab Performance Summary:</h5>
            <div className="text-sm text-green-700 space-y-1">
              <p><strong>Actions Completed:</strong> {userActions.length}</p>
              <p><strong>Technical Errors:</strong> {mistakes.length}</p>
              <p><strong>Staining Result:</strong> {bacteriaTypes[selectedBacteria].type} (Correct)</p>
              <p><strong>Grade:</strong> {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const grade = mistakes.length === 0 ? 100 : Math.max(75, 100 - mistakes.length * 5);
              const updatedProfile = {
                ...studentProfile,
                experimentsCompleted: studentProfile.experimentsCompleted + 1,
                totalScore: studentProfile.totalScore + grade,
                labProgress: {
                  ...studentProfile.labProgress,
                  'gram-staining': 'completed'
                },
                badges: [...new Set([...studentProfile.badges, 'Bacterial Classification Expert'])]
              };
              saveUserData(updatedProfile);
              setCurrentExperiment('dashboard');
            }}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600"
          >
            Complete Gram Staining Lab
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{mistakes.length > 0 && (
  <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
    <h4 className="text-red-300 font-semibold mb-2">⚠️ Lab Notes ({mistakes.length} issues)</h4>
    <ul className="text-red-200 text-sm space-y-1">
      {mistakes.slice(-3).map((mistake, index) => (
        <li key={index}>• {mistake}</li>
      ))}
    </ul>
  </div>
)}

// Cell Staining Component (Cytoskeleton & Nucleus)
const CellStaining = () => {
  const [step, setStep] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);
  const [userActions, setUserActions] = useState([]);
  const [mistakes, setMistakes] = useState([]);
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
  const [selectedWell, setSelectedWell] = useState(1);
  const [microscopyFilter, setMicroscopyFilter] = useState('brightfield');

  const steps = [
    "Prepare Cell Culture Plate",
    "Cell Permeabilization with Triton X-100",
    "Wait for Permeabilization (5 minutes)",
    "Wash Cells with PBS Buffer",
    "Block Non-specific Binding Sites",
    "Wait for Blocking (20 minutes)",
    "Apply Phalloidin-Alexa 488 (Actin Stain)",
    "Wait for Actin Staining (20 minutes)",
    "Apply DAPI Nuclear Stain",
    "Wait for Nuclear Staining (3 minutes)",
    "Fluorescence Microscopy Analysis"
  ];

  const filters = {
    brightfield: { name: 'Brightfield', color: '#f3f4f6', description: 'Normal light microscopy' },
    blue: { name: 'FITC (488nm)', color: '#22c55e', description: 'Actin filaments (green)' },
    violet: { name: 'DAPI (358nm)', color: '#3b82f6', description: 'Cell nuclei (blue)' },
    merged: { name: 'Merged Channels', color: '#8b5cf6', description: 'Combined fluorescence' }
  };

  const handleWaitingPeriod = (message, nextStep, duration = 2000) => {
    const waitingDiv = document.createElement('div');
    waitingDiv.innerHTML = `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md text-center">
          <div class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Please Wait</h3>
          <p class="text-gray-700">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(waitingDiv);
    
    setTimeout(() => {
      document.body.removeChild(waitingDiv);
      setStep(nextStep);
    }, duration);
  };

  const applyReagent = (reagentType) => {
    if (!selectedTool) {
      setMistakes([...mistakes, 'Select appropriate tool from lab tools first']);
      return;
    }

    setCellPlate(prev => ({
      ...prev,
      wells: prev.wells.map(well => {
        const newWell = { ...well };
        
        switch (reagentType) {
          case 'triton':
            if (selectedTool === 'cell-culture') {
              newWell.hasTriton = true;
              setTimeout(() => {
                setCellPlate(p => ({
                  ...p,
                  wells: p.wells.map(w => 
                    w.id === well.id ? { ...w, permeabilized: true } : w
                  )
                }));
              }, 1000);
            } else {
              setMistakes(prev => [...prev, 'Need cell culture plate for permeabilization']);
            }
            break;
          case 'blocker':
            if (newWell.permeabilized && selectedTool === 'blocking-buffer') {
              newWell.hasBlocker = true;
              setTimeout(() => {
                setCellPlate(p => ({
                  ...p,
                  wells: p.wells.map(w => 
                    w.id === well.id ? { ...w, blocked: true } : w
                  )
                }));
              }, 1000);
            } else if (!newWell.permeabilized) {
              setMistakes(prev => [...prev, 'Permeabilize cells first before blocking']);
            }
            break;
          case 'phalloidin':
            if (newWell.blocked && selectedTool === 'phalloidin') {
              newWell.hasPhalloidin = true;
              setTimeout(() => {
                setCellPlate(p => ({
                  ...p,
                  wells: p.wells.map(w => 
                    w.id === well.id ? { ...w, actinStained: true } : w
                  )
                }));
              }, 1000);
            } else if (!newWell.blocked) {
              setMistakes(prev => [...prev, 'Block non-specific sites first']);
            }
            break;
          case 'dapi':
            if (newWell.actinStained && selectedTool === 'dapi') {
              newWell.hasDAPI = true;
              setTimeout(() => {
                setCellPlate(p => ({
                  ...p,
                  wells: p.wells.map(w => 
                    w.id === well.id ? { ...w, nucleiStained: true } : w
                  )
                }));
              }, 1000);
            } else if (!newWell.actinStained) {
              setMistakes(prev => [...prev, 'Complete actin staining first']);
            }
            break;
        }
        
        return newWell;
      })
    }));
    
    setUserActions([...userActions, `Applied ${reagentType} to cell culture wells`]);
  };

  const renderCellsInWell = (well) => {
    const cells = [];
    for (let i = 0; i < 12; i++) {
      const x = 20 + (Math.random() * 60);
      const y = 20 + (Math.random() * 60);
      
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
          <circle
            cx={x}
            cy={y}
            r="8"
            fill={cellColor}
            stroke="#6b7280"
            strokeWidth="0.5"
          />
          
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

  const experiment = experiments['cell-staining'];

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

        <LabTools 
          availableTools={experiment.tools}
          onToolSelect={setSelectedTool}
          selectedTool={selectedTool}
        />

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-6">
          {step === 0 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare Cell Culture Plate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Cell Culture Setup:</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded">
                      <h5 className="font-semibold text-blue-800">Cell Line: HeLa Cells</h5>
                      <p className="text-sm text-blue-700">Human cervical cancer cell line, commonly used for cytoskeleton studies</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-semibold text-green-800">Culture Conditions</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 37°C, 5% CO₂ atmosphere</li>
                        <li>• DMEM medium with 10% FBS</li>
                        <li>• 70-80% confluency for optimal staining</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">8-Well Chamber Slide:</h4>
                  <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg max-w-sm mx-auto">
                    {cellPlate.wells.map(well => (
                      <div
                        key={well.id}
                        className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors ${
                          selectedWell === well.id ? 'ring-2 ring-purple-500' : 'border-gray-400'
                        } bg-white`}
                        onClick={() => setSelectedWell(well.id)}
                      >
                        <svg className="w-full h-full p-1">
                          {renderCellsInWell(well)}
                        </svg>
                        <div className="text-xs text-center mt-1">Well {well.id}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">Click wells to select for observation</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedTool === 'cell-culture') {
                    setUserActions([...userActions, 'Prepared HeLa cell culture in 8-well chamber slide']);
                    setStep(1);
                  } else {
                    setMistakes([...mistakes, 'Select cell culture plate from tools first']);
                  }
                }}
                className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
              >
                Cell Culture Ready - Continue
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Cell Permeabilization with Triton X-100</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🧪 Permeabilization Purpose</h4>
                    <p className="text-blue-700 text-sm">
                      Triton X-100 (0.1%) creates temporary pores in the cell membrane, 
                      allowing fluorescent stains to enter and bind to intracellular structures 
                      like actin filaments and DNA.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Washing Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Aspirate Triton X-100 solution from wells</li>
                      <li>Add 200μL PBS buffer to each well</li>
                      <li>Gently rock plate for 30 seconds</li>
                      <li>Aspirate PBS and repeat wash 2 more times</li>
                      <li>Final rinse ensures clean cell preparation</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Washing Status:</h4>
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
                </div>
              </div>

              <button
                onClick={() => {
                  setCellPlate(prev => ({
                    ...prev,
                    wells: prev.wells.map(well => ({ ...well, washed: true }))
                  }));
                  setUserActions([...userActions, 'Washed cells with PBS buffer (3x)']);
                  setStep(4);
                }}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Complete PBS Wash
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Block Non-specific Binding Sites</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🧪 Blocking Purpose</h4>
                    <p className="text-yellow-700 text-sm">
                      Blocking buffer (typically 1% BSA or 5% normal serum) prevents 
                      non-specific binding of fluorescent antibodies and stains, 
                      reducing background fluorescence for cleaner images.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Blocking Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Add blocking buffer to each well</li>
                      <li>Incubate for 20 minutes at room temperature</li>
                      <li>Cover to prevent evaporation</li>
                      <li>Blocking saturates non-specific binding sites</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Blocking Buffer Application:</h4>
                  <div className="bg-yellow-100 p-4 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-yellow-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-yellow-800 font-bold">BSA</span>
                      </div>
                      <p className="text-sm text-gray-600">1% BSA Blocking Buffer</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  applyReagent('blocker');
                  handleWaitingPeriod('Blocking non-specific binding sites... (20 minutes)', 6, 3000);
                }}
                disabled={cellPlate.wells.every(w => w.hasBlocker)}
                className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                {cellPlate.wells.every(w => w.hasBlocker) ? '✅ Blocking Applied' : 'Add Blocking Buffer'}
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Apply Phalloidin-Alexa 488 (Actin Stain)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">🧪 Phalloidin Staining</h4>
                    <p className="text-green-700 text-sm">
                      Phalloidin is a mushroom toxin that specifically binds to F-actin 
                      (filamentous actin) in the cytoskeleton. Alexa Fluor 488 conjugation 
                      provides bright green fluorescence under blue light excitation (488nm).
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Staining Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Prepare working solution of Phalloidin-Alexa 488</li>
                      <li>Add to wells in darkness (light sensitive)</li>
                      <li>Incubate for 20 minutes at room temperature</li>
                      <li>Protect from light during incubation</li>
                      <li>Wash with PBS to remove unbound stain</li>
                    </ol>
                  </div>

                  <div className="bg-gray-800 p-3 rounded text-white text-sm">
                    <strong>⚠️ Important:</strong> Keep samples in dark to prevent photobleaching
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Actin Cytoskeleton Visualization:</h4>
                  <div className="bg-black p-4 rounded-lg h-48 relative">
                    <div className="w-full h-full border border-green-400 rounded relative">
                      {cellPlate.wells[selectedWell - 1]?.actinStained && (
                        <svg className="absolute inset-2 w-full h-full">
                          {/* Simplified actin filament network */}
                          <path d="M10 20 Q30 10 50 25 T90 15" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.8"/>
                          <path d="M15 40 Q35 30 55 45 T95 35" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.8"/>
                          <path d="M5 60 Q25 50 45 65 T85 55" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.8"/>
                          <circle cx="30" cy="35" r="8" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6"/>
                          <circle cx="60" cy="55" r="8" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6"/>
                        </svg>
                      )}
                      <div className="absolute bottom-1 right-1 text-green-400 text-xs">488nm</div>
                    </div>
                    <p className="text-center text-sm text-gray-300 mt-2">Green: F-actin filaments</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  applyReagent('phalloidin');
                  handleWaitingPeriod('Phalloidin binding to actin filaments... (20 minutes)', 8, 3000);
                }}
                disabled={cellPlate.wells.every(w => w.hasPhalloidin)}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {cellPlate.wells.every(w => w.hasPhalloidin) ? '✅ Phalloidin Applied' : 'Add Phalloidin-Alexa 488'}
              </button>
            </div>
          )}

          {step === 8 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Apply DAPI Nuclear Stain</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">🧪 DAPI Nuclear Staining</h4>
                    <p className="text-indigo-700 text-sm">
                      DAPI (4',6-diamidino-2-phenylindole) binds strongly to A-T rich regions 
                      in the minor groove of double-stranded DNA. It fluoresces bright blue 
                      under UV excitation (358nm), providing excellent nuclear visualization.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">DAPI Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Prepare DAPI working solution (1:10,000 dilution)</li>
                      <li>Add to wells after actin staining complete</li>
                      <li>Incubate for 3-5 minutes (rapid binding)</li>
                      <li>Wash thoroughly to reduce background</li>
                      <li>Mount for fluorescence microscopy</li>
                    </ol>
                  </div>

                  <div className="bg-purple-100 p-3 rounded">
                    <p className="text-purple-800 text-sm">
                      <strong>Note:</strong> DAPI concentration is critical - too high causes non-specific binding
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Nuclear Staining Preview:</h4>
                  <div className="bg-black p-4 rounded-lg h-48 relative">
                    <div className="w-full h-full border border-blue-400 rounded relative">
                      {cellPlate.wells[selectedWell - 1]?.nucleiStained && (
                        <svg className="absolute inset-2 w-full h-full">
                          {/* Cell nuclei */}
                          <circle cx="25" cy="35" r="6" fill="#3b82f6" opacity="0.9"/>
                          <circle cx="65" cy="25" r="6" fill="#3b82f6" opacity="0.9"/>
                          <circle cx="45" cy="55" r="6" fill="#3b82f6" opacity="0.9"/>
                          <circle cx="75" cy="45" r="6" fill="#3b82f6" opacity="0.9"/>
                        </svg>
                      )}
                      <div className="absolute bottom-1 right-1 text-blue-400 text-xs">358nm</div>
                    </div>
                    <p className="text-center text-sm text-gray-300 mt-2">Blue: Cell nuclei (DNA)</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  applyReagent('dapi');
                  handleWaitingPeriod('DAPI binding to nuclear DNA... (3 minutes)', 10, 2000);
                }}
                disabled={cellPlate.wells.every(w => w.hasDAPI)}
                className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 disabled:bg-gray-400"
              >
                {cellPlate.wells.every(w => w.hasDAPI) ? '✅ DAPI Applied' : 'Add DAPI Nuclear Stain'}
              </button>
            </div>
          )}

          {step === 10 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Fluorescence Microscopy Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Microscope Filter Controls:</h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(filters).map(([key, filter]) => (
                      <button
                        key={key}
                        onClick={() => {
                          if (selectedTool === 'fluorescence-microscope') {
                            setMicroscopyFilter(key);
                            setUserActions([...userActions, `Switched to ${filter.name} filter`]);
                          } else {
                            setMistakes([...mistakes, 'Select fluorescence microscope from tools first']);
                          }
                        }}
                        className={`p-3 border-2 rounded-lg transition-colors text-sm ${
                          microscopyFilter === key 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
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
                      <p><strong>Actin Staining:</strong> {cellPlate.wells[selectedWell - 1]?.actinStained ? '✅ Present (Green)' : '❌ Incomplete'}</p>
                      <p><strong>Nuclear Staining:</strong> {cellPlate.wells[selectedWell - 1]?.nucleiStained ? '✅ Present (Blue)' : '❌ Incomplete'}</p>
                      <p><strong>Cell Morphology:</strong> Normal adherent cells</p>
                      <p><strong>Staining Quality:</strong> {cellPlate.wells[selectedWell - 1]?.actinStained && cellPlate.wells[selectedWell - 1]?.nucleiStained ? 'Excellent' : 'In Progress'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Fluorescence Microscope View:</h4>
                  <div className="w-80 h-80 bg-black rounded-lg mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-72 h-72">
                      {renderCellsInWell(cellPlate.wells[selectedWell - 1])}
                    </svg>
                    <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      {filters[microscopyFilter].name} - 63x Objective
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Well {selectedWell} - {filters[microscopyFilter].description}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-4 gap-1 justify-center">
                    {cellPlate.wells.map(well => (
                      <button
                        key={well.id}
                        onClick={() => setSelectedWell(well.id)}
                        className={`w-8 h-8 text-xs rounded ${
                          selectedWell === well.id 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {well.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Experiment Summary:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Successful Staining Results:</h5>
                    <div className="space-y-1 text-sm text-green-700">
                      <p><strong>Technique:</strong> Dual fluorescence labeling</p>
                      <p><strong>Actin Visualization:</strong> Phalloidin-Alexa 488 (Green)</p>
                      <p><strong>Nuclear Visualization:</strong> DAPI (Blue)</p>
                      <p><strong>Resolution:</strong> Subcellular detail achieved</p>
                      <p><strong>Applications:</strong> Cell biology, cytoskeleton research</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">Lab Performance:</h5>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p><strong>Protocol Steps:</strong> {userActions.length}</p>
                      <p><strong>Technical Errors:</strong> {mistakes.length}</p>
                      <p><strong>Staining Success:</strong> {cellPlate.wells.every(w => w.actinStained && w.nucleiStained) ? 'Complete' : 'Partial'}</p>
                      <p><strong>Grade:</strong> {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const grade = mistakes.length === 0 ? 100 : Math.max(80, 100 - mistakes.length * 4);
                    const updatedProfile = {
                      ...studentProfile,
                      experimentsCompleted: studentProfile.experimentsCompleted + 1,
                      totalScore: studentProfile.totalScore + grade,
                      labProgress: {
                        ...studentProfile.labProgress,
                        'cell-staining': 'completed'
                      },
                      badges: [...new Set([...studentProfile.badges, 'Fluorescence Microscopy Expert'])]
                    };
                    saveUserData(updatedProfile);
                    setCurrentExperiment('dashboard');
                  }}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600"
                >
                  Complete Cell Staining Lab
                </button>
              </div>
            </div>
          )}
        </div>

        {mistakes.length > 0 && (
          <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-2">⚠️ Lab Notes ({mistakes.length} issues)</h4>
            <ul className="text-red-200 text-sm space-y-1">
              {mistakes.slice(-3).map((mistake, index) => (
                <li key={index}>• {mistake}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiomedicalLabPlatform;
                    <h4 className="font-semibold mb-3">Protocol Steps:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Remove culture medium from wells</li>
                      <li>Rinse gently with warm PBS buffer</li>
                      <li>Add 0.1% Triton X-100 solution</li>
                      <li>Incubate for 5 minutes at room temperature</li>
                      <li>Cells become permeable to staining reagents</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Cell Membrane Permeabilization:</h4>
                  <div className="bg-gray-100 p-4 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 border-4 border-blue-400 rounded-full border-dashed mx-auto mb-3 relative">
                        <div className="absolute inset-4 bg-blue-200 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-600">Cell with permeabilized membrane</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  applyReagent('triton');
                  handleWaitingPeriod('Triton X-100 permeabilizing cell membranes... (5 minutes)', 3, 3000);
                }}
                disabled={cellPlate.wells.every(w => w.hasTriton)}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {cellPlate.wells.every(w => w.hasTriton) ? '✅ Permeabilization Complete' : 'Add Triton X-100'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Wash Cells with PBS Buffer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🧪 PBS Washing</h4>
                    <p className="text-blue-700 text-sm">
                      Phosphate Buffered Saline removes excess Triton X-100 and prepares 
                      cells for blocking step. Gentle washing prevents cell loss while 
                      maintaining proper ionic conditions.
                    </p>
                  </div>

                  <div className="mb-4">
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
                        <li>• Ladder shows proper size separation</li>
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
                        Successful PCR amplification confirmed. Single, specific band indicates 
                        efficient primer binding and DNA synthesis. Clean negative control rules out contamination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setStep(9)}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Continue to Final Analysis
              </button>
            </div>
          )}

          {step === 9 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Data Interpretation and Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">PCR Analysis Summary:</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <h5 className="font-semibold text-blue-800">Amplification Success</h5>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Target DNA successfully amplified</li>
                        <li>• Expected product size: ~500 bp</li>
                        <li>• High specificity achieved</li>
                        <li>• No primer-dimer artifacts</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-semibold text-green-800">Technical Performance</h5>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Primer design: Optimal</li>
                        <li>• Master mix preparation: Accurate</li>
                        <li>• Thermal cycling: Complete</li>
                        <li>• Gel electrophoresis: Clear results</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Lab Performance Metrics:</h4>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Protocol Steps Completed:</span>
                        <span className="font-semibold">{userActions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical Errors:</span>
                        <span className="font-semibold text-red-600">{mistakes.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PCR Success:</span>
                        <span className="font-semibold text-green-600">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overall Grade:</span>
                        <span className="font-semibold text-blue-600">
                          {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-purple-50 p-4 rounded">
                    <h5 className="font-semibold text-purple-800 mb-2">Key Learning Outcomes</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• PCR principles and applications</li>
                      <li>• Primer design considerations</li>
                      <li>• Thermal cycling optimization</li>
                      <li>• Gel electrophoresis analysis</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const grade = mistakes.length === 0 ? 100 : Math.max(80, 100 - mistakes.length * 3);
                    const updatedProfile = {
                      ...studentProfile,
                      experimentsCompleted: studentProfile.experimentsCompleted + 1,
                      totalScore: studentProfile.totalScore + grade,
                      labProgress: {
                        ...studentProfile.labProgress,
                        'pcr-simulation': 'completed'
                      },
                      badges: [...new Set([...studentProfile.badges, 'DNA Amplification Expert'])]
                    };
                    saveUserData(updatedProfile);
                    setCurrentExperiment('dashboard');
                  }}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600"
                >
                  Complete PCR Simulation
                </button>
              </div>
            </div>
          )}
        </div>

        {mistakes.length > 0 && (
          <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-2">⚠️ Lab Notes ({mistakes.length} issues)</h4>
            <ul className="text-red-200 text-sm space-y-1">
              {mistakes.slice(-3).map((mistake, index) => (
                <li key={index}>• {mistake}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Gram Staining Component
const GramStaining = () => {
  const [step, setStep] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedBacteria, setSelectedBacteria] = useState('ecoli');
  const [userActions, setUserActions] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [stainingProgress, setStainingProgress] = useState({
    heatFixed: false,
    crystalViolet: false,
    iodine: false,
    decolorized: false,
    safranin: false
  });

  const steps = [
    "Prepare Bacterial Smear",
    "Heat Fix the Slide",
    "Apply Crystal Violet (Primary Stain)",
    "Wait for Stain Penetration (1 minute)",
    "Apply Iodine (Mordant)",
    "Wait for Mordant Action (1 minute)",
    "Apply Decolorizer",
    "Apply Safranin (Counterstain)",
    "Wait for Counterstain (1 minute)",
    "Microscopic Examination and Results"
  ];

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
    },
    bacillus: {
      name: 'B. subtilis',
      type: 'Gram-positive', 
      finalColor: 'purple',
      shape: 'rod',
      description: 'Rod-shaped, Gram-positive bacteria'
    }
  };

  const handleWaitingPeriod = (message, nextStep, duration = 2000) => {
    const waitingDiv = document.createElement('div');
    waitingDiv.innerHTML = `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md text-center">
          <div class="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Please Wait</h3>
          <p class="text-gray-700">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(waitingDiv);
    
    setTimeout(() => {
      document.body.removeChild(waitingDiv);
      setStep(nextStep);
    }, duration);
  };

  const applyStain = (stainType) => {
    if (!selectedTool || selectedTool !== 'stains') {
      setMistakes([...mistakes, 'Select staining kit from tools first']);
      return;
    }

    const currentBacteria = bacteriaTypes[selectedBacteria];
    
    switch (stainType) {
      case 'crystalViolet':
        setStainingProgress(prev => ({ ...prev, crystalViolet: true }));
        setUserActions([...userActions, 'Applied crystal violet (primary stain)']);
        handleWaitingPeriod('Crystal violet penetrating bacterial cells... (1 minute)', step + 1);
        break;
      case 'iodine':
        if (!stainingProgress.crystalViolet) {
          setMistakes([...mistakes, 'Apply crystal violet first']);
          return;
        }
        setStainingProgress(prev => ({ ...prev, iodine: true }));
        setUserActions([...userActions, 'Applied iodine (mordant)']);
        handleWaitingPeriod('Iodine forming complexes with crystal violet... (1 minute)', step + 1);
        break;
      case 'decolorizer':
        if (!stainingProgress.iodine) {
          setMistakes([...mistakes, 'Apply iodine mordant first']);
          return;
        }
        setStainingProgress(prev => ({ ...prev, decolorized: true }));
        setUserActions([...userActions, 'Applied decolorizer']);
        setStep(step + 1);
        break;
      case 'safranin':
        if (!stainingProgress.decolorized) {
          setMistakes([...mistakes, 'Apply decolorizer first']);
          return;
        }
        setStainingProgress(prev => ({ ...prev, safranin: true }));
        setUserActions([...userActions, 'Applied safranin (counterstain)']);
        handleWaitingPeriod('Safranin staining decolorized bacteria... (1 minute)', step + 1);
        break;
    }
  };

  const renderBacterialCells = () => {
    const bacteria = bacteriaTypes[selectedBacteria];
    let cellColor = '#e5e7eb'; // Default gray
    
    // Determine cell color based on staining progress
    if (stainingProgress.crystalViolet) {
      cellColor = '#8b5cf6'; // Purple (crystal violet)
    }
    if (stainingProgress.decolorized && bacteria.type === 'Gram-negative') {
      cellColor = '#f3f4f6'; // Decolorized (gray)
    }
    if (stainingProgress.safranin && bacteria.type === 'Gram-negative') {
      cellColor = '#ec4899'; // Pink (safranin)
    }
    if (stainingProgress.safranin && bacteria.type === 'Gram-positive') {
      cellColor = '#8b5cf6'; // Stays purple
    }

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
        // Cocci - show clusters for S. aureus
        if (bacteria.name === 'S. aureus' && i % 3 === 0) {
          for (let j = 0; j < 3; j++) {
            cells.push(
              <circle
                key={`${i}-${j}`}
                cx={x + j * 8}
                cy={y}
                r="6"
                fill={cellColor}
                stroke="#374151"
                strokeWidth="0.5"
              />
            );
          }
        } else if (bacteria.name !== 'S. aureus' || i % 3 !== 0) {
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
    }
    return cells;
  };

  const experiment = experiments['gram-staining'];

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

        <LabTools 
          availableTools={experiment.tools}
          onToolSelect={setSelectedTool}
          selectedTool={selectedTool}
        />

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-6">
          {step === 0 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare Bacterial Smear</h3>
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
                            ? 'border-yellow-500 bg-yellow-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold">{bacteria.name}</div>
                        <div className="text-sm text-gray-600">{bacteria.description}</div>
                        <div className="text-xs text-gray-500 mt-1">Expected result: {bacteria.finalColor}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Smear Preparation Protocol:</h4>
                  <ol className="list-decimal list-inside text-sm space-y-2">
                    <li>Place small drop of sterile water on clean slide</li>
                    <li>Use inoculation loop to transfer bacterial culture</li>
                    <li>Mix thoroughly and spread over 1cm² area</li>
                    <li>Allow smear to air dry completely</li>
                  </ol>
                  
                  <div className="mt-6 text-center">
                    <div className="w-48 h-20 bg-gray-100 border-2 border-gray-400 rounded mx-auto relative">
                      <div className="absolute inset-4 bg-gray-200 rounded-sm flex items-center justify-center">
                        <span className="text-xs text-gray-600">Bacterial Smear</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Prepared bacterial smear on glass slide</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedTool === 'slides') {
                    setUserActions([...userActions, `Prepared ${bacteriaTypes[selectedBacteria].name} bacterial smear`]);
                    setStep(1);
                  } else {
                    setMistakes([...mistakes, 'Select slides from tools first']);
                  }
                }}
                className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
              >
                Prepare Bacterial Smear
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Heat Fix the Slide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Safety Warning</h4>
                    <p className="text-red-700 text-sm">
                      Use metal forceps to hold slide. Pass through flame 2-3 times quickly. 
                      Avoid overheating which can distort cell morphology.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-3">Heat Fixation Purpose:</h4>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>Kills microorganisms and makes them permeable to stains</li>
                    <li>Adheres bacteria firmly to the slide surface</li>
                    <li>Preserves cell morphology and arrangement</li>
                    <li>Prevents bacteria from being washed away during staining</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-32 bg-blue-600 rounded-t-full mx-auto mb-4 relative">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-orange-400 rounded-full animate-pulse"></div>
                        <div className="w-6 h-6 bg-yellow-400 rounded-full mx-auto animate-pulse"></div>
                        <div className="w-4 h-4 bg-red-400 rounded-full mx-auto animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Bunsen Burner Flame</p>
                  </div>

                  <div className="w-48 h-20 bg-gray-100 border-2 border-gray-400 rounded mx-auto relative">
                    <div className="absolute inset-4 bg-gray-300 rounded-sm flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Heat-fixed bacterial slide</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedTool === 'bunsen-burner') {
                    setStainingProgress(prev => ({ ...prev, heatFixed: true }));
                    setUserActions([...userActions, 'Heat-fixed bacterial smear using Bunsen burner']);
                    setStep(2);
                  } else {
                    setMistakes([...mistakes, 'Select Bunsen burner from tools first']);
                  }
                }}
                className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
              >
                Heat Fix Slide
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Apply Crystal Violet (Primary Stain)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-purple-800 mb-2">🧪 Crystal Violet Function</h4>
                    <p className="text-purple-700 text-sm">
                      Crystal violet is a basic (cationic) dye that binds to negatively charged 
                      components of bacterial cell walls. All bacteria will appear purple after this step.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Application Protocol:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-2">
                      <li>Flood the heat-fixed smear with crystal violet</li>
                      <li>Ensure complete coverage of the bacterial smear</li>
                      <li>Allow stain to act for 60 seconds</li>
                      <li>Rinse gently with distilled water</li>
                      <li>Blot dry with bibulous paper</li>
                    </ol>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-16 bg-purple-600 rounded border-2 border-purple-800 flex items-end justify-center">
                      <Droplets className="w-6 h-6 text-white mb-1" />
                    </div>
                    <div>
                      <p className="font-semibold">Crystal Violet Solution</p>
                      <p className="text-sm text-gray-600">Primary stain - colors all bacteria purple</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Microscopic View (1000x):</h4>
                  <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-56 h-56">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      Oil Immersion
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {stainingProgress.crystalViolet ? 'All bacteria appear purple' : 'Ready for staining'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => applyStain('crystalViolet')}
                disabled={stainingProgress.crystalViolet}
                className="mt-6 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
              >
                {stainingProgress.crystalViolet ? '✅ Crystal Violet Applied' : 'Apply Crystal Violet'}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Apply Iodine (Mordant)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-amber-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-amber-800 mb-2">🔬 Mordant Function</h4>
                    <p className="text-amber-700 text-sm">
                      Iodine acts as a mordant, forming large complexes with crystal violet. 
                      These complexes are difficult to remove from thick peptidoglycan layers 
                      in Gram-positive bacteria.
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-16 bg-amber-600 rounded border-2 border-amber-800 flex items-end justify-center">
                      <Droplets className="w-6 h-6 text-white mb-1" />
                    </div>
                    <div>
                      <p className="font-semibold">Gram's Iodine Solution</p>
                      <p className="text-sm text-gray-600">Mordant - fixes the primary stain</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded">
                    <h5 className="font-semibold text-blue-800 mb-2">What Happens:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Iodine + Crystal Violet = Large purple complexes</li>
                      <li>• Complexes become trapped in thick peptidoglycan</li>
                      <li>• All bacteria remain purple at this stage</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Microscopic View:</h4>
                  <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                    <svg className="absolute inset-4 w-56 h-56">
                      {renderBacterialCells()}
                    </svg>
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      1000x
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {stainingProgress.iodine ? 'Bacteria remain purple - complexes formed' : 'Waiting for iodine treatment'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => applyStain('iodine')}
                disabled={stainingProgress.iodine}
                className="mt-6 bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 disabled:bg-gray-400"
              >
                {stainingProgress.iodine ? '✅ Iodine Applied' : 'Apply Iodine'}
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Apply Decolorizer</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Critical Step!</h4>
                    <p className="text-red-700 text-sm">
                      This is the most critical step! Add decolorizer drop by drop until 
                      no more purple dye runs off the slide. Over-decolorization causes false negatives.
                    </p>
                  </div>

                      {currentExperiment === 'osmotic-solutions' && !showQuiz && !showPreLab && <OsmoticSolutions />}
      {currentExperiment === 'bradford-assay' && !showQuiz && !showPreLab && <BradfordAssay />}
      {currentExperiment === 'pcr-simulation' && !showQuiz && !showPreLab && <PCRSimulation />}
      {currentExperiment === 'gram-staining' && !showQuiz && !showPreLab && <GramStaining />}
      {currentExperiment === 'cell-staining' && !showQuiz && !showPreLab && <CellStaining />}
    </div>
  );
};

// Enhanced Bradford Assay Component
const BradfordAssay = () => {
  const [step, setStep] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);
  const [userActions, setUserActions] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [bsaStandards, setBsaStandards] = useState([
    { id: 'A', name: 'Standard A (Blank)', concentration: 0, volume: 0, absorbance: null, prepared: false },
    { id: 'B', name: 'Standard B', concentration: 25, volume: 0, absorbance: null, prepared: false },
    { id: 'C', name: 'Standard C', concentration: 125, volume: 0, absorbance: null, prepared: false },
    { id: 'D', name: 'Standard D', concentration: 250, volume: 0, absorbance: null, prepared: false },
    { id: 'E', name: 'Standard E', concentration: 500, volume: 0, absorbance: null, prepared: false },
    { id: 'F', name: 'Standard F', concentration: 750, volume: 0, absorbance: null, prepared: false },
    { id: 'G', name: 'Standard G', concentration: 1000, volume: 0, absorbance: null, prepared: false },
    { id: 'H', name: 'Standard H', concentration: 1500, volume: 0, absorbance: null, prepared: false },
    { id: 'I', name: 'Standard I', concentration: 2000, volume: 0, absorbance: null, prepared: false },
    { id: 'Unknown', name: 'Unknown Sample', concentration: 875, volume: 0, absorbance: null, prepared: false }
  ]);
  const [pipetteVolume, setPipetteVolume] = useState(5);
  const [selectedPipette, setSelectedPipette] = useState('P10');
  const [standardCurve, setStandardCurve] = useState(null);

  const steps = [
    "Prepare Equipment and Materials",
    "Prepare BSA Standards", 
    "Set Up Microplate",
    "Add Samples to Wells",
    "Add Bradford Reagent",
    "Wait for Color Development (5 minutes)",
    "Measure Absorbance at 595nm",
    "Create Standard Curve",
    "Calculate Unknown Concentration",
    "Data Analysis and Report"
  ];

  const pipettes = {
    'P10': { range: '1-10 μL', color: 'bg-red-400', maxVolume: 10 },
    'P200': { range: '20-200 μL', color: 'bg-yellow-400', maxVolume: 200 },
    'P1000': { range: '100-1000 μL', color: 'bg-blue-400', maxVolume: 1000 }
  };

  const handleWaitingPeriod = (message, duration = 3000) => {
    const waitingDiv = document.createElement('div');
    waitingDiv.innerHTML = `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md text-center">
          <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Please Wait</h3>
          <p class="text-gray-700">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(waitingDiv);
    
    setTimeout(() => {
      document.body.removeChild(waitingDiv);
      setStep(step + 1);
    }, duration);
  };

  const addSampleToWell = (sampleId) => {
    if (!selectedTool || selectedTool !== 'pipettes') {
      setMistakes([...mistakes, 'Select pipettes from tools first']);
      return;
    }
    
    if (pipetteVolume !== 5) {
      setMistakes([...mistakes, `Wrong volume! Need exactly 5μL for ${sampleId}`]);
      return;
    }

    setBsaStandards(prev => prev.map(sample => 
      sample.id === sampleId 
        ? { ...sample, volume: 5, prepared: true }
        : sample
    ));
    setUserActions([...userActions, `Added 5μL of ${sampleId} to microplate well`]);
  };

  const addBradfordReagent = () => {
    if (!selectedTool || selectedTool !== 'bradford-reagent') {
      setMistakes([...mistakes, 'Select Bradford reagent from tools first']);
      return;
    }

    const unpreparedSamples = bsaStandards.filter(s => !s.prepared);
    if (unpreparedSamples.length > 0) {
      setMistakes([...mistakes, 'Add all samples to wells before adding reagent']);
      return;
    }

    setBsaStandards(prev => prev.map(s => ({ ...s, reagentAdded: true })));
    setUserActions([...userActions, 'Added Bradford reagent to all wells']);
    handleWaitingPeriod('Color development in progress... (5 minutes)', 3000);
  };

  const measureAbsorbance = (sampleId) => {
    if (!selectedTool || selectedTool !== 'spectrophotometer') {
      setMistakes([...mistakes, 'Select spectrophotometer from tools first']);
      return;
    }

    const sample = bsaStandards.find(s => s.id === sampleId);
    if (!sample.reagentAdded) {
      setMistakes([...mistakes, `Sample ${sampleId} not ready for measurement`]);
      return;
    }

    // Calculate realistic absorbance
    const baseAbsorbance = 0.1;
    const maxAbsorbance = 1.8;
    const kd = 500;
    const absorbance = baseAbsorbance + ((maxAbsorbance - baseAbsorbance) * sample.concentration) / (kd + sample.concentration);
    const noisyAbsorbance = absorbance + (Math.random() - 0.5) * 0.05;

    setBsaStandards(prev => prev.map(s => 
      s.id === sampleId 
        ? { ...s, absorbance: Math.max(0, noisyAbsorbance).toFixed(3) }
        : s
    ));
    setUserActions([...userActions, `Measured absorbance for sample ${sampleId}`]);
  };

  const generateStandardCurve = () => {
    const measuredStandards = bsaStandards.filter(s => s.absorbance !== null && s.id !== 'Unknown');
    if (measuredStandards.length < 8) {
      setMistakes([...mistakes, 'Measure all standards before generating curve']);
      return;
    }

    // Linear regression
    const xValues = measuredStandards.map(s => parseFloat(s.absorbance));
    const yValues = measuredStandards.map(s => s.concentration);
    
    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((acc, x, i) => acc + x * yValues[i], 0);
    const sumXX = xValues.reduce((acc, x) => acc + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const rSquared = 0.985 + Math.random() * 0.01;
    
    setStandardCurve({ slope, intercept, rSquared });
    setUserActions([...userActions, 'Generated standard curve from BSA standards']);
  };

  const experiment = experiments['bradford-assay'];

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

        <LabTools 
          availableTools={experiment.tools}
          onToolSelect={setSelectedTool}
          selectedTool={selectedTool}
        />

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-6">
          {step === 0 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare Equipment and Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Equipment Checklist:</h4>
                  <div className="space-y-2">
                    {[
                      'Micropipettes (P10, P200, P1000)',
                      '96-well microplate',
                      'Microplate reader/Spectrophotometer',
                      'Bradford reagent',
                      'BSA standard solutions',
                      'Unknown protein samples'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Assay Principle</h5>
                  <p className="text-sm text-purple-700">
                    The Bradford assay uses Coomassie Brilliant Blue G-250 dye which binds to basic amino acids 
                    in proteins, causing a color shift from brown to blue (λmax = 595nm).
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-6 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
              >
                Equipment Ready - Continue
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare BSA Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Standard Concentrations:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {bsaStandards.slice(0, 9).map(standard => (
                      <div key={standard.id} className="text-center p-3 bg-gray-50 rounded">
                        <div className="w-12 h-16 bg-purple-200 rounded mx-auto mb-2 flex items-center justify-center border">
                          <span className="text-xs font-bold">{standard.id}</span>
                        </div>
                        <p className="text-xs font-medium">{standard.concentration} μg/mL</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Standard Curve Purpose</h5>
                  <p className="text-sm text-blue-700 mb-3">
                    Standards with known protein concentrations create a calibration curve 
                    to determine unknown sample concentrations.
                  </p>
                  <div className="text-xs text-blue-600">
                    <p><strong>Range:</strong> 0-2000 μg/mL</p>
                    <p><strong>Blank:</strong> 0 μg/mL (Standard A)</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Standards Prepared - Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Set Up Microplate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Plate Layout Planning:</h4>
                  <div className="bg-yellow-50 p-4 rounded mb-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">Important Notes:</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Run standards in duplicate for accuracy</li>
                      <li>• Include blank (0 μg/mL) for baseline</li>
                      <li>• Reserve wells for unknown samples</li>
                      <li>• Use consistent pipetting technique</li>
                    </ul>
                  </div>
                  {!selectedTool && (
                    <p className="text-red-500 text-sm mb-4">Select microplate from tools above first</p>
                  )}
                </div>
                <div className="text-center">
                  <h5 className="font-semibold mb-4">96-Well Microplate</h5>
                  <div className="grid grid-cols-8 gap-1 bg-gray-100 p-4 rounded-lg max-w-md mx-auto">
                    {bsaStandards.map(sample => (
                      <div
                        key={sample.id}
                        className={`w-8 h-8 rounded border-2 cursor-pointer transition-colors text-xs flex items-center justify-center font-bold ${
                          sample.prepared ? 'border-purple-500 bg-purple-100' : 'border-gray-400 bg-white hover:border-gray-600'
                        }`}
                      >
                        {sample.id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (selectedTool === 'microplate') {
                    setUserActions([...userActions, 'Set up 96-well microplate for assay']);
                    setStep(3);
                  } else {
                    setMistakes([...mistakes, 'Select microplate from tools first']);
                  }
                }}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Microplate Ready - Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Add Samples to Wells</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Pipette Selection:</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(pipettes).map(([id, pipette]) => (
                      <button
                        key={id}
                        onClick={() => setSelectedPipette(id)}
                        className={`p-3 border-2 rounded transition-colors ${
                          selectedPipette === id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 ${pipette.color} rounded mx-auto mb-1`}></div>
                        <div className="text-xs">{pipette.range}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Volume Setting (μL):</label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setPipetteVolume(Math.max(1, pipetteVolume - 1))}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-mono font-bold w-16 text-center">{pipetteVolume}</span>
                      <button
                        onClick={() => setPipetteVolume(Math.min(pipettes[selectedPipette].maxVolume, pipetteVolume + 1))}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Required: 5 μL per well</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Sample Addition:</h4>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {bsaStandards.map(sample => (
                      <button
                        key={sample.id}
                        onClick={() => addSampleToWell(sample.id)}
                        className={`p-2 border rounded text-xs ${
                          sample.prepared ? 'border-green-500 bg-green-100' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-bold">{sample.id}</div>
                        <div>{sample.concentration}</div>
                        {sample.volume > 0 && <div className="text-green-600">{sample.volume}μL</div>}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Click on each well to add 5μL of sample</p>
                </div>
              </div>
              
              {bsaStandards.every(s => s.prepared) && (
                <button
                  onClick={() => setStep(4)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  All Samples Added - Continue
                </button>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Add Bradford Reagent</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Bradford Reagent</h4>
                    <p className="text-blue-700 text-sm">
                      Add 250 μL of Bradford reagent to each well. The reagent contains Coomassie Brilliant Blue G-250 
                      which will bind to basic amino acids and change color from brown to blue.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-24 bg-blue-800 rounded border flex items-center justify-center">
                      <Droplets className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Bradford Reagent</p>
                      <p className="text-sm text-gray-600">250 μL per well</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Microplate Wells:</h4>
                  <div className="grid grid-cols-5 gap-2 bg-gray-100 p-4 rounded">
                    {bsaStandards.map(sample => (
                      <div
                        key={sample.id}
                        className={`w-12 h-12 rounded border-2 text-xs flex items-center justify-center font-bold ${
                          sample.reagentAdded ? 'border-blue-500 bg-blue-200' : 
                          sample.prepared ? 'border-purple-500 bg-purple-100' : 'border-gray-400 bg-white'
                        }`}
                      >
                        {sample.id}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {bsaStandards.filter(s => s.reagentAdded).length > 0 ? 'Reagent added!' : 'Ready for reagent addition'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={addBradfordReagent}
                disabled={bsaStandards.every(s => s.reagentAdded)}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-green-500"
              >
                {bsaStandards.every(s => s.reagentAdded) ? '✅ Reagent Added' : 'Add Bradford Reagent to All Wells'}
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Measure Absorbance at 595nm</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-800 p-6 rounded-lg mb-4">
                    <div className="bg-green-400 text-black px-4 py-2 rounded text-center font-mono text-xl mb-4">
                      Microplate Reader - 595nm
                    </div>
                    <div className="grid grid-cols-5 gap-1 mb-4">
                      {bsaStandards.map(sample => (
                        <button
                          key={sample.id}
                          onClick={() => measureAbsorbance(sample.id)}
                          className={`w-8 h-8 text-xs rounded font-bold transition-colors ${
                            sample.absorbance ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {sample.id}
                        </button>
                      ))}
                    </div>
                    <div className="text-green-300 text-center text-sm">
                      Click wells to measure absorbance
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Absorbance Results:</h4>
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-2 py-1">Well</th>
                          <th className="border border-gray-300 px-2 py-1">Conc. (μg/mL)</th>
                          <th className="border border-gray-300 px-2 py-1">Abs (595nm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bsaStandards.map(sample => (
                          <tr key={sample.id}>
                            <td className="border border-gray-300 px-2 py-1 text-center font-bold">{sample.id}</td>
                            <td className="border border-gray-300 px-2 py-1 text-center">{sample.concentration}</td>
                            <td className="border border-gray-300 px-2 py-1 text-center font-mono">
                              {sample.absorbance || '---'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {bsaStandards.every(s => s.absorbance !== null) && (
                <button
                  onClick={() => setStep(7)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  All Measurements Complete - Create Standard Curve
                </button>
              )}
            </div>
          )}

          {step === 7 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Create Standard Curve</h3>
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
                      <h4 className="font-semibold text-blue-800 mb-2">Linear Regression Results</h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p><strong>Equation:</strong> y = {standardCurve.slope.toFixed(4)}x + {standardCurve.intercept.toFixed(2)}</p>
                        <p><strong>R² Value:</strong> {standardCurve.rSquared.toFixed(4)}</p>
                        <p><strong>Quality:</strong> {standardCurve.rSquared > 0.98 ? 'Excellent' : 'Good'}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Standard Curve Visualization</h4>
                  <div className="bg-gray-100 p-4 rounded-lg h-64 relative">
                    <div className="absolute bottom-4 left-4 right-4 top-4 border-l-2 border-b-2 border-gray-600">
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                        Absorbance (595nm)
                      </div>
                      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-600">
                        Protein Concentration (μg/mL)
                      </div>
                      
                      {bsaStandards.slice(0, 9).map((sample, index) => {
                        if (!sample.absorbance) return null;
                        const x = (parseFloat(sample.absorbance) / 2) * 100;
                        const y = 100 - (sample.concentration / 2000) * 100;
                        return (
                          <div
                            key={index}
                            className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                            style={{ left: `${Math.min(95, x)}%`, top: `${Math.max(5, y)}%` }}
                            title={`${sample.concentration} μg/mL, A=${sample.absorbance}`}
                          />
                        );
                      })}
                      
                      {standardCurve && (
                        <svg className="absolute inset-0 w-full h-full">
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
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {standardCurve && (
                <button
                  onClick={() => setStep(8)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Continue to Calculate Unknown
                </button>
              )}
            </div>
          )}

          {step === 8 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Calculate Unknown Concentration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Unknown Sample Analysis</h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    {(() => {
                      const unknown = bsaStandards.find(s => s.id === 'Unknown');
                      const concentration = standardCurve && unknown.absorbance ? 
                        Math.max(0, (parseFloat(unknown.absorbance) - standardCurve.intercept) / standardCurve.slope).toFixed(1) : null;
                      
                      return (
                        <div className="space-y-2">
                          <p><strong>Sample:</strong> Unknown Protein Solution</p>
                          <p><strong>Absorbance @ 595nm:</strong> {unknown.absorbance || '---'}</p>
                          {concentration && (
                            <>
                              <p><strong>Calculated Concentration:</strong> {concentration} μg/mL</p>
                              <p className="text-sm text-gray-600">
                                Using: Conc = (Abs - {standardCurve.intercept.toFixed(2)}) / {standardCurve.slope.toFixed(4)}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Lab Report Summary</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="space-y-1 text-sm">
                      <p><strong>Experiment:</strong> Bradford Protein Assay</p>
                      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                      <p><strong>Standard Curve R²:</strong> {standardCurve?.rSquared.toFixed(4) || 'Not calculated'}</p>
                      <p><strong>Actions Completed:</strong> {userActions.length}</p>
                      <p><strong>Mistakes:</strong> {mistakes.length}</p>
                      <p><strong>Grade:</strong> {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(9)}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Continue to Final Analysis
              </button>
            </div>
          )}

          {step === 9 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Data Analysis and Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Experimental Results</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <h5 className="font-semibold text-blue-800">Assay Performance</h5>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Standard curve R² > 0.98 indicates excellent linearity</li>
                        <li>• All standards showed expected color development</li>
                        <li>• Absorbance values within expected range</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-semibold text-green-800">Key Learning Points</h5>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Bradford assay principle and mechanism</li>
                        <li>• Importance of standard curves in quantification</li>
                        <li>• Proper pipetting technique</li>
                        <li>• Spectrophotometry applications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Performance Metrics</h4>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Protocol Steps Completed:</span>
                        <span className="font-semibold">{userActions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical Errors:</span>
                        <span className="font-semibold text-red-600">{mistakes.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Standard Curve Quality:</span>
                        <span className="font-semibold text-green-600">
                          {standardCurve ? (standardCurve.rSquared > 0.98 ? 'Excellent' : 'Good') : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overall Grade:</span>
                        <span className="font-semibold text-blue-600">
                          {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-purple-50 p-4 rounded">
                    <h5 className="font-semibold text-purple-800 mb-2">Conclusion</h5>
                    <p className="text-sm text-purple-700">
                      Successfully completed Bradford protein assay with {standardCurve ? 'excellent' : 'good'} 
                      standard curve. Demonstrated proper laboratory technique and quantitative analysis skills.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const grade = mistakes.length === 0 ? 100 : Math.max(70, 100 - mistakes.length * 3);
                    const updatedProfile = {
                      ...studentProfile,
                      experimentsCompleted: studentProfile.experimentsCompleted + 1,
                      totalScore: studentProfile.totalScore + grade,
                      labProgress: {
                        ...studentProfile.labProgress,
                        'bradford-assay': 'completed'
                      },
                      badges: [...new Set([...studentProfile.badges, 'Protein Quantification Expert'])]
                    };
                    saveUserData(updatedProfile);
                    setCurrentExperiment('dashboard');
                  }}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600"
                >
                  Complete Bradford Assay Lab
                </button>
              </div>
            </div>
          )}
        </div>

        {mistakes.length > 0 && (
          <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold mb-2">⚠️ Lab Notes ({mistakes.length} issues)</h4>
            <ul className="text-red-200 text-sm space-y-1">
              {mistakes.slice(-3).map((mistake, index) => (
                <li key={index}>• {mistake}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// PCR Simulation Component
const PCRSimulation = () => {
  const [step, setStep] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);
  const [userActions, setUserActions] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [primerDesign, setPrimerDesign] = useState({
    forward: '',
    reverse: '',
    targetSequence: 'ATGCGATCGATCGATCGATCGATCGATCGATCGATCGATCGAT',
    validated: false
  });
  const [pcrReaction, setPcrReaction] = useState({
    template: 0,
    forward: 0,
    reverse: 0,
    taq: 0,
    water: 0,
    ready: false
  });
  const [cyclingComplete, setCyclingComplete] = useState(false);
  const [gelResults, setGelResults] = useState(null);

  const steps = [
    "Design PCR Primers",
    "Prepare PCR Master Mix",
    "Set Up Thermal Cycling Program", 
    "Run PCR Amplification",
    "Wait for Thermal Cycling (2.5 hours)",
    "Prepare Agarose Gel",
    "Load Samples and Run Electrophoresis",
    "Wait for Gel Electrophoresis (30 minutes)",
    "Analyze PCR Results",
    "Data Interpretation and Report"
  ];

  const validatePrimers = () => {
    const { forward, reverse } = primerDesign;
    
    if (!selectedTool || selectedTool !== 'primers') {
      setMistakes([...mistakes, 'Select primers from tools first']);
      return;
    }
    
    if (forward.length < 18 || forward.length > 25) {
      setMistakes([...mistakes, 'Forward primer length should be 18-25 nucleotides']);
      return;
    }
    if (reverse.length < 18 || reverse.length > 25) {
      setMistakes([...mistakes, 'Reverse primer length should be 18-25 nucleotides']);
      return;
    }
    
    const gcContent = (seq) => {
      const gc = (seq.match(/[GC]/g) || []).length;
      return (gc / seq.length) * 100;
    };
    
    if (gcContent(forward) < 40 || gcContent(forward) > 60) {
      setMistakes([...mistakes, 'Forward primer GC content should be 40-60%']);
      return;
    }
    
    setPrimerDesign(prev => ({ ...prev, validated: true }));
    setUserActions([...userActions, 'Validated PCR primer design']);
  };

  const prepareMasterMix = (component, volume) => {
    if (!selectedTool || selectedTool !== 'pcr-tubes') {
      setMistakes([...mistakes, 'Select PCR tubes from tools first']);
      return;
    }
    
    setPcrReaction(prev => {
      const newReaction = { ...prev, [component]: volume };
      const total = Object.values(newReaction).reduce((sum, val) => sum + val, 0);
      const ready = Math.abs(total - 30) < 0.5; // Allow small tolerance
      return { ...newReaction, ready };
    });
    setUserActions([...userActions, `Added ${volume}μL of ${component} to PCR mix`]);
  };

  const handleWaitingPeriod = (message, duration = 3000) => {
    const waitingDiv = document.createElement('div');
    waitingDiv.innerHTML = `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md text-center">
          <div class="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Please Wait</h3>
          <p class="text-gray-700">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(waitingDiv);
    
    setTimeout(() => {
      document.body.removeChild(waitingDiv);
      if (step === 4) setCyclingComplete(true);
      if (step === 7) setGelResults({ success: true, bandSize: 500 });
      setStep(step + 1);
    }, duration);
  };

  const experiment = experiments['pcr-simulation'];

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
          <h1 className="text-3xl font-bold text-white">PCR Amplification Simulation</h1>
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

        <LabTools 
          availableTools={experiment.tools}
          onToolSelect={setSelectedTool}
          selectedTool={selectedTool}
        />

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-6">
          {step === 0 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Design PCR Primers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🧬 Target DNA Sequence</h4>
                    <div className="font-mono text-sm bg-white p-3 rounded border break-all">
                      5'-{primerDesign.targetSequence}-3'
                    </div>
                    <p className="text-blue-700 text-sm mt-2">
                      Design primers 18-25 nucleotides long with 40-60% GC content
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-2">Forward Primer (5'→3'):</label>
                      <input
                        type="text"
                        value={primerDesign.forward}
                        onChange={(e) => setPrimerDesign(prev => ({ ...prev, forward: e.target.value.toUpperCase() }))}
                        className="w-full p-3 border rounded font-mono text-sm"
                        placeholder="Enter forward primer sequence (ATCG only)"
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
                        placeholder="Enter reverse primer sequence (ATCG only)"
                        pattern="[ATCG]*"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Length: {primerDesign.reverse.length} | 
                        GC: {primerDesign.reverse ? Math.round(((primerDesign.reverse.match(/[GC]/g) || []).length / primerDesign.reverse.length) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Primer Design Guidelines:</h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Length:</strong> 18-25 nucleotides</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>GC Content:</strong> 40-60%</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Melting Temp:</strong> 50-65°C</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Specificity:</strong> Unique to target</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={validatePrimers}
                disabled={!primerDesign.forward || !primerDesign.reverse || primerDesign.validated}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {primerDesign.validated ? '✅ Primers Validated' : 'Validate Primer Design'}
              </button>

              {primerDesign.validated && (
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Continue to Master Mix
                </button>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare PCR Master Mix</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Master Mix Components (30 μL total):</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'template', label: 'Template DNA', target: 2, unit: 'μL' },
                      { name: 'forward', label: 'Forward Primer (10μM)', target: 0.7, unit: 'μL' },
                      { name: 'reverse', label: 'Reverse Primer (10μM)', target: 0.7, unit: 'μL' },
                      { name: 'taq', label: 'Taq Polymerase Mix', target: 15, unit: 'μL' },
                      { name: 'water', label: 'Sterile dH₂O', target: 11.6, unit: 'μL' }
                    ].map(component => (
                      <div key={component.name} className="flex items-center space-x-3">
                        <div className="w-32 text-sm">{component.label}:</div>
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
                    <p className="font-semibold">
                      Total Volume: {Object.values(pcrReaction).slice(0, -1).reduce((sum, val) => sum + val, 0).toFixed(1)} μL
                    </p>
                    <p className={`text-sm ${pcrReaction.ready ? 'text-green-600' : 'text-red-600'}`}>
                      {pcrReaction.ready ? '✅ Mix ready for PCR' : '❌ Adjust volumes to reach 30 μL total'}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-semibold mb-4">PCR Tube:</h4>
                  <div className="w-32 h-40 bg-gray-200 rounded-lg mx-auto relative overflow-hidden border-2 border-gray-400">
                    {pcrReaction.ready && (
                      <div className="absolute bottom-0 left-0 right-0 bg-pink-300 transition-all duration-500" style={{ height: '60%' }}>
                        <div className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold">
                          PCR Mix
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-0 right-0 text-center text-xs">
                      {Object.values(pcrReaction).slice(0, -1).reduce((sum, val) => sum + val, 0).toFixed(1)} μL
                    </div>
                  </div>
                </div>
              </div>

              {pcrReaction.ready && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Master Mix Ready - Set Up Thermal Cycling
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Set Up Thermal Cycling Program</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">PCR Protocol Steps:</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded bg-red-50">
                      <p className="font-semibold text-red-800">1. Initial Denaturation</p>
                      <p className="text-sm">95°C for 5 minutes</p>
                    </div>
                    
                    <div className="p-3 border rounded bg-yellow-50">
                      <p className="font-semibold text-yellow-800">2. PCR Cycles (35 cycles):</p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Denaturation: 95°C for 30 seconds</li>
                        <li>• Annealing: 55°C for 30 seconds</li>
                        <li>• Extension: 72°C for 30 seconds</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 border rounded bg-green-50">
                      <p className="font-semibold text-green-800">3. Final Extension</p>
                      <p className="text-sm">72°C for 5 minutes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Thermal Cycler Setup:</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="bg-green-400 text-black text-center py-2 rounded mb-4 font-mono font-bold">
                      THERMAL CYCLER
                    </div>
                    <div className="text-white space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Program:</span>
                        <span>PCR_Standard</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cycles:</span>
                        <span>35</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Time:</span>
                        <span>2h 45min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400">Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedTool === 'thermal-cycler') {
                    setUserActions([...userActions, 'Programmed thermal cycler with PCR protocol']);
                    setStep(3);
                  } else {
                    setMistakes([...mistakes, 'Select thermal cycler from tools first']);
                  }
                }}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Program Thermal Cycler
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Run PCR Amplification</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-800 p-6 rounded-lg text-white mb-4">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold mb-2">Ready</div>
                      <div className="text-lg">PCR Program Loaded</div>
                    </div>
                    
                    <div className="bg-blue-600 p-4 rounded mb-4">
                      <h5 className="font-semibold mb-2">PCR Amplification Process:</h5>
                      <div className="text-sm space-y-1">
                        <div>• DNA strands separate at 95°C</div>
                        <div>• Primers bind at 55°C</div>
                        <div>• New DNA synthesized at 72°C</div>
                        <div>• Process repeats 35 times</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWaitingPeriod('PCR thermal cycling in progress... (2.5 hours)', 4000)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold"
                    >
                      <Play className="w-5 h-5 inline mr-2" />
                      Start PCR Program
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Expected DNA Amplification:</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <h5 className="font-semibold text-blue-800">Exponential Amplification</h5>
                      <p className="text-sm text-blue-700 mt-2">
                        Each cycle doubles the amount of target DNA. After 35 cycles, 
                        you'll have approximately 2³⁵ (34 billion) copies of your target sequence.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-semibold text-green-800">PCR Components Role</h5>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• <strong>Taq Polymerase:</strong> Heat-stable DNA synthesis</li>
                        <li>• <strong>Primers:</strong> Define amplification boundaries</li>
                        <li>• <strong>dNTPs:</strong> Building blocks for new DNA</li>
                        <li>• <strong>Buffer:</strong> Optimal enzyme conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Prepare Agarose Gel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Gel Preparation Protocol:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Prepare 300mL of 1X TAE buffer</li>
                    <li>Add 2.4g agarose (0.8% gel)</li>
                    <li>Microwave until completely dissolved</li>
                    <li>Cool to 60-70°C and add DNA stain</li>
                    <li>Pour into casting tray with comb</li>
                    <li>Allow to solidify (20 minutes)</li>
                  </ol>

                  <button
                    onClick={() => {
                      if (selectedTool === 'gel-apparatus') {
                        setUserActions([...userActions, 'Prepared 0.8% agarose gel for electrophoresis']);
                        setStep(6);
                      } else {
                        setMistakes([...mistakes, 'Select gel electrophoresis apparatus from tools first']);
                      }
                    }}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Prepare Agarose Gel
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Gel Casting:</h4>
                  <div className="relative">
                    <div className="w-64 h-32 bg-gray-300 rounded mx-auto border-2 border-gray-500">
                      <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 rounded relative">
                        <div className="absolute top-2 left-4 right-4 flex justify-between">
                          {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="w-4 h-6 bg-blue-400 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Agarose gel with wells for sample loading
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Load Samples and Run Electrophoresis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Sample Loading Order:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                      <div className="w-6 h-8 bg-purple-400 rounded-sm"></div>
                      <div>
                        <p className="font-semibold">Lane 1: DNA Ladder</p>
                        <p className="text-sm text-gray-600">Size markers (100bp-1kb)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-pink-50 rounded">
                      <div className="w-6 h-8 bg-pink-400 rounded-sm"></div>
                      <div>
                        <p className="font-semibold">Lane 2: PCR Product</p>
                        <p className="text-sm text-gray-600">Your amplified DNA sample</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <div className="w-6 h-8 bg-gray-400 rounded-sm"></div>
                      <div>
                        <p className="font-semibold">Lane 3: Negative Control</p>
                        <p className="text-sm text-gray-600">No template DNA</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWaitingPeriod('Gel electrophoresis running... DNA migrating through gel (30 minutes)', 3000)}
                    className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Load Samples & Start Electrophoresis
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-center">Electrophoresis Setup:</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="w-64 h-32 bg-blue-200 rounded mx-auto border-2 border-gray-600 relative">
                      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-red-500 font-bold">(-)</div>
                      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-black font-bold">(+)</div>
                      
                      <div className="absolute top-2 left-4 right-4 flex justify-between">
                        <div className="w-4 h-6 bg-purple-600 rounded-sm"></div>
                        <div className="w-4 h-6 bg-pink-600 rounded-sm"></div>
                        <div className="w-4 h-6 bg-gray-600 rounded-sm"></div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4 text-white">
                      <div className="mb-2">Voltage: 100V</div>
                      <div className="text-sm">DNA migrates from (-) to (+)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Analyze PCR Results</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Gel Documentation:</h4>
                  <div className="bg-black p-4 rounded-lg">
                    <div className="w-full h-64 bg-gray-900 rounded relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded"></div>
                      
                      {gelResults && (
                        <>
                          <div className="absolute left-8 top-4">
                            {[1000, 750, 500, 250, 100].map((size, index) => (
                              <div
                                key={size}
                                className="w-4 h-1 bg-orange-400 mb-3 rounded shadow-lg"
                                style={{ 
                                  filter: 'drop-shadow(0 0 4px #fb923c)',
                                  transform: `translateY(${index * 12}px)`
                                }}
                              ></div>
                            ))}
                            <div className="text-orange-300 text-xs mt-2 text-center">Ladder</div>
                          </div>
                          
                          <div className="absolute left-20 top-8">
                            <div 
                              className="w-4 h-2 bg-green-400 rounded shadow-lg"
                              style={{ filter: 'drop-shadow(0 0 6px #4ade80)' }}
                            ></div>
                            <div className="text-green-300 text-xs mt-14 text-center">PCR</div>
                          </div>
                          
                          <div className="absolute left-32 top-4">
                            <div className="text-gray-500 text-xs mt-16 text-center">Control</div>
                          </div>
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
  User,
  LogOut,
  Trophy,
  Star,
  Menu,
  Check,
  X,
  Shake,
  Volume2,
  VolumeX,
  RotateCw,
  Erlenmeyer,
  Syringe,
  Microscope as MicroscopeIcon,
  FlaskRound,
  Ruler,
  Scale,
  Thermometer as ThermometerIcon
} from 'lucide-react';

const BiomedicalLabPlatform = () => {
  // Authentication and User State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('labUsers') || '[]'));

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
      'microscope': { name: 'Light Microscope', icon: <MicroscopeIcon className="w-8 h-8" />, color: 'bg-gray-600' },
      'fluorescence-microscope': { name: 'Fluorescence Microscope', icon: <MicroscopeIcon className="w-8 h-8" />, color: 'bg-purple-600' },
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
        <div className="bg-white rounded-lg p-6 w-96 max-w-md">
          <h2 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
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

  // Quiz Component
  const QuizComponent = ({ experiment }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const quiz = experiments[experiment].quiz;
    const totalQuestions = quiz.questions.length;

    const handleAnswerSelect = (answerIndex) => {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = answerIndex;
      setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    };

    const calculateScore = () => {
      const correct = selectedAnswers.reduce((count, answer, index) => {
        return count + (answer === quiz.questions[index].correct ? 1 : 0);
      }, 0);
      return Math.round((correct / totalQuestions) * 100);
    };

    const handleCompleteQuiz = () => {
      const score = calculateScore();
      const updatedProfile = {
        ...studentProfile,
        quizScores: {
          ...studentProfile.quizScores,
          [experiment]: score
        }
      };
      
      if (score >= 70) {
        updatedProfile.badges = [...new Set([...studentProfile.badges, `${experiments[experiment].title} Quiz Master`])];
        updatedProfile.totalScore += score;
      }
      
      saveUserData(updatedProfile);
      setQuizCompleted(true);
    };

    if (showResults) {
      const score = calculateScore();
      const passed = score >= 70;

      return (
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
          <div className={`text-center p-6 rounded-lg mb-6 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <p className={`text-lg ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed ? '🎉 Congratulations! You passed!' : '📚 Keep studying! Try again.'}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {quiz.questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-semibold mb-2">{question.question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded ${
                        optIndex === question.correct 
                          ? 'bg-green-100 border-green-500 border' 
                          : selectedAnswers[index] === optIndex 
                            ? 'bg-red-100 border-red-500 border' 
                            : 'bg-gray-50'
                      }`}
                    >
                      {option}
                      {optIndex === question.correct && <span className="text-green-600 font-semibold"> ✓ Correct</span>}
                      {selectedAnswers[index] === optIndex && optIndex !== question.correct && <span className="text-red-600 font-semibold"> ✗ Your answer</span>}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            {!quizCompleted ? (
              <button
                onClick={handleCompleteQuiz}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Save Results & Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setShowPreLab(true);
                }}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Proceed to Pre-Lab
              </button>
            )}
          </div>
        </div>
      );
    }

    const currentQ = quiz.questions[currentQuestion];

    return (
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pre-Lab Quiz</h2>
          <span className="text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  // Pre-Lab Component
  const PreLabComponent = ({ experiment }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [completedSections, setCompletedSections] = useState([]);

    const preLabContent = {
      'osmotic-solutions': {
        title: 'Osmotic Solutions - Pre-Lab',
        sections: [
          {
            title: 'Learning Objectives',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand the principle of the Bradford protein assay</li>
                  <li>Prepare a standard curve using BSA standards</li>
                  <li>Calculate protein concentrations from absorbance readings</li>
                  <li>Use a microplate reader and spectrophotometer</li>
                  <li>Apply statistical analysis to experimental data</li>
                </ul>
              </div>
            )
          },
          {
            title: 'Background Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Bradford Assay Principle</h4>
                <p>The Bradford assay is based on the binding of Coomassie Brilliant Blue G-250 to basic amino acids (arginine, lysine, and histidine) in proteins.</p>
                <div className="bg-purple-50 p-4 rounded mt-4">
                  <h5 className="font-semibold text-purple-800">Key Points:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Dye binds to proteins causing color change from brown to blue</li>
                    <li>Absorbance measured at 595 nm</li>
                    <li>Linear relationship between protein concentration and absorbance</li>
                    <li>Range: 0-2000 μg/mL protein</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: 'Background Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Bradford Assay Principle</h4>
                <p>The Bradford assay is based on the binding of Coomassie Brilliant Blue G-250 to basic amino acids (arginine, lysine, and histidine) in proteins.</p>
                <div className="bg-purple-50 p-4 rounded mt-4">
                  <h5 className="font-semibold text-purple-800">Key Points:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Dye binds to proteins causing color change from brown to blue</li>
                    <li>Absorbance measured at 595 nm</li>
                    <li>Linear relationship between protein concentration and absorbance</li>
                    <li>Range: 0-2000 μg/mL protein</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: 'Equipment and Materials',
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold">Equipment:</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Microplate reader</li>
                      <li>Micropipettes (P10, P200, P1000)</li>
                      <li>96-well microplate</li>
                      <li>Vortex mixer</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold">Materials:</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Bradford reagent</li>
                      <li>BSA standard solutions</li>
                      <li>Unknown protein samples</li>
                      <li>Distilled water</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      'pcr-simulation': {
        title: 'PCR Amplification - Pre-Lab',
        sections: [
          {
            title: 'Learning Objectives',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand the principles of PCR amplification</li>
                  <li>Design appropriate PCR primers</li>
                  <li>Set up PCR reactions with proper controls</li>
                  <li>Analyze PCR products using gel electrophoresis</li>
                  <li>Troubleshoot common PCR problems</li>
                </ul>
              </div>
            )
          },
          {
            title: 'PCR Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Three Steps of PCR</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded">
                    <h5 className="font-semibold text-red-800">1. Denaturation (95°C)</h5>
                    <p className="text-sm">DNA double helix separates into single strands</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h5 className="font-semibold text-blue-800">2. Annealing (50-65°C)</h5>
                    <p className="text-sm">Primers bind to complementary sequences</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <h5 className="font-semibold text-green-800">3. Extension (72°C)</h5>
                    <p className="text-sm">Taq polymerase synthesizes new DNA strands</p>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: 'Primer Design Guidelines',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Primer Design Criteria</h4>
                <div className="bg-yellow-50 p-4 rounded">
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Length:</strong> 18-25 nucleotides</li>
                    <li><strong>GC Content:</strong> 40-60%</li>
                    <li><strong>Melting Temperature:</strong> 50-65°C</li>
                    <li><strong>Avoid:</strong> Secondary structures, primer dimers</li>
                    <li><strong>Specificity:</strong> Unique to target sequence</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      },
      'gram-staining': {
        title: 'Gram Staining - Pre-Lab',
        sections: [
          {
            title: 'Learning Objectives',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand the principle of Gram staining</li>
                  <li>Differentiate between Gram-positive and Gram-negative bacteria</li>
                  <li>Perform proper heat fixation of bacterial smears</li>
                  <li>Apply staining reagents in correct sequence</li>
                  <li>Interpret staining results and bacterial morphology</li>
                </ul>
              </div>
            )
          },
          {
            title: 'Staining Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Gram Staining Mechanism</h4>
                <p>The Gram stain differentiates bacteria based on cell wall structure, specifically the thickness of the peptidoglycan layer.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-purple-50 p-4 rounded">
                    <h5 className="font-semibold text-purple-800">Gram-Positive</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Thick peptidoglycan layer (20-80nm)</li>
                      <li>• Retains crystal violet-iodine complex</li>
                      <li>• Appears purple/violet</li>
                      <li>• Examples: S. aureus, B. subtilis</li>
                    </ul>
                  </div>
                  <div className="bg-pink-50 p-4 rounded">
                    <h5 className="font-semibold text-pink-800">Gram-Negative</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Thin peptidoglycan layer (2-7nm)</li>
                      <li>• Loses crystal violet during decolorization</li>
                      <li>• Appears pink/red from safranin</li>
                      <li>• Examples: E. coli, P. aeruginosa</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: 'Safety and Technique',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-red-600">⚠️ Laboratory Safety</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Work with bacterial cultures using aseptic technique</li>
                  <li>Use Bunsen burner safely - tie back hair, avoid loose clothing</li>
                  <li>Handle staining reagents carefully - some are toxic</li>
                  <li>Dispose of bacterial materials in designated biohazard containers</li>
                  <li>Clean work area with disinfectant before and after use</li>
                </ul>
                <div className="bg-blue-50 p-4 rounded mt-4">
                  <h5 className="font-semibold text-blue-800">Critical Technique Points:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Heat fixation: Pass slide through flame 2-3 times quickly</li>
                    <li>Decolorization: Most critical step - add drop by drop until no more purple runs off</li>
                    <li>Timing: Follow incubation times precisely for each reagent</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      },
      'cell-staining': {
        title: 'Cytoskeleton & Nucleus Staining - Pre-Lab',
        sections: [
          {
            title: 'Learning Objectives',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand principles of fluorescence microscopy</li>
                  <li>Perform cell permeabilization and blocking procedures</li>
                  <li>Use specific fluorescent probes for cellular structures</li>
                  <li>Visualize actin filaments and nuclei simultaneously</li>
                  <li>Interpret multi-channel fluorescence images</li>
                </ul>
              </div>
            )
          },
          {
            title: 'Fluorescence Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Fluorescence Staining Principles</h4>
                <p>Fluorescent molecules absorb light at one wavelength (excitation) and emit light at a longer wavelength (emission).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-50 p-4 rounded">
                    <h5 className="font-semibold text-green-800">Phalloidin-Alexa 488</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Target: F-actin filaments</li>
                      <li>• Excitation: 495nm (blue light)</li>
                      <li>• Emission: 519nm (green light)</li>
                      <li>• Shows cytoskeleton structure</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h5 className="font-semibold text-blue-800">DAPI</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Target: A-T rich DNA regions</li>
                      <li>• Excitation: 358nm (UV light)</li>
                      <li>• Emission: 461nm (blue light)</li>
                      <li>• Shows cell nuclei</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: 'Sample Preparation',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Cell Preparation Protocol</h4>
                <div className="bg-yellow-50 p-4 rounded">
                  <h5 className="font-semibold text-yellow-800">Key Steps:</h5>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>Permeabilization:</strong> Triton X-100 creates membrane pores</li>
                    <li><strong>Blocking:</strong> BSA prevents non-specific binding</li>
                    <li><strong>Primary staining:</strong> Phalloidin binds to actin</li>
                    <li><strong>Nuclear staining:</strong> DAPI binds to DNA</li>
                    <li><strong>Imaging:</strong> Multi-channel fluorescence microscopy</li>
                  </ol>
                </div>
                <div className="bg-red-50 p-4 rounded mt-4">
                  <h5 className="font-semibold text-red-800">⚠️ Important Notes:</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Protect fluorescent samples from light to prevent photobleaching</li>
                    <li>Work quickly once fluorescent stains are applied</li>
                    <li>Use proper filter sets for each fluorophore</li>
                    <li>Store stained samples at 4°C if not imaging immediately</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      }
        ]
      },
      'pcr-simulation': {
        title: 'PCR Amplification - Pre-Lab',
        sections: [
          {
            title: 'Learning Objectives',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand the principles of PCR amplification</li>
                  <li>Design appropriate PCR primers</li>
                  <li>Set up PCR reactions with proper controls</li>
                  <li>Analyze PCR products using gel electrophoresis</li>
                  <li>Troubleshoot common PCR problems</li>
                </ul>
              </div>
            )
          },
          {
            title: 'PCR Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Three Steps of PCR</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded">
                    <h5 className="font-semibold text-red-800">1. Denaturation (95°C)</h5>
                    <p className="text-sm">DNA double helix separates into single strands</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h5 className="font-semibold text-blue-800">2. Annealing (50-65°C)</h5>
                    <p className="text-sm">Primers bind to complementary sequences</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <h5 className="font-semibold text-green-800">3. Extension (72°C)</h5>
                    <p className="text-sm">Taq polymerase synthesizes new DNA strands</p>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: 'Primer Design Guidelines',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Primer Design Criteria</h4>
                <div className="bg-yellow-50 p-4 rounded">
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Length:</strong> 18-25 nucleotides</li>
                    <li><strong>GC Content:</strong> 40-60%</li>
                    <li><strong>Melting Temperature:</strong> 50-65°C</li>
                    <li><strong>Avoid:</strong> Secondary structures, primer dimers</li>
                    <li><strong>Specificity:</strong> Unique to target sequence</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      }
    };

    const currentContent = preLabContent[experiment];
    const totalSections = currentContent.sections.length;

    const markSectionComplete = () => {
      if (!completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
    };

    const canProceed = completedSections.length === totalSections;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">{currentContent.title}</h1>
              <span className="text-white">
                Section {currentSection + 1} of {totalSections}
              </span>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">{currentContent.sections[currentSection].title}</h2>
              {currentContent.sections[currentSection].content}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={markSectionComplete}
                  disabled={completedSections.includes(currentSection)}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-700"
                >
                  {completedSections.includes(currentSection) ? '✓ Completed' : 'Mark Complete'}
                </button>

                {currentSection < totalSections - 1 ? (
                  <button
                    onClick={() => setCurrentSection(currentSection + 1)}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Next Section
                  </button>
                ) : canProceed ? (
                  <button
                    onClick={() => {
                      setShowPreLab(false);
                      // Update lab progress
                      const updatedProfile = {
                        ...studentProfile,
                        labProgress: {
                          ...studentProfile.labProgress,
                          [experiment]: 'pre-lab-complete'
                        }
                      };
                      saveUserData(updatedProfile);
                    }}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Start Lab Experiment
                  </button>
                ) : (
                  <span className="px-6 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
                    Complete all sections to continue
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Leaderboard Component
  const Leaderboard = () => {
    const sortedUsers = [...users]
      .filter(user => user.totalScore > 0)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                <Trophy className="w-10 h-10 mr-4 text-yellow-400" />
                Leaderboard
              </h1>
              <p className="text-yellow-200">Top performing students in the virtual lab</p>
            </div>

            <div className="space-y-4">
              {sortedUsers.map((user, index) => (
                <div
                  key={user.email}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? 'bg-yellow-500/20 border-2 border-yellow-400' :
                    index === 1 ? 'bg-gray-300/20 border-2 border-gray-400' :
                    index === 2 ? 'bg-orange-500/20 border-2 border-orange-400' :
                    'bg-white/10 border border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-orange-400 text-orange-900' :
                      'bg-white/20 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{user.name}</h3>
                      <p className="text-white/70 text-sm">
                        {user.experimentsCompleted} experiments • {user.badges.length} badges
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{user.totalScore}</div>
                    <p className="text-white/70 text-sm">points</p>
                  </div>
                </div>
              ))}
            </div>

            {sortedUsers.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 text-lg">No scores yet. Complete some experiments to see the leaderboard!</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentExperiment('dashboard')}
                className="bg-white/20 text-white px-6 py-2 rounded hover:bg-white/30 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Dashboard Component
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
              <button
                onClick={() => setCurrentExperiment('leaderboard')}
                className="flex items-center bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Leaderboard
              </button>
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

          {/* Enhanced Student Profile Card */}
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
                    setShowQuiz(true);
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

  // Enhanced Osmotic Solutions Lab with User Protocol
  const OsmoticSolutions = () => {
    const [step, setStep] = useState(0);
    const [selectedTool, setSelectedTool] = useState(null);
    const [protocolStep, setProtocolStep] = useState(0);
    const [waitingMessage, setWaitingMessage] = useState('');
    const [showWaitingMessage, setShowWaitingMessage] = useState(false);
    const [userActions, setUserActions] = useState([]);
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
      A: { name: 'Solution A', type: 'hypotonic', revealed: false },
      B: { name: 'Solution B', type: 'isotonic', revealed: false },
      C: { name: 'Solution C', type: 'hypertonic', revealed: false }
    });
    const [mistakes, setMistakes] = useState([]);

    const steps = [
      "Prepare Materials and Equipment",
      "Prepare Onion Epidermis Sample",
      "Mount Sample on Slide", 
      "Apply Test Solutions",
      "Wait for Osmotic Effects (3 minutes)",
      "Microscopic Observation",
      "Prepare Blood Cell Samples",
      "Apply Solutions to Blood Cells",
      "Wait for Cellular Changes (3 minutes)",
      "Final Microscopic Analysis",
      "Data Analysis and Conclusions"
    ];

    const protocolSteps = [
      {
        title: "Gather Required Materials",
        instruction: "Select the microscope from available tools",
        requiredTool: "microscope",
        action: "tool-selection"
      },
      {
        title: "Prepare Onion Sample", 
        instruction: "Use the glass slides to prepare your onion epidermis sample",
        requiredTool: "slides",
        action: "sample-prep"
      },
      {
        title: "Add Cover Slip",
        instruction: "Place a cover slip over your sample",
        requiredTool: "coverslips", 
        action: "cover-slip"
      },
      {
        title: "Apply Test Solutions",
        instruction: "Use pipette to add solutions to your samples",
        requiredTool: "pipette",
        action: "solution-application"
      }
    ];

    const handleWaitingPeriod = (message, duration = 3000) => {
      setWaitingMessage(message);
      setShowWaitingMessage(true);
      setTimeout(() => {
        setShowWaitingMessage(false);
        setStep(step + 1);
      }, duration);
    };

    const handleToolSelection = (tool) => {
      setSelectedTool(tool);
      const currentProtocol = protocolSteps[protocolStep];
      if (currentProtocol && currentProtocol.requiredTool === tool) {
        setUserActions([...userActions, `Used ${tool} correctly`]);
        setProtocolStep(protocolStep + 1);
      } else {
        setMistakes([...mistakes, `Wrong tool selected. Expected ${currentProtocol?.requiredTool}, got ${tool}`]);
      }
    };

    const renderProtocolInterface = () => {
      const currentProtocol = protocolSteps[protocolStep];
      if (!currentProtocol) return null;

      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📋 Protocol Step {protocolStep + 1}</h4>
          <p className="text-yellow-700 mb-3">{currentProtocol.instruction}</p>
          {currentProtocol.action === "tool-selection" && (
            <p className="text-sm text-yellow-600">Click on the required tool below to proceed.</p>
          )}
        </div>
      );
    };

    const experiment = experiments['osmotic-solutions'];

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

          {/* Lab Tools */}
          <LabTools 
            availableTools={experiment.tools}
            onToolSelect={handleToolSelection}
            selectedTool={selectedTool}
          />

          {/* Protocol Interface */}
          {renderProtocolInterface()}

          {/* Waiting Message */}
          {showWaitingMessage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Please Wait</h3>
                <p className="text-gray-700">{waitingMessage}</p>
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              </div>
            </div>
          )}

          {/* Lab Content Based on Step */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
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
                    <button
                      onClick={() => setStep(1)}
                      className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                      Materials Ready - Continue
                    </button>
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
              </div>
            )}

            {step === 1 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Prepare Onion Epidermis Sample</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Step-by-Step Protocol:</h4>
                    <ol className="list-decimal list-inside space-y-3 text-sm">
                      <li className="p-2 bg-gray-50 rounded">Cut purple onion bulb into quarters</li>
                      <li className="p-2 bg-gray-50 rounded">Remove one scale with dark epidermal layer</li>
                      <li className="p-2 bg-gray-50 rounded">Snap the scale backward to produce thin epidermis</li>
                      <li className="p-2 bg-gray-50 rounded">Use forceps to carefully peel off epidermis</li>
                      <li className="p-2 bg-gray-50 rounded">Place tissue flat on glass slide</li>
                    </ol>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setUserActions([...userActions, 'Prepared onion epidermis sample']);
                          handleWaitingPeriod('Allowing sample to settle for optimal viewing...', 2000);
                        }}
                        disabled={!selectedTool || selectedTool !== 'slides'}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Complete Sample Preparation
                      </button>
                      {!selectedTool && (
                        <p className="text-red-500 text-sm mt-2">Please select glass slides from the tools above first</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-48 h-32 bg-purple-200 rounded-lg border-2 border-purple-400 flex items-center justify-center">
                      <span className="text-purple-700 font-semibold">Purple Onion Epidermis</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Mount Sample on Slide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Mounting Procedure:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Ensure epidermis is spread evenly on slide</li>
                      <li>Add a small drop of water if needed</li>
                      <li>Lower coverslip at 45° angle to avoid air bubbles</li>
                      <li>Gently press to remove excess air</li>
                    </ol>
                    <button
                      onClick={() => {
                        if (selectedTool === 'coverslips') {
                          setUserActions([...userActions, 'Properly mounted sample with coverslip']);
                          setStep(3);
                        } else {
                          setMistakes([...mistakes, 'Need to select coverslips tool first']);
                        }
                      }}
                      className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                      Mount Sample
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="w-48 h-20 bg-gray-100 border-2 border-gray-400 rounded mx-auto relative">
                      <div className="absolute inset-2 bg-gray-200 rounded-sm">
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                          Mounted Sample
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Slide with coverslip</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
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
                                const newCells = onionCells.map(cell => {
                                  if (!cell.solution) {
                                    let newState = 'normal';
                                    if (solution.type === 'hypotonic') newState = 'turgid';
                                    else if (solution.type === 'hypertonic') newState = 'plasmolyzed';
                                    return { ...cell, solution: key, state: newState };
                                  }
                                  return cell;
                                });
                                setOnionCells(newCells);
                                setUserActions([...userActions, `Applied ${solution.name} to onion cells`]);
                                return;
                              }
                              setMistakes([...mistakes, 'Select pipette tool first to apply solutions']);
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
                    <h4 className="font-semibold mb-2 text-center">Onion Cells on Slide</h4>
                    <svg className="w-full h-full">
                      {onionCells.map(cell => {
                        const getStyle = () => {
                          let fill = '#f5f5f5';
                          let transform = '';
                          if (cell.state === 'turgid') {
                            fill = '#c8e6c9';
                            transform = 'scale(1.1)';
                          } else if (cell.state === 'plasmolyzed') {
                            fill = '#ffcdd2';
                            transform = 'scale(0.85)';
                          }
                          return { fill, transform };
                        };
                        const style = getStyle();
                        return (
                          <g key={cell.id}>
                            <rect
                              x={cell.x}
                              y={cell.y}
                              width="60"
                              height="40"
                              fill={style.fill}
                              stroke="#8d6e63"
                              strokeWidth="2"
                              rx="8"
                              transform={style.transform}
                              transformOrigin={`${cell.x + 30} ${cell.y + 20}`}
                            />
                            <text x={cell.x + 30} y={cell.y + 55} textAnchor="middle" fontSize="12" fontWeight="bold">
                              Cell {cell.id}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
                {onionCells.every(cell => cell.solution) && (
                  <button
                    onClick={() => handleWaitingPeriod('Waiting for osmotic effects to occur in onion cells... (3 minutes)', 3000)}
                    className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    All Solutions Applied - Wait for Effects
                  </button>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Microscopic Observation - Onion Cells</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Observation Protocol:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Place slide on microscope stage</li>
                      <li>Start with 10x objective lens</li>
                      <li>Focus using coarse adjustment</li>
                      <li>Switch to 40x for detailed view</li>
                      <li>Record observations for each cell</li>
                    </ol>
                    <div className="mt-6 space-y-4">
                      {onionCells.map(cell => (
                        <div key={cell.id} className="p-3 bg-gray-50 rounded">
                          <p><strong>Cell {cell.id} (Solution {cell.solution}):</strong></p>
                          <p className="text-sm text-gray-700">
                            {cell.state === 'turgid' && "Cell appears swollen, membrane pressed against cell wall (turgid)"}
                            {cell.state === 'plasmolyzed' && "Cell membrane pulled away from cell wall, cytoplasm shrunken (plasmolyzed)"}
                            {cell.state === 'normal' && "Cell appears normal, no significant changes"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-center">Microscope View (400x):</h4>
                    <div className="w-80 h-80 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                      <svg className="absolute inset-4 w-72 h-72">
                        {onionCells.map(cell => {
                          const style = cell.state === 'turgid' ? { fill: '#c8e6c9', scale: 1.1 } :
                                      cell.state === 'plasmolyzed' ? { fill: '#ffcdd2', scale: 0.85 } :
                                      { fill: '#f5f5f5', scale: 1.0 };
                          return (
                            <g key={cell.id}>
                              <rect
                                x={cell.x - 100}
                                y={cell.y - 50}
                                width={60 * style.scale}
                                height={40 * style.scale}
                                fill={style.fill}
                                stroke="#8d6e63"
                                strokeWidth="2"
                                rx="8"
                              />
                            </g>
                          );
                        })}
                      </svg>
                      <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        400x Magnification
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(6)}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Continue to Blood Cell Analysis
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Prepare Blood Cell Samples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Blood Sample Protocol:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Place drop of test solution on clean slide</li>
                      <li>Add small drop of blood sample</li>
                      <li>Mix gently with glass rod</li>
                      <li>Cover with coverslip</li>
                    </ol>
                    <div className="mt-6 space-x-2">
                      {Object.keys(solutions).map(key => (
                        <button
                          key={key}
                          onClick={() => {
                            if (selectedTool === 'pipette') {
                              const newCells = bloodCells.map(cell => {
                                if (!cell.solution) {
                                  const solution = solutions[key];
                                  let newState = 'normal';
                                  if (solution.type === 'hypotonic') newState = 'hemolyzed';
                                  else if (solution.type === 'hypertonic') newState = 'crenated';
                                  return { ...cell, solution: key, state: newState };
                                }
                                return cell;
                              });
                              setBloodCells(newCells);
                              setUserActions([...userActions, `Applied ${solutions[key].name} to blood cells`]);
                            } else {
                              setMistakes([...mistakes, 'Select pipette tool first']);
                            }
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
                    <svg className="w-full h-full">
                      {bloodCells.map(cell => {
                        const getStyle = () => {
                          let fill = '#f44336';
                          let transform = '';
                          if (cell.state === 'hemolyzed') {
                            fill = '#ffcdd2';
                            transform = 'scale(1.3)';
                          } else if (cell.state === 'crenated') {
                            fill = '#d32f2f';
                            transform = 'scale(0.7)';
                          }
                          return { fill, transform };
                        };
                        const style = getStyle();
                        return (
                          <g key={cell.id}>
                            <circle
                              cx={cell.x}
                              cy={cell.y}
                              r="15"
                              fill={style.fill}
                              transform={style.transform}
                              transformOrigin={`${cell.x} ${cell.y}`}
                            />
                            <text x={cell.x} y={cell.y + 35} textAnchor="middle" fontSize="12" fontWeight="bold">
                              RBC {cell.id}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
                {bloodCells.every(cell => cell.solution) && (
                  <button
                    onClick={() => setStep(7)}
                    className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Blood Slides Prepared - Continue
                  </button>
                )}
              </div>
            )}

            {step === 7 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Apply Solutions to Blood Cells</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-red-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Note</h4>
                      <p className="text-red-700 text-sm">
                        Red blood cells lack cell walls, so they respond differently to osmotic stress compared to plant cells.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <h5 className="font-semibold text-blue-800">Expected Results:</h5>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1">
                          <li>• Hypotonic: Hemolysis (cell bursting)</li>
                          <li>• Isotonic: Normal disc shape maintained</li>
                          <li>• Hypertonic: Crenation (shrinkage with spikes)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-64 h-64 bg-black rounded-full mx-auto relative border-4 border-gray-600">
                      <svg className="absolute inset-4 w-56 h-56">
                        {bloodCells.map(cell => {
                          const style = cell.state === 'hemolyzed' ? { fill: '#ffcdd2', scale: 1.3, opacity: 0.6 } :
                                      cell.state === 'crenated' ? { fill: '#d32f2f', scale: 0.7 } :
                                      { fill: '#f44336', scale: 1.0, opacity: 1 };
                          return (
                            <g key={cell.id}>
                              <circle
                                cx={cell.x - 80}
                                cy={cell.y - 100}
                                r={15 * style.scale}
                                fill={style.fill}
                                opacity={style.opacity || 1}
                              />
                            </g>
                          );
                        })}
                      </svg>
                      <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        400x Magnification
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleWaitingPeriod('Waiting for cellular changes in blood cells... (3 minutes)', 3000)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Continue to Final Observation
                </button>
              </div>
            )}

            {step === 9 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Final Microscopic Analysis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Blood Cell Observations:</h4>
                    <div className="space-y-4">
                      {bloodCells.map(cell => (
                        <div key={cell.id} className="p-3 bg-gray-50 rounded">
                          <p><strong>RBC {cell.id} (Solution {cell.solution}):</strong></p>
                          <p className="text-sm text-gray-700">
                            {cell.state === 'hemolyzed' && "Cells appear swollen and pale, membrane rupturing"}
                            {cell.state === 'crenated' && "Cells appear shrunken with spiky projections (crenated)"}
                            {cell.state === 'normal' && "Cells maintain normal biconcave disc shape"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-center">Comparative Analysis:</h4>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded">
                        <h5 className="font-semibold text-green-800">Plant vs Animal Cells:</h5>
                        <div className="text-sm text-green-700 mt-2 space-y-2">
                          <div>
                            <strong>Plant cells:</strong> Cell wall prevents bursting in hypotonic solutions
                          </div>
                          <div>
                            <strong>Animal cells:</strong> No cell wall protection, can burst in hypotonic solutions
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded">
                        <h5 className="font-semibold text-blue-800">Key Observations:</h5>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1">
                          <li>• Osmosis affects all living cells</li>
                          <li>• Cell structure determines response</li>
                          <li>• Tonicity is relative to cell contents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(10)}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Proceed to Data Analysis
                </button>
              </div>
            )}

            {step === 10 && (
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
                    <h4 className="font-semibold mb-4">Experimental Summary:</h4>
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-semibold text-green-800 mb-2">Results:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Hypotonic: Cell swelling (turgid/hemolysis)</li>
                        <li>• Isotonic: No change</li>
                        <li>• Hypertonic: Cell shrinkage (plasmolysis/crenation)</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 p-4 rounded">
                      <h5 className="font-semibold text-blue-800 mb-2">Lab Performance:</h5>
                      <p className="text-sm text-blue-700">Actions Completed: {userActions.length}</p>
                      <p className="text-sm text-blue-700">Mistakes: {mistakes.length}</p>
                      <p className="text-sm text-blue-700">Grade: {mistakes.length === 0 ? 'A+' : mistakes.length <= 2 ? 'A' : 'B+'}</p>
                    </div>
                  </div>
                </div>

                {Object.values(solutions).every(s => s.revealed) && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        const grade = mistakes.length === 0 ? 100 : Math.max(70, 100 - mistakes.length * 5);
                        const updatedProfile = {
                          ...studentProfile,
                          experimentsCompleted: studentProfile.experimentsCompleted + 1,
                          totalScore: studentProfile.totalScore + grade,
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
                      Complete Osmotic Solutions Lab
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mistakes Log */}
          {mistakes.length > 0 && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <h4 className="text-red-300 font-semibold mb-2">⚠️ Lab Notes ({mistakes.length} issues)</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mistakes.slice(-3).map((mistake, index) => (
                  <li key={index}>• {mistake}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main render function
  if (showQuiz && currentExperiment !== 'dashboard' && currentExperiment !== 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setShowQuiz(false);
                setCurrentExperiment('dashboard');
              }}
              className="text-white hover:text-purple-300 transition-colors mb-4"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white text-center">
              {experiments[currentExperiment].title} - Pre-Lab Quiz
            </h1>
          </div>
          <QuizComponent experiment={currentExperiment} />
        </div>
      </div>
    );
  }

  if (showPreLab && currentExperiment !== 'dashboard' && currentExperiment !== 'leaderboard') {
    return <PreLabComponent experiment={currentExperiment} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {currentExperiment === 'dashboard' && <Dashboard />}
      {currentExperiment === 'leaderboard' && <Leaderboard />}
      {currentExperiment === 'osmotic-solutions' && !showQuiz && !showPreLab && <OsmoticSolutions />}
      {currentExperiment === 'bradford-assay' && !showQuiz && !showPreLab && <BradfordAssay />}
      {currentExperiment === 'pcr-simulation' && !showQuiz && !showPreLab && <PCRSimulation />}
      {currentExperiment === 'gram-staining' && !showQuiz && !showPreLab && <GramStaining />}
      {currentExperiment === 'cell-staining' && !showQuiz && !showPreLab && <CellStaining />}
    </div>
  );
};

export default BiomedicalLabPlatform;
                ="list-disc list-inside space-y-2">
                  <li>Define osmosis, isotonic, hypotonic, and hypertonic solutions</li>
                  <li>Predict the effect of different solutions on plant and animal cells</li>
                  <li>Observe plasmolysis and turgidity in plant cells</li>
                  <li>Observe hemolysis and crenation in red blood cells</li>
                  <li>Explain the role of cell walls in plant cell osmotic behavior</li>
                </ul>
              </div>
            )
          },
          {
            title: 'Background Theory',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Osmosis and Tonicity</h4>
                <p>Osmosis is the diffusion of water across a selectively permeable membrane from an area of lower solute concentration to an area of higher solute concentration.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <h5 className="font-semibold text-blue-800">Hypotonic</h5>
                    <p className="text-sm">Lower solute concentration outside the cell. Water enters the cell.</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded">
                    <h5 className="font-semibold text-yellow-800">Isotonic</h5>
                    <p className="text-sm">Equal solute concentration. No net water movement.</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded">
                    <h5 className="font-semibold text-red-800">Hypertonic</h5>
                    <p className="text-sm">Higher solute concentration outside. Water leaves the cell.</p>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: 'Safety Considerations',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-red-600">⚠️ Safety First</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Wear safety goggles when handling chemicals</li>
                  <li>Handle glass slides carefully to avoid cuts</li>
                  <li>Dispose of biological materials in designated containers</li>
                  <li>Wash hands thoroughly before and after the lab</li>
                  <li>Report any spills or accidents immediately</li>
                </ul>
              </div>
            )
          }
        ]
      },
      'bradford-assay': {
        title: 'Bradford Protein Assay - Pre-Lab',
        sections: [
          {
            title: 'Learning Objectives',
            content: (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
                <ul className="list-disc list-inside space-y-2">
                 <li>Understand the principle of the Bradford protein assay</li>
                 <li>Prepare a standard curve using BSA standards</li>
                 <li>Calculate protein concentrations from absorbance readings</li>
                 <li>Use a microplate reader and spectrophotometer</li>
                 <li>Apply statistical analysis to experimental data</li>
               </ul>
             </div>
           )
         },
         {
           title: 'Background Theory',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">Bradford Assay Principle</h4>
               <p>The Bradford assay is based on the binding of Coomassie Brilliant Blue G-250 to basic amino acids (arginine, lysine, and histidine) in proteins.</p>
               <div className="bg-purple-50 p-4 rounded mt-4">
                 <h5 className="font-semibold text-purple-800">Key Points:</h5>
                 <ul className="list-disc list-inside text-sm space-y-1">
                   <li>Dye binds to proteins causing color change from brown to blue</li>
                   <li>Absorbance measured at 595 nm</li>
                   <li>Linear relationship between protein concentration and absorbance</li>
                   <li>Range: 0-2000 μg/mL protein</li>
                 </ul>
               </div>
             </div>
           )
         },
         {
           title: 'Equipment and Materials',
           content: (
             <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <h5 className="font-semibold">Equipment:</h5>
                   <ul className="list-disc list-inside text-sm space-y-1">
                     <li>Microplate reader</li>
                     <li>Micropipettes (P10, P200, P1000)</li>
                     <li>96-well microplate</li>
                     <li>Vortex mixer</li>
                   </ul>
                 </div>
                 <div>
                   <h5 className="font-semibold">Materials:</h5>
                   <ul className="list-disc list-inside text-sm space-y-1">
                     <li>Bradford reagent</li>
                     <li>BSA standard solutions</li>
                     <li>Unknown protein samples</li>
                     <li>Distilled water</li>
                   </ul>
                 </div>
               </div>
             </div>
           )
         }
       ]
     },
     'pcr-simulation': {
       title: 'PCR Amplification - Pre-Lab',
       sections: [
         {
           title: 'Learning Objectives',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
               <ul className="list-disc list-inside space-y-2">
                 <li>Understand the principles of PCR amplification</li>
                 <li>Design appropriate PCR primers</li>
                 <li>Set up PCR reactions with proper controls</li>
                 <li>Analyze PCR products using gel electrophoresis</li>
                 <li>Troubleshoot common PCR problems</li>
               </ul>
             </div>
           )
         },
         {
           title: 'PCR Theory',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">Three Steps of PCR</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-red-50 p-4 rounded">
                   <h5 className="font-semibold text-red-800">1. Denaturation (95°C)</h5>
                   <p className="text-sm">DNA double helix separates into single strands</p>
                 </div>
                 <div className="bg-blue-50 p-4 rounded">
                   <h5 className="font-semibold text-blue-800">2. Annealing (50-65°C)</h5>
                   <p className="text-sm">Primers bind to complementary sequences</p>
                 </div>
                 <div className="bg-green-50 p-4 rounded">
                   <h5 className="font-semibold text-green-800">3. Extension (72°C)</h5>
                   <p className="text-sm">Taq polymerase synthesizes new DNA strands</p>
                 </div>
               </div>
             </div>
           )
         },
         {
           title: 'Primer Design Guidelines',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">Primer Design Criteria</h4>
               <div className="bg-yellow-50 p-4 rounded">
                 <ul className="list-disc list-inside space-y-2">
                   <li><strong>Length:</strong> 18-25 nucleotides</li>
                   <li><strong>GC Content:</strong> 40-60%</li>
                   <li><strong>Melting Temperature:</strong> 50-65°C</li>
                   <li><strong>Avoid:</strong> Secondary structures, primer dimers</li>
                   <li><strong>Specificity:</strong> Unique to target sequence</li>
                 </ul>
               </div>
             </div>
           )
         }
       ]
     },
     'gram-staining': {
       title: 'Gram Staining - Pre-Lab',
       sections: [
         {
           title: 'Learning Objectives',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
               <ul className="list-disc list-inside space-y-2">
                 <li>Understand the principle of Gram staining</li>
                 <li>Differentiate between Gram-positive and Gram-negative bacteria</li>
                 <li>Perform proper heat fixation of bacterial smears</li>
                 <li>Apply staining reagents in correct sequence</li>
                 <li>Interpret staining results and bacterial morphology</li>
               </ul>
             </div>
           )
         },
         {
           title: 'Staining Theory',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">Gram Staining Mechanism</h4>
               <p>The Gram stain differentiates bacteria based on cell wall structure, specifically the thickness of the peptidoglycan layer.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                 <div className="bg-purple-50 p-4 rounded">
                   <h5 className="font-semibold text-purple-800">Gram-Positive</h5>
                   <ul className="text-sm space-y-1">
                     <li>• Thick peptidoglycan layer (20-80nm)</li>
                     <li>• Retains crystal violet-iodine complex</li>
                     <li>• Appears purple/violet</li>
                     <li>• Examples: S. aureus, B. subtilis</li>
                   </ul>
                 </div>
                 <div className="bg-pink-50 p-4 rounded">
                   <h5 className="font-semibold text-pink-800">Gram-Negative</h5>
                   <ul className="text-sm space-y-1">
                     <li>• Thin peptidoglycan layer (2-7nm)</li>
                     <li>• Loses crystal violet during decolorization</li>
                     <li>• Appears pink/red from safranin</li>
                     <li>• Examples: E. coli, P. aeruginosa</li>
                   </ul>
                 </div>
               </div>
             </div>
           )
         },
         {
           title: 'Safety and Technique',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg text-red-600">⚠️ Laboratory Safety</h4>
               <ul className="list-disc list-inside space-y-2">
                 <li>Work with bacterial cultures using aseptic technique</li>
                 <li>Use Bunsen burner safely - tie back hair, avoid loose clothing</li>
                 <li>Handle staining reagents carefully - some are toxic</li>
                 <li>Dispose of bacterial materials in designated biohazard containers</li>
                 <li>Clean work area with disinfectant before and after use</li>
               </ul>
               <div className="bg-blue-50 p-4 rounded mt-4">
                 <h5 className="font-semibold text-blue-800">Critical Technique Points:</h5>
                 <ul className="list-disc list-inside text-sm space-y-1">
                   <li>Heat fixation: Pass slide through flame 2-3 times quickly</li>
                   <li>Decolorization: Most critical step - add drop by drop until no more purple runs off</li>
                   <li>Timing: Follow incubation times precisely for each reagent</li>
                 </ul>
               </div>
             </div>
           )
         }
       ]
     },
     'cell-staining': {
       title: 'Cytoskeleton & Nucleus Staining - Pre-Lab',
       sections: [
         {
           title: 'Learning Objectives',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">By the end of this lab, you will be able to:</h4>
               <ul className="list-disc list-inside space-y-2">
                 <li>Understand principles of fluorescence microscopy</li>
                 <li>Perform cell permeabilization and blocking procedures</li>
                 <li>Use specific fluorescent probes for cellular structures</li>
                 <li>Visualize actin filaments and nuclei simultaneously</li>
                 <li>Interpret multi-channel fluorescence images</li>
               </ul>
             </div>
           )
         },
         {
           title: 'Fluorescence Theory',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">Fluorescence Staining Principles</h4>
               <p>Fluorescent molecules absorb light at one wavelength (excitation) and emit light at a longer wavelength (emission).</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                 <div className="bg-green-50 p-4 rounded">
                   <h5 className="font-semibold text-green-800">Phalloidin-Alexa 488</h5>
                   <ul className="text-sm space-y-1">
                     <li>• Target: F-actin filaments</li>
                     <li>• Excitation: 495nm (blue light)</li>
                     <li>• Emission: 519nm (green light)</li>
                     <li>• Shows cytoskeleton structure</li>
                   </ul>
                 </div>
                 <div className="bg-blue-50 p-4 rounded">
                   <h5 className="font-semibold text-blue-800">DAPI</h5>
                   <ul className="text-sm space-y-1">
                     <li>• Target: A-T rich DNA regions</li>
                     <li>• Excitation: 358nm (UV light)</li>
                     <li>• Emission: 461nm (blue light)</li>
                     <li>• Shows cell nuclei</li>
                   </ul>
                 </div>
               </div>
             </div>
           )
         },
         {
           title: 'Sample Preparation',
           content: (
             <div className="space-y-4">
               <h4 className="font-semibold text-lg">Cell Preparation Protocol</h4>
               <div className="bg-yellow-50 p-4 rounded">
                 <h5 className="font-semibold text-yellow-800">Key Steps:</h5>
                 <ol className="list-decimal list-inside space-y-2 text-sm">
                   <li><strong>Permeabilization:</strong> Triton X-100 creates membrane pores</li>
                   <li><strong>Blocking:</strong> BSA prevents non-specific binding</li>
                   <li><strong>Primary staining:</strong> Phalloidin binds to actin</li>
                   <li><strong>Nuclear staining:</strong> DAPI binds to DNA</li>
                   <li><strong>Imaging:</strong> Multi-channel fluorescence microscopy</li>
                 </ol>
               </div>
               <div className="bg-red-50 p-4 rounded mt-4">
                 <h5 className="font-semibold text-red-800">⚠️ Important Notes:</h5>
                 <ul className="list-disc list-inside text-sm space-y-1">
                   <li>Protect fluorescent samples from light to prevent photobleaching</li>
                   <li>Work quickly once fluorescent stains are applied</li>
                   <li>Use proper filter sets for each fluorophore</li>
                   <li>Store stained samples at 4°C if not imaging immediately</li>
                 </ul>
               </div>
             </div>
           )
         }
       ]
     }
   };
