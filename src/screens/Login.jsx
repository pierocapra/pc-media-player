// import React from 'react'
// import { loginEndpoint } from "../spotify"
// import '../styles/login.css'

// export default function Login() {
//   return (
//     <div className="login-page">
//       <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="logo-spotify" className="logo"/>
//       <a href={loginEndpoint}>
//         <div className="login-btn">
//             LOG IN
//         </div>
//       </a>
//     </div>
//   )
// }

// Vite React frontend (Login component)

import React from 'react';
import '../styles/login.css'

const loginEndpoint = "http://localhost:5000/login";  // URL of your backend login route

export default function Login() {
  return (
    <div className="login-page">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="logo-spotify" className="logo"/>
      <a href={loginEndpoint}>
        <div className="login-btn">
            LOG IN
        </div>
      </a>
    </div>
  );
}
