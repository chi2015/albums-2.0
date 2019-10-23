import React from "react";
import glamorous from "glamorous";
import MediaQueries from "../glamorous/MediaQueries";

export default glamorous.h2({
	fontSize: 16,
	[MediaQueries.phone]: {
		fontSize: '3vw'
	}
})
