export const getMealPlanForIllness = (illnessType: string) => {
  const mealPlans = {
    stress: {
      morning: {
        low: 'Green tea with whole grain toast and avocado (₦280)',
        high: 'Matcha smoothie bowl with blueberries and almonds (₦750)'
      },
      afternoon: {
        low: 'Salmon salad with leafy greens (₦550)',
        high: 'Grilled salmon with quinoa and steamed vegetables (₦1200)'
      },
      night: {
        low: 'Chamomile tea with light vegetable soup (₦300)',
        high: 'Herb-crusted chicken with sweet potato and asparagus (₦900)'
      }
    },
    depression: {
      morning: {
        low: 'Oatmeal with walnuts and banana (₦250)',
        high: 'Omega-3 rich smoothie with spinach, berries, and chia seeds (₦800)'
      },
      afternoon: {
        low: 'Grilled fish with dark leafy greens (₦500)',
        high: 'Wild salmon with quinoa and roasted vegetables (₦1300)'
      },
      night: {
        low: 'Turkey and vegetable soup (₦350)',
        high: 'Lean turkey breast with sweet potato and broccoli (₦950)'
      }
    },
    anxiety_disorders: {
      morning: {
        low: 'Herbal tea with whole grain cereal (₦200)',
        high: 'Magnesium-rich smoothie with spinach and banana (₦700)'
      },
      afternoon: {
        low: 'Grilled chicken with steamed vegetables (₦450)',
        high: 'Chicken breast with brown rice and green beans (₦1000)'
      },
      night: {
        low: 'Chamomile tea with light salad (₦250)',
        high: 'Baked cod with roasted vegetables and herbs (₦850)'
      }
    },
    bipolar_disorder: {
      morning: {
        low: 'Stable blood sugar breakfast with eggs and toast (₦280)',
        high: 'Protein-rich smoothie with complex carbs (₦750)'
      },
      afternoon: {
        low: 'Balanced meal with lean protein and vegetables (₦500)',
        high: 'Grilled fish with quinoa and colorful vegetables (₦1200)'
      },
      night: {
        low: 'Light dinner with herbal tea (₦300)',
        high: 'Balanced protein meal with calming herbs (₦900)'
      }
    },
    ptsd: {
      morning: {
        low: 'Calming breakfast with oats and berries (₦250)',
        high: 'Nutrient-dense smoothie with adaptogens (₦800)'
      },
      afternoon: {
        low: 'Grounding meal with root vegetables and protein (₦480)',
        high: 'Wild salmon with grounding root vegetables (₦1150)'
      },
      night: {
        low: 'Soothing herbal tea with light meal (₦320)',
        high: 'Calming dinner with magnesium-rich foods (₦880)'
      }
    },
    multiple_sclerosis: {
      morning: {
        low: 'Anti-inflammatory oatmeal with berries (₦270)',
        high: 'Omega-3 rich smoothie with anti-inflammatory spices (₦780)'
      },
      afternoon: {
        low: 'Fatty fish with anti-inflammatory vegetables (₦520)',
        high: 'Wild salmon with turmeric and leafy greens (₦1250)'
      },
      night: {
        low: 'Anti-inflammatory tea with light meal (₦350)',
        high: 'Mediterranean-style dinner with olive oil (₦920)'
      }
    },
    epilepsy: {
      morning: {
        low: 'Stable energy breakfast with complex carbs (₦260)',
        high: 'Ketogenic-friendly meal with healthy fats (₦800)'
      },
      afternoon: {
        low: 'Balanced meal with moderate carbs (₦480)',
        high: 'High-fat, low-carb meal with quality proteins (₦1100)'
      },
      night: {
        low: 'Light dinner with stable nutrients (₦300)',
        high: 'Ketogenic dinner with MCT oil and vegetables (₦900)'
      }
    },
    lupus: {
      morning: {
        low: 'Anti-inflammatory breakfast with omega-3s (₦280)',
        high: 'Immune-supporting smoothie with antioxidants (₦750)'
      },
      afternoon: {
        low: 'Anti-inflammatory fish with vegetables (₦500)',
        high: 'Wild-caught fish with anti-inflammatory spices (₦1200)'
      },
      night: {
        low: 'Soothing herbal tea with light meal (₦320)',
        high: 'Anti-inflammatory dinner with turmeric (₦880)'
      }
    },
    parkinsons_disease: {
      morning: {
        low: 'Protein-timed breakfast away from meds (₦250)',
        high: 'Antioxidant-rich smoothie with berries (₦800)'
      },
      afternoon: {
        low: 'Lean protein with vegetables (₦450)',
        high: 'Antioxidant-rich meal with colorful vegetables (₦1050)'
      },
      night: {
        low: 'Light dinner with antioxidants (₦300)',
        high: 'Brain-healthy dinner with omega-3s (₦850)'
      }
    },
    obesity: {
      morning: {
        low: 'High-fiber, low-calorie breakfast (₦200)',
        high: 'Protein-rich, filling smoothie bowl (₦600)'
      },
      afternoon: {
        low: 'Lean protein with vegetables (₦400)',
        high: 'Balanced meal with portion control (₦800)'
      },
      night: {
        low: 'Light, low-calorie dinner (₦250)',
        high: 'Protein-rich dinner with vegetables (₦650)'
      }
    },
    chronic_pain: {
      morning: {
        low: 'Anti-inflammatory turmeric porridge (₦250)',
        high: 'Pain-reducing smoothie with cherries and ginger (₦750)'
      },
      afternoon: {
        low: 'Omega-3 fish with anti-inflammatory vegetables (₦480)',
        high: 'Wild salmon with turmeric and leafy greens (₦1100)'
      },
      night: {
        low: 'Anti-inflammatory tea with light meal (₦300)',
        high: 'Comprehensive anti-inflammatory dinner (₦900)'
      }
    },
    sleep_disorders: {
      morning: {
        low: 'Energy-boosting breakfast with B vitamins (₦230)',
        high: 'Circadian-supporting smoothie with nutrients (₦700)'
      },
      afternoon: {
        low: 'Balanced meal with sleep-supporting nutrients (₦450)',
        high: 'Magnesium-rich meal with quality proteins (₦1000)'
      },
      night: {
        low: 'Sleep-promoting herbal tea with tryptophan foods (₦280)',
        high: 'Melatonin-supporting dinner with cherries (₦800)'
      }
    },
    migraine: {
      morning: {
        low: 'Trigger-free breakfast with magnesium (₦240)',
        high: 'Migraine-preventing smoothie with riboflavin (₦720)'
      },
      afternoon: {
        low: 'Non-trigger meal with steady blood sugar (₦460)',
        high: 'Migraine-preventing meal with CoQ10 (₦1050)'
      },
      night: {
        low: 'Calming herbal tea with light meal (₦290)',
        high: 'Magnesium-rich dinner with prevention nutrients (₦850)'
      }
    },
    ibs: {
      morning: {
        low: 'Low-FODMAP breakfast with soluble fiber (₦260)',
        high: 'Gut-friendly smoothie with prebiotics (₦750)'
      },
      afternoon: {
        low: 'IBS-friendly meal with digestible proteins (₦480)',
        high: 'Low-FODMAP meal with gut-healing nutrients (₦1100)'
      },
      night: {
        low: 'Gentle herbal tea with easy-to-digest food (₦300)',
        high: 'Gut-soothing dinner with anti-inflammatory foods (₦880)'
      }
    },
    pcos: {
      morning: {
        low: 'Low-glycemic breakfast with protein (₦270)',
        high: 'Hormone-balancing smoothie with healthy fats (₦780)'
      },
      afternoon: {
        low: 'Anti-inflammatory meal with lean protein (₦500)',
        high: 'PCOS-friendly meal with omega-3s and antioxidants (₦1200)'
      },
      night: {
        low: 'Hormone-supporting herbal tea with light meal (₦320)',
        high: 'Insulin-friendly dinner with fiber and protein (₦900)'
      }
    },
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
    }
  };

  return mealPlans[illnessType as keyof typeof mealPlans] || mealPlans.stress;
};

export const getHealthTipsForIllness = (illnessType: string) => {
  const tips = {
    stress: [
      'Practice deep breathing exercises for 10 minutes daily to reduce stress hormones.',
      'Include magnesium-rich foods like dark chocolate and leafy greens in your diet.',
      'Maintain a regular sleep schedule and aim for 7-9 hours of quality sleep.'
    ],
    depression: [
      'Include omega-3 rich foods like fish, walnuts, and flaxseeds to support brain health.',
      'Expose yourself to natural sunlight for at least 15-20 minutes daily.',
      'Stay connected with friends and family, and consider joining support groups.'
    ],
    anxiety_disorders: [
      'Practice mindfulness meditation and deep breathing exercises regularly.',
      'Limit caffeine intake as it can worsen anxiety symptoms.',
      'Engage in regular physical exercise to reduce anxiety and improve mood.'
    ],
    bipolar_disorder: [
      'Maintain a consistent daily routine to help stabilize mood cycles.',
      'Take medications exactly as prescribed and never stop abruptly.',
      'Keep a mood diary to track patterns and identify triggers.'
    ],
    ptsd: [
      'Work with a qualified mental health professional for trauma therapy.',
      'Practice grounding techniques when experiencing flashbacks or triggers.',
      'Build a strong support network of trusted friends and family.'
    ],
    multiple_sclerosis: [
      'Stay active with low-impact exercises like swimming or yoga.',
      'Manage stress through relaxation techniques and adequate rest.',
      'Follow a Mediterranean-style diet rich in anti-inflammatory foods.'
    ],
    epilepsy: [
      'Take seizure medications consistently and never skip doses.',
      'Get adequate sleep and maintain a regular sleep schedule.',
      'Identify and avoid personal seizure triggers like flashing lights.'
    ],
    lupus: [
      'Protect yourself from sun exposure with sunscreen and protective clothing.',
      'Get regular check-ups to monitor disease activity and organ function.',
      'Include anti-inflammatory foods and avoid processed foods.'
    ],
    parkinsons_disease: [
      'Stay physically active with exercises that improve balance and coordination.',
      'Time protein intake appropriately with medication schedules.',
      'Include antioxidant-rich foods like berries and leafy greens.'
    ],
    obesity: [
      'Focus on portion control and eat slowly to recognize fullness cues.',
      'Incorporate more fiber-rich foods to help you feel satisfied longer.',
      'Aim for at least 150 minutes of moderate exercise per week.'
    ],
    chronic_pain: [
      'Stay as active as possible within your pain limits.',
      'Include anti-inflammatory foods like turmeric, ginger, and fatty fish.',
      'Practice relaxation techniques to help manage pain and stress.'
    ],
    sleep_disorders: [
      'Create a consistent bedtime routine and sleep schedule.',
      'Avoid screens and bright lights 1-2 hours before bedtime.',
      'Keep your bedroom cool, dark, and quiet for optimal sleep.'
    ],
    migraine: [
      'Identify and avoid personal migraine triggers like certain foods or stress.',
      'Maintain regular meal times and avoid skipping meals.',
      'Stay hydrated and consider magnesium and riboflavin supplements.'
    ],
    ibs: [
      'Keep a food diary to identify trigger foods and symptoms.',
      'Try a low-FODMAP diet under guidance of a healthcare provider.',
      'Manage stress through relaxation techniques and regular exercise.'
    ],
    pcos: [
      'Maintain a healthy weight through diet and regular exercise.',
      'Choose low-glycemic foods to help manage insulin levels.',
      'Include anti-inflammatory foods and omega-3 fatty acids.'
    ],
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
    ]
  };

  return tips[illnessType as keyof typeof tips] || tips.stress;
};
