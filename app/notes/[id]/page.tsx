import { styles } from "@/constants";

async function getNoteById(noteId: String){
    const res = await fetch(`http://127.0.0.1:8090/api/collections/posts/records/${noteId}`);
    {
        next: { revalidate: 10 }
    }
    const data = await res.json();
    return data as any;
}

export default async function NotePage({ params }: any) {
    const note = await getNoteById(params.id);
    return (
        <div>
            <h1 className={styles.heading}>notes/{note.id}</h1>
            <div className="justify-center bg-yellow-300 p-5 m-2 shadow-md font-semibold">   
            <div className="space-y-2">
                <h1 className="text-xl">{note.title}</h1>
                <h3 className="text-sm">{note.content}</h3>
                <p className=" text-[10px]">{note.created_at}</p>
            </div>
        </div>
        </div>
        
    )
}
