import React,{useState,useContext,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = (props) => {
    const context = useContext(noteContext)
    const {notes,getNotes,editNote}=context
    let navigate=useNavigate()
    useEffect(() => {
      if(localStorage.getItem("token"))
      {
        getNotes()
      }
      else
      {
        navigate('/login')
      }
      // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose=useRef(null)
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    const updateNote=(currentNote)=>
    {
      ref.current.click()
      setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }
    const onChange=(e)=>
    {
      setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click()
      props.showAlert("Updated Note successfully","success")
    }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-etitle" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" value={note.etitle} className="form-control" id="etitle"  name="etitle" minLength={3} required onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" minLength={5} required onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange}/>
                  </div>
                  </form>
                </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Changes</button>
              </div>
            </div>
          </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note)=>
        {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes
