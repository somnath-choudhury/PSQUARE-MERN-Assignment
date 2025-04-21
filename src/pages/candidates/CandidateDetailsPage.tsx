import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Download, UserCircle, Edit, Trash, Check } from 'lucide-react';

// Dummy data for candidates
const initialCandidates = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    position: 'Frontend Developer',
    experience: '3 years',
    status: 'Interviewing',
    appliedDate: '2023-05-15',
    education: 'Bachelor of Science in Computer Science',
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'],
    address: '123 Main St, Anytown, USA',
    notes: 'Good communication skills. Passed the first technical interview.',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '(234) 567-8901',
    position: 'UX Designer',
    experience: '5 years',
    status: 'Selected',
    appliedDate: '2023-05-10',
    education: 'Master of Fine Arts in Design',
    skills: ['UI/UX', 'Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    address: '456 Oak Ave, Somewhere, USA',
    notes: 'Excellent portfolio. Ready to be moved to employee status.',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '(345) 678-9012',
    position: 'Project Manager',
    experience: '7 years',
    status: 'Interviewing',
    appliedDate: '2023-05-12',
    education: 'MBA in Project Management',
    skills: ['Agile', 'Scrum', 'Team Leadership', 'Budget Management'],
    address: '789 Pine St, Elsewhere, USA',
    notes: 'Strong leadership background. Scheduled for final interview next week.',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '(456) 789-0123',
    position: 'Backend Developer',
    experience: '4 years',
    status: 'Rejected',
    appliedDate: '2023-05-08',
    education: 'Bachelor of Engineering in Software',
    skills: ['Node.js', 'Python', 'MongoDB', 'SQL', 'Express'],
    address: '101 Maple Dr, Nowhere, USA',
    notes: 'Technical skills did not match our requirements.',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '(567) 890-1234',
    position: 'Full Stack Developer',
    experience: '6 years',
    status: 'Pending',
    appliedDate: '2023-05-17',
    education: 'Master of Science in Information Technology',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    address: '202 Cedar St, Anywhere, USA',
    notes: 'Waiting for initial screening call.',
  },
];

const CandidateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [candidate, setCandidate] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCandidate, setEditedCandidate] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Get candidate data based on ID
  useEffect(() => {
    const foundCandidate = initialCandidates.find((c) => c.id === id);
    if (foundCandidate) {
      setCandidate(foundCandidate);
      setEditedCandidate(foundCandidate);
    } else {
      // Handle case when candidate is not found
      navigate('/candidates');
    }
  }, [id, navigate]);
  
  if (!candidate) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Selected':
        return 'badge-success';
      case 'Interviewing':
        return 'badge-warning';
      case 'Rejected':
        return 'badge-error';
      default:
        return 'bg-neutral-200 text-neutral-700';
    }
  };
  
  // Mock function to download resume
  const downloadResume = (id: string, name: string) => {
    alert(`Downloading resume for ${name}`);
    // In a real application, this would trigger a download from the server
  };
  
  // Move candidate to employee
  const moveToEmployee = () => {
    alert(`${candidate.name} has been moved to employees`);
    navigate('/employees');
    // In a real application, this would make an API call and then redirect
  };
  
  // Update candidate
  const handleUpdate = () => {
    setCandidate(editedCandidate);
    setIsEditing(false);
    // In a real application, this would make an API call to update the candidate
  };
  
  // Handle input change in edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCandidate({
      ...editedCandidate,
      [name]: value,
    });
  };
  
  // Delete candidate
  const handleDelete = () => {
    if (confirmDelete) {
      // In a real application, this would make an API call to delete the candidate
      alert(`${candidate.name} has been deleted`);
      navigate('/candidates');
    } else {
      setConfirmDelete(true);
    }
  };
  
  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link to="/candidates" className="text-primary flex items-center gap-1">
          <ChevronLeft size={16} />
          <span>Back to Candidates</span>
        </Link>
      </div>
      
      <div className="dashboard-header">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center">
            <UserCircle size={24} className="text-neutral-700" />
          </div>
          <div>
            <h1 className="dashboard-title mb-1">{candidate.name}</h1>
            <div className="flex items-center gap-2">
              <span className={`badge ${getStatusBadgeClass(candidate.status)}`}>
                {candidate.status}
              </span>
              <span className="text-neutral-500 text-sm">Applied on {candidate.appliedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-actions">
          {candidate.status === 'Selected' && (
            <button
              onClick={moveToEmployee}
              className="btn btn-success flex items-center gap-2"
            >
              <Check size={16} />
              <span>Move to Employee</span>
            </button>
          )}
          
          <button
            onClick={() => downloadResume(candidate.id, candidate.name)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </button>
          
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
              
              <button
                onClick={handleDelete}
                className={`btn ${confirmDelete ? 'btn-error' : 'btn-outline'} flex items-center gap-2`}
              >
                <Trash size={16} />
                <span>{confirmDelete ? 'Confirm Delete' : 'Delete'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="btn btn-primary flex items-center gap-2"
              >
                <Check size={16} />
                <span>Save Changes</span>
              </button>
              
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedCandidate(candidate);
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="card md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedCandidate.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedCandidate.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={editedCandidate.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editedCandidate.address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group md:col-span-2">
                <label htmlFor="education">Education</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={editedCandidate.education}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Full Name</p>
                <p className="font-medium">{candidate.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Phone</p>
                <p className="font-medium">{candidate.phone}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Address</p>
                <p className="font-medium">{candidate.address}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-neutral-500">Education</p>
                <p className="font-medium">{candidate.education}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Application Details */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Application Details</h2>
          
          {isEditing ? (
            <>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={editedCandidate.position}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={editedCandidate.experience}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={editedCandidate.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-neutral-500">Position</p>
                <p className="font-medium">{candidate.position}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-neutral-500">Experience</p>
                <p className="font-medium">{candidate.experience}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-neutral-500">Applied Date</p>
                <p className="font-medium">{candidate.appliedDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Status</p>
                <span className={`badge ${getStatusBadgeClass(candidate.status)} mt-1`}>
                  {candidate.status}
                </span>
              </div>
            </>
          )}
        </div>
        
        {/* Skills and Notes */}
        <div className="card md:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Skills & Notes</h2>
          
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="skills">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={Array.isArray(editedCandidate.skills) ? editedCandidate.skills.join(', ') : editedCandidate.skills}
                  onChange={(e) => setEditedCandidate({
                    ...editedCandidate,
                    skills: e.target.value.split(',').map((skill) => skill.trim()),
                  })}
                  placeholder="Separate skills with commas"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={editedCandidate.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="border border-neutral-300 rounded p-2 w-full"
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500 mb-2">Notes</p>
                <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                  <p>{candidate.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage;