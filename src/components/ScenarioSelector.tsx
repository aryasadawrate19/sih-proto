import React from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Chip,
} from '@mui/material';
import Recycling from '@mui/icons-material/Recycling';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Scenario } from '../types/lca';

interface ScenarioSelectorProps {
  activeScenario: Scenario;
  onChange: (scenario: Scenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ activeScenario, onChange }) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newScenario: Scenario) => {
    if (newScenario !== null) {
      onChange(newScenario);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
        Scenario Analysis
      </Typography>
      
      <ToggleButtonGroup
        value={activeScenario}
        exclusive
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <ToggleButton value="linear" sx={{ py: 2 }}>
          <Box textAlign="center">
            <Typography variant="subtitle2">Linear Economy</Typography>
            <Typography variant="caption" color="text.secondary">
              Take → Make → Dispose
            </Typography>
          </Box>
        </ToggleButton>
        <ToggleButton value="circular" sx={{ py: 2 }}>
          <Box textAlign="center">
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Recycling sx={{ mr: 0.5, fontSize: 16 }} />
              Circular Economy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Reduce → Reuse → Recycle
            </Typography>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Scenario Description */}
      <Paper elevation={1} sx={{ p: 2, bgcolor: activeScenario === 'circular' ? 'success.light' : 'grey.50' }}>
        {activeScenario === 'linear' ? (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Linear Economy Model
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Traditional approach with minimal recycling and high resource consumption.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip size="small" label="High CO₂" color="error" variant="outlined" />
              <Chip size="small" label="Resource Intensive" color="warning" variant="outlined" />
              <Chip size="small" label="More Waste" color="error" variant="outlined" />
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Circular Economy Model
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Sustainable approach maximizing recycling, reuse, and resource efficiency.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip size="small" label="Low CO₂" color="success" variant="outlined" />
              <Chip size="small" label="Resource Efficient" color="success" variant="outlined" />
              <Chip size="small" label="Minimal Waste" color="success" variant="outlined" />
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ScenarioSelector;