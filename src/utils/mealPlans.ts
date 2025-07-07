
// Comprehensive meal plans for all supported illness types
const mealPlans = {
  cancer: {
    morning: {
      low: "Oatmeal with banana and honey, green tea",
      high: "Quinoa bowl with berries, nuts, and Greek yogurt"
    },
    afternoon: {
      low: "Grilled chicken breast with steamed vegetables",
      high: "Salmon with quinoa and roasted vegetables"
    },
    night: {
      low: "Vegetable soup with whole grain bread",
      high: "Lean turkey with sweet potato and green salad"
    }
  },
  diabetes_type_1: {
    morning: {
      low: "Whole grain toast with avocado, unsweetened tea",
      high: "Protein smoothie with spinach, berries, and almond milk"
    },
    afternoon: {
      low: "Grilled fish with brown rice and vegetables",
      high: "Lean beef with quinoa and steamed broccoli"
    },
    night: {
      low: "Vegetable stir-fry with tofu",
      high: "Grilled chicken with cauliflower rice and asparagus"
    }
  },
  diabetes_type_2: {
    morning: {
      low: "Steel-cut oats with cinnamon, herbal tea",
      high: "Egg omelet with vegetables and whole grain toast"
    },
    afternoon: {
      low: "Baked chicken with sweet potato",
      high: "Grilled salmon with brown rice and green beans"
    },
    night: {
      low: "Lentil soup with mixed greens",
      high: "Turkey meatballs with zucchini noodles"
    }
  },
  hypertension: {
    morning: {
      low: "Banana with peanut butter, low-sodium crackers",
      high: "Greek yogurt with berries and almonds"
    },
    afternoon: {
      low: "Grilled chicken with steamed vegetables",
      high: "Baked fish with quinoa and roasted vegetables"
    },
    night: {
      low: "Vegetable soup with herbs",
      high: "Lean pork with mashed cauliflower and greens"
    }
  },
  chronic_kidney_disease: {
    morning: {
      low: "White bread with jam, apple slices",
      high: "Egg whites with low-potassium vegetables"
    },
    afternoon: {
      low: "Small portion of lean meat with white rice",
      high: "Fresh fish with pasta and low-potassium vegetables"
    },
    night: {
      low: "Vegetable broth with crackers",
      high: "Chicken breast with cauliflower and carrots"
    }
  },
  heart_disease: {
    morning: {
      low: "Oatmeal with berries, herbal tea",
      high: "Whole grain cereal with nuts and low-fat milk"
    },
    afternoon: {
      low: "Baked fish with steamed vegetables",
      high: "Grilled salmon with brown rice and asparagus"
    },
    night: {
      low: "Vegetable soup with whole grain roll",
      high: "Lean turkey with quinoa and mixed vegetables"
    }
  },
  hiv_aids: {
    morning: {
      low: "Fortified cereal with milk, banana",
      high: "Protein shake with fruits and yogurt"
    },
    afternoon: {
      low: "Chicken soup with vegetables and rice",
      high: "Grilled meat with potatoes and green vegetables"
    },
    night: {
      low: "Pasta with tomato sauce and vegetables",
      high: "Fish with rice and steamed broccoli"
    }
  },
  copd: {
    morning: {
      low: "Soft scrambled eggs with toast",
      high: "Protein smoothie with berries and spinach"
    },
    afternoon: {
      low: "Tender chicken with mashed potatoes",
      high: "Baked fish with quinoa and soft vegetables"
    },
    night: {
      low: "Vegetable puree soup with crackers",
      high: "Lean meat with sweet potato and steamed carrots"
    }
  },
  asthma: {
    morning: {
      low: "Whole grain cereal with milk, apple",
      high: "Greek yogurt with honey and anti-inflammatory fruits"
    },
    afternoon: {
      low: "Grilled chicken with rice and vegetables",
      high: "Salmon with quinoa and leafy greens"
    },
    night: {
      low: "Vegetable soup with whole grain bread",
      high: "Turkey with brown rice and steamed vegetables"
    }
  },
  epilepsy: {
    morning: {
      low: "High-fat yogurt with nuts",
      high: "Ketogenic smoothie with avocado and MCT oil"
    },
    afternoon: {
      low: "Fatty fish with low-carb vegetables",
      high: "Grass-fed beef with avocado and leafy greens"
    },
    night: {
      low: "Egg salad with olive oil dressing",
      high: "Coconut oil cooked chicken with cauliflower"
    }
  },
  multiple_sclerosis: {
    morning: {
      low: "Anti-inflammatory smoothie with berries",
      high: "Omega-3 rich breakfast with salmon and eggs"
    },
    afternoon: {
      low: "Grilled fish with steamed vegetables",
      high: "Lean meat with quinoa and anti-inflammatory spices"
    },
    night: {
      low: "Vegetable soup with turmeric",
      high: "Turkey with sweet potato and green vegetables"
    }
  },
  liver_cirrhosis: {
    morning: {
      low: "Low-sodium oatmeal with fruits",
      high: "Protein-rich smoothie with plant-based milk"
    },
    afternoon: {
      low: "Small portion lean meat with vegetables",
      high: "Fish with rice and low-sodium seasonings"
    },
    night: {
      low: "Vegetable broth with soft vegetables",
      high: "Chicken breast with pasta and herbs"
    }
  },
  parkinsons_disease: {
    morning: {
      low: "Soft foods: oatmeal with mashed banana",
      high: "Protein shake with easy-to-swallow consistency"
    },
    afternoon: {
      low: "Tender chicken with mashed vegetables",
      high: "Soft fish with pureed sweet potato"
    },
    night: {
      low: "Smooth soup with soft bread",
      high: "Ground meat with soft pasta and sauce"
    }
  },
  stroke: {
    morning: {
      low: "Soft scrambled eggs with mashed banana",
      high: "Thick smoothie with protein and fruits"
    },
    afternoon: {
      low: "Minced chicken with soft vegetables",
      high: "Pureed fish with mashed potatoes"
    },
    night: {
      low: "Thick vegetable soup",
      high: "Soft meat with pureed vegetables"
    }
  },
  sickle_cell_disease: {
    morning: {
      low: "Iron-rich cereal with milk and fruits",
      high: "Fortified smoothie with spinach and berries"
    },
    afternoon: {
      low: "Lean red meat with vegetables",
      high: "Iron-rich fish with quinoa and leafy greens"
    },
    night: {
      low: "Lentil soup with whole grain bread",
      high: "Chicken liver with rice and vegetables"
    }
  },
  lupus: {
    morning: {
      low: "Anti-inflammatory oatmeal with berries",
      high: "Calcium-rich smoothie with leafy greens"
    },
    afternoon: {
      low: "Fatty fish with steamed vegetables",
      high: "Lean meat with anti-inflammatory spices and quinoa"
    },
    night: {
      low: "Vegetable soup with turmeric",
      high: "Turkey with brown rice and anti-inflammatory herbs"
    }
  },
  rheumatoid_arthritis: {
    morning: {
      low: "Omega-3 rich breakfast with walnuts",
      high: "Anti-inflammatory smoothie with ginger and berries"
    },
    afternoon: {
      low: "Fatty fish with vegetables",
      high: "Lean meat with anti-inflammatory spices and quinoa"
    },
    night: {
      low: "Turmeric vegetable soup",
      high: "Salmon with sweet potato and leafy greens"
    }
  },
  crohns_disease: {
    morning: {
      low: "White toast with banana, herbal tea",
      high: "Low-fiber smoothie with protein powder"
    },
    afternoon: {
      low: "Well-cooked chicken with white rice",
      high: "Tender fish with pasta and mild seasonings"
    },
    night: {
      low: "Clear broth with soft vegetables",
      high: "Lean meat with mashed potatoes and carrots"
    }
  },
  tuberculosis: {
    morning: {
      low: "High-calorie porridge with milk and honey",
      high: "Protein-rich smoothie with nuts and fruits"
    },
    afternoon: {
      low: "Nutrient-dense soup with meat and vegetables",
      high: "High-protein fish with rice and vegetables"
    },
    night: {
      low: "Fortified milk with whole grain crackers",
      high: "Lean meat with potatoes and nutrient-rich vegetables"
    }
  },
  alzheimers_disease: {
    morning: {
      low: "Brain-healthy oatmeal with blueberries",
      high: "Omega-3 rich smoothie with walnuts and berries"
    },
    afternoon: {
      low: "Fatty fish with vegetables",
      high: "Lean meat with brain-healthy vegetables and olive oil"
    },
    night: {
      low: "Vegetable soup with herbs",
      high: "Salmon with quinoa and leafy greens"
    }
  },
  cystic_fibrosis: {
    morning: {
      low: "High-calorie pancakes with syrup",
      high: "Calorie-dense smoothie with protein and healthy fats"
    },
    afternoon: {
      low: "Fatty meat with high-calorie sides",
      high: "Rich fish with butter and high-calorie vegetables"
    },
    night: {
      low: "Creamy soup with high-fat content",
      high: "High-calorie meat dish with rich sauces"
    }
  }
};

