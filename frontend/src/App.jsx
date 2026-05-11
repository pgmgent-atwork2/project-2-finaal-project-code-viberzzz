useEffect(() => {
  const test = async () => {
    const { data, error } = await supabase
      .from('test')
      .select('*')

    console.log(data, error)
  }

  test()
}, [])

import LogForm from './components/LogForm'

function App() {
  return (
    <div>
      <LogForm />
    </div>
  )
}

export default App