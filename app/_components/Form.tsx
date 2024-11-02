import { forwardRef, useState } from "react";
import { BsChevronDown, BsDash, BsPlus } from "react-icons/bs";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  classname?: string;
  children: React.ReactNode;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}

interface InputNumberProps extends InputProps {
  minVal?: number;
  maxVal: number;
  defaultVal: number;
  children?: React.ReactElement;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  classname?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  classname?: string;
  children: React.ReactNode;
}

function Form({ children, classname = "", ...rest }: FormProps) {
  return (
    <form
      className={`flex flex-col
       gap-y-[18px] ${classname}`}
      {...rest}
    >
      {children}
    </form>
  );
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, classname = "", ...rest }, ref) => {
    return (
      <div className={`relative ${classname}`}>
        <select
          ref={ref}
          className={`w-full cursor-pointer bg-white border-grey-300 rounded-5 h-12 py-3 pl-4 pr-10 border-1`}
          {...rest}
        >
          {children}
        </select>
        <BsChevronDown
          className="top-4 right-4 pointer-events-none absolute w-4 h-4 text-grey-100"
          size={16}
        />
      </div>
    );
  }
);

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ classname = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`${classname} border-1 w-full border-grey-300 rounded-5 py-3 px-4 placeholder:text-grey-600 min-h-48 placeholder:font-light`}
        {...props}
      />
    );
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ classname = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`${classname} h-12 border-grey-300 rounded-5 py-3 px-4 placeholder:text-grey-600 border-1 placeholder:font-light`}
        {...rest}
      />
    );
  }
);

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    { classname = "", children, minVal = 1, maxVal, defaultVal, ...rest },
    ref
  ) => {
    const [value, setValue] = useState<number>(defaultVal);
    function handleDecrease() {
      const newVal = value - 1;
      if (newVal > minVal - 1) setValue(newVal);
    }
    function handleIncrease() {
      const newVal = value + 1;
      if (newVal < maxVal + 1) setValue(newVal);
    }
    function handleChange(newVal: number) {
      if (newVal > minVal - 1 && newVal < maxVal + 1) setValue(newVal);
    }
    return (
      <div className="flex items-center">
        <button
          className="bg-grey-700 text-grey-100 py-3 w-10 inline-flex border-l-1 border-y-1 h-12 items-center justify-center border-grey-300  rounded-tl-5 rounded-bl-5"
          onClick={handleDecrease}
          type="button"
        >
          <BsDash size={24} />
        </button>
        <input
          className={`${classname} max-w-12 max-h-12 text-center border-grey-300 py-3 placeholder:text-grey-600 border-1 placeholder:font-light`}
          ref={ref}
          type="number"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          {...rest}
        />
        {children}
        <button
          onClick={handleIncrease}
          type="button"
          className={`bg-grey-700 text-sm py-3 text-grey-100 w-10 inline-flex  border-y-1 h-12 items-center justify-center border-grey-300 rounded-r-5 border-r-1 rounded-l-none`}
        >
          <BsPlus size={24} />
        </button>
      </div>
    );
  }
);

function Group({
  label = "",
  children,
  error,
  classname,
}: {
  label?: string;
  children: React.ReactNode;
  error?: string;
  classname?: string;
}) {
  return (
    <div className={`flex flex-col items-start ${classname} gap-y-[12px]`}>
      <div className="flex items-center flex-wrap gap-[8px] ">
        <label>{label}</label>
        {error && (
          <span className="bg-error-bg text-error-text px-[12px] rounded-[20px] text-[14px]/[24px] first-letter:capitalize">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

Form.Group = Group;
Form.Select = Select;
Form.Input = Input;
Form.InputNumber = InputNumber;
Form.TextArea = Textarea;
export default Form;
