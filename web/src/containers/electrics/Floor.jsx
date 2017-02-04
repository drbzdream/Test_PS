import React, {Component} from 'react'
import { Link } from 'react-router'
import 'components/Floor.css'
import {
	Button,
	Image
} from 'react-bootstrap'
import {
	testpic
} from 'assets/images'
import 'components/EachBuilding.css'
import 'components/Floor.css'



class Floor extends Component {
	render(){
		return(
			<div className='show_floor'>
				<br />
				<div className='each_floor-detail'>
				<Link to='/eachbuilding'>
					<Button bsStyle="primary">Back to Building 15</Button>
				</Link>
				<br />
				<br />
				<h3>Floor 2</h3>
				</div>
				<div className='img_test'>
					<Image src={testpic} />
				</div>
				<div className='detail_floor'>
					<p>Room 201</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='/room'>
							<Button bsStyle="info">room 201</Button>
						</Link>
					</div>
				
					
				</div>

				<div className='detail_floor'>
					<p>Room 202</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='/room'>
							<Button bsStyle="info">room 202</Button>
						</Link>
					</div>
				
					
				</div>

				<div className='detail_floor'>
					<p>Room 203</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='/room'>
							<Button bsStyle="info">room 203</Button>
						</Link>
					</div>
				
					
				</div>

				
			</div>
			)
	}
}

export default Floor