import { forwardRef, useState } from "react";
import { BsChevronDown, BsDash, BsPlus } from "react-icons/bs";
import {
  formGroup,
  IForm,
  IInput,
  IInputNumber,
  ISelect,
  ITextarea,
} from "../_lib/types";

function Form({ children, styles = "", ...rest }: IForm) {
  return (
    <form
      className={`flex flex-col
       gap-y-5 ${styles}`}
      {...rest}
    >
      {children}
    </form>
  );
}

const Select = forwardRef<HTMLSelectElement, ISelect>(
  ({ children, styles = "", ...rest }, ref) => {
    return (
      <div className={`relative ${styles}`}>
        <select
          ref={ref}
          className={`w-full cursor-pointer bg-white border-grey-300 rounded-5 h-10 py-2 pl-4 pr-10 border-1`}
          {...rest}
        >
          {children}
        </select>
        <BsChevronDown
          className="top-3 right-4 pointer-events-none absolute w-4 h-4 text-grey-100"
          size={16}
        />
      </div>
    );
  }
);

const Textarea = forwardRef<HTMLTextAreaElement, ITextarea>(
  ({ styles = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`${styles} border-1 w-full border-grey-300 rounded-5 py-2 px-4 placeholder:text-grey-600 min-h-48 placeholder:font-light`}
        {...props}
      />
    );
  }
);

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ styles = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles} h-10 border-grey-300 rounded-5 py-2 px-4 placeholder:text-grey-600 border-1 placeholder:font-light`}
        {...rest}
      />
    );
  }
);

const InputNumber = forwardRef<HTMLInputElement, IInputNumber>(
  ({ styles = "", children, min = 1, max, defaultValue, ...rest }, ref) => {
    const [value, setValue] = useState<number>(defaultValue);
    // Decrease input value
    function decrease() {
      const newValue = value - 1;
      if (newValue > min - 1) setValue(newValue);
    }
    // Increase input value
    function increase() {
      const newValue = value + 1;
      if (newValue < max + 1) setValue(newValue);
    }
    // Change input value
    function change(newValue: number) {
      if (newValue > min - 1 && newValue < max + 1) setValue(newValue);
    }
    return (
      <div className="flex items-center">
        <button
          className="bg-grey-700 text-grey-100 inline-flex border-l-1 border-y-1 size-10 items-center justify-center border-grey-300  rounded-tl-5 rounded-bl-5"
          onClick={decrease}
          type="button"
        >
          <BsDash size={24} />
        </button>
        <input
          className={`${styles} max-w-10 max-h-10 text-center border-grey-300 py-3 placeholder:text-grey-600 border-1 placeholder:font-light`}
          ref={ref}
          type="number"
          value={value}
          onChange={(e) => change(Number(e.target.value))}
          {...rest}
        />
        {children}
        <button
          onClick={increase}
          type="button"
          className={`bg-grey-700 text-sm text-grey-100 w-10 inline-flex  border-y-1 h-10 items-center justify-center border-grey-300 rounded-r-5 border-r-1 rounded-l-none`}
        >
          <BsPlus size={24} />
        </button>
      </div>
    );
  }
);

function Group({ label = "", children, error, styles = "" }: formGroup) {
  return (
    <div className={`flex flex-col items-start ${styles} gap-y-2`}>
      <div className="flex items-center flex-wrap gap-2 ">
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
