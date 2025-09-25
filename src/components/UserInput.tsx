import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
  Button,
  Tooltip,
  Grid,
  Chip,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { PlayArrow, Info } from '@mui/icons-material';
import { LCAInputs } from '../types/lca';

interface UserInputProps {
  inputs: LCAInputs;
  onChange: (inputs: LCAInputs) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const metalPresets = {
  aluminum: {
    primaryEmissionFactor: 11.5,
    recycledEmissionFactor: 0.7,
  },
  copper: {
    primaryEmissionFactor: 4.2,
    recycledEmissionFactor: 0.6,
  },
};

const UserInput: React.FC<UserInputProps> = ({ inputs, onChange, onSubmit, isLoading }) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateInputs = () => {
    const errors: Record<string, string> = {};
    
    if (inputs.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }
    
    if (inputs.transportDistance <= 0) {
      errors.transportDistance = 'Distance must be greater than 0';
    }
    
    if (inputs.customEmissionFactor !== null && inputs.customEmissionFactor < 0) {
      errors.customEmissionFactor = 'Emission factor cannot be negative';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validateInputs();
  }, [inputs]);

  const handleInputChange = (field: keyof LCAInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    onChange(newInputs);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      onSubmit();
    }
  };

  const getEmissionFactorPreset = () => {
    const preset = metalPresets[inputs.metal];
    return inputs.materialSource === 'primary' 
      ? preset.primaryEmissionFactor 
      : preset.recycledEmissionFactor;
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Metal Selection */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Metal Type</InputLabel>
            <Select
              value={inputs.metal}
              label="Metal Type"
              onChange={(e) => handleInputChange('metal', e.target.value)}
            >
              <MenuItem value="aluminum">Aluminum</MenuItem>
              <MenuItem value="copper">Copper</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Material Source */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Material Source</InputLabel>
            <Select
              value={inputs.materialSource}
              label="Material Source"
              onChange={(e) => handleInputChange('materialSource', e.target.value)}
            >
              <MenuItem value="primary">
                Primary (Virgin) 
                <Chip size="small" label="Higher Impact" color="error" sx={{ ml: 1 }} />
              </MenuItem>
              <MenuItem value="recycled">
                Recycled 
                <Chip size="small" label="Lower Impact" color="success" sx={{ ml: 1 }} />
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Energy Source */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Energy Source</InputLabel>
            <Select
              value={inputs.energySource}
              label="Energy Source"
              onChange={(e) => handleInputChange('energySource', e.target.value)}
            >
              <MenuItem value="coal">Coal</MenuItem>
              <MenuItem value="grid-mix">Grid Mix</MenuItem>
              <MenuItem value="renewables">
                Renewables 
                <Chip size="small" label="Clean" color="success" sx={{ ml: 1 }} />
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Transport Mode */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Transport Mode</InputLabel>
            <Select
              value={inputs.transportMode}
              label="Transport Mode"
              onChange={(e) => handleInputChange('transportMode', e.target.value)}
            >
              <MenuItem value="truck">Truck</MenuItem>
              <MenuItem value="rail">Rail</MenuItem>
              <MenuItem value="ship">Ship</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Transport Distance */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Transport Distance"
            value={inputs.transportDistance}
            onChange={(e) => handleInputChange('transportDistance', parseFloat(e.target.value) || 0)}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
            error={!!validationErrors.transportDistance}
            helperText={validationErrors.transportDistance}
          />
        </Grid>

        {/* End of Life */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>End-of-Life Option</InputLabel>
            <Select
              value={inputs.endOfLife}
              label="End-of-Life Option"
              onChange={(e) => handleInputChange('endOfLife', e.target.value)}
            >
              <MenuItem value="landfill">
                Landfill 
                <Chip size="small" label="Waste" color="error" sx={{ ml: 1 }} />
              </MenuItem>
              <MenuItem value="recycling">
                Recycling 
                <Chip size="small" label="Circular" color="success" sx={{ ml: 1 }} />
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Quantity */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Quantity: {inputs.quantity} kg
          </Typography>
          <Slider
            value={inputs.quantity}
            onChange={(_, value) => handleInputChange('quantity', value as number)}
            min={100}
            max={10000}
            step={100}
            marks={[
              { value: 100, label: '100kg' },
              { value: 5000, label: '5t' },
              { value: 10000, label: '10t' },
            ]}
            valueLabelDisplay="auto"
          />
        </Grid>

        {/* Custom Emission Factor */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Custom Emission Factor
            </Typography>
            <Tooltip title={`Default for ${inputs.metal} (${inputs.materialSource}): ${getEmissionFactorPreset()} kg CO₂/kg`}>
              <Info fontSize="small" color="action" />
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            type="number"
            placeholder={`Default: ${getEmissionFactorPreset()}`}
            value={inputs.customEmissionFactor || ''}
            onChange={(e) => handleInputChange('customEmissionFactor', e.target.value ? parseFloat(e.target.value) : null)}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg CO₂/kg</InputAdornment>,
            }}
            error={!!validationErrors.customEmissionFactor}
            helperText={validationErrors.customEmissionFactor}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={isLoading || Object.keys(validationErrors).length > 0}
            startIcon={isLoading ? <CircularProgress size={20} /> : <PlayArrow />}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? 'Running LCA Analysis...' : 'Run LCA Analysis'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInput;