import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Newsupdate from '../../shared/newspdate';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        width: '96%',
        margin: '117px auto 28px',
        minHeight: '260px',
        borderBottom: '1px solid #cec7c7',
        borderTop: '1px solid #cec7c7',
        padding: '23px 0 5px'
    },
    savedSearchForm: {
        backgroundColor: '#f5f2f2',
        height: '250px',
        paddingTop: '30px',
        paddingLeft: '20px',
        overflowX: 'auto'
    },
    anchorTag: {
        textDecoration: 'none',
        color: "#008EC5"
    },
    p: {
        color: "#008EC5",
        size: "20px"
    },
    textHeading: {
        fontWeight: "700 !important",
        marginBottom: "5px"
    },
    columnPadding: {
        paddingTop: '5px',
        paddingLeft: '20px'
    },
    pTagMargin: {
        marginBottom: "0px",
        fontWeight: "500"
    },
    applicationPanelRow: {
        marginBottom: "15px",
        minHeight: '70px'
    },
    appIcon:{
        fontSize: '50px',
        color: '#5A6868'
    },
    '@media (min-width: 780px)' : {
        newsContent:{
            marginLeft: '0',
            paddingLeft: '0',
            borderLeft: 'none',
        }
    }
}));

function MostUsedPanel() {
    const { t, i18n } = useTranslation('common');

    const classes = useStyles();

    // reset login status
    useEffect(() => {
        //dispatch(userActions.logout()); 
    }, []);

    return (
        <div className={classes.grow}>
            {/* <Container className="p-0 m-5"> */}
                <Row>
                    <Col md="9" sm="12">
                        <Newsupdate isMostUsedPanel={true} />
                    </Col>
                    <Col md="3" sm="12" className={classes.columnPadding +' mb-3'}>
                        <div className={classes.savedSearchForm}>
                            <p className={'appTextColor '+classes.textHeading}>{t('savedSearchForms')}</p>
                            <p className={classes.pTagMargin}><a className={classes.anchorTag} href='#' onClick={e => e.preventDefault()}>{t('ipSequence')}</a></p>
                            <p className={classes.pTagMargin}><a className={classes.anchorTag} href='#' onClick={e => e.preventDefault()}>{t('patentFullText')}</a></p>
                            <p className={classes.pTagMargin}><a className={classes.anchorTag} href='#' onClick={e => e.preventDefault()}>{t('sequenceVariation')}</a></p>
                            <p className={classes.pTagMargin}><a className={classes.anchorTag} href='#' onClick={e => e.preventDefault()}>{t('antibodySequence')}</a></p>
                            <p className={classes.pTagMargin}><a className={classes.anchorTag} href='#' onClick={e => e.preventDefault()}>{t('patientnumlookup')}</a></p>
                        </div>
                    </Col>
                </Row>
            {/* </Container> */}

        </div>

    );
}

export default MostUsedPanel;