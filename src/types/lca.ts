export interface LCAInputs {
  metal: 'aluminum' | 'copper';
  materialSource: 'primary' | 'recycled';
  energySource: 'coal' | 'grid-mix' | 'renewables';
  transportMode: 'truck' | 'rail' | 'ship';
  transportDistance: number; // km
  endOfLife: 'landfill' | 'recycling';
  quantity: number; // kg
  customEmissionFactor: number | null; // kg CO2/kg metal
}

export interface LCAResults {
  co2Footprint: number; // kg CO2 eq
  energyUse: number; // MJ
  recycledContent: number; // percentage
  waterUse: number; // liters
  wasteGenerated: number; // kg
  circularityScore: number; // 0-100
}

export type Scenario = 'linear' | 'circular';

export interface SankeyNode {
  id: string;
  label: string;
  color: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}