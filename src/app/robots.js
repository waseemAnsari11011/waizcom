export default function robots() {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://ecarts.agency';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
