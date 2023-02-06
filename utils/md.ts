import * as fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  frontmatter: {
    tags: string[];
    publishedDate: string;
    title: string;
    description: string;
    author: string;
    image: string;
    imageAlt: string;
    isPublished: boolean;
    isFeatured: boolean;
  };
  slug: string;
}

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`); // Get full path
};

export const getFileContent = (filename: string, folder: string) => {
  const POSTS_PATH = getPath(folder);
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

export const getAllPosts = (folder: string) => {
  const POSTS_PATH = getPath(folder);
  return fs
    .readdirSync(POSTS_PATH) // get files in directory
    .filter((path) => /\.md?$/.test(path)) // only .md files
    .map((filename) => {
      const source = getFileContent(filename, folder); // retrieve the file contents
      const slug = filename.replace(/\.md?$/, ""); // get the slug from the filename
      const { data: frontmatter } = matter(source); // extract frontmatter
      return { frontmatter, slug } as BlogPost;
    });
};

export const getAllPublished = (folder: string) => {
  const posts = getAllPosts(folder);
  const featured = posts
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedDate).getTime() -
        new Date(a.frontmatter.publishedDate).getTime()
    )
    .find((post) => post.frontmatter.isFeatured === true);
  const published = posts.filter((post) => {
    return post.frontmatter.isPublished === true && post.slug !== featured.slug;
  });
  return published;
};

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder);
  const { data: frontmatter, content } = matter(source);
  return {
    frontmatter,
    content,
  } as BlogPost & { content: string };
};

export const getFeatured = (folder: string) => {
  const posts = getAllPosts(folder);
  const featured = posts
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedDate).getTime() -
        new Date(a.frontmatter.publishedDate).getTime()
    )
    .find((post) => post.frontmatter.isFeatured === true);
  return featured;
};
