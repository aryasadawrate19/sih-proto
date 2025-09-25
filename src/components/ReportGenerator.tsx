import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  LinearProgress,
} from '@mui/material';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import Download from '@mui/icons-material/Download';
import Share from '@mui/icons-material/Share';
import Assessment from '@mui/icons-material/Assessment';
import Close from '@mui/icons-material/Close';
import { LCAInputs, LCAResults, Scenario } from '../types/lca';

interface ReportGeneratorProps {
  inputs: LCAInputs;
  results: LCAResults;
  scenario: Scenario;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ inputs, results, scenario }) => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportDialogOpen(true);
    }, 2000);
  };

  const handleDownloadPDF = () => {
    // In real implementation, this would call the backend to generate PDF
    console.log('Downloading PDF report...');
    // Mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `LCA_Report_${inputs.metal}_${scenario}_${new Date().getTime()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSustainabilityGrade = () => {
    const score = results.circularityScore;
    if (score >= 80) return { grade: 'A', color: 'success' as const };
    if (score >= 70) return { grade: 'B', color: 'primary' as const };
    if (score >= 60) return { grade: 'C', color: 'warning' as const };
    return { grade: 'D', color: 'error' as const };
  };

  const sustainabilityGrade = getSustainabilityGrade();

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Assessment sx={{ mr: 1, color: 'primary.main' }} />
        Report Generation
      </Typography>
      
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleGenerateReport}
        disabled={isGenerating}
        startIcon={isGenerating ? undefined : <PictureAsPdf />}
        sx={{ mb: 2 }}
      >
        {isGenerating ? (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ mr: 1 }}>Generating Report...</Typography>
            <LinearProgress sx={{ flexGrow: 1, ml: 1 }} />
          </Box>
        ) : (
          'Generate LCA Report'
        )}
      </Button>

      <Typography variant="body2" color="text.secondary">
        Comprehensive report including methodology, assumptions, results, and recommendations.
      </Typography>

      {/* Report Dialog */}
      <Dialog 
        open={reportDialogOpen} 
        onClose={() => setReportDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">LCA Report Preview</Typography>
          <Button
            onClick={() => setReportDialogOpen(false)}
            size="small"
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            <Close />
          </Button>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3}>
            {/* Executive Summary */}
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Executive Summary
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Life Cycle Assessment for {inputs.quantity}kg of {inputs.metal} using {scenario} economy approach
                    with {inputs.materialSource} material source and {inputs.energySource} energy.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="body2">
                      Sustainability Grade:
                    </Typography>
                    <Chip
                      label={`Grade ${sustainabilityGrade.grade}`}
                      color={sustainabilityGrade.color}
                      variant="outlined"
                      size="large"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    This assessment demonstrates the environmental impact across the entire lifecycle,
                    from raw material extraction to end-of-life treatment.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Key Findings */}
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Key Environmental Impacts
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      CO₂ Footprint: <strong>{results.co2Footprint.toFixed(1)} kg CO₂ eq</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Energy Use: <strong>{results.energyUse.toFixed(1)} MJ</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Water Consumption: <strong>{results.waterUse.toFixed(0)} liters</strong>
                    </Typography>
                    <Typography variant="body2">
                      Waste Generated: <strong>{results.wasteGenerated.toFixed(1)} kg</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Circularity Metrics */}
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Circularity Performance
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Recycled Content: <strong>{results.recycledContent}%</strong>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={results.recycledContent}
                      color="success"
                      sx={{ mb: 2, height: 8, borderRadius: 4 }}
                    />
                    
                    <Typography variant="body2" gutterBottom>
                      Circularity Score: <strong>{results.circularityScore}/100</strong>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={results.circularityScore}
                      color="primary"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recommendations */}
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Recommendations
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                    {inputs.materialSource === 'primary' && (
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        Consider increasing recycled content to reduce environmental impact by up to 30%
                      </Typography>
                    )}
                    {inputs.energySource !== 'renewables' && (
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        Transition to renewable energy sources to significantly reduce CO₂ emissions
                      </Typography>
                    )}
                    {inputs.endOfLife === 'landfill' && (
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        Implement end-of-life recycling to support circular economy principles
                      </Typography>
                    )}
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      Optimize transport routes and consider rail/ship transport for longer distances
                    </Typography>
                    <Typography component="li" variant="body2">
                      Monitor and report progress on sustainability metrics quarterly
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button startIcon={<Download />} onClick={handleDownloadPDF} variant="contained">
            Download PDF
          </Button>
          <Button startIcon={<Share />} variant="outlined">
            Share Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportGenerator;