import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, UserCircle, Edit, Trash } from 'lucide-react';

// Dummy data for employees
const initialEmployees = [
  {
    id: '1',
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '(123) 456-7890',
    department: 'Engineering',
    position: 'Senior Frontend Developer',
    joinDate: '2022-03-15',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '(234) 567-8901',
    department: 'Design',
    position: 'UX Lead',
    joinDate: '2022-02-10',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Robert Miller',
    email: 'robert@example.com',
    phone: '(345) 678-9012',
    department: 'Product',
    position: 'Product Manager',
    joinDate: '2022-01-20',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Olivia Johnson',
    email: 'olivia@example.com',
    phone: '(456) 789-0123',
    department: 'Engineering',
    position: 'Backend Developer',
    joinDate: '2022-04-05',
    status: 'On Leave',
  },
  {
    id: '5',
    name: 'William Brown',
    email: 'william@example.com',
    phone: '(567) 890-1234',
    department: 'Engineering',
    position: 'Full Stack Developer',
    joinDate: '2022-03-01',
    status: 'Active',
  },
];

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter employees based on search term, department, and status
  const filterEmployees = () => {
    let filtered = employees;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply department filter
    if (departmentFilter !== 'All') {
      filtered = filtered.filter((employee) => employee.department === departmentFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((employee) => employee.status === statusFilter);
    }
    
    setFilteredEmployees(filtered);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle department filter change
  const handleDepartmentFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(e.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  // Apply filters when search term, department, or status filter changes
  React.useEffect(() => {
    filterEmployees();
  }, [searchTerm, departmentFilter, statusFilter]);
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'badge-success';
      case 'On Leave':
        return 'badge-warning';
      case 'Terminated':
        return 'badge-error';
      default:
        return 'bg-neutral-200 text-neutral-700';
    }
  };
  
  // Handle employee deletion
  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(updatedEmployees);
      setFilteredEmployees(
        filteredEmployees.filter((employee) => employee.id !== id)
      );
    }
  };
  
  // Get all departments for filter
  const departments = ['All', ...new Set(employees.map((employee) => employee.department))];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-7xl">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Employees</h1>
        </div>

        {/* Search and filters */}
        <div className="card mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search input */}
            <div className="mb-0">
              <div className="flex items-center justify-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-neutral-900" />
                </div>
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-1 text-black"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Department filter */}
            <div className="mb-0">
              <div className="flex ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Filter size={18} className="text-neutral-500" />
                </div>
                <select
                  className="pl-5"
                  value={departmentFilter}
                  onChange={handleDepartmentFilterChange}
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department === "All" ? "All Departments" : department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status filter */}
            <div className="mb-0">
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
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Employees list */}
        <div className="card-main table-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Date of Joining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <UserCircle size={30} className="text-neutral-200" />
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <Link
                              to={`/employees/${employee.id}`}
                              className="font-medium text-neutral-900 hover:text-primary"
                            >
                              {employee.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td>{employee.joinDate}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/employees/${employee.id}`}
                            className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-100 rounded"
                            title="Edit Employee"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="p-2 text-neutral-500 hover:text-error hover:bg-neutral-100 rounded"
                            title="Delete Employee"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No employees found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;