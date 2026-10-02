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
    async function fetchJobs() {
      try {

        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.level) params.append('level', filters.level)


        const offset = (currentPage - 1) * RESULT_PER_PAGES
        params.append('limit', RESULT_PER_PAGES)
        params.append('offset', offset)

        const queryParams =  params.toString()  

        const response = await fetch(`${url}?${queryParams}`)
        const json = await response.json()
      
        setJobs(json.data)
        setTotal(json.total)

      } catch (error) {
        console.error('Error feetching jobs: ', error)
        setLoading(false)
      } finally {
      setLoading(false)
    }
    }
    fetchJobs()
  }, [filters, textToFilter, currentPage])

  const totalPages = Math.ceil(total / RESULT_PER_PAGES)
  
  const handlePage = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setCurrentPage(1)
    setFilters(filters)
  }

  const handleTextFilter = (newText) => {
    setTextToFilter(newText)
    setCurrentPage(1)
  }

  const handleResetFilter = () => {
    setFilters({
    technology: '',
    location: '',
    level: ''
  })

  }

  return {
    loading,
    jobs,
    totalPages,
    currentPage,
    total,
    handleResetFilter,
    handlePage,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const {
    loading,
    jobs,
    totalPages,
    currentPage,
    handleResetFilter,
    handlePage,
    handleSearch,
    handleTextFilter
  } = useFilters()



  return (
    <main>
      <JobFilter onSearch={handleSearch} onTextFilter={handleTextFilter} resetFilter={handleResetFilter}/>
      
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