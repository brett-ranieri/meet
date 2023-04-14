import React from "react";

function WelcomeScreen(props) {
	return props.showWelcomeScreen ? (
		<div className='WelcomeScreen'>
			<h1>
				Welcome to <span>Meet</span>
			</h1>
			<h4>Want to see upcoming global events for full-stack developers?</h4>
			<h6>Sign in to start searching!</h6>
			<div
				className='button_cont'
				align='center'
			>
				<div className='google-btn'>
					<div className='google-icon-wrapper'>
						<img
							className='goggle-icon'
							src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
              o.svg'
							alt='Google sign-in'
						/>
					</div>
					<button
						onClick={() => {
							props.getAccessToken();
						}}
						rel='nofollow noopener'
						className='btn-text'
					>
						Sign in with Google
					</button>
				</div>
			</div>
			<a
				href='https://brett-ranieri.github.io/meet/privacy.html'
				rel='nofollow noopener'
			>
				Privay policy
			</a>
		</div>
	) : null;
}

export default WelcomeScreen;
