import { Link } from "./Link"

export function Header() {
    return (
    <>
    <header>
        <Link href="/" style={{textDecoration: 'none'}}><h2>DevJobs</h2></Link>
        <nav>
        <a href="./index.html">Inicio</a>
        <Link href="./search">Empleos</Link>
        </nav>

        <div>
        <dev-avatar
            service="github"
            username="mroscardd">
        </dev-avatar>
        </div>
    </header>   
    </> 
    )
}