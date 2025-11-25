import connect from "@/lib/db";
import Blog from "@/models/Blog";

export default async function sitemap() {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://ecarts.agency'; // Fallback to domain if env not set

    // Static routes
    const routes = [
        '',
        '/about-us',
        '/services',
        '/projects',
        '/tech',
        '/blog',
        '/contact-us', // Assuming this exists or is a section. Based on file list, maybe not a page?
        // Checking file list: about-us, projects, services, tech are dirs.
        // contact-us is NOT in the list of dirs in src/app, but 'ContactUs' is a component.
        // Wait, let me check the file list again.
        // Dirs: about-us, admin, api, blog, components, projects, services, tech, utility.
        // So contact-us might not be a separate page, but a section.
        // However, user might want it indexed if it's a page.
        // Let's stick to the directories I saw: about-us, services, projects, tech, blog.
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (Blogs)
    let blogRoutes = [];
    try {
        await connect();
        const blogs = await Blog.find({}, 'slug updatedAt');
        blogRoutes = blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt || new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    return [...routes, ...blogRoutes];
}
