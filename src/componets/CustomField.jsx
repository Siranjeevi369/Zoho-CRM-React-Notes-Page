import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import './CustomField.css'
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import NotesPage from '../NotesPage';
import { Tooltip,Snackbar ,TextField } from '@mui/material';
import Alert from './Alert'
import { Margin } from '@mui/icons-material';
// Create a ref for the file input element
const fileInputRef = React.createRef();
const CustomField = forwardRef((props, ref) => {

  // console.log("CustomProps",props);

  // props = props.data;


  // console.log("allDetailsdata",props.allDetails);
  // const textarea = document.getElementById('expandable-textarea');

  // Add event listener for input
  // textarea.addEventListener('input', function() {
  //   // Auto resize the textarea height based on its content
  //   this.style.height = 'auto';
  //   this.style.height = (this.scrollHeight) + 'px';
  // }); 
  const [note, setNote] = useState('');
  const [notetitle, setNotetitle] = useState('');
  const [currentRecId, setCurrentRecId] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [textareaContent, setTextareaContent] = useState('');
  const [divHeight, setDivHeight] = useState('auto');
  const [fileId, setFileId] = useState('');
  const [fileBlob,setFileBlob] = useState('');
  const [addTitleState, setAddTitleState] = useState(false);
  const [titleData, setTitleData] = useState('');
  const titleRef = useRef(null);
  const [update, setUpdate] = useState(false);
  const [editDetails,setEditDetails] = useState({id:'', fileID : '', Note_Title: '', Note_Content:''});
  const [cuAttachmentID,setCuAttachmentId] = useState('')
  const [hideEdit,setHideEdit] = useState(false);
  const [fileSizeValidate, setFileSizeValidate] = useState(false);
  const [fileCountValidate, setFileCountValiudate] = useState(false)

  const [alertName , setAlertName] = useState('');
  var attachmentArrayList = [];
  var editHide = false;

  const [currentSelectedFiles, setCurrentSelectedFiles] = useState([]);

  const [previousFileDetails, setPreviousFileDetails] = useState([]);
  // const [currentUserEmail , setCurrentUserEmail] = useState('');

  // const [currentUserId, setCurrentUserId] = (null);
  // const [curruserID, setCurrentUserID] = (null);
  // const [currentUserName , setCurrentUserName] = useState('')
  const [cuID, setCuID] = useState(null);

  const [titleContent, setTitleContent] = useState('Add a title')

  const [disableSave, setDisableSave] = useState(true);

  const [DateFormates, setDateFormates] = useState('');

  const inputRef = useRef(null);
  const divRef = useRef(null)
  //======================== expand textarea field ==================================

  useEffect(() => {
    // Dispatch an input event to trigger the auto resize
    const textarea = document.getElementById('expandable-textarea');
    const event = new Event('input');
    textarea.dispatchEvent(event);
    

  }, []);

  // Function to handle input change


  //============================ Expand Textarea baesd on height and content based ==================================

  const handleInputChange = (event) => {

    setNote(event.target.value);

    const textarea = event.target;


    // Auto resize the textarea height based on its content
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    // Update state with the new height
    setTextareaHeight(`${textarea.scrollHeight}px`);
    setTextareaContent(event.target.value);


    if (event.target.value == '' && update == false) {
      setDisableSave(true);
    }
    else if(event.target.value == '' && update == true){
      setDisableSave(true);
    }
    else{
      setDisableSave(false);
    }


  };

  //========================================= Note field empty check =================================

  useEffect(() => {

    if (notetitle != '' && disableSave) {
      setDisableSave(false);
    }

  }, [note]);



  const [isExpanded, setIsExpanded] = useState(false);

  //   const toggleExpand = () => {
  //     setIsExpanded(!isExpanded);
  //   };


  //========================================== Onclick outer container it's focus and expand =================

  const toggleExpand = () => {
    if (isExpanded == false) {

      setIsExpanded(true);
      if (note == '' && update == false) {
        setDisableSave(true);
      }
      editHide = true;
      props.sendDataToParent(editHide);

    }
    
  }


  //====== (cancel button)  ,  resize expanded height , remove note content and title content,  disable save button ================


  const toggleClose = () => {
    if (isExpanded == true) {

     

      setIsExpanded(false);
      setNote('');

      setTextareaHeight(`${20}px`)
      setDivHeight(`${125}px`)

      setAddTitleState(false)

    }
    if (selectedFile != '' && fileId != null) {
      setSelectedFile(null);
      setFileId('');
    }

    setTitleData('');
    setDivHeight('auto');
    setDisableSave(true);
    setUpdate(false);

    editHide=false
    props.sendDataToParent(editHide);

    setListFileData(previousFileDetails);
    setAttachmentIdList([])

    setCurrentSelectedFiles([])

    setListFileData([])
   
  }



  //====================== attactment icon clicked to onClick upload field on click  =======================


  const [selectedFile, setSelectedFile] = useState(null);

  const [listFileData, setListFileData] = useState([]);

  const [attachmentIdList, setAttachmentIdList] = useState([]);


  const handleFileUpload = () => {
    // Trigger file input click event
    fileInputRef.current.click();
  };


  //======================= handle change to get file  data ===================================

  const handleFileChange = (event) => {
    var Error_state;
    const file = event.target.files[0];
    // const file_content = event.target.file;

    // console.log("event.target.files ", event.target.files)

    const blobUrl = URL.createObjectURL(file);

    setFileBlob(blobUrl)

   
    // var listArrayLegnth = listFileData[0].length

    // if (listArrayLegnth ) {
      
    // }

    var GenerateUniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

    console.log("GenerateUniqueId ", GenerateUniqueId);

    // console.log("listFileData test",listFileData.length);
    // console.log("listFileData[0].length1 ",listFileData[0].length);


    if (listFileData.length > 0 &&listFileData[0].length > 4) {

      var allowFileCount = 5 - listFileData[0].length;
      setFileCountValiudate(true);

      Error_state = true;

      setAlertName(`You can upload a maximum of 5 files only.`);

      
      
    }
    else{

      setFileCountValiudate(false);

          var addFileArray = [...currentSelectedFiles]

            addFileArray.push({file:file, GenerateUniqueId:GenerateUniqueId})


        setCurrentSelectedFiles(addFileArray)

    }

    // console.log("fileSizeValidate data ", fileSizeValidate);

    // console.log("listFileData3 ",listFileData.length);
    // console.log("listFileData3 ",listFileData == []);

    if(listFileData.length > 0) {

     

        if(listFileData[0].length > 0 && listFileData[0].length < 5) {

               var addUploadFileName = [...listFileData[0]];

      addUploadFileName.push({File_Name:file.name,GenerateUniqueId:GenerateUniqueId})

      setListFileData([addUploadFileName]);
        }
       
        console.log("listFileData in if first index  ", listFileData.length > 0);

    }
    else{

      

      setListFileData([...listFileData,[{File_Name:file.name,GenerateUniqueId:GenerateUniqueId}]]);

      
      console.log("listFileData in else ", listFileData);
    }
   
   
    
    
    

      // setListFileData([...listFileData,attachments_details])
    
    // Handle file upload logic here
    setSelectedFile(file);
    // console.log('File selected:', file);

    //var fileData = $("#fileInput")
    var fileData = document.getElementById("fileInput").files[0];
    var fileType = file.type;

    // console.log("fileData = ", fileData.size);
    //============================= Upload JS SDK configurations =============================

    var config = {
      "CONTENT_TYPE": "multipart",
      "PARTS": [{
        "headers": {
          "Content-Disposition": "file;"
        },
        "content": "__FILE__"
      }],
      "FILE": {
        "fileParam": "content",
        "file": fileData
      }
    }

    //======================= file size validation  maximum 100 MP  =========================================
    
    if (file.size > 20971500) {

      setSelectedFile(null);
      setFileId('');

      // console.log("20 mp Error validation ");
      setFileSizeValidate(true);

      setAlertName('The total file size exceeds the allowed limit of 20 MB');
      Error_state = true

    }
    else{
      setFileSizeValidate(false);
    }

    if(Error_state){
      setTimeout(() => {
        setFileSizeValidate(false);
        setFileCountValiudate(false);
      },3000)
    }
    
    //================= upload API in JS SDK for get upload file ID ===========================================


    // window.ZOHO.CRM.API.uploadFile(config).then(function (data) {
    //   console.log(data);

    //   const getFileId = data.data[0].details.id;

    //   console.log("getFileId ", getFileId);

    //   setFileId(getFileId);


      // var config = {
      //   id: data.data[0].details.id
      // }

      // setEditDetails({...editDetails,fileID:getFileId})

      //  var getFiledata = ZOHO.CRM.API.getFile(config).then(function (data) {

      //   console.log("getFiledata ", data);

      //  })


      //console.log("data.data[0].details.id ",data.data[0].details.id);


    // })

    //  var Appdata = [{
    //    "$attachments":[
    //    {
    //      "File_Id__s": "2cxxxxxxxxxxxx2fa"
    //}

    // ]
    //}]


    // var config={
    //   Entity:props.data.Entity,
    //   APIData:{
    //         "id": props.data.EntityId,
    //         "$attachments":[
    //           {
    //               "File_Id__s": fileId
    //           }

    //       ]
    //   }
    // }
    // ZOHO.CRM.API.updateRecord(config)
    // .then(function(data){
    //     console.log("updateRecord data",data)
    // })

    // console.log("blobUrl ", blobUrl);

  };

  () => {



  }


  //--------------------------- get Title content  --------------------------
  var currentUserEmail = "";
  var currentUserName = "";
  var BranchName = "";
  var UniqueNameConcat = "";
  var getUniqueName = "";
  var currentRoles = [];
  var currentRoleName = '';
  var currentTitleData = '';
  var multiRoles = ['COE', 'BCOM', 'ACOM', 'RCOM', 'ZCOM', 'NCM', 'CH'];
  var dummyArray = ['RCOM', 'ZCOM', 'NCM'];
  var multiIndex = [];
  var getArrayIndexval;
  var largestValue;
  var listFileData1;
  // var DateFormates;
  var timeFormates;






  const handleFocus = (recData) => {
    var currentRecordTitle;
    var currentRecordContent;
    var attachments_details;
    inputRef.current.focus();
    toggleExpand();

    // console.log("recData from custom Page", recData);

    // console.log(props.allDetails);

    // props.allDetails.Map((noteData)=>{

    //  var data =  noteData.Record_id == recData ? noteData : '';

    // })

   
    for (const noteData of props.allDetails) {
      if (noteData.Record_id == recData) {
        currentRecordContent = noteData.Note_Content;
        currentRecordTitle = noteData.Note_Title;
        if(noteData.Attachment_details != null){
          attachments_details = noteData.Attachment_details;
          setSelectedFile({...selectedFile, name:attachments_details[0].File_Name,
            fileID:attachments_details[0].id});

            
            setPreviousFileDetails([...previousFileDetails,attachments_details])

            setListFileData([...listFileData,attachments_details])
            
            setCuAttachmentId(attachments_details[0].id)

            // listFileData1 = attachments_details

              console.log("attachments_details ",attachments_details);
            
        }
      }
    }
    // console.log("selectedFile ",selectedFile);



    setNotetitle(currentRecordTitle)
    setNote(currentRecordContent);
    setCurrentRecId(recData);
    setUpdate(true);
    if (note == '') {
      setDisableSave(true);
    }
    // console.log("currentRecordTitle", currentRecordTitle);
    // console.log("currentRecordContent", currentRecordContent);
    // console.log("attachments_details", attachments_details);
    

    setEditDetails({...editDetails,id:recData,Note_Content:currentRecordContent,Note_Title:currentRecordTitle})
    
  };

  // var config={
  //   Entity:"Notes",
  //   APIData:{
  //         "id":"419602000048534359" ,
  //         "Note_Title": currentRecordTitle,
  //         "Note_Content": currentRecordContent
  //   }
  // }
  // ZOHO.CRM.API.updateRecord(config)
  // .then(function(data){
  //     console.log("Update Record data",data)
  // })

  //------------------------ save notes -----------------------
  const saveNote = async () => {


    editHide = false

    props.sendDataToParent(editHide);

    // console.log("editDetails ",editDetails);

    var currentnoteid = "";
    if (note != '' && update) {

      var config = {
        Entity: "Notes",
        APIData: {
          "id": currentRecId,
          "Note_Title": notetitle,
          "Note_Content": note        
        }
      }
      // console.log("config",config);
      await window.ZOHO.CRM.API.updateRecord(config)
        .then(async function (crdata) {

          if(cuAttachmentID != ''){

            for (let i = 0; i < attachmentIdList.length; i++) {

              console.log("attachmentIdList update",attachmentIdList[i]);
               
              if (attachmentIdList[i] != undefined) {
                
                
             
            await window.ZOHO.CRM.API.delinkRelatedRecord({Entity:"Notes",RecordID:currentRecId,RelatedList:"Attachments",RelatedRecordID:attachmentIdList[i]})
                  .then(function(deldata){
                      console.log("deldata",deldata);

                      setCuAttachmentId('');
                      
                  })

                }

            }
        }
          // console.log("Update Record data", crdata.data[0].details.id)
          currentnoteid = crdata.data[0].details.id;
          props.handleAddNote();
          setNote('')

              if (isExpanded == true) {

                setIsExpanded(false);
                setNote('');
                setTextareaHeight(`${20}px`)
                setDivHeight(`${125}px`)
                setAddTitleState(false)
        
              }
        
              setTitleData('');
        
              // if(titleData == '' ){
              //   setAddTitleState(false)
        
              // }
              setDivHeight('auto');

              setDisableSave(true);
              setUpdate(false);
              setSelectedFile(null)
        })
        setCuAttachmentId('')
        setAttachmentIdList([])

        setCurrentSelectedFiles([])

        setListFileData([])

    }

    else if (note != '') {

      //========================== get records JS SDK for get Branch name
      await window.ZOHO.CRM.API.getRecord({ Entity: props.data.data.Entity, RecordID: props.data.data.EntityId })
        .then(function (data) {
          // console.log("getRecords", data)

          // console.log("Name", data.data[0].Name);




          // currentUserName = data.data[0].Account_Name;
          BranchName = data.data[0].Branch.name;

          // console.log("BranchName ", BranchName);




          // var mapTitleData = {User: data.data[0].Name,Roles: }
          //setGetTitlecontent(data.data[0].Name);
        })



      //============== get Current user for current user Email , Current user ID, Current User Name ============================

      await window.ZOHO.CRM.CONFIG.getCurrentUser().then(async function (data) {
        // console.log("Current User",data.users[0]);
        // console.log("User Role",data.users[0].role.name);
        // console.log("Current user", data.users[0]);
        // console.log("Current id",data.users[0].id);
        currentUserEmail = data.users[0].email;
        setCuID(data.users[0].id);
        // setCurrentUserEmail(data.users[0].email);

        currentUserName = data.users[0].full_name;
        // console.log("getCurrentUser");


        //========== Match current user id to get date and time format =============

        // await window.ZOHO.CRM.API.getUser({ ID: data.users[0].id })
        //   .then(function (Cdata) {

            // console.log("Current User record", Cdata.users[0])

            // setDateFormates(Cdata.users[0].date_format)
            //  timeFormates = Cdata.users[0].time_format
          // })



      });





      // await  window.ZOHO.CRM.API.searchRecord({Entity:props.data.Entity,Type:"criteria",Query:"(Name:equals:asdf)"})
      //   .then(function(data){
      //       console.log("search record data",data)


      //   })

      //=============== concat branch Name and email id ==============
      UniqueNameConcat = currentUserEmail.concat(" ", BranchName);
      getUniqueName = UniqueNameConcat.replaceAll(" ", "_");

      // console.log("getUniqueName ", getUniqueName);

      //=================== Search record API JS SDK for get roles ===================

      await ZOHO.CRM.API.searchRecord({ Entity: "HRMIS", Type: "criteria", Query: `(Unique_Name:equals:isacrajabraham@gmail.com_Chennai_Anna_Salai)` })
        .then(function (data) {
          // console.log("search record data", data)

          // console.log(data.data[0].Roles);

          currentRoles = data.data[0].Roles;
        })


      //============== multiple roles to get high priority role =======================

      if (currentRoles > 1) {

        currentRoles.forEach((role) => {

          getArrayIndexval = multiRoles.indexOf(role);
          multiIndex.push(getArrayIndexval);

          largestValue = Math.max(...multiIndex);



        });
        currentRoleName = multiRoles[largestValue];


      }
      else {

        //  console.log("Current User Role ",currentRoles );
        currentRoleName = currentRoles[0];
        //  console.log("currentRoleName ",currentRoleName);

      }


      // console.log("currentRoleName ", currentRoleName);


      // console.log("getArrayIndexval ", getArrayIndexval);

      //=============== map title content ==================

      currentTitleData = `${currentUserName} - ${currentRoleName} - ${currentUserEmail}`


      //  var attachmentsData=[{"$editable":true,
      //   "$file_id":"i5lib37dd317434ed4470b9e43bc4db0e229a","$se_module":"Notes","$state":
      //   "save","$status":"c_1", "$type":"Attachment", "encAttachFileId":"d3802ecefed830500ef31ff4ff337c1b1d0ad18e5df33e5db42ff1db830c9a34e95ed4b91579212c9865f9052e0867cfe6f05284c4918db80d5b4ca3cc85ca9b3fcab366262670109e246dc54e06a80f",
      // "extn":"pdf","Size":"23821" }]
      //=========== map attach file ==========
      var attachmentsData = [{ id: fileId }]

      // console.log("fileId ", fileId)


      // fileId


      // ========== Map add content =================
      var add_note_data = {
        Entity: props.data.data.Entity, RecordID: props.data.data.EntityId
        , Title: currentTitleData, Content: note
      }

      // console.log("add_note_data ", add_note_data);


      //======== add note API and JS SDK for add data in notes ==============

      await window.ZOHO.CRM.API.addNotes(add_note_data).then(function (crdata) {
        // console.log("Add Notes data ", crdata);
        // const blobUrl = URL.createObjectURL(selectedFile);

        currentnoteid = crdata.data[0].details.id;

        //       ZOHO.CRM.API.attachFile({Entity:props.data.data.Entity,RecordID:data.data[0].details.id,File:{Name:selectedFile.name,Content:blobUrl}}).then(function(data){
        //   console.log("file Attached",data);
        // });

      })

      // await window.ZOHO.CRM.API.insertRecord({Entity:"Notes",APIData:add_note_data}).then(function(data){
      //   console.log("Insert Notes Records",data);

      //   });



      // console.log("add data");
      // console.log("props.data", props.data.data);


      //===============  Auto resize container height remove focus ,  after save null title and note content , and text area height 
      if (isExpanded == true) {

        setIsExpanded(false);
        setNote('');
        setTextareaHeight(`${20}px`)
        setDivHeight(`${125}px`)
        setAddTitleState(false)

      }

      setTitleData('');

      // if(titleData == '' ){
      //   setAddTitleState(false)

      // }
      setDivHeight('auto');






      // console.log("currentUserEamil ", currentUserEmail);
      // console.log("currentUserName ", currentUserName);

      const getTitleContentData = `${currentUserName} - ${currentUserEmail}`

      // console.log("getTitleContentData ", getTitleContentData);
      setDisableSave(true);

      // props.handleAddNote();

      // console.log("propsHandleNote ",propsHandleNote);

      //============== call outer module function ============

      

     

      setUpdate(false);

      if (selectedFile != '' && fileId != null) {
        setSelectedFile(null);
        setFileId('');
      }

    }

    // console.log(`currentnoteid and cuAttachmentID ${currentnoteid} ${cuAttachmentID}`);

    for (let i = 0; i < currentSelectedFiles.length; i++) {
      
      console.log("currentSelectedFiles[i].file.name ", currentSelectedFiles[i].file.name);
      console.log("currentSelectedFiles[i].file ",currentSelectedFiles[i].file);
      

    if(currentnoteid != "" && currentSelectedFiles != null){
    await window.ZOHO.CRM.API.attachFile({Entity:"Notes",RecordID:currentnoteid,File:{Name:currentSelectedFiles[i].file.name,Content:currentSelectedFiles[i].file}}).then(function(udata){

            // console.log("udata ",udata);


            // setListFileData((prevArray) => {
            //   const newArray = [...prevArray];  // Create a copy of the current array
            //   newArray.pop();  // Remove the last element
            //    // Return the new array
            // });

            setListFileData( listFileData[0].pop())

            // var listArrayLegnth = listFileData[0].length
            var addUploadFileName = [...listFileData[0]];
            

            addUploadFileName.push({File_Name:selectedFile.name,id:udata.data[0].details.id})
        
            setListFileData([addUploadFileName]);

        });
        // ZOHO.CRM.API.deleteFile({Entity:"Notes",RecordID:currentnoteid,File:{Name:"selectedFile.name",Content:fileBlob}}).then(function(data){
        //   console.log("deleteFile data",data);
        // });
    }
    setCurrentSelectedFiles([])

    setAttachmentIdList([]);

    setListFileData([])

  }
    props.handleAddNote();

    // console.log("props.handleAddNote() ");

   

  }


  // useEffect(() => {
  //   const divElement = document.getElementById('parentDiv');
  //   const textareaElement = document.getElementById('expandable-textarea');

  //   // Calculate the scroll height of the textarea content
  //   const scrollHeight = textareaElement.scrollHeight;

  //   // Set the height of the parent div to the scroll height of the textarea
  //   setDivHeight(`${scrollHeight + divHeight + 80}px`);

  //   if (titleData == '' && addTitleState) {
  //     setAddTitleState(false)
  //   }

  //   console.log("textareaTitelElement.scrollHeight 1", scrollHeight);

  //   console.log("divHeight 1", divHeight);


  // }, [textareaContent]); 
  
  
  
  // Trigger effect whenever the textarea content changes

  //   const handleTextareaChange = (event) => {
  //     setTextareaContent(event.target.value);
  //   };

  // const borderStyle = {
  //   border: isExpanded ? 'none' : `${1}px solid #ccc`
  // };

  //=================== focus title field and titel height and Enable save button in title =================

  const addtitle = () => {

    setAddTitleState(true)
    setDivHeight(`${divHeight}px`);
    titleRef.current.focus();

  }

  //================= set title data ===============


  const addHandleTitleChange = (event) => {
    setTitleData(event.target.value);
  }

  //============== use effect to height resize besed on text area ================


  // useEffect(() => {
  //   const divElement = document.getElementById('parentDiv');
  //   const textareaTitelElement = document.getElementById('title-expandable-textarea');

  //   // Calculate the scroll height of the textarea content
  //   const titleScrollHeight = textareaTitelElement.scrollHeight;

  //   // Set the height of the parent div to the scroll height of the textarea
  //   setDivHeight(`${titleScrollHeight + divHeight}px`);

  //   // if(titleData == '' && addTitleState){
  //   //   setAddTitleState(false)
  //   // }

  //   console.log("textareaTitelElement.scrollHeight ", textareaTitelElement.scrollHeight);

  //   console.log("divHeight ", divHeight);

  // }, [titleData]);




  //======== Enable save button in text area =================================

  const handleTitle = () => {
    if (titleData == '' && addTitleState == true) {
      setAddTitleState(false);
      // console.log("handleTitle");

      
      // console.log("clicked note");

    }
    // setHideEdit(true)
    // if(hideEdit){

      // props.sendDataToParent(hideEdit);

    // }
    
  }


  
  //====================== Clear File data ================================

  
  const clearFile = (delAttachmentSId,GenerateUniqueId) => {
    // if (selectedFile != '' && fileId != null) {

    
      setSelectedFile(null);
      setFileId('');
      console.log("delAttachmentSId ", delAttachmentSId);
     console.log("GenerateUniqueId ", GenerateUniqueId);


     //------------------------ listFileData array map filter -------------------------------

      var mapFileListdata = listFileData[0].filter(obj => obj.id !== delAttachmentSId || obj.GenerateUniqueId !== GenerateUniqueId);

      

      console.log("mapFileListdata clearFile", mapFileListdata);

      // console.log("listFileData clearFile", listFileData);


      setListFileData([mapFileListdata])
      var somedata = [...attachmentIdList];
      somedata.push(delAttachmentSId)
    
    
      setAttachmentIdList(somedata)

      

      //------------------------- currentSelectedFiles array filter to map -----------------------



      var mapFilterCurrentSelectedFiles = currentSelectedFiles.filter(objFilterFile => objFilterFile.GenerateUniqueId !== GenerateUniqueId)
      
     

      console.log("mapFilterCurrentSelectedFiles clearFile event", mapFilterCurrentSelectedFiles);

        setCurrentSelectedFiles(mapFilterCurrentSelectedFiles)


    // }


    

  }

//console.log("attachmentArrayList ", attachmentArrayList);

console.log("attachmentIdList ", attachmentIdList);

     // var someArray = [];

     // someArray.push(attachmentIdList[0])

      // console.log("someArray ", someArray);
  //  if(props.handleFocus == 'Clicked'){
  //       handleFocus();
  //       inputRef.current.focus();
  //     toggleExpand();
  //  }

  // const NotesPage = forwardRef((props, ref)=>{



  // })



  useImperativeHandle(ref, () => ({
    handleFocus
  }))

  // console.log("props.NoteData ",props.NoteData);

  
  
  // console.log('props.inputRef ',props.inputRef);

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // console.log("textareaHeight " , textareaHeight);
  // console.log("divHeight " , divHeight);

  useEffect(() => {

    var divScrollHeight;
    var scrollHeight;
    if (inputRef.current ) {
      scrollHeight = inputRef.current.scrollHeight;
      setTextareaHeight(`${scrollHeight}px`);

      
      // console.log("scrollHeight ", scrollHeight);

      // setDivHeight(scrollHeight)

      
    }

    if(divRef.current){
      divScrollHeight = divRef.current.scrollHeight;
      // console.log("divScrollHeight ", divScrollHeight);
    }

    var TotalDivHeight = scrollHeight + divScrollHeight ;

          // console.log("TotalDivHeight " + TotalDivHeight);

    // setDivHeight(`${scrollHeight}px`)

  }, [note]);

  // console.log("listFileData ", listFileData);

  // console.log("someArray ", someArray);

  console.log("currentSelectedFiles ", currentSelectedFiles);

  
  const [hoverFileName, setHoverFileName] = useState(null);

  const handleMouseEntering = (fileName) =>{

    setHoverFileName(fileName)

  }

  console.log("fileId ", fileId);
  console.log("selectedFile ", selectedFile);

  return (
    <div >

       {fileSizeValidate ? <Alert data = {fileSizeValidate} alert = {alertName}/> :<></> }
       {fileCountValidate ? <Alert data = {fileCountValidate} alert = {alertName}/> :<></> }
      {/* <UserProvider/> */}
      {/* <h1 onClick={handleFocus}>Focus</h1> */}
     <div className={`styled-div ${isExpanded ? 'addfocus' : ''}`} id="parentDiv" contenteditable="false" onClick={toggleExpand} style={{ height: divHeight }} ref={divRef}>
     { /*  <textarea
          id="title-expandable-textarea"
          style={{ height: 25, border: isExpanded ? 'none' : `${1}px solid #ccc`, display: addTitleState ? 'inline' : 'none' , color:'black'}}
          rows="1"
          placeholder="Add a title..."
          onChange={addHandleTitleChange}
          value={titleData}
          ref={titleRef}
        />*/}

        <textarea
          id="expandable-textarea"
          style={{ paddingTop: 1, height: textareaHeight, border: isExpanded ? 'none' : `${1}px solid #ccc`,color:'black' }}
          rows="1"
          placeholder="Add a note"
          onChange={handleInputChange}
          value={note}
          onClick={handleTitle}
          ref={inputRef}
          
        />

        


        {/* <TextField
        multiline
        fullWidth="100%"
        id="expandable-textarea"
        style={{ paddingTop: 1, height: textareaHeight, border: isExpanded ? 'none' : `${1}px solid #ccc`,color:'black' }}
        placeholder="Enter text here..."
        value={note}
        onClick={handleTitle}
        onChange={handleInputChange}
        onPaste={handlePaste}
        ref={inputRef}
      /> */}

        <div className={`inner-elements ${isExpanded ? '' : 'hidden'}`} onClick={handleTitle}>
          <hr />
          <div className="flex-container">
            <div className="column1">
              <div style={{display:'flex', flexDirection:'row'}}>
                {/* <span className="attachment-icon" onClick={handleFileUpload}>&#128206;</span><span>| </span><span onClick={addtitle}>{titleContent}</span> */}
                {<span className="attachment-icon" onClick={handleFileUpload}></span>}
                
              </div>

              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />



              <div style={{maxWidth:500}}>
              {/* {fileId && < ><p style={{ display: 'flex', alignItems: 'center'}}>Selected file: {selectedFile.name}&nbsp;<ClearIcon onClick={clearFile}/>&nbsp;&nbsp;<CheckCircleRoundedIcon  style={{color:'green'}}/></p></>} */}
              {listFileData[0] && listFileData[0].map((listfileinfo) =>(  < ><p style={{ display: 'flex', justifyContent:'space-between', alignItems:'center', margin:0, border:"1px solid", borderRadius:5, alignContent:'flex-start',}}>
              <Tooltip title={hoverFileName}
                placement="bottom" followCursor={true}><div style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',}} onMouseEnter={() => handleMouseEntering(listfileinfo.File_Name)}>{listfileinfo.File_Name}&nbsp;</div></Tooltip><Tooltip title="Remove"
                placement="bottom" arrow> <HighlightOffIcon sx={{height:20,width:20, alignSelf:"end"}} onClick={() => clearFile(listfileinfo.id,listfileinfo.GenerateUniqueId)} /></Tooltip> </p></>))}

            </div>

            </div>

            <div className="column2">
              <button onClick={toggleClose} className='cancel-button'>Cancel</button>
              <button className='save-button1' disabled={disableSave} onClick={saveNote}>{update ? 'Update' : 'Save'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})


export default CustomField