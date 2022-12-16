import { Helmet } from "react-helmet"
import Sidebar from "../../components/SideBar/Sidebar"
import Ws from '../../ws'
import Navbar from '../../components/SideBar/Navbar'
import { useState } from "react"

function Authenticated({ children }) {
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const handleOnCloseSidebar = (status) => {
        console.log("alguém me chamouu")
        setSideBarOpen(!status)
    }

    return (

    

        <div className="wrapper-body">
            <Helmet>
                <title>Minha Estufa</title>
            </Helmet>

            <Sidebar onClose={handleOnCloseSidebar} />
            <Ws />
            <div className={`container-app ${sideBarOpen ? 'opened' : 'closed'}`}>
                <Navbar />

                <div className="content" >
                    {children}
                </div>
            </div>

        </div>
    )
}

export default Authenticated