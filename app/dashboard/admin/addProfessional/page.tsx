"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { apiFetcher } from "@/app/_lib/utilities";
import Button from "@/app/_components/Button";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";

interface ApiResponse {
  statusCode: number;
  msg: string;
  responseData: Array<{ _id: string; name: string; code: string }>;
}

export default function AddProfessional() {
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const genderInput = useRef<HTMLSelectElement>(null);
  const professionInput = useRef<HTMLSelectElement>(null);
  const yoeInput = useRef<HTMLInputElement>(null);
  const phoneNoInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [apiData, setApiData] = useState({} as ApiResponse);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    async function fetcher() {
      const professions = (await apiFetcher(
        `${process.env.NEXT_PUBLIC_Host_Name}/get-professions`,
        { method: "GET" }
      )) as ApiResponse;
      setApiData(professions);
      setIsLoading(false);
    }

    fetcher();
  }, []);

  const router = useRouter();

  const profSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    const code = apiData.responseData.filter(
      (prof) => prof.name == professionInput.current?.value
    );
    const data = {
      firstName: firstNameInput.current?.value,
      lastName: lastNameInput.current?.value,
      username: usernameInput.current?.value,
      profession: professionInput.current?.value,
      gender: genderInput.current?.value,
      yoe: parseInt(`${yoeInput.current?.value}`),
      phoneNo: phoneNoInput.current?.value,
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
      profCode: apiData.responseData.filter(
        (prof) => prof.name == professionInput.current?.value
      )[0].code,
    };

    const serverResponse = (await apiFetcher(
      `${process.env.NEXT_PUBLIC_Host_Name}/professional-signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )) as ApiResponse;

    if (serverResponse.statusCode == 200) {
      alert(serverResponse.responseData);
    } else {
      setErrMsg(serverResponse.msg);
    }
  };

  return (
    <DashboardScreen title="Add professional">
      <div>
        <form>
          <div>
            <div>
              <label htmlFor="">First name</label>
              <input
                ref={firstNameInput}
                type="text"
                placeholder="First name"
              />
            </div>

            <div>
              <label htmlFor="">Last name</label>
              <input ref={lastNameInput} type="text" placeholder="Last name" />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Username name</label>
              <input ref={usernameInput} type="text" placeholder="Username" />
            </div>

            <div>
              <label htmlFor="">Profession</label>
              <select ref={professionInput}>
                {isLoading ? (
                  <option>LOADING...</option>
                ) : (
                  apiData.responseData.map((profession) => (
                    <option key={profession._id}>{profession.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="">Gender</label>
              <select ref={genderInput}>
                <option value="m">m</option>
                <option value="f">f</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Years of experience</label>
              <input
                ref={yoeInput}
                type="number"
                placeholder="Years of experience"
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Phone number</label>
              <input
                ref={phoneNoInput}
                type="text"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label htmlFor="">Email</label>
              <input ref={emailInput} type="email" placeholder="Email" />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Password</label>
              <input ref={passwordInput} type="text" placeholder="Password" />
            </div>
          </div>
          <div>
            <Button
              onClick={(e) => profSignup(e)}
              classname=""
              colour="primary"
            >
              Add staff
            </Button>
          </div>
          <p>{errMsg}</p>
        </form>
      </div>
    </DashboardScreen>
  );
}
