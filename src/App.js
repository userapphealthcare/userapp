import React, { Component } from 'react';
import Web3 from 'web3';
import emailjs from 'emailjs';
import './App.css';
import {contractAddress, abi} from './data.js';
import profile from './profile.jpg';


class App extends Component {
  componentWillMount(){
    this.blockchain()
  }


async blockchain() {  


  const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
  const network = await web3.eth.net.getNetworkType()
  const account = await web3.eth.getAccounts()
  this.setState({account});

  var HealthcareContract = new web3.eth.Contract(abi, contractAddress);
  // console.log(HealthcareContract.methods);

  const patientCount = await HealthcareContract.methods.getPatientCount().call()
  this.setState({patientCount})


  var _customerId = prompt('Enter Customer Id');
  if (_customerId.length>3){
    customerId = _customerId.slice(3, );

    if (customerId<patientCount){
      console.log('Sucess')
    
      const patientData = await HealthcareContract.methods.getPatient(customerId).call();

      const id = patientData[0];
      const email = patientData[2];
      var customerId;
      
        if (_customerId===id){
            console.log('Correct Id');
            var _email = prompt('Enter your email');
            
            if (_email === email){
              console.log('correct email.');
              const name = patientData[1];
              const heartRate = patientData[3];
              const bodyTemperature = patientData[4];
      
              this.setState({name});
              this.setState({email});
              this.setState({heartRate});
              this.setState({bodyTemperature});
            }
            else {
              console.log('wrong email.');
              document.location.reload();
            }
        }
        else{
          alert('Wrong Id');
          document.location.reload(); 
        }

    }
    else{
      alert('Wrong Id');
      console.log('Sorry')
      document.location.reload();
    }

  }
  else{
    customerId=0;
    console.log('Wrong Id');
    alert('Wrong Id');
    document.location.reload();
  }

}




constructor(props) {
  super (props)
  this.state = {
    id: '',
    account: 'null',
    name: 'NaN',
    email: 'null@null.com',
    heartRate: 'NULL',
    bodyTemperature: 'NULL',
    patientCount: 0,

  }
}


  render() {
    return (
      <div className="">


<div class="blocks">

{this.state.patientCount} blocks

</div>


      {/* // Header part of the webpage. */}

      <div className = "rightNav">

        <div className="dropdown">
        <button className="dropbtn">ethereumAddress<i className="fa fa-caret-down"></i></button>
        <div className="dropdown-content">
        {this.state.account}
        </div>
        </div>

      </div>


      <div class="top_section">     
        
                <div class="row nopadding">
                   <div class="col-md-12 nopadding">
                      <div class="profile_name">
                         <div class="circle">
                            <a href="#"><img src={profile}></img></a>
                         </div>
                         <h1>{this.state.name}</h1>
                         <p class="position"><i>{this.state.email}</i></p>
                         <p class="intro">
                        Your heart rate is {this.state.heartRate}
                         <br></br>
                        Your temperature is {this.state.bodyTemperature}
                        </p>
                        <p class="intro">
                        <center>
                        <div className = 'msg'>
                            This is your data stored in our private blockchain.
                        </div>
                        </center>
                        </p>

                      </div>
                   </div>

                </div>    
             </div>




{/* another section */}
 <div class ="centercont">         

             <div class="myprofile_section">
         <div class="row nopadding">
            <div class="col-md-12 nopadding">
               <h1>CONTACT US</h1>
               <p>Looking for ways to connect with the core team? 
                 Fill this contact form and soon our core team will reach to you. This is Healthcare Blockchain, We are using Blockchain to save the 
                 healthcare data and making it tamper-proof.
                </p>
               <div class="col-md-3 nopadding"></div>
               <div class="col-md-6 nopadding">
                  <div class="form-section">
                     <form>
                        <input type="text" placeholder="Name"></input><br></br>
                        <input type="email" placeholder="Email"></input><br></br>
                        <textarea type="message" placeholder="Message" rows="5"></textarea> <br></br>
                        <button type="submit">SEND <i class="fa fa-send"></i></button>
                     </form>
                  </div>
                  
               </div>
               <div class="col-md-3 nopadding"></div>
            </div>
         
         </div>
     
      </div>

</div>   



{/* another section */}
<div class="test-section">
         <div class="row nopadding">
            <div class="col-md-12 nopadding">
               <h1>HEALTHCARE BLOCKCHAIN</h1>
               <ul>
                  <li><a href="#">I</a></li>
                  <li><a href="#">P</a></li>
                  <li><a href="#">E</a></li>
                  <li><a href="#">C</a></li>
                
               </ul>
               <br></br>
               <br></br>
               <p>Blockchain technology is one of the most important and disruptive technologies in the world. 
                 Multiple industries are adopting the blockchain technology to innovate the way they function. 
                 One of the industries that are looking to adopt the blockchain is the healthcare industry. </p>
            </div>
        
         </div>
      
      </div>

{/* end */}








      </div>

    );
  
    }
  
  }

export default App;
