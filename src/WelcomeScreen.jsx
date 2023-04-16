import React from "react";
import "./App.scss";

function WelcomeScreen(props) {
	return props.showWelcomeScreen ? (
		<div className='WelcomeScreen'>
			<h1>
				Welcome to
				<br />
				<span className='meet-welcome'>Meet</span>
			</h1>
			<br />
			<h4>Want to see upcoming global events for full-stack developers?</h4>
			<br />
			<br />
			<h6>Sign in to start searching!</h6>
			<br />
			<br />
			<div
				className='button_cont'
				align='center'
			>
				<div className='google-btn'>
					<div className='google-icon-wrapper'>
						<img
							className='google-icon'
							src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
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
			<br />
			<a
				href='https://brett-ranieri.github.io/meet/privacy.html'
				rel='nofollow noopener'
			>
				Privacy policy
			</a>
		</div>
	) : null;
}

export default WelcomeScreen;
