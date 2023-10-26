import React from "react";
import Albums from "../Albums/Albums";
import NoAlbums from "../Albums/NoAlbums";
import Loading from "../Albums/Loading";

const Content = ({ loading, albums, add, openEditModal }) => loading ? <div><Loading/></div> : <div>
	{ albums.length ? <Albums albums={albums} openEditModal={openEditModal}  /> : <NoAlbums add={add}/> }
</div>;

export default Content;
