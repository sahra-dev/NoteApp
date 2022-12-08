
import NoteAPI from "./NoteAPI.js";
import NoteView from "./NoteView.js";


const app = document.querySelector('#app');
// inja document ro gerefti az in be baad faqat az this.root estefade mikoni jaye document

//  avali document bod  dovomi be soorate object daresh avordim
//  ke yek seri method ha behesh ezafe konim !
const view = new NoteView(app , {
    onNoteAdd(){
        console.log('i love u sahra !')
    },
    onNoteEdit(newTitle , newBody){
        console.log(newBody , newTitle)
    },
    onNoteSelect(noteId){
        console.log(noteId)
    }
});
view.updateNoteList(NoteAPI.getAllNotes())