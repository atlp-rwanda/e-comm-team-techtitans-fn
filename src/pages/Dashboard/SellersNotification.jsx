import Notification from "../../components/Notification/Notification";
import NavBar from "../../components/NavMenu/NavBar";
import SideBar from "../../components/SideBar/SideBar";
function NotificationDashboard() {
    return (
        <>
            <div className="interface" id="interface">
                <NavBar />
                <SideBar />
                <Notification />
            </div>
        </>
    );
}

export default NotificationDashboard;