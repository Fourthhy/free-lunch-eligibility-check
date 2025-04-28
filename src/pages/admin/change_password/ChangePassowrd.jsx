import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

import EnterEmail from "./modals/EnterEmail";
import EnterCode from "./modals/EnterCode";

export default function ChangePassword() {
    return (
        <>
            <div className="w-full h-screen relative">
                <img
                    src="./change_password_page_background.jpg"
                    alt="background image"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 z-10 flex items-start justify-start m-4">
                <div className="cursor-pointer">
                    <Link to="/admin_login">
                        <MoveLeft />
                    </Link>
                </div>
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                {/* <EnterEmail /> */}
                <EnterCode />
            </div>
        </>
    );
}