import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Validate from '../../helpers/validate';
import AccountService from '../../services/accountInfo';
import ChangePasswordModal from '../../shared/Modal/ChangePasswordModal'
import ContentErrorModal from '../../shared/Modal/ContentErrorModal'
import ChangePassCheckModal from '../../shared/Modal/ChangePassCheckModal'
import { containerWidth } from '../../shared/constants'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    width: '96%',
    maxWidth: containerWidth,
    margin: '30px auto',
    minHeight: '240px',
    marginTop: '65px',
  },
  passwordRecoverDiv: {
    padding: '15px 25px 20px',
    border: '2px solid #bfb4b4',
    borderRadius: '6px'
  },

  loginSubmitButton: {
    backgroundColor: '#db862c',
    borderColor: '#ca751b',
    border: '1px solid #db862c',
    color: 'white',
    textTransform: 'capitalize',
    marginLeft: '18px',
    width: '208px',
    '&:hover': {
      backgroundColor: '#db862c',
      boxShadow: 'none',
    },
  },
  loginSubmitDis: {
    backgroundColor: '#EEEEEE',
    border: '1px solid #CCCCCC',
    float: 'right',
    textTransform: 'none',
    margin: '4px',
    marginTop: ' 4px',
    color: ' #777777',
    boxShadow: 'none'
  },
  loginSubmitCancel: {
    backgroundColor: '#0182C5',
    border: '1px solid #1F4E79',
    color: 'white',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#0182C5',
      boxShadow: 'none',
    },
  },
  loginLogoDiv: {
    position: 'relative',
    left: '0px',
    width: '200px'
  },
  materialUILabel: {
    fontStyle: 'italic'
  },
  root: {
    "& .Mui-error": {
      fontStyle: 'italic'
    },
    "& .MuiFormHelperText-root": {
      fontStyle: 'italic'
    }
  },
  '@media (min-width: 768px)': {
    loginLogoDiv: {
      position: 'relative',
      left: '28px',
      width: '100%'
    }
  }, rootButton: {
    marginLeft: '222px',
    '& > *': {
      // margin: theme.spacing(1),
      textTransform: "capitalize",
    },
  },
  formContent: {
    marginBottom: '65px'
  },
  passwordContents: {
    marginTop: '32px',
    marginLeft: '17px',
    padding: '10px',
    fontSize: '14px',
    backgroundColor: 'gainsboro'

  },
  conType: {
    marginLeft: '30px',
    fontSize: '14px',
  }
}));

function ChangePassword() {
  const classes = useStyles();
  const { t, i18n } = useTranslation('common');
  const [passwordForm, setPasswordForm] = useState(true);
  const [modalShowSaved, setmodalShowSaved] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalCheckPass, setModalCheckPass] = React.useState(false);

  const [errorMessage, seterrorMessage] = useState("");

  const [userId, setUserId] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();
  function successMessage() {
    setmodalShowSaved(false);
    history.push('/home')
  }
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Validate.ChangePasswordValidate(),
    onSubmit: async (values) => {

      // if (values.newPassword == values.confirmPassword) {
      const result = await AccountService.updatePass(userId, values.newPassword, values.confirmPassword, values.currentPassword);
      if (result.response_content.message) {

        await seterrorMessage(result.response_content.message);
        setModalShow(true);
        // toast.error(result.response_content.message);
      } else {
        // toast.success("Successfully Updated");
        // history.push('/home')

        setmodalShowSaved(true);
      }

      // }
      // else {
      //   setModalCheckPass(true);
      //   // toast.error("Password MisMatch! Enter Valid Password.");

      // }

    },
  });

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await AccountService.getAccountInfo(history);
      result && result.response_content ? setUserId(result.response_content.id) : setUserId('');

    }
    fetchMyAPI()
  }, [])
  function homePage() {
    history.push('/home');
  }
  const passwordVlaue = formik.values.currentPassword;
  const passwordCnVlaue = formik.values.newPassword;
  const passwordCn1Vlaue = formik.values.confirmPassword;
  const passValCheck = passwordVlaue.length;
  const passValCheck1 = passwordCnVlaue.length;
  const passValCheck2 = passwordCn1Vlaue.length;

  function tryAgainForm() {
    formik.setFieldValue('currentPassword', '');
    setModalShow(false)
  }
  function cancelForm() {
    setModalShow(false);
    history.push('/home');
  }
  function cancelForms() {
    setModalCheckPass(false);
    history.push('/home');
  }
  function tryAgainFormNew() {

    formik.setFieldValue('newPassword', '') && formik.setFieldValue('confirmPassword', '');
    formik.setFieldValue('default', '')
    setModalCheckPass(false)
  }
  return (
    <div className={classes.grow}>
      <div>
        <form name="changePasswordForm" onSubmit={formik.handleSubmit} className={(passwordForm ? 'd-block' : 'd-none')}>
          <Row>
            <Col sm="5" md="5" >
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
                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                    InputLabelProps={{
                      classes: { root: classes.materialUILabel },
                    }}
                    className={classes.root}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="5" md="5">
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
                    inputProps={{
                      maxlength: 20
                    }}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    InputLabelProps={{
                      classes: { root: classes.materialUILabel },
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
                    inputProps={{
                      maxlength: 20
                    }}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    InputLabelProps={{
                      classes: { root: classes.materialUILabel },
                    }}
                    className={classes.root}
                  />
                </div>
              </div>

              <div className={'float-right'}>
                <Button variant="contained" disableRipple={true} className={classes.loginSubmitCancel} onClick={homePage}>{t('cancel')}</Button>
                {passValCheck != 0 && passValCheck1 != 0 && passValCheck2 != 0 ?
                  <Button variant="contained" disableRipple={true} className={classes.loginSubmitButton} type="submit">{t('cpsavenewpass')}</Button> :
                  <Button variant="contained" className='cancelButtonCPM' disableRipple={true}>{t('cpsavenewpass')}</Button>
                }
              </div>
            </Col>
            <Col sm="6" md="6">
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
        </form>
        <ChangePassCheckModal
          show={modalCheckPass}
          onHide={() => cancelForms()}
          tryAgain={() => tryAgainFormNew()}
        // onMessage={errorMessage}
        />

        <ContentErrorModal
          show={modalShow}
          onHide={() => cancelForm()}
          tryAgain={() => tryAgainForm()}
          onMessage={errorMessage}
        />
        <ChangePasswordModal
          show={modalShowSaved}
          onHide={() => successMessage()}
          onMessage={'Your changes have been saved.'}
        />
      </div>
    </div>
  );
}

export default ChangePassword;