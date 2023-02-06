import { Box, Skeleton } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { BlogPost, getAllPublished, getSinglePost } from "utils/md";

const Post = ({ content, frontmatter }: BlogPost & { content: string }) => {
  return (
    <>
      <h1>{frontmatter.title}</h1>
      <Box className="flex flex-row gap-2 text-base">
        <Box>
          by: <span className="italic">{frontmatter.author}</span>
        </Box>
        <Divider orientation="vertical" />
        <Box>
          <span className="italic">
            {new Date(Date.parse(frontmatter.publishedDate)).toLocaleString(
              "default",
              { day: "numeric", month: "long", year: "numeric" }
            )}
          </span>
        </Box>
      </Box>
      <Box className="my-8">
        {frontmatter.image ? (
          <Image src={frontmatter.image} fill alt={frontmatter.imageAlt} />
        ) : (
          <Divider />
        )}
      </Box>
      <ReactMarkdown>{content}</ReactMarkdown>
      <Divider>
        {frontmatter.tags.map((tag) => (
          <Chip
            className="mx-2 text-yellow-50"
            label={tag}
            variant="outlined"
          />
        ))}
      </Divider>
    </>
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
