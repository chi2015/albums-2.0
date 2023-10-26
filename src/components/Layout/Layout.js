import React, { useState, useEffect } from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import Modal from "react-modal";

import AlbumsButton from '../glamorous/AlbumsButton';
import AddAlbumBlock from "./AddAlbumBlock";
import HeadText from '../glamorous/HeadText';

import glamorous from 'glamorous';
import request from '../../request';

const LayoutBlock = glamorous.div({
	margin: '0 auto',
	maxWidth: 900,
	minHeight: '100%'
});

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
	  //  maxHeight            : '500px',
	  //  minWidth : '450px',
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

const errorCustomStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
	    maxHeight            : '90px',
		right                 : 'auto',
		bottom                : 'auto',
		textAlign   :          'center',
		display    :             'flex',
		flexDirection :         'column',
		justifyContent : 'space-around',
		alignItems : 'center',
		transform             : 'translate(-50%, -50%)'
	}
}

const Layout = () => {
  const d = new Date();
  const [year, setYear] = useState(d.getFullYear() - 1);
  const [month, setMonth] = useState(`0${d.getMonth() + 1}`.slice(-2));
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState('add');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState(false);
  
  useEffect(() => {
  	Modal.setAppElement('body');
  }, [])
  
  useEffect(() => {
  	if (loading) {
  		request({ action: 'list', year, month }).then(data => {
  			if (data?.ok && Array.isArray(data?.albums)) {
  				setAlbums(data.albums);
  			} else {
  				setError(true);
  				setErrorText('Error loading albums');
  			}
  		}).catch(() => {
  			setError(true);
  			setErrorText('Error loading albums');
  		}).finally(() => setLoading(false))
  	}
  }, [loading])
  
  useEffect(() => {
  	setLoading(true);
  }, [year, month])
  
  const openAddModal = () => {
  	setMode('add');
  	setModal(true);
  }
  
  const openEditModal = item => {
  	setMode('edit');
  	setAlbum(item);
  	setModal(true);
  }
  
  const closeModal = () => setModal(false);
  
  const closeErrorModal = () => setError(false);
  
  const changeDate = (year, month) => {
  	setYear(year);
  	setMonth(month);
  }
  
  const okCallback = () => {
  	setModal(false);
  	setLoading(true);
  }
  
  const errorCallback = (error, close) => {
  	if (close) {
  		setModal(false);
  	}
  	setErrorText(error);
  	setError(true);
  }
  
  
  return (<LayoutBlock>
  	<Header changeDate={changeDate} year={year} month={month} add={openAddModal} />
  	<Content 
  		albums={albums} 
  		add={openAddModal} 
  		loading={loading} 
  		openEditModal={openEditModal}
  	/>
  	<Footer/>
  	<Modal isOpen={modal} onRequestClose={closeModal} style={customStyles}>
			<AddAlbumBlock year={year} 
						   month={month} 
						   okCallback={okCallback} 
						   errorCallback={errorCallback} 
						   mode={mode}
						   album={album}/>
		</Modal>
		<Modal isOpen={error} onRequestClose={closeErrorModal} style={errorCustomStyles}>
			<HeadText>{errorText}</HeadText>
			<AlbumsButton onClick={closeErrorModal}>OK</AlbumsButton>
		</Modal>
  
  </LayoutBlock>);
}

export default Layout;
