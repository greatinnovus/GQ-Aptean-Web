import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Dropdown, MenuItem, DropdownButton } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import _ from "lodash";


import TextInput from '../../shared/Fields/TextInput';
import SelectBox from '../../shared/Fields/SelectBox';
import Constant from '../../helpers/constant';
import CheckBox from '../../shared/Fields/CheckBox';
import Validate from '../../helpers/validate';
import SearchPrompt from '../../shared/Modal/SearchPromptModal'
import searchResAntibody from '../../services/searchResAntibody';
import st26service from '../../services/st26service';
import { PinDropSharp } from '@material-ui/icons';




const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        width: '96%',
        margin: '0 auto 28px',
        minHeight: '260px',
        // borderBottom: '1px solid #cec7c7',
        padding: '23px 16px 14px',
    },
    headerPipe: {
        margin: '0 10px'
    },
    searchInput: {
        width: '30%'
    },
    antibodyNumInput: {
        width: '8%'
    }
}));

function ParsedXml(props) {
    const { t, i18n } = useTranslation('common');
    const classes = useStyles();
    const history = useHistory();
    const [selectData, setSelectData] = useState();
    const [searchModal, setSearchModal] = useState(false);
    // const [strategy, setStrategy] = useState('genepast');
    const [authInfo, setAuthInfo] = useState();
    // const [workflowId, setWorkflowId] = useState();
    const [patientDBData, setPatientDBData] = useState(Constant.patientSearchDatabases);
    const [disableSearch, setDisableSearch] = React.useState(false);
    const [formdata, setFormData] = useState({});
    const { workflowId } = useParams();
    console.log(props.location.state[0],'hallelj');

    useEffect(async () => {
        const getResponse = await searchResAntibody.getAuthInfoAB(workflowId);
        if (getResponse && getResponse.response_status == 0) {
            setAuthInfo(getResponse.response_content);
            updateFormData(getResponse.response_content);
            //setDisableSearch(true);

            console.log(disableSearch, 'disableSearch');
        }
        //dispatch(userActions.logout()); 
    }, []);
    function updateFormData(data) {
        setFormData(data.formData);
        var expiredTime = data.expiredTime;
        if (expiredTime && expiredTime.date) {
            var expiredTimeInSecs = Math.round(new Date(expiredTime.date).getTime() / 1000);
            // Sets the session timeout based on the user expired time in database, -90 for timeout 60 secs and 30 more buffer
            expiredTimeInSecs = expiredTimeInSecs - Math.round(new Date().getTime() / 1000) - 90;
            // Idle.setIdle(expiredTimeInSecs < 0 ? (30 * 59) : expiredTimeInSecs);
            //Idle.watch();
            //console.log(Idle.getIdle());

            console.log("NRB expired at: " + expiredTime.date);
        }
    }

    function cncl(){
        history.push('/convertsequence');
    }

    function handleChange(e) {
        //this.setState({body: event.target.value});
        console.log(e.target.value);

        //return val;
      }
    
    const formik = useFormik({
        initialValues: {
            st26input: formdata.st26input 
            
        },
        enableReinitialize: true,
        //validationSchema: Validate.AntibodySearchValidation(),
        onSubmit: async (values) => {
            let { st26input } = values;
            console.log(values, 'values');
            console.log("heloooooo");

            let postData = {
                xml_seq: st26input
            }

            const getResponse = await st26service.convertXml(postData, history, t);
            console.log(getResponse,'getresp');
            if (getResponse == 0) {
                history.push({
                    pathname: '/home',
                    //state: postData 
                    });
            } else {
                toast.error('Error in Search');
            }
            
           
            /*
            // console.log(strategyItem,'strategyItem');
            setSearchModal(true);
            let parentId = '';
            let postData = {
                qdb_seq_hc: hcFullSeq,
                
                parent_id: parentId
            }
            // console.log(postData, 'postData');
            const getResponse = await searchResAntibody.submitAnitbodySearch(postData, history, t);
            setSearchModal(false);
            if (getResponse && getResponse.response_status == 0) {
                history.push('/home');
            } else {
                toast.error('Error in Search');
            }
            */

            // console.log(getResponse, 'getResponse');
            // history.push('/home');
        },
    });
    return (
        <div className={classes.grow}>
            <form name="antibodySearchForm" onSubmit={formik.handleSubmit} className={classes.loginDiv}>
               
                <Row>
                
                    <Col lg="12" md="12" className="mb-2">
                        <h6 className={"appTextColor loginTitle"}>CONVERTED XML</h6>

                        <DropdownButton id="dropdown-basic-button" color={'default'} className={"text-capitalize mr-2 "} >
                            <Dropdown.Item href="#/action-1">Work with: Nucleotide Sequence</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Work with: Nucleotide Sequence</Dropdown.Item>
                            
                        </DropdownButton>

                        <Row className="mb-3">
                            
                                <Col lg="12" md="12" className="p-0 content float-left">

                                    <div className="form-group px-3 ">
                                        
                                        <TextInput 
                                            rows="25"
                                            multiline={true}
                                            fullWidth
                                            id="st26input"
                                            name="st26input"
                                            //data= "sdfdsfdfffd"
                                            //label="Copy and Paste your ST.26 XML sequences here"
                                            variant="outlined"
                                            //value={props.location.state[1]}
                                            defaultValue={props.location.state[1]}
                                            onChange={handleChange}
                                            error={formik.touched.st26input && Boolean(formik.errors.st26input)}
                                            helperText={formik.errors.st26input}
                                            //disabled={authInfo && authInfo.redo}
                                        />
                                    </div>
                        
                                </Col>
                            
                        </Row>
                        <hr />
                    </Col>

                   
                
                    <Col lg="12" md="12" className="float-right mb-3">
                        <Button color="primary" variant="contained" className={" text-capitalize mr-2 float-right primaryBtn"} type="submit" >{t('Next')}</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" color={'default'} className={"text-capitalize mr-2 disableBtnBorder float-right"} onClick={cncl}>{t('cancel')}</Button>
                    </Col>
                </Row>

            </form>
            
        </div>

    )

}

export default ParsedXml;