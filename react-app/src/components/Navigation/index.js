import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/mycamp-logo.jpg'
import { fetchSearchCampsites } from '../../store/campsite';
import { useHistory } from 'react-router-dom';
function Navigation({ isLoaded }) {
	const history= useHistory()
	const dispatch= useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearchInput] = useState('');

	const handleSearchClick = async (e) => {
		e.preventDefault();
		dispatch(fetchSearchCampsites(searchInput)).then(history.push("/search"))
	};

	const handleSearch = (e) => {
		setSearchInput(e.target.value)
	}
	return (
		<div className='nav-container'>
			<div className='nav'>

				<NavLink exact to="/">
					<img className="logo" src={logo} alt="Home" />
				</NavLink>
		</div>
				<form className='nav-searchbar' onSubmit={handleSearchClick}>
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