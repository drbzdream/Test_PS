import React, {Component} from 'react'
import { Link } from 'react-router'
import {
	Button,
	Image,
	Glyphicon,
	DropdownButton,
	MenuItem,
	ButtonToolbar,
	FormGroup,
	ControlLabel,
	FormControl,
	option
} from 'react-bootstrap'
import {
	testpic
} from 'assets/images'
import 'components/EachBuilding.css'
import 'components/Room.css'

class Room extends Component {
	render(){
		return(
			<div className='show_room'>
			<br />
				
				<div className='each_room-detail'>

				
				<br />
				<br />
				</div>

				<div className='room_status'>
					<div>
						<h3>OVERALL DEVICE</h3>
					</div>
					<div>
						<h3>AMOUNT : <span>1 Device</span></h3>
					</div>
					
				</div>

				<div className='device_status'>
					<div>
						<h3>My Computer</h3>
					</div>
					<div>
						<h3>Status : Normal</h3>
					</div>
					
				</div>
				<div className='detail_floor'>
					<p>NAME Titivorada's macbook</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>10 Feb 2017</span></h4>
						<h4>PERFORMANCE : 99% </h4>
						<h4>BUILDING : <span>15</span> , FLOOR : <span>7</span> , ROOM : <span>710</span></h4> 
						<h4>DESCRIPTION : -</h4>
						<Link to=''>
							<Button bsStyle="info">Edit</Button>
						</Link>
					</div>
				
					
				</div>


				
			</div>
			)
	}
}

export default Room