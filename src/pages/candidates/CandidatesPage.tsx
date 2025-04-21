import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, UserCircle, Download, Filter } from 'lucide-react';
import AddCandidateModal from './components/AddCandidateModal';

// Dummy data for candidates
const initialCandidates = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    position: 'Frontend Developer',
    experience: '3',
    status: 'Interviewing',
    appliedDate: '2023-05-15',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '(234) 567-8901',
    position: 'UX Designer',
    experience: '5',
    status: 'Selected',
    appliedDate: '2023-05-10',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '(345) 678-9012',
    position: 'Project Manager',
    experience: '7',
    status: 'Interviewing',
    appliedDate: '2023-05-12',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '(456) 789-0123',
    position: 'Backend Developer',
    experience: '4',
    status: 'Rejected',
    appliedDate: '2023-05-08',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '(567) 890-1234',
    position: 'Full Stack Developer',
    experience: '6',
    status: 'Pending',
    appliedDate: '2023-05-17',
  },
];

const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter candidates based on search term and status filter
  const filterCandidates = () => {
    let filtered = candidates;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((candidate) => candidate.status === statusFilter);
    }
    
    setFilteredCandidates(filtered);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  // Apply filters when search term or status filter changes
  React.useEffect(() => {
    filterCandidates();
  }, [searchTerm, statusFilter]);
  
  // Handle adding a new candidate
  const handleAddCandidate = (candidate: any) => {
    const newCandidate = {
      id: (candidates.length + 1).toString(),
      ...candidate,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    
    setCandidates([newCandidate, ...candidates]);
    setFilteredCandidates([newCandidate, ...filteredCandidates]);
    setIsAddModalOpen(false);
  };
  
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
  
  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Candidates</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary rounded-full flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Candidate</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="card mb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input */}
          <div className="form-group mb-0 col-span-2">
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Status filter */}
          <div className="form-group mb-0">
            <div className="relative flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter size={18} className="text-neutral-500" />
              </div>
              <select
                className="pl-10"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates list */}
      <div className="card-main">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Candidates Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate,index) => (
                  <tr key={candidate.id}>
                    <td>{index + 1}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        
                        <div className="flex">
                          <Link
                            to={`/candidates/${candidate.id}`}
                            className="font-medium hover:text-primary"
                          >
                            {candidate.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>{candidate.email}</td>
                    <td>{candidate.phone}</td>
                    <td>{candidate.position}</td>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(
                          candidate.status
                        )}`}
                      >
                        {candidate.status}
                      </span>
                    </td>
                    <td>{candidate.experience}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            downloadResume(candidate.id, candidate.name)
                          }
                          className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-100 rounded"
                          title="Download Resume"
                        >
                          <Download size={18} />
                        </button>
                        <Link
                          to={`/candidates/${candidate.id}`}
                          className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-100 rounded"
                          title="View Details"
                        >
                          <span>View</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No candidates found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <AddCandidateModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCandidate}
        />
      )}
    </div>
  );
};

export default CandidatesPage;