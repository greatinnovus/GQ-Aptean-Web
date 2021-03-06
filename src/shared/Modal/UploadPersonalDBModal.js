import React, { useState, useEffect, useRef } from 'react';
import DataTable from "react-data-table-component";
import { useDropzone } from 'react-dropzone';
import Modal from 'react-bootstrap/Modal'
import { Row, Col, ModalFooter } from 'react-bootstrap';
import { RadioGroup, FormControlLabel, FormLabel, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useFormik } from 'formik'
import { useTranslation } from "react-i18next";
import { supportMail } from '../../config';
import utilsService, { TOAST_TYPE } from '../../helpers/utils'
import { makeStyles } from '@material-ui/core/styles';
import TextInput from '../../shared/Fields/TextInput';
import SelectBox from '../../shared/Fields/SelectBox';
import RadioButton from '../../shared/Fields/RadioButton';
import PersonalDB from '../../services/personaldb';
import styled from 'styled-components';
import { blue, orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    modalHeader: {
        borderBottom: 'none !important',
        paddingTop: '11px',
        paddingRight: '4px',
        marginTop: '-7px',

    },
    footerDiv: {
        padding: '0 30px',
        marginTop: '-20px',
        marginRight: '-31px',
    },

    text: {
        "& .MuiInputBase-input": {
            width: "450px",
        }

    },

    select: {
        "& .MuiInputBase-root": {
            width: "150px",
            marginLeft: "50px"
        },


    },
    buttonStyle: {
        float: 'right',
        textTransform: 'none',
        margin: '4px',
        backgroundColor: '##DB862D !important',
        border: '2px solid ##DB862D !important',
        marginTop: '4px',

    },
    buttonStyleCancel: {
        float: 'right',
        textTransform: 'none',
        margin: '4px',
        //marginBottom: '10px',
        color: 'white',
        backgroundColor: '#008EC5 !important',
        border: '1px solid #1F4E79 !important',
        borderColor: '#1F4E79',


    },
    buttonStyleFileselect: {
        textTransform: 'none',
        marginLeft: '5px',
        marginTop: '25px',
        marginBottom: '10px',
        color: 'white',
        backgroundColor: '#db862c !important',
        border: '1px solid #ca751b !important',
        borderColor: '#1F4E79',


    },
    modalBoxContent: {
        maxHeight: '1000px',
    },
    modalClassContent: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        top: '30%',
        left: '50%',
        right: 'auto',
        transform: 'translate(-50%, -50%)'
    },
    colorContainer: {
        backgroundColor: '#EEEEEE',
        marginTop: '-35px',
        // marginLeft: 0px;
        marginBottom: '10px',
        paddingTop: '10px',
        paddingLeft: '20px',
        paddingBottom: '25px',
        marginLeft: '10px',
        marginRight: '10px',
        paddingRight: '10px',
        borderRadius: '5px',

    },
    modalBody: {
        textAlign: 'left',
        paddingTop: '28px',
        paddingBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        paddingRight: '10px',
        marginBottom: '8px'
    },
    uploadDb: {
        width: '1000px'
    },

}));

const columns = [
    {
        name: '#',
        cell: (row, index) => index + 1,
        grow: 0,
        width: '8%'
    },

    {
        name: 'Type',
        selector: "type",
        width: '10%'
    },

    {
        name: "Name",
        selector: "path",
        // sortable: true,
        width: '50%'
    },
    {
        name: "Size",
        selector: "size",
        defaultSortAsc: true,
        left: true,
        width: '20%',
        // style:{
        //   marginLeft: '40px'
        // }
    }
];

const formatTypeItems = [
    {
        value: "fasta",
        label: "Format: FASTA"
    },
    {
        value: "embl+",
        label: "Format: EMBL"
    }
];

