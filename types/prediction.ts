export interface ProjectPrediction {
  successProbability: number;
  riskFactors: string[];
  recommendedActions: string[];
  marketInsights: {
    demandLevel: 'high' | 'medium' | 'low';
    priceRange: {
      min: number;
      max: number;
    };
    competitorInsights: string[];
  };
}

export interface SuccessMetrics {
  completionRate: number;
  clientSatisfaction: number;
  timelineAccuracy: number;
  budgetAdherence: number;
} 