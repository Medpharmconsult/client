"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { setScheduleRange } from "@/app/_lib/actions";
import {
  formatDate,
  getCurrentMonth,
  getMonthDays,
  getNextMonth,
} from "@/app/_lib/utilities";
import { Ref, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import SetScheduleButton from "./SetScheduleButton";

export default function RangeForm() {
  const currentMonth = getCurrentMonth();
  const [selectedMonth, setSelectedMonth] = useState<Date>(currentMonth);
  const [isPending, startTransition] = useTransition();
  const nextMonth = getNextMonth();
  const startDay = useRef<HTMLInputElement>(null);
  const endDay = useRef<HTMLInputElement>(null);
  const startTime = useRef<HTMLInputElement>(null);
  const startMeridian = useRef<HTMLSelectElement>(null);
  const endMeridian = useRef<HTMLSelectElement>(null);
  const endTime = useRef<HTMLInputElement>(null);

  const submitRangeHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      month: formatDate(selectedMonth, { month: "long" }),
      scheduleType: "range",
      startDay: startDay.current?.value,
      endDay: endDay.current?.value,
      startTime: startTime.current?.value,
      startMeridian: startMeridian.current?.value,
      endTime: endTime.current?.value,
      endMeridian: endMeridian.current?.value,
    };
    startTransition(async () => {
      const res = await setScheduleRange(submitData);
      if (res) toast.success("Schedule set successfully");
      else toast.error("Something went wrong");
    });
  };

  return (
    <div>
      <h1 className="text-[22px]/[28px] tracking-normal font-bold mb-[18px]">
        Range setting
      </h1>
      <Form onSubmit={submitRangeHandler}>
        <div className="flex flex-wrap gap-y-[18px] gap-x-[30px] items-center">
          <Form.Group label="Month">
            <Form.Select
              value={selectedMonth.toDateString()}
              onChange={(e) => setSelectedMonth(new Date(e.target.value))}
            >
              <option value={currentMonth.toDateString()}>
                {formatDate(currentMonth, { month: "long" })}
              </option>
              <option value={nextMonth.toDateString()}>
                {formatDate(nextMonth, { month: "long" })}
              </option>
            </Form.Select>
          </Form.Group>
          {selectedMonth.toDateString() === currentMonth.toDateString() ? (
            <CurrentMonthDays startDay={startDay} endDay={endDay} />
          ) : (
            <NextMonthDays startDay={startDay} endDay={endDay} />
          )}
          <Form.Group label="Start time">
            <div className="flex items-center">
              <Form.InputNumber maxVal={12} defaultVal={1} ref={startTime}>
                <Form.Select
                  classname=" *:border-l-0  *:rounded-none "
                  ref={startMeridian}
                >
                  <option>AM</option>
                  <option>PM</option>
                </Form.Select>
              </Form.InputNumber>
            </div>
          </Form.Group>
          <Form.Group label="End time">
            <div className="flex items-center">
              <Form.InputNumber maxVal={12} defaultVal={1} ref={endTime}>
                <Form.Select
                  classname=" *:border-l-0  *:rounded-none"
                  ref={endMeridian}
                >
                  <option>AM</option>
                  <option>PM</option>
                </Form.Select>
              </Form.InputNumber>
            </div>
          </Form.Group>
        </div>
        <div className="mt-[6px]">
          <SetScheduleButton isLoading={isPending} />
        </div>
      </Form>
    </div>
  );
}

function CurrentMonthDays({
  startDay,
  endDay,
}: {
  startDay: Ref<HTMLInputElement>;
  endDay: Ref<HTMLInputElement>;
}) {
  const maxDays = getMonthDays(getCurrentMonth());
  return (
    <>
      <Form.Group label="Start day">
        <Form.InputNumber defaultVal={1} maxVal={maxDays} ref={startDay} />
      </Form.Group>
      <Form.Group label="End day">
        <Form.InputNumber defaultVal={15} maxVal={maxDays} ref={endDay} />
      </Form.Group>
    </>
  );
}

function NextMonthDays({
  startDay,
  endDay,
}: {
  startDay: Ref<HTMLInputElement>;
  endDay: Ref<HTMLInputElement>;
}) {
  const maxDays = getMonthDays(getNextMonth());
  return (
    <>
      <Form.Group label="Start day">
        <Form.InputNumber defaultVal={1} maxVal={maxDays} ref={startDay} />
      </Form.Group>
      <Form.Group label="End day">
        <Form.InputNumber defaultVal={15} maxVal={maxDays} ref={endDay} />
      </Form.Group>
    </>
  );
}
