// Gloabl variable

var val, x, table, table2, bucket, title, url, logInOut, refresh, delet, upload, footer, folder;
var tableFooter = "</tbody></table><br>";
var tableheader = "<table id='fileList'><thead><tr><th class='column1'>Select File</th><th class='column2'>" + "File</th><th class='column3'>Last Modified</th><th class='column4'>Size</th></tr></thead><tbody>";
var loadedtable = [];
var allFiles = [];
var allFileNames = [];
var filesss = [];
var folders = [];
var Column1 = [];
var Column2 = [];
var Column3 = [];
var Column4 = [];
var filesize = [];
var lastmodified = [];
var path = [];

// Functions -----------------
function sortTable(n, m) {
    url = sessionStorage.getItem("URL");
    path.push(n);
    console.log(n);
    if (n === -1) {
        makeCorsRequest()
    }
    else if (n > -1) {
        u = path.length;
        console.log(u);
        u = path[u-1];






        console.log(u);

        console.log(path);





        console.log(n);
        folder = allFileNames[n];
        console.log(folder);
        url = url + folder;
        console.log(val);
        loadedtable = [];
        filesss = [];
        num = 0;
        console.log(url);
        slashFind = folder.lastIndexOf("/");
        for (m = n; m < allFileNames.length; m++) {
            val = allFileNames[m];
            fileSize = filesize[m];
            link = url + val;
            column3Data = "<td class='column3'>" + lastmodified[m] + "</td>";
            column4Data = "<td class='column4'>" + filesize[m] + "</td></tr>";
            indy = val.indexOf(folder);

            if (indy > -1) {
                if (folder.lastIndexOf('/') + 1 === val.length) {
                    column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + m + "]' width='23' height='19'></image></td>";
                    column2Data = "<td class='column2'><a id='link4href[" + m + "]' href='#' onclick='sortTable(" + u + ")'>" + "Up Directory (..)" + "</a></td>";
                    column3Data = "<td class='column3'></td>";
                    column4Data = "<td class='column4'></td></tr>";
                    loadedtable.push(column1Data + column2Data + column3Data + column4Data)
                }

                else if (folder.lastIndexOf('/') + 1 !== val.length) {

                    val = val.substring(slashFind + 1);
                    link = url + val;
                    if (val.indexOf("/") +1 === val.length) {

                            column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + m + "]' width='23' height='19'></image></td>";
                            column2Data = "<td class='column2'><a id='link4href[" + m + "]' href='#' onclick='sortTable(" + m + ")'>" + val + "</a></td>";

                        loadedtable.push(column1Data + column2Data + column3Data + column4Data);
                    }



                    else if (val.indexOf("/") === -1) {
                        filesss[num] = "file[" + m + "]";
                        column1Data = "<tr><td class ='column1'><input type='checkbox' id='file[" + m + "]' name='" + allFileNames[m] + "' value='" + link + "'" + "/>&nbsp;</td>";
                        column2Data = "<td class='column2'><a id='link4href[" + m + "]' href='" + link + "' download>" + val + "</a></td>";
                        num++;
                        loadedtable.push(column1Data + column2Data + column3Data + column4Data);
                    }


                }


            }
            table = constructTable()
        }



        document.getElementById("LoginField").innerHTML = title + logInOut + refresh + table + delet + upload + footer;
        document.getElementById("bucket").innerHTML = bucket + "/" + allFileNames[n];
        document.getElementById('numfiles').innerHTML = "Number of Files: " + x.length;
        //console.log(filesss)



    }
}

