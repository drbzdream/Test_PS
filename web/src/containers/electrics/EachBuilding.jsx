import React, {Component} from 'react'
import { Link } from 'react-router'
import {
	Button,
	Image
} from 'react-bootstrap'
import {
	testpic
} from 'assets/images'
import 'components/EachBuilding.css'

class EachBuilding extends Component {
	render(){
		return(
			<div className="each_building">
				<div className='each_building-detail'>
					<br />
					<Link to='/'>
						<Button bsStyle="primary">Back to Overview</Button>
					</Link>
					<br />
					<br />
					<h3>Building 15</h3>
				</div>
				<div className='img_test'>
					<Image src={testpic} />
				</div>
				
				<div className='detail_floor'>
					<p>Floor 1</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='/floor'>
							<Button bsStyle="info">Floor 1</Button>
						</Link>
					</div>
				
					
				</div>
				
				<div className='detail_floor'>
					<p>Floor 2</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='/floor'>
							<Button bsStyle="info">Floor 2</Button>
						</Link>
					</div>
				</div>

				<div className='detail_floor'>
					<p>Floor 3</p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='/floor'>
							<Button bsStyle="info">Floor 3</Button>
						</Link>
					</div>
				</div>

			</div>
			)
	}
}

export default EachBuilding