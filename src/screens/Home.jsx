import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Trending from "./Trending"
import Player from "./Player"
import Favourites from "./Favourites"
import Library from "./Library"
import Feed from "./Feed";


export default function Home() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/player" element={<Player />} />
            <Route path="/favourites" element={<Favourites />} />
        </Routes>
    </Router>
  )
}
