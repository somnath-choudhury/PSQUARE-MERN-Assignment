import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCandidateModalProps {
  onClose: () => void;
  onAdd: (candidate: {
    name: string;
    email: string;
    phone: string;
    position: string;
    experience: string;
    status: string;
  }) => void;
}

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    status: 'Pending',
  });
  
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  
  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
      isValid = false;
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd(formData);
    }
  };
  
  return (
    <div className="modal-backdrop">
      <div className="modal slide-in">
        <div className="modal-header rounded-2xl">
          <h2 className="modal-title">Add New Candidate</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {/* Row 1 */}
              <div className="form-group">
                <input
                  placeholder="Full Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-error" : ""}
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  placeholder="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-error" : ""}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Row 2 */}
              <div className="form-group">
                <input
                  placeholder="Phone Number"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-error" : ""}
                />
                {errors.phone && (
                  <p className="text-error text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  placeholder="Position"
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={errors.position ? "border-error" : ""}
                />
                {errors.position && (
                  <p className="text-error text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Row 3 */}
              <div className="form-group">
                <input
                  placeholder="Experience"
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? "border-error" : ""}
                />
                {errors.experience && (
                  <p className="text-error text-sm mt-1">{errors.experience}</p>
                )}
              </div>

              <div className="form-group">
                <input
                placeholder='Resume'
                  type="file"
                  id="resume"
                  name="resume"
                  className="border border-neutral-300 p-2 rounded w-full"
                />
              </div>
            </div>

            {/* Resume Upload */}

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2">
              <div>
                <input type="checkbox" className="mr-2" required />
              </div>
              <span>
                I hereby declare the above information is true to the best of my
                knowledge and belief.
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;