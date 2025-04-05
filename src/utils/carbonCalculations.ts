// Carbon footprint calculation factors based on scientific research
// Sources: EPA, IPCC, and various environmental studies

interface TransportEmissions {
  [key: string]: number;
  car_petrol: number;
  car_electric: number;
  public_transport: number;
  bicycle: number;
  walking: number;
}

interface HeatingEmissions {
  [key: string]: number;
  natural_gas: number;
  electric: number;
  oil: number;
  renewable: number;
}

interface DietEmissions {
  [key: string]: number;
  meat_daily: number;
  meat_weekly: number;
  vegetarian: number;
  vegan: number;
}

// Emissions factors in kg CO2e
export const TRANSPORT_EMISSIONS: TransportEmissions = {
  car_petrol: 0.192, // kg CO2e per km
  car_electric: 0.053, // kg CO2e per km
  public_transport: 0.041, // kg CO2e per km
  bicycle: 0,
  walking: 0
};

export const ELECTRICITY_EMISSIONS = 0.233; // kg CO2e per kWh

export const HEATING_EMISSIONS: HeatingEmissions = {
  natural_gas: 0.198, // kg CO2e per kWh
  electric: 0.233, // kg CO2e per kWh
  oil: 0.268, // kg CO2e per kWh
  renewable: 0.025 // kg CO2e per kWh
};

export const DIET_EMISSIONS: DietEmissions = {
  meat_daily: 2.5, // tonnes CO2e per year
  meat_weekly: 1.7, // tonnes CO2e per year
  vegetarian: 1.4, // tonnes CO2e per year
  vegan: 1.1 // tonnes CO2e per year
};

export const FOOD_WASTE_EMISSIONS = 2.5; // kg CO2e per kg waste

interface ActivityData {
  transport: {
    distance: number;
    mode: keyof TransportEmissions;
  };
  energy: {
    electricity: number;
    heatingType: keyof HeatingEmissions;
  };
  diet: {
    type: keyof DietEmissions;
    foodWaste: number;
  };
}

export function calculateCarbonFootprint(data: ActivityData): {
  total: number;
  breakdown: {
    transport: number;
    energy: number;
    diet: number;
  };
} {
  // Transport emissions (daily commute to yearly)
  const transportEmissions = 
    data.transport.distance * 
    TRANSPORT_EMISSIONS[data.transport.mode] * 
    365 / 1000; // Convert to tonnes

  // Energy emissions
  const electricityEmissions = 
    (data.energy.electricity * ELECTRICITY_EMISSIONS * 12) / 1000; // Convert to tonnes
  const heatingEmissions = 
    (data.energy.electricity * HEATING_EMISSIONS[data.energy.heatingType] * 12) / 1000;
  const totalEnergyEmissions = electricityEmissions + heatingEmissions;

  // Diet emissions
  const dietEmissions = DIET_EMISSIONS[data.diet.type];
  const wasteEmissions = (data.diet.foodWaste * FOOD_WASTE_EMISSIONS * 52) / 1000; // Convert to tonnes
  const totalDietEmissions = dietEmissions + wasteEmissions;

  const total = transportEmissions + totalEnergyEmissions + totalDietEmissions;

  return {
    total: Number(total.toFixed(2)),
    breakdown: {
      transport: Number(((transportEmissions / total) * 100).toFixed(0)),
      energy: Number(((totalEnergyEmissions / total) * 100).toFixed(0)),
      diet: Number(((totalDietEmissions / total) * 100).toFixed(0))
    }
  };
}