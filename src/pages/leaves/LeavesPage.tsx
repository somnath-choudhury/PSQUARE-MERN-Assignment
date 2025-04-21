import React, { useState } from 'react';
import { Search, Filter, Calendar, Plus, UserCircle, Download, FileText } from 'lucide-react';
import AddLeaveModal from './components/AddLeaveModal';

// Dummy data for leaves
const initialLeaves = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "James Wilson",
    leaveType: "Vacation",
    startDate: "2023-06-01",
    endDate: "2023-06-03",
    position: "Senior Backend Developer",
    duration: 3,
    reason: "Family vacation",
    status: "Approved",
    appliedDate: "2023-05-15",
    document: "vacation_plan.pdf",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Emma Davis",
    leaveType: "Sick",
    startDate: "2023-05-25",
    endDate: "2023-05-25",
    position: "Senior Frontend Developer",
    duration: 1,
    reason: "Not feeling well",
    status: "Approved",
    appliedDate: "2023-05-24",
    document: "medical_certificate.pdf",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Robert Miller",
    leaveType: "Personal",
    startDate: "2023-06-10",
    endDate: "2023-06-11",
    position: "Senior Designer",
    duration: 2,
    reason: "Personal matter to attend",
    status: "Pending",
    appliedDate: "2023-05-20",
    document: null,
  },
  {
    id: "4",
    employeeId: "5",
    employeeName: "William Brown",
    leaveType: "Vacation",
    startDate: "2023-07-01",
    endDate: "2023-07-05",
    position: "Head UI/UX Designer",
    duration: 5,
    reason: "Summer vacation",
    status: "Approved",
    appliedDate: "2023-05-18",
    document: "vacation_plan.pdf",
  },
];

const LeavesPage: React.FC = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filteredLeaves, setFilteredLeaves] = useState(initialLeaves);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter leaves based on search term, status, and type
  const filterLeaves = () => {
    let filtered = leaves;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (leave) =>
          leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((leave) => leave.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter((leave) => leave.leaveType === typeFilter);
    }
    
    setFilteredLeaves(filtered);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  // Handle type filter change
  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };
  
  // Apply filters when search term, status, or type filter changes
  React.useEffect(() => {
    filterLeaves();
  }, [searchTerm, statusFilter, typeFilter]);
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'badge-success';
      case 'Pending':
        return 'badge-warning';
      case 'Rejected':
        return 'badge-error';
      default:
        return 'bg-neutral-200 text-neutral-700';
    }
  };
  
  // Handle adding a new leave
  const handleAddLeave = (leave: any) => {
    const newLeave = {
      id: (leaves.length + 1).toString(),
      ...leave,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    
    setLeaves([newLeave, ...leaves]);
    setFilteredLeaves([newLeave, ...filteredLeaves]);
    setIsAddModalOpen(false);
  };
  
  // Update leave status
  const updateLeaveStatus = (id: string, status: string) => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === id ? { ...leave, status } : leave
    );
    
    setLeaves(updatedLeaves);
    setFilteredLeaves(
      filteredLeaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };
  
  // Mock function to download document
  const downloadDocument = (id: string, document: string | null) => {
    if (!document) {
      alert('No document available for download');
      return;
    }
    
    alert(`Downloading document: ${document}`);
    // In a real application, this would trigger a download from the server
  };
  
  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Leaves</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          <span className='rounded-full'>Add Leave</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="card mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input */}
          <div className="mb-0">
            <div className="flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search by employee or reason..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Status filter */}
          <div className="form-group mb-0">
            <div className="flex">
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
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Type filter */}
          <div className="form-group mb-0">
            <div className="flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-neutral-500" />
              </div>
              <select
                className="pl-10"
                value={typeFilter}
                onChange={handleTypeFilterChange}
              >
                <option value="All">All Leave Types</option>
                <option value="Vacation">Vacation</option>
                <option value="Sick">Sick</option>
                <option value="Personal">Personal</option>
                <option value="Maternity">Maternity</option>
                <option value="Paternity">Paternity</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Leaves list */}
      <div className="card-main">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>
                      <div className="bg-neutral-100 rounded-full w-10 h-10 flex items-center justify-center">
                        <UserCircle size={20} className="text-neutral-500" />
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{leave.employeeName}</p>
                          <p className="text-sm text-neutral-500">
                            {leave.position}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{leave.startDate}</td>
                    <td>
                      {leave.reason}
                    </td>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(leave.status)}`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {leave.document && (
                          <button
                            onClick={() =>
                              downloadDocument(leave.id, leave.document)
                            }
                            className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-100 rounded"
                            title="Download Document"
                          >
                            <Download size={18} />
                          </button>
                        )}

                        {leave.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateLeaveStatus(leave.id, "Approved")
                              }
                              className="p-2 text-success hover:bg-success-light hover:bg-opacity-10 rounded"
                              title="Approve Leave"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                updateLeaveStatus(leave.id, "Rejected")
                              }
                              className="p-2 text-error hover:bg-error-light hover:bg-opacity-10 rounded"
                              title="Reject Leave"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No leaves found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Leave Modal */}
      {isAddModalOpen && (
        <AddLeaveModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddLeave}
        />
      )}
    </div>
  );
};

export default LeavesPage;