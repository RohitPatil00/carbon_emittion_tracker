import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  ArrowRight, 
  Car, 
  Home, 
  Utensils, 
  Users,
  ChevronRight,
  TreePine,
  Wind
} from 'lucide-react';
import { calculateCarbonFootprint } from './utils/carbonCalculations';

interface PageProps {
  onGetStarted?: () => void;
  onSubmit?: () => void;
  onViewSuggestions?: () => void;
  onViewLeaderboard?: () => void;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [footprintData, setFootprintData] = useState<any>(null);

  const handleCalculation = (data: any) => {
    const result = calculateCarbonFootprint(data);
    setFootprintData(result);
    setCurrentPage('results');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => setCurrentPage('input')} />;
      case 'input':
        return <ActivityInput onSubmit={handleCalculation} />;
      case 'results':
        return <Results data={footprintData} onViewSuggestions={() => setCurrentPage('suggestions')} />;
      case 'suggestions':
        return <Suggestions onViewLeaderboard={() => setCurrentPage('leaderboard')} />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-semibold text-gray-800">EcoTracker</span>
            </motion.div>
            <div className="flex space-x-4 text-sm">
              {['home', 'input', 'leaderboard'].map((page) => (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="text-gray-600 hover:text-green-500 px-3 py-2 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {renderPage()}
      </motion.div>
    </div>
  );
}

function HomePage({ onGetStarted }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Calculate Your Carbon Footprint
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Understand your environmental impact and discover ways to live more sustainably.
          Small changes can make a big difference for our planet.
        </p>
        <motion.button
          onClick={onGetStarted}
          className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-neo-sm hover:shadow-neo transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Car className="h-8 w-8 text-green-500" />,
            title: "Transportation",
            description: "Track your daily commute and travel habits"
          },
          {
            icon: <Home className="h-8 w-8 text-green-500" />,
            title: "Home Energy",
            description: "Measure your household energy consumption"
          },
          {
            icon: <Utensils className="h-8 w-8 text-green-500" />,
            title: "Diet & Lifestyle",
            description: "Analyze your food choices and daily habits"
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      className="glass-card rounded-xl p-6 card-3d"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function ActivityInput({ onSubmit }: PageProps) {
  const [formData, setFormData] = useState({
    transport: {
      distance: 0,
      mode: 'car_petrol'
    },
    energy: {
      electricity: 0,
      heatingType: 'natural_gas'
    },
    diet: {
      type: 'meat_daily',
      foodWaste: 0
    }
  });

  const handleChange = (category: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Track Your Activities</h2>
        <div className="glass-card rounded-xl p-8 space-y-8">
          {[
            {
              title: "Transportation",
              fields: [
                {
                  label: "Daily Commute Distance (km)",
                  type: "number",
                  value: formData.transport.distance,
                  onChange: (value: number) => handleChange('transport', 'distance', value)
                },
                {
                  label: "Mode of Transport",
                  type: "select",
                  value: formData.transport.mode,
                  onChange: (value: string) => handleChange('transport', 'mode', value),
                  options: [
                    { value: "car_petrol", label: "Car (Petrol)" },
                    { value: "car_electric", label: "Car (Electric)" },
                    { value: "public_transport", label: "Public Transport" },
                    { value: "bicycle", label: "Bicycle" },
                    { value: "walking", label: "Walking" }
                  ]
                }
              ]
            },
            {
              title: "Home Energy",
              fields: [
                {
                  label: "Monthly Electricity Usage (kWh)",
                  type: "number",
                  value: formData.energy.electricity,
                  onChange: (value: number) => handleChange('energy', 'electricity', value)
                },
                {
                  label: "Heating Type",
                  type: "select",
                  value: formData.energy.heatingType,
                  onChange: (value: string) => handleChange('energy', 'heatingType', value),
                  options: [
                    { value: "natural_gas", label: "Natural Gas" },
                    { value: "electric", label: "Electric" },
                    { value: "oil", label: "Oil" },
                    { value: "renewable", label: "Renewable" }
                  ]
                }
              ]
            },
            {
              title: "Diet & Lifestyle",
              fields: [
                {
                  label: "Diet Type",
                  type: "select",
                  value: formData.diet.type,
                  onChange: (value: string) => handleChange('diet', 'type', value),
                  options: [
                    { value: "meat_daily", label: "Meat Daily" },
                    { value: "meat_weekly", label: "Meat Weekly" },
                    { value: "vegetarian", label: "Vegetarian" },
                    { value: "vegan", label: "Vegan" }
                  ]
                },
                {
                  label: "Food Waste (kg per week)",
                  type: "number",
                  value: formData.diet.foodWaste,
                  onChange: (value: number) => handleChange('diet', 'foodWaste', value)
                }
              ]
            }
          ].map((section, index) => (
            <motion.div
              key={section.title}
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.button
            onClick={handleSubmit}
            className="w-full mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-neo-sm hover:shadow-neo transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Calculate My Footprint
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

interface ResultsProps extends PageProps {
  data?: {
    total: number;
    breakdown: {
      transport: number;
      energy: number;
      diet: number;
    };
  };
}

function Results({ data, onViewSuggestions }: ResultsProps) {
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Carbon Footprint
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Emissions</h3>
          <div className="text-4xl font-bold text-green-500 mb-2">{data.total}</div>
          <div className="text-gray-600">tonnes CO₂e per year</div>
          <div className="mt-4 text-sm text-gray-500">
            {data.total < 5 ? "Below" : "Above"} average for your region
          </div>
        </motion.div>

        <motion.div 
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Breakdown</h3>
          <div className="space-y-4">
            {[
              { icon: Car, color: 'blue', value: data.breakdown.transport },
              { icon: Home, color: 'yellow', value: data.breakdown.energy },
              { icon: Utensils, color: 'purple', value: data.breakdown.diet }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className={`h-5 w-5 text-${item.color}-500 mr-2`} />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-2 bg-${item.color}-500 rounded-full progress-bar-glow`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
                <span className="ml-2 text-gray-600">{item.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Impact Score</h3>
          <div className="relative h-32 w-32 mx-auto eco-score">
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-green-500">
                {data.total < 2 ? 'A' : data.total < 4 ? 'B' : data.total < 6 ? 'C' : 'D'}
              </div>
            </motion.div>
            <svg className="transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <motion.path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 - (data.total / 10) }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={onViewSuggestions}
        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-neo-sm hover:shadow-neo transition-all inline-flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        View Recommendations
        <ChevronRight className="ml-2 h-5 w-5" />
      </motion.button>
    </div>
  );
}

function Suggestions({ onViewLeaderboard }: PageProps) {
  const suggestions = [
    {
      icon: <Car className="h-6 w-6 text-blue-500" />,
      title: "Switch to Electric Vehicle",
      description: "Consider switching to an electric vehicle to reduce emissions by up to 50%",
      impact: "High Impact"
    },
    {
      icon: <TreePine className="h-6 w-6 text-green-500" />,
      title: "Plant Trees",
      description: "Participate in local tree planting initiatives or donate to reforestation projects",
      impact: "Medium Impact"
    },
    {
      icon: <Wind className="h-6 w-6 text-teal-500" />,
      title: "Renewable Energy",
      description: "Switch to a renewable energy provider for your home electricity",
      impact: "High Impact"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Eco-Friendly Recommendations
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            className="glass-card rounded-xl p-6 card-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center mb-4">
              {suggestion.icon}
              <h3 className="ml-3 text-lg font-semibold text-gray-800">{suggestion.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{suggestion.description}</p>
            <div className="text-sm font-medium text-green-500">{suggestion.impact}</div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onViewLeaderboard}
        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-neo-sm hover:shadow-neo transition-all inline-flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        View Community Leaderboard
        <Users className="ml-2 h-5 w-5" />
      </motion.button>
    </div>
  );
}

function Leaderboard() {
  const users = [
    { name: "Sarah Johnson", score: 2.1, rank: 1 },
    { name: "Michael Chen", score: 2.4, rank: 2 },
    { name: "Emma Wilson", score: 2.8, rank: 3 },
    { name: "David Kim", score: 3.2, rank: 4 },
    { name: "Lisa Garcia", score: 3.5, rank: 5 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Community Leaderboard
      </motion.h2>
      <motion.div 
        className="glass-card rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon Footprint</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-200">
            {users.map((user) => (
              <motion.tr 
                key={user.rank} 
                className="hover:bg-gray-50/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: user.rank * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{user.rank}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.score} tonnes CO₂e</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Eco-Warrior
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default App;