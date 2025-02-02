import Form from "@/app/_components/Form";
import toast from "react-hot-toast";
import SetScheduleButton from "./SetScheduleButton";
import { setSchedule } from "@/app/_lib/actions";
import { fetchMonth, formatDate, getMonthDays } from "@/app/_lib/utilities";
import { useState } from "react";

export default function SingleForm() {
  // Get current month
  const currentMonth = fetchMonth();
  const currentDays = getMonthDays(currentMonth);
  const currentMonthText = formatDate(currentMonth, { month: "long" });
  // Get next month
  const nextMonth = fetchMonth(1);
  const nextDays = getMonthDays(nextMonth);
  const nextMonthText = formatDate(nextMonth, { month: "long" });
  // Month state
  const [month, setMonth] = useState<string>(currentMonthText);
  // Set schedule
  async function handleSetSchedule(formData: FormData) {
    // Send request
    const response = await setSchedule(formData);
    // Display message
    if (response) toast.success("Schedule set successfully");
    else toast.error("Something went wrong");
  }

  return (
    <div>
      <h1 className="text-[22px]/[28px] tracking-normal font-bold mb-[18px]">
        Single setting
      </h1>
      <Form action={handleSetSchedule}>
        <div className="flex flex-wrap gap-y-5 gap-x-[30px] items-center">
          <Form.Group label="Month">
            <Form.Select
              onChange={(e) => setMonth(e.target.value)}
              name="month"
            >
              <option value={currentMonthText}>{currentMonthText}</option>
              <option value={nextMonthText}>{nextMonthText}</option>
            </Form.Select>
          </Form.Group>
          <Form.Group label="Day">
            {month === currentMonthText ? (
              <Form.InputNumber
                defaultValue={1}
                max={currentDays}
                key={currentMonthText}
                name="day"
              />
            ) : (
              <Form.InputNumber
                defaultValue={1}
                max={nextDays}
                key={nextMonthText}
                name="day"
              />
            )}
          </Form.Group>
          <Form.Group label="Start time">
            <div className="flex items-center">
              <Form.InputNumber max={12} defaultValue={1} name="startTime">
                <Form.Select
                  styles="*:border-l-0 *:rounded-none"
                  name="startMeridian"
                >
                  <option>AM</option>
                  <option>PM</option>
                </Form.Select>
              </Form.InputNumber>
            </div>
          </Form.Group>
          <Form.Input type="hidden" value="single" name="scheduleType" />
          <Form.Group label="End time">
            <div className="flex items-center">
              <Form.InputNumber max={12} defaultValue={1} name="endTime">
                <Form.Select
                  styles="*:border-l-0 *:rounded-none"
                  name="endMeridian"
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
