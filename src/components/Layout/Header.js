import React, { useState, useEffect } from "react";

import ChooseDate from "./ChooseDate";
import Modal from "react-modal";
import DateMonth from "../DateMonth";
import AlbumsButton from '../glamorous/AlbumsButton';
import AddButton from "../glamorous/AddButton";
import glamorous from "glamorous";
import MediaQueries from "../glamorous/MediaQueries";


const Heading = glamorous.h1({
	fontSize: 20,
	[MediaQueries.phone]: {
		fontSize: '4vw'
	}
});

const HeaderBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: 48,
	borderBottom: '#e1e7f2 1px solid'
});

const HeaderTitle = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center'
});

 const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		textAlign   :          'center',
		display    :             'flex',
		flexDirection :         'column',
		justifyContent : 'space-around',
		alignItems : 'center',
		transform             : 'translate(-50%, -50%)'
	}
};


const Header = props => {
	const [modal, setModal] = useState(false);
	const [year, setYear] = useState(props.year);
	const [month, setMonth] = useState(props.month);
	
	useEffect(() => {
		Modal.setAppElement('body');
	}, [])
	
	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);
	
	const getAlbums = () => {
		props.changeDate(year, month);
		closeModal();
	}
	
	const changeDate = (year, month) => {
		setYear(year);
		setMonth(month);
	}
	
	return (
      <HeaderBlock>
		<HeaderTitle>
			<Heading>Albums Calendar Catalog</Heading>
			<AddButton onClick={props.add}/>
		</HeaderTitle>
		<AlbumsButton buttonType="standard" onClick={openModal}>
			<DateMonth month={props.month}/> { props.year > 0 ? props.year : (props.month!="00" ? "" : "All albums") }
		</AlbumsButton>
		<Modal isOpen={modal} onRequestClose={closeModal} style={customStyles}>
			<ChooseDate year={year} month={month} changeDate={changeDate} mode="list" />
			<AlbumsButton onClick={getAlbums}>OK</AlbumsButton>
		</Modal>
	  </HeaderBlock>
    );
	
}

export default Header;
