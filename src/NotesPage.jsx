import React, { useEffect, useState, useRef, createContext, useContext } from 'react';

import './App.css'

import {
  Container,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from './componets/Alert';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CustomField from './componets/CustomField';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import GetAppRounded from '@mui/icons-material/GetAppRounded';
// import dateFormatesIN from './componets/CustomField';

import { Margin } from '@mui/icons-material';

import moment from 'moment-timezone';
import EditIcon from './componets/EditIcon';
// const NotesPageContext = createContext();

// import Pageload from './componets/Pageload';


function NotesPage(props) {


  // console.log("Custom Page Note);

  const [newNote, setNewNote] = useState('');
  const [baseurl, setBaseurl] = useState('');
  const [allNotes, setAllNotes] = useState([]);

  const [state, setState] = useState('');
  const [allDetails, setAllDetails] = useState([])
  const [Parent_name, setParent_name] = useState('https://crm.zoho.in/crm/org60018094468/');
  const [reload, setreload] = useState(0);
  const [actualDate, setActualDate] = useState('')
  const [cuUserId, setCuUserId] = useState('');
  // const [ownerId, setOwnerId] = useState('')
  // const [time_format, setTimeFormat] = useState('');
  // const [noteContent, setNoteContent] = useState([]);
  const mapArrayData = [];

  var timestamp1;
  var timestamp2;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const timeString = "2024-04-27T23:12:31+05:30";

  // Convert to JavaScript Date object
  const date = moment(timeString).toDate();

  // Format date into different formats
  const formattedDate1 = moment(date).format('YYYY-MM-DD');
  var time_format;
  var addTimeFormats;
  var Org_name;
  //-------------------------------- use effect to fetch all data from notes -------------------
  useEffect(() => {

    console.log("testdata1");



    //============== get Current user for current user Email , Current user ID, Current User Name ============================

    window.ZOHO.CRM.CONFIG.getCurrentUser().then(async function (data) {
      // console.log("Current User",data.users[0]);
      // console.log("User Role",data.users[0].role.name);
      // console.log("Current user",data.users[0]);
      // console.log("Current id",data.users[0].id);
      // currentUserEmail = data.users[0].email;
      // setCuID(data.users[0].id);
      // setCurrentUserEmail(data.users[0].email);

      // currentUserName = data.users[0].full_name;
      // console.log("getCurrentUser");


      //========== Match current user id to get date and time format =============

     await window.ZOHO.CRM.API.getUser({ ID: data.users[0].id })
        .then(async function (Cdata) {

          await window.ZOHO.CRM.CONFIG.getOrgInfo().then(async function (Orgdata) {
            console.log("Org info", Orgdata.org[0].domain_name);

            Org_name = Orgdata.org[0].domain_name;
            if (Org_name == "org60018094468") {
              var base_url = `https://crm.zoho.in/crm/${Org_name}/`;
            } else {
              var base_url = `https://crmsandbox.zoho.in/crm/${Org_name}/`;

            }
            setBaseurl(base_url);
            console.log("Current User record", Cdata)
            time_format = Cdata.users[0].time_format;
            setCuUserId(Cdata.users[0].id);

            // setDateFormates(Cdata.users[0].date_format)
            //  timeFormates = Cdata.users[0].time_format


            //============================== get All Notes data =========================================

            await window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
              .then(function (data) {

                console.log("Realated Records data ", data);

                //    data.data.forEach((element) => (  
                //      mapArrayData.push({Note_Content: element.Note_Content,Note_Title:element.Note_Title, Modified_Time:element.Modified_Time, name: element.Owner.name, $se_module: element.$se_module
                //  ,Parent_name:element.Parent_Id.name })

                //   ));


                for (let i = 0; i < data.data.length; i++) {
                  //text += cars[i] + "<br>";

                  const timestamp = "2024-04-27T13:00:41+05:30";

                  const timestamp2 = data.data[i].Modified_Time;


                  const timeString = data.data[i].Modified_Time;
                  const date = new Date(timeString);

                  // Convert to 24-hour format
                  const hours24 = date.getHours();
                  const minutes24 = date.getMinutes();
                  const time24 = `${hours24 < 10 ? '0' : ''}${hours24}:${minutes24 < 10 ? '0' : ''}${minutes24}`;

                  // Convert to 12-hour format
                  const hours12 = hours24 % 12 || 12; // Convert 0 to 12
                  const period = hours24 < 12 ? 'AM' : 'PM';
                  const time12 = `${hours12 < 10 ? '0' : ''}${hours12}:${minutes24 < 10 ? '0' : ''}${minutes24} ${period}`;

                  // console.log("Time in 24-hour format:", time24);
                  // console.log("Time in 12-hour format:", time12);

                  if (time_format == 'HH:mm') {
                    addTimeFormats = time24;
                  }
                  else {
                    addTimeFormats = time12;
                  }



                  // Parse the time string into a Date object
                  const time = new Date(timestamp2);

                  // Subtract the time
                  const currentTime = new Date(); // Current time
                  const differenceInSeconds = currentTime - time;



                  const monthIndex = time.getMonth();
                  const monthName = monthNames[monthIndex];

                  // Get date
                  const day = time.getDate();


                  //========================================== Note added time logic ===============================

                  var actual_hours = Math.floor(differenceInSeconds / 3600000);
                  var actual_minutes = Math.floor(differenceInSeconds / 60000);
                  var actual_date = `${monthName} ${day}`;
                  setActualDate(actual_date);
                  var currentTimeData;
                  var downloadUrl;
                  var fileDownloadUrl;
                  var mapFileUrl = []
                  if (actual_minutes == 0) {
                    currentTimeData = 'now';
                  }
                  else if (actual_minutes < 60) {
                    currentTimeData = `${actual_minutes} mins .ago`;
                  }
                  else if (actual_hours == 0) {
                    currentTimeData = `${actual_minutes} mins .ago`;
                  }
                  else if (actual_hours < 24) {
                    currentTimeData = `${actual_hours} hrs .ago`;
                  }
                  else {
                    currentTimeData = `${actual_date}`;
                  }
                  if (data.data[i].$attachments == null) {
                    downloadUrl = '';


                  }
                  else {
                    var fileId = data.data[i].$attachments[0].$file_id
                    var name = data.data[i].$attachments[0].File_Name
                    var Creator_id = data.data[i].$attachments[0].Created_By.id
                    var Parent_Id = data.data[i].Parent_Id.id;
                    var nId = data.data[i].id;
                    var mod = data.data[i].$se_module;
                    downloadUrl = `${baseurl}ViewImage?fileId=${fileId}&name=${name}&downLoadMode=default&creatorId=${Creator_id}&parentId=${Parent_Id}&nId=${nId}&module=${mod}`

                    data.data[i].$attachments.map((addurl) => {

                      fileDownloadUrl = `${baseurl}ViewImage?fileId=${addurl.$file_id}&name=${addurl.File_Name}&downLoadMode=default&creatorId=${addurl.Created_By.id}&parentId=${Parent_Id}&nId=${nId}&module=${mod}`

                        console.log("fileDownloadUrl ",fileDownloadUrl);
                      var addMapUrldata = {fileUrl: fileDownloadUrl, fileName: addurl.File_Name}

                      mapFileUrl.push(addMapUrldata);

                      console.log("addMapUrldata ",addMapUrldata);



                    })


                    // data.data[i].$attachments.map((addurl) => {

                    //   fileDownloadUrl = `${baseurl}ViewImage?fileId=${addurl.$file_id}&name=${addurl.File_Name}&downLoadMode=default&creatorId=${addurl.Created_By.id}&parentId=${Parent_Id}&nId=${nId}&module=${mod}`

                    //   addMapUrldata = {fileUrl: fileDownloadUrl, }
                    // }

                  }

                  console.log("mapFileUrl ", mapFileUrl);

                  mapArrayData.push({
                    Note_Content: data.data[i].Note_Content, Note_Title: data.data[i].Note_Title, Modified_Time: currentTimeData, name: data.data[i].Owner.name, $se_module: data.data[i].$se_module
                    ,Parent_name: data.data[i].Parent_Id.name, Record_id: data.data[i].id, Time_format: addTimeFormats, Attachment_details: data.data[i].$attachments, downloadUrl: downloadUrl, OwnerId: data.data[i].Owner.id, Parent_Id:Parent_Id,
                    mapFileUrl:mapFileUrl
                  })
                }



                setAllDetails(mapArrayData, ...allDetails);


                setAllNotes(data.data)

                // setAllDetails({Note_Content:data.data[0].Note_Content});


              })

          })


        })



    });

    console.log("time_format ", time_format);




    ZOHO.CRM.API.getRecord({ Entity: props.data.Entity, RecordID: props.data.EntityId })
      .then(function (data) {
        console.log("getRecords1", data);
        setParent_name(data.data[0].Name);
      })

  }, [reload]);


  //===================================== Reload note list component  =======================================

  const handleAddNote = () => {
    // if (newNote.trim() !== '') {
    //   setNotes((prevNotes) => [...prevNotes, newNote.trim()]);

    // }
    setreload(pre => pre + 1);


    console.log("called handleAddNote");


    
    // window.ZOHO.embeddedApp.on("PageLoad", async (data) => {


    // notes.map(note => (


    // ---------------------------------------- Add notes  --------------------------


    // window.ZOHO.CRM.API.addNotes({ Entity: props.data.Entity, RecordID: props.data.EntityId
    //     , Title: "Notes Title", Content: newNote }).then(function (data) {
    //     console.log(data);
    //     setState(data.data[0].code)
    //     // console.log("state",data.data[0].code);


    //     //-------------------------------- add array data ---------------------------------

    //     if(data.data[0].code === 'SUCCESS'){

    //     // window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
    //     // .then(function (data) {

    //     //   console.log(data);

    //       // var dataLen = data.data.length;

    //       var currentData = data.data[0].details;


    //     var mapCurrentData = {Note_Content: newNote, Modified_Time:currentData.Modified_Time, name: currentData.Created_By.name, $se_module:props.data.Entity,Parent_name:Parent_name }

    //     // allDetails.unshift(mapCurrentData);

    //     // let newnoteData = {mapCurrentData,...allDetails};

    //     setAllDetails([mapCurrentData , ...allDetails]);
    // console.log("allDetails 1",allDetails);

    //       console.log('mapCurrentData ',mapCurrentData);
    //       // setAllNotes(data.data)
    //     // })

    //   }
    //     // console.log("state",state);

    // })


    // console.log("props 2",props);




    setNewNote('');
    setNewNote('0');
  };

  console.log("props 2", props);

  // console.log(" import dateFormatesIN",dateFormatesIN);
  // const inputRef = useRef(null);


  // var handleFocusState = false;
  // const handleFocus = () => {

  //         console.log("Edit Clicked");

  //         // inputRef.current.focus();
  //     // handleFocusState = true;
  // };
  // const inputRef = useRef(null);

  // const focusInput = () => {

  //   inputRef.current.focus();

  // };

  //====================== hover item =====================
  const [hoveredItem, setHoveredItem] = useState(null);
  const [recid, setRecId] = useState('');
  // Sample data
  // const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];  

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  // const handleMouseLeave = () => {
  //   setHoveredItem(null);
  // };

  console.log("hoveredItem ", hoveredItem);
  var HoverDate_Date_and_Time = `${actualDate} ${hoveredItem}`

  //======================== Onclick to get current record id ====================

  // const getCurrentRecordId = (recData) => {

  // }

  //======================== Call another component function ======================
  const childRef = useRef(null);
  const [NoteData, setNoteData] = useState({
    notes_data: ''
  })

  const callChildFunction = (recData) => {
    console.log("childRef", childRef);

    setRecId(recData)
    console.log("recid", recData);
    if (childRef.current) {
      childRef.current.handleFocus(recData);

    }
 

  }

  const [Edit_Sattus, setEdit_Sattus] = useState(false)


  const receiveDataFromChild = (data) => {
    // Update parent component's state with data from child
    // setDataFromChild(data);

    console.log("get data from the child = ", data);

    setEdit_Sattus(data)




  };

  // console.log("Edit_Status ", Edit_Sattus);

  // console.log("allDetails " , allDetails);

  console.log("reload " + reload);

  return (

    <>
      {/* <Alert/> */}

      {/* <NotesPageContext.Provider value={handleAddNote}>
          <CustomField />
      </NotesPageContext.Provider> */}

      <Container>

        <Paper style={{ padding: 16 }}>
          {/* <h2>Notes</h2> */}


          {/* <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={3}
            variant="standard"
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></TextField> */}
          <CustomField data={props} handleAddNote={handleAddNote} ref={childRef} allDetails={allDetails} NoteData={NoteData}
            sendDataToParent={receiveDataFromChild}
          />
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
            style={{ marginTop: 8 }}
          >
            Save
          </Button> */}

          <List >



            {allDetails.map((note, index) => (
              <>

                <div style={{ border: '1px solid #DCDCDC', borderRadius: 5, marginBottom: 4 }}>
                  {/*console.log(index,"=====",note)*/}
                  <div>
                    <ListItem key={index}>

                      <ListItemIcon>
                        <Avatar alt="Profile" src="https://contacts.zoho.in/file?ID=60018098307&fs=thumb&nocache=1714716168479" />

                      </ListItemIcon>
                      {/* <ListItemText primary={`${note.$se_module} - ${note.Parent_name} . ${note.Modified_Time} ago by ${note.name}`} style={{ paddingLeft: 50 }} > */}
                      <ListItemText primary={note.Note_Title} />

                    </ListItem>
                  </div>
                  <div>
                    <ListItem key={index}>

                     
                      {/* <ListItemText primary={note.Note_Content} /> */}
                      
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        ><pre style={{fontFamily:'Zoho_Puvi_Regular', textWrap:'wrap'}}>{note.Note_Content}</pre>
                        
                        

                    </ListItem>
                  </div>
                 {note.mapFileUrl != null ?
                  <>
                  
                  <div style={ {display: 'flex', flexDirection:'row', flexWrap:'nowrap', justifyContent:'flex-start', 
                  alignItems:'center', gap:'20px'}}>
                  { note.mapFileUrl.map((fileUrlData)  =>  (
                  <ListItem sx={{ width: 110, height: 110 }}>
                     <Box sx={{ Width: 100, alignContent: 'start' }}>
                     
                      <Card variant="outlined" sx={{ width: 110, height: 85 }}  style={{display:'flex', alignContent:'center', alignItems:'center',flexDirection:'column'}}> 
                      <Tooltip title={hoveredItem} placement="right-end" followCursor={true}>
                        <p onMouseEnter={() => handleMouseEnter(fileUrlData.fileName)} style={{height:40,width:100,whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', display:'inline-block'}}>
                          
                        
                      {fileUrlData.fileName}</p>
                      </Tooltip> 
                      
                      <a href={fileUrlData.fileUrl} target="_blank" style={{color:'black'}}>
                      <GetAppRounded  style={{alignSelf:'end'}}/>
                      </a>
                     
                      </Card>
                      {/* <a href="http://"  rel="noopener noreferrer"></a> */}
                      
                    </Box>
                    
                  </ListItem>

                      ))
                  }
                 
                  </div>
                  
                  </>
                  :
                  <></>
                  } 


                  <div>
                    <ListItem key={index}>


                      {/* <ListItemText primary={`${note.$se_module} - ${note.Parent_name} . ${note.Modified_Time} ago by ${note.name}`} style={{ paddingLeft: 50 }} > */}
                      <ListItemText>
                        <div style={{ display: 'flex', left: '100%', position: 'sticky' }}>
                          <div>
                            {note.$se_module} 
                          </div>
                          <div>&nbsp;-&nbsp;</div>
                          <div>
                            <a href={baseurl+`tab/Accounts/${note.Parent_Id}`} target="_blank">{note.Parent_name}</a>
                          </div>
                          <div>&nbsp;-&nbsp;</div>
                          <Tooltip title={HoverDate_Date_and_Time} placement="bottom-start">
                            <AccessTimeFilledIcon
                              onMouseEnter={() => handleMouseEnter(note.Time_format)}
                             
                            />
                          </Tooltip>
                          <div>&nbsp;</div>
                          <div>
                            {note.Modified_Time}
                          </div>
                          {note.OwnerId == cuUserId && Edit_Sattus == false ? <div style={{position:"absolute",right:0}}><span><EditIcon onClick={() => callChildFunction(note.Record_id)} /></span></div> : <></>}

                        </div>

                      </ListItemText>


                    </ListItem>
                  </div>



                </div>
              </>
            ))}
          </List>

        </Paper>
      </Container>
    </>
  )
}

// export const useNotesPageContext = () => useContext(NotesPageContext);

export default NotesPage
