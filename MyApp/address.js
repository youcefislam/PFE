export const MyAddress = 'http://192.168.1.4:3000';
import AsyncStorage from '@react-native-community/async-storage';




//Screen Messages
export const passwordMsg = "Password need to :" +
    "\n   1-Be at least 8 characters long." +
    "\n   2-Include at least one of this characters ( !@#$%^&* )." +
    "\n   (note : other special characters are not allowed)" +
    "\n   3-Include at least one number." +
    "\n   4-Include at least one character.";
export const passwordConfirmationMsg = "Ops, Your password Confirmation should match your password";
export const SubmitionErrorMsg = 'Please check your informations again,it should match the required patterns';
export const EmailMsg = 'Email must be a Real & Valid Email.';
export const UsernameMsg = "Username need to :" +
    "\n   1-Be at least 8 Chartcters long." +
    "\n   2-contain Only charcters and Numbers. ";
export const ShowPattern = () => {
    alert("A- " + EmailMsg + "\nB- " + UsernameMsg + "\nC- " + passwordMsg + "\nD-Password Confirmation should match your password");
}


// regular expressions handlers
export const handleEmail = (Email) => {    // Regular expression for the email 
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(Email);
}
export const handleUsername = (username) => { // Regular expression for the username 
    const reg = /^(?![0-9])[a-zA-Z0-9](?=.{8,})/;
    return reg.test(username);
}
export const handlePassword = (Password) => {  // Regular expression for the password 
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return reg.test(Password);
}
export const handlePasswordConfirm = (Password, ConfirmPassword) => {  // Confermation of the password 
    return Password == ConfirmPassword;
}



// Date Picker functions
export const showDatePicker = (setDatePickerVisibility) => {
    setDatePickerVisibility(true);
};
export const hideDatePicker = (setDatePickerVisibility) => {
    setDatePickerVisibility(false);
};
export const handleConfirm = (date, hideDatePicker, setDatePickerVisibility, setBirthDay) => {
    hideDatePicker(setDatePickerVisibility);
    setBirthDay(date.toISOString().slice(0, 10));
};


// image picker
export const handleImagePicker = async (ImagePicker, setState) => {
    let options = {
        title: 'Select Profile Picture',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300
    };
    await ImagePicker.showImagePicker(options, (response) => {
        if (!response.didCancel) {
            setState({
                srcImg: { uri: response.uri },
                uri: response.uri,
                fileName: response.fileName
            });
        }
    })
}




//App function
export const bootstrapAsync = async (authContext) => {   // Fetch the token from storage then navigate to our appropriate place
    let userToken;

    try {         // verify the token validity

        userToken = await AsyncStorage.getItem('Token');
        // userToken = null;

        if (userToken !== null) {   // if the token exist
            fetch(MyAddress + '/specialite', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + userToken
                },
            })
                .then((response) => {
                    if (response.status !== 403) {  // if token is valid
                        authContext.restoreToken(userToken);
                    }
                    else {     // if Token is Not valid 
                        authContext.signOut();
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
        else {   // if the token doesn't exist
            authContext.signOut();
        }
    } catch (e) {
        console.error(e);
    }
};




//signIn functions
export const handleLogin = (username, password, signIn) => {

    const data = { username, password };

    fetch(MyAddress + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json()
        })
        .then(async (responseJson) => {
            if (responseJson.token) // if we get the token from the server
            {
                try {
                    await AsyncStorage.setItem('Token', responseJson.token);   // we save it
                    signIn(responseJson.token);  // call the sign in function from the app.js screen
                } catch (error) {
                    console.error(err);
                }
            }
            else if (responseJson.message) {
                alert(responseJson.message)
            }
        })
        .catch((error) => {
            console.error(error);
        })
};




//signup functions
export const handleRegister = (username, Password, ConfirmPassword, Email, navigation) => {

    const data = { username, password: Password, email: Email };

    if (handlePassword(Password) && handleEmail(Email) && handleUsername(username) && handlePasswordConfirm(Password, ConfirmPassword)) {
        fetch(MyAddress + '/users/register', {     // send the data to the server 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (!responseJson.error) {
                    await AsyncStorage.setItem('Token', responseJson.token);
                    navigation.navigate("PersonalInformation");
                }
                alert(responseJson.message);
            })
            .catch((error) => {
                console.error(error);
            })

    } else alert(SubmitionErrorMsg)
}



