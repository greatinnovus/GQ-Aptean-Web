import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import AccountService from '../../services/accountInfo';
import SaveContentModal from '../../shared/Modal/SaveContentModal'
import ContentErrorModal from '../../shared/Modal/ContentErrorModal'


const useStyles = makeStyles((theme) => ({
    grow: {
		flexGrow: 1,
		width: '96%',
		margin: '30px auto',
		minHeight: '260px',
        marginTop: '130px',
	},
    passwordRecoverDiv:{
        padding: '15px 25px 20px',
        border: '2px solid #bfb4b4',
        borderRadius: '6px'
    },
    loginSubmitButton : {
        backgroundColor: '#DB862D',
        border: '2px solid #DB862D' ,
        color:'white',
        textTransform: 'capitalize',
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
    },rootButton:{
        marginLeft:'222px',
          '& > *': {
            margin: theme.spacing(2),
            textTransform:"capitalize",
          },
      },
      formContent : {
          marginBottom: '65px'
      },
      passwordContents:{
        marginTop: '182px',
        marginLeft: '17px',
        padding:'10px',
        fontSize:'14px',
        backgroundColor: 'gainsboro'

      },
      conType:{
        marginLeft: '30px',
        fontSize:'14px',
      }
}));

function ChangePassword() {
    const classes = useStyles();
    const {t, i18n} = useTranslation('common');
    const [passwordForm, setPasswordForm] = useState(true);
    const [modalShowSaved, setmodalShowSaved] = React.useState(false); 
    const [modalShow, setModalShow] = React.useState(false); 
    const [errorMessage, seterrorMessage] = useState("");

    const [userId, setUserId] = useState(true);
    const history = useHistory();

    const dispatch = useDispatch();
    function successMessage()
    {
      setmodalShowSaved(false);
      history.push('/home')
    }
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword:''
        },
        validationSchema: Validate.ChangePasswordValidate(),
        onSubmit: async(values) => {
               
               if(values.newPassword == values.confirmPassword)
               {
                        const result = await AccountService.updatePass(userId,values.newPassword,values.confirmPassword,values.currentPassword);
                        if(result.response_content.message)
                        { 
                            await seterrorMessage(result.response_content.message);
                            setModalShow(true);
                            // toast.error(result.response_content.message);
                        }else{
                            // toast.success("Successfully Updated");
                            // history.push('/home')
                            setmodalShowSaved(true);
                        }
                       
               }
               else{
                toast.error("Password MisMatch! Enter Valid Password.");

               }
       
        },
    });

     useEffect(() => {
        async function fetchMyAPI() {
          const result = await AccountService.getAccountInfo(history);
          result && result.response_content ?  setUserId(result.response_content.id)  : setUserId('');
          
        }
        fetchMyAPI()
      }, [])
      function homePage()
      {
        history.push('/home');
      }
      const passwordVlaue = formik.values.currentPassword;
      console.log(passwordVlaue,"vlauess vlauess vlauess vlauess vlauess");
      const passValCheck = passwordVlaue.length; 
      console.log(passValCheck,"passValCheck passValCheck passValCheck passValCheck passValCheck");
      function tryAgainForm()
      {
       formik.setFieldValue('currentPassword','');
       setModalShow(false)
      }
    return (
      <div className={classes.grow}>
        <Container className="mt-100">
            
          
            <Row >
                <Col sm="12" md="6" >
                    <form name="changePasswordForm" onSubmit={formik.handleSubmit} className={(passwordForm ? 'd-block' : 'd-none')}>
                    <div className={classes.formContent}>
                        <h5 className="loginTitle">{t('cpauth')}</h5>
                        <div className="form-group">
                            <TextField
                                fullWidth
                                id="currentPassword"
                                name="currentPassword"
                                label={'Current Password'}
                                variant="outlined"
                                type="password"
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                error={formik.values.currentPassword != '' && formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                InputLabelProps={{
                                    classes: {root:classes.materialUILabel}, 
                                }}
                                className={classes.root}
                                />
                        </div>
                        </div>
                        <div className={classes.formContent}>
                        <h5 className="loginTitle">{t('cpnewpass')}</h5>
                        <div className="form-group">
                            <TextField
                                fullWidth
                                id="newPassword"
                                name="newPassword"
                                label={'New Password'}
                                variant="outlined"
                                type="password"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                                InputLabelProps={{
                                    classes: {root:classes.materialUILabel}, 
                                }}
                                className={classes.root}
                                />
                        </div>
                        <div className="form-group">
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label={'Re-enter New Password'}
                                variant="outlined"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                InputLabelProps={{
                                    classes: {root:classes.materialUILabel}, 
                                }}
                                className={classes.root}
                                />
                        </div>
                        </div>
                       
                        <div className={classes.rootButton}>
                            <Button variant="contained" onClick={homePage}>{t('cancel')}</Button>
                             <Button variant="contained" className={(passValCheck != 0 ? classes.loginSubmitButton : '')} type="submit">{t('cpsavenewpass')}</Button>
                        </div>

                    </form>
                 
                </Col>
                <Col sm="12" md="6">
                  <div className={classes.passwordContents}>
                      <div >
                         <p>{t('cpconentstitle')}</p>
                         <h6><strong>{t('cppassrules')}</strong></h6>
                      </div>
                     
                       <div className={classes.conType}>
                        <p>{t('cpsubtitle')}</p>
                               <ul>
                                <li>{t('cprule1')}</li>
                                <li>{t('cprule2')}</li>
                                <li>{t('cprule3')}</li>
                                <li>{t('cprule4')}</li>
                                </ul>
                    </div>
                      

                  </div>
                </Col>
            </Row>
        </Container>
        <ContentErrorModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            tryAgain={()=> tryAgainForm()}
                            onMessage={errorMessage}
                        />
                         <SaveContentModal
                            show={modalShowSaved}
                            onHide={() => successMessage()}
                            onMessage={'Your changes have been saved.'}
                        />
     </div>
    );
}

export default ChangePassword;