import { JobFilter } from '../components/JobFilter'
import { Pagination } from '../components/Pagination'
import { JobList } from '../components/JobList'
import { useState, useEffect } from 'react'
import jobs from '../data.json'

const RESULT_PER_PAGES = 5

export function SearchPage() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    level: ''
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [jobs, setJobs] = useState([])

  const jobsFilteredByFilters = jobs.filter(job => {
 
  const matchTechnology = filters.technology === '' || 
    job.data.technology.map(tech => tech.toLowerCase()).includes(filters.technology.toLowerCase());

  const matchLocation = filters.location === '' || 
    job.ubicacion.toLowerCase() === filters.location.toLowerCase();
    
  const matchLevel = filters.level === '' || 
    job.data.nivel.toLowerCase() === filters.level.toLowerCase();

  return matchTechnology && matchLocation && matchLevel;
})

  const jobsWithFilter = textToFilter === '' 
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => job.titulo.toLowerCase().includes(textToFilter.toLowerCase()))

  const totalPages = Math.ceil(jobsWithFilter.length / RESULT_PER_PAGES)

  const PagesResults = jobsWithFilter.slice(
    (currentPage - 1) * RESULT_PER_PAGES,
      (currentPage - 1) * RESULT_PER_PAGES + RESULT_PER_PAGES
  )

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

  return (
    <>
  <main>
      <JobFilter onSearch={handleSearch} onTextFilter={handleTextFilter}/>
      <JobList jobs={PagesResults} /> 
  
      <Pagination 
        onPage={handlePage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
  </main>
  </>
  )
  
}

