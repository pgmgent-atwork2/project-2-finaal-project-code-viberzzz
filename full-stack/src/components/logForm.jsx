import { useState } from 'react'
import { supabase } from '../supabaseClient'
 
export default function LogForm() {
  const [ph, setPh] = useState('')
  const [temperature, setTemperature] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
 
    const { error } = await supabase.from('logs').insert([
      {
        ph: parseFloat(ph),
        temperature: parseFloat(temperature),
        note: note
      }
    ])
 
    if (error) {
      console.log(error)
      setStatus('error')
    } else {
      setStatus('success')
      setPh('')
      setTemperature('')
      setNote('')
    }
  }
 
  return (
    <div>
      <h2>Nieuwe meting</h2>
 
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="pH"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
          step="0.1"
          required
        />
 
        <input
          type="number"
          placeholder="Temperatuur"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          step="0.1"
          required
        />
 
        <textarea
          placeholder="Notitie"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
 
        <button type="submit">Opslaan</button>
      </form>
 
      {status === 'loading' && <p>Opslaan...</p>}
      {status === 'success' && <p>Opgeslagen!</p>}
      {status === 'error' && <p> Fout bij opslaan</p>}
    </div>
  )
}