import ContentLoader from "react-content-loader"

const MyLoader = () => (
    <ContentLoader
        speed={2}
        width={226}
        height={117}
        viewBox="0 0 226 117"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="3" ry="3" width="226" height="12" />
        <rect x="0" y="31" rx="3" ry="3" width="180" height="10" />
        <rect x="124" y="60" rx="3" ry="3" width="100" height="10" />
    </ContentLoader>
)

export default MyLoader

