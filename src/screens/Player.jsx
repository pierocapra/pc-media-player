import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { formatDuration } from "../helpers/helpers";
import apiBase from "../api";

// Styles
import '../styles/player.css'

export default function Player() {
  const location = useLocation();
  const { id } = location.state || {}; 
  const [playlistData, setPlaylistData] = useState({})

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
              <li key={track.track.id} className="track" onClick={() => handleTrackClick(track.track.id)}>
                {/* Play icon */}
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
      </div>
    </div>
  )
}
