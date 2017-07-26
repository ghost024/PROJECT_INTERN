// Gloabl variable

var i, x, table, table2, loadedarray;



// Functions -----------------
function constructTable(val, x, fileSize){

    url = sessionStorage.getItem("URL");
    link = url + val;
    table += "<tr><td class ='column1'><input type='checkbox' id='file[" + i + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;"
        + "</td><td class='column2'><a href='" + link + "' download>" + val
        + "</td><td class='column3'>" + x[i].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue
        + "</td><td class='column4'>" + fileSize + "</td></tr>";


}
function createDirectory() {
    table = "";
    url = sessionStorage.getItem("URL");

    // Calls function to create CORS Request header, then callback

    var dirName = prompt("What would you like to name the new directory?");
    if(dirName === null || dirName === ""){
        alert("You must provide a name for the directory")
    }
    else{
        dirName += "/";
        var xhr = createCORSRequest("PUT", url + dirName);
    }

    // Error Function
    xhr.onerror = function () {
        alert('Whoops, there was an error making the request.');
    };

    // Put file in bucket
    xhr.send();


    // After all files are sent, wait and refresh the file list
    var delayMillis = 2500;
    setTimeout(makeCorsRequest, delayMillis);

}







function selectService() {
    user = document.getElementById('user').value;
    pass = document.getElementById('pass').value;
    tok = user + ':' + pass;
    hash = Base64.encode(tok);
    sessionStorage.setItem('USER', user);
    sessionStorage.setItem('HASH', hash);


    document.getElementById('LoginField').innerHTML = '<h1>Select Storage Service:</h1><form action="javascript:setService()" method="POST" id="serviceForm"><select form="serviceForm" name="service" id="service" required>' +

        '<option value="AWS">AWS</option>' +
        '<option value="Azure">Microsoft Azure</option></select><br><br><input type="submit" class="button" value="SELECT SERVICE"></form>'

}





function setService() {
    if(document.getElementById('service').value === "AWS"){
        url = 'http://animals.indigodev2.dev.atl.foundry.att.com/';
        sessionStorage.setItem("URL", url);
        makeCorsRequest()
    }
    else alert('wrooooong')
}






// Logout Function
function logout() {
    sessionStorage.clear();
    window.open("project_test.html","_self")
}






// Delete Function
function deletefxn() {
    text =  '<?xml version="1.0" encoding="UTF-8"?>' +
            '<Delete>' +
            '<Quiet>true</Quiet>';

        for(z=1;z<i;z++) {
            console.log(i);

            if (document.getElementById('file[' + z + ']').checked === true) {
                console.log(z);
                text += '<Object>' +
                    '<key>' + x[z].getElementsByTagName("Key")[0].childNodes[0].nodeValue + '</key>' +
                    '</Object>'
            }
            else if (document.getElementById('file[' + z + ']').checked !== true){
                console.log(z + " is hidden")
            }
            else console.log('not ' + z)
        }
        text += '</Delete>';
    alert(text)
}





// Upload Files Function
function putRequest() {
    table = "";
    var NumFiles = document.getElementById('fileUpload[]').files.length;
    var uploadSize = 0;
    console.log(uploadSize);

    for (var x = 0; x < NumFiles; x++) {
        thefile = document.getElementById('fileUpload[]').files[x];
        filename = document.getElementById('fileUpload[]').files[x].name;
        filesize = document.getElementById('fileUpload[]').files[x].size;
        uploadSize += filesize;
        console.log(uploadSize);

        // Creates preflight and request headers
        var xhr = createCORSRequest("PUT", url + filename);
       // xhr.open('PUT', url + filename);
       // xhr.setRequestHeader('Authorization', 'Basic ' + hash);


        // If CORS is not supported
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Error Function
        xhr.onerror = function () {
            alert('Whoops, there was an error making the request.');
        };

        // Put file in bucket
        xhr.send(thefile);


        // After all files are sent, wait and refresh the file list
        var delayMillis = 6000;
        if(x+1 === NumFiles){setTimeout(makeCorsRequest, delayMillis)}
    }
}







// function called to set header/preflight request
function createCORSRequest(method, url) {

    // Declaring variables for Request
    var xhr = new XMLHttpRequest();

    // If no credentials, check for credentials
    if(hash === null) {
        console.log('no user data');
        hash = sessionStorage.getItem('HASH');

        if (hash !== null) {
            console.log('Found User Data');
            xhr.open(method, url, true);
            xhr.setRequestHeader('Authorization', 'Basic ' + hash);
        }
        else {
            alert('Missing Credentials, please login again');
            logout()
        }
    }

    // If credentials detected, then proceed
    else if(hash !== null){
        xhr.open(method, url, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + hash);
    }

    // ALERT not XMLHttp
    else {
        alert('Not XMLHttp, please check to make sure all information is correct and try again')
    }

    // Returns headers to makeCorsRequest()
    return xhr;
}









