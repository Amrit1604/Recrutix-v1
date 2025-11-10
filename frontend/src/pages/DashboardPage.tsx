import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Search, Trash2,
  Briefcase, Award, Clock, Target, Zap, BarChart3, Activity,
  XCircle, ArrowUp, ArrowDown, Eye, Download
} from 'lucide-react';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Candidate, CandidateStats } from '../types/candidate.types';
import candidateService from '../services/candidate.service';
import { formatDate } from '../utils/formatters';
import { 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';

/**
 * Dashboard Page - Premium Recruiter Command Center
 */
const DashboardPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<CandidateStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Enhanced chart data
  const trendData = [
    { month: 'Jan', candidates: 45, interviews: 34, hired: 12 },
    { month: 'Feb', candidates: 52, interviews: 41, hired: 15 },
    { month: 'Mar', candidates: 68, interviews: 52, hired: 18 },
    { month: 'Apr', candidates: 73, interviews: 58, hired: 22 },
    { month: 'May', candidates: 89, interviews: 71, hired: 28 },
    { month: 'Jun', candidates: 95, interviews: 78, hired: 31 },
  ];

  const skillsData = [
    { name: 'JavaScript', value: 145, color: '#6366f1' },
    { name: 'Python', value: 132, color: '#8b5cf6' },
    { name: 'Java', value: 98, color: '#ec4899' },
    { name: 'React', value: 124, color: '#f59e0b' },
    { name: 'Node.js', value: 87, color: '#10b981' },
    { name: 'AI/ML', value: 65, color: '#3b82f6' },
  ];

  const pipelineStages = [
    { stage: 'Applied', count: 156, percentage: 100, color: 'bg-indigo-500' },
    { stage: 'Screening', count: 89, percentage: 57, color: 'bg-purple-500' },
    { stage: 'Interview', count: 45, percentage: 29, color: 'bg-pink-500' },
    { stage: 'Offer', count: 23, percentage: 15, color: 'bg-amber-500' },
    { stage: 'Hired', count: 18, percentage: 12, color: 'bg-green-500' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError('');

    try {
      const [candidatesData, statsData] = await Promise.all([
        candidateService.getAllCandidates(),
        candidateService.getCandidateStats(),
      ]);

      setCandidates(candidatesData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this candidate?')) return;

    try {
      await candidateService.deleteCandidate(id);
      setCandidates(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete candidate');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadData();
      return;
    }

    try {
      const results = await candidateService.searchCandidates(searchQuery);
      setCandidates(results);
    } catch (err: any) {
      setError(err.message || 'Search failed');
    }
  };

  const filteredCandidates = searchQuery
    ? candidates.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : candidates;

  // Enhanced stat card component
  const StatCard: React.FC<{
    icon: React.ReactElement;
    title: string;
    value: string | number;
    change: number;
    color: string;
  }> = ({ icon, title, value, change, color }) => (
    <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-10 ${color} rounded-full`} />
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${color.replace('bg-', 'text-')}` })}
          </div>
          <div className={`flex items-center text-sm font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto mb-4" />
          <Loader text="Loading your command center..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8">
      {/* Premium Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gray-900">Welcome to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Recrutix
              </span>
            </h1>
            <p className="text-gray-600 text-xl">Your AI-Powered Recruitment Command Center</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Zap className="w-5 h-5 mr-2" />
              Quick Actions
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users />}
            title="Total Candidates"
            value={stats.total}
            change={12.5}
            color="bg-indigo-500"
          />
          <StatCard
            icon={<Briefcase />}
            title="Active Positions"
            value={24}
            change={8.2}
            color="bg-purple-500"
          />
          <StatCard
            icon={<Calendar />}
            title="Interviews Scheduled"
            value={stats.thisWeek}
            change={15.3}
            color="bg-pink-500"
          />
          <StatCard
            icon={<Award />}
            title="Placement Rate"
            value={`${Math.round(stats.avgMatchScore * 100)}%`}
            change={5.1}
            color="bg-amber-500"
          />
        </div>
      )}

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recruitment Trends Chart */}
        <Card className="lg:col-span-2 p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-indigo-600" />
              Recruitment Trends
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="candidates" stroke="#6366f1" fillOpacity={1} fill="url(#colorCandidates)" name="Candidates" />
              <Area type="monotone" dataKey="hired" stroke="#10b981" fillOpacity={1} fill="url(#colorHired)" name="Hired" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Skills */}
        <Card className="p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Target className="w-6 h-6 mr-2 text-purple-600" />
              Top Skills
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {skillsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Pipeline Funnel */}
      <Card className="p-6 mb-8 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
            Recruitment Pipeline
          </h2>
        </div>
        <div className="space-y-4">
          {pipelineStages.map((stage) => (
            <div key={stage.stage} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-700">{stage.stage}</span>
                <span className="text-sm font-bold text-gray-900">{stage.count} candidates</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full ${stage.color} transition-all duration-700 group-hover:opacity-90 shadow-lg`}
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Enhanced Search and Actions */}
      <Card className="p-6 mb-8 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="🔍 Search candidates by name, skills, or experience..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="text-lg"
            />
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleSearch} className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Eye className="h-5 w-5 mr-2" />
              View All
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['All', 'New', 'In Review', 'Shortlisted', 'Interviewed'].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-white border-2 border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 transform hover:scale-105"
            >
              {filter}
            </button>
          ))}
        </div>
      </Card>

      {error && (
        <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-600 rounded-xl shadow-lg animate-shake">
          <div className="flex items-center">
            <XCircle className="w-6 h-6 text-red-600 mr-3" />
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* Premium Candidates Table */}
      <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Candidate Database
          </h2>
          <p className="text-indigo-100 mt-1">Manage and track all your candidates in one place</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Skills & Expertise
                </th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Current Position
                </th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Match Score
                </th>
                <th className="text-center py-5 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <Users className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-xl font-semibold text-gray-500 mb-2">No candidates found</p>
                      <p className="text-gray-400">Upload some resumes to get started with AI-powered matching!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((candidate, index) => (
                  <tr 
                    key={candidate.id} 
                    className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{candidate.name}</div>
                          {candidate.location && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {candidate.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-sm text-gray-700 font-medium">{candidate.email}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(candidate.uploadedAt)}</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 4).map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200 hover:scale-105 transition-transform"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                            +{candidate.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      {candidate.experience.length > 0 ? (
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.experience[0].position}</div>
                          <div className="text-sm text-gray-600">{candidate.experience[0].company}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No experience listed</span>
                      )}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(candidate.matchScore || 0.75) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {Math.round((candidate.matchScore || 0.75) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(candidate.id)}
                          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
