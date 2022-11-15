

const Container = ({ children }: Props) => {
    return <div className="container max-w-screen-lg md:px-5 xl:mx-auto">{children}</div>
}

export default Container

//Types 
type Props = {
    children?: React.ReactNode
}