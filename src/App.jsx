import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import apiBase from "./api";

// Components
import Trending from "../src/screens/Trending"
import Player from "../src/screens/Player"
import Favorites from "../src/screens/Favorites"
import Library from "../src/screens/Library"
import Feed from "../src/screens/Feed";
import Controls from "../src/components/controls/Controls"
import Sidebar from "../src/components/sidebar/Sidebar"

// Styles
import './styles/home.css'

function App() {
  const [audio, setAudio] = useState(null);
  const [playlistData, setPlaylistData] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(()=>{
    apiBase.get(`/playlist?id=2HuiFrE8bEIj8wvR53HwvP`).then(function(response) {
      console.log(response)
      setPlaylistData(response.data)
      setCurrentTrack(playlistData.tracks?.items[0].track)
    })
  }, [])

  // Handle track click for play/pause and setting the current track
  const handleTrackOnClick = (track, previewUrl) => {
    if (currentTrack?.id === track.id && audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setCurrentTrack(track);
      setIsPlaying(true);

      newAudio.onended = () => setIsPlaying(false); // Reset isPlaying when track ends
    }
  };

  const setPlaylist = (data) =>{
    setPlaylistData(data)
  } 

  const onNext = () => {
    const currentIndex = playlistData.tracks.items.findIndex(
      (track) => track.track.id === currentTrack?.id
    );

    if (currentIndex >= 0 && currentIndex < playlistData.tracks.items.length - 1) {
      const nextTrack = playlistData.tracks.items[currentIndex + 1].track;
      setCurrentTrack(nextTrack)
      if (isPlaying) {
        handleTrackOnClick(nextTrack, nextTrack.preview_url);
      }
    }
  };

  const onPrevious = () => {
    const currentIndex = playlistData.tracks.items.findIndex(
      (track) => track.track.id === currentTrack?.id
    );

    if (currentIndex > 0) {
      const previousTrack = playlistData.tracks.items[currentIndex - 1].track;
      setCurrentTrack(previousTrack)
      if (isPlaying) {
        handleTrackClick(previousTrack, previousTrack.preview_url);
      }
    }
  };

  return  (
    <Router>
        <div className="main-body">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Library setPlaylist={setPlaylist}/>} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/player" element={
                  <Player 
                    playlistData={playlistData} 
                    handleTrackOnClick={handleTrackOnClick} 
                    currentTrack={currentTrack} 
                  />
                } />
                <Route path="/favorites" element={<Favorites />} />
            </Routes> 
            <Controls 
              currentTrack={currentTrack} 
              isPlaying={isPlaying} 
              onPlayPause={() => handleTrackOnClick(currentTrack, currentTrack.preview_url)}
              onNext={onNext}
              onPrevious={onPrevious}
            />
        </div>
    </Router>
  )
}

export default App
