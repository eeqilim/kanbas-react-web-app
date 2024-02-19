import ModuleList from "../Modules/List";
import { FaMinusCircle, FaCheckCircle, FaSignOutAlt, FaChartBar, FaRegBell, FaRegCalendarAlt, FaExclamationCircle } from "react-icons/fa";
import { LuFileInput, LuTarget } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";

function Home() {
    return (
        <div className="d-flex flex-wrap">
            <div className="col-lg-8 flex-fill" style={{ padding: "5px" }}>
                <ModuleList />
            </div>

            <div className="col d-lg-block" style={{ width: "250px", padding: "5px", marginRight: "5px", marginBottom: "50px" }}>
                <h6>Course Status</h6>
                <button type="button">
                    <FaMinusCircle style={{ color: "grey" }} /> Unpublish
                </button>
                <button type="button" style={{ opacity: "0.5", marginLeft: "2px", marginBottom: "10px", color: "white", backgroundColor: "green" }}>
                    <FaCheckCircle /> Published
                </button>
                <div>
                    <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                        <LuFileInput /> Import Existing Content
                    </button>
                </div>
                <div>
                    <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                        <FaSignOutAlt /> Import From Commons
                    </button>
                </div>
                <div>
                    <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                        <LuTarget /> Choose Home Page
                    </button>
                </div>
                <div>
                    <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                        <FaChartBar /> View Course Stream
                    </button>
                </div>
                <div>
                    <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                        <LiaBullhornSolid /> New Announcement
                    </button>
                </div>
                <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                    <FaChartBar /> New Analytics
                </button>
                <div>
                    <button type="button" style={{ width: "250px", textAlign: "left", marginBottom: "2px" }}>
                        <FaRegBell /> View Course Notification
                    </button>
                </div>
                <br />

                <strong>To Do</strong>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <td><FaExclamationCircle style={{ color: "red", alignItems: "center", marginRight: "10px" }} /></td>
                            <td>
                                <a href="#"> Grade A1 - ENV + HTML</a>
                                <br />
                                <span style={{ fontSize: "15px" }}>
                                    100 points • Sep 18 at 11:59pm</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />

                <strong>Coming Up</strong>
                <a href="#" style={{ float: "right" }}>
                    <FaRegCalendarAlt /> View Calendar
                </a>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <td style={{ display: "flex" }}>
                                <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                <div>
                                    <a href="#">
                                        {" "}
                                        Lecture
                                        <br />
                                    </a>
                                    CS4550.12631.20410
                                    <br />
                                    Sep 7 at 11:45am
                                    <br />
                                    <br />
                                </div>
                            </td>

                            <td style={{ display: "flex" }}>
                                <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                <div>
                                    <a href="#">
                                        CS5610 06 SP23 Lecture
                                        <br />
                                    </a>
                                    CS4550.12631.20410
                                    <br />
                                    Sep 11 at 6pm
                                    <br />
                                    <br />
                                </div>
                            </td>

                            <td style={{ display: "flex" }}>
                                <FaRegCalendarAlt style={{ marginRight: "10px" }} />
                                <div>
                                    <a href="#">
                                        {" "}
                                        CS5610 Web Development
                                        <br />
                                        Summer 1 2023 - LECTURE
                                        <br />
                                    </a>
                                    CS4550.12631.20410
                                    <br />
                                    Sep 11 at 3pm
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Home;