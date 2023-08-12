import React,{ useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearchInput] = useState('');
	const handleReserve= () => {
		alert('Feature coming soon')
	}

	const handleSearch= (e) => {
		setSearchInput(e.target.value)
	}
	return (
		<div className='nav-container'>
			<div className='nav-logo'>
				<NavLink exact to="/">Home</NavLink>
			</div>
			<form className='nav-searchbar' onSubmit={handleReserve}>
			<input
						type="text"
						value={searchInput}
						onChange={handleSearch}
						placeholder="Find your next adventure"
					/>
					<button type="submit">Search</button>
				</form>
			<div className='nav-profile'>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
			</div>
		</div>
	);
}

export default Navigation;