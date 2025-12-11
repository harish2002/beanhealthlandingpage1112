// Mock data for BeanHealth landing page

export const demoSubmissions = [];

export const submitDemoRequest = (formData) => {
  const submission = {
    id: Date.now(),
    ...formData,
    timestamp: new Date().toISOString()
  };
  demoSubmissions.push(submission);
  console.log('Demo request submitted:', submission);
  return { success: true, data: submission };
};

export const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Senior Nephrologist, Apollo Hospitals",
    quote: "BeanHealth has transformed how we monitor our CKD patients. The real-time classification and alert system helps us intervene early, reducing emergency admissions by 40%."
  },
  {
    id: 2,
    name: "Sister Priya Menon",
    role: "Transplant Coordinator, KIMS Hospital",
    quote: "Managing 400+ transplant follow-ups was overwhelming. BeanHealth's coordinator module automated our routines and improved patient compliance dramatically."
  },
  {
    id: 3,
    name: "Ramesh Patel",
    role: "CKD Stage 3 Patient",
    quote: "I feel more in control of my health now. Daily vitals tracking and instant feedback gives me peace of mind, and my doctor can see everything in real-time."
  }
];

export const features = [
  {
    id: 1,
    title: "Smart CKD Staging & Classification",
    description: "AI-powered classification engine based on clinical guidelines and real-time patient data"
  },
  {
    id: 2,
    title: "Daily-Vitals Analytics",
    description: "Continuous monitoring of BP, weight, urine output with trend analysis and insights"
  },
  {
    id: 3,
    title: "Medication Adherence",
    description: "Track compliance, set reminders, and monitor medication effectiveness over time"
  },
  {
    id: 4,
    title: "Red-Flag Alerts",
    description: "Instant notifications for critical changes requiring immediate clinical attention"
  },
  {
    id: 5,
    title: "Transplant Follow-Up Engine",
    description: "Automated post-transplant care routines with day-specific monitoring protocols"
  },
  {
    id: 6,
    title: "Dialysis Session Monitoring",
    description: "Track dialysis sessions, complications, and adjust treatment plans accordingly"
  },
  {
    id: 7,
    title: "Document Summary Timeline",
    description: "Organised view of all lab reports, prescriptions, and consultation notes"
  },
  {
    id: 8,
    title: "Hospital Workflow Automation",
    description: "Streamline coordinator tasks, follow-up scheduling, and patient communication"
  },
  {
    id: 9,
    title: "Kits & Home-Testing Integration",
    description: "Seamless integration with BP monitors, weighing scales, and diagnostic strips"
  }
];

export const problemStats = [
  {
    id: 1,
    stat: "70%",
    description: "Patients come only during flare-ups; early signs are missed"
  },
  {
    id: 2,
    stat: "300-500",
    description: "Follow-up patients manually chased by each transplant coordinator"
  },
  {
    id: 3,
    stat: "0",
    description: "Unified workflow for dialysis, CKD, and transplant follow-ups"
  },
  {
    id: 4,
    stat: "Scattered",
    description: "Lab reports, vitals, medication changes across WhatsApp, PDFs, calls"
  }
];

export const comparisonData = [
  {
    feature: "Video Consultation",
    telemedicine: true,
    beanhealth: true
  },
  {
    feature: "Clinical Workflow",
    telemedicine: false,
    beanhealth: true
  },
  {
    feature: "Real-time Risk Scoring",
    telemedicine: false,
    beanhealth: true
  },
  {
    feature: "Adherence Tracking",
    telemedicine: false,
    beanhealth: true
  },
  {
    feature: "Coordinator Module",
    telemedicine: false,
    beanhealth: true
  },
  {
    feature: "Triage Automation",
    telemedicine: false,
    beanhealth: true
  },
  {
    feature: "CKD-Specific Intelligence",
    telemedicine: false,
    beanhealth: true
  }
];

export const workflowSteps = [
  {
    id: 1,
    title: "Baseline Assessment",
    description: "Patient baseline including labs, eGFR, comorbidities → classification"
  },
  {
    id: 2,
    title: "Daily Monitoring",
    description: "Patient logs vitals → app generates micro-analytics"
  },
  {
    id: 3,
    title: "Risk Classification Engine",
    description: "Real-time model updates risk score (green/amber/red)"
  },
  {
    id: 4,
    title: "Alert Routing",
    description: "Red → nephrologist, Amber → coordinator, Green → patient self-management"
  },
  {
    id: 5,
    title: "Follow-Up Routines",
    description: "CKD or transplant-specific routines with automated reminders"
  },
  {
    id: 6,
    title: "Clinician Action",
    description: "Doctor reviews dashboard, identifies cases, updates plan"
  },
  {
    id: 7,
    title: "Outcome Improvement",
    description: "Fewer emergencies, structured workflow, higher retention"
  }
];
