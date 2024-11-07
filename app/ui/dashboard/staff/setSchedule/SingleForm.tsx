import Form from "@/app/_components/Form";
import {
  formatDate,
  getCurrentMonth,
  getMonthDays,
  getNextMonth,
} from "@/app/_lib/utilities";
import SetScheduleButton from "./SetScheduleButton";
import { Ref, useRef, useState } from "react";

export default function SingleForm() {
  const nextMonth = getNextMonth();
  const currentMonth = getCurrentMonth();
  const [selectedMonth, setSelectedMonth] = useState<Date>(currentMonth);
  const day = useRef<HTMLInputElement>(null);
  const startTime = useRef<HTMLInputElement>(null);
  const startMeridian = useRef<HTMLSelectElement>(null);
  const endMeridian = useRef<HTMLSelectElement>(null);
  const endTime = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h1 className="text-[22px]/[28px] tracking-normal font-bold mb-[18px]">
        Single setting
      </h1>
      <Form>
        <div className="flex flex-wrap  gap-y-[18px] gap-x-[30px] items-center">
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
            <CurrentMonthDay day={day} />
          ) : (
            <NextMonthDay day={day} />
          )}
          <Form.Group label="Start time">
            <div className="flex items-center">
              <Form.InputNumber maxVal={12} defaultVal={1} ref={startTime}>
                <Form.Select
                  classname="*:border-l-0 *:rounded-none"
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
                  classname=" *:border-l-0 *:rounded-none"
                  ref={endMeridian}
                >
                  <option>AM</option>
                  <option>PM</option>
                </Form.Select>
              </Form.InputNumber>
            </div>
          </Form.Group>
        </div>
        <SetScheduleButton />
      </Form>
    </div>
  );
}

function CurrentMonthDay({ day }: { day: Ref<HTMLInputElement> }) {
  const maxDays = getMonthDays(getCurrentMonth());
  return (
    <Form.Group label="Day">
      <Form.InputNumber defaultVal={1} maxVal={maxDays} ref={day} />
    </Form.Group>
  );
}
function NextMonthDay({ day }: { day: Ref<HTMLInputElement> }) {
  const maxDays = getMonthDays(getNextMonth());
  return (
    <Form.Group label="Day">
      <Form.InputNumber defaultVal={1} maxVal={maxDays} ref={day} />
    </Form.Group>
  );
}
