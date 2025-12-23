import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Eye,
  FileText,
  Heart,
  HeartPulse,
  Hospital,
  LineChart,
  Pill,
  ShieldCheck,
  Stethoscope,
  TrendingDown,
  UserX,
  Users,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Menu,
  Code,
  Database,
  Zap,
  Monitor,
  Smartphone,
  Wifi,
  Cpu
} from 'lucide-react';
import {
  features,
  problemStats,
  fragmentationIssues,
  comparisonData,
  workflowSteps
} from '../mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Scroll Animation Hook
const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // Handle staggered children
          const staggeredChildren = entry.target.querySelectorAll('.stagger-item');
          staggeredChildren.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-fade-up, .scroll-fade-in, .scroll-scale, .scroll-slide-left, .scroll-slide-right');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};


const LandingPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lookingFor: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize scroll animations
  useScrollAnimation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/demo-request`, formData);
      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', lookingFor: '' });
        // Reset after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 8000);
      } else {
        toast({
          title: "Submission Failed",
          description: "Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      {/* Logo Section - Separate and Prominent */}
      <div className="logo-section" onClick={scrollToTop}>
        <img src="/beanhealth-logo.png" alt="BeanHealth Logo" className="brand-logo-main" />
      </div>

      {/* Navigation Header */}
      <nav className="nav-header">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#problem" className="nav-link">Problem</a>
          <a href="#solution" className="nav-link">Solution</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#founder" className="nav-link">Founder</a>
          <a href="#demo-section" className="nav-link">Contact</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-button md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Button onClick={scrollToDemo} className="btn-primary ml-auto">Schedule Demo</Button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <img src="/beanhealth-logo.png" alt="BeanHealth" className="mobile-menu-logo" />
              <button onClick={closeMobileMenu} className="mobile-menu-close">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mobile-menu-links">
              <a href="#problem" className="mobile-menu-link" onClick={closeMobileMenu}>Problem</a>
              <a href="#solution" className="mobile-menu-link" onClick={closeMobileMenu}>Solution</a>
              <a href="#features" className="mobile-menu-link" onClick={closeMobileMenu}>Features</a>
              <a href="#founder" className="mobile-menu-link" onClick={closeMobileMenu}>Founder</a>
              <a href="#demo-section" className="mobile-menu-link" onClick={closeMobileMenu}>Contact</a>
            </div>
            <div className="mobile-menu-footer">
              <Button onClick={() => { scrollToDemo(); closeMobileMenu(); }} className="btn-primary w-full">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Floating Background Shapes */}
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>

        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'var(--accent-wash)',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-light)'
          }}>
            <span style={{ color: 'var(--accent-text)', fontWeight: '600', fontSize: '0.9rem' }}>
              🏥 For Hospitals & Nephrologists
            </span>
          </div>
          <h1 className="hero-title">
            From Missed Follow-ups to<br />Real-Time Renal Risk Alerts
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
            BeanHealth enables structured remote monitoring that helps <strong style={{ color: 'var(--accent-text)' }}>detect CKD deterioration 7–14 days earlier</strong>—reducing unplanned hospitalizations and giving nephrologists actionable patient intelligence.
          </p>
          {/* Quantified Outcome Badge */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '10px 20px',
              background: 'rgba(27, 67, 50, 0.08)',
              borderRadius: '30px',
              border: '1px solid rgba(27, 67, 50, 0.15)'
            }}>
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-text)' }} />
              <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Reduce CKD emergencies by 40%</span>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '10px 20px',
              background: 'rgba(27, 67, 50, 0.08)',
              borderRadius: '30px',
              border: '1px solid rgba(27, 67, 50, 0.15)'
            }}>
              <Bell className="w-5 h-5" style={{ color: 'var(--accent-text)' }} />
              <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Early warning alerts in real-time</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary" style={{
              boxShadow: '0 4px 20px rgba(27, 67, 50, 0.3)',
              fontSize: '1rem',
              padding: '16px 32px'
            }}>
              See CKD Workflow <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary" style={{
              background: 'white',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
            }}>How Alerts Work</Button>
          </div>
          <div className="mt-12" style={{ position: 'relative', perspective: '1000px' }}>
            {/* Animated Glow Background */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(27, 67, 50, 0.2) 0%, rgba(45, 106, 79, 0.15) 50%, rgba(27, 67, 50, 0.2) 100%)',
              borderRadius: '30px',
              filter: 'blur(60px)',
              animation: 'heroGlow 4s ease-in-out infinite alternate'
            }}></div>

            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '5%',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 100%)',
              animation: 'floatReverse 5s ease-in-out infinite',
              zIndex: 2
            }}></div>

            {/* Main Mockup Image Container */}
            <div className="hero-mockup-container" style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(27, 67, 50, 0.25), 0 10px 30px rgba(0, 0, 0, 0.1)',
              animation: 'heroFloat 6s ease-in-out infinite',
              transform: 'rotateX(2deg)',
              transformOrigin: 'center bottom'
            }}>
              {/* Mockup Image */}
              <img
                src="/dashboard-mockup.png"
                alt="BeanHealth Dashboard - CKD Patient Monitoring Platform"
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '20px'
                }}
              />

              {/* Shine Effect Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shine 3s ease-in-out infinite',
                pointerEvents: 'none'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="section-container gradient-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-12 scroll-fade-up">
            <h2 className="heading-2 section-header-modern section-header-center" style={{ display: 'inline-block' }}>
              CKD Care Isn't Broken by Science<br />
              It's Broken by Fragmentation
            </h2>
          </div>
          <p className="body-large text-center mb-12 scroll-fade-up" style={{ color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto 3rem' }}>
            Between clinic visits, <strong style={{ color: 'var(--accent-text)' }}>eGFR trends go untracked</strong>, fluid overload builds silently, and post-transplant critical windows pass without structured monitoring.
          </p>

          {/* Problem Flow - Icon-based for scannability */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 scroll-fade-up">
            <div className="modern-card text-center stagger-item" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.15) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <TrendingDown className="w-7 h-7" style={{ color: '#ef4444' }} />
              </div>
              <h3 className="product-card-title text-base mb-1">eGFR Decline</h3>
              <p className="body-small" style={{ fontSize: '0.8rem' }}>Gradual loss missed between visits</p>
            </div>

            <div className="modern-card text-center stagger-item" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.15) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Droplets className="w-7 h-7" style={{ color: '#ef4444' }} />
              </div>
              <h3 className="product-card-title text-base mb-1">Fluid Overload</h3>
              <p className="body-small" style={{ fontSize: '0.8rem' }}>Untracked BP and weight</p>
            </div>

            <div className="modern-card text-center stagger-item" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.15) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Calendar className="w-7 h-7" style={{ color: '#ef4444' }} />
              </div>
              <h3 className="product-card-title text-base mb-1">Post-Transplant Gaps</h3>
              <p className="body-small" style={{ fontSize: '0.8rem' }}>Critical 90-day windows unmonitored</p>
            </div>

            <div className="modern-card text-center stagger-item" style={{ padding: '1.5rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.15) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <AlertTriangle className="w-7 h-7" style={{ color: '#ef4444' }} />
              </div>
              <h3 className="product-card-title text-base mb-1">Emergency Admission</h3>
              <p className="body-small" style={{ fontSize: '0.8rem' }}>Preventable crisis from missed signs</p>
            </div>
          </div>

          {/* Who Suffers Layer */}
          <div className="scroll-fade-up" style={{ marginTop: '2rem' }}>
            <h3 className="text-center mb-6" style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Who Suffers?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Patient */}
              <div className="modern-card stagger-item" style={{
                padding: '1.25rem',
                borderLeft: '4px solid #ef4444',
                background: 'linear-gradient(135deg, white 0%, rgba(239, 68, 68, 0.02) 100%)'
              }}>
                <div className="flex items-center gap-3 mb-2">
                  <UserX className="w-5 h-5" style={{ color: '#ef4444' }} />
                  <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>Patient</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Delayed intervention, mounting anxiety, preventable deterioration
                </p>
              </div>

              {/* Doctor */}
              <div className="modern-card stagger-item" style={{
                padding: '1.25rem',
                borderLeft: '4px solid #f59e0b',
                background: 'linear-gradient(135deg, white 0%, rgba(245, 158, 11, 0.02) 100%)'
              }}>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5" style={{ color: '#f59e0b' }} />
                  <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>Nephrologist</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Blind spots between visits, reactive care instead of proactive
                </p>
              </div>

              {/* Hospital */}
              <div className="modern-card stagger-item" style={{
                padding: '1.25rem',
                borderLeft: '4px solid #6366f1',
                background: 'linear-gradient(135deg, white 0%, rgba(99, 102, 241, 0.02) 100%)'
              }}>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5" style={{ color: '#6366f1' }} />
                  <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>Hospital</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  ER overload, poor patient retention, revenue leakage
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gap in Telemedicine */}
      <section className="section-container" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="text-center mb-12 scroll-fade-up">
            <h2 className="heading-2 section-header-modern section-header-center" style={{ display: 'inline-block' }}>
              The Gap in Existing Telemedicine
            </h2>
          </div>
          <div className="comparison-modern max-w-3xl mx-auto scroll-scale">
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              background: 'var(--gradient-button)',
              color: 'white',
              fontWeight: '600',
              fontFamily: 'Poppins, system-ui, sans-serif'
            }}>
              <div style={{ padding: '1rem 1.25rem' }}>Feature</div>
              <div style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>Telemedicine</div>
              <div style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>BeanHealth</div>
            </div>
            {/* Rows */}
            {comparisonData.map((item, index) => (
              <div key={index} className="comparison-row-modern">
                <div className="body-medium font-medium">{item.feature}</div>
                <div style={{ justifyContent: 'center' }}>
                  {item.telemedicine ?
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--accent-wash)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                    </div> :
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <X className="w-4 h-4" style={{ color: '#ef4444' }} />
                    </div>
                  }
                </div>
                <div style={{ justifyContent: 'center' }}>
                  {item.beanhealth ?
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--accent-wash)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                    </div> :
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <X className="w-4 h-4" style={{ color: '#ef4444' }} />
                    </div>
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
          <div className="text-center mb-12 scroll-fade-up">
            <h2 className="heading-2 section-header-modern section-header-center" style={{ display: 'inline-block' }}>
              BeanHealth – The Complete CKD Workflow Platform
            </h2>
            <p className="body-large mt-6" style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1.5rem auto 0' }}>
              Three interconnected modules designed for complete renal care management
            </p>
          </div>
          <div className="ai-grid">
            <div className="modern-card scroll-slide-left" style={{ padding: '2rem' }}>
              <div className="icon-badge">
                <Activity className="w-7 h-7" style={{ color: 'var(--accent-text)' }} />
              </div>
              <h3 className="heading-3 mb-4">Patient App</h3>
              <ul className="space-y-3">
                {['Daily vitals logging (BP, weight, urine output)', 'Symptoms & lifestyle inputs', 'Medication compliance tracker', 'Instant risk reclassification', 'Integrated kit support (BP monitor, scales)'].map((item, i) => (
                  <li key={i} className="feature-item" style={{ padding: '0.5rem 0' }}>
                    <div className="feature-icon">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="body-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modern-card scroll-fade-up" style={{ padding: '2rem' }}>
              <div className="icon-badge">
                <BarChart3 className="w-7 h-7" style={{ color: 'var(--accent-text)' }} />
              </div>
              <h3 className="heading-3 mb-4">Nephrologist Intelligence Dashboard</h3>
              <ul className="space-y-3">
                {['Clinical classification engine', 'Report timeline + vitals graph', 'Auto-flagged red/amber cases', 'Follow-up recommendations', 'One-glance triage view with EMR export'].map((item, i) => (
                  <li key={i} className="feature-item" style={{ padding: '0.5rem 0' }}>
                    <div className="feature-icon">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="body-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modern-card scroll-slide-right" style={{ padding: '2rem' }}>
              <div className="icon-badge">
                <ClipboardList className="w-7 h-7" style={{ color: 'var(--accent-text)' }} />
              </div>
              <h3 className="heading-3 mb-4">Coordinator Workflow System</h3>
              <ul className="space-y-3">
                {['Follow-up calendar for CKD, dialysis & transplant', 'Pre-built care routines', 'Auto reminders based on post-transplant days', 'Visit preparation checklist', 'Patient-document organiser & communication log'].map((item, i) => (
                  <li key={i} className="feature-item" style={{ padding: '0.5rem 0' }}>
                    <div className="feature-icon">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="body-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-container gradient-section" style={{ overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-12 scroll-fade-up">
            <h2 className="heading-2 section-header-modern section-header-center" style={{ display: 'inline-block' }}>
              How BeanHealth Works
            </h2>
            <p className="body-large mt-6" style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1.5rem auto 0' }}>
              A complete closed-loop system from patient monitoring to clinical action
            </p>

            {/* Validation Layer Badges */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '8px 16px',
                background: 'white',
                borderRadius: '30px',
                border: '1px solid var(--border-light)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <ShieldCheck className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>Based on KDIGO Guidelines</span>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '8px 16px',
                background: 'white',
                borderRadius: '30px',
                border: '1px solid var(--border-light)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <Stethoscope className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>Nephrologist-Reviewed Protocols</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="workflow-carousel-wrapper">
          <div className="workflow-carousel">
            {/* First set of steps */}
            {workflowSteps.map((step) => (
              <div key={`first-${step.id}`} className="workflow-step-modern">
                <div className="stat-badge mb-4">{step.id}</div>
                <h3 className="heading-3 mb-3">{step.title}</h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{step.description}</p>
              </div>
            ))}
            {/* Duplicate for seamless loop animation */}
            {workflowSteps.map((step) => (
              <div key={`second-${step.id}`} className="workflow-step-modern">
                <div className="stat-badge mb-4">{step.id}</div>
                <h3 className="heading-3 mb-3">{step.title}</h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Human-in-the-Loop Banner */}
        <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(27, 67, 50, 0.05) 0%, rgba(27, 67, 50, 0.1) 100%)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            border: '1px solid rgba(27, 67, 50, 0.15)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--gradient-button)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Users className="w-6 h-6" style={{ color: 'white' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'var(--accent-text)',
                marginBottom: '0.25rem'
              }}>
                AI Assists, Doctor Decides
              </h4>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                maxWidth: '500px'
              }}>
                Our AI surfaces insights and flags risks — but every clinical decision remains with the treating nephrologist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-container" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div className="text-center mb-12 scroll-fade-up">
            <h2 className="heading-2 section-header-modern section-header-center" style={{ display: 'inline-block' }}>
              Complete Feature Set
            </h2>
            <p className="body-large mt-4" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
              Features organized by who uses them — tagged by deployment phase
            </p>
          </div>

          {/* Patient-Facing Features */}
          <div className="mb-10 scroll-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart className="w-5 h-5" style={{ color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)' }}>Patient-Facing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Daily Vitals Logging</h4>
                <p className="product-card-description">BP, weight, urine output with trend insights</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Medication Adherence</h4>
                <p className="product-card-description">Reminders and compliance tracking</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: '#6366f1'
                }}>Phase 2</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Device Kit Integration</h4>
                <p className="product-card-description">BP monitors & weighing scales auto-sync</p>
              </div>
            </div>
          </div>

          {/* Clinician-Facing Features */}
          <div className="mb-10 scroll-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-text) 0%, #22c55e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Stethoscope className="w-5 h-5" style={{ color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)' }}>Clinician-Facing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Smart CKD Staging</h4>
                <p className="product-card-description">AI-powered classification based on clinical guidelines</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Red-Flag Alerts</h4>
                <p className="product-card-description">Instant notifications for critical changes</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Document Timeline</h4>
                <p className="product-card-description">Organized view of labs, reports & notes</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: '#6366f1'
                }}>Phase 2</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Transplant Follow-Up Engine</h4>
                <p className="product-card-description">Post-transplant day-specific protocols</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: '#6366f1'
                }}>Phase 2</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Dialysis Monitoring</h4>
                <p className="product-card-description">Track sessions and complications</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Daily Vitals Analytics</h4>
                <p className="product-card-description">BP, weight & trends visualization</p>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Visualization */}
          <div className="mb-10 scroll-fade-up">
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '20px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border-light)'
            }}>
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(27, 67, 50, 0.05) 1px, transparent 0)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }}></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ position: 'relative', zIndex: 1 }}>
                {/* eGFR Trendline Graph */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>eGFR Trend</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Last 6 months</p>
                    </div>
                    <div style={{
                      padding: '4px 10px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: '#ef4444'
                    }}>↓ Declining</div>
                  </div>
                  {/* Animated Graph */}
                  <svg viewBox="0 0 300 120" style={{ width: '100%', height: '120px' }}>
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="300" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="90" x2="300" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                    {/* Y-axis labels */}
                    <text x="5" y="35" fill="#9ca3af" fontSize="10">90</text>
                    <text x="5" y="65" fill="#9ca3af" fontSize="10">60</text>
                    <text x="5" y="95" fill="#9ca3af" fontSize="10">30</text>
                    {/* Animated trend line */}
                    <path
                      d="M 30 40 Q 70 35, 100 45 T 150 55 T 200 70 T 250 85 T 290 95"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: '400',
                        strokeDashoffset: '400',
                        animation: 'drawLine 2s ease-out forwards'
                      }}
                    />
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    {/* Data points */}
                    <circle cx="100" cy="45" r="4" fill="#22c55e" style={{ animation: 'pulse 2s infinite' }} />
                    <circle cx="150" cy="55" r="4" fill="#f59e0b" style={{ animation: 'pulse 2s infinite 0.3s' }} />
                    <circle cx="200" cy="70" r="4" fill="#f59e0b" style={{ animation: 'pulse 2s infinite 0.6s' }} />
                    <circle cx="250" cy="85" r="4" fill="#ef4444" style={{ animation: 'pulse 2s infinite 0.9s' }} />
                    <circle cx="290" cy="95" r="6" fill="#ef4444" stroke="white" strokeWidth="2" style={{ animation: 'pulse 1.5s infinite' }} />
                  </svg>
                  <div className="flex justify-between mt-2" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                </div>

                {/* Alert Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Critical Alert */}
                  <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.15)',
                    borderLeft: '4px solid #ef4444',
                    animation: 'slideIn 0.5s ease-out, alertPulse 3s infinite'
                  }}>
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'pulse 2s infinite'
                      }}>
                        <AlertCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ef4444' }}>Critical Alert</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>2 min ago</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginTop: '2px' }}>
                          eGFR dropped to 28 — Stage 4 CKD threshold
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning Alert */}
                  <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.1)',
                    borderLeft: '4px solid #f59e0b',
                    animation: 'slideIn 0.5s ease-out 0.2s backwards'
                  }}>
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(245, 158, 11, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Bell className="w-5 h-5" style={{ color: '#f59e0b' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#f59e0b' }}>Weight Alert</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>1 hour ago</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginTop: '2px' }}>
                          +2.5kg in 3 days — possible fluid retention
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info Alert */}
                  <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 4px 15px rgba(27, 67, 50, 0.08)',
                    borderLeft: '4px solid var(--accent-text)',
                    animation: 'slideIn 0.5s ease-out 0.4s backwards'
                  }}>
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--accent-wash)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-text)' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-text)' }}>Compliance Good</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Today</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', marginTop: '2px' }}>
                          All medications logged for past 7 days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital Ops Features */}
          <div className="mb-10 scroll-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 className="w-5 h-5" style={{ color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)' }}>Hospital Operations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Coordinator Workflow</h4>
                <p className="product-card-description">Follow-up calendars & task automation</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'var(--accent-wash)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)'
                }}>MVP</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>Triage Automation</h4>
                <p className="product-card-description">Auto-prioritize patient cases by risk</p>
              </div>
              <div className="diff-card stagger-item" style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 10px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: '#6366f1'
                }}>Phase 2</span>
                <h4 className="product-card-title" style={{ marginBottom: '0.5rem' }}>EMR Export</h4>
                <p className="product-card-description">Seamless integration with hospital systems</p>
              </div>
            </div>
          </div>

          {/* Compliance & Security Section */}
          <div className="scroll-fade-up" style={{ marginTop: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(27, 67, 50, 0.03) 0%, rgba(27, 67, 50, 0.08) 100%)',
              borderRadius: '16px',
              padding: '1.5rem 2rem',
              border: '1px solid var(--border-light)'
            }}>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6" style={{ color: 'var(--accent-text)' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Security & Compliance</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>End-to-end data encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Complete audit trails</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Patient consent management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team Section */}
      <section id="founder" className="section-container" style={{ background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(27, 67, 50, 0.08) 100%)', paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className="heading-2 mb-10" style={{ position: 'relative' }}>
            The Founding Team
            <span style={{
              position: 'absolute',
              bottom: '-8px',
              left: '0',
              width: '60px',
              height: '4px',
              background: 'var(--gradient-button)',
              borderRadius: '2px'
            }}></span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Founder Card - Left Side */}
            <div className="founder-card" style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 10px 40px rgba(27, 67, 50, 0.12)',
              overflow: 'hidden',
              minWidth: '280px',
              maxWidth: '320px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src="https://customer-assets.emergentagent.com/job_med-dashboard-demo/artifacts/y5nca439_image.png"
                  alt="Harish S, Founder & CEO"
                  className="object-cover w-full"
                  style={{
                    height: '320px',
                    objectPosition: 'top center',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '80px',
                  background: 'linear-gradient(to top, rgba(27, 67, 50, 0.9), transparent)'
                }}></div>
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 className="heading-3" style={{ marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Harish S</h3>
                <p style={{
                  color: 'var(--accent-text)',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  marginBottom: '1rem'
                }}>
                  Founder & CEO
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href="mailto:harish@beanhealth.in"
                    className="inline-flex items-center justify-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--accent-wash)',
                      color: 'var(--accent-text)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harish-s-espresso/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#0077B5',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Vision & Description - Right Side */}
            <div className="flex-1 flex flex-col justify-center" style={{ paddingTop: '1rem' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Accent decoration */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '4px',
                  height: '100%',
                  background: 'var(--gradient-button)'
                }}></div>

                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)',
                  marginBottom: '1rem',
                  fontFamily: 'Poppins, system-ui, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <HeartPulse className="w-5 h-5" />
                  Building the Future of Kidney Care
                </h4>

                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  color: 'var(--text-body)',
                  marginBottom: '1.5rem'
                }}>
                  Leading the architecture and development of a <strong style={{ color: 'var(--accent-text)' }}>connected healthtech platform</strong> for continuous, data-driven management of chronic diseases.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--accent-wash)',
                    borderRadius: '10px'
                  }}>
                    <Activity className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)', marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Biosensor & Device Integration</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--accent-wash)',
                    borderRadius: '10px'
                  }}>
                    <BarChart3 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)', marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Data Analytics Pipelines</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--accent-wash)',
                    borderRadius: '10px'
                  }}>
                    <Stethoscope className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)', marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Clinical Decision Layers</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--accent-wash)',
                    borderRadius: '10px'
                  }}>
                    <LineChart className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-text)', marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Scalable Infrastructure</span>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1rem'
                }}>
                  "Driving Product, Technology, and Business strategy to translate the solution into a scalable chronic-care infrastructure for the next generation of Telemedicine."
                </p>
              </div>
            </div>
          </div>

          {/* Development Team */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Development Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Developer 1 - Jnani */}
              <div className="developer-card" style={{
                background: 'white',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Floating Tech Icons */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #61DAFB 0%, #21a1c4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'float 4s ease-in-out infinite',
                  boxShadow: '0 4px 12px rgba(97, 218, 251, 0.3)'
                }}>
                  <Code className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #68A063 0%, #3C873A 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'floatReverse 5s ease-in-out infinite',
                  boxShadow: '0 4px 12px rgba(60, 135, 58, 0.3)'
                }}>
                  <Database className="w-4 h-4" style={{ color: 'white' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '25px',
                  left: '25px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #F7DF1E 0%, #d4b806 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'float 6s ease-in-out infinite 1s',
                  boxShadow: '0 4px 12px rgba(247, 223, 30, 0.3)'
                }}>
                  <Zap className="w-4 h-4" style={{ color: '#333' }} />
                </div>

                {/* Profile Image - 30% bigger */}
                <div style={{
                  position: 'relative',
                  marginBottom: '1.5rem'
                }}>
                  <img
                    src="/jnani-profile.png"
                    alt="Bonthu Jnani Venkata Ratna Kumar"
                    style={{
                      width: '156px',
                      height: '156px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '5px solid var(--accent-wash)',
                      boxShadow: '0 12px 35px rgba(27, 67, 50, 0.2)',
                      animation: 'pulse 3s ease-in-out infinite'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--gradient-button)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid white',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
                  }}>
                    <Monitor className="w-4 h-4" style={{ color: 'white' }} />
                  </div>
                </div>

                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>Bonthu Jnani Venkata Ratna Kumar</h4>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'var(--accent-wash)',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)',
                  marginBottom: '1rem'
                }}>
                  Full Stack Developer
                </span>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  maxWidth: '280px',
                  marginBottom: '1rem'
                }}>
                  Building robust backend systems and intuitive user interfaces for seamless patient care experiences.
                </p>

                {/* Tech Stack Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                  <span style={{ padding: '4px 10px', background: '#e3f2fd', borderRadius: '12px', fontSize: '0.7rem', color: '#1976d2', fontWeight: '500' }}>React</span>
                  <span style={{ padding: '4px 10px', background: '#e8f5e9', borderRadius: '12px', fontSize: '0.7rem', color: '#388e3c', fontWeight: '500' }}>Node.js</span>
                  <span style={{ padding: '4px 10px', background: '#fff3e0', borderRadius: '12px', fontSize: '0.7rem', color: '#f57c00', fontWeight: '500' }}>MongoDB</span>
                </div>

                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/bonthu-jnani-venkata-ratna-kumar-314874165/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)',
                    borderRadius: '25px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 119, 181, 0.3)'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 119, 181, 0.4)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 119, 181, 0.3)'; }}
                >
                  <Linkedin className="w-4 h-4" />
                  Connect
                </a>
              </div>

              {/* Developer 2 - Saran */}
              <div className="developer-card" style={{
                background: 'white',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Floating Tech Icons */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'float 5s ease-in-out infinite',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                }}>
                  <Smartphone className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'floatReverse 4s ease-in-out infinite',
                  boxShadow: '0 4px 12px rgba(101, 31, 255, 0.3)'
                }}>
                  <Wifi className="w-4 h-4" style={{ color: 'white' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '25px',
                  right: '25px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #26C6DA 0%, #00ACC1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'float 6s ease-in-out infinite 0.5s',
                  boxShadow: '0 4px 12px rgba(0, 172, 193, 0.3)'
                }}>
                  <Cpu className="w-4 h-4" style={{ color: 'white' }} />
                </div>

                {/* Profile Image - 30% bigger */}
                <div style={{
                  position: 'relative',
                  marginBottom: '1.5rem'
                }}>
                  <img
                    src="/saran-profile.png"
                    alt="Saran Kathiravan"
                    style={{
                      width: '156px',
                      height: '156px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '5px solid var(--accent-wash)',
                      boxShadow: '0 12px 35px rgba(27, 67, 50, 0.2)',
                      animation: 'pulse 3s ease-in-out infinite 0.5s'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid white',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
                  }}>
                    <Smartphone className="w-4 h-4" style={{ color: 'white' }} />
                  </div>
                </div>

                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>Saran Kathiravan</h4>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'var(--accent-wash)',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--accent-text)',
                  marginBottom: '1rem'
                }}>
                  Mobile & IoT Developer
                </span>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  maxWidth: '280px',
                  marginBottom: '1rem'
                }}>
                  Developing mobile applications and device integrations for real-time health monitoring.
                </p>

                {/* Tech Stack Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                  <span style={{ padding: '4px 10px', background: '#e3f2fd', borderRadius: '12px', fontSize: '0.7rem', color: '#1976d2', fontWeight: '500' }}>Flutter</span>
                  <span style={{ padding: '4px 10px', background: '#f3e5f5', borderRadius: '12px', fontSize: '0.7rem', color: '#7b1fa2', fontWeight: '500' }}>IoT</span>
                  <span style={{ padding: '4px 10px', background: '#e0f7fa', borderRadius: '12px', fontSize: '0.7rem', color: '#0097a7', fontWeight: '500' }}>BLE</span>
                </div>

                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/saran-kathiravan17/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)',
                    borderRadius: '25px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 119, 181, 0.3)'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 119, 181, 0.4)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 119, 181, 0.3)'; }}
                >
                  <Linkedin className="w-4 h-4" />
                  Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-container">
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

          {!isSubmitted ? (
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
          ) : (
            <Card className="product-card success-card">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="success-animation mb-6">
                  <CheckCircle2 className="success-icon" style={{ color: 'var(--accent-text)' }} />
                </div>
                <h3 className="heading-3 mb-4" style={{ color: 'var(--accent-text)' }}>
                  Request Successfully Sent!
                </h3>
                <p className="body-large mb-4" style={{ color: 'var(--text-body)' }}>
                  Thank you for your interest in BeanHealth.
                </p>
                <p className="body-medium mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Our team will review your request and get back to you within <strong>24 hours</strong> to schedule a personalized demo of our CKD care platform.
                </p>
                <div className="success-details" style={{
                  background: 'var(--accent-wash)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)'
                }}>
                  <p className="body-small mb-2" style={{ color: 'var(--text-secondary)' }}>
                    In the meantime, feel free to explore our website or reach out directly:
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Mail className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                    <a href="mailto:harish@beanhealth.in" className="link-text body-medium">
                      harish@beanhealth.in
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Phone className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                    <a href="tel:+917558111310" className="link-text body-medium">
                      +91 75581 11310
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
