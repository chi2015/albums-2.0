import { observable, computed } from "mobx";

export default class AlbumModel {
	id = Math.random();
	@observable id;
	@observable title;
	@observable artist;
	@observable cover;
	@observable year;
	@observable month;
	@observable itunes_link;
	@observable copyright;
	
	@computed
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
		this.copyright - data.copyright;
	}
	
		
}
