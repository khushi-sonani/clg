import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import MainCard from 'ui-component/cards/MainCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Addemp() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    dob: '',
    city: '',
    state: '',
    zip: '',
    password:'',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setIsSubmitting(true);
        
        const response = await axios.post(
          'https://salary-box-bakend.vercel.app/company',
          formData
        );
        console.log(response.data); 

       
        setFormData({
          fname: '',
          lastName: '',
          email: '',
          mobileNo: '',
          gender: '',
          dob: '',
          city: '',
          state: '',
          zip: '',
          password: ''
        });

        setValidated(false); 
       
      toast.success('Employee Added successfully!', {
        position: 'top-center',
      });
      setTimeout(() => {
        navigate("/myteam"); 
      }, 1000);
      } catch (error) {
        console.error('Error submitting form:', error);
        
      } finally {
        setIsSubmitting(false);
      }
    }

    setValidated(true);
  };
 
  return (
    <MainCard title="Add New Employee" >
      <div className="p-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control required name='fname' type="text" placeholder="First name"  onChange={handleChange} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control required type="text" name='lname' placeholder="Last name"   onChange={handleChange}  />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend"> <FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                <Form.Control type="email"   name='email' placeholder="Email" aria-describedby="inputGroupPrepend" required   onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please enter email.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" name='mobileNo' placeholder="Phone Number" required   onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter phone number.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Gender</Form.Label>
              <Form.Select defaultValue="" required name="gender" onChange={handleChange}>
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please select a gender.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control type="date" placeholder="01/02/2002" required  name="dob"  onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter date of birth.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-4">

            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required name='city'   onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter city.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required name='state'  onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter state.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required name='zip'  onChange={handleChange}  />
              <Form.Control.Feedback type="invalid">Please enter zip.</Form.Control.Feedback>
            </Form.Group>
          
          </Row>
          <Row className='mb-4'>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" required name='password'   onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please enter password.</Form.Control.Feedback>
            </Form.Group>

          </Row>
          {/* <Form.Group className="mb-3">
          <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." feedbackType="invalid" />
        </Form.Group> */}
        <div className='text-center' >
          <Button type='submit' disabled={isSubmitting} style={{backgroundColor: '#607d8b', color:"#eceff1", width:"30%", }}  > {isSubmitting ? 'Submitting...' : 'Submit'}</Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </MainCard>
  );
}

export default Addemp;
