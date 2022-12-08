const notes =[
    {
        id : 1 ,
        title : "First" ,
        body : " First What ?",
        updated : "2022-10-07T12:19:24.419Z",
    },
    {
        id : 2 ,
        title : "Second" ,
        body : " First What ?",
        updated : "2022-12-07T12:19:24.419Z",
    },
    {
        id : 3 ,
        title : "Third" ,
        body : " First What ?",
        updated : "2022-11-07T12:19:24.419Z",
    },
];

export default class NoteAPI {
    static getAllNotes(){
        const savedNotes =JSON.parse(localStorage.getItem('note-app')) || [] ;
        // const savedNotes = notes || [] ;
        return savedNotes.sort((a,b) =>{
            return new Date(a.updated) > new Date(b.updated) ? -1 :1;
        })
    }

    static saveNotes(noteToSave){
        const notes = NoteAPI.getAllNotes();

        const existedNote = notes.find( n => n.id ==noteToSave.id)
        if(existedNote){
            existedNote.title = noteToSave.title;
            existedNote.body=noteToSave.body;
            existedNote.updated = new Date().toISOString();

        }else{
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toISOString();

            notes.push(noteToSave);
        }
        localStorage.setItem('note-app' , JSON.stringify(notes));

    }
    static deleteNote(id){
        const notes = NoteAPI.getAllNotes();
        const filteredNotes = notes.filter(n => n.id != id);
        localStorage.setItem('note-app' , JSON.stringify(filteredNotes));

    }
    
}
