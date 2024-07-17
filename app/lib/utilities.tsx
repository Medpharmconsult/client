

export const apiFetcher = (url:string, options: object)=>{
    return new Promise((resolve)=>{

        if(url){
            fetch(url, options)
            .then((response)=>response.json())
            .then((data)=>{
                return resolve(data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
    
}

export const localStorageHandler = (action:string, data:{key:string, value:string})=>{
    if(action == "get"){
       return localStorage.getItem(data.key)
    }
    else if(action == "set"){
        localStorage.setItem(data.key, data.value)
    }
    else if(action == "clear"){
        localStorage.removeItem(data.key)
    }
}

export const getCurrentMonth = ()=>{
    const date = new Date()
    const monthInt = date.getMonth()
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "Novmber", "December"
    ]
    const currentMonth = months[monthInt]
    return currentMonth
}
export const getNextMonth = ()=>{
    const date = new Date()
    const monthInt = date.getMonth() + 1
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "Novmber", "December"
    ]
    const currentMonth = months[monthInt]
    return currentMonth
}
export const getCurrentYear = ()=>{
    const date = new Date()
    const year = date.getFullYear()
    return year
}
