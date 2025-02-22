import React, { useEffect, useState } from "react"
import "../../componentsngo/addevent/addevents.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbardon/navbar";
import Footer from "../../commoncomponent/footer/footer2/footer2";

const Updatedon = () => {
    const history = useHistory();
    const user1 = JSON.parse(localStorage.getItem("currentUser"))
    console.log(user1.user._id)
    const donorId = user1.user._id;

    const [donorData, setDonorData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        pnumber: "",
        email: "",
      });

      useEffect(() => {
        // Fetch donor data based on donorId
        const fetchDonorData = async () => {
          try {
            const response = await axios.get(`http://localhost:9002/getdonor/${donorId}`);
            const data = response.data; // Assuming the API returns donor data
            setDonorData(data);
          } catch (error) {
            console.error("Error fetching donor data:", error.message);
          }
        };
    
        fetchDonorData();
      }, [donorId]);

    const registerdon = () => {
        const variables = {

            firstname: firstname,
            lastname: lastname,
            address: address,
            city: city,
            state: state,
            ID: user1.user._id,
            pnumber: pnumber,
            email: email,

        }

        if (emailErrorstatus === "false") {
            axios.post("http://localhost:9002/updatedon", variables)
                .then(res => alert(res.data.message));
                history.push("/homepagedonor");

        } else {
            alert("please re-enter your Email ID")
        }
    }
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pnumber, setPnumber] = useState("")
    const [email, setEmail] = useState("")

    const onFirstNameChange = (event) => {
        setFirstName(event.currentTarget.value)
    }
    const onLastNameChange = (event) => {
        setLastName(event.currentTarget.value)
    }

    const onAddressChange = (event) => {
        setAddress(event.currentTarget.value)
    }

    const onCityChange = (event) => {
        setCity(event.currentTarget.value)
    }
    const onStateChange = (event) => {
        setState(event.currentTarget.value)
    }
    const onPnumberChange = (event) => {
        setPnumber(event.currentTarget.value)
    }
    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }

    const [emailError, setEmailError] = useState('')
    const [emailErrorstatus, setEmailErrorstatus] = useState('')

    const validateEmail = (e) => {

        let email = e.target.value
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(e)
        if (re.test(email)) {
            setEmailError('Valid Email :)')
            setEmailErrorstatus("false");
            onEmailChange(e);
        } else {
            setEmailError('Enter valid Email!')
            setEmailErrorstatus("true");

        }
    }

    return (
        <>
            <div id="backuser">
                <Navbar />
                <div className="addevents" style={{ display: 'flex', justifyContent: 'center' }}>

                    <br></br>

                    <div className="addevents_box" >
                        <h1>Please fill out the fields you wish to update: </h1>
                        <br></br>

                        <div className="fields">

                            <label> First Name: </label>
                            <input type="text" name="firstname" value={firstname} placeholder={donorData.firstname} onChange={onFirstNameChange}></input>

                        </div>
                        <div className="fields">

                            <label> Last Name: </label>
                            <input type="text" name="lastname" value={lastname} placeholder={donorData.lastname} onChange={onLastNameChange}></input>

                        </div>
                        <div className="fields" style={{ display: 'flex', justifyContent: 'center' }}>
                            <label> Address: </label>
                            {/* <textarea rows="3" cols= "30" placeholder="Enter your address"></textarea> */}
                            <textarea name="address" value={address} placeholder={donorData.address} onChange={onAddressChange}></textarea>
                        </div>
                        <div className="fields">
                            <label> City: </label>
                            <input type="text" name="city" value={city} placeholder={donorData.city} onChange={onCityChange}></input>
                        </div>
                        <div className="fields">
                            <label> State: </label>
                            <input type="text" name="state" value={state} placeholder={donorData.state} onChange={onStateChange} ></input>
                        </div>

                        <div className="fields">
                            <label> Number: </label>
                            <input type="text" name="contact" value={pnumber} placeholder={donorData.pnumber} onChange={onPnumberChange}></input>
                        </div>
                        <div className="fields">
                            <label> E-mail: </label>
                            <input type="text" name="email" value={email} placeholder={donorData.email} onChange={onEmailChange} onInput={(e) => validateEmail(e)} ></input>
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{emailError}</span><br />
                            <span style={{
                                fontWeight: 'bold',
                                color: 'green',
                            }}>Please enter your new or old Email ID. </span>
                        </div>

                        <div className="btn btn-outline-success btn-lg " style={{ width: '200px' }} onClick={registerdon}> Update Details </div>

                    </div>

                </div>

            </div>

           
        </>
    )
}

export default Updatedon