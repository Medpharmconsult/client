"use client"
import { useState, useRef } from "react";
import styles from "@/app/ui/dashboard/setScheduleUi/setScheduleUi.module.css"
import { Button } from "../../general/button/button";
import { apiFetcher } from "@/app/lib/utilities";

export default function SetScheduleUi(){
    const [selectedOption, setSelectedOption] = useState("")
    const [serverMsg, setServerMsg] = useState("")
    const monthInput = useRef<HTMLSelectElement>(null)
    const startDay = useRef<HTMLInputElement>(null)
    const endDay = useRef<HTMLInputElement>(null)
    const startTime = useRef<HTMLInputElement>(null)
    const startMeridian = useRef<HTMLSelectElement>(null)
    const endMeridian = useRef<HTMLSelectElement>(null)
    const endTime = useRef<HTMLInputElement>(null)


    interface ApiResponse{
        statusCode: number;
        responseData: {msg: string}
    }
    
    const date = new Date();
    const day = date.getDate()
    const currentMonth = date.getMonth();
    let selectedMonth;
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "Novmber", "December"

    ]
    
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSelectedOption(e.target.value);
    }
    
    const submitRangeHandler = async (e: React.MouseEvent)=>{
        e.preventDefault();
        const submitData = {
            month: monthInput.current?.value,
            scheduleType: "range",
            startDay: startDay.current?.value, 
            endDay: endDay.current?.value, 
            startTime: startTime.current?.value,
            startMeridian: startMeridian.current?.value,
            endTime: endTime.current?.value,
            endMeridian: endMeridian.current?.value

        }
        const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_Token_Key}`)
        const apiResponse = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/set-schedule`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(submitData)
        }) as ApiResponse

        setServerMsg(apiResponse.responseData.msg)

    }
    
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <div className={styles.monthDiv}>
                        <h3>Select Month</h3>
                        <select ref={monthInput} name="" id="">
                            
                            <option value={months[date.getMonth()]}>{months[date.getMonth()]}</option>
                            <option value={months[date.getMonth()+1]}>{months[date.getMonth()+1]}</option>
                          
                        </select>
                    </div>
                    
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="range"
                                checked={selectedOption === 'range'}
                                onChange={(e)=>handleOptionChange(e)}
                            />
                                range setting
                        </label>
                        <br />

                        <label>
                            <input
                                type="radio"
                                value="single"
                                checked={selectedOption === 'single'}
                                onChange={(e)=>handleOptionChange(e)}
                            />
                                single setting
                        </label>
                        
                    </div>
                    {   
                        (selectedOption == "range")?
                         <div >
                            
                            <div className={styles.zone}>
                                <h3 className={styles.dayRangeText}>Select day range</h3>
                                <div className={styles.dayRange}>
                                    <input ref={startDay} type="number" placeholder="Start day" />
                                    <input ref={endDay} type="number" placeholder="End day" />
                                </div>
                            </div>
                            
                            <div className={styles.zone}>
                                <h3 className={styles.timeRangeText}>Select time range</h3>
                                <div className={styles.timeRange}>
                                    <div>
                                        <input ref={startTime} type="number" placeholder="Start time" />
                                        <select ref={startMeridian} name="" id="">
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input ref={endTime} type="number" placeholder="End  time"/>
                                        <select ref={endMeridian} name="" id="">
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>

                                        </select>
                                    </div>
                                
                                
                                </div>

                            </div>
                            <div className={styles.rangeBtnContainer}>
                                <Button onClick={(e)=>submitRangeHandler(e)} styleType="big" margin="">Submit</Button>
                            </div>
                            
                            
                        </div>:
                         <div>
                            <ul>

                            </ul>
                            <div></div>
                            
                         </div>
                    }
                    
                    <p>{serverMsg}</p>
                </form>
            </div>
           
      
        </div>
    );
}

//onChange={(e)=>handleStartTime(e)}
//onChange={(e)=>handleStartDay(e)}
//onChange={(e)=>handleEndTime(e)}
//onChange={(e)=>handleEndDay(e)}