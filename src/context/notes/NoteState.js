import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)
    //Get all Notes
    const getNotes=async()=>
    {
      //API Call
      const response=await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method:'GET',
        headers:
        {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGE2MDc2ZDJhM2Q1YTllNTM5OWMyIn0sImlhdCI6MTY3MjM5OTY3M30.5fr1cFu3TBkkgAI7p_T-nUpkEMQl8_ULwjKefuTwLxQ'
        }
      }
      )
      const json=await response.json()
      setNotes(json)
    }
    //Add a note
    const addNote=async(title,description,tag)=>
    {
      //API call
      const response=await fetch(`${host}/api/notes/addnote`,
      {
        method:'POST',
        headers:
        {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGE2MDc2ZDJhM2Q1YTllNTM5OWMyIn0sImlhdCI6MTY3MjM5OTY3M30.5fr1cFu3TBkkgAI7p_T-nUpkEMQl8_ULwjKefuTwLxQ'
        },
        body: JSON.stringify({title, description, tag})
      }
      )
      const note=await response.json()
      setNotes(notes.concat(note))
    }
    //Edit a note
    const editNote=async(id,title,description,tag)=>
    {
      //API Call
      const response=await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method:'PUT',
        headers:
        {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGE2MDc2ZDJhM2Q1YTllNTM5OWMyIn0sImlhdCI6MTY3MjM5OTY3M30.5fr1cFu3TBkkgAI7p_T-nUpkEMQl8_ULwjKefuTwLxQ'
        },
        body: JSON.stringify({title, description, tag})
      }
      )
      const json=await response.json()
      let newNotes=JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id)
        {
          element.title=title
          element.description=description
          element.tag=tag
          break
        }   
      }
      setNotes(newNotes)
    }
    //Delete a note
    const deleteNote=async(id)=>
    {
      //API Call
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method:'DELETE',
        headers:
        {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZGE2MDc2ZDJhM2Q1YTllNTM5OWMyIn0sImlhdCI6MTY3MjQwMTQ3MX0.EgQoqC5g8krmu9ah1PqV0Sj8xOerD-CQ4oF3wDwYdVo'
        }
      }
      )
      const json=response.json()
      const newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;