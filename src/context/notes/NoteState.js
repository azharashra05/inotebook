import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
   const notesInitial=[
    {
      "_id": "63aed21f5f1d65d1cc225bf3",
      "user": "63ada6076d2a3d5a9e5399c2",
      "title": "Main hun don",
      "description": "12 mulko ki police mjhe dhundh rahi h",
      "tag": "Threats",
      "date": "2022-12-30T11:57:19.034Z",
      "__v": 0
    },
    {
      "_id": "63aed4d90e216ad56cbbbaac",
      "user": "63ada6076d2a3d5a9e5399c2",
      "title": "Pathan",
      "description": "Mausam bigarne wala h...Kursi ki peti bhandlo",
      "tag": "Movie",
      "date": "2022-12-30T12:08:57.676Z",
      "__v": 0
    }
  ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;