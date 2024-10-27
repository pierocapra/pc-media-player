import React from 'react'

import "./controls.css"

export default function Controls({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }) {
  return (
    <div className="control-bar">
        <div className="control-container">
          <div className="track-info">
            <h4>{currentTrack?.name || "No track selected"}</h4>
            <p>{currentTrack?.artists?.map(artist => artist.name).join(", ")}</p>
          </div>
          <div className="controls">
            <button onClick={onPrevious}>⏮️</button>
            <button onClick={onPlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
            <button onClick={onNext}>⏭️</button>
          </div>
        </div>
        </div>
  )
}
