import React, { useState } from 'react';
import { Search, Filter, Calendar, UserCircle, ReceiptIcon } from 'lucide-react';
import { format } from 'date-fns';

// Dummy data for attendance
const initialAttendanceData = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "James Wilson",
    position: "Full Time",
    department:'Designer',
    status: "Present",
    task: "Dashboard Home page Alignment",
    date: "2023-10-01", // Example date
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Emma Davis",
    position: "Full Time",
    department:'Designer',
    status: "Present",
    task: "Design Review Meeting",
    date: "2023-10-01", // Example date
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Robert Miller",
    position: "Full Time",
    department:'Designer',
    status: "Absent",
    task: "Product Strategy Session",
    date: "2023-10-01", // Example date
  },
  {
    id: "4",
    employeeId: "5",
    employeeName: "William Brown",
    position: "Full Time",
    department:'Backend Development',
    status: "Present",
    task: "Backend API Development",
    date: "2023-10-01", // Example date
  },
  {
    id: "5",
    employeeId: "1",
    employeeName: "James Wilson",
    position: "Full Time",
    department:'Designer',
    status: "Late",
    task: "Code Review",
    date: "2023-10-01", // Example date
  },
];

const AttendancePage: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [filteredData, setFilteredData] = useState(initialAttendanceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter attendance data based on search term, date, and status
  const filterAttendanceData = () => {
    let filtered = attendanceData;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((record) =>
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter((record) => record.date === dateFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((record) => record.status === statusFilter);
    }
    
    setFilteredData(filtered);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle date filter change
  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  // Apply filters when search term, date, or status filter changes
  React.useEffect(() => {
    filterAttendanceData();
  }, [searchTerm, dateFilter, statusFilter]);
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Present':
        return 'badge-success';
      case 'Absent':
        return 'badge-error';
      case 'Late':
        return 'badge-warning';
      default:
        return 'bg-neutral-200 text-neutral-700';
    }
  };

 const handleStatusChange = (id: string, newStatus: string) => {
   const updatedData = attendanceData.map((record) =>
     record.id === id ? { ...record, status: newStatus } : record
   );
   setAttendanceData(updatedData);

   // Reapply filters to reflect status update
   const newFiltered = updatedData.filter((record) => {
     const matchSearch = record.employeeName
       .toLowerCase()
       .includes(searchTerm.toLowerCase());
     const matchDate = dateFilter ? record.date === dateFilter : true;
     const matchStatus =
       statusFilter === "All" || record.status === statusFilter;
     return matchSearch && matchDate && matchStatus;
   });
   setFilteredData(newFiltered);
 };

  
  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Attendance</h1>
      </div>

      {/* Search and filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input */}
          <div className="form-group mb-0">
            <div className="flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Date filter */}
          <div className="form-group mb-0">
            <div className="flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-neutral-500" />
              </div>
              <input
                type="date"
                className="pl-10"
                value={dateFilter}
                onChange={handleDateFilterChange}
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
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-primary-light bg-opacity-10 p-3 rounded-lg">
              <UserCircle size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-1">
                {
                  filteredData.filter((record) => record.status === "Present")
                    .length
                }
              </h3>
              <p className="text-neutral-500 text-lg">Present</p>
            </div>
          </div>
        </div>

        <div className="card p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-error-light bg-opacity-10 p-3 rounded-lg">
              <UserCircle size={24} className="text-error" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-1">
                {
                  filteredData.filter((record) => record.status === "Absent")
                    .length
                }
              </h3>
              <p className="text-neutral-500 text-lg">Absent</p>
            </div>
          </div>
        </div>

        <div className="card p-4 bg-white">
          <div className="flex items-center gap-2">
            <div className="bg-warning-light bg-opacity-10 p-3 rounded-lg">
              <UserCircle size={24} className="text-warning" />
            </div>
            <div className='flex gap-6 items-center'>
              <h3 className="text-2xl font-semibold">
                {
                  filteredData.filter((record) => record.status === "Late")
                    .length
                }
              </h3>
              <p className="text-neutral-500 text-lg">Late</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance list */}
      <div className="card-main">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Task</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr key={record.id}>
                    <td>
                      {" "}
                      <UserCircle size={20} className="text-neutral-500" />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-neutral-100 rounded-full w-10 h-10 flex items-center justify-center"></div>
                        <div>
                          <p className="font-medium">{record.employeeName}</p>
                        </div>
                      </div>
                    </td>
                    <td>{record.position}</td>
                    <td>{record.department}</td>
                    <td>{record.task}</td>
                    <td>
                      <span
                        className={`badge ${getStatusBadgeClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={record.status}
                        onChange={(e) =>
                          handleStatusChange(record.id, e.target.value)
                        }
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No attendance records found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;