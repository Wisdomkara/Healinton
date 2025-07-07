// Monthly meal plans with variety for each day (30 days)
const generateMonthlyMealPlan = (illness: string) => {
  const baseMeals = {
    cancer: {
      morning: [
        { low: "Oatmeal with banana and honey, green tea", high: "Quinoa bowl with berries, nuts, and Greek yogurt" },
        { low: "Whole grain toast with avocado", high: "Chia pudding with almonds and blueberries" },
        { low: "Banana smoothie with spinach", high: "Protein bowl with quinoa and mixed berries" },
        { low: "Steel-cut oats with cinnamon", high: "Greek yogurt parfait with granola and fruits" },
        { low: "Green tea with whole grain crackers", high: "Antioxidant smoothie bowl with superfoods" },
        { low: "Herbal tea with banana bread", high: "Overnight oats with chia seeds and berries" },
        { low: "Apple slices with almond butter", high: "Acai bowl with nuts and coconut" },
        { low: "Chamomile tea with oatmeal", high: "Power smoothie with kale and pineapple" },
        { low: "Whole grain cereal with milk", high: "Quinoa breakfast bowl with fruits" },
        { low: "Ginger tea with toast", high: "Nutrient-dense smoothie with spirulina" }
      ],
      afternoon: [
        { low: "Grilled chicken breast with steamed vegetables", high: "Salmon with quinoa and roasted vegetables" },
        { low: "Baked fish with brown rice", high: "Lean turkey with sweet potato and asparagus" },
        { low: "Tofu stir-fry with vegetables", high: "Grilled lean beef with quinoa salad" },
        { low: "Chicken soup with vegetables", high: "Baked cod with roasted root vegetables" },
        { low: "Lentil curry with rice", high: "Herb-crusted salmon with wild rice" },
        { low: "Vegetable pasta with chicken", high: "Grass-fed beef with cauliflower mash" },
        { low: "Quinoa salad with grilled chicken", high: "Pan-seared fish with Mediterranean vegetables" },
        { low: "Brown rice bowl with vegetables", high: "Lean pork tenderloin with roasted vegetables" },
        { low: "Chicken breast with steamed broccoli", high: "Wild salmon with quinoa and green beans" },
        { low: "Vegetable stir-fry with tofu", high: "Organic chicken with roasted sweet potato" }
      ],
      night: [
        { low: "Vegetable soup with whole grain bread", high: "Lean turkey with sweet potato and green salad" },
        { low: "Herbal tea with light crackers", high: "Grilled chicken with cauliflower rice" },
        { low: "Warm milk with honey", high: "Fish with steamed vegetables and quinoa" },
        { low: "Chamomile tea with banana", high: "Turkey meatballs with zucchini noodles" },
        { low: "Vegetable broth with toast", high: "Baked chicken with roasted vegetables" },
        { low: "Green tea with rice cakes", high: "Lean beef with mashed cauliflower" },
        { low: "Ginger tea with crackers", high: "Fish soup with whole grain roll" },
        { low: "Herbal soup with vegetables", high: "Grilled turkey with steamed greens" },
        { low: "Warm almond milk with oats", high: "Chicken breast with roasted root vegetables" },
        { low: "Vegetable tea with light snack", high: "Baked fish with quinoa and herbs" }
      ]
    },
    hypertension: {
      morning: [
        { low: "Banana with peanut butter, low-sodium crackers", high: "Greek yogurt with berries and almonds" },
        { low: "Oatmeal with cinnamon", high: "Smoothie bowl with low-sodium nuts" },
        { low: "Apple with unsalted almonds", high: "Quinoa porridge with fresh fruits" },
        { low: "Herbal tea with whole grain toast", high: "Chia seed pudding with berries" },
        { low: "Low-sodium cereal with milk", high: "Antioxidant smoothie with spinach" },
        { low: "Banana smoothie", high: "Greek yogurt parfait with granola" },
        { low: "Whole grain crackers with avocado", high: "Power bowl with quinoa and fruits" },
        { low: "Green tea with banana", high: "Overnight oats with nuts and berries" },
        { low: "Unsalted nuts with apple", high: "Acai bowl with coconut and almonds" },
        { low: "Herbal tea with oatmeal", high: "Protein smoothie with kale and mango" }
      ],
      afternoon: [
        { low: "Grilled chicken with steamed vegetables", high: "Baked fish with quinoa and roasted vegetables" },
        { low: "Brown rice with lean protein", high: "Salmon with sweet potato and asparagus" },
        { low: "Vegetable soup with chicken", high: "Herb-crusted fish with wild rice" },
        { low: "Quinoa salad with vegetables", high: "Lean turkey with roasted root vegetables" },
        { low: "Steamed fish with brown rice", high: "Grilled chicken with Mediterranean vegetables" },
        { low: "Lentil stew with vegetables", high: "Baked cod with quinoa and green beans" },
        { low: "Chicken breast with steamed broccoli", high: "Wild salmon with cauliflower rice" },
        { low: "Vegetable curry with rice", high: "Lean beef with roasted vegetables" },
        { low: "Tofu stir-fry with vegetables", high: "Organic chicken with sweet potato" },
        { low: "Fish with steamed vegetables", high: "Turkey with quinoa and roasted peppers" }
      ],
      night: [
        { low: "Vegetable soup with herbs", high: "Lean pork with mashed cauliflower and greens" },
        { low: "Herbal tea with light dinner", high: "Grilled fish with steamed vegetables" },
        { low: "Low-sodium broth with vegetables", high: "Chicken breast with quinoa" },
        { low: "Green tea with crackers", high: "Turkey meatballs with zucchini" },
        { low: "Vegetable soup", high: "Baked fish with roasted vegetables" },
        { low: "Herbal tea with banana", high: "Lean chicken with cauliflower mash" },
        { low: "Warm milk with honey", high: "Fish soup with whole grain roll" },
        { low: "Chamomile tea with oats", high: "Grilled turkey with steamed greens" },
        { low: "Vegetable broth", high: "Chicken with roasted root vegetables" },
        { low: "Ginger tea with light snack", high: "Baked cod with quinoa and herbs" }
      ]
    }
  };

  // Generate 30 days by cycling through the base meals with variations
  const monthlyPlan: any = {};
  
  for (let day = 1; day <= 30; day++) {
    const baseIndex = (day - 1) % 10; // Cycle through 10 base meals
    
    monthlyPlan[day] = {
      morning: baseMeals[illness as keyof typeof baseMeals]?.morning[baseIndex] || baseMeals.hypertension.morning[baseIndex],
      afternoon: baseMeals[illness as keyof typeof baseMeals]?.afternoon[baseIndex] || baseMeals.hypertension.afternoon[baseIndex],
      night: baseMeals[illness as keyof typeof baseMeals]?.night[baseIndex] || baseMeals.hypertension.night[baseIndex]
    };
  }
  
  return monthlyPlan;
};

export const getMonthlyMealPlan = (illness: string) => {
  return generateMonthlyMealPlan(illness);
};

export const getDailyMealPlan = (illness: string, day: number) => {
  const monthlyPlan = generateMonthlyMealPlan(illness);
  return monthlyPlan[day] || monthlyPlan[1];
};