function constructTable() {
    // sessionStorage.setItem('NoSubDir', JSON.stringify(loadedtable));

    table = tableheader;
    for(n=0;n<loadedtable.length;n++){

        table += loadedtable[n];
    }
    table = table + tableFooter;

    return table;
    //console.log(allFileNames);



}



    function createDirectory() {

        // url = sessionStorage.getItem("URL");

        // Calls function to create CORS Request header, then callback

        var dirName = prompt("What would you like to name the new directory?");
        var delay = 2500;
        if (dirName === null || dirName === "") {
            alert("You must provide a name for the directory")
        }
        else {
            dirName += "/";
            var xhr = createCORSRequest("PUT", url + dirName);
        }
        xhr.onload = setTimeout(makeCorsRequest, delay);
        // Error Function
        xhr.onerror = function () {
            alert('Whoops, there was an error making the request.');
        };

        // Put file in bucket
        xhr.send();


        // After all files are sent, wait and refresh the file list
     //   var delayMillis = 2500;
       // setTimeout(makeCorsRequest, delayMillis);


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
        if (document.getElementById('service').value === "AWS") {
            url = 'http://animals.indigodev2.dev.atl.foundry.att.com/';
            sessionStorage.setItem("URL", url);
            makeCorsRequest()
        }
        else alert('Heather said, "Pick another storage service, this one is not yet configured."')
    }


// Logout Function
    function logout() {
        sessionStorage.clear();
        window.open("Project_refactor.html", "_self")
    }


// Delete Function
    function deletefxn() {

        //url = sessionStorage.getItem("URL");
        var selectDelete = [];
        console.log(url);

        console.log("loaded table: " + filesss);
        text = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<Delete>' +
            '<Quiet>true</Quiet>';

        for (z = 0; z < filesss.length; z++) {

            if (document.getElementById(filesss[z]).checked === true) {
                selectDelete.push(filesss[z]);
                text += '<Object>' +
                    '<Key>' + document.getElementById(filesss[z]).name + '</Key>' +
                    '</Object>'
            }
            else if (document.getElementById(filesss[z]).checked !== true) {
                console.log(z + " is hidden")
            }
            else console.log('not ' + z)
        }
        text += '</Delete>';
        var filehash = md5(text, null, true);
        //   console.log(filehash);
        var basehash = btoa(filehash);
        // console.log(basehash);
        // console.log(selectDelete);
        xhr = createCORSRequest("POST", url + '?delete=');
        xhr.setRequestHeader('Content-MD5', basehash);
        console.log(text);
        console.log(url);
        xhr.send(text);
        delay = 1500;
        setTimeout(makeCorsRequest, delay)

    }


// Upload Files Function
    function putRequest() {
        table = "";
        var NumFiles = document.getElementById('fileUpload[]').files.length;
        var uploadSize = 0;
        //  console.log(uploadSize);

        for (var x = 0; x < NumFiles; x++) {
            thefile = document.getElementById('fileUpload[]').files[x];
            filename = document.getElementById('fileUpload[]').files[x].name;
            filesize = document.getElementById('fileUpload[]').files[x].size;
            uploadSize += filesize;
            //  console.log(uploadSize);

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
            if (x + 1 === NumFiles) {
                setTimeout(makeCorsRequest, delayMillis)
            }
        }
    }


