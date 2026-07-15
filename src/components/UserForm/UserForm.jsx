import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./UserForm.css";

function UserForm({
  title,
  onSubmit,
  onClose,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [saving, setSaving] = useState(false);

  const submitForm = async (data) => {
  setSaving(true);

  try {
    await onSubmit(data);
  } finally {
    setSaving(false);
  }
};

  useEffect(() => {
  const handleEsc = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleEsc);

  return () => {
    window.removeEventListener("keydown", handleEsc);
  };
}, [onClose]);

  return (
    <div className="modal-overlay" onClick={onclose}>
      <div className="user-form" onClick={(e)=>e.stopPropagation()}>

        <h2>{title}</h2>

        <form onSubmit={handleSubmit(submitForm)}>

          <input
            placeholder="First Name"
            {...register("firstName", {
              required: "First name is required",
            })}
          />

          {errors.firstName && (
            <small>{errors.firstName.message}</small>
          )}

          <input
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last name is required",
            })}
          />

          {errors.lastName && (
            <small>{errors.lastName.message}</small>
          )}

          <input
            placeholder="Email"
            type="email"
            {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                },
            })}
          />

          {errors.email && (
            <small>{errors.email.message}</small>
          )}

          <select
            {...register("department")}
          >
            <option>Engineering</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Support</option>
            <option>Human Resources</option>
          </select>

          <div className="buttons">

            <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default UserForm;