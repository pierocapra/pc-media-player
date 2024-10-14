import React, { useEffect, useState } from 'react'
import './sidebar.css'
import SidebarButton from "./SidebarButton"
import { MdFavorite, MdSpaceDashboard } from "react-icons/md"
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa"
import { IoLibrary } from "react-icons/io5"
import apiClient from "../../spotify"

export default function Sidebar() {
    const [image, setImage] = useState("https://picsum.photos/50/50")
    useEffect(()=>{
        apiClient.get("me").then(response => {setImage(response.data.images[0].url)})
    }, [])
  return (
    <div className="sidebar-container">
        <img src={image} alt="profile-image" className="profile-image" />
        <div>
            <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />}/>
            <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />}/>
            <SidebarButton title="Player" to="/player" icon={<FaPlay />}/>
            <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />}/>
            <SidebarButton title="Library" to="/" icon={<IoLibrary />}/>
        </div>
        <SidebarButton title="Sign Out" to="/signout" icon={<FaSignOutAlt />}/>
    </div>
  )
}
