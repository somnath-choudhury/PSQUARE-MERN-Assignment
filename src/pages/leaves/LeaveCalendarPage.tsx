import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';

// Dummy data for approved leaves
const approvedLeaves = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'James Wilson',
    leaveType: 'Vacation',
    startDate: '2023-06-01',
    endDate: '2023-06-03',
    status: 'Approved',
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Emma Davis',
    leaveType: 'Sick',
    startDate: '2023-05-25',
    endDate: '2023-05-25',
    status: 'Approved',
  },
  {
    id: '4',
    employeeId: '5',
    employeeName: 'William Brown',
    leaveType: 'Vacation',
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    status: 'Approved',
  },
];

const LeaveCalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [employeeFilter, setEmployeeFilter] = useState('All');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('All');
  
  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Handle employee filter change
  const handleEmployeeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeFilter(e.target.value);
  };
  
  // Handle leave type filter change
  const handleLeaveTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLeaveTypeFilter(e.target.value);
  };
  
  // Get filtered leaves
  const getFilteredLeaves = () => {
    let filtered = approvedLeaves;
    
    // Apply employee filter
    if (employeeFilter !== 'All') {
      filtered = filtered.filter((leave) => leave.employeeName === employeeFilter);
    }
    
    // Apply leave type filter
    if (leaveTypeFilter !== 'All') {
      filtered = filtered.filter((leave) => leave.leaveType === leaveTypeFilter);
    }
    
    return filtered;
  };
  
  // Check if a date has any leaves
  const getLeavesForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const filteredLeaves = getFilteredLeaves();
    
    return filteredLeaves.filter((leave) => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      const currentDate = new Date(dateString);
      
      return currentDate >= startDate && currentDate <= endDate;
    });
  };
  
  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = monthStart;
    const endDate = monthEnd;
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days;
  };
  
  // Get all employees for filter
  const allEmployees = [...new Set(approvedLeaves.map((leave) => leave.employeeName))];
  
  // Get all leave types for filter
  const allLeaveTypes = [...new Set(approvedLeaves.map((leave) => leave.leaveType))];
  
  // Generate calendar days
  const calendarDays = generateCalendarDays();
  
  // Generate weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get leave type color
  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'Vacation':
        return 'bg-primary-light';
      case 'Sick':
        return 'bg-error-light';
      case 'Personal':
        return 'bg-warning-light';
      case 'Maternity':
        return 'bg-secondary-light';
      case 'Paternity':
        return 'bg-secondary';
      default:
        return 'bg-neutral-400';
    }
  };
  
  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Leave Calendar</h1>
      </div>
      
      {/* Controls and filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded hover:bg-neutral-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded hover:bg-neutral-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Employee filter */}
          <div className="form-group mb-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter size={18} className="text-neutral-500" />
              </div>
              <select
                className="pl-10"
                value={employeeFilter}
                onChange={handleEmployeeFilterChange}
              >
                <option value="All">All Employees</option>
                {allEmployees.map((employee) => (
                  <option key={employee} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Leave type filter */}
          <div className="form-group mb-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter size={18} className="text-neutral-500" />
              </div>
              <select
                className="pl-10"
                value={leaveTypeFilter}
                onChange={handleLeaveTypeFilterChange}
              >
                <option value="All">All Leave Types</option>
                {allLeaveTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="card">
        {/* Calendar header */}
        <div className="calendar">
          {weekdays.map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="calendar mt-1">
          {/* Empty cells for days before the start of the month */}
          {Array.from({ length: getDay(startOfMonth(currentMonth)) }).map((_, index) => (
            <div key={`empty-start-${index}`} className="calendar-day bg-neutral-50"></div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day) => {
            const leavesForDay = getLeavesForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={day.toString()}
                className={`calendar-day ${
                  isToday ? 'border-primary-light border-2' : ''
                }`}
              >
                <div className="calendar-day-number">
                  {format(day, 'd')}
                </div>
                <div className="calendar-day-events">
                  {leavesForDay.map((leave) => (
                    <div
                      key={`${leave.id}-${day}`}
                      className={`calendar-event ${getLeaveTypeColor(leave.leaveType)}`}
                      title={`${leave.employeeName} - ${leave.leaveType}`}
                    >
                      {leave.employeeName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Empty cells for days after the end of the month */}
          {Array.from({
            length: 6 - getDay(endOfMonth(currentMonth)),
          }).map((_, index) => (
            <div key={`empty-end-${index}`} className="calendar-day bg-neutral-50"></div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 border-t border-neutral-200 pt-4">
          <h3 className="text-sm font-semibold mb-2">Leave Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-light"></div>
              <span className="text-sm">Vacation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error-light"></div>
              <span className="text-sm">Sick</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning-light"></div>
              <span className="text-sm">Personal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary-light"></div>
              <span className="text-sm">Maternity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-sm">Paternity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendarPage;