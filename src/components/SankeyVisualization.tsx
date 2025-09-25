import React, { useMemo } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { LCAInputs, Scenario } from '../types/lca';
import { mockSankeyDataLinear, mockSankeyDataCircular } from '../data/mockData';

interface SankeyVisualizationProps {
  inputs: LCAInputs;
  scenario: Scenario;
  isLoading: boolean;
}

// Simple Sankey visualization using SVG (for demo purposes)
const SankeyVisualization: React.FC<SankeyVisualizationProps> = ({ inputs, scenario, isLoading }) => {
  const sankeyData = useMemo(() => {
    return scenario === 'circular' ? mockSankeyDataCircular : mockSankeyDataLinear;
  }, [scenario]);

  if (isLoading) {
    return (
      <Box sx={{ height: 300 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 300, position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 300">
        {/* Background */}
        <rect width="800" height="300" fill="#fafafa" rx="8" />
        
        {/* Title */}
        <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
          {scenario === 'circular' ? 'Circular Economy Flow' : 'Linear Economy Flow'}
        </text>
        
        {scenario === 'linear' ? (
          // Linear Flow Visualization
          <>
            {/* Nodes */}
            <rect x="50" y="80" width="80" height="40" fill="#CD853F" rx="5" />
            <text x="90" y="105" textAnchor="middle" fontSize="10" fill="white">Raw Materials</text>
            
            <rect x="180" y="80" width="80" height="40" fill="#4A90E2" rx="5" />
            <text x="220" y="105" textAnchor="middle" fontSize="10" fill="white">Production</text>
            
            <rect x="310" y="80" width="80" height="40" fill="#2ECC71" rx="5" />
            <text x="350" y="105" textAnchor="middle" fontSize="10" fill="white">Use Phase</text>
            
            <rect x="440" y="80" width="80" height="40" fill="#95A5A6" rx="5" />
            <text x="480" y="105" textAnchor="middle" fontSize="10" fill="white">Landfill</text>
            
            <rect x="570" y="170" width="80" height="40" fill="#E74C3C" rx="5" />
            <text x="610" y="195" textAnchor="middle" fontSize="10" fill="white">CO₂ Emissions</text>
            
            {/* Flows */}
            <path d="M 130 100 L 180 100" stroke="#666" strokeWidth="8" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 260 100 L 310 100" stroke="#666" strokeWidth="8" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 390 100 L 440 100" stroke="#666" strokeWidth="8" fill="none" markerEnd="url(#arrowhead)" />
            
            {/* Emission flows */}
            <path d="M 220 120 Q 350 140 610 170" stroke="#E74C3C" strokeWidth="4" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 350 120 Q 450 140 610 170" stroke="#E74C3C" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
          </>
        ) : (
          // Circular Flow Visualization
          <>
            {/* Nodes */}
            <rect x="50" y="60" width="70" height="30" fill="#CD853F" rx="5" />
            <text x="85" y="80" textAnchor="middle" fontSize="9" fill="white">Raw Materials</text>
            
            <rect x="50" y="120" width="70" height="30" fill="#2ECC71" rx="5" />
            <text x="85" y="140" textAnchor="middle" fontSize="9" fill="white">Recycled Input</text>
            
            <rect x="180" y="90" width="70" height="30" fill="#4A90E2" rx="5" />
            <text x="215" y="110" textAnchor="middle" fontSize="9" fill="white">Production</text>
            
            <rect x="310" y="90" width="70" height="30" fill="#2ECC71" rx="5" />
            <text x="345" y="110" textAnchor="middle" fontSize="9" fill="white">Use Phase</text>
            
            <rect x="440" y="60" width="70" height="30" fill="#27AE60" rx="5" />
            <text x="475" y="80" textAnchor="middle" fontSize="9" fill="white">Recycling</text>
            
            <rect x="440" y="120" width="70" height="30" fill="#95A5A6" rx="5" />
            <text x="475" y="140" textAnchor="middle" fontSize="9" fill="white">Landfill</text>
            
            <rect x="570" y="200" width="70" height="30" fill="#E74C3C" rx="5" />
            <text x="605" y="220" textAnchor="middle" fontSize="9" fill="white">CO₂ Emissions</text>
            
            {/* Flows */}
            <path d="M 120 75 L 180 95" stroke="#CD853F" strokeWidth="4" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 120 135 L 180 115" stroke="#2ECC71" strokeWidth="6" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 250 105 L 310 105" stroke="#4A90E2" strokeWidth="8" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 380 105 L 440 85" stroke="#27AE60" strokeWidth="6" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 380 115 L 440 135" stroke="#95A5A6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            
            {/* Circular flow */}
            <path d="M 475 90 Q 400 40 200 40 Q 100 40 85 120" stroke="#2ECC71" strokeWidth="5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
            
            {/* Emission flows */}
            <path d="M 215 120 Q 350 160 605 200" stroke="#E74C3C" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
          </>
        )}
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>
      </svg>
      
      {/* Legend */}
      <Box sx={{ position: 'absolute', bottom: 0, right: 0, p: 1 }}>
        <Typography variant="caption" display="block">
          <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>●</span> Recycled Materials
        </Typography>
        <Typography variant="caption" display="block">
          <span style={{ color: '#95A5A6', fontWeight: 'bold' }}>●</span> Waste Streams
        </Typography>
        <Typography variant="caption" display="block">
          <span style={{ color: '#E74C3C', fontWeight: 'bold' }}>●</span> CO₂ Emissions
        </Typography>
      </Box>
    </Box>
  );
};

export default SankeyVisualization;