// Make the actual CORS request to Get list
function makeCorsRequest() {
    table = "";

    // URL for session
    url = sessionStorage.getItem("URL");

    // Calls function to create CORS Request header, then callback
    var xhr = createCORSRequest("GET", url + "?list-type=2");

    // If CORS is not supported
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers
    xhr.onload = function () {
        var xmlDoc = new DOMParser().parseFromString(xhr.responseText, 'text/xml');

        x = xmlDoc.getElementsByTagName("Contents");

        // Creates div for username/logout button
        var title = "<div id='loggingOut' class='login_out'><p class='UserInfo' id='username'>You are currently logged in as: " +  sessionStorage.getItem('USER')  + "<br><br><input class='button' type='button' id='logout' value='LOGOUT' onclick='logout()'></p></div>";

        // Gets bucket name
        var logInOut = "<h1 class = 'header'>" + xmlDoc.getElementsByTagName('Name')[0].childNodes[0].nodeValue + "</h1>";

        // Refresh button and Refresh File list
        var refresh = "<p id='numfiles'></p>" + "<div id='refreshButton'><input class='button' align='left' type='button' onclick='makeCorsRequest()' value='REFRESH FILE LIST'><input type='button' align='right' id='createDir' value='Create New Directory' onclick='createDirectory()' class='button2'> <br><br></div>";

        // Initiates table and table head
        var tableheader = "<table id='fileList'><div id='thead_body'><thead><div id='tableRows>'><tr><th class='column1'>Select File</th><th class='column2'>" + "File</th><th class='column3'>Last Modified</th><th class='column4'>Size</th></tr></thead><tbody><div id='rowsData'";

        // Constructs table rows
        for (i = 0; i < x.length; i++) {

            // filename to add as extension to url for put
            var val = x[i].getElementsByTagName("Key")[0].childNodes[0].nodeValue;
            var length = val.length;
            var fileSize = x[i].getElementsByTagName("Size")[0].childNodes[0].nodeValue;
            var link = url + val;
            loadedarray = [];
            slashFind = val.indexOf("/");
            console.log(length);
            console.log(slashFind);

            if(slashFind + 1 === length || slashFind === -1){
                loadedarray.push('file['+i+']');
                if (slashFind + 1 === length) {

                    Directory = val.substring(0, slashFind);
                    val = "Directory: " + Directory;
                    constructTable(val, x, fileSize)
                }

                else if(slashFind === -1){
                    constructTable(val, x, fileSize)
                }
            }

            else if(slashFind !== -1 || slashFind +1 !== length) {
                table2 += "<tr><td class ='column1'><input type='checkbox' id='file[" + i + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;"
                    + "</td><td class='column2'><a href='" + link + "' download>" + val
                    + "</td><td class='column3'>" + x[i].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue
                    + "</td><td class='column4'>" + fileSize + "</td></tr>";
                console.log(table2);
            }

            else alert("errrororaororor")
        }
        console.log(loadedarray);
        // Close table data assignments
        table = tableheader + table + "</div></tbody></div></table><br>";

        // Delete Button and paragraph "select files to upload"
        var delet = "<input class='button' type='button' id='delete' onclick='deletefxn()' value='DELETE SELECTED FILES'><br><br><br><p id='uploadPar'>SELECT FILES TO UPLOAD:</p>";

        // upload form and upload files button
        var upload = "<form enctype='multipart/form-data' name='uploadform' id='uploadform' method='POST' action='javascript:putRequest()'>"
            + "<input type='file' id='fileUpload[]' name='fileUpload[]' value='Browse...' multiple><br><br>"
            + "<input class = 'button' type='submit' name='submit' id='submit' value='UPLOAD FILES'><br><br></form>";

        // Personalized footer
        var footer = "<br><br><br><br><p>This page was constructed for use by AT&T Foundry and affiliates. Do not use for any purpose other than intended. JD IRWIN, Intern AT&T Foundry</p><br><br><br>";

        // Replaces LoginField innerHTML with new data
        document.getElementById("LoginField").innerHTML =  title + logInOut + refresh + table + delet + upload + footer;
        document.getElementById('dynamic').innerHTML = "Files";
        document.getElementById('numfiles').innerHTML = "Number of Files: " + x.length;

    };
    // Error Function
    xhr.onerror = function() {
        alert("You were not authorized, please try logging in again");
        logout()
    };

    // Send header
    xhr.send();
    xhr.onreadystatechange= function () {

        // If response header does not authorize then logout
        if(this.readyState === this.HEADERS_RECEIVED) {
            ResponseHead = xhr.getResponseHeader('Content-Type');
            if (ResponseHead = null){
                alert('Your credentials are not valid, please login again');
                logout()
            }
        }
    }
}


