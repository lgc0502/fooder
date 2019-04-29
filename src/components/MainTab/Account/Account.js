import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import button1 from '../../../image/headshot.png'
import Appbar from '../SearchPage/AppBar/AppBar.js'
import { auto } from 'async'
const styles = (theme) => ({
	root: {
		height: '100%',
		background: 'linear-gradient(180deg, rgba(255, 255, 255, 1)0%, rgba(255, 193,7, 1)100%)'
	},
	subRoot: {
		margin: 'auto',
		marginTop: '10%',
		width: '80%',
		height: '80%',
		borderRadius: '20px',
		backgroundColor: '#ffffff'
	},
	img: {
		marginTop: '10%',
		width: '80px',
		height: '80px',
		borderRadius: '100px'
	}
})

class Account extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: Number(props.value)
		}
	}

	render() {
		const { classes, handleVehicle } = this.props
		return (
			<div className={classes.root}>
				<Appbar className={classes.appbar} firstpage={0} text={3} />
				<div className={classes.subRoot}>
					<img className={classes.img} src={button1} alt='' />
					<Typography style={{ marginTop: '10px', fontSize: '1rem' }}>使用者</Typography>
					<Typography style={{ marginTop: '30px', fontSize: '1rem' }}>
						{`已收藏了 ${localStorage.getItem('id').split(' ').length - 1} 家餐廳`}
					</Typography>
					<Typography style={{ marginTop: '10%', fontSize: '1rem' }}>交通偏好</Typography>
					<div
						style={{
							display: 'flex',
							marginTop: '3%',
							marginLeft: '50px',
							position: 'relative'
						}}
					>
						<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6)' }}>步行</Typography>
						<input
							type='radio'
							value={0}
							style={{
								msTransform: 'scale(1.5)',
								WebkitTransform: 'scale(1.5)' /* Chrome, Safari, Opera */,
								transform: 'scale(1.5)',
								position: 'absolute',
								right: '40px'
							}}
							checked={this.state.value === 0}
							onChange={() => {
								handleVehicle(0)
								this.setState({
									value: 0
								})
							}}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							marginTop: '5%',
							marginLeft: '50px',
							position: 'relative'
						}}
					>
						<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6)' }}>腳踏車</Typography>
						<input
							type='radio'
							value={1}
							style={{
								msTransform: 'scale(1.5)',
								WebkitTransform: 'scale(1.5)' /* Chrome, Safari, Opera */,
								transform: 'scale(1.5)',
								position: 'absolute',
								right: '40px'
							}}
							checked={this.state.value === 1}
							onChange={() => {
								handleVehicle(1)
								this.setState({
									value: 1
								})
							}}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							marginTop: '5%',
							marginLeft: '50px',
							position: 'relative'
						}}
					>
						<Typography style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6)' }}>汽機車</Typography>
						<input
							type='radio'
							value={2}
							style={{
								msTransform: 'scale(1.5)',
								WebkitTransform: 'scale(1.5)' /* Chrome, Safari, Opera */,
								transform: 'scale(1.5)',
								position: 'absolute',
								right: '40px'
							}}
							checked={this.state.value === 2}
							onChange={() => {
								handleVehicle(2)
								this.setState({
									value: 2
								})
							}}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '80%',
							position: 'absolute',
							bottom: '13%'
						}}
					>
						<Typography
							style={{
								alignSelf: 'center',
								fontSize: '12px',
								textDecoration: 'underline',
								cursor: 'pointer',
								color: '#b3b3b3'
							}}
							onClick={() =>
								window.open(
									'https://www.facebook.com/%E9%A3%9F%E5%9C%88%E5%9C%88-Fooder-2258634121041133/',
									'_blank'
								)
							}
						>
							遇到問題嗎？
						</Typography>
						<Typography
							style={{
								alignSelf: 'center',
								fontSize: '12px',
								textDecoration: 'underline',
								cursor: 'pointer',
								color: '#b3b3b3'
							}}
							onClick={() =>
								window.open(
									'https://www.facebook.com/%E9%A3%9F%E5%9C%88%E5%9C%88-Fooder-2258634121041133/',
									'_blank'
								)
							}
						>
							請點選此處聯繫我們
						</Typography>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Account)
