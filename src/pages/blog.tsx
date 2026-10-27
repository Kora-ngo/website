import BlogComingSoonSection from "../layouts/blog/blog-coming-soon-section";
import Seo from "../widgets/seo";

const Blog = () => {
    return (
        <div className="min-h-screen bg-gray-950">


        <Seo
            title="Blog | Kora"
            description="The Kora blog is coming soon. Set"
            path="/blog"
            noindex
        />

        <section id="coming-soon">
            <BlogComingSoonSection />
        </section>

        </div>
     );
}

export default Blog;
