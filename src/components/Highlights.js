import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const calculateInsights = dataset => {
	const highlights = {
		'Runs': 0,
		'Wickets': 0,
		'Average': 0,
		'50s': 0,
		'100s': 0,
		'Highest Score': 0
	};
	let max = 0, innings = 0;
	for(let item of dataset) {
		const batting_score = parseInt(item['batting_score']);
		const wickets = parseInt(item['wickets']);
		if(!isNaN(batting_score)) {
			highlights['Runs'] += batting_score;
			innings += 1;
		}
		highlights['Wickets'] += isNaN(wickets) ? 0 : parseInt(wickets);
		if(batting_score >= 50 && batting_score < 100) highlights['50s'] += 1;
		if(batting_score >= 100) highlights['100s'] += 1;
		if(batting_score > max) max = batting_score;
	}
	highlights['Average'] = (highlights['Runs'] / innings).toFixed(2);
	highlights['Highest Score'] = max;
	return highlights;
};

const Highlights = props => {
	const highlights = calculateInsights(props.dataset);
	if(window.innerWidth >= 795)
		return (
			<Container>
				<Row>
					<Col>
						<h2>Highlights</h2>
					</Col>
				</Row>
				<Row>
					{Object.keys(highlights).map(key => {
						return (
							<Col xs={12} md={6} lg={4} key={key}>
								<h4>{key}</h4>
								<h6>{highlights[key]}</h6>
							</Col>
						);
					})}
				</Row>
			</Container>
		);
	else
		return(
			<div>Can't display for smaller viewports</div>
		);
};

export default Highlights;
