import { observable, computed, action } from "mobx";

import AlbumModel from "./Album";

export default class AlbumsListModel {
	id = Math.random();
	@observable albums = [];
	@observable year;
	@observable month;
	@observable addedDates = {};
	
	@computed
	
	get albumsList() {
		return this.albums.filter(album => (album.year == this.year || this.year == "0") && (album.month == this.month || this.month == "00"));
	}
	
	get albumsCount() {
		return this.albumsList().length;
	}
	
	@action
	addAlbum(data) {
		if (!this.getAlbumById(data.id)) this.albums.push(new AlbumModel(data));
		console.log('date:', this.year, this.month);
		console.log('albums list', this.albumsList);
	}

	getAlbumById(id) {
		let ret = this.albums.filter(album => album.id == id);
		return ret.length ? ret[0] : false;
	}

	constructor(year, month) {
		this.year = year;
		this.month = month;
		this.albums = [];
		this.addedDates = {};
	}
}
