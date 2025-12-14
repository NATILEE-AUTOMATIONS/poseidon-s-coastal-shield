import React from 'react';

interface LayerProps {
  progress: number;
  startProgress: number;
  endProgress: number;
}

// Material info for step cards
export const materialInfo = [
  { id: 'decking', name: 'Replace Decking', description: 'Replace any damaged plywood or decking' },
  { id: 'drip-eaves', name: 'Drip Edge (Eaves)', description: 'Install drip edge at the eaves' },
  { id: 'ice-water', name: 'Ice & Water Shield', description: 'Apply ice & water shield membrane' },
  { id: 'underlayment', name: 'Underlayment', description: 'Install underlayment over decking' },
  { id: 'drip-rakes', name: 'Drip Edge (Rakes)', description: 'Install drip edge at rakes' },
  { id: 'starter', name: 'Starter Strip', description: 'Install starter strip shingles' },
  { id: 'shingles', name: 'Shingles', description: 'Install field shingles' },
  { id: 'vents', name: 'Pipe Boots & Vents', description: 'Install pipe boots & vents' },
  { id: 'flashing', name: 'Flashing', description: 'Install all flashing' },
  { id: 'ridge', name: 'Ridge Vent & Cap', description: 'Install ridge vent and ridge cap' },
];

// All roof layer animations have been removed - returning empty groups
// Keep exports for compatibility with RoofBuildSection

export const DeckingLayer: React.FC<LayerProps> = () => null;
export const DripEdgeEavesLayer: React.FC<LayerProps> = () => null;
export const DripEdgeRakesLayer: React.FC<LayerProps> = () => null;
export const IceWaterShieldLayer: React.FC<LayerProps> = () => null;
export const UnderlaymentLayer: React.FC<LayerProps> = () => null;
export const StarterStripLayer: React.FC<LayerProps> = () => null;
export const FlashingLayer: React.FC<LayerProps> = () => null;
export const ShinglesLayer: React.FC<LayerProps> = () => null;
export const FieldShinglesLayer: React.FC<LayerProps> = () => null;
export const VentsLayer: React.FC<LayerProps> = () => null;
export const RidgeCapLayer: React.FC<LayerProps> = () => null;
