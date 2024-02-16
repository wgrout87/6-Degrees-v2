import { ChangeEventHandler, forwardRef } from "react";

type Props = {
  label: string;
  id: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

const Input = forwardRef<HTMLInputElement, Props>(function BareInput(
  { label, id, type, onChange, placeholder },
  ref
) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2" htmlFor={id}>
          <p>{label}</p>
        </label>
      )}
      <input
        ref={ref}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={onChange}
        required
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
});

export default Input;
