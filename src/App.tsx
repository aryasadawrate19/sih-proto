import React, { useState, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Grid, Paper, Toolbar, Typography, AppBar } from '@mui/material';
import Eco from '@mui/icons-material/Eco';
import Science from '@mui/icons-material/Science';
import UserInput from './components/UserInput';
import ScenarioSelector from './components/ScenarioSelector';
import SankeyVisualization from './components/SankeyVisualization';
import KPIBoard from './components/KPIBoard';
import ReportGenerator from './components/ReportGenerator';
import { LCAInputs, LCAResults, Scenario } from './types/lca';
import { mockLCAResults } from './data/mockData';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green for sustainability
    },
    secondary: {
      main: '#1976d2', // Blue for technology
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [inputs, setInputs] = useState<LCAInputs>({
    metal: 'aluminum',
    materialSource: 'primary',
    energySource: 'grid-mix',
    transportMode: 'truck',
    transportDistance: 500,
    endOfLife: 'recycling',
    quantity: 1000,
    customEmissionFactor: null,
  });

  const [activeScenario, setActiveScenario] = useState<Scenario>('linear');
  const [results, setResults] = useState<LCAResults>(mockLCAResults);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((newInputs: LCAInputs) => {
    setInputs(newInputs);
    // Simulate API call delay
    setIsLoading(true);
    setTimeout(() => {
      // In real implementation, this would be an API call
      const updatedResults = { ...mockLCAResults };
      // Update results based on inputs (simplified for demo)
      if (newInputs.materialSource === 'recycled') {
        updatedResults.co2Footprint *= 0.7;
        updatedResults.energyUse *= 0.65;
        updatedResults.recycledContent = 95;
      }
      if (newInputs.energySource === 'renewables') {
        updatedResults.co2Footprint *= 0.3;
        updatedResults.energyUse *= 0.9;
      }
      setResults(updatedResults);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleScenarioChange = useCallback((scenario: Scenario) => {
    setActiveScenario(scenario);
    // Update results based on scenario
    const updatedResults = { ...results };
    if (scenario === 'circular') {
      updatedResults.recycledContent = Math.min(95, updatedResults.recycledContent + 20);
      updatedResults.co2Footprint *= 0.8;
    }
    setResults(updatedResults);
  }, [results]);

  const runLCA = async () => {
    setIsLoading(true);
    try {
      // In real implementation, make POST request to /run_lca
      // const response = await fetch('/run_lca', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...inputs, scenario: activeScenario }),
      // });
      // const data = await response.json();
      // setResults(data);
      
      // For demo, use mock data
      setTimeout(() => {
        setResults(mockLCAResults);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error running LCA:', error);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Science sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AI-Driven LCA Platform for Metals
            </Typography>
            <Eco sx={{ ml: 2 }} />
          </Toolbar>
        </AppBar>
        
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} sx={{ minHeight: 'calc(100vh - 120px)' }}>
            {/* Left Panel - Inputs and Controls */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={2} sx={{ p: 3, mb: 3, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Science sx={{ mr: 1, color: 'primary.main' }} />
                  Input Parameters
                </Typography>
                <UserInput 
                  inputs={inputs} 
                  onChange={handleInputChange}
                  onSubmit={runLCA}
                  isLoading={isLoading}
                />
              </Paper>
              
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <ScenarioSelector 
                  activeScenario={activeScenario} 
                  onChange={handleScenarioChange}
                />
              </Paper>

              <Paper elevation={2} sx={{ p: 3 }}>
                <ReportGenerator 
                  inputs={inputs}
                  results={results}
                  scenario={activeScenario}
                />
              </Paper>
            </Grid>
            
            {/* Right Panel - Visualizations */}
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Eco sx={{ mr: 1, color: 'primary.main' }} />
                      Material & Energy Flow Diagram
                    </Typography>
                    <SankeyVisualization 
                      inputs={inputs} 
                      scenario={activeScenario}
                      isLoading={isLoading}
                    />
                  </Paper>
                </Grid>
                
                <Grid item xs={12}>
                  <KPIBoard results={results} isLoading={isLoading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;