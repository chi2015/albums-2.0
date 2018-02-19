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
		console.log('albums', this);
		let ret = this.albums.filter(album => album.year == this.year && album.month == this.month);
		console.log('ret', ret);
		return this.albums.filter(album => album.year == this.year && album.month == this.month);
	}
	
	get albumsCount() {
		return this.albumsList().length;
	}
	
	@action
	addAlbum(data) {
		this.albums.push(new AlbumModel(data));
		console.log('albums list', this.albums);
	}
	
	constructor(year, month) {
		this.year = year;
		this.month = month;
		this.albums = [];
		this.addedDates = {};
	}
}