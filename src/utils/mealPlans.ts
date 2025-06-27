
export const getMealPlanForIllness = (illnessType: string) => {
  const mealPlans = {
    hypertension: {
      morning: {
        low: 'Oatmeal with banana and cinnamon (₦250)',
        high: 'Quinoa bowl with berries, nuts and honey (₦800)'
      },
      afternoon: {
        low: 'Grilled fish with steamed vegetables (₦500)',
        high: 'Salmon with asparagus and brown rice (₦1200)'
      },
      night: {
        low: 'Vegetable soup with whole grain bread (₦300)',
        high: 'Herb-crusted chicken with sweet potato (₦900)'
      }
    },
    diabetes: {
      morning: {
        low: 'Boiled eggs with whole wheat toast (₦250)',
        high: 'Greek yogurt with mixed nuts and chia seeds (₦700)'
      },
      afternoon: {
        low: 'Grilled chicken salad with leafy greens (₦600)',
        high: 'Turkey and avocado salad with quinoa (₦1000)'
      },
      night: {
        low: 'Lentil soup with vegetables (₦350)',
        high: 'Baked cod with cauliflower rice (₦1100)'
      }
    },
    heart_disease: {
      morning: {
        low: 'Whole grain cereal with low-fat milk (₦200)',
        high: 'Smoothie bowl with spinach, berries and flaxseed (₦750)'
      },
      afternoon: {
        low: 'Tuna salad with mixed vegetables (₦400)',
        high: 'Grilled mackerel with Mediterranean vegetables (₦1300)'
      },
      night: {
        low: 'Bean stew with brown rice (₦300)',
        high: 'Herb-crusted salmon with roasted vegetables (₦950)'
      }
    },
    obesity: {
      morning: {
        low: 'Green tea with whole grain toast (₦150)',
        high: 'Protein smoothie with spinach and berries (₦600)'
      },
      afternoon: {
        low: 'Grilled vegetables with lean chicken (₦450)',
        high: 'Quinoa salad with grilled chicken and avocado (₦850)'
      },
      night: {
        low: 'Vegetable broth with steamed vegetables (₦200)',
        high: 'Baked fish with roasted Brussels sprouts (₦700)'
      }
    },
    high_cholesterol: {
      morning: {
        low: 'Oats with apple and cinnamon (₦180)',
        high: 'Chia seed pudding with fresh berries (₦650)'
      },
      afternoon: {
        low: 'Grilled chicken salad with olive oil dressing (₦500)',
        high: 'Wild rice bowl with salmon and vegetables (₦1100)'
      },
      night: {
        low: 'Steamed vegetables with tofu (₦300)',
        high: 'Herb-baked white fish with quinoa (₦800)'
      }
    },
    asthma: {
      morning: {
        low: 'Banana and honey with whole grain toast (₦200)',
        high: 'Anti-inflammatory smoothie with ginger and turmeric (₦650)'
      },
      afternoon: {
        low: 'Grilled fish with spinach and carrots (₦450)',
        high: 'Omega-3 rich salmon with sweet potato (₦1000)'
      },
      night: {
        low: 'Ginger tea with vegetable soup (₦250)',
        high: 'Turmeric chicken with steamed broccoli (₦850)'
      }
    },
    arthritis: {
      morning: {
        low: 'Anti-inflammatory tea with whole grain cereal (₦220)',
        high: 'Berry smoothie with ginger and turmeric (₦700)'
      },
      afternoon: {
        low: 'Fatty fish with leafy greens (₦500)',
        high: 'Wild-caught salmon with anti-inflammatory spices (₦1200)'
      },
      night: {
        low: 'Turmeric milk with vegetable stew (₦300)',
        high: 'Herb-crusted fish with roasted vegetables (₦900)'
      }
    },
    kidney_disease: {
      morning: {
        low: 'Low-protein cereal with limited dairy (₦180)',
        high: 'Carefully portioned protein smoothie (₦600)'
      },
      afternoon: {
        low: 'Small portion lean protein with vegetables (₦400)',
        high: 'Controlled protein fish with low-potassium vegetables (₦950)'
      },
      night: {
        low: 'Low-sodium vegetable soup (₦250)',
        high: 'Kidney-friendly protein with controlled portions (₦800)'
      }
    },
    liver_disease: {
      morning: {
        low: 'Liver-friendly oatmeal with berries (₦200)',
        high: 'Antioxidant-rich smoothie with leafy greens (₦650)'
      },
      afternoon: {
        low: 'Lean protein with liver-supporting vegetables (₦450)',
        high: 'Detox-supporting salmon with cruciferous vegetables (₦1000)'
      },
      night: {
        low: 'Milk thistle tea with light vegetable soup (₦280)',
        high: 'Liver-supporting herbs with lean protein (₦850)'
      }
    },
    thyroid_disorders: {
      morning: {
        low: 'Iodine-rich seaweed soup with whole grains (₦250)',
        high: 'Thyroid-supporting smoothie with selenium-rich nuts (₦700)'
      },
      afternoon: {
        low: 'Selenium-rich fish with vegetables (₦500)',
        high: 'Brazil nuts and thyroid-supporting fish meal (₦1100)'
      },
      night: {
        low: 'Thyroid-friendly herbal tea with light meal (₦300)',
        high: 'Iodine and selenium balanced dinner (₦900)'
      }
    },
    anxiety_depression: {
      morning: {
        low: 'Mood-boosting oatmeal with walnuts (₦220)',
        high: 'Omega-3 rich smoothie with mood-supporting nutrients (₦750)'
      },
      afternoon: {
        low: 'Brain-healthy fish with leafy greens (₦480)',
        high: 'Mood-supporting salmon with complex carbs (₦1050)'
      },
      night: {
        low: 'Calming herbal tea with tryptophan-rich foods (₦320)',
        high: 'Serotonin-supporting meal with quality proteins (₦880)'
      }
    },
    chronic_pain: {
      morning: {
        low: 'Anti-inflammatory turmeric porridge (₦200)',
        high: 'Pain-reducing smoothie with cherries and ginger (₦680)'
      },
      afternoon: {
        low: 'Omega-3 fish with anti-inflammatory vegetables (₦470)',
        high: 'Pain-fighting salmon with turmeric and vegetables (₦1080)'
      },
      night: {
        low: 'Anti-inflammatory tea with light, healing meal (₦290)',
        high: 'Comprehensive anti-inflammatory dinner (₦870)'
      }
    }
  };

  return mealPlans[illnessType as keyof typeof mealPlans] || mealPlans.hypertension;
};

