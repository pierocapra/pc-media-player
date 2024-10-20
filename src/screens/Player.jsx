import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

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
          <ul>
            {playlistData?.tracks?.items?.map((track)=>{
              return <p key={track.track.id} >{track.track.name}</p>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