const healthTips = {
  cancer: [
    "Stay hydrated with plenty of water throughout the day",
    "Eat small, frequent meals to maintain energy",
    "Include antioxidant-rich foods like berries and leafy greens",
    "Avoid processed and sugary foods",
    "Get adequate rest and manage stress"
  ],
  diabetes_type_1: [
    "Monitor blood glucose levels regularly",
    "Count carbohydrates in every meal",
    "Take insulin as prescribed by your doctor",
    "Exercise regularly but monitor blood sugar before and after",
    "Always carry glucose tablets for low blood sugar episodes"
  ],
  diabetes_type_2: [
    "Maintain a consistent meal schedule",
    "Choose complex carbohydrates over simple sugars",
    "Exercise for at least 30 minutes daily",
    "Monitor your blood pressure regularly",
    "Take medications as prescribed"
  ],
  hypertension: [
    "Limit sodium intake to less than 2,300mg daily",
    "Exercise regularly to strengthen your heart",
    "Maintain a healthy weight",
    "Limit alcohol consumption",
    "Manage stress through relaxation techniques"
  ],
  chronic_kidney_disease: [
    "Limit protein intake as advised by your doctor",
    "Monitor potassium and phosphorus intake",
    "Stay hydrated but follow fluid restrictions if prescribed",
    "Take medications exactly as prescribed",
    "Regular monitoring of kidney function is essential"
  ],
  heart_disease: [
    "Follow a heart-healthy diet low in saturated fats",
    "Exercise regularly as approved by your cardiologist",
    "Take prescribed medications consistently",
    "Monitor blood pressure and cholesterol levels",
    "Avoid smoking and limit alcohol intake"
  ],
  hiv_aids: [
    "Take antiretroviral medications exactly as prescribed",
    "Maintain good nutrition to support immune system",
    "Practice safe behaviors to prevent transmission",
    "Get regular medical check-ups and lab tests",
    "Stay up-to-date with vaccinations"
  ],
  copd: [
    "Avoid smoking and secondhand smoke completely",
    "Use prescribed inhalers correctly",
    "Practice breathing exercises daily",
    "Stay active with appropriate exercise",
    "Get annual flu shots and pneumonia vaccines"
  ],
  asthma: [
    "Identify and avoid your asthma triggers",
    "Use your rescue inhaler as prescribed",
    "Take controller medications daily if prescribed",
    "Monitor peak flow readings regularly",
    "Have an asthma action plan ready"
  ],
  epilepsy: [
    "Take anti-seizure medications consistently",
    "Get adequate sleep every night",
    "Avoid known seizure triggers",
    "Wear medical identification jewelry",
    "Keep a seizure diary to track patterns"
  ],
  multiple_sclerosis: [
    "Take disease-modifying therapies as prescribed",
    "Stay active with appropriate exercise",
    "Manage fatigue with proper rest",
    "Avoid overheating in hot weather",
    "Join support groups for emotional support"
  ],
  liver_cirrhosis: [
    "Avoid alcohol completely",
    "Follow a low-sodium diet",
    "Take prescribed medications carefully",
    "Monitor for signs of complications",
    "Get regular medical monitoring"
  ],
  parkinsons_disease: [
    "Take medications at consistent times",
    "Stay physically active with appropriate exercises",
    "Work with speech and physical therapists",
    "Make home safety modifications",
    "Join Parkinson's support groups"
  ],
  stroke: [
    "Take blood thinners as prescribed",
    "Control blood pressure strictly",
    "Attend rehabilitation therapy sessions",
    "Make home safety modifications",
    "Recognize signs of another stroke"
  ],
  sickle_cell_disease: [
    "Stay well-hydrated at all times",
    "Avoid extreme temperatures",
    "Take folic acid supplements daily",
    "Get regular medical check-ups",
    "Recognize early signs of pain crises"
  ],
  lupus: [
    "Protect skin from sun exposure",
    "Take medications as prescribed",
    "Get regular exercise but pace yourself",
    "Manage stress effectively",
    "Get adequate sleep every night"
  ],
  rheumatoid_arthritis: [
    "Take disease-modifying drugs as prescribed",
    "Exercise regularly to maintain joint mobility",
    "Apply heat or cold for pain relief",
    "Protect joints during daily activities",
    "Get regular monitoring for medication side effects"
  ],
  crohns_disease: [
    "Follow prescribed dietary restrictions",
    "Take medications consistently",
    "Monitor for signs of flare-ups",
    "Stay hydrated and maintain nutrition",
    "Manage stress effectively"
  ],
  tuberculosis: [
    "Complete the full course of antibiotics",
    "Maintain good nutrition for healing",
    "Cover mouth when coughing or sneezing",
    "Get regular medical follow-ups",
    "Inform close contacts about your diagnosis"
  ],
  alzheimers_disease: [
    "Maintain a consistent daily routine",
    "Stay socially active and engaged",
    "Exercise regularly for brain health",
    "Eat a brain-healthy diet",
    "Keep the environment safe and familiar"
  ],
  cystic_fibrosis: [
    "Take enzyme supplements with meals",
    "Do airway clearance techniques daily",
    "Exercise regularly to maintain lung function",
    "Take prescribed medications consistently",
    "Get regular pulmonary function tests"
  ]
};

export const getMealPlanForIllness = (illness: string) => {
  return mealPlans[illness as keyof typeof mealPlans] || mealPlans.hypertension;
};

export const getHealthTipsForIllness = (illness: string) => {
  return healthTips[illness as keyof typeof healthTips] || healthTips.hypertension;
};
