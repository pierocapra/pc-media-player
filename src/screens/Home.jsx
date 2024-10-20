import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Trending from "./Trending"
import Player from "./Player"
import Favorites from "./Favorites"
import Library from "./Library"
import Feed from "./Feed";
import Sidebar from "../components/sidebar/Sidebar"
import '../styles/home.css'

export default function Home() {

    return  (
            <Router>
                <div className="main-body">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Library />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/player" element={<Player />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes> 
                </div>
            </Router>
        )
}
