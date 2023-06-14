import ReadNotification from "../../components/Notification/readNotification";
import NavBar from "../../components/NavMenu/NavBar";
import SideBar from "../../components/SideBar/SideBar";
function NotificationDashboard() {
    return (
        <>
            <div className="interface" id="interface">
                <NavBar />
                <SideBar />
                <ReadNotification />
            </div>
        </>
    );
}

export default NotificationDashboard;