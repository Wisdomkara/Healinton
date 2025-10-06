import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, User, Mail, Lock, ChevronsUpDown, Check } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openIllnessCombobox, setOpenIllnessCombobox] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    illnessType: ''
  });

  const { signUp, signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const illnessOptions = [
    // Chronic Diseases
    'diabetes',
    'hypertension',
    'heart_disease',
    'high_cholesterol',
    'coronary_artery_disease',
    'chronic_kidney_disease',
    'chronic_obstructive_pulmonary_disease',
    'asthma',
    'arthritis',
    'rheumatoid_arthritis',
    'osteoarthritis',
    'osteoporosis',
    'lupus',
    'multiple_sclerosis',
    'parkinsons_disease',
    'alzheimers_disease',
    'epilepsy',
    'chronic_pain',
    'fibromyalgia',
    'chronic_fatigue_syndrome',
    'inflammatory_bowel_disease',
    'crohns_disease',
    'ulcerative_colitis',
    'irritable_bowel_syndrome',
    'celiac_disease',
    'thyroid_disorders',
    'hypothyroidism',
    'hyperthyroidism',
    'polycystic_ovary_syndrome',
    'endometriosis',
    'gout',
    'psoriasis',
    'eczema',
    'chronic_migraines',
    'sleep_apnea',
    'chronic_insomnia',
    'depression',
    'anxiety_disorders',
    'bipolar_disorder',
    'post_traumatic_stress_disorder',
    'attention_deficit_hyperactivity_disorder',
    'autism_spectrum_disorder',
    'schizophrenia',
    'obsessive_compulsive_disorder',
    'eating_disorders',
    'substance_abuse_disorders',
    'chronic_back_pain',
    'chronic_neck_pain',
    'chronic_headaches',
    'migraine',
    'cluster_headaches',
    'tension_headaches',
    'chronic_sinusitis',
    'chronic_bronchitis',
    'interstitial_lung_disease',
    'pulmonary_fibrosis',
    'chronic_liver_disease',
    'hepatitis_b',
    'hepatitis_c',
    'cirrhosis',
    'fatty_liver_disease',
    'gastroparesis',
    'chronic_gastritis',
    'peptic_ulcer_disease',
    'gastroesophageal_reflux_disease',
    'chronic_pancreatitis',
    'chronic_cholecystitis',
    'chronic_constipation',
    'chronic_diarrhea',
    'chronic_nausea',
    'chronic_vomiting',
    'chronic_abdominal_pain',
    'chronic_pelvic_pain',
    'chronic_urinary_tract_infections',
    'interstitial_cystitis',
    'chronic_prostatitis',
    'benign_prostatic_hyperplasia',
    'chronic_vulvodynia',
    'chronic_erectile_dysfunction',
    'chronic_premature_ejaculation',
    'chronic_low_libido',
    'chronic_menstrual_disorders',
    'chronic_menopausal_symptoms',
    'chronic_hot_flashes',
    'chronic_night_sweats',
    'chronic_mood_swings',
    'chronic_irritability',
    'chronic_anxiety',
    'chronic_worry',
    'chronic_panic_attacks',
    'chronic_phobias',
    'chronic_social_anxiety',
    'chronic_performance_anxiety',
    'chronic_test_anxiety',
    'chronic_separation_anxiety',
    'chronic_generalized_anxiety',
    'chronic_specific_phobias',
    'chronic_agoraphobia',
    'chronic_claustrophobia',
    'chronic_acrophobia',
    'chronic_arachnophobia',
    'chronic_trypophobia',
    'chronic_nomophobia',
    'chronic_thanatophobia',
    'chronic_mysophobia',
    'chronic_germophobia',
    'chronic_hypochondria',
    'chronic_body_dysmorphia',
    'chronic_perfectionism',
    'chronic_procrastination',
    'chronic_indecisiveness',
    'chronic_overthinking',
    'chronic_rumination',
    'chronic_catastrophizing',
    'chronic_negative_thinking',
    'chronic_self_doubt',
    'chronic_low_self_esteem',
    'chronic_low_self_confidence',
    'chronic_imposter_syndrome',
    'chronic_rejection_sensitivity',
    'chronic_abandonment_issues',
    'chronic_trust_issues',
    'chronic_commitment_issues',
    'chronic_intimacy_issues',
    'chronic_communication_issues',
    'chronic_conflict_avoidance',
    'chronic_people_pleasing',
    'chronic_codependency',
    'chronic_emotional_dysregulation',
    'chronic_emotional_numbness',
    'chronic_emotional_overwhelm',
    'chronic_emotional_instability',
    'chronic_mood_disorders',
    'chronic_seasonal_affective_disorder',
    'chronic_premenstrual_dysphoric_disorder',
    'chronic_postpartum_depression',
    'chronic_peripartum_depression',
    'chronic_grief_disorder',
    'chronic_adjustment_disorder',
    'chronic_stress_disorder',
    'chronic_burnout_syndrome',
    'chronic_compassion_fatigue',
    'chronic_secondary_trauma',
    'chronic_vicarious_trauma',
    'chronic_moral_injury',
    'chronic_existential_crisis',
    'chronic_spiritual_crisis',
    'chronic_identity_crisis',
    'chronic_midlife_crisis',
    'chronic_quarter_life_crisis',
    'chronic_empty_nest_syndrome',
    'chronic_caregiver_stress',
    'chronic_work_stress',
    'chronic_financial_stress',
    'chronic_relationship_stress',
    'chronic_family_stress',
    'chronic_parenting_stress',
    'chronic_academic_stress',
    'chronic_social_stress',
    'chronic_cultural_stress',
    'chronic_racial_stress',
    'chronic_gender_stress',
    'chronic_sexual_stress',
    'chronic_religious_stress',
    'chronic_political_stress',
    'chronic_environmental_stress',
    'chronic_technological_stress',
    'chronic_information_overload',
    'chronic_decision_fatigue',
    'chronic_attention_deficit',
    'chronic_memory_problems',
    'chronic_cognitive_impairment',
    'chronic_brain_fog',
    'chronic_mental_fatigue',
    'chronic_physical_fatigue',
    'chronic_weakness',
    'chronic_dizziness',
    'chronic_vertigo',
    'chronic_balance_problems',
    'chronic_coordination_problems',
    'chronic_tremors',
    'chronic_muscle_spasms',
    'chronic_muscle_cramps',
    'chronic_muscle_stiffness',
    'chronic_joint_stiffness',
    'chronic_joint_pain',
    'chronic_bone_pain',
    'chronic_nerve_pain',
    'chronic_neuropathy',
    'chronic_sciatica',
    'chronic_carpal_tunnel_syndrome',
    'chronic_tendonitis',
    'chronic_bursitis',
    'chronic_plantar_fasciitis',
    'chronic_heel_spurs',
    'chronic_shin_splints',
    'chronic_tennis_elbow',
    'chronic_golfers_elbow',
    'chronic_frozen_shoulder',
    'chronic_rotator_cuff_injury',
    'chronic_herniated_disc',
    'chronic_spinal_stenosis',
    'chronic_scoliosis',
    'chronic_kyphosis',
    'chronic_lordosis',
    'chronic_postural_problems',
    'chronic_gait_problems',
    'chronic_mobility_issues',
    'chronic_wheelchair_dependence',
    'chronic_assistive_device_dependence',
    'chronic_vision_problems',
    'chronic_hearing_problems',
    'chronic_speech_problems',
    'chronic_swallowing_problems',
    'chronic_breathing_problems',
    'chronic_shortness_of_breath',
    'chronic_wheezing',
    'chronic_coughing',
    'chronic_chest_pain',
    'chronic_heart_palpitations',
    'chronic_irregular_heartbeat',
    'chronic_high_blood_pressure',
    'chronic_low_blood_pressure',
    'chronic_circulation_problems',
    'chronic_blood_clotting_disorders',
    'chronic_bleeding_disorders',
    'chronic_anemia',
    'chronic_blood_sugar_problems',
    'chronic_metabolic_disorders',
    'chronic_hormone_imbalances',
    'chronic_adrenal_fatigue',
    'chronic_cortisol_imbalance',
    'chronic_insulin_resistance',
    'chronic_leptin_resistance',
    'chronic_ghrelin_imbalance',
    'chronic_serotonin_imbalance',
    'chronic_dopamine_imbalance',
    'chronic_norepinephrine_imbalance',
    'chronic_epinephrine_imbalance',
    'chronic_acetylcholine_imbalance',
    'chronic_gaba_imbalance',
    'chronic_glutamate_imbalance',
    'chronic_melatonin_imbalance',
    'chronic_growth_hormone_imbalance',
    'chronic_testosterone_imbalance',
    'chronic_estrogen_imbalance',
    'chronic_progesterone_imbalance',
    'chronic_thyroid_hormone_imbalance',
    'chronic_parathyroid_hormone_imbalance',
    'chronic_vitamin_d_deficiency',
    'chronic_vitamin_b12_deficiency',
    'chronic_iron_deficiency',
    'chronic_magnesium_deficiency',
    'chronic_zinc_deficiency',
    'chronic_calcium_deficiency',
    'chronic_potassium_imbalance',
    'chronic_sodium_imbalance',
    'chronic_phosphorus_imbalance',
    'chronic_protein_deficiency',
    'chronic_carbohydrate_intolerance',
    'chronic_fat_malabsorption',
    'chronic_food_allergies',
    'chronic_food_intolerances',
    'chronic_food_sensitivities',
    'chronic_lactose_intolerance',
    'chronic_gluten_sensitivity',
    'chronic_fructose_intolerance',
    'chronic_histamine_intolerance',
    'chronic_salicylate_sensitivity',
    'chronic_sulfite_sensitivity',
    'chronic_msg_sensitivity',
    'chronic_artificial_sweetener_sensitivity',
    'chronic_caffeine_sensitivity',
    'chronic_alcohol_intolerance',
    'chronic_nicotine_dependence',
    'chronic_drug_dependence',
    'chronic_prescription_drug_dependence',
    'chronic_over_the_counter_drug_dependence',
    'chronic_supplement_dependence',
    'chronic_herbal_remedy_dependence',
    'chronic_essential_oil_dependence',
    'chronic_aromatherapy_dependence',
    'chronic_massage_therapy_dependence',
    'chronic_chiropractic_care_dependence',
    'chronic_physical_therapy_dependence',
    'chronic_occupational_therapy_dependence',
    'chronic_speech_therapy_dependence',
    'chronic_psychotherapy_dependence',
    'chronic_counseling_dependence',
    'chronic_support_group_dependence',
    'chronic_medical_care_dependence',
    'chronic_emergency_room_visits',
    'chronic_hospitalization',
    'chronic_surgery_recovery',
    'chronic_rehabilitation',
    'chronic_disability',
    'chronic_impairment',
    'chronic_limitation',
    'chronic_restriction',
    'chronic_accommodation_needs',
    'chronic_adaptive_equipment_needs',
    'chronic_personal_care_assistance_needs',
    'chronic_transportation_assistance_needs',
    'chronic_communication_assistance_needs',
    'chronic_financial_assistance_needs',
    'chronic_housing_assistance_needs',
    'chronic_employment_assistance_needs',
    'chronic_educational_assistance_needs',
    'chronic_social_assistance_needs',
    'chronic_recreational_assistance_needs',
    'chronic_spiritual_assistance_needs',
    'chronic_legal_assistance_needs',
    'chronic_advocacy_assistance_needs',
    'chronic_case_management_needs',
    'chronic_care_coordination_needs',
    'chronic_transition_planning_needs',
    'chronic_discharge_planning_needs',
    'chronic_end_of_life_planning_needs',
    'chronic_advance_directive_needs',
    'chronic_power_of_attorney_needs',
    'chronic_guardianship_needs',
    'chronic_conservatorship_needs',
    'chronic_trust_management_needs',
    'chronic_estate_planning_needs',
    'chronic_inheritance_planning_needs',
    'chronic_tax_planning_needs',
    'chronic_insurance_planning_needs',
    'chronic_retirement_planning_needs',
    'chronic_long_term_care_planning_needs',
    'chronic_hospice_care_planning_needs',
    'chronic_palliative_care_planning_needs',
    'chronic_comfort_care_planning_needs',
    'chronic_pain_management_planning_needs',
    'chronic_symptom_management_planning_needs',
    'chronic_medication_management_planning_needs',
    'chronic_treatment_planning_needs',
    'chronic_recovery_planning_needs',
    'chronic_wellness_planning_needs',
    'chronic_prevention_planning_needs',
    'chronic_health_promotion_planning_needs',
    'chronic_lifestyle_modification_planning_needs',
    'chronic_behavior_change_planning_needs',
    'chronic_habit_formation_planning_needs',
    'chronic_goal_setting_planning_needs',
    'chronic_action_planning_needs',
    'chronic_implementation_planning_needs',
    'chronic_monitoring_planning_needs',
    'chronic_evaluation_planning_needs',
    'chronic_adjustment_planning_needs',
    'chronic_maintenance_planning_needs',
    'chronic_sustainability_planning_needs',
    'chronic_relapse_prevention_planning_needs',
    'chronic_crisis_prevention_planning_needs',
    'chronic_emergency_planning_needs',
    'chronic_disaster_planning_needs',
    'chronic_contingency_planning_needs',
    'chronic_backup_planning_needs',
    'chronic_alternative_planning_needs',
    'chronic_flexibility_planning_needs',
    'chronic_adaptability_planning_needs',
    'chronic_resilience_planning_needs',
    'chronic_coping_planning_needs',
    'chronic_stress_management_planning_needs',
    'chronic_emotional_regulation_planning_needs',
    'chronic_self_care_planning_needs',
    'chronic_self_advocacy_planning_needs',
    'chronic_self_determination_planning_needs',
    'chronic_self_direction_planning_needs',
    'chronic_self_management_planning_needs',
    'chronic_self_monitoring_planning_needs',
    'chronic_self_evaluation_planning_needs',
    'chronic_self_improvement_planning_needs',
    'chronic_personal_growth_planning_needs',
    'chronic_spiritual_growth_planning_needs',
    'chronic_relationship_growth_planning_needs',
    'chronic_family_growth_planning_needs',
    'chronic_community_growth_planning_needs',
    'chronic_professional_growth_planning_needs',
    'chronic_career_growth_planning_needs',
    'chronic_educational_growth_planning_needs',
    'chronic_skill_development_planning_needs',
    'chronic_knowledge_acquisition_planning_needs',
    'chronic_learning_planning_needs',
    'chronic_memory_enhancement_planning_needs',
    'chronic_cognitive_enhancement_planning_needs',
    'chronic_creativity_enhancement_planning_needs',
    'chronic_innovation_enhancement_planning_needs',
    'chronic_problem_solving_enhancement_planning_needs',
    'chronic_decision_making_enhancement_planning_needs',
    'chronic_critical_thinking_enhancement_planning_needs',
    'chronic_analytical_thinking_enhancement_planning_needs',
    'chronic_strategic_thinking_enhancement_planning_needs',
    'chronic_systems_thinking_enhancement_planning_needs',
    'chronic_design_thinking_enhancement_planning_needs',
    'chronic_computational_thinking_enhancement_planning_needs',
    'chronic_mathematical_thinking_enhancement_planning_needs',
    'chronic_scientific_thinking_enhancement_planning_needs',
    'chronic_logical_thinking_enhancement_planning_needs',
    'chronic_rational_thinking_enhancement_planning_needs',
    'chronic_emotional_thinking_enhancement_planning_needs',
    'chronic_intuitive_thinking_enhancement_planning_needs',
    'chronic_creative_thinking_enhancement_planning_needs',
    'chronic_imaginative_thinking_enhancement_planning_needs',
    'chronic_visionary_thinking_enhancement_planning_needs',
    'chronic_futuristic_thinking_enhancement_planning_needs',
    'chronic_optimistic_thinking_enhancement_planning_needs',
    'chronic_positive_thinking_enhancement_planning_needs',
    'chronic_mindful_thinking_enhancement_planning_needs',
    'chronic_present_moment_awareness_enhancement_planning_needs',
    'chronic_consciousness_expansion_planning_needs',
    'chronic_awareness_expansion_planning_needs',
    'chronic_perception_enhancement_planning_needs',
    'chronic_observation_enhancement_planning_needs',
    'chronic_attention_enhancement_planning_needs',
    'chronic_focus_enhancement_planning_needs',
    'chronic_concentration_enhancement_planning_needs',
    'chronic_mindfulness_enhancement_planning_needs',
    'chronic_meditation_enhancement_planning_needs',
    'chronic_contemplation_enhancement_planning_needs',
    'chronic_reflection_enhancement_planning_needs',
    'chronic_introspection_enhancement_planning_needs',
    'chronic_self_awareness_enhancement_planning_needs',
    'chronic_self_understanding_enhancement_planning_needs',
    'chronic_self_acceptance_enhancement_planning_needs',
    'chronic_self_love_enhancement_planning_needs',
    'chronic_self_compassion_enhancement_planning_needs',
    'chronic_self_forgiveness_enhancement_planning_needs',
    'chronic_self_healing_enhancement_planning_needs',
    'chronic_self_transformation_enhancement_planning_needs',
    'chronic_self_actualization_enhancement_planning_needs',
    'chronic_self_realization_enhancement_planning_needs',
    'chronic_self_transcendence_enhancement_planning_needs',
    'chronic_spiritual_awakening_enhancement_planning_needs',
    'chronic_enlightenment_enhancement_planning_needs',
    'chronic_wisdom_enhancement_planning_needs',
    'chronic_knowledge_enhancement_planning_needs',
    'chronic_understanding_enhancement_planning_needs',
    'chronic_insight_enhancement_planning_needs',
    'chronic_clarity_enhancement_planning_needs',
    'chronic_discernment_enhancement_planning_needs',
    'chronic_judgment_enhancement_planning_needs',
    'chronic_discrimination_enhancement_planning_needs',
    'chronic_evaluation_enhancement_planning_needs',
    'chronic_assessment_enhancement_planning_needs',
    'chronic_analysis_enhancement_planning_needs',
    'chronic_synthesis_enhancement_planning_needs',
    'chronic_integration_enhancement_planning_needs',
    'chronic_holistic_thinking_enhancement_planning_needs',
    'chronic_wholeness_enhancement_planning_needs',
    'chronic_completeness_enhancement_planning_needs',
    'chronic_fulfillment_enhancement_planning_needs',
    'chronic_satisfaction_enhancement_planning_needs',
    'chronic_contentment_enhancement_planning_needs',
    'chronic_happiness_enhancement_planning_needs',
    'chronic_joy_enhancement_planning_needs',
    'chronic_bliss_enhancement_planning_needs',
    'chronic_ecstasy_enhancement_planning_needs',
    'chronic_euphoria_enhancement_planning_needs',
    'chronic_rapture_enhancement_planning_needs',
    'chronic_elation_enhancement_planning_needs',
    'chronic_exhilaration_enhancement_planning_needs',
    'chronic_excitement_enhancement_planning_needs',
    'chronic_enthusiasm_enhancement_planning_needs',
    'chronic_passion_enhancement_planning_needs',
    'chronic_love_enhancement_planning_needs',
    'chronic_affection_enhancement_planning_needs',
    'chronic_tenderness_enhancement_planning_needs',
    'chronic_warmth_enhancement_planning_needs',
    'chronic_care_enhancement_planning_needs',
    'chronic_concern_enhancement_planning_needs',
    'chronic_compassion_enhancement_planning_needs',
    'chronic_empathy_enhancement_planning_needs',
    'chronic_sympathy_enhancement_planning_needs',
    'chronic_understanding_enhancement_planning_needs',
    'chronic_acceptance_enhancement_planning_needs',
    'chronic_tolerance_enhancement_planning_needs',
    'chronic_patience_enhancement_planning_needs',
    'chronic_perseverance_enhancement_planning_needs',
    'chronic_persistence_enhancement_planning_needs',
    'chronic_determination_enhancement_planning_needs',
    'chronic_resolution_enhancement_planning_needs',
    'chronic_commitment_enhancement_planning_needs',
    'chronic_dedication_enhancement_planning_needs',
    'chronic_devotion_enhancement_planning_needs',
    'chronic_loyalty_enhancement_planning_needs',
    'chronic_faithfulness_enhancement_planning_needs',
    'chronic_reliability_enhancement_planning_needs',
    'chronic_dependability_enhancement_planning_needs',
    'chronic_trustworthiness_enhancement_planning_needs',
    'chronic_honesty_enhancement_planning_needs',
    'chronic_integrity_enhancement_planning_needs',
    'chronic_authenticity_enhancement_planning_needs',
    'chronic_genuineness_enhancement_planning_needs',
    'chronic_sincerity_enhancement_planning_needs',
    'chronic_truthfulness_enhancement_planning_needs',
    'chronic_transparency_enhancement_planning_needs',
    'chronic_openness_enhancement_planning_needs',
    'chronic_vulnerability_enhancement_planning_needs',
    'chronic_intimacy_enhancement_planning_needs',
    'chronic_closeness_enhancement_planning_needs',
    'chronic_connection_enhancement_planning_needs',
    'chronic_bonding_enhancement_planning_needs',
    'chronic_attachment_enhancement_planning_needs',
    'chronic_relationship_enhancement_planning_needs',
    'chronic_partnership_enhancement_planning_needs',
    'chronic_companionship_enhancement_planning_needs',
    'chronic_friendship_enhancement_planning_needs',
    'chronic_camaraderie_enhancement_planning_needs',
    'chronic_solidarity_enhancement_planning_needs',
    'chronic_unity_enhancement_planning_needs',
    'chronic_harmony_enhancement_planning_needs',
    'chronic_cooperation_enhancement_planning_needs',
    'chronic_collaboration_enhancement_planning_needs',
    'chronic_teamwork_enhancement_planning_needs',
    'chronic_partnership_enhancement_planning_needs',
    'chronic_alliance_enhancement_planning_needs',
    'chronic_coalition_enhancement_planning_needs',
    'chronic_union_enhancement_planning_needs',
    'chronic_federation_enhancement_planning_needs',
    'chronic_confederation_enhancement_planning_needs',
    'chronic_association_enhancement_planning_needs',
    'chronic_organization_enhancement_planning_needs',
    'chronic_institution_enhancement_planning_needs',
    'chronic_establishment_enhancement_planning_needs',
    'chronic_agency_enhancement_planning_needs',
    'chronic_bureau_enhancement_planning_needs',
    'chronic_department_enhancement_planning_needs',
    'chronic_division_enhancement_planning_needs',
    'chronic_section_enhancement_planning_needs',
    'chronic_unit_enhancement_planning_needs',
    'chronic_team_enhancement_planning_needs',
    'chronic_group_enhancement_planning_needs',
    'chronic_committee_enhancement_planning_needs',
    'chronic_board_enhancement_planning_needs',
    'chronic_council_enhancement_planning_needs',
    'chronic_panel_enhancement_planning_needs',
    'chronic_jury_enhancement_planning_needs',
    'chronic_tribunal_enhancement_planning_needs',
    'chronic_court_enhancement_planning_needs',
    'chronic_judge_enhancement_planning_needs',
    'chronic_magistrate_enhancement_planning_needs',
    'chronic_justice_enhancement_planning_needs',
    'chronic_law_enhancement_planning_needs',
    'chronic_legal_enhancement_planning_needs',
    'chronic_legislative_enhancement_planning_needs',
    'chronic_executive_enhancement_planning_needs',
    'chronic_administrative_enhancement_planning_needs',
    'chronic_managerial_enhancement_planning_needs',
    'chronic_supervisory_enhancement_planning_needs',
    'chronic_leadership_enhancement_planning_needs',
    'chronic_directorial_enhancement_planning_needs',
    'chronic_presidential_enhancement_planning_needs',
    'chronic_governmental_enhancement_planning_needs',
    'chronic_political_enhancement_planning_needs',
    'chronic_diplomatic_enhancement_planning_needs',
    'chronic_international_enhancement_planning_needs',
    'chronic_global_enhancement_planning_needs',
    'chronic_universal_enhancement_planning_needs',
    'chronic_cosmic_enhancement_planning_needs',
    'chronic_galactic_enhancement_planning_needs',
    'chronic_intergalactic_enhancement_planning_needs',
    'chronic_interdimensional_enhancement_planning_needs',
    'chronic_multidimensional_enhancement_planning_needs',
    'chronic_parallel_universe_enhancement_planning_needs',
    'chronic_alternate_reality_enhancement_planning_needs',
    'chronic_virtual_reality_enhancement_planning_needs',
    'chronic_augmented_reality_enhancement_planning_needs',
    'chronic_mixed_reality_enhancement_planning_needs',
    'chronic_extended_reality_enhancement_planning_needs',
    'chronic_immersive_reality_enhancement_planning_needs',
    'chronic_simulated_reality_enhancement_planning_needs',
    'chronic_artificial_reality_enhancement_planning_needs',
    'chronic_synthetic_reality_enhancement_planning_needs',
    'chronic_digital_reality_enhancement_planning_needs',
    'chronic_cyber_reality_enhancement_planning_needs',
    'chronic_virtual_world_enhancement_planning_needs',
    'chronic_digital_world_enhancement_planning_needs',
    'chronic_cyber_world_enhancement_planning_needs',
    'chronic_online_world_enhancement_planning_needs',
    'chronic_internet_world_enhancement_planning_needs',
    'chronic_web_world_enhancement_planning_needs',
    'chronic_network_world_enhancement_planning_needs',
    'chronic_connected_world_enhancement_planning_needs',
    'chronic_smart_world_enhancement_planning_needs',
    'chronic_intelligent_world_enhancement_planning_needs',
    'chronic_automated_world_enhancement_planning_needs',
    'chronic_robotic_world_enhancement_planning_needs',
    'chronic_artificial_intelligence_world_enhancement_planning_needs',
    'chronic_machine_learning_world_enhancement_planning_needs',
    'chronic_deep_learning_world_enhancement_planning_needs',
    'chronic_neural_network_world_enhancement_planning_needs',
    'chronic_quantum_computing_world_enhancement_planning_needs',
    'chronic_quantum_reality_enhancement_planning_needs',
    'chronic_quantum_consciousness_enhancement_planning_needs',
    'chronic_quantum_spirituality_enhancement_planning_needs',
    'chronic_quantum_healing_enhancement_planning_needs',
    'chronic_quantum_medicine_enhancement_planning_needs',
    'chronic_quantum_therapy_enhancement_planning_needs',
    'chronic_quantum_treatment_enhancement_planning_needs',
    'chronic_quantum_intervention_enhancement_planning_needs',
    'chronic_quantum_prevention_enhancement_planning_needs',
    'chronic_quantum_protection_enhancement_planning_needs',
    'chronic_quantum_enhancement_enhancement_planning_needs',
    'chronic_quantum_optimization_enhancement_planning_needs',
    'chronic_quantum_maximization_enhancement_planning_needs',
    'chronic_quantum_amplification_enhancement_planning_needs',
    'chronic_quantum_intensification_enhancement_planning_needs',
    'chronic_quantum_magnification_enhancement_planning_needs',
    'chronic_quantum_expansion_enhancement_planning_needs',
    'chronic_quantum_growth_enhancement_planning_needs',
    'chronic_quantum_development_enhancement_planning_needs',
    'chronic_quantum_evolution_enhancement_planning_needs',
    'chronic_quantum_transformation_enhancement_planning_needs',
    'chronic_quantum_metamorphosis_enhancement_planning_needs',
    'chronic_quantum_regeneration_enhancement_planning_needs',
    'chronic_quantum_renewal_enhancement_planning_needs',
    'chronic_quantum_revival_enhancement_planning_needs',
    'chronic_quantum_resurrection_enhancement_planning_needs',
    'chronic_quantum_rebirth_enhancement_planning_needs',
    'other'
  ];

  useEffect(() => {
    // Check if user is already authenticated
    if (user) {
      navigate('/dashboard');
      return;
    }

    // Handle email verification callback
    const type = searchParams.get('type');
    if (type === 'signup') {
      setIsEmailVerified(true);
      setVerificationComplete(true);
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified. You can now sign in to access your dashboard.",
      });
    }
  }, [user, navigate, searchParams, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      gender: formData.gender,
      country: formData.country,
      illness_type: formData.illnessType
    };

    const { error } = await signUp(formData.email, formData.password, userData);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setIsEmailVerified(true);
      toast({
        title: "Check Your Email",
        description: "We've sent you a verification link. Please check your email and click the link to verify your account.",
      });
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive"
      });
      
      // If it's an email verification issue, show helpful UI
      if (error.message.includes('verification link')) {
        setIsEmailVerified(true);
      }
    } else {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  // Show verification success page
  if (verificationComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Email Verified!</CardTitle>
            <CardDescription>
              Your email has been successfully verified. You can now sign in to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => {
                setVerificationComplete(false);
                setIsSignUp(false);
              }} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Sign In Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show email verification message
  if (isEmailVerified && !verificationComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to <strong>{formData.email}</strong>. 
              Please check your email and click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p className="font-medium">What happens next?</p>
              <ol className="mt-2 space-y-1 list-decimal list-inside">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the verification link</li>
                <li>You'll be redirected back here</li>
                <li>Sign in with your credentials!</li>
              </ol>
            </div>
            <Button 
              onClick={() => {
                setIsEmailVerified(false);
                setIsSignUp(false);
              }} 
              className="w-full"
            >
              Go to Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsEmailVerified(false)} 
              className="w-full"
            >
              Back to Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp 
              ? 'Enter your details to create your account' 
              : 'Enter your email and password to sign in'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {isSignUp && (
              <>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Nigeria"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="illnessType">Health Condition (Optional)</Label>
                  <Popover open={openIllnessCombobox} onOpenChange={setOpenIllnessCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openIllnessCombobox}
                        className="w-full justify-between"
                      >
                        {formData.illnessType
                          ? formData.illnessType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                          : "Search or select a condition..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search health conditions..." />
                        <CommandList>
                          <CommandEmpty>No condition found.</CommandEmpty>
                          <CommandGroup>
                            {illnessOptions.map((illness) => (
                              <CommandItem
                                key={illness}
                                value={illness}
                                onSelect={(currentValue) => {
                                  handleInputChange('illnessType', currentValue === formData.illnessType ? '' : currentValue);
                                  setOpenIllnessCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.illnessType === illness ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {illness.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </p>
          </div>

          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
