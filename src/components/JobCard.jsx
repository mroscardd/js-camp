import { useEffect, useState } from 'react'

export function JobCard( { job }) {

    const [isApplied, setIsApplied] = useState(false)

    const handleApplyClick = () => {
        setIsApplied(!isApplied)
    }

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

    return (
            <article
            className="job-card"
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-technology={job.data.technology}
            >
            <div className="jobs-title">
                <div>
                <h3 className="title-search">{job.titulo}</h3>
                <small>
                    {job.empresa} | {job.ubicacion}
                </small>
                <p>{job.descripcion}</p>
                </div>
                <div className="button">
                <button className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
                </div>
            </div>
            </article>
        )
}
