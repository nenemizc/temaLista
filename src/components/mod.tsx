import { useEffect, useState } from "react";
import type { Tema } from "../type/tema";



function Mod() {
    const [temak, setTemak] = useState<Tema[]>([]);

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

    async function ertekelesUp(tema: Tema) {
        if (!confirm("Biztosan szeretnéd növelni az értékelést?")) {
            return;
        }
        const ujErtekeles = tema.ertekeles + 1;
        if (ujErtekeles > 10) {
            alert("Az értékelés nem lehet nagyobb, mint 10!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/temak/${tema.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ertekeles: ujErtekeles }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            setTemak((old) =>
                old.map((t) => (t.id === tema.id ? { ...t, ertekeles: ujErtekeles } : t))
            );
        } catch (error) {
            console.log(error);
        }
    }
    async function ertekelesDown(tema: Tema) {
        if (!confirm("Biztosan szeretnéd csökkenteni az értékelést?")) {
            return;
        }
        const ujErtekeles = tema.ertekeles - 1;
        if (ujErtekeles < 1) {
            alert("Az értékelés nem lehet kisebb, mint 1!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/temak/${tema.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ertekeles: ujErtekeles }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            setTemak((old) =>
                old.map((t) => (t.id === tema.id ? { ...t, ertekeles: ujErtekeles } : t))
            );
        } catch (error) {
            console.log(error);
        }
    }
    async function toggleKreativ(tema: Tema) {
    if (!confirm("Biztosan meg szeretnét változtatni a kreatív mezőt?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/temak/${tema.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kreativ: !tema.kreativ }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      setTemak((old) =>
        old.map((t) => (t.id === tema.id ? { ...t, kreativ: !tema.kreativ } : t))
      );
    } catch (error) {
      console.log(error);
    }
  }

    return <>
        <table className="mx-3 my-2 table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th>Név</th>
                    <th>Hozzáadás Dátuma</th>
                    <th>Értékelés</th>
                    <th>Kreatív</th>
                    <th>Ötletgazda</th>
                    <th>Műveletek</th>
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
                        <td>
                            <button className="btn btn-success" onClick={() => ertekelesUp(tema)}>+1 Ertekeles</button>
                            <button className="btn btn-warning" onClick={() => ertekelesDown(tema)}>-1 Ertekeles</button>
                            <button className="btn btn-info" onClick={() => toggleKreativ(tema)}>Kreatív-e</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default Mod;