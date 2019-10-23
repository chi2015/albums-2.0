import { observable, computed, action, decorate } from "mobx"

export default class AlbumModel {
	id = Math.random();
	title;
	artist;
	cover;
	year;
	month;
	itunes_link;
	copyright;

	get imgSrc() {
		return this.cover || "cd1.jpg";
	}
	
	get copyrightString() {
		return this.copyright ? "\u2117"+" "+this.copyright : "";	
	}
	
	constructor(data) {
		this.id = data.id;
		this.title = data.title;
		this.artist = data.artist;
		this.cover = data.cover;
		this.year = data.year;
		this.month = +data.month < 10 ? "0"+data.month : data.month;
		this.itunes_link = data.itunes_link;
		this.copyright = data.copyright;
	}

	edit(data) {
		if (data.title) this.title = data.title;
		if (data.artist) this.artist = data.artist;
		if (data.cover) this.cover = data.cover;
		if (data.year) this.year = data.year;
		if (data.month) this.month = data.month;
		if (data.itunes_link) this.itunes_link = data.itunes_link;
		if (data.copyright) this.copyright = data.copyright;
	}
}

decorate(AlbumModel, {
	id: observable,
	title: observable,
	artist: observable,
	cover: observable,
	year: observable,
	month: observable,
	itunes_link: observable,
	copyright: observable,
	imgSrc: computed,
	copyrightString: computed,
	edit: action
});
