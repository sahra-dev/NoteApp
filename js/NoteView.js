export default class NoteView{
    constructor(root , hamdlers){
        this.root = root;
        const { onNoteAdd , onNoteEdit , onNoteSelect , onNoteDelete , deleteAllNotes } = hamdlers;

        this.onNoteAdd = onNoteAdd ;
        this.onNoteEdit = onNoteEdit ;
        this.onNoteSelect = onNoteSelect ;
        this.onNoteDelete = onNoteDelete ;
        this.deleteAllNotes = deleteAllNotes;
        
        this.root.innerHTML =`<div class="note-app">
        <h1 class="logo"> note app </h1>
        <div class="notes"></div>
        <div class="btns">
        <button class="add-note-btn btn">Add Note</button>
        <button class="delete-note btn">Delete Notes</button>
    </div>
    </div>
    <div class="application">
        <input type="text" class="add-title-note" placeholder="add title">
        <textarea class="add-body-note" placeholder="add note"></textarea>
        </div>`;

        const addNoteBtn = this.root.querySelector('.add-note-btn');
        const addTitleNote = this.root.querySelector('.add-title-note');
        const addBodyNote = this.root.querySelector('.add-body-note');

        addNoteBtn.addEventListener('click' , ()=>{
            this.onNoteAdd();
        } );


        [ addTitleNote , addBodyNote ].forEach((inputField) => {
            inputField.addEventListener("blur" , ()=>{
               const newTitle = addTitleNote.value.trim();
               const newBody = addBodyNote.value.trim();
                this.onNoteEdit(newTitle,newBody);

            });
            
        });
        const deleteNotesBtn = this.root.querySelector('.delete-note');
        deleteNotesBtn.addEventListener('click' , () =>{
            this.deleteAllNotes();
        })
        // this.updateNoteView(true)
    }

    _createlistItem(id,title,body,updated){
        const MAX_BODY_LENGTH = 40;
        return `<div class="note" data-note-id="${id}">
        <div class="note-top">
        <div class="note-title">${title}</div>
        <button class="delete-btn btn" data-id="${id}">Delete</button>  
        </div>              
        <div class="note-body">
        ${body.substring(0 , MAX_BODY_LENGTH)}
        ${body.length> MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="note-date">${new Date(updated).toLocaleString('fa-IR',{dateStyle : 'short' , timeStyle:'short'})}</div>
        </div> `;
    }
    updateNoteList(notes){
        const notesContainer = this.root.querySelector('.notes');

        //empty
        notesContainer.innerHTML='';

        let noteList = '';
        for ( const note of notes){
            const {id , title , body , updated} = note;
            const html = this._createlistItem(id , title , body , updated) ;
            noteList += html;
        }
        notesContainer.innerHTML= noteList;
        notesContainer.querySelectorAll('.note').forEach( item =>{
            // console.log(item);
            item.addEventListener('click' , ()=>{
                this.onNoteSelect(item.dataset.noteId);
            })
        });
        notesContainer.querySelectorAll('.delete-btn').forEach( item =>{
            item.addEventListener('click' , (e)=>{
                e.stopPropagation()
                this.onNoteDelete(item.dataset.id)
            })
        })   

    }
    updateActiveNote(note){
        this.root.querySelector('.add-title-note').value = note.title ;
        this.root.querySelector('.add-body-note').value  = note.body  ;

        this.root.querySelectorAll('.note').forEach(item =>{
            item.classList.remove('note-selected');
        });

        this.root.querySelector(`.note[data-note-id="${note.id}"]`)
        .classList.add('note-selected');

      }
    updateNoteView(visible){
        this.root.querySelector('.application').style.visibility = visible ? 'visible' : 'hidden';
    }
}