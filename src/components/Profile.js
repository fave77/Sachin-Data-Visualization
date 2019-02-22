import React from 'react';
import { Carousel } from 'react-bootstrap';
import sachin1 from '../images/sachin-1.jpg';
import sachin2 from '../images/sachin-2.jpg';
import sachin3 from '../images/sachin-3.jpg';

const Profile = _ => (
	<Carousel>
		<Carousel.Item>
			<img
				className="d-block w-100" src={sachin1} alt="First slide" />
			<Carousel.Caption>
				<h3>Sachin Tendulkar</h3>
			</Carousel.Caption>
		</Carousel.Item>
		<Carousel.Item>
			<img className="d-block w-100" src={sachin2} alt="Second slide" />
			<Carousel.Caption>
				<h3>Sachin Tendulkar</h3>
			</Carousel.Caption>
		</Carousel.Item>
		<Carousel.Item>
			<img className="d-block w-100" src={sachin3} alt="Second slide" />
			<Carousel.Caption>
				<h3>Sachin Tendulkar</h3>
			</Carousel.Caption>
		</Carousel.Item>
	</Carousel>
);

export default Profile;