export const getHealthTipsForIllness = (illnessType: string) => {
  const tips = {
    hypertension: [
      'Limit sodium intake to less than 2,300mg per day for better blood pressure control.',
      'Engage in 30 minutes of moderate exercise daily to help lower blood pressure naturally.',
      'Practice stress-reduction techniques like deep breathing or meditation regularly.'
    ],
    diabetes: [
      'Monitor your blood glucose levels regularly as recommended by your healthcare provider.',
      'Choose complex carbohydrates over simple sugars to maintain stable blood sugar.',
      'Stay hydrated by drinking plenty of water throughout the day.'
    ],
    heart_disease: [
      'Include omega-3 rich foods like fish in your diet at least twice a week.',
      'Avoid trans fats and limit saturated fats to protect your heart health.',
      'Take prescribed medications consistently and never skip doses.'
    ],
    obesity: [
      'Focus on portion control and eat slowly to recognize fullness cues.',
      'Incorporate more fiber-rich foods to help you feel satisfied longer.',
      'Aim for at least 150 minutes of moderate exercise per week.'
    ],
    high_cholesterol: [
      'Include soluble fiber foods like oats and beans to help lower cholesterol.',
      'Choose lean proteins and limit red meat consumption.',
      'Regular check-ups are important to monitor your cholesterol levels.'
    ],
    asthma: [
      'Avoid known triggers like dust, pollen, and strong fragrances.',
      'Keep your rescue inhaler with you at all times.',
      'Consider anti-inflammatory foods like fish, leafy greens, and berries.'
    ],
    arthritis: [
      'Stay active with low-impact exercises like swimming or walking.',
      'Include anti-inflammatory foods like fatty fish, nuts, and colorful vegetables.',
      'Maintain a healthy weight to reduce stress on joints.'
    ],
    kidney_disease: [
      'Monitor your protein intake as recommended by your healthcare provider.',
      'Limit sodium and potassium if advised by your doctor.',
      'Stay hydrated but follow fluid restrictions if prescribed.'
    ],
    liver_disease: [
      'Avoid alcohol completely to prevent further liver damage.',
      'Include antioxidant-rich foods like berries and leafy greens.',
      'Follow your medication regimen strictly and avoid unnecessary medications.'
    ],
    thyroid_disorders: [
      'Take thyroid medications on an empty stomach as prescribed.',
      'Include iodine-rich foods but avoid excessive amounts.',
      'Regular monitoring of thyroid hormone levels is essential.'
    ],
    anxiety_depression: [
      'Maintain a regular sleep schedule of 7-9 hours per night.',
      'Include omega-3 rich foods and complex carbohydrates in your diet.',
      'Practice mindfulness, meditation, or other stress-reduction techniques daily.'
    ],
    chronic_pain: [
      'Stay as active as possible within your pain limits.',
      'Include anti-inflammatory foods like turmeric, ginger, and fatty fish.',
      'Practice relaxation techniques to help manage pain and stress.'
    ]
  };

  return tips[illnessType as keyof typeof tips] || tips.hypertension;
};
