import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
  Avatar
} from '@mui/material';
import CustomField from './componets/CustomField';
import NotesPage from './NotesPage';


// import Pageload from './componets/Pageload';

function App(props) {

  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const [state ,setState] = useState('');
  const [allDetails, setAllDetails] = useState([])
  const [Parent_name, setParent_name] = useState('')
  // const [noteContent, setNoteContent] = useState([]);

  

  //-------------------------------- use effect to fetch all data from notes -------------------
  useEffect(() => {

         console.log("testdata");

         window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
        .then(function (data) {
          
          console.log(data);

          data.data.forEach((element) => (allDetails.push({Note_Content: element.Note_Content, Modified_Time:element.Modified_Time, name: element.Owner.name, $se_module: element.$se_module
         ,Parent_name:element.Parent_Id.name })));

         
          setAllNotes(data.data)

          // setAllDetails({Note_Content:data.data[0].Note_Content});

          
        })

        ZOHO.CRM.API.getRecord({Entity:props.data.Entity,RecordID:props.data.EntityId})
        .then(function(data){
            console.log("getRecords",data)
            setParent_name(data.data[0].Name);
        })

  },[])


  // window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
  //       .then(function (data) {
          
  //         console.log(data);


  //         setAllNotes(data.data)
  //       })



  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, newNote.trim()]);
      
    }
 




    // window.ZOHO.embeddedApp.on("PageLoad", async (data) => {

    
      // notes.map(note => (
          

      // ---------------------------------------- Add notes  --------------------------


    window.ZOHO.CRM.API.addNotes({ Entity: props.data.Entity, RecordID: props.data.EntityId
        , Title: "Notes Title", Content: newNote }).then(function (data) {
        console.log(data);
        setState(data.data[0].code)
        // console.log("state",data.data[0].code);
     

        //-------------------------------- add array data ---------------------------------

        if(data.data[0].code === 'SUCCESS'){

        // window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
        // .then(function (data) {
          
        //   console.log(data);
          
          // var dataLen = data.data.length;

          var currentData = data.data[0].details;


        var mapCurrentData = {Note_Content: newNote, Modified_Time:currentData.Modified_Time, name: currentData.Created_By.name, $se_module:props.data.Entity,Parent_name:Parent_name }
          
        // allDetails.unshift(mapCurrentData);

        // let newnoteData = {mapCurrentData,...allDetails};

        setAllDetails([mapCurrentData , ...allDetails]);
        console.log("allDetails 1",allDetails);

          console.log('mapCurrentData ',mapCurrentData);
          // setAllNotes(data.data)
        // })

      }
        // console.log("state",state);

    })

    
    console.log("props 2",props);
    

  

    setNewNote('');

  };

  console.log("props 2",props);


  return (

    <>
   {/* <NotesPage/> */}
    <CustomField/>
      <Container>
        <Paper style={{ padding: 16 }}>
          <h2>Notes</h2>


          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={3}
            variant="standard"
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
            style={{ marginTop: 8 }}
          >
            Save
          </Button>

          <List>

            {allDetails.map((note, index) => (

              <>
                <div>
                  <ListItem key={index}>

                    <ListItemIcon>
                      <Avatar alt="Profile" src="https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg" />

                    </ListItemIcon>
                    <ListItemText primary={note.Note_Content} />


                  </ListItem>
                </div>
                <div>
                  <ListItem key={index}>


                    {/* <ListItemText primary={`${note.$se_module} - ${note.Parent_name} . ${note.Modified_Time} ago by ${note.name}`} style={{ paddingLeft: 50 }} > */}
                    <ListItemText>
                    {note.$se_module} <a href={`https://crmsandbox.zoho.in/crm/uat1o/tab/CustomModule104/${props.data.EntityId}`} target="_blank">{note.Parent_name}</a> {note.Modified_Time} {note.name}
                    </ListItemText>
                    

                  </ListItem>
                </div>
              </>
            ))}
          </List>

        </Paper>
      </Container>
    </>
  )
}

export default App
