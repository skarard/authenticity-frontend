import { Box, Chip, Divider } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, getAllPublished, getFeatured } from "utils/md";

const BlogPage = ({
  posts,
  featured,
}: {
  posts: BlogPost[];
  featured: BlogPost;
}) => {
  return (
    <Box>
      <Link href={`blog/${featured.slug}`}>
        <Box>
          <h1>{featured.frontmatter.title}</h1>
          <Box className="bg-slate-700/20 w-full h-[480px] relative">
            <Image
              src={featured.frontmatter.image}
              alt={featured.frontmatter.imageAlt}
              height={480}
            />
            <Box className="absolute bottom-0 mb-4 px-6 py-2 bg-slate-700/75">
              {featured.frontmatter.description}
            </Box>
          </Box>
        </Box>
      </Link>
      {posts.map((post) => (
        <Link className="group" href={`blog/${post.slug}`}>
          <article className="group-hover:bg-sky-100/5 p-10" key={post.slug}>
            <h2>{post.frontmatter.title}</h2>
            <Box className="mb-4">{post.frontmatter.description}</Box>
            <Divider>
              {post.frontmatter.tags.map((tag) => (
                <Chip
                  className="mx-2 text-yellow-50"
                  label={tag}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Divider>
          </article>
        </Link>
      ))}
    </Box>
  );
};
export const getStaticProps = async () => {
  const published = getAllPublished("content");
  const featured = getFeatured(published);
  const posts = published.filter((post) => post.slug !== featured.slug);
  return {
    props: { posts, featured },
  };
};
export default BlogPage;
