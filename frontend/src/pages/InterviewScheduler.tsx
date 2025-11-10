import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Plus, Check, X, Mail, Phone } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'virtual' | 'in-person';
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const InterviewScheduler: React.FC = () => {
  const [interviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      date: '2025-11-15',
      time: '10:00 AM',
      type: 'virtual',
      interviewer: 'John Smith',
      status: 'scheduled'
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      position: 'Backend Engineer',
      date: '2025-11-15',
      time: '2:00 PM',
      type: 'in-person',
      interviewer: 'Emily Davis',
      status: 'scheduled'
    },
    {
      id: '3',
      candidateName: 'Jessica Williams',
      position: 'Full Stack Developer',
      date: '2025-11-16',
      time: '11:00 AM',
      type: 'virtual',
      interviewer: 'Robert Brown',
      status: 'completed'
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusIcon = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gray-900">Interview </span>
              <span className="gradient-text">Scheduler</span>
            </h1>
            <p className="text-gray-600 text-xl">Manage all your interviews in one place</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover-lift">
          <div className="p-6">
            <Clock className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-3xl font-bold mb-1">12</h3>
            <p className="text-blue-100">Scheduled Today</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white hover-lift">
          <div className="p-6">
            <Calendar className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-3xl font-bold mb-1">45</h3>
            <p className="text-purple-100">This Week</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white hover-lift">
          <div className="p-6">
            <Check className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-3xl font-bold mb-1">38</h3>
            <p className="text-green-100">Completed</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white hover-lift">
          <div className="p-6">
            <User className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-3xl font-bold mb-1">8</h3>
            <p className="text-amber-100">Pending Feedback</p>
          </div>
        </Card>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interview List */}
        <Card className="lg:col-span-2">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 -m-6 mb-6 rounded-t-2xl">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Upcoming Interviews
            </h2>
          </div>
          
          <div className="space-y-4">
            {interviews.map((interview, index) => (
              <div
                key={interview.id}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {interview.candidateName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{interview.candidateName}</h3>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 border ${getStatusColor(interview.status)}`}>
                    {getStatusIcon(interview.status)}
                    <span className="capitalize">{interview.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span className="text-sm">{new Date(interview.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm">{interview.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    {interview.type === 'virtual' ? (
                      <Video className="w-4 h-4 mr-2 text-blue-600" />
                    ) : (
                      <MapPin className="w-4 h-4 mr-2 text-pink-600" />
                    )}
                    <span className="text-sm capitalize">{interview.type}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{interview.interviewer}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  {interview.type === 'virtual' && (
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600">
                      <Video className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions & Calendar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card>
            <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              Calendar
            </h3>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-xs font-bold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all ${
                      day === 15 || day === 16
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold shadow-lg'
                        : 'bg-white hover:bg-indigo-100 text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="text-xl font-bold mb-4 text-gray-900">This Week's Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Monday</span>
                <span className="text-sm font-bold text-blue-600">3 interviews</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Tuesday</span>
                <span className="text-sm font-bold text-purple-600">5 interviews</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Wednesday</span>
                <span className="text-sm font-bold text-pink-600">4 interviews</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Thursday</span>
                <span className="text-sm font-bold text-green-600">2 interviews</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Friday</span>
                <span className="text-sm font-bold text-amber-600">6 interviews</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <Card className="max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 -m-6 mb-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Schedule New Interview</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Candidate Name
                </label>
                <Input placeholder="Enter candidate name" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position
                </label>
                <Input placeholder="Enter position" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <Input type="time" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interview Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-indigo-500 bg-indigo-50 rounded-xl font-semibold text-indigo-700 hover:bg-indigo-100 transition-all">
                    <Video className="w-5 h-5 mx-auto mb-2" />
                    Virtual
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                    <MapPin className="w-5 h-5 mx-auto mb-2" />
                    In-Person
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interviewer
                </label>
                <Input placeholder="Select interviewer" />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600"
                  onClick={() => setShowModal(false)}
                >
                  Schedule Interview
                </Button>
                <Button 
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;
