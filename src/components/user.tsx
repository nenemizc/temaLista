import { useEffect, useState } from "react";
import type { Tema } from "../type/tema";



function User() {
const [temak,setTemak] = useState<Tema[]>([]);

    useEffect(() => {
        async function TemaLista() {
            try {
                const response = await fetch("http://localhost:3000/temak");
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data: Tema[] = await response.json();
                setTemak(data);
            } catch (err) {
                console.log(err);
            }
        }
        TemaLista();
    }, [])

    return <>
        <table className="mx-3 my-2 table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th>Név</th>
                    <th>Hozzáadás Dátuma</th>
                    <th>Értékelés</th>
                    <th>Kreatív</th>
                    <th>Ötletgazda</th>
                </tr>
            </thead>
            <tbody>
                {temak.map((tema) => (
                    <tr key={tema.id}>
                        <td>{tema.nev}</td>
                        <td>{new Date(tema.hozzaadasDatuma).toISOString().split('T')[0]}</td>
                        <td>{tema.ertekeles}</td>
                        <td>{tema.kreativ ? "✅" : "❌"}</td>
                        <td>{tema.otletgazda}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default User;