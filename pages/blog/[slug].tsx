import ReactMarkdown from "react-markdown";
import { getAllPosts, getAllPublished, getSinglePost } from "utils/md";

const Post = ({ content, frontmatter }) => {
  return (
    <div>
      <p>{frontmatter.tags.join(", ")}</p>
      <h2>{frontmatter.title}</h2>
      <span>{frontmatter.publishedDate}</span>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllPublished("content").map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = getSinglePost(params.slug, "content");

  return {
    props: { ...post },
  };
};

export default Post;