function UploadPersonalDBModal(props) {
    const classes = useStyles();
    const { t, i18n } = useTranslation('common');
    let mailUrl = "mailto:" + supportMail + "?subject=" + props.subjectText;
    const [formatTypeValue, setFormatType] = useState("fasta");
    const [sequenceTypeValue, setSequenceType] = useState("nucleotide");
    const [dbValue, setDbValue] = useState("");
    const [dbError, setDbError] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);

    const toastRef = useRef(null)

    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true
    });
    const handleFormatType = (event) => {
        setFormatType(event.target.value);
        setBtnClicked(false);
    };

    const handleSequenceType = (event) => {
        setSequenceType(event.target.value);
        setBtnClicked(false);
    };

    async function chckstat(id, channel_id) {

        let status = await PersonalDB.channelStatus(id, channel_id);
        if (status && status.response_content && status.response_content.status == "FAILED") {
            utilsService.showToast(TOAST_TYPE.ERROR, "Database creation failed", toastRef, { autoClose: false })
        }
        if (status && status.response_content && status.response_content.status == "FINISHED") {
            utilsService.showToast(TOAST_TYPE.SUCCESS, "Database created successfully", toastRef, { autoClose: false })
            setTimeout(function () {
                window.location.reload(1);
            }, 2000);  //reload screen after 2 seconds of success display message
        }
        if (status && status.response_content && status.response_content.status == "STILL_RUNNING") {
            closeModal();
            utilsService.showToast(TOAST_TYPE.INFO, "Please wait. Database is being created", toastRef, { autoClose: false })
            setTimeout(function () { chckstat(id, channel_id) }, 8000);
        }
    };

    async function uploadDatabase() {
        var i = 0;
        setBtnClicked(true);
        var formData = new FormData();
        acceptedFiles.forEach(afile => {
            formData.append('file[' + i + ']', afile);
            i++;
        });
        let urlParam = 'do=gqupload.post&format=json';
        const dbname = document.getElementById("dbName").value;
        const createFolder = await PersonalDB.createUploadfolder();
        if (createFolder && createFolder.response_content.uniqdir) {
        }
        else {
            utilsService.showToast(TOAST_TYPE.ERROR, "Database : Unique folder error", toastRef)
            closeModal();
        }
        if (dbname == '') {
            utilsService.showToast(TOAST_TYPE.ERROR, "You must provide a name for the database", toastRef)
            const input = document.getElementById('dbName');
            input.focus();
            input.select();
            setBtnClicked(false);
        }

        else {

            const checkdb = await PersonalDB.checkDbName(dbname);

            if (checkdb && checkdb.response_content && !checkdb.response_content.exist) {

                const pfile = await PersonalDB.postfile(urlParam, formData);
                if (pfile && pfile.response_status == 0 && pfile.response_content) {

                    var response_array = pfile.response_content.split('&');
                    const file = response_array[1].substring(5);
                    const files = response_array[2].substring(6);
                    const frmt = formatTypeValue;
                    const seqType = sequenceTypeValue;
                    const recieve = await PersonalDB.uploadRecieve(file, files, dbname, frmt, seqType);

                    if (recieve && recieve.response_content &&
                        (recieve.response_content.seq_format == 'fasta' && recieve.response_content.detected_format == "embl+") ||
                        (recieve.response_content.seq_format == 'embl+' && recieve.response_content.detected_format == "fasta")
                    ) {
                        utilsService.showToast(TOAST_TYPE.ERROR, "Detected wrong or mixed sequence format files.Please select correct format.", toastRef, { autoClose: false });
                    }
                    else {

                        if (recieve && recieve.response_content &&
                            recieve.response_content.content_error_seqtype == false ||
                            (recieve.response_content.content_error_seqtype != false &&
                                recieve.response_content.can_proceed == true)
                        ) {

                            const createChannel = await PersonalDB.channelCreate(recieve.response_content.upload_file, dbname);
                            if (createChannel && createChannel.response_content) {
                                chckstat(createChannel.response_content.id, createChannel.response_content.channel_id);
                            }
                            else {
                                utilsService.showToast(TOAST_TYPE.ERROR, "Channel creation failed", toastRef)
                                closeModal();
                            }

                        }
                        else {
                            setBtnClicked(false);
                            utilsService.showToast(TOAST_TYPE.ERROR, "Some sequences do not look like type specified or are of mixed types. Please correct the sequence type.", toastRef)


                        }
                    }
                }
                else {
                    utilsService.showToast(TOAST_TYPE.ERROR, "Post file error", toastRef)
                    closeModal();
                }

            }
            else {
                utilsService.showToast(TOAST_TYPE.ERROR, "Database name already exists", toastRef)
                const input = document.getElementById('dbName');
                input.focus();
                input.select();
                setBtnClicked(false);

            }
        }

        //acceptedFiles.length = 0;

    }

    function onChangeAlphaNumericInput(e) {

        //open modal, enter valid name, clear it and press cancel,
        //next open modal,enter invalid name (it was accepting, so this below if cond)
        if (typeof (dbValue) === 'undefined') {
            setDbValue("");
        }

        const value = e.target.value;
        const regex = /^[0-9a-zA-Z]+$/; //this will admit letters, numbers
        if (value.match(regex) || value === "") {
            setDbValue(value);
            setDbError(false);
        }
        else {
            setDbError(true);
        }
    }

    const closeModal = () => {
        acceptedFiles.length = 0;
        setDbValue();
        setDbError(false);
        setBtnClicked(false);
        props.onHide();
    };
    const closeModalCancel = () => {
        acceptedFiles.length = 0;
        setDbValue();
        setDbError(false);
        setBtnClicked(false);
        props.onHide();
        //window.location.reload();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcente"
            // onHide={modalClose}
            centered
            backdrop="static"
            contentClassName={classes.modalClassContent}
            className={classes.modalBoxContent}
        >
            <Modal.Header closeButton className={classes.modalHeader}>
            </Modal.Header>
            <Modal.Body
                style={{
                    maxHeight: 'calc(100vh - 210px)',
                    overflowY: 'auto'
                }}
                className={classes.modalBody}>
                {/* <h5>{props.onMessage}</h5> */}
                <div className={classes.colorContainer}>
                    <h5>Upload Personal Database</h5>
                    <br></br>


                    <div className={classes.text}>
                        <span>
                            <TextInput
                                //fullWidth
                                id="dbName"
                                name="dbName"
                                label={t('databaseName')}
                                variant="outlined"
                                value={dbValue}
                                onChange={onChangeAlphaNumericInput}
                                error={dbError}
                                helperText={dbError ? "Name is Alphanumeric only" : ""}
                            />

                            <SelectBox
                                margin="normal"
                                variant="outlined"
                                name="formatType"
                                id="formatType"
                                value={formatTypeValue}
                                items={formatTypeItems}
                                onChange={handleFormatType}
                                className={classes.select}
                            />

                        </span>
                        <Row>
                            <Col md="9" xs="9" sm='9'>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="These are" name="customized-radios" value={sequenceTypeValue} onChange={handleSequenceType}>
                                        <Typography className={"float-left " + classes.seqText} style={{ marginLeft: '10px', marginTop: '10px' }}>
                                            Sequence Type &nbsp;&nbsp;&nbsp;
                                        </Typography>
                                        <FormControlLabel value="nucleotide" control={<RadioButton />} label="Nucleotide Sequences" />
                                        <FormControlLabel value="protein" control={<RadioButton />} label="Protein Sequences" />
                                    </RadioGroup>
                                </FormControl>
                            </Col>
                        </Row>
                    </div>
                    <br></br>

                    <span>
                        <DataTable
                            //className='search-table'
                            id="selectedfiles"
                            columns={columns}
                            data={acceptedFiles}
                            defaultSortField="title"
                            noHeader={true}
                            noDataComponent='No items were found.'
                        //customStyles={customStyles} 
                        />

                        <input {...getInputProps()} />
                        <Button onClick={open} className={classes.buttonStyleFileselect} variant="contained">Select File(s)</Button>
                    </span>

                    <br></br>


                    {acceptedFiles.length >= 1 && !btnClicked ?
                        <Button className='accountInfo' color="default" disableRipple={true} onClick={() => uploadDatabase()} variant="contained">Upload</Button>
                        : <Button className='cancelButtonDisable' color="default" disableRipple={true} variant="contained">Upload</Button>

                    }
                    <Button onClick={closeModalCancel} className={classes.buttonStyleCancel} color="default" variant="contained">Cancel</Button>

                    <h6>We support the following formats: .txt, .gz , .bz2 </h6>
                    <h6>Compressing your data file will reduce the data time.</h6>




                </div>

            </Modal.Body>

        </Modal>
    );

}

export default UploadPersonalDBModal;