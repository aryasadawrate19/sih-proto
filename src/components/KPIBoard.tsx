import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Skeleton,
} from '@mui/material';
import Co2 from '@mui/icons-material/Co2';
import Bolt from '@mui/icons-material/Bolt';
import Recycling from '@mui/icons-material/Recycling';
import WaterDrop from '@mui/icons-material/WaterDrop';
import Delete from '@mui/icons-material/Delete';
import Eco from '@mui/icons-material/Eco';
import { LCAResults } from '../types/lca';

interface KPIBoardProps {
  results: LCAResults;
  isLoading: boolean;
}

interface KPICardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  benchmark?: number;
  isPercentage?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  color, 
  benchmark, 
  isPercentage = false 
}) => {
  const getBenchmarkStatus = () => {
    if (!benchmark) return null;
    const ratio = value / benchmark;
    if (ratio < 0.7) return { label: 'Excellent', color: 'success' as const };
    if (ratio < 1.0) return { label: 'Good', color: 'primary' as const };
    if (ratio < 1.3) return { label: 'Fair', color: 'warning' as const };
    return { label: 'Poor', color: 'error' as const };
  };

  const benchmarkStatus = getBenchmarkStatus();

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background icon */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          opacity: 0.1,
          transform: 'scale(2)',
          color: `${color}.main`,
        }}
      >
        {icon}
      </Box>
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h4" color={`${color}.main`} sx={{ fontWeight: 'bold' }}>
            {value.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {unit}
          </Typography>
        </Box>
        
        {isPercentage && (
          <LinearProgress
            variant="determinate"
            value={Math.min(value, 100)}
            color={color}
            sx={{ mb: 1, height: 6, borderRadius: 3 }}
          />
        )}
        
        {benchmarkStatus && (
          <Chip
            size="small"
            label={benchmarkStatus.label}
            color={benchmarkStatus.color}
            variant="outlined"
          />
        )}
        
        {benchmark && !isPercentage && (
          <Typography variant="caption" color="text.secondary" display="block">
            Target: {benchmark.toFixed(1)} {unit}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

const KPIBoard: React.FC<KPIBoardProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 2, height: 140 }}>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={6} sx={{ mt: 1 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <KPICard
          title="CO₂ Footprint"
          value={results.co2Footprint}
          unit="kg CO₂ eq"
          icon={<Co2 />}
          color="error"
          benchmark={15.0}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <KPICard
          title="Energy Use"
          value={results.energyUse}
          unit="MJ"
          icon={<Bolt />}
          color="warning"
          benchmark={200.0}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <KPICard
          title="Recycled Content"
          value={results.recycledContent}
          unit="%"
          icon={<Recycling />}
          color="success"
          isPercentage
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <KPICard
          title="Water Use"
          value={results.waterUse}
          unit="liters"
          icon={<WaterDrop />}
          color="primary"
          benchmark={1000.0}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <KPICard
          title="Waste Generated"
          value={results.wasteGenerated}
          unit="kg"
          icon={<Delete />}
          color="error"
          benchmark={30.0}
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <KPICard
          title="Circularity Score"
          value={results.circularityScore}
          unit="/100"
          icon={<Eco />}
          color="success"
          isPercentage
        />
      </Grid>
    </Grid>
  );
};

export default KPIBoard;