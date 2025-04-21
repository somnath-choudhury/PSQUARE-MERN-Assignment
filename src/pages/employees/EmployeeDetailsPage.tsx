import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, UserCircle, Edit, Trash, Check } from 'lucide-react';

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

const EmployeeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Get employee data based on ID
  useEffect(() => {
    const foundEmployee = initialEmployees.find((e) => e.id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
      setEditedEmployee(foundEmployee);
    } else {
      // Handle case when employee is not found
      navigate('/employees');
    }
  }, [id, navigate]);
  
  if (!employee) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }
  
  // Update employee
  const handleUpdate = () => {
    setEmployee(editedEmployee);
    setIsEditing(false);
    // In a real application, this would make an API call to update the employee
  };
  
  // Handle input change in edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };
  
  // Delete employee
  const handleDelete = () => {
    if (confirmDelete) {
      // In a real application, this would make an API call to delete the employee
      alert(`${employee.name} has been deleted`);
      navigate('/employees');
    } else {
      setConfirmDelete(true);
    }
  };
  
  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link to="/employees" className="text-primary flex items-center gap-1">
          <ChevronLeft size={16} />
          <span>Back to Employees</span>
        </Link>
      </div>
      
      <div className="dashboard-header">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center">
            <UserCircle size={24} className="text-neutral-700" />
          </div>
          <div>
            <h1 className="dashboard-title mb-1">
                <h1 className="dashboard-title mb-1">{employee.name}</h1>
            <div className="flex items-center gap-2">              <span className="text-neutral-500 text-sm">{employee.position}</span>
            </div>
            </h1>

          </div>
        </div>
        
        <div className="dashboard-actions">
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
                  setEditedEmployee(employee);
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  value={editedEmployee.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedEmployee.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={editedEmployee.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Full Name</p>
                <p className="font-medium">{employee.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Phone</p>
                <p className="font-medium">{employee.phone}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Employment Details */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Employment Details</h2>
          
          {isEditing ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={editedEmployee.department}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={editedEmployee.position}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="joinDate">Date of Joining</label>
                <input
                  type="date"
                  id="joinDate"
                                    name="joinDate"
                  value={editedEmployee.joinDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Department</p>
                <p className="font-medium">{employee.department}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Position</p>
                <p className="font-medium">{employee.position}</p>
              </div>
              
              <div>
                <p className="text-sm text-neutral-500">Date of Joining</p>
                <p className="font-medium">{new Date(employee.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailsPage;
                 