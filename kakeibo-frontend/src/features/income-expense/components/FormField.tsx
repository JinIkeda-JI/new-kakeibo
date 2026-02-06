type FormFieldsProps = {
  label: string;
  type?: "text" | "number" | "date";
  value: string | number | null;
  onChange: (value: string | number | null) => void;
};

export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
}: FormFieldsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (type === "number") {
      onChange(rawValue === "" ? null : Number(rawValue));
    } else {
      onChange(rawValue || null);
    }
  };

  return (
    <div>
      <label>{label}: </label>
      <input type={type} value={String(value ?? "")} onChange={handleChange} />
    </div>
  );
};
