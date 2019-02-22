import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Intro = _ => (
	<Container>
		<Row>
			<Col>
				<h2>Introduction</h2>
				<p>
					<a href="https://en.wikipedia.org/wiki/Sachin_Tendulkar" target="_blank">
					Sachin Ramesh Tendulkar</a> (born 24 April 1973) is a former Indian international
					cricketer and a former captain of the Indian national team. He is the highest
					run scorer of all time in International cricket. Tendulkar took up cricket at
					the age of eleven, made his Test debut on 15 November 1989 against Pakistan in
					Karachi at the age of sixteen, and went on to represent Mumbai domestically and
					India internationally for close to twenty-four years. He is the only player to
					have scored one hundred international centuries, the first batsman to score a
					double century in a ODI and the holder of the record for the most number of runs
					in both Test and ODI. He is colloquially known as <strong>Master Blaster</strong>,
					and often referred to as the <em>God of Cricket</em> by Indian cricket followers.
				</p>
			</Col>
		</Row>
	</Container>
);

export default Intro;
