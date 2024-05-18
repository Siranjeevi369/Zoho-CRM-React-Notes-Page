import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NotesPage from './NotesPage.jsx'
import CustomField from './componets/CustomField.jsx'





window.ZOHO.embeddedApp.on("PageLoad", async (data) => {
    
  ZOHO.CRM.UI.Resize({height:"500",width:"1000"}).then(function(data){
    console.log(data);
  });
    ReactDOM.createRoot(document.getElementById('root')).render(

      // <React>
      <>
       {/* <App data={data}/> */}
       <NotesPage data ={data}/>
        {/* <CustomField data ={data}/> */}
      </>
       
      // </React> 
    )

    })

    window.ZOHO.embeddedApp.init();