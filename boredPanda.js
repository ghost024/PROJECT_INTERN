// Gloabl variable

var val, x, table, table2, bucket, title, logInOut, refresh, delet, upload, footer, tableheader;



// Functions -----------------
function tableSorting(val) {
    table2 = "";
    for(r=0;r<hiddenarray.length;r++){

        if(hiddenarray[r].indexOf(val) !== -1){
            table2 += "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;"
                + "</td><td class='column2'><a href='" + link + "' download>" + val
                + "</td><td class='column3'>" + x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue
                + "</td><td class='column4'>" + x[n].getElementsByTagName("Size")[0].childNodes[0].nodeValue + "</td></tr>";



        }
    }
    table = tableheader + table2;
    document.getElementById('LoginField').innerHTML = title + logInOut + refresh + table + delet + upload + footer;
    document.getElementById('bucket').innerHTML = bucket + ": " + val;
}

function constructTable(val, x, fileSize){

    url = sessionStorage.getItem("URL");
    link = url + val;
    if(val.indexOf('/') !== -1){
        val = val.slice(0, -1);
        link = 'javascript:tableSorting("'+val+'")'}
    table += "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;"
        + "</td><td class='column2'><a id='link4href["+n+"]' href='" + link + "' download>" + val + "</a>"
        + "</td><td class='column3'>" + x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue
        + "</td><td class='column4'>" + fileSize + "</td></tr>";


}
function createDirectory() {

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

    url = sessionStorage.getItem("URL");
    var selectDelete = [];
    var loadedtable = JSON.parse(sessionStorage.getItem('NoSubDir'));
    console.log(loadedtable);
    text =  '<?xml version="1.0" encoding="UTF-8"?>' +
            '<Delete>' +
            '<Quiet>true</Quiet>';

    for(z=0;z<loadedtable.length;z++) {

        if (document.getElementById(loadedtable[z]).checked === true) {
            selectDelete.push(loadedtable[z]);
            text += '<Object>' +
                    '<Key>' + document.getElementById(loadedtable[z]).name + '</Key>' +
                    '</Object>'
            }
        else if (document.getElementById(loadedtable[z]).checked !== true){
                console.log(z + " is hidden")
            }
        else console.log('not ' + z)
        }
        text += '</Delete>';
        var filehash = md5(text, null, true);
        console.log(filehash);
        var basehash = btoa(filehash);
        console.log(basehash);
    console.log(selectDelete);
    xhr = createCORSRequest("POST", url+'?delete=');
    xhr.setRequestHeader('Content-MD5', basehash);
    xhr.send(text);
    delay = 1500;
    setTimeout(makeCorsRequest, delay)

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
    table2 = "";

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
        bucket = xmlDoc.getElementsByTagName('Name')[0].childNodes[0].nodeValue;
        x = xmlDoc.getElementsByTagName("Contents");

        // Creates div for username/logout button
        title = "<div id='loggingOut' class='login_out'><p class='UserInfo' id='username'>You are currently logged in as: " +  sessionStorage.getItem('USER')  + "<br><br><input class='button' type='button' id='logout' value='LOGOUT' onclick='logout()'></p></div>";

        // Gets bucket name
        logInOut = "<h1 id='bucket' class = 'header'>" + bucket + "</h1>";

        // Refresh button and Refresh File list
        refresh = "<p id='numfiles'></p>" + "<div id='refreshButton'><input class='button' align='left' type='button' onclick='makeCorsRequest()' value='REFRESH FILE LIST'><input type='button' align='right' id='createDir' value='Create New Directory' onclick='createDirectory()' class='button2'> <br><br></div>";

        // Initiates table and table head
        tableheader = "<table id='fileList'><div id='thead_body'><thead><div id='tableRows>'><tr><th class='column1'>Select File</th><th class='column2'>" + "File</th><th class='column3'>Last Modified</th><th class='column4'>Size</th></tr></thead><tbody><div id='rowsData'";
        loadedtable = [];
        hiddenarray = [];
        directories = [];
        dirNames = [];
        table2 = "";
        // Constructs table rows
        for (n = 0; n < x.length; n++) {

            // filename to add as extension to url for put
            val = x[n].getElementsByTagName("Key")[0].childNodes[0].nodeValue;
            var length = val.length;
            var fileSize = x[n].getElementsByTagName("Size")[0].childNodes[0].nodeValue;
            var link = url + val;

            slashFind = val.indexOf("/");
            //console.log(length);
            //console.log(slashFind);

            if(slashFind + 1 === length || slashFind === -1){

                if (slashFind + 1 === length) {
                   // loadedtable.splice(n,1);
                    constructTable(val, x, fileSize);
                    directories.push('file['+n+']');
                    dirNames.push(val);

                    //console.log(document.getElementById('file['+n+']').outerHTML);
                }

                else if(slashFind === -1){
                    loadedtable.push('file['+n+']');
                    constructTable(val, x, fileSize)
                }
            }

            else if(slashFind !== -1 || slashFind +1 !== length) {
                hiddenarray.push(val);
                table2 += "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;"
                    + "</td><td class='column2'><a href='" + link + "' download>" + val
                    + "</td><td class='column3'>" + x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue
                    + "</td><td class='column4'>" + fileSize + "</td></tr>";
                console.log(table2);
            }

            else alert("errrororaororor");


        }

        sessionStorage.setItem('NoSubDir', JSON.stringify(loadedtable));
        console.log(loadedtable);
        console.log(hiddenarray);
        console.log(directories);
        console.log(dirNames);
        // Close table data assignments
        table = tableheader + table + "</div></tbody></div></table><br>";

        // Delete Button and paragraph "select files to upload"
        delet = "<input class='button' type='button' id='delete' onclick='deletefxn()' value='DELETE SELECTED FILES'><br><br><br><p id='uploadPar'>SELECT FILES TO UPLOAD:</p>";

        // upload form and upload files button
        upload = "<form enctype='multipart/form-data' name='uploadform' id='uploadform' method='POST' action='javascript:putRequest()'>"
            + "<input type='file' id='fileUpload[]' name='fileUpload[]' value='Browse...' multiple><br><br>"
            + "<input class = 'button' type='submit' name='submit' id='submit' value='UPLOAD FILES'><br><br></form>";

        // Personalized footer
        footer = "<br><br><br><br><p>This page was constructed for use by AT&T Foundry and affiliates. Do not use for any purpose other than intended. JD IRWIN, Intern AT&T Foundry</p><br><br><br>";

        // Replaces LoginField innerHTML with new data
        document.getElementById("LoginField").innerHTML =  title + logInOut + refresh + table + delet + upload + footer;
        document.getElementById('dynamic').innerHTML = "Files";
        document.getElementById('numfiles').innerHTML = "Number of Files: " + x.length;

        for (n=0;n<directories.length;n++){
            document.getElementById(directories[n]).outerHTML = '<image src="images/folderIcon.png" id="file['+n+']" width="23" height="19">';

        }

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


