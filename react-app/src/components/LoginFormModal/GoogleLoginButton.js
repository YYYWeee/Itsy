import React from 'react';


function GoogleLoginButton() {

  const handleCredentialResponse=(response)=>{
    // Here we can do whatever process with the response we want
    // Note that response.credential is a JWT ID token
    console.log("Encoded JWT ID token: " + response.credential);

  }

  return (
    <>

      <div id="g_id_onload"
        data-client_id="5074633217-b1gdggq4dpftlsvgci6vej2ppo9q29cs.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
        data-auto_prompt="true"
        data-ux_mode="popup">xxx
      </div>
    </>
  );
}

export default GoogleLoginButton;
