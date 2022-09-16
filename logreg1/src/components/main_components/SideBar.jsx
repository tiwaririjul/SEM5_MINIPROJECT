import "./css/sidebar.css";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CgFolderRemove } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { HiTrendingUp } from "react-icons/hi";
import {
  RiSettingsLine,
  RiPlayListFill,
  RiNeteaseCloudMusicLine,
} from "react-icons/ri";
import { GrHomeRounded } from "react-icons/gr";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const routes = [
  {
    path: "/home",
    name: "Home",
    icon: <GrHomeRounded />,
  },
  {
    path: "/Trends",
    name: "Trends",
    icon: <HiTrendingUp />,
  },
  {
    path: "/albums",
    name: "Albums",
    icon: <CgFolderRemove />,
  },
  {
    path: "/artist",
    name: "Artist",
    icon: <FaRegUser />,
  },
  {
    path: "/liked",
    name: "Liked",
    icon: <FiHeart />,
  },
  {
    path: "/Playlist",
    name: "Playlist",
    icon: <RiPlayListFill />,
  },
  {
    path: "/settings",
    name: "Setting",
    icon: <RiSettingsLine />,
  },
  {
    path: "/login",
    name: "login",
    icon: <FaRegUser />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleforicon = () => setIsOpen(false);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="sidebar-container">
        <motion.div
          animate={{
            width: isOpen ? "190px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <div className="bars">
              <RiNeteaseCloudMusicLine onClick={toggle} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  MVP
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={toggleforicon}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main onClick={toggleforicon}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
