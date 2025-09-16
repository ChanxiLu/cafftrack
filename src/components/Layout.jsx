import { useAuth } from "../context/AuthContext"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useState } from 'react'

export default function Layout(props){
    const { children } = props
    const [showModal, setShowModal] = useState(false)
    const { globalUser, logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFTRACK</h1>
                <p>For Coffee Insatiates</p>
            </div>
            {globalUser ? (
                <button onClick={logout}>
                <p>Logout</p>
            </button>
        ) : (
                <button onClick={()=>{
                setShowModal(true)
            }}>
                <p>Sign up free / Login</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        )}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">CaffTrack</span>, made by Chanxi through the course of <a target="_blank" href="https://www.smoljames.com">Smoljames</a> using FantaCSS and React <br/>
            Check out the project on <a target="_blank" href="https://github.com/ChanxiLu/">Github</a>!</p>
        </footer>
    )


    //to make code cleaner
    function handleCloseModal(){
        setShowModal(false)
    }
    return(
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}


            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}