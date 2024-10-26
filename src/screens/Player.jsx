import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { formatDuration } from "../helpers/helpers";
import apiBase from "../api";

import Controls from "../components/controls/Controls";

// Styles
import '../styles/player.css'

export default function Player() {
  const location = useLocation();
  const { id } = location.state || {}; 
  const [playlistData, setPlaylistData] = useState({})

  const [currentTrackId, setCurrentTrackId] = useState(null); // Track the current track playing by ID
  const [currentTrack, setCurrentTrack] = useState(null); // Track the current track playing
  const [audio, setAudio] = useState(null); // Audio instance

  // Handle track click to play/pause the track
  const handleTrackClick = (track, trackId, previewUrl) => {
    // If the same track is clicked, toggle play/pause
    if (currentTrackId === trackId && audio) {
      audio.paused ? audio.play() : audio.pause();
    } else {
      // If a different track is clicked, pause the existing track
      if (audio) {
        audio.pause();
      }
      // Create a new audio instance for the new track
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setCurrentTrackId(trackId);
      setCurrentTrack(track)
    }
  };

  useEffect(()=>{
    apiBase.get(`/playlist?id=${id}`).then(function(response) {
      console.log(response)
      setPlaylistData(response.data)
    })
},[])
  
  return (
    <div className="screen-container">
      <div className="player-container">
        <div className="player-header">
          <div className="playlist-img">
            <img src={playlistData?.images?.[0]?.url} alt="" />
          </div>
          <div className="playlist-details">
            <h1>{playlistData?.name}</h1>
            <h6>{playlistData?.description}</h6>
            <div className="playlist-info tag">
              <p>{playlistData?.tracks?.items?.length} Songs - {playlistData?.followers?.total} Followers</p>
            </div>
          </div>
        </div>
        <div className="player-content">
          <div className="playlist-section">
            <ul className="playlist">
              <li className="playlist-header">
                <span></span> {/* Empty space for the play icon header */}
                <span>Track</span>
                <span>Cover</span>
                <span>Album</span>
                <span>Artist</span>
                <span>Duration</span>
              </li>
              <div className="playlist-content">
              {playlistData?.tracks?.items?.map((track) => {
                return (
                  <li key={track.track.id} className="track" onClick={() => handleTrackClick(track.track, track.track.id, track.track.preview_url)}>
                    <span className="play-icon">▶</span>
                    <p>{track.track.name}</p>
                    <img src={track.track?.album?.images?.[0].url} alt={track.track.name} />
                    <p>{track.track.album.name}</p>
                    <p>{track.track.artists[0].name}</p>
                    <p>{formatDuration(track.track.duration_ms)}</p>
                  </li>
                );
              })}
              </div>
            </ul>
          </div>
          <div className="song-details">
            <img src={currentTrack?.album?.images[0]?.url} alt="Album cover" className="album-cover" />
            <div className="song-info">
              <h2>{currentTrack?.name}</h2>
              <p>by {currentTrack?.artists[0].name}</p>
              <p>Album: {currentTrack?.album.name}</p>
              <p>Released on: {currentTrack?.album.release_date}</p>
            </div>
          </div>
        </div>
      </div>
      <Controls></Controls>
    </div>
  )
}
