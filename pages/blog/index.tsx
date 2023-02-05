import { Box } from "@mui/material";
import Link from "next/link";
import { getAllPosts, getAllPublished } from "utils/md";

interface BlogPost {
  frontmatter: { [key: string]: any };
  slug: string;
}

const BlogPage = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <Box>
      Blogs
      {posts.map((post) => (
        <article key={post.slug}>
          <p>{post.frontmatter.tags.join(" ")}</p>
          <Link href={`blog/${post.slug}`}>{post.frontmatter.title}</Link>
          <p>{post.frontmatter.description}</p>
        </article>
      ))}
    </Box>
  );
};
export const getStaticProps = async () => {
  const posts = getAllPublished("content");
  return {
    props: { posts },
  };
};
export default BlogPage;
