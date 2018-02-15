import React from "react";
import glamorous from "glamorous";

const colors = {
	standard : '#0080fc',
	danger : 'red'
};

export default glamorous.button(
	{
		fontSize: 14,
		margin: 5,
		borderRadius: 5,
		display: 'block',
		textAlign: 'center',
		cursor: 'pointer',
		color: 'white',
		textDecoration: 'none',
		padding: '5px 10px',
		':hover': {
            opacity: 0.7,
            transform: 'translateY(-1px)',
            boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
        },
        ':focus': { outline: 0 }
	},
	props => ({
		backgroundColor : colors[props.buttonType] || colors.standard
	})
);
