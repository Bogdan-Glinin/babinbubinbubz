import DOMPurify from 'dompurify'

interface StyledContainerProps {
    data: any
}

const StyledContainerWithHTML = ({ data }: StyledContainerProps) => {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data ?? '') }} />
}

export default StyledContainerWithHTML
