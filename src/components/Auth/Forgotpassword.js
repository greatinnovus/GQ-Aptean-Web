import React, { useState, useEffect } from 'react';
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
import TextInput from '../../shared/Fields/TextInput';
import ClientCaptcha from "react-client-captcha"
import "react-client-captcha/dist/index.css"
import { Link, useHistory } from 'react-router-dom';
import PasswordService from '../../services/forgotpassword'


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
    '@media (min-width: 768px)' : {
        loginLogoDiv:{
            position: 'relative',
            left: '50px',
            width:'100%'
        }
    },
    '@media (min-width: 1024px)' : {
        loginLogoDiv:{
            position: 'relative',
            left: '80px',
            width:'100%'
        }
    }
}));

function Forgotpassword() {
    const classes = useStyles();
    const {t, i18n} = useTranslation('common');
    const [passwordForm, setPasswordForm] = useState(true);
    const [verifycaptchaCode, setcaptchaCode] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
     const formik = useFormik({
        initialValues: {
            userName: '',
            captchaCode: '',
        },
        validationSchema: Validate.ForgotValidate(),
         onSubmit: (values) => {
            console.log(values,"valessssssssss");
            if(values.captchaCode == verifycaptchaCode)
            {
                 const result =  PasswordService.forgotPassword(values.userName);
                // dispatch(forgotpasswordSlice({userId:values.userName},history));
                setPasswordForm(false);
                toast.success("Success");
            }
            else{
            toast.error("BAD Request Found!");
            // setPasswordForm(false);
            }
        },
    });
    function updateCode(captchaCode)
    {    
        setcaptchaCode(captchaCode);
        console.log(captchaCode,"captchaCode");
    }
    // reset login status
    useEffect(() => {
        //dispatch(userActions.logout()); 
    }, []);

    
    return (
        <Container className="mt-100">
            
            <Row className={classes.loginLogoDiv}>
                <Col sm="12" md="3" className="p-0 ml-4"><Link to="/login"><img src={GQLogo} alt="GQLogo" className="w-75" /></Link></Col>

            </Row>
            <Row className="justify-content-md-center">
                {/* <Col sm="12" md="6" className="loginDiv"> */}
                <Col sm="12" md="5" className={'mb-5 mt-4 '+classes.passwordRecoverDiv}>
                    <form name="passwordForm" onSubmit={formik.handleSubmit} className={(passwordForm ? 'd-block' : 'd-none')}>
                        <h5 className="loginTitle">{t('pwdRecovery')}</h5>
                        <p className="appTextColor mb-4">{t('pwdRecoveryTitle')}</p>
                        <div className="form-group">
                            <TextInput 
                                fullWidth
                                id="userName"
                                name="userName"
                                label={t('userName')}
                                variant="outlined"
                                value={formik.values.userName}
                                onChange={formik.handleChange} 
                                error={formik.touched.userName && Boolean(formik.errors.userName)}
                                helperText={formik.touched.userName && formik.errors.userName}
                            />
                        </div>
                        <div className="form-group">
                            
                            <TextInput
                                fullWidth
                                id="captchaCode"
                                name="captchaCode"
                                label={t('codeShown')}
                                variant="outlined"
                                value={formik.values.captchaCode}
                                onChange={formik.handleChange}
                                error={formik.touched.captchaCode && Boolean(formik.errors.captchaCode)}
                                helperText={formik.touched.captchaCode && formik.errors.captchaCode}
                            />
                        </div>
                        <div className="form-group">
                        <ClientCaptcha fontColor='#FC0202' backgroundColor='#BDCFF5' width='150' fontSize='32' charsCount='5' captchaCode={updateCode}/>
                        </div>
                       
                        <div className="form-group">
                            <Button variant="contained" color="primary" className="float-right loginSubmit text-capitalize" type="submit">
                                {t('submit')}
                            </Button>
                        </div>
                    </form>
                    <div className={'p-4 ' +(passwordForm ? 'd-none' : 'd-block')}>

                        <h5>{t('pwdRecovery')}</h5>
                        <br />
                        <p>{t('thankYou')}</p>
                        <p>{t('loginInfoText')}</p>
                        <p>{t('pleaseContactText')}</p>
                    </div>
                </Col>
                <Col sm="12" md="5" className="ml-3">
                    <Newsupdate isForgotPanel={true} />
                </Col>
            </Row>
        </Container>

    );
}

export default Forgotpassword;