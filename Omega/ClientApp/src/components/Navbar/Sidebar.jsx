import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5"
import { IoCalendarOutline } from "react-icons/io5"
import { MdOutlineKeyboardVoice } from "react-icons/md"
import { IoMusicalNotesOutline } from "react-icons/io5"
import { BsCardChecklist } from "react-icons/bs"
import { RiSettings4Line } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
    const menus = [
        { name: "Home", link: "/", icon: IoHomeOutline },
        { name: "Calendar", link: "/home", icon: IoCalendarOutline },
        { name: "Voice assistent", link: "/voice-assistant", icon: MdOutlineKeyboardVoice },
        { name: "Music", link: "/spotify/auth", icon: IoMusicalNotesOutline, margin: true },
        { name: "Setting", link: "/", icon: RiSettings4Line },
        { name: "Logout", link: "/api/user", icon: RiLogoutBoxLine }
    ];

    
    const [open, setOpen] = useState(true);
    return (
        <section className="flex gap-6 ">
            <div
                className={`bg-[#1446A0] min-h-screen ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-4`}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {/* 
                    <div className="flex items-center justify-center w-14 h-14  ">
                        <img src="/Sources/img/profile_img/avatar_default.jpg" alt="Logo" className="w-12 h-12   rounded-full" />
                    </div>
                    */}
                    {menus?.map((menu, i) => (
                        <a
                            href={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-white rounded-md hover:text-secondary`}
                        >

                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full text-white">
                <Outlet className = "w-full h-screen " />
            </div>
        </section>
    );
};

export default Sidebar;