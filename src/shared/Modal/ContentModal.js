import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import ReactHtmlParser from 'react-html-parser';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	modalHeader: {
		borderBottom: 'none !important'
	},
	footerDiv: {
		padding: '0 30px'
	},
	contentDiv: {
		height: '300px',
		overflowX: 'auto',
		textAlign: 'justify'
	}
}));

function ContentModal(props) {
	const classes = useStyles();
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcente"
			centered
			contentClassName='modalPromptContent'
		>
			<Modal.Header closeButton className={"pt-2 pb-0 " + classes.modalHeader}>
				<Modal.Title id="contained-modal-title-vcenter" className={"text-center w-100"}>
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={"text-center "} closeButton>
				{/* <h4>{props.title}</h4> */}

				<div className={classes.contentDiv}>
					{ReactHtmlParser(props.contentdata)}
					<br></br>  <br></br>
				</div>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Modal>
	);
}

export default ContentModal;