import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    
});

export default function CustomPagination({count,showFirstButton,showLastButton,recordPerPage,changePage,className}) {
    const classes = useStyles();
    const {t, i18n} = useTranslation('common');
    let recrdperPage = Math.ceil(count/recordPerPage);
    useEffect(() => {
		(async () => {
			
            
			
		})();
	}, []);
    
    return (
        <Pagination disabled={count.length == 0} className={className} count={recrdperPage} onChange={changePage} showFirstButton={showFirstButton} showLastButton={showLastButton} />
    )
}