//PersonalInformation function
export const uploadInfo = async (state, FirstName, SecondName, Sex, BirthDay, Profession, University, Specialty, subspecialty, signOut, signIn) => {

    const token = await AsyncStorage.getItem('Token');
    const data = new FormData();

    if (state.uri) {             // if the user enter an image we append it to the file we are sending
        data.append('fileToUpload', {
            uri: state.uri,
            type: 'image/jpeg',
            name: state.fileName,
        });
    }


    data.append('Info', JSON.stringify({        //append the user's Data 
        FirstName,
        SecondName,
        Sex,
        BirthDay,
        Profession,
        University,
        Specialty,
        subspecialty
    }));

    // send the data to the server
    fetch(MyAddress + '/users/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: data
    })
        .then((Response) => {
            if (Response.status !== 403) {   // if the token is valide
                return Response.json();
            }
            else {
                alert('You are not sign In');
                signOut();
            }
        }
        )
        .then((ResponseJSON) => {
            if (ResponseJSON.success) {
                signIn(token);
            } else {
                alert("something went wrong");
            }
        })
};




//forgotpassword functions
export const SendVerifCode = (Email, navigation) => {

    if (handleEmail(Email)) {
        fetch(MyAddress + '/users/ForgotPoassword', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: Email }),
        }).then((response) => {
            return response.json();
        }).then((responseJSON) => {
            alert(responseJSON.message);
            if (!responseJSON.errors) {
                navigation.navigate('ValidateCode', { VerifCode: responseJSON.code, Email });
            }
        })
    } else alert('Email must be Valid ')

};





//validateCode functions
export const verfyCode = (Email, VerifCode, ValidCode, setReTypeTex, navigation) => {
    VerifCode ? ValidCode == VerifCode ? (navigation.navigate('ResetPassword', { Email })) : (setReTypeTex('The Code You Entered Is Wrong')) : (setReTypeTex('Please Enter The Verify Code That You Recieved'))
};





//reset password functions 
export const ChangePassword = (Email, Password, ConfirmPassword, navigation) => {
    if (handlePassword(Password)) {
        if (Password === ConfirmPassword) {
            const data = {
                email: Email,
                password: Password
            };

            fetch(MyAddress + '/users/ResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then((Response) => {
                    return Response.json();
                })
                .then((responseJSON) => {
                    alert(responseJSON.message);
                    if (!responseJSON.errors) {
                        navigation.navigate('Signin');
                    }
                })

        } else alert(passwordConfirmationMsg);
    } else alert(passwordMsg)
}





//home function 
export const requestSpecialite = async (setSpecialities, signOut) => {

    const token = await AsyncStorage.getItem('Token');

    fetch(MyAddress + '/specialite', {           //fetch Speciality List from the server
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then((response) => {
            if (response.status !== 403) {   // if token verified
                return response.json();
            }
            else {
                alert('You are not sign In');
                signOut();
            }
        })
        .then((responseJSON) => {
            setSpecialities(responseJSON);
            return responseJSON;
        })
        .catch((error) => {
            console.error(error);
        })
}




//Sous specialité functions 
export const requestSousSpecialite = async (idSpecialite, setSousSpecialities, signOut) => {     //get the subSpeciality List From The Server

    const token = await AsyncStorage.getItem('Token');   //check token

    fetch(MyAddress + '/SousSpecialite', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ idSpecialite: idSpecialite }),
    })
        .then((response) => {
            if (response.status !== 403) {  // if the token is verified
                return response.json();
            }
            else {
                alert('You are not signed In');
                signOut();
            }
        })
        .then((responseJSON) => {
            setSousSpecialities(responseJSON);      //Set subSpeciality List
        })
        .catch((error) => {
            console.error(error);
        })
}





