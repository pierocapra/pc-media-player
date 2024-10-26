import React from 'react'

import "./controls.css"

export default function Controls() {
  return (
    <div className="control-bar">
        <div className="control-container">
          <div className="track-info">
            {/* <h4>{currentTrack?.name || "No track selected"}</h4>
            <p>{currentTrack?.artists?.map(artist => artist.name).join(", ")}</p> */}

            <h4>Track</h4>
            <p>Artist</p>
          </div>
          <div className="controls">
            {/* <button onClick={handlePrevTrack}>⏮️</button>
            <button onClick={togglePlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
            <button onClick={handleNextTrack}>⏭️</button> */}
            <button >⏮️</button>
            <button >▶️</button>
            <button >⏭️</button>
          </div>
        </div>
        </div>
  )
}
