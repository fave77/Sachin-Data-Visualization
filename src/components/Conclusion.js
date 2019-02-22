import React from 'react';
import Typed from 'react-typed';

const Conclusion = _ => (
	<footer>
		<h2>Conclusion</h2>
		<p>
			Putting above figures and numbers into perspective, we can easily claim that -
			<br />
			<blockquote>
				<Typed
					strings={['<q>Sachin Tendulkar is the greatest cricketer of all time.</q>']}
					typeSpeed={40}
					backSpeed={5}
					loop
				/>
			</blockquote>
		</p>
	</footer>
);

export default Conclusion;
