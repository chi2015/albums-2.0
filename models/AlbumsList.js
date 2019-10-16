import { observable, computed, action } from "mobx";

import AlbumModel from "./Album";

const ALL_YEARS = "0";
const ALL_MONTHS = "00";

export default class AlbumsListModel {
	id = Math.random();
	@observable albums = [];
	@observable year;
	@observable month;
	@observable addedDates = {};
	
	@action
	albumsList(year, month) {
		return this.albums.filter(album => (album.year == year || year == ALL_YEARS) && (album.month == month || month == ALL_MONTHS));
	}
	
	albumsCount(year, month) {
		return this.albumsList(year, month).length;
	}
	addDate(year, month) {
		const currentYear = new Date().getFullYear();
		for(let y=2000; y<=currentYear; y++) {
			if ((y == year || year == ALL_YEARS) && !this.addedDates[""+y]) {
				this.addedDates[""+y] = {};
				for (let m=1; m<=12; m++)
					if (m == month || month == ALL_MONTHS)
						this.addedDates[""+y][m < 10 ? "0"+m : ""+m] = true;
			}
		}
	}

	addAlbum(data) {
		if (!this.getAlbumById(data.id)) this.albums.push(new AlbumModel(data));
		console.log('date:', this.year, this.month);
		console.log('albums list', this.albumsList);
	}

	editAlbum(data) {
		this.albums.forEach((album, index) => {
			if (data.id == album.id) this.albums[index].edit(data);
		});
	}

	deleteAlbum(id) {
		this.albums = this.albums.filter(album => album.id != id);
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
