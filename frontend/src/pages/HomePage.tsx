import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Upload, LayoutDashboard, Zap, Shield, TrendingUp } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

/**
 * Home Page - Landing page for Recrutix
 */
const HomePage: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Smart Resume Parsing',
      description: 'Upload resumes in PDF or DOCX format. Our AI extracts all relevant information automatically.',
    },
    {
      icon: Target,
      title: 'AI-Powered Matching',
      description: 'Input your job description and let AI rank candidates based on perfect skill match.',
    },
    {
      icon: LayoutDashboard,
      title: 'Recruiter Dashboard',
      description: 'Manage all candidates in one place with advanced filtering and search capabilities.',
    },
  ];

  const benefits = [
    { icon: Zap, text: 'Save 80% time on candidate screening' },
    { icon: Shield, text: 'Unbiased AI-driven recommendations' },
    { icon: TrendingUp, text: 'Improve hiring quality and speed' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-6">
              <Brain className="h-16 w-16" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Welcome to <span className="text-primary-100">Recrutix</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              AI-powered recruitment platform that finds the perfect candidates for your job openings.
              Hire smarter, not harder.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/upload">
                <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Resume
                </Button>
              </Link>
              <Link to="/match">
                <Button variant="ghost" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                  <Target className="h-5 w-5 mr-2" />
                  Find Matches
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Powerful Features for Modern Recruiting
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to streamline your hiring process and find the best talent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">Why Choose Recrutix?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-card">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-lg font-semibold text-dark-900">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start using Recrutix today and experience the future of recruitment.
          </p>
          <Link to="/dashboard">
            <Button variant="primary" size="lg">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