// function called to set header/preflight request
    function createCORSRequest(method, url) {

        // Declaring variables for Request
        var xhr = new XMLHttpRequest();

        // If no credentials, check for credentials
        if (hash === null) {
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
        else if (hash !== null) {
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


        filesss = [];
        loadedtable = [];
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
            bucket = xmlDoc.getElementsByTagName('Name')[0].childNodes[0].nodeValue;
            x = xmlDoc.getElementsByTagName("Contents");

            // Creates div for username/logout button
            title = "<div id='loggingOut' class='login_out'><p class='UserInfo' id='username'>You are currently logged in as: " + sessionStorage.getItem('USER') + "<br><br><input class='button' type='button' id='logout' value='LOGOUT' onclick='logout()'></p></div>";

            // Gets bucket name
            logInOut = "<h1 id='bucket' class = 'header'>" + bucket + "</h1>";

            // Refresh button and Refresh File list
            refresh = "<p id='numfiles'></p>" + "<div id='refreshButton'><input class='button' align='left' type='button' onclick='makeCorsRequest()' value='REFRESH FILE LIST'><input type='button' align='right' id='createDir' value='Create New Directory' onclick='createDirectory()' class='button2'><br><br></div>";

            // Initiates table and table head
            allFiles = [];
            filesize = [];
            allFileNames = [];
            column1Data = "";
            column2Data = "";
            column3Data = "";
            column4Data = "";
            hiddenarray = [];
            directories = [];
            dirNames = [];
            Column1 = [];
            Column2 = [];
            Column3 = [];
            Column4 = [];
            parentDirectory = "";
            table2 = "";
            num = 0;
            num2 = 0;
            folders = [];
            filesss = [];

            // Constructs table rows

            for (n = 0; n < x.length; n++) {
                lastmodified[n] = x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue;
                filesize[n] = x[n].getElementsByTagName("Size")[0].childNodes[0].nodeValue;
                allFileNames[n] = x[n].getElementsByTagName("Key")[0].childNodes[0].nodeValue;



                 var link = url + val;

                 //  var slashFind = val.indexOf("/"); */

                allFiles[n] = 'file[' + n + ']';

            }


    //        if(path.indexOf(-1) === -1) {
          //      path.push(-1);
                for (n = 0; n < allFileNames.length; n++) {

                    val = allFileNames[n];
                    fileSize = filesize[n];
                    link = url + val;

                    column3Data = "<td class='column3'>" + lastmodified[n] + "</td>";
                    column4Data = "<td class='column4'>" + fileSize + "</td></tr>";


                    if (val.indexOf("/") + 1 === val.length) {

                        folders[num] = val;

                        column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
                        column2Data = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + n + ")'>" + val + "</a></td>";
                        loadedtable.push(column1Data + column2Data + column3Data + column4Data);
                        num++
                    }


                    else if (allFileNames[n].indexOf("/") === -1) {

                        filesss[num2] = "file[" + n + "]";

                        column1Data = "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;</td>";
                        column2Data = "<td class='column2'><a id='link4href[" + n + "]' href='" + link + "' download>" + val + "</a></td>";
                        loadedtable.push(column1Data + column2Data + column3Data + column4Data);
                        num2++
                    }

                }
     //       }



            console.log(loadedtable);
            console.log(folders);
            table = constructTable();




            // Delete Button and paragraph "select files to upload"
            delet = "<input class='button' type='button' id='delete' onclick='deletefxn()' value='DELETE SELECTED FILES'><br><br><br><p id='uploadPar'>SELECT FILES TO UPLOAD:</p>";

            // upload form and upload files button
            upload = "<form enctype='multipart/form-data' name='uploadform' id='uploadform' method='POST' action='javascript:putRequest()'>"
                + "<input type='file' id='fileUpload[]' name='fileUpload[]' value='Browse...' multiple><br><br>"
                + "<input class = 'button' type='submit' name='submit' id='submit' value='UPLOAD FILES'><br><br></form>";

            // Personalized footer
            footer = "<br><br><br><br><p>This page was constructed for use by AT&T Foundry and affiliates. Do not use for any purpose other than intended. JD IRWIN, Intern AT&T Foundry</p><br><br><br>";

            // Replaces LoginField innerHTML with new data
            document.getElementById("LoginField").innerHTML = title + logInOut + refresh + table + delet + upload + footer;
            document.getElementById('dynamic').innerHTML = "Files";
            document.getElementById('numfiles').innerHTML = "Number of Files: " + x.length;


        };
        // Error Function
        xhr.onerror = function () {
            alert("You were not authorized, please try logging in again");
            logout()
        };

        // Send header
        xhr.send();
        xhr.onreadystatechange = function () {

            // If response header does not authorize then logout
            if (this.readyState === this.HEADERS_RECEIVED) {
                ResponseHead = xhr.getResponseHeader('Content-Type');
                if (ResponseHead = null) {
                    alert('Your credentials are not valid, please login again');
                    logout()
                }
            }
        }
}


