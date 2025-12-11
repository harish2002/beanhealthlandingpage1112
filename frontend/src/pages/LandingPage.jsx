import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { 
  Activity, 
  AlertCircle, 
  BarChart3, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  ClipboardList, 
  FileText, 
  Heart, 
  HeartPulse, 
  Hospital, 
  LineChart, 
  Pill, 
  ShieldCheck, 
  Stethoscope, 
  Users, 
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { 
  submitDemoRequest, 
  features, 
  problemStats, 
  comparisonData, 
  workflowSteps 
} from '../mock';

const LandingPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lookingFor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = submitDemoRequest(formData);
    if (result.success) {
      toast({
        title: "Demo Request Submitted!",
        description: "Our team will contact you within 24 hours.",
      });
      setFormData({ name: '', email: '', lookingFor: '' });
    }
  };

  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="flex items-center gap-2">
          <img src="/beanhealth-logo.png" alt="BeanHealth Logo" className="brand-logo" />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#problem" className="nav-link">Problem</a>
          <a href="#solution" className="nav-link">Solution</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#demo-section" className="nav-link">Contact</a>
        </div>
        <Button onClick={scrollToDemo} className="btn-primary">Request Demo</Button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Continuous Kidney Care.<br />Smarter Decisions.<br />Better Outcomes.
          </h1>
          <p className="hero-subtitle">
            BeanHealth equips nephrologists and hospitals with real-time patient intelligence, 
            automated follow-up workflows, and early warning alerts—reducing complications and 
            improving patient retention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={scrollToDemo} className="btn-primary">
              Request Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button className="btn-secondary">For Hospitals & Nephrologists</Button>
          </div>
          <div className="mt-12">
            <img 
              src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86" 
              alt="BeanHealth Dashboard" 
              className="dashboard-mockup" 
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="section-container">
        <div className="container">
          <h2 className="heading-2 text-center mb-4">The Current Problem in Renal Care</h2>
          <p className="body-large text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
            Healthcare providers face critical challenges in managing chronic kidney disease
          </p>
          <div className="ai-grid">
            {problemStats.map((stat) => (
              <Card key={stat.id} className="product-card text-center">
                <CardHeader>
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-text)' }}>
                    {stat.stat}
                  </div>
                  <CardDescription className="body-medium">{stat.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#ef4444' }} />
              <p className="body-medium">Nephrologists lack continuous data between consultations</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#ef4444' }} />
              <p className="body-medium">No unified workflow for dialysis, CKD, and transplant follow-ups</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#ef4444' }} />
              <p className="body-medium">Lab reports and medication changes scattered across multiple platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gap in Telemedicine */}
      <section className="section-container" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <h2 className="heading-2 text-center mb-12">The Gap in Existing Telemedicine</h2>
          <div className="comparison-grid">
            <div className="comparison-header">
              <div></div>
              <div className="text-center font-semibold">Telemedicine</div>
              <div className="text-center font-semibold" style={{ color: 'var(--accent-text)' }}>BeanHealth</div>
            </div>
            {comparisonData.map((item, index) => (
              <div key={index} className="comparison-row">
                <div className="body-medium font-medium">{item.feature}</div>
                <div className="text-center">
                  {item.telemedicine ? 
                    <CheckCircle2 className="w-5 h-5 mx-auto" style={{ color: 'var(--accent-text)' }} /> : 
                    <X className="w-5 h-5 mx-auto" style={{ color: '#ef4444' }} />
                  }
                </div>
                <div className="text-center">
                  {item.beanhealth ? 
                    <CheckCircle2 className="w-5 h-5 mx-auto" style={{ color: 'var(--accent-text)' }} /> : 
                    <X className="w-5 h-5 mx-auto" style={{ color: '#ef4444' }} />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Pillars */}
      <section id="solution" className="section-container">
        <div className="container">
          <h2 className="heading-2 text-center mb-4">BeanHealth – The Complete CKD Workflow Platform</h2>
          <p className="body-large text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
            Three interconnected modules designed for complete renal care management
          </p>
          <div className="ai-grid">
            <Card className="product-card">
              <CardHeader>
                <div className="icon-wrapper mb-4">
                  <Activity className="w-8 h-8" style={{ color: 'var(--accent-text)' }} />
                </div>
                <CardTitle className="heading-3">Patient App</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Daily vitals logging (BP, weight, urine output)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Symptoms & lifestyle inputs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Medication compliance tracker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Instant risk reclassification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Integrated kit support (BP monitor, scales)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <div className="icon-wrapper mb-4">
                  <BarChart3 className="w-8 h-8" style={{ color: 'var(--accent-text)' }} />
                </div>
                <CardTitle className="heading-3">Nephrologist Intelligence Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Clinical classification engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Report timeline + vitals graph</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Auto-flagged red/amber cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Follow-up recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">One-glance triage view with EMR export</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <div className="icon-wrapper mb-4">
                  <ClipboardList className="w-8 h-8" style={{ color: 'var(--accent-text)' }} />
                </div>
                <CardTitle className="heading-3">Coordinator Workflow System</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Follow-up calendar for CKD, dialysis & transplant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Pre-built care routines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Auto reminders based on post-transplant days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Visit preparation checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Patient-document organiser & communication log</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-container" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <h2 className="heading-2 text-center mb-4">How BeanHealth Works</h2>
          <p className="body-large text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
            A complete closed-loop system from patient monitoring to clinical action
          </p>
          <div className="workflow-container">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="workflow-step">
                <div className="workflow-number">{step.id}</div>
                <h3 className="heading-3 mb-2">{step.title}</h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="workflow-arrow" style={{ color: 'var(--accent-text)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-container">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">Complete Feature Set</h2>
          <div className="ai-grid">
            {features.map((feature) => (
              <Card key={feature.id} className="product-card">
                <CardHeader>
                  <CardTitle className="product-card-title">{feature.title}</CardTitle>
                  <CardDescription className="product-card-description">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-container" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <h2 className="heading-2 text-center mb-12">Value for Everyone</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="product-card">
              <CardHeader>
                <div className="icon-wrapper mb-4">
                  <Heart className="w-8 h-8" style={{ color: 'var(--accent-text)' }} />
                </div>
                <CardTitle className="heading-3">For Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Clear guidance on daily health management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Fewer flare-ups and emergency visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Peace of mind through early alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Organised reports and medication tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <div className="icon-wrapper mb-4">
                  <Hospital className="w-8 h-8" style={{ color: 'var(--accent-text)' }} />
                </div>
                <CardTitle className="heading-3">For Hospitals & Nephrologists</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Reduced complication load and emergency admissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Faster patient triaging and prioritisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Higher patient retention and revenue continuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                    <span className="body-medium">Less manual coordinator workload with clear documentation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unique Differentiators */}
      <section className="section-container">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">What Makes BeanHealth Unique</h2>
          <div className="ai-grid">
            <Card className="product-card">
              <CardHeader>
                <Stethoscope className="w-8 h-8 mb-4" style={{ color: 'var(--accent-text)' }} />
                <CardTitle className="product-card-title">Clinically Validated</CardTitle>
                <CardDescription className="product-card-description">
                  Built with direct input from nephrologists and transplant coordinators
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <ShieldCheck className="w-8 h-8 mb-4" style={{ color: 'var(--accent-text)' }} />
                <CardTitle className="product-card-title">CKD-Specific Platform</CardTitle>
                <CardDescription className="product-card-description">
                  Designed specifically for chronic kidney disease, not generic telemedicine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <Users className="w-8 h-8 mb-4" style={{ color: 'var(--accent-text)' }} />
                <CardTitle className="product-card-title">Closed-Loop System</CardTitle>
                <CardDescription className="product-card-description">
                  Seamless connection between Patient → Coordinator → Nephrologist
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <Bell className="w-8 h-8 mb-4" style={{ color: 'var(--accent-text)' }} />
                <CardTitle className="product-card-title">Proactive Care Model</CardTitle>
                <CardDescription className="product-card-description">
                  Early intervention instead of reactive consultations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <Activity className="w-8 h-8 mb-4" style={{ color: 'var(--accent-text)' }} />
                <CardTitle className="product-card-title">Device Integration</CardTitle>
                <CardDescription className="product-card-description">
                  Seamless integration with medical devices for home monitoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card">
              <CardHeader>
                <LineChart className="w-8 h-8 mb-4" style={{ color: 'var(--accent-text)' }} />
                <CardTitle className="product-card-title">Scalable & Affordable</CardTitle>
                <CardDescription className="product-card-description">
                  Designed for Indian markets with global scalability
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Deployment Model */}
      <section className="section-container">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">Flexible Deployment Model</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="product-card text-center">
              <CardHeader>
                <CardTitle className="product-card-title">Hospital Subscription</CardTitle>
                <CardDescription className="product-card-description">
                  Department-wide implementation with full feature access
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card text-center">
              <CardHeader>
                <CardTitle className="product-card-title">Per-Patient Activation</CardTitle>
                <CardDescription className="product-card-description">
                  Flexible pricing based on active patient count
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card text-center">
              <CardHeader>
                <CardTitle className="product-card-title">Enterprise Licensing</CardTitle>
                <CardDescription className="product-card-description">
                  Multi-location hospital chains with custom integrations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="product-card text-center">
              <CardHeader>
                <CardTitle className="product-card-title">Device Kits Add-on</CardTitle>
                <CardDescription className="product-card-description">
                  Optional medical device bundles for home monitoring
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section id="demo-section" className="section-container" style={{ background: 'var(--bg-section)' }}>
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="heading-2 mb-4">Modernise Your CKD Department Today</h2>
            <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
              Schedule a demo to see how BeanHealth can transform your renal care workflow
            </p>
          </div>
          <Card className="product-card">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="body-medium font-medium">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dr. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="body-medium font-medium">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@hospital.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="lookingFor" className="body-medium font-medium">What are you looking for? *</Label>
                  <Textarea
                    id="lookingFor"
                    placeholder="Tell us about your hospital/clinic and specific requirements..."
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    required
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="btn-primary w-full">
                  Request Demo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/beanhealth-logo.png" alt="BeanHealth Logo" className="brand-logo-footer" />
              </div>
              <p className="body-small mb-4">
                Transforming chronic kidney care through intelligent patient monitoring and clinical workflow automation.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span className="body-small">harish@beanhealth.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span className="body-small">+91 75581 11310</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span className="body-small">Coimbatore, India</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="heading-3 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#solution" className="link-text body-small">Patient App</a></li>
                <li><a href="#solution" className="link-text body-small">Nephrologist Dashboard</a></li>
                <li><a href="#solution" className="link-text body-small">Coordinator System</a></li>
                <li><a href="#features" className="link-text body-small">Features</a></li>
              </ul>
            </div>

            <div>
              <h3 className="heading-3 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="link-text body-small">About Us</a></li>
                <li><a href="#" className="link-text body-small">Careers</a></li>
                <li><a href="#demo-section" className="link-text body-small">Contact</a></li>
                <li><a href="#" className="link-text body-small">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="heading-3 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="link-text body-small">Privacy Policy</a></li>
                <li><a href="#" className="link-text body-small">Terms of Service</a></li>
                <li><a href="#" className="link-text body-small">HIPAA Compliance</a></li>
                <li><a href="#" className="link-text body-small">Data Security</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="body-small">
              © 2025 BeanHealth Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
