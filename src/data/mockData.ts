import { LCAResults, SankeyData } from '../types/lca';

export const mockLCAResults: LCAResults = {
  co2Footprint: 12.5,
  energyUse: 185.3,
  recycledContent: 35,
  waterUse: 850,
  wasteGenerated: 45.2,
  circularityScore: 65,
};

export const mockSankeyDataLinear: SankeyData = {
  nodes: [
    { id: 'raw-materials', label: 'Raw Materials', color: '#8B4513' },
    { id: 'extraction', label: 'Mining/Extraction', color: '#CD853F' },
    { id: 'production', label: 'Metal Production', color: '#4A90E2' },
    { id: 'transport', label: 'Transportation', color: '#F39C12' },
    { id: 'use-phase', label: 'Use Phase', color: '#2ECC71' },
    { id: 'landfill', label: 'Landfill', color: '#95A5A6' },
    { id: 'emissions', label: 'CO₂ Emissions', color: '#E74C3C' },
  ],
  links: [
    { source: 'raw-materials', target: 'extraction', value: 100, color: '#CD853F' },
    { source: 'extraction', target: 'production', value: 85, color: '#4A90E2' },
    { source: 'production', target: 'transport', value: 80, color: '#F39C12' },
    { source: 'transport', target: 'use-phase', value: 75, color: '#2ECC71' },
    { source: 'use-phase', target: 'landfill', value: 70, color: '#95A5A6' },
    { source: 'extraction', target: 'emissions', value: 35, color: '#E74C3C' },
    { source: 'production', target: 'emissions', value: 45, color: '#E74C3C' },
    { source: 'transport', target: 'emissions', value: 15, color: '#E74C3C' },
  ],
};

export const mockSankeyDataCircular: SankeyData = {
  nodes: [
    { id: 'raw-materials', label: 'Raw Materials', color: '#8B4513' },
    { id: 'recycled-input', label: 'Recycled Input', color: '#2ECC71' },
    { id: 'production', label: 'Metal Production', color: '#4A90E2' },
    { id: 'transport', label: 'Transportation', color: '#F39C12' },
    { id: 'use-phase', label: 'Use Phase', color: '#2ECC71' },
    { id: 'recycling', label: 'Recycling', color: '#27AE60' },
    { id: 'landfill', label: 'Landfill', color: '#95A5A6' },
    { id: 'emissions', label: 'CO₂ Emissions', color: '#E74C3C' },
  ],
  links: [
    { source: 'raw-materials', target: 'production', value: 40, color: '#CD853F' },
    { source: 'recycled-input', target: 'production', value: 60, color: '#2ECC71' },
    { source: 'production', target: 'transport', value: 95, color: '#F39C12' },
    { source: 'transport', target: 'use-phase', value: 90, color: '#2ECC71' },
    { source: 'use-phase', target: 'recycling', value: 75, color: '#27AE60' },
    { source: 'recycling', target: 'recycled-input', value: 65, color: '#2ECC71' },
    { source: 'use-phase', target: 'landfill', value: 15, color: '#95A5A6' },
    { source: 'production', target: 'emissions', value: 25, color: '#E74C3C' },
    { source: 'transport', target: 'emissions', value: 8, color: '#E74C3C' },
    { source: 'recycling', target: 'emissions', value: 5, color: '#E74C3C' },
  ],
};