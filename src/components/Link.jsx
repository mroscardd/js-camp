import { useRouter } from '../hooks/useRouter'

export function Link({href, children, ...rest}) {
    const { navigateTo } = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        navigateTo(href)
    }

    return (
        <a href={href} {...rest} onClick={handleClick}>
            {children}
        </a>
    )
}