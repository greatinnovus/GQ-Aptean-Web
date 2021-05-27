import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GQLogo from '../../assets/image/GenomeQuest.svg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import { toast } from 'react-toastify';
import Newsupdate from '../../shared/newspdate';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Validate from '../../helpers/validate';
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table';


const useStyles = makeStyles((theme) => ({
   
    passwordRecoverDiv:{
        padding: '15px 25px 20px',
        border: '2px solid #bfb4b4',
        borderRadius: '6px'
    },
    loginLogoDiv:{
        position: 'relative',
        left: '0px',
        width: '200px'
    },
    materialUILabel: {
        fontStyle: 'italic'
    },
    root: {
        "& .Mui-error": {
            fontStyle:'italic'
        },
        "& .MuiFormHelperText-root": {
            fontStyle:'italic'
        }
    },
    '@media (min-width: 768px)' : {
        loginLogoDiv:{
            position: 'relative',
            left: '28px',
            width:'100%'
        }
    }
}));
const data = [
    {
        name: "Complete merge, ev ery document in group A and B",
        result: "pass"
    },
    {
        name: "Overlap, only documents common to both group A and B",
        result: "pass"
    },
    {
        name: "Non-overlap, only documents unique to group A or B",
        result: "pass"
    },
    {
        name: "Non-overlap group A, only documents unique to group A",
        result: "pass"
    },
    {
        name: "Non-overlap group B, only documents unique to group B",
        result: "pass"
    },

];

function MergeResults() {
    const classes = useStyles();
    const {t, i18n} = useTranslation('common');
    const [passwordForm, setPasswordForm] = useState(true);
    const dispatch = useDispatch();
    const [smShow, setSmShow] = useState(false);
     const [lgShow, setLgShow] = useState(false);
     const [formData, setFormData] = useState(data);
     const [allChecked, setAllChecked] = useState(false);
     const [isChecked, setIsChecked] = useState([]);
    // reset login status
    useEffect(() => {
        //dispatch(userActions.logout()); 
    }, []);

    const handleSingleCheck = e => {
        const { name } = e.target;
        if (isChecked.includes(name)) {
          setIsChecked(isChecked.filter(checked_name => checked_name !== name));
          return setAllChecked(false);
        }
        isChecked.push(name);
        setIsChecked([...isChecked]);
        setAllChecked(isChecked.length === formData.length)
      };
    
    return (
        <Container className="mt-100">
                  <Button onClick={() => setLgShow(true)}>Large modal</Button>

            <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Merge Result Sets
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Container className="mt-100">
                <h6>Step 1 -</h6> <p>Name the new result set</p>
                <div className="form-group">
                            <TextField
                                fullWidth
                                id="userName"
                                name="userName"
                                label='Result Name'
                                variant="outlined"
                                value=''
                               
                                />
                        </div>
                </Container>
                <Container className="mt-100">
                <h6>Step 2 -</h6> <p>Put the contributing result sets into one of two groups</p>
                <Table responsive bordered >
                <tbody>
                    <tr>
                    <td>Group A</td>
                    <td>Group B</td>
                    <td>Type</td>
                    <td>Description</td>
                    </tr>
                    <tr>
                    <td>O</td>
                    <td>O</td>
                    <td>IP Sequence</td>
                    <td>Beta globulin search for Steve</td>
                    </tr> 
                    <tr>
                    <td>O</td>
                    <td>O</td>
                    <td>Antibody</td>
                    <td>Candidate CDRs</td>
                    </tr> 
                    <tr>
                    <td>O</td>
                    <td>O</td>
                    <td>Full Text</td>
                    <td>Cov id-19 US granted</td>
                    </tr> 
                    
                </tbody>
                </Table>
   
                </Container>
                <Container className="mt-100">
                <h6>Step 3 -</h6> <p>Chose how these two groups are merged</p>
                <div className="form-group">
                {formData.map((test, index) => (
                                            <div
                                                key={index}>
                                                <input
                                                    type="checkbox"
                                                    name={test.name}
                                                    checked={isChecked.includes(test.name)}
                                                    onChange={handleSingleCheck}
                                                />
                                                &nbsp; &nbsp;
                                                <label style={{ fontSize: '14px' }}>{test.name}</label>
                                              </div>
                                            ))
                }
                </div>
                </Container>
                 <div className='float-right'>
                     <Button>Merge Results</Button>
                     <Button onClick={() => setLgShow(false)}>Cancel</Button>
                 </div>
                </Modal.Body>
              </Modal>
          
        </Container>

    );
}

export default MergeResults;