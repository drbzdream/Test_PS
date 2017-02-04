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

				<div className="filter">
				    <ButtonToolbar>
				    <p className="p_button"> Filter By : </p>
				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Building</option>
				        <option value="other">Building1</option>
				        <option value="other">Building2</option>
				        <option value="other">Building3</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Floor</option>
				        <option value="other">Floor1</option>
				        <option value="other">Floor2</option>
				        <option value="other">Floor3</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Room</option>
				        <option value="other">Room1</option>
				        <option value="other">Room2</option>
				        <option value="other">Room3</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				     
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Stutas</option>
				        <option value="other">Avaliable</option>
				        <option value="other">Busy</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Sort by</option>
				        <option value="other">Descending Order</option>
				        <option value="other">Ascending Order</option>
				      </FormControl>
				    </FormGroup>

				    <Button bsStyle="danger">Submit</Button>
				    </ButtonToolbar>

				    

			    </div>
				<br />
				<br />
				</div>

				<div className='room_status'>
					<div>
						<h3>OVERALL DEVICE</h3>
					</div>
					<div>
						<h3>AMOUNT : <span>20 Device</span></h3>
					</div>
					
				</div>

				<div className='device_status'>
					<div>
						<h3>AIR CONDITION</h3>
					</div>
					<div>
						<h3>STATUS <Glyphicon glyph="eye-open" /></h3>
					</div>
					
				</div>
				<div className='detail_floor'>
					<p>NAME AIR201</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>ENERGY TOTAL : 2000 </h4>
						<h4>BUILDING : <span>15</span> , FLOOR : <span>2</span> , ROOM : <span>201</span></h4> 
						<h4>DESCRIPTION : ......</h4>
						<Link to='infodevice/editdevice'>
							<Button bsStyle="danger">Edit</Button>
						</Link>
					</div>
				
					
				</div>

				<div className='device_status'>
					<div>
						<h3>AIR CONDITION</h3>
					</div>
					<div>
						<h3>STATUS <Glyphicon glyph="eye-open" /></h3>
					</div>
					
				</div>
				<div className='detail_floor'>
					<p>NAME AIR201</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>ENERGY TOTAL : 2000 </h4>
						<h4>BUILDING : <span>15</span> , FLOOR : <span>2</span> , ROOM : <span>201</span></h4> 
						<h4>DESCRIPTION : ......</h4>
						<Link to='infodevice/editdevice'>
							<Button bsStyle="danger">Edit</Button>
						</Link>
					</div>	
				</div>

				<div className='device_status'>
					<div>
						<h3>AIR CONDITION</h3>
					</div>
					<div>
						<h3>STATUS <Glyphicon glyph="eye-open" /></h3>
					</div>
					
				</div>
				<div className='detail_floor'>
					<p>NAME AIR201</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>ENERGY TOTAL : 2000 </h4>
						<h4>BUILDING : <span>15</span> , FLOOR : <span>2</span> , ROOM : <span>201</span></h4> 
						<h4>DESCRIPTION : ......</h4>
						<Link to='infodevice/editdevice'>
							<Button bsStyle="danger">Edit</Button>
						</Link>
					</div>
				
					
				</div>


				<div className='device_status'>
					<div>
						<h3>AIR CONDITION</h3>
					</div>
					<div>
						<h3>STATUS <Glyphicon glyph="eye-open" /></h3>
					</div>
					
				</div>
				<div className='detail_floor'>
					<p>NAME AIR201</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>ENERGY TOTAL : 2000 </h4>
						<h4>BUILDING : <span>15</span> , FLOOR : <span>2</span> , ROOM : <span>201</span></h4> 
						<h4>DESCRIPTION : ......</h4>
						<Link to='infodevice/editdevice'>
							<Button bsStyle="danger">Edit</Button>
						</Link>
					</div>
				
					
				</div>

				<div className='device_status'>
					<div>
						<h3>AIR CONDITION</h3>
					</div>
					<div>
						<h3>STATUS <Glyphicon glyph="eye-open" /></h3>
					</div>
					
				</div>
				<div className='detail_floor'>
					<p>NAME AIR201</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>ENERGY TOTAL : 2000 </h4>
						<h4>BUILDING : <span>15</span> , FLOOR : <span>2</span> , ROOM : <span>201</span></h4> 
						<h4>DESCRIPTION : ......</h4>
						<Link to='infodevice/editdevice'>
							<Button bsStyle="danger">Edit</Button>
						</Link>
					</div>
				
					
				</div>

			</div>
			)
	}
}

export default Room