//list document function
export const requestListeDocument = async (SousSpecialiteid, setListeDocument, signOut) => {

    const token = await AsyncStorage.getItem('Token');

    fetch(MyAddress + '/document', {        //get Document List From The Server
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ SousSpecialiteid: SousSpecialiteid }),
    })
        .then((response) => {
            if (response.status !== 403) {      //If the Token ss Valide
                return response.json();
            }
            else {
                alert('You are not signed In');
                signOut();
            }
        })
        .then((responseJSON) => {
            setListeDocument(responseJSON)
        })
        .catch((error) => {
            console.error(error);
        })
}





//commentsection functions 
export const requestReplies = async (comment, setReplies, signOut) => {

    const token = await AsyncStorage.getItem('Token');

    fetch(MyAddress + '/reponses', {  // Get Responses From the server
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ comment: comment }),
    })
        .then((response) => {
            if (response.status !== 403) {   //if the token is valide
                return response.json();
            }
            else {
                alert('You are not sign In');
                signOut();
            }
        })
        .then((responseJSON) => {
            setReplies(responseJSON)
        })
        .catch((error) => {
            console.error(error);
        })
}






//post functions 
export const requestPost = async (Documentid, setPost, signOut) => {

    let token = await AsyncStorage.getItem('Token');

    fetch(MyAddress + '/post', {    //request the post from the server
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ Documentid: Documentid }),
    })
        .then((response) => {
            if (Response.status === 200) {
                if (response.status !== 403) {    //if token is valide
                    return response.json();
                }
                else {
                    alert('You are not sign In');
                    signOut();
                }
            }
            else alert('something went wrong on the server')
        })
        .then((responseJSON) => {
            setPost(responseJSON)      // set the post 
        })
        .catch((error) => {
            console.error(error);
        })
}
export const requestComments = async (Documentid, setComments, signOut) => {

    let token = await AsyncStorage.getItem('Token');
    fetch(MyAddress + '/commentaires', {   // get the comments
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ Documentid: Documentid }),
    })
        .then((response) => {
            if (response.status !== 403) {   // if the token is valide
                return response.json();
            }
            else {
                alert('You are not sign In');
                signOut();
            }
        })
        .then((responseJSON) => {
            setComments(responseJSON);
        })
        .catch((error) => {
            console.error(error);
        })
}


// quizz functions
export const InitQuestions = async (quizzid,setListOfQuestion,setisLoading,signOut) => {


    const token = await AsyncStorage.getItem('Token');
    const data = { quizzid }


    return fetch(MyAddress + '/quizz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
        .then((Response) => {
            if (Response.status !== 403) {   // if the token is valide
                return Response.json();
            }
            else {
                alert('You are not sign In');
                signOut();
            }
        })
        .then((ResponseJSON) => {
            setListOfQuestion(ResponseJSON);
            setisLoading(false);
        })
}



// ResultQuizz
export const HandelNow = async (quizzid,mark) =>{


    const token = await AsyncStorage.getItem('Token');

    fetch(MyAddress+'/users/mark',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({quizzid,mark})
    }).then((response)=>{
        console.log('done');
    })
}
export const AddRating = async (quizzid,Rating)=>{

    const token = await AsyncStorage.getItem('Token');

    fetch(MyAddress+'/document/rate',{
        method:'Post',
        headers:{
            'Content-Type':'application/json',
            'authorization':'Beare '+token
        },
        body: JSON.stringify({quizzid,Rating})
    })
    .then((response)=>{
        return response.json();
    }).then((responseJSON)=>{
        alert(responseJSON.message);
    })

}
//replies
export const sendReply= async (previousid,text)=>{
    if(text!=""){
    const token = await AsyncStorage.getItem('Token');   //check token

    fetch(MyAddress + '/reponses/send', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({contenu:text,previousid:previousid}),
    })
        .then((response) => {
            if (response.status !== 403) {  // if the token is verified
                return response.json();
            }
            else {
                alert('You are not signed In');
                signOut();
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }else{
        alert("cant send an empty reply")
    }
}
//comments
export const sendComment=async (documentid,text)=>{
    if(text!=""){
    const token = await AsyncStorage.getItem('Token');
    fetch(MyAddress + '/commentaires/send', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({contenu:text,documentid:documentid}),
    })
        .then((response) => {
            if (response.status !== 403) {  // if the token is verified
                return response.json();
            }
            else {
                alert('You are not signed In');
                signOut();
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }else{
        alert("cant send an empty comment")
    }
}
