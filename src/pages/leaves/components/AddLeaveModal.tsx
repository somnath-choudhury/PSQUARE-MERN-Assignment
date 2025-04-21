import React, { useState } from "react";
import { X } from "lucide-react";

const activeEmployees = [
  { id: "1", name: "James Wilson", designation: "Senior Frontend Developer" },
  { id: "2", name: "Emma Davis", designation: "UX Lead" },
  { id: "3", name: "Robert Miller", designation: "Product Manager" },
  { id: "4", name: "Olivia Johnson", designation: "Backend Developer" },
  { id: "5", name: "William Brown", designation: "Full Stack Developer" },
];

interface AddLeaveModalProps {
  onClose: () => void;
  onAdd: (leave: {
    employeeId: string;
    employeeName: string;
    designation: string;
    startDate: string;
    endDate: string;
    reason: string;
    document: File | null;
  }) => void;
}

const AddLeaveModal: React.FC<AddLeaveModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    document: null as File | null,
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    let isValid = true;

    if (!formData.employeeId) {
      newErrors.employeeId = "Employee is required";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else if (formData.endDate < formData.startDate) {
      newErrors.endDate = "End date cannot be before start date";
      isValid = false;
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        document: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const selectedEmployee = activeEmployees.find(
        (emp) => emp.id === formData.employeeId
      );

      onAdd({
        ...formData,
        employeeName: selectedEmployee?.name || "",
        designation: selectedEmployee?.designation || "",
      });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal slide-in">
        <div className="modal-header">
          <h2 className="modal-title">Add New Leave</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {/* Row 1 */}
              <div className="form-group">
                <label htmlFor="employeeId">Employee Name</label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className={errors.employeeId ? "border-error" : ""}
                >
                  <option value="">Select Employee</option>
                  {activeEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <p className="text-error text-sm mt-1">{errors.employeeId}</p>
                )}
              </div>

              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  value={
                    activeEmployees.find((e) => e.id === formData.employeeId)
                      ?.designation || ""
                  }
                  readOnly
                  className="bg-gray-100 border rounded p-2 w-full"
                />
              </div>

              {/* Row 2 */}
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={errors.startDate ? "border-error" : ""}
                />
                {errors.startDate && (
                  <p className="text-error text-sm mt-1">{errors.startDate}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={errors.endDate ? "border-error" : ""}
                />
                {errors.endDate && (
                  <p className="text-error text-sm mt-1">{errors.endDate}</p>
                )}
              </div>

              {/* Row 3 */}
              <div className="form-group col-span-full">
                <label htmlFor="reason">Reason</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={3}
                  className={`${
                    errors.reason ? "border-error" : ""
                  } border border-neutral-300 rounded p-2 w-full`}
                ></textarea>
                {errors.reason && (
                  <p className="text-error text-sm mt-1">{errors.reason}</p>
                )}
              </div>

              <div className="form-group col-span-full">
                <label htmlFor="document">Supporting Document (Optional)</label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  onChange={handleFileChange}
                  className="border border-neutral-300 p-2 rounded w-full"
                />
                <p className="text-sm text-neutral-500 mt-1">
                  Upload any supporting document (PDF, DOC, DOCX)
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveModal;
