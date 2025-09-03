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
    post_traumatic_stress_disorder: {
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
    alzheimers_disease: {
      morning: {
        low: 'Brain-healthy oatmeal with blueberries (₦250)',
        high: 'Memory-supporting smoothie with nuts and seeds (₦800)'
      },
      afternoon: {
        low: 'Fatty fish with leafy greens (₦500)',
        high: 'Mediterranean-style fish with brain foods (₦1200)'
      },
      night: {
        low: 'Light dinner with antioxidants (₦300)',
        high: 'Cognitive-supporting meal with turmeric (₦900)'
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
    chronic_insomnia: {
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
    sleep_apnea: {
      morning: {
        low: 'Anti-inflammatory breakfast with weight control (₦240)',
        high: 'Heart-healthy smoothie with berries (₦720)'
      },
      afternoon: {
        low: 'Lean protein with vegetables (₦450)',
        high: 'Mediterranean meal with olive oil (₦1000)'
      },
      night: {
        low: 'Light dinner avoiding late eating (₦280)',
        high: 'Early dinner with sleep-promoting foods (₦800)'
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
    chronic_migraines: {
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
    irritable_bowel_syndrome: {
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
    polycystic_ovary_syndrome: {
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
    rheumatoid_arthritis: {
      morning: {
        low: 'Anti-inflammatory oatmeal with berries (₦250)',
        high: 'Omega-3 smoothie with turmeric and ginger (₦750)'
      },
      afternoon: {
        low: 'Grilled fish with colorful vegetables (₦520)',
        high: 'Mediterranean-style fish with olive oil (₦1250)'
      },
      night: {
        low: 'Golden milk with light soup (₦320)',
        high: 'Anti-inflammatory dinner with herbs (₦920)'
      }
    },
    osteoarthritis: {
      morning: {
        low: 'Joint-friendly breakfast with antioxidants (₦240)',
        high: 'Cartilage-supporting smoothie with collagen (₦780)'
      },
      afternoon: {
        low: 'Lean protein with anti-inflammatory vegetables (₦480)',
        high: 'Bone broth meal with nutrient-dense foods (₦1150)'
      },
      night: {
        low: 'Gentle herbal tea with light meal (₦300)',
        high: 'Joint-supporting dinner with omega-3s (₦880)'
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
    chronic_kidney_disease: {
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
    chronic_liver_disease: {
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
    hypothyroidism: {
      morning: {
        low: 'Metabolism-boosting breakfast with iodine (₦260)',
        high: 'Thyroid-supporting smoothie with selenium (₦720)'
      },
      afternoon: {
        low: 'Iodine-rich fish with vegetables (₦500)',
        high: 'Metabolism-supporting meal with nutrients (₦1100)'
      },
      night: {
        low: 'Thyroid-friendly dinner with herbs (₦300)',
        high: 'Hormone-balancing meal with minerals (₦900)'
      }
    },
    hyperthyroidism: {
      morning: {
        low: 'Calming breakfast with limited iodine (₦240)',
        high: 'Cooling smoothie with anti-inflammatory foods (₦700)'
      },
      afternoon: {
        low: 'Balanced meal with calming nutrients (₦480)',
        high: 'Anti-inflammatory fish with soothing vegetables (₦1050)'
      },
      night: {
        low: 'Calming herbal tea with light meal (₦290)',
        high: 'Cooling dinner with stress-reducing foods (₦850)'
      }
    },
    fibromyalgia: {
      morning: {
        low: 'Energy-supporting breakfast with B vitamins (₦250)',
        high: 'Anti-inflammatory smoothie with magnesium (₦750)'
      },
      afternoon: {
        low: 'Gentle protein with easily digestible vegetables (₦480)',
        high: 'Nutrient-dense meal with pain-reducing foods (₦1100)'
      },
      night: {
        low: 'Calming tea with light, anti-inflammatory meal (₦320)',
        high: 'Sleep-promoting dinner with magnesium (₦880)'
      }
    },
    chronic_fatigue_syndrome: {
      morning: {
        low: 'Energy-sustaining breakfast with complex carbs (₦260)',
        high: 'Nutrient-dense smoothie with adaptogens (₦780)'
      },
      afternoon: {
        low: 'Balanced meal with sustained energy foods (₦500)',
        high: 'Mitochondrial-supporting meal with CoQ10 (₦1200)'
      },
      night: {
        low: 'Gentle dinner with sleep-supporting nutrients (₦320)',
        high: 'Recovery-focused meal with antioxidants (₦900)'
      }
    },
    inflammatory_bowel_disease: {
      morning: {
        low: 'Gentle, anti-inflammatory breakfast (₦270)',
        high: 'Gut-healing smoothie with bone broth protein (₦800)'
      },
      afternoon: {
        low: 'Easy-to-digest protein with cooked vegetables (₦500)',
        high: 'Anti-inflammatory meal with omega-3s (₦1200)'
      },
      night: {
        low: 'Soothing herbal tea with simple meal (₦320)',
        high: 'Gut-healing dinner with therapeutic foods (₦900)'
      }
    },
    crohns_disease: {
      morning: {
        low: 'Low-fiber, gentle breakfast (₦250)',
        high: 'Nutrient-dense smoothie with easy absorption (₦750)'
      },
      afternoon: {
        low: 'Well-cooked protein with soft vegetables (₦480)',
        high: 'Anti-inflammatory meal with gut-healing nutrients (₦1150)'
      },
      night: {
        low: 'Gentle herbal tea with simple meal (₦300)',
        high: 'Crohn\'s-friendly dinner with therapeutic foods (₦880)'
      }
    },
    ulcerative_colitis: {
      morning: {
        low: 'Colitis-friendly breakfast with soluble fiber (₦260)',
        high: 'Anti-inflammatory smoothie with healing nutrients (₦770)'
      },
      afternoon: {
        low: 'Gentle protein with cooked vegetables (₦490)',
        high: 'Healing meal with omega-3s and antioxidants (₦1180)'
      },
      night: {
        low: 'Soothing tea with easy-to-digest meal (₦310)',
        high: 'Colitis-healing dinner with therapeutic foods (₦890)'
      }
    },
    celiac_disease: {
      morning: {
        low: 'Gluten-free oats with fruit (₦240)',
        high: 'Gluten-free smoothie bowl with nuts and seeds (₦720)'
      },
      afternoon: {
        low: 'Gluten-free protein with vegetables (₦460)',
        high: 'Celiac-safe meal with quinoa and fish (₦1050)'
      },
      night: {
        low: 'Gluten-free soup with rice (₦290)',
        high: 'Nutritious gluten-free dinner with healing foods (₦850)'
      }
    },
    osteoporosis: {
      morning: {
        low: 'Calcium-rich breakfast with dairy or alternatives (₦250)',
        high: 'Bone-building smoothie with calcium and vitamin D (₦750)'
      },
      afternoon: {
        low: 'Calcium-rich meal with leafy greens (₦480)',
        high: 'Bone-supporting meal with calcium and magnesium (₦1100)'
      },
      night: {
        low: 'Calcium-rich dinner with vitamin K foods (₦320)',
        high: 'Bone-health dinner with comprehensive nutrients (₦900)'
      }
    },
    gout: {
      morning: {
        low: 'Low-purine breakfast with cherries (₦230)',
        high: 'Anti-inflammatory smoothie with tart cherries (₦680)'
      },
      afternoon: {
        low: 'Low-purine protein with vegetables (₦450)',
        high: 'Gout-friendly meal with anti-inflammatory foods (₦1000)'
      },
      night: {
        low: 'Cherry juice with low-purine meal (₦280)',
        high: 'Comprehensive anti-gout dinner (₦820)'
      }
    },
    psoriasis: {
      morning: {
        low: 'Anti-inflammatory breakfast with omega-3s (₦260)',
        high: 'Skin-healing smoothie with antioxidants (₦760)'
      },
      afternoon: {
        low: 'Fatty fish with colorful vegetables (₦500)',
        high: 'Mediterranean-style anti-inflammatory meal (₦1200)'
      },
      night: {
        low: 'Anti-inflammatory tea with light meal (₦310)',
        high: 'Skin-supporting dinner with healing nutrients (₦890)'
      }
    },
    eczema: {
      morning: {
        low: 'Hypoallergenic breakfast with omega-3s (₦250)',
        high: 'Anti-inflammatory smoothie with probiotics (₦740)'
      },
      afternoon: {
        low: 'Non-trigger protein with safe vegetables (₦470)',
        high: 'Eczema-friendly meal with healing nutrients (₦1080)'
      },
      night: {
        low: 'Gentle herbal tea with simple meal (₦300)',
        high: 'Skin-healing dinner with anti-inflammatory foods (₦870)'
      }
    },
    endometriosis: {
      morning: {
        low: 'Hormone-balancing breakfast with fiber (₦270)',
        high: 'Anti-inflammatory smoothie with omega-3s (₦790)'
      },
      afternoon: {
        low: 'Anti-inflammatory protein with vegetables (₦510)',
        high: 'Endometriosis-supporting meal with healing foods (₦1220)'
      },
      night: {
        low: 'Hormone-supporting tea with light meal (₦330)',
        high: 'Anti-inflammatory dinner with therapeutic nutrients (₦910)'
      }
    },
    chronic_obstructive_pulmonary_disease: {
      morning: {
        low: 'Energy-efficient breakfast for breathing (₦240)',
        high: 'Anti-inflammatory smoothie with lung-supporting nutrients (₦720)'
      },
      afternoon: {
        low: 'Easy-to-digest protein with vegetables (₦460)',
        high: 'COPD-friendly meal with antioxidants (₦1040)'
      },
      night: {
        low: 'Light dinner to ease breathing (₦280)',
        high: 'Lung-supporting dinner with anti-inflammatory foods (₦830)'
      }
    },
    cancer: {
      morning: {
        low: 'Immune-boosting breakfast with antioxidants (₦280)',
        high: 'Cancer-fighting smoothie with superfoods (₦820)'
      },
      afternoon: {
        low: 'Nutrient-dense meal with healing foods (₦550)',
        high: 'Comprehensive anti-cancer meal (₦1350)'
      },
      night: {
        low: 'Gentle, nourishing dinner (₦350)',
        high: 'Immune-supporting dinner with therapeutic foods (₦980)'
      }
    },
    stroke: {
      morning: {
        low: 'Brain-healthy breakfast with omega-3s (₦260)',
        high: 'Stroke-recovery smoothie with antioxidants (₦780)'
      },
      afternoon: {
        low: 'Heart-healthy meal with vegetables (₦480)',
        high: 'Brain-supporting meal with healing nutrients (₦1150)'
      },
      night: {
        low: 'Light, heart-healthy dinner (₦310)',
        high: 'Comprehensive stroke-recovery dinner (₦890)'
      }
    },
    attention_deficit_hyperactivity_disorder: {
      morning: {
        low: 'Protein-rich breakfast for focus (₦260)',
        high: 'Brain-supporting smoothie with omega-3s (₦760)'
      },
      afternoon: {
        low: 'Balanced meal with steady energy (₦480)',
        high: 'ADHD-friendly meal with brain nutrients (₦1100)'
      },
      night: {
        low: 'Calming dinner with magnesium (₦300)',
        high: 'Focus-supporting dinner with brain foods (₦870)'
      }
    },
    autism_spectrum_disorder: {
      morning: {
        low: 'Sensory-friendly breakfast with nutrients (₦250)',
        high: 'Brain-supporting smoothie with omega-3s (₦750)'
      },
      afternoon: {
        low: 'Simple, nutritious meal (₦460)',
        high: 'Autism-friendly meal with brain nutrients (₦1080)'
      },
      night: {
        low: 'Calming, simple dinner (₦290)',
        high: 'Neurodevelopment-supporting dinner (₦850)'
      }
    },
    schizophrenia: {
      morning: {
        low: 'Stable breakfast with B vitamins (₦250)',
        high: 'Brain-healthy smoothie with nutrients (₦750)'
      },
      afternoon: {
        low: 'Balanced meal with omega-3s (₦480)',
        high: 'Mental health supporting meal (₦1100)'
      },
      night: {
        low: 'Calming dinner with nutrients (₦300)',
        high: 'Brain-supporting dinner with antioxidants (₦870)'
      }
    },
    obsessive_compulsive_disorder: {
      morning: {
        low: 'Anxiety-reducing breakfast with magnesium (₦240)',
        high: 'OCD-supporting smoothie with calming nutrients (₦720)'
      },
      afternoon: {
        low: 'Balanced meal with omega-3s (₦470)',
        high: 'Mental health meal with therapeutic foods (₦1070)'
      },
      night: {
        low: 'Calming herbal tea with light meal (₦290)',
        high: 'Anxiety-reducing dinner with magnesium (₦850)'
      }
    },
    eating_disorders: {
      morning: {
        low: 'Gentle, nourishing breakfast (₦250)',
        high: 'Recovery-supporting smoothie with nutrients (₦750)'
      },
      afternoon: {
        low: 'Balanced, healing meal (₦480)',
        high: 'Eating disorder recovery meal (₦1100)'
      },
      night: {
        low: 'Comforting, nutritious dinner (₦300)',
        high: 'Recovery-focused dinner with healing foods (₦870)'
      }
    },
    substance_abuse_disorders: {
      morning: {
        low: 'Detox-supporting breakfast with nutrients (₦260)',
        high: 'Recovery smoothie with brain-healing foods (₦780)'
      },
      afternoon: {
        low: 'Liver-supporting meal with vegetables (₦490)',
        high: 'Addiction recovery meal with healing nutrients (₦1180)'
      },
      night: {
        low: 'Calming, nutritious dinner (₦320)',
        high: 'Recovery-supporting dinner with therapeutic foods (₦900)'
      }
    },
    chronic_back_pain: {
      morning: {
        low: 'Anti-inflammatory breakfast with turmeric (₦250)',
        high: 'Pain-reducing smoothie with cherries (₦750)'
      },
      afternoon: {
        low: 'Omega-3 rich meal with vegetables (₦480)',
        high: 'Back pain relief meal with anti-inflammatory foods (₦1100)'
      },
      night: {
        low: 'Anti-inflammatory tea with light meal (₦300)',
        high: 'Pain management dinner with healing nutrients (₦880)'
      }
    },
    chronic_neck_pain: {
      morning: {
        low: 'Anti-inflammatory breakfast (₦240)',
        high: 'Pain-relief smoothie with ginger (₦720)'
      },
      afternoon: {
        low: 'Anti-inflammatory meal with omega-3s (₦470)',
        high: 'Neck pain relief meal with healing foods (₦1070)'
      },
      night: {
        low: 'Calming tea with anti-inflammatory meal (₦290)',
        high: 'Pain management dinner (₦850)'
      }
    },
    chronic_headaches: {
      morning: {
        low: 'Headache-preventing breakfast with magnesium (₦240)',
        high: 'Migraine-preventing smoothie (₦720)'
      },
      afternoon: {
        low: 'Trigger-free meal with steady blood sugar (₦460)',
        high: 'Headache prevention meal (₦1050)'
      },
      night: {
        low: 'Calming dinner avoiding triggers (₦290)',
        high: 'Headache relief dinner (₦850)'
      }
    },
    cluster_headaches: {
      morning: {
        low: 'Gentle breakfast avoiding triggers (₦230)',
        high: 'Cluster headache prevention smoothie (₦700)'
      },
      afternoon: {
        low: 'Simple meal with anti-inflammatory foods (₦450)',
        high: 'Headache management meal (₦1020)'
      },
      night: {
        low: 'Light, trigger-free dinner (₦280)',
        high: 'Preventive dinner with nutrients (₦830)'
      }
    },
    tension_headaches: {
      morning: {
        low: 'Stress-reducing breakfast with magnesium (₦240)',
        high: 'Tension-relief smoothie (₦720)'
      },
      afternoon: {
        low: 'Balanced meal with stress-reducing foods (₦460)',
        high: 'Tension headache prevention meal (₦1050)'
      },
      night: {
        low: 'Relaxing dinner with calming nutrients (₦290)',
        high: 'Stress-relief dinner (₦850)'
      }
    },
    chronic_sinusitis: {
      morning: {
        low: 'Anti-inflammatory breakfast with ginger (₦250)',
        high: 'Sinus-clearing smoothie with spices (₦750)'
      },
      afternoon: {
        low: 'Immune-boosting meal with vegetables (₦480)',
        high: 'Sinusitis-fighting meal with healing foods (₦1100)'
      },
      night: {
        low: 'Warming tea with anti-inflammatory meal (₦300)',
        high: 'Sinus-supporting dinner (₦880)'
      }
    },
    chronic_bronchitis: {
      morning: {
        low: 'Lung-supporting breakfast with antioxidants (₦250)',
        high: 'Respiratory health smoothie (₦750)'
      },
      afternoon: {
        low: 'Anti-inflammatory meal for lungs (₦480)',
        high: 'Bronchitis-fighting meal with nutrients (₦1100)'
      },
      night: {
        low: 'Warming tea with lung-supporting meal (₦300)',
        high: 'Respiratory healing dinner (₦880)'
      }
    },
    interstitial_lung_disease: {
      morning: {
        low: 'Lung-healthy breakfast with antioxidants (₦260)',
        high: 'Pulmonary support smoothie (₦780)'
      },
      afternoon: {
        low: 'Anti-inflammatory meal for lung health (₦500)',
        high: 'Lung disease management meal (₦1150)'
      },
      night: {
        low: 'Gentle dinner for lung support (₦320)',
        high: 'Comprehensive lung health dinner (₦900)'
      }
    },
    pulmonary_fibrosis: {
      morning: {
        low: 'Antioxidant-rich breakfast for lungs (₦270)',
        high: 'Fibrosis-fighting smoothie (₦800)'
      },
      afternoon: {
        low: 'Anti-inflammatory lung meal (₦520)',
        high: 'Pulmonary fibrosis support meal (₦1200)'
      },
      night: {
        low: 'Lung-healing dinner (₦340)',
        high: 'Comprehensive fibrosis management dinner (₦920)'
      }
    },
    hepatitis_b: {
      morning: {
        low: 'Liver-supporting breakfast (₦250)',
        high: 'Hepatitis recovery smoothie (₦750)'
      },
      afternoon: {
        low: 'Liver-healing meal with vegetables (₦480)',
        high: 'Hepatitis B management meal (₦1100)'
      },
      night: {
        low: 'Gentle liver-supporting dinner (₦300)',
        high: 'Liver health dinner (₦880)'
      }
    },
    hepatitis_c: {
      morning: {
        low: 'Liver-friendly breakfast (₦250)',
        high: 'Hepatitis C support smoothie (₦750)'
      },
      afternoon: {
        low: 'Liver-healing meal (₦480)',
        high: 'Hepatitis C management meal (₦1100)'
      },
      night: {
        low: 'Liver-supporting dinner (₦300)',
        high: 'Comprehensive liver health dinner (₦880)'
      }
    },
    cirrhosis: {
      morning: {
        low: 'Liver-gentle breakfast (₦240)',
        high: 'Cirrhosis support smoothie (₦720)'
      },
      afternoon: {
        low: 'Liver-friendly meal with low sodium (₦460)',
        high: 'Cirrhosis management meal (₦1050)'
      },
      night: {
        low: 'Gentle liver dinner (₦290)',
        high: 'Liver support dinner (₦850)'
      }
    },
    fatty_liver_disease: {
      morning: {
        low: 'Liver-cleansing breakfast (₦250)',
        high: 'Fatty liver support smoothie (₦750)'
      },
      afternoon: {
        low: 'Liver-healing meal with antioxidants (₦480)',
        high: 'Fatty liver management meal (₦1100)'
      },
      night: {
        low: 'Liver-detox dinner (₦300)',
        high: 'Liver health optimization dinner (₦880)'
      }
    },
    gastroparesis: {
      morning: {
        low: 'Easy-to-digest breakfast (₦240)',
        high: 'Gastroparesis-friendly smoothie (₦720)'
      },
      afternoon: {
        low: 'Soft, digestible meal (₦460)',
        high: 'Gastroparesis management meal (₦1050)'
      },
      night: {
        low: 'Gentle, liquid dinner (₦290)',
        high: 'Gastroparesis support dinner (₦850)'
      }
    },
    chronic_gastritis: {
      morning: {
        low: 'Stomach-soothing breakfast (₦240)',
        high: 'Gastritis-healing smoothie (₦720)'
      },
      afternoon: {
        low: 'Gentle meal for stomach (₦460)',
        high: 'Gastritis management meal (₦1050)'
      },
      night: {
        low: 'Soothing dinner for stomach (₦290)',
        high: 'Stomach-healing dinner (₦850)'
      }
    },
    peptic_ulcer_disease: {
      morning: {
        low: 'Ulcer-friendly breakfast (₦240)',
        high: 'Ulcer-healing smoothie (₦720)'
      },
      afternoon: {
        low: 'Gentle meal avoiding triggers (₦460)',
        high: 'Ulcer management meal (₦1050)'
      },
      night: {
        low: 'Soothing ulcer dinner (₦290)',
        high: 'Ulcer-healing dinner (₦850)'
      }
    },
    gastroesophageal_reflux_disease: {
      morning: {
        low: 'GERD-friendly breakfast (₦240)',
        high: 'Acid reflux prevention smoothie (₦720)'
      },
      afternoon: {
        low: 'Low-acid meal for GERD (₦460)',
        high: 'GERD management meal (₦1050)'
      },
      night: {
        low: 'Early, light GERD dinner (₦290)',
        high: 'Reflux prevention dinner (₦850)'
      }
    },
    chronic_pancreatitis: {
      morning: {
        low: 'Pancreas-friendly breakfast (₦250)',
        high: 'Pancreatitis support smoothie (₦750)'
      },
      afternoon: {
        low: 'Low-fat meal for pancreas (₦480)',
        high: 'Pancreatitis management meal (₦1100)'
      },
      night: {
        low: 'Gentle pancreas dinner (₦300)',
        high: 'Pancreatic health dinner (₦880)'
      }
    },
    chronic_cholecystitis: {
      morning: {
        low: 'Gallbladder-friendly breakfast (₦240)',
        high: 'Cholecystitis support smoothie (₦720)'
      },
      afternoon: {
        low: 'Low-fat meal for gallbladder (₦460)',
        high: 'Gallbladder health meal (₦1050)'
      },
      night: {
        low: 'Gentle gallbladder dinner (₦290)',
        high: 'Gallbladder support dinner (₦850)'
      }
    },
    chronic_constipation: {
      morning: {
        low: 'High-fiber breakfast with prunes (₦240)',
        high: 'Constipation-relief smoothie (₦720)'
      },
      afternoon: {
        low: 'Fiber-rich meal with vegetables (₦460)',
        high: 'Digestive health meal (₦1050)'
      },
      night: {
        low: 'Gentle fiber dinner (₦290)',
        high: 'Bowel movement support dinner (₦850)'
      }
    },
    chronic_diarrhea: {
      morning: {
        low: 'Binding breakfast with bananas (₦230)',
        high: 'Diarrhea-stopping smoothie (₦700)'
      },
      afternoon: {
        low: 'BRAT diet meal variation (₦450)',
        high: 'Digestive healing meal (₦1020)'
      },
      night: {
        low: 'Gentle, binding dinner (₦280)',
        high: 'Digestive recovery dinner (₦830)'
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
    post_traumatic_stress_disorder: [
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
    alzheimers_disease: [
      'Engage in regular mental stimulation through puzzles and learning.',
      'Maintain social connections and participate in community activities.',
      'Follow a Mediterranean diet rich in brain-healthy foods.'
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
    chronic_insomnia: [
      'Establish a regular sleep-wake cycle even on weekends.',
      'Create a relaxing bedtime routine to signal your body it\'s time to sleep.',
      'Avoid caffeine, alcohol, and large meals close to bedtime.'
    ],
    sleep_apnea: [
      'Maintain a healthy weight to reduce airway obstruction.',
      'Sleep on your side rather than your back to improve breathing.',
      'Use your CPAP machine consistently as prescribed by your doctor.'
    ],
    migraine: [
      'Identify and avoid personal migraine triggers like certain foods or stress.',
      'Maintain regular meal times and avoid skipping meals.',
      'Stay hydrated and consider magnesium and riboflavin supplements.'
    ],
    chronic_migraines: [
      'Keep a detailed headache diary to identify patterns and triggers.',
      'Practice stress management techniques like meditation or yoga.',
      'Ensure you\'re getting adequate sleep and maintaining regular sleep patterns.'
    ],
    ibs: [
      'Keep a food diary to identify trigger foods and symptoms.',
      'Try a low-FODMAP diet under guidance of a healthcare provider.',
      'Manage stress through relaxation techniques and regular exercise.'
    ],
    irritable_bowel_syndrome: [
      'Eat smaller, more frequent meals to reduce digestive stress.',
      'Include probiotics in your diet to support gut health.',
      'Stay hydrated and limit foods that cause gas and bloating.'
    ],
    pcos: [
      'Maintain a healthy weight through diet and regular exercise.',
      'Choose low-glycemic foods to help manage insulin levels.',
      'Include anti-inflammatory foods and omega-3 fatty acids.'
    ],
    polycystic_ovary_syndrome: [
      'Exercise regularly to improve insulin sensitivity and hormone balance.',
      'Focus on whole foods and limit processed carbohydrates.',
      'Consider working with a registered dietitian for personalized meal planning.'
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
    rheumatoid_arthritis: [
      'Follow your medication regimen strictly to prevent joint damage.',
      'Include omega-3 fatty acids to help reduce inflammation.',
      'Balance activity with rest to manage fatigue and joint pain.'
    ],
    osteoarthritis: [
      'Maintain a healthy weight to reduce pressure on weight-bearing joints.',
      'Use heat and cold therapy to manage pain and stiffness.',
      'Consider glucosamine and chondroitin supplements after consulting your doctor.'
    ],
    kidney_disease: [
      'Monitor your protein intake as recommended by your healthcare provider.',
      'Limit sodium and potassium if advised by your doctor.',
      'Stay hydrated but follow fluid restrictions if prescribed.'
    ],
    chronic_kidney_disease: [
      'Control blood pressure and blood sugar levels if you have diabetes.',
      'Avoid over-the-counter pain medications that can damage kidneys.',
      'Work with a registered dietitian for kidney-friendly meal planning.'
    ],
    liver_disease: [
      'Avoid alcohol completely to prevent further liver damage.',
      'Include antioxidant-rich foods like berries and leafy greens.',
      'Follow your medication regimen strictly and avoid unnecessary medications.'
    ],
    chronic_liver_disease: [
      'Get vaccinated against hepatitis A and B to prevent additional liver damage.',
      'Maintain a healthy weight to reduce fat accumulation in the liver.',
      'Regular monitoring of liver function is essential for disease management.'
    ],
    thyroid_disorders: [
      'Take thyroid medications on an empty stomach as prescribed.',
      'Include iodine-rich foods but avoid excessive amounts.',
      'Regular monitoring of thyroid hormone levels is essential.'
    ],
    hypothyroidism: [
      'Take thyroid hormone replacement medication consistently.',
      'Include selenium-rich foods like Brazil nuts in moderation.',
      'Monitor your energy levels and weight changes regularly.'
    ],
    hyperthyroidism: [
      'Avoid excessive iodine intake which can worsen symptoms.',
      'Include calcium-rich foods to support bone health.',
      'Practice stress management as stress can trigger symptoms.'
    ],
    fibromyalgia: [
      'Maintain a regular sleep schedule to improve sleep quality.',
      'Include gentle exercises like stretching or water aerobics.',
      'Consider stress management techniques like meditation or yoga.'
    ],
    chronic_fatigue_syndrome: [
      'Pace your activities and avoid overexertion.',
      'Prioritize sleep hygiene and maintain consistent sleep patterns.',
      'Consider working with a team of healthcare providers for comprehensive care.'
    ],
    inflammatory_bowel_disease: [
      'Work with a gastroenterologist to develop a comprehensive treatment plan.',
      'Keep a food diary to identify foods that trigger symptoms.',
      'Stay up to date with vaccinations as recommended by your doctor.'
    ],
    crohns_disease: [
      'Take medications as prescribed to maintain remission.',
      'Include easily digestible foods during flare-ups.',
      'Regular monitoring for complications is important.'
    ],
    ulcerative_colitis: [
      'Follow your medication regimen to prevent flare-ups.',
      'Stay hydrated, especially during active disease periods.',
      'Regular colonoscopies are important for monitoring disease progression.'
    ],
    celiac_disease: [
      'Maintain a strict gluten-free diet to prevent intestinal damage.',
      'Read food labels carefully and be aware of cross-contamination.',
      'Consider working with a dietitian experienced in celiac disease.'
    ],
    osteoporosis: [
      'Include weight-bearing exercises to strengthen bones.',
      'Ensure adequate calcium and vitamin D intake.',
      'Avoid smoking and limit alcohol consumption.'
    ],
    gout: [
      'Limit purine-rich foods like organ meats and certain seafood.',
      'Stay well-hydrated to help flush uric acid from your system.',
      'Maintain a healthy weight to reduce gout attacks.'
    ],
    psoriasis: [
      'Moisturize your skin regularly to prevent dryness and cracking.',
      'Avoid known triggers like stress, certain medications, and skin injuries.',
      'Consider phototherapy under medical supervision.'
    ],
    eczema: [
      'Identify and avoid personal triggers like certain fabrics or soaps.',
      'Keep skin moisturized with fragrance-free products.',
      'Use lukewarm water for bathing and avoid harsh soaps.'
    ],
    endometriosis: [
      'Track your symptoms and menstrual cycle to identify patterns.',
      'Consider anti-inflammatory foods to help manage pain.',
      'Work with a gynecologist experienced in endometriosis treatment.'
    ],
    chronic_obstructive_pulmonary_disease: [
      'Quit smoking immediately to slow disease progression.',
      'Get annual flu shots and pneumonia vaccines.',
      'Use your inhalers correctly and as prescribed.'
    ],
    cancer: [
      'Follow your treatment plan exactly as prescribed by your oncology team.',
      'Maintain good nutrition to support your body during treatment.',
      'Stay connected with support groups and loved ones.'
    ],
    stroke: [
      'Take blood-thinning medications exactly as prescribed.',
      'Participate in rehabilitation therapy to regain function.',
      'Control risk factors like blood pressure and cholesterol.'
    ],
    attention_deficit_hyperactivity_disorder: [
      'Establish routines and use organizational tools to manage daily tasks.',
      'Break large tasks into smaller, manageable steps.',
      'Consider both medication and behavioral therapy approaches.'
    ],
    autism_spectrum_disorder: [
      'Create structured routines and environments.',
      'Focus on communication skills development.',
      'Seek support from autism-specialized healthcare providers.'
    ],
    schizophrenia: [
      'Take antipsychotic medications as prescribed.',
      'Maintain regular contact with your mental health team.',
      'Avoid alcohol and recreational drugs which can worsen symptoms.'
    ],
    obsessive_compulsive_disorder: [
      'Practice exposure and response prevention therapy techniques.',
      'Take medications as prescribed by your psychiatrist.',
      'Challenge obsessive thoughts with rational thinking.'
    ],
    eating_disorders: [
      'Work with a specialized eating disorder treatment team.',
      'Focus on developing a healthy relationship with food.',
      'Practice self-compassion and avoid perfectionist thinking.'
    ],
    substance_abuse_disorders: [
      'Participate in a structured treatment program.',
      'Build a strong support network of sober friends and family.',
      'Develop healthy coping strategies for stress and triggers.'
    ]
  };

  return tips[illnessType as keyof typeof tips] || tips.stress;
};
