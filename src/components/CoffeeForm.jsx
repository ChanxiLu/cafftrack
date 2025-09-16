import { coffeeOptions } from "../utils"
import { useState } from "react"
import Modal from './Modal'
import Authentication from "./Authentication"
import { useAuth } from "../context/AuthContext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function CoffeeForm(props){
    const [showModal, setShowModal] = useState(false)
    const { isAuthenticated } = props

    const [coffeeSelection, setCoffeeSelection] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)
    
    const {globalData, setGlobalData, globalUser} = useAuth()

    async function handleSubmitForm(){
        if (!isAuthenticated) {
            setShowModal(true)
            return 
        }

        //define a guard clause that only submits the form if it is completed
        if (!coffeeSelection) {
            return
        }

        try {
                  // then we are going to creat a new data object
        const newGlobalData = {
            ...(globalData || {})
        }

        const nowTime = Date.now()

        const timeToSubstract = (hour * 60 * 60 * 1000) + (min * 60 * 1000)

        const timeStamp = nowTime - timeToSubstract

        const newData = {
            name: coffeeSelection,
            cost: coffeeCost
        }

        newGlobalData[timeStamp] = newData

        //update global state

        setGlobalData(newGlobalData)

        //persiste data to database
        const userRef = doc(db, 'users', globalUser.uid)
        const res = await setDoc(userRef, {
            [timeStamp]: newData
        }, {merge: true})


        //console.log(coffeeSelection, coffeeCost, hour, min)
        //console.log(timeStamp, coffeeSelection, coffeeCost)

        setCoffeeSelection(null)
        setHour(0)
        setMin(0)
        setCoffeeCost(0)

        } catch(err){
            console.log(err.message)
        }
    
    }

    function handleCloseModal(){
        setShowModal(false)
    }

    return (
        <>
        {showModal && (
            <Modal handleCloseModal={handleCloseModal}>
                <Authentication handleCloseModal={handleCloseModal}/>
            </Modal>
        )}
            <div className="section-header">
                <i className="fa-solid fa-pencil"/>
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select coffee type</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0, 5).map((option, optionIndex)=>{
                    return (
                        <button onClick={()=>{
                            setCoffeeSelection(option.name)
                            setShowCoffeeTypes(false)
                        }} className={"button-card " + (option.name === coffeeSelection ? ' coffee-button-selected':'')} key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine + "mg"}</p>
                        </button>
                    )
                })} 
                <button onClick={()=>{
                    setShowCoffeeTypes(true)
                    setCoffeeSelection(null)
                }} className={"button-card " + (showCoffeeTypes ? ' coffee-button-selected':'')}>
                    <h4>Other</h4>
                </button>
            </div>
            {showCoffeeTypes &&(
                <select onChange={(e)=>{setCoffeeSelection(e.target.value)}} id="coffee-list" name="coffee-list">
                    <option value={null}>Select type</option>
                    {coffeeOptions.map((option, optionIndex) => {
                        return(
                            <option value={option.name} key={optionIndex}>
                                {option.name} ({option.caffeine}mg)
                            </option>
                        )
                    })}
                </select>
            )}   
            <h4>Add the cost ($ clp)</h4>
            <input className="w-full" type="number" value={coffeeCost === 0 ? '' : coffeeCost} placeholder="2000clp" onChange={(e)=>{
                setCoffeeCost(e.target.value)
            }}/>
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select id="hours-select" onChange={(e) => {
                        setHour(e.target.value)
                    }}>
                        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex)=>{
                            return(
                            <option key={hourIndex} value={hour}>{hour}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <h6>Mins</h6>
                    <select id="mins-select" onChange={(e) => {
                        setMin(e.target.value)
                    }}>
                        {[0,5,10,15,30,45].map((min, minIndex)=>{
                            return(
                            <option key={minIndex} value={min}>{min}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button onClick={handleSubmitForm}>
                <p>Add Entry</p>
            </button>
        </>
    )
}