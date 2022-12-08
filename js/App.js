
import NoteAPI from "./NoteAPI.js";
import NoteView from "./NoteView.js";


export default class App{
    constructor(root){
        this.notes =[];
        this.activeNote = null ;
        this.view = new NoteView( root , this._handlers() )
        this._refreshNotes();

    }
    _refreshNotes(){
        const notes = NoteAPI.getAllNotes();

        //set notes
        this.notes = notes ;
        this.view.updateNoteList(notes)
        this.view.updateNoteView(notes.length>0)

        //set active note :
        if(notes.length > 0){
            this._setActiveNote(notes[0])
        }


    }
    _setActiveNote(note){
        this.activeNote = note;
        this.view.updateActiveNote(note)
    }

    _handlers(){
        return{
            onNoteAdd : () =>{
                const newNote = {
                    title :' New Note ',
                    body :' Take Some Note',
                }
                NoteAPI.saveNotes(newNote);
                this._refreshNotes()
            },
            onNoteEdit : (newTitle , newBody) =>{
                NoteAPI.saveNotes({
                    id : this.activeNote.id ,
                    title : newTitle ,
                    body : newBody
                });
                this._refreshNotes();
            },
            onNoteSelect : (noteId) =>{
                const selectedNote = this.notes.find( n => n.id === parseInt(noteId));
                this.activeNote = selectedNote ;
                this.view.updateActiveNote(selectedNote)
            },
            onNoteDelete : (id) =>{
                NoteAPI.deleteNote(id);
                this._refreshNotes();
            },
            deleteAllNotes : () => {
                this.notes.forEach(item =>{
                    NoteAPI.deleteNote(item.id);
                    this._refreshNotes();
            })

            }
        };
    };
}
