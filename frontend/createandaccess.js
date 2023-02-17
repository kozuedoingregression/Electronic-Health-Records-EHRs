const HealthRecordAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Patient",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "patientName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "gender",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "phNo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Records",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "hospitalName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "speciality",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "referredBy",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "complaints",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "investigatinAdvise",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "medicineAdvice",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "pid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getpid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_patientName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_phNo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_bloodType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "insertPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_hospitalName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doctorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_speciality",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_referredBy",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_complaints",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_investigatinAdvise",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_medicineAdvice",
        "type": "string"
      }
    ],
    "name": "insertRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const HealthRecordAddress = "0xbf30AA126Ef3F1740464eC5bd992235734e4b93F";

async function addrecord() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const element1 = document.getElementById('hospital-name');
  const element2 = document.getElementById('p-id');
  const element3 = document.getElementById('doctor-name');
  const element4 = document.getElementById('speciality');
  const element5 = document.getElementById('referred-by');
  const element6 = document.getElementById('complaints');
  const element7 = document.getElementById('investigatin-advise');
  const element8 = document.getElementById('medicine-advice');

  const hospitalName = element1.value;
  const patientID = element2.value;
  const doctorName = element3.value;
  const speciality = element4.value;
  const referredBy = element5.value;
  const complaints = element6.value;
  const investigatinAdvise = element7.value;
  const medicineAdvice = element8.value;


  const recordContract = new ethers.Contract(HealthRecordAddress, HealthRecordAbi, provider);
  const record = await recordContract.connect(signer).insertRecord(patientID, hospitalName, doctorName, speciality, referredBy, complaints, investigatinAdvise, medicineAdvice);
  await record.wait();

}

async function accessrecord() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const HealthRecordContract = new ethers.Contract(HealthRecordAddress, HealthRecordAbi, provider);
  const patientid = document.getElementById('patient-id');
  
  const healding2 = document.createElement('h1');
  healding2.innerText = "Medical History";
  const head = document.getElementById('record-information');
  head.appendChild(healding2);

  const data = await HealthRecordContract.Patient(patientid.value);

  insertinformationtable(data.patientName,data.pid,data.age,data.gender,data.bloodType,data.phNo,data.location);

  for (let i = 0; i < 10; i++) {
    const data = await HealthRecordContract.Records(i);
    if (patientid.value == data.pid) {
      console.log(data.toString());
      insertrecordtable(data.hospitalName, data.doctorName, data.speciality, data.referredBy, data.complaints, data.investigatinAdvise, data.medicineAdvice);
    }
  }

}

function insertinformationtable(pname,pid,page,pgender,pblood,phno,plocation) {
  const tableEL = document.getElementById('info');
  const healding1 = document.createElement('h1');
  healding1.innerText = "Personal Information";
  const head = document.getElementById('personal-information');
  head.appendChild(healding1);

  tableEL.innerHTML += '<tr><th>Patient Name:</th><td>'+pname+'</td></tr><tr><th>Patient ID:</th><td>'+pid+'</td></tr><tr><th>Age:</th><td>'+page+'</td></tr><tr><th>Gender:</th><td>'+pgender+'</td></tr><tr><th>Blood Type:</th><td>'+pblood+'</td></tr><tr><th>Mobile Number:</th><td>'+phno+'</td></tr><tr><th>Location:</th><td>'+plocation+'</td></tr>';

}
function insertrecordtable(hname, dname, special, referr, complain, invest, meds) {
  const tableEL = document.getElementById('record');

  tableEL.innerHTML += '<tr><th>Hospital Name:</th><td>' + hname + '</td></tr><tr><th>Doctor Name:</th><td>' + dname + '</td></tr><tr><th>Speciality:</th><td>' + special + '</td></tr><tr><th>Referred By:</th><td>' + referr + '</td></tr><tr><th>Complaints:</th><td>' + complain + '</td></tr><tr><th>Investigation Advise:</th><td>' + invest + '</td></tr><tr><th>Medicine Advice:</th><td>' + meds + '</td></tr><br>';
}