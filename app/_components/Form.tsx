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
  join?: boolean;
  children?: React.ReactElement;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  classname?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  classname?: string;
  children: React.ReactNode;
  join?: boolean;
}

function Form({ children, classname = "", ...rest }: FormProps) {
  return (
    <form
      className={` flex flex-col
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
          className={`w-full cursor-pointer bg-white border-grey-300 rounded-[5px] h-[48px]  py-[12px] pl-[16px] pr-[40px] border-[1px]`}
          {...rest}
        >
          {children}
        </select>
        <BsChevronDown
          className="top-[16px] right-[16px] pointer-events-none absolute w-[16px] h-[16px] text-grey-100"
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
        className={`${classname} border-[1px] w-full border-grey-300 rounded-[5px] py-[12px] px-[16px] placeholder:text-[#b1b1b1] min-h-[192px] placeholder:font-light`}
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
        className={`${classname} max-h-12 border-grey-300 rounded-[5px] py-[12px] px-[16px] placeholder:text-[#b1b1b1] border-[1px] placeholder:font-light`}
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
          className="bg-[#f6f7f9] text-grey-100 py-[12px]  w-[40px] inline-flex border-l-[1px] border-y-[1px] h-[48px] items-center justify-center border-grey-300  rounded-tl-[5px] rounded-bl-[5px]"
          onClick={handleDecrease}
          type="button"
        >
          <BsDash size={24} />
        </button>
        <input
          className={`${classname} max-w-12 max-h-12 text-center border-grey-300 py-3  placeholder:text-[#b1b1b1] border-[1px] placeholder:font-light`}
          ref={ref}
          type="number"
          value={value}
          {...rest}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        {children}
        <button
          onClick={handleIncrease}
          type="button"
          className={`bg-[#f6f7f9] text-[14px]/[20px] py-[12px] text-grey-100 w-[40px] inline-flex  border-y-[1px] h-[48px] items-center justify-center border-grey-300 rounded-r-[5px] border-r-[1px] rounded-l-none`}
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
