// Gloabl variable

var val, x, table, table2, bucket, title, url, logInOut, refresh, delet, upload, footer, folder;
var tableFooter = "</tbody></table><br>";
var tableheader = "<table id='fileList'><thead><tr><th class='column1'>Select File</th><th class='column2'>" + "File</th><th class='column3'>Last Modified</th><th class='column4'>Size</th></tr></thead><tbody>";
var loadedtable = [];
var extratable = [];
var fantasytable = [];
var allFiles = [];
var tables = [];
var allFileNames = [];
var foldersloaded = [];
var subfoldersFiles = [];
var filesss = [];
var folders = [];
var Column1 = [];
var Column2 = [];
var Column3 = [];
var Column4 = [];
var levAll = {};
var levFiles = {};
var levFolders = {};
var filesize = [];
var lastmodified = [];
var previousdir = "";
var path = [];

// Functions -----------------
function sortTable(n, m) {
    console.log(n);
    if (n === -1){makeCorsRequest()}
    u = path.pop();
    console.log(u);
    path.push(u);
    path.push(n);
    console.log(path);



    url = url + allFileNames[n];
    console.log(url);
    folder = allFileNames[n];
    console.log(val);
    loadedtable = [];
    filesss = [];



    for (m=n;m<allFileNames.length;m++) {
        val = allFileNames[m];
        fileSize = filesize[m];
        link = url + val;
        column3Data = "<td class='column3'>" + lastmodified[m] + "</td>";
        column4Data = "<td class='column4'>" + filesize[m] + "</td></tr>";



        if(val.indexOf(folder) > -1){
            if(val.indexOf('/')+1 === val.length){
                column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
                column2Data = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + u + ")'>" + "Up Directory (..)" + "</a></td>";
                column3Data = "<td class='column3'></td>";
                column4Data = "<td class='column4'></td></tr>";
                loadedtable.push(column1Data+column2Data+column3Data+column4Data)
            }

            else if(val.indexOf('/') + 1 !== val.length) {
                slashFind = val.indexOf("/");
                val = val.substring(slashFind + 1);
                link = url + val;
                if (val.indexOf("/") > -1) {
                    column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
                    column2Data = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + m + ")'>" + val + "</a></td>";

                }
                else if (val.indexOf("/") === -1) {

                    column1Data = "<tr><td class ='column1'><input type='checkbox' id='file[" + m + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;</td>";
                    column2Data = "<td class='column2'><a id='link4href[" + m + "]' href='" + link + "' download>" + val + "</a></td>";
                }
                loadedtable.push(column1Data + column2Data + column3Data + column4Data);

            }


        }
        table = constructTable()
    }

  /*  updir = subfoldersFiles[n];
    while (subfoldersFiles[n] !== null && subfoldersFiles[n].indexOf(updir) > -1){
        val = subfoldersFiles[n];
        slashFind = val.indexOf('/');


        if (slashFind + 1 === val.length){
            Column1[n] = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
            Column2[n] = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + n + ")'>" + val + "</a></td>";
            table += Column1[n] + Column2[n] + Column3[n] + Column4[n];
        }
        else if (slashFind === -1){

            table += Column1[n] + Column2[n] + Column3[n] + Column4[n];
        }
        else val = val.substring(slashFind+1);

        n++
    }*/



   /* for(n=num;n<subfoldersFiles.length;n++){
        if(subfoldersFiles[n].indexOf(val) === -1) {
            alert("error")
        }
        else if(subfoldersFiles[n].index)

            object = subfoldersFiles[n];
            slashFind = object.indexOf("/");
            object = object.substring(slashFind + 1);
            console.log(object);
            if (object.indexOf('/') === -1) {
                table += Column1[n] + Column2[n] + Column3[n] + Column4[n];



            else if(object.indexOf('/') > -1){
                slashFind = object.indexOf('/');
                val = object.substring(slashFind + 1);
                Column1[n] = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
                Column2[n] = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + n + ")'>" + val + "</a></td>";
                table += Column1[n] + Column2[n] + Column3[n] + Column4[n];
            }
        }*/

    //console.log(table);



    document.getElementById("LoginField").innerHTML =  title + logInOut + refresh + table + delet + upload + footer;
    document.getElementById("bucket").innerHTML = bucket +"/"+allFileNames[n];
    document.getElementById('numfiles').innerHTML = "Number of Files: " + x.length;



    /*table2 = "";
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
    document.getElementById('bucket').innerHTML = bucket + ": " + val;*/
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

  /*
    for(n=0;n<allFileNames.length;n++) {
        val = allFileNames[n];
        slashFind = val.indexOf("/");
        if (slashFind === -1) {
            subfoldersFiles.push(null);
            folders.push(null);
            filesss.push(val);
            bucketloaded.push(allFileNames[n]);
            bucketfiles += Column1[n] + Column2[n] + Column3[n] + Column4[n];
            num++
        }

        else if (slashFind + 1 === allFileNames[n].length) {

            subfoldersFiles.push(val);

            filesss.push(null);
            folders.push(val);
            val = allFileNames[n].substring(0, slashFind);
            link = url + val + "/";

            Column1[n] = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
            Column2[n] = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + n + ")'>" + val + "</a></td>";
            bucketfiles += Column1[n] + Column2[n] + Column3[n] + Column4[n];
            //console.log(allFileNames[n]);
            num++

        }
        else if (slashFind > -1 && slashFind + 1 !== allFileNames[n].length) {

            subfoldersFiles.push(allFileNames[n]);


            filesss.push(null);
            folders.push(null);
            num++

        }
    }
    //console.log(num);
    console.log(subfoldersFiles);
    console.log(folders);
    console.log(filesss.length);

    table = tableheader + bucketfiles + tableFooter;

    return table;
}
*/



    /*

     if(hiddenarray.indexOf('file['+n+']') === -1) {
     table += Column1[n] + Column2[n] + Column3[n] + Column4[n];
     extratable[n] = "thatfileisn'there"

     }
     else extratable[n] = Column1[n] + Column2[n] + Column3[n] + Column4[n];


     }
     for(n=0;n<directories.length;n++){
     var dir = dirNames[n];
     console.log(dir);
     fantasytable[n] = "";
     for (z=0;z<extratable.length;z++){

     if(extratable[z].indexOf(dir) > -1){
     fantasytable[n] += extratable[z]
     }
     }
     }








     console.log(dirNames);
     table = tableheader + table + tableFooter;
     console.log(fantasytable);
     console.log("table constructed");
     //   console.log(table);
     console.log(extratable);
     return table;

     */


    /*
     url = sessionStorage.getItem("URL");
     link = url + val;



     if(val.indexOf('/') !== -1){
     val = val.slice(0, -1);
     link = 'javascript:tableSorting("'+val+'")'}
     table += "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;"
     + "</td><td class='column2'><a id='link4href["+n+"]' href='" + link + "' download>" + val + "</a>"
     + "</td><td class='column3'>" + x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue
     + "</td><td class='column4'>" + fileSize + "</td></tr>";
     */

    function createDirectory() {

        // url = sessionStorage.getItem("URL");

        // Calls function to create CORS Request header, then callback

        var dirName = prompt("What would you like to name the new directory?");
        if (dirName === null || dirName === "") {
            alert("You must provide a name for the directory")
        }
        else {
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
        path.push(-1);
        filesss = [];
        loadedtable = [];
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
            title = "<div id='loggingOut' class='login_out'><p class='UserInfo' id='username'>You are currently logged in as: " + sessionStorage.getItem('USER') + "<br><br><input class='button' type='button' id='logout' value='LOGOUT' onclick='logout()'></p></div>";

            // Gets bucket name
            logInOut = "<h1 id='bucket' class = 'header'>" + bucket + "</h1>";

            // Refresh button and Refresh File list
            refresh = "<p id='numfiles'></p>" + "<div id='refreshButton'><input class='button' align='left' type='button' onclick='makeCorsRequest()' value='REFRESH FILE LIST'><input type='button' align='right' id='createDir' value='Create New Directory' onclick='createDirectory()' class='button2'><br><br></div>";

            // Initiates table and table head

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

            // Constructs table rows

            for (n = 0; n < x.length; n++) {
                lastmodified[n] = x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue;
                filesize[n] = x[n].getElementsByTagName("Size")[0].childNodes[0].nodeValue;
                /*     // filename to add as extension to url for put
                 var column1Data = "";
                 var column2Data = "";
                 var column3Data = "";
                 var column4Data = "";   */
                val = x[n].getElementsByTagName("Key")[0].childNodes[0].nodeValue;
                    // var length = val.length;


                 var link = url + val;

                 //  var slashFind = val.indexOf("/"); */

                allFiles[n] = 'file[' + n + ']';
                allFileNames[n] = val;
            }
            for (n=0;n<allFileNames.length;n++) {

                val = allFileNames[n];
                fileSize = x[n].getElementsByTagName("Size")[0].childNodes[0].nodeValue;
                link = url + val;
                column3Data = "<td class='column3'>" + x[n].getElementsByTagName("LastModified")[0].childNodes[0].nodeValue + "</td>";
                column4Data = "<td class='column4'>" + fileSize + "</td></tr>";


                if (val.indexOf("/") + 1 === val.length) {

                    folders.push(val);

                    column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file[" + n + "]' width='23' height='19'></image></td>";
                    column2Data = "<td class='column2'><a id='link4href[" + n + "]' href='#' onclick='sortTable(" + n + ")'>" + val + "</a></td>";
                    loadedtable.push(column1Data+column2Data+column3Data+column4Data);
                }


                else if (allFileNames[n].indexOf("/") === -1) {

                    filesss.push("file["+n+"]");

                    column1Data = "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;</td>";
                    column2Data = "<td class='column2'><a id='link4href[" + n + "]' href='" + link + "' download>" + val + "</a></td>";
                    loadedtable.push(column1Data+column2Data+column3Data+column4Data);

                }

            }

              /*  else column1Data = hiddencolumn1(link, n, val);
                column2Data = hiddencolumn2(link, n, val);
*/

                /*
                 if(slashFind + 1 === length){

                 parentDirectory = 'file['+n+']';
                 parentLength = val.length;
                 parentName = val;
                 val = val.substring(0, slashFind);
                 dirNames.push(val);
                 //   console.log("PAY ATTENTION: "+val);


                 directories.push(parentDirectory);
                 column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file["+n+"]' width='23' height='19'></image></td>";
                 column2Data = "<td class='column2'><a id='link4href["+n+"]' href='#' onclick='sortTable("+num+")'>" + val + "</a></td>";
                 num++;
                 }


                 else if(slashFind + 1 !== length && slashFind > -1){
                 hiddenarray.push('file['+n+']');
                 val = val.substring(slashFind + 1);
                 //  console.log("SUPPPPPEEERRR: "+val);
                 //console.log(val);
                 column1Data = "<tr><td class ='column1'><input type='checkbox' id='file[" + n + "]' name='" + val + "' value='" + link + "'" + "/>&nbsp;</td>";
                 column2Data = "<td class='column2'><a id='link4href["+n+"]' href='" + link + "' download>" + val + "</a></td>";
                 var newval = val;
                 if(newval.indexOf("/") > -1){

                 parentDirectory = 'file['+n+']';
                 //parentLength = val.length;
                 //parentName = val;
                 //val = val.substring(0, slashFind);

                 console.log("PAY ATTENTION: "+val);


                 // directories.push(parentDirectory);





                 slashFind = newval.indexOf("/");
                 //  console.log(slashFind);
                 val = newval.substring(0, slashFind);
                 //  console.log(val);
                 // dirNames.push(val);
                 column1Data = "<tr><td class='column1'><image src='images/folderIcon.png' id='file["+n+"]' width='23' height='19'></image></td>";
                 //column2Data = "<td class='column2'><a id='link4href["+n+"]' href='#' onclick='sortTable("+num+")'>" + val + "</a></td>";
                 //num++;
                 }
                 }
                 else if(slashFind === -1) {
                 loadedtable.push('file['+n+']');
                 }
                 */

/*
                Column1[m][t] = column1Data;

                Column2[m][t] = column2Data;

                Column3[m][t] = column3Data;

                Column4[m][t] = column4Data;

*/
                /*



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



                 */

            console.log(loadedtable);
            console.log(allFiles);
            table = constructTable();


            // sessionStorage.setItem('NoSubDir', JSON.stringify(loadedtable));
            // console.log(loadedtable);
            // console.log("hidden array: " +hiddenarray);
            //console.log(directories);
            //console.log(dirNames);
            // Close table data assignments


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
            /*
             for (n=0;n<directories.length;n++){
             document.getElementById(directories[n]).outerHTML = '<image src="images/folderIcon.png" id="file['+n+']" width="23" height="19">';

             }*/

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


