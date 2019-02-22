import React from 'react';

const MatchType = props => {
	return (
		<div className="match-style">
			{props.match_style.map((choice, index) => (
				<label key={index}>
					<input type="radio"
						name="vote"
						value={choice.value}
						key={index}
						checked={props.selected_match === choice.value}
						onChange={props.onChange}
					/>
					{choice.label}
				</label>
			))}
		</div>
	);
};

export default MatchType;
