import React, {Component} from 'react'
import { Link } from 'react-router'
import {
	Button,
	Image,
	Glyphicon
} from 'react-bootstrap'
import {
	testpic
} from 'assets/images'
import 'components/EachBuilding.css'
import 'components/EachDevice.css'


class EachDevice extends Component {
	render(){
		return(
			<div className="each_device">
				<div className='each_device-detail'>
					<br />
					<h3>INFO ALL DEVICES</h3>
					<br />
					<br />
				</div>
				
				<div className='detail_device'>
					<p>Floor 1</p>
					<p className='device_statis'>Status  <Glyphicon glyph="eye-open" /></p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='infodevice/editdevice'>
							<Button bsStyle="info">Edit</Button>
						</Link>
					</div>

				
					
				</div>
				
				<div className='detail_device'>
					<p>Floor 2</p>
					<p className='device_statis'>Status  <Glyphicon glyph="eye-open" /></p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='infodevice/editdevice'>
							<Button bsStyle="info">Edit</Button>
						</Link>
					</div>
				</div>

				<div className='detail_device'>
					<p>Floor 3</p>
					<p className='device_statis'>Status  <Glyphicon glyph="eye-open" /></p>
					<div className='chart_overview'>
						<Image src={testpic} />
					</div>
					<div className='detail_overview'>
						<br />
						<h4>DATE : <span>20 Jan 2017</span></h4>
						<h4>TOTAL : <span>5000 W</span></h4>
						<h4>BALANCE : <span>None</span></h4>
						<br />
						<Link to='infodevice/editdevice'>
							<Button bsStyle="info">Edit</Button>
						</Link>
					</div>
				</div>

			</div>
			)
	}
}

export default EachDevice