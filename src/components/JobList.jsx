import { JobCard } from "./JobCard"


export function JobList( { jobs } ) {

    return (
        <section className="jobs-search">
            <header>
                <h2>Resultados de búsqueda</h2>
            </header>

            { jobs.length === 0 ?
            <p style={{textAling: 'center'}}>No se han encontrado resultados</p> 
            :
            <div className="content">
             {jobs.map((job) => (
                <JobCard 
                key = {job.id}
                job = {job}
                />  
            )
            )}  
            </div>
            }
        </section>
    )
}