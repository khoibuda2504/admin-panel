export type NewPost = {
  body:string;
  title:string;
}

export type Post = NewPost & {
  userId: number;
  id: number;
};
