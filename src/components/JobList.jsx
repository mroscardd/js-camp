import { JobCard } from "./JobCard"


export function JobList( { jobs } ) {

    return (
        <section className="jobs-search">
            <header>
                <h2>Resultados de búsqueda</h2>
            </header>
            <div className="content">
            {jobs.map((job) => (
                <JobCard 
                key = {job.id}
                job = {job}
                />  
            )
            
            )}
                
            </div>
        </section>
    )
}