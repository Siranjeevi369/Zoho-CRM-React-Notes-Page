


import React from 'react'
// import {App} from '../App'

function Pageload() {


   
window.ZOHO.embeddedApp.on("PageLoad", async (data) => {

    console.log("Pageload",data);

    return data

    


    })
}

export default Pageload