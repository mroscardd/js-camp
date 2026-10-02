import { JobFilter } from '../components/JobFilter'
import { Pagination } from '../components/Pagination'
import { JobList } from '../components/JobList'
import { useState, useEffect } from 'react'


const RESULT_PER_PAGES = 5


const useFilters = () => {

  const url = "https://jscamp-api.vercel.app/api/jobs"

  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    level: ''
  })

  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    console.log("ejecucion")
    async function fetchJobs() {
      try {

        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)

        const response = await fetch(url)
        const json = await response.json()
      
        setJobs(json.data)
        setTotal(json.total)

      } catch (error) {
        console.error('Error feetching jobs: ', error)
        setLoading(false)
      } finally {
      // Este bloque SIEMPRE se ejecuta al terminar la petición
      setLoading(false)
      console.log(loading)
    }
    }
    fetchJobs()
  }, [])

  const totalPages = Math.ceil(jobs.length / RESULT_PER_PAGES)
  
  const handlePage = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setCurrentPage(1)
    setFilters(filters)
    console.log(filters)
  }

  const handleTextFilter = (newText) => {
        setTextToFilter(newText)
        setCurrentPage(1)
  }
  return {
    loading,
    jobs,
    totalPages,
    currentPage,
    total,
    handlePage,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    handlePage,
    handleSearch,
    handleTextFilter
  } = useFilters()

  return (
    <main>
      <JobFilter onSearch={handleSearch} onTextFilter={handleTextFilter} />
      
            { 
              loading ? <p>Cargando empleos</p> : <JobList jobs={jobs} /> 
          }
  
      <Pagination 
        onPage={handlePage} 
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  )
}