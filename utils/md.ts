import * as fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`); // Get full path
};

export const getFileContent = (filename: string, folder: string) => {
  const POSTS_PATH = getPath(folder);
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

export const getAllPosts = (folder: string) => {
  const POSTS_PATH = getPath(folder);
  console.log({ POSTS_PATH });
  return fs
    .readdirSync(POSTS_PATH) // get files in directory
    .filter((path) => /\.md?$/.test(path)) // only .md files
    .map((filename) => {
      const source = getFileContent(filename, folder); // retrieve the file contents
      const slug = filename.replace(/\.md?$/, ""); // get the slug from the filename
      const { data: frontmatter } = matter(source); // extract frontmatter
      return { frontmatter, slug };
    });
};

export const getAllPublished = (folder: string) => {
  const posts = getAllPosts(folder);
  const published = posts.filter((post) => {
    return post.frontmatter.isPublished === true;
  });
  return published;
};

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder);
  const { data: frontmatter, content } = matter(source);
  return {
    frontmatter,
    content,
  };
};
