import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaRegClock, FaDesktop, FaExternalLinkAlt, FaRegQuestionCircle } from "react-icons/fa";

function KanbasNavigation() {
    const links = [
        { label: " ", icon: <img src="https://www.h-net.org/jobs/logo_view.php?id=59042&scale=0" height="70px" /> },
        { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2 wd-kanbas-navigation-icon" /> },
        { label: "Courses", icon: <FaBook className="fs-2 wd-kanbas-navigation-icon" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2 wd-kanbas-navigation-icon" /> },
        { label: "Inbox", icon: <FaInbox className="fs-2 wd-kanbas-navigation-icon" />, breakAfter: true },
        { label: "History", icon: <FaRegClock className="fs-2 wd-kanbas-navigation-icon" /> },
        { label: "Studio", icon: <FaDesktop className="fs-2 wd-kanbas-navigation-icon" /> },
        { label: "Commons", icon: <FaExternalLinkAlt className="fs-2 wd-kanbas-navigation-icon" /> },
        { label: "Help", icon: <FaRegQuestionCircle className="fs-2 wd-kanbas-navigation-icon" />, breakAfter: true },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}>
                        {link.icon}
                        {link.breakAfter && <br />} {/* Add break if breakAfter is true */}